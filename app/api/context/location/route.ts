import { NextRequest, NextResponse } from "next/server";
import { buildGpsEnvironmentModel } from "@/lib/context/environment";
import { scoreAndRankPredictedSolutions, scoreProblemHypotheses } from "@/lib/context/ontology";
import { getSessionFromMemory, persistContextSession } from "@/lib/context/session-store";
import { getRateLimitStore, getRequesterKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_SECONDS = 60;
const MAX_PER_WINDOW = 10;

function tooManyRequests(retryAfterSeconds: number): NextResponse {
  return NextResponse.json(
    { ok: false, message: "Too many requests. Please retry shortly." },
    { status: 429, headers: { "retry-after": String(Math.max(1, retryAfterSeconds)) } }
  );
}

export async function POST(request: NextRequest) {
  try {
    const store = getRateLimitStore();
    const { key: requesterKey, identified } = getRequesterKey(request.headers);
    const decision = await store.hit(
      `context-location:${requesterKey}`,
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

    const { coordinates } = body;
    if (!coordinates || typeof coordinates.latitude !== "number" || typeof coordinates.longitude !== "number") {
      return NextResponse.json(
        { ok: false, error: { code: "INVALID_COORDINATES", message: "Valid latitude and longitude required." } },
        { status: 400 }
      );
    }

    const accuracy = typeof coordinates.accuracy === "number" ? coordinates.accuracy : 50;
    const graph = getSessionFromMemory(sessionId);

    if (graph) {
      const gpsEnv = buildGpsEnvironmentModel(
        coordinates.latitude,
        coordinates.longitude,
        accuracy,
        graph.environment.city
      );

      graph.environment = gpsEnv;

      const { hypotheses, topSolution } = scoreProblemHypotheses(
        graph.environment,
        graph.behavior,
        graph.direct,
        graph.temporal,
        graph.technical
      );

      const predictedSolutions = scoreAndRankPredictedSolutions(
        graph.environment,
        graph.behavior,
        graph.direct,
        graph.temporal,
        graph.technical
      );

      graph.hypotheses = hypotheses;
      graph.topSolution = topSolution;
      graph.predictedSolutions = predictedSolutions;

      const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
      await persistContextSession(graph, clientIp, { immediate: true });

      return NextResponse.json({
        ok: true,
        data: {
          locationConfidence: graph.environment.locationConfidence,
          locationSource: graph.environment.locationSource,
          confidenceTier: graph.environment.confidenceTier,
          environment: graph.environment,
          activeHypothesis: graph.hypotheses[0],
          solutions: graph.predictedSolutions,
          predictedSolutions: graph.predictedSolutions,
        },
      });
    }

    return NextResponse.json(
      { ok: false, error: { code: "SESSION_NOT_FOUND", message: "Session expired or not initialized." } },
      { status: 404 }
    );
  } catch (error) {
    console.error("[POST /api/context/location Error]", error);
    return NextResponse.json(
      { ok: false, error: { code: "LOCATION_UPDATE_FAILED", message: "Failed to update location intelligence." } },
      { status: 500 }
    );
  }
}
