import { NextRequest, NextResponse } from "next/server";
import { scoreAndRankPredictedSolutions } from "@/lib/context/ontology";
import { refinePredictedSolutionsWithLLM } from "@/lib/context/poolside";
import { getSessionFromMemory } from "@/lib/context/session-store";
import { getRateLimitStore, getRequesterKey } from "@/lib/rate-limit";
import type { PredictedSolutionOpportunity } from "@/lib/context/types";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_SECONDS = 60;
const MAX_PER_WINDOW = 20;

function tooManyRequests(retryAfterSeconds: number): NextResponse {
  return NextResponse.json(
    { ok: false, message: "Too many prediction requests. Please retry shortly." },
    { status: 429, headers: { "retry-after": String(Math.max(1, retryAfterSeconds)) } }
  );
}

export async function POST(request: NextRequest) {
  try {
    const store = getRateLimitStore();
    const { key: requesterKey, identified } = getRequesterKey(request.headers);
    const decision = await store.hit(
      `context-predict:${requesterKey}`,
      identified ? MAX_PER_WINDOW : MAX_PER_WINDOW * 3,
      RATE_LIMIT_WINDOW_SECONDS
    );
    if (!decision.allowed) {
      return tooManyRequests(decision.retryAfterSeconds);
    }

    const body = await request.json().catch(() => ({}));
    const sessionId = body.sessionId || request.cookies.get("laxvish_session_id")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { ok: false, error: { code: "SESSION_REQUIRED", message: "Missing sessionId." } },
        { status: 400 }
      );
    }

    const graph = getSessionFromMemory(sessionId);
    if (!graph) {
      return NextResponse.json(
        { ok: false, error: { code: "SESSION_NOT_FOUND", message: "Session not found." } },
        { status: 404 }
      );
    }

    // Direct input or query overrides if passed in body
    if (body.directQuery && typeof body.directQuery === "string") {
      if (!graph.direct.promptQueries.includes(body.directQuery)) {
        graph.direct.promptQueries.push(body.directQuery);
      }
    }

    // Deterministically score and rank the 5 diverse opportunities
    const rankedSolutions = scoreAndRankPredictedSolutions(
      graph.environment,
      graph.behavior,
      graph.direct,
      graph.temporal,
      graph.technical
    );

    // Refine with LLM if available, otherwise keep deterministic copy
    const finalSolutions: PredictedSolutionOpportunity[] = await refinePredictedSolutionsWithLLM(
      graph,
      rankedSolutions
    );

    graph.predictedSolutions = finalSolutions;

    return NextResponse.json({
      ok: true,
      data: {
        solutions: finalSolutions,
      },
    });
  } catch (error) {
    console.error("[POST /api/context/predict Error]", error);
    return NextResponse.json(
      { ok: false, error: { code: "PREDICTION_FAILED", message: "Failed to generate predicted solutions." } },
      { status: 500 }
    );
  }
}
