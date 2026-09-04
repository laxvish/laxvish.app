import { NextRequest, NextResponse } from "next/server";
import { extractEdgeLocation } from "@/lib/context/environment";
import { scoreAndRankPredictedSolutions, scoreProblemHypotheses } from "@/lib/context/ontology";
import { generateDeterministicNarrative } from "@/lib/context/poolside";
import { getSessionFromMemory, persistContextSession } from "@/lib/context/session-store";
import { getRateLimitStore, getRequesterKey } from "@/lib/rate-limit";
import type { LaxvishContextGraph, NarrativeStage } from "@/lib/context/types.ts";

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
      `context-init:${requesterKey}`,
      identified ? MAX_PER_WINDOW : MAX_PER_WINDOW * 3,
      RATE_LIMIT_WINDOW_SECONDS
    );
    if (!decision.allowed) {
      return tooManyRequests(decision.retryAfterSeconds);
    }

    const body = await request.json().catch(() => ({}));
    const clientSessionId = body.clientSessionId || `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const anonymousVisitorId = body.anonymousVisitorId || `anon_${Math.random().toString(36).slice(2, 11)}`;

    const edgeEnv = extractEdgeLocation(request.headers);
    const existing = getSessionFromMemory(clientSessionId);

    const now = new Date();
    const temporal = {
      clientTimestamp: body.temporal?.clientTimestamp || Date.now(),
      serverTimestamp: Date.now(),
      timezone: body.temporal?.timezone || "Asia/Kolkata",
      localHour: body.temporal?.timezone
        ? new Date(now.toLocaleString("en-US", { timeZone: body.temporal.timezone })).getHours()
        : now.getHours(),
      localDayOfWeek: body.temporal?.timezone
        ? new Date(now.toLocaleString("en-US", { timeZone: body.temporal.timezone })).toLocaleDateString("en-US", { weekday: "long" })
        : now.toLocaleDateString("en-US", { weekday: "long" }),
      isWeekend: [0, 6].includes(now.getDay()),
      sessionDurationSec: 0,
    };

    const technical = {
      platform: body.technical?.platform || "Android",
      deviceClass: body.technical?.deviceClass || "mobile",
      browser: body.technical?.browser || "Chrome",
      viewport: body.technical?.viewport || { width: 412, height: 915, pixelRatio: 2.6 },
      touchSupported: body.technical?.touchSupported ?? true,
      prefersReducedMotion: body.technical?.prefersReducedMotion ?? false,
      colorScheme: body.technical?.colorScheme || "light",
    };

    const environment = {
      locationSource: edgeEnv.locationSource || "none",
      locationConfidence: edgeEnv.locationConfidence || 0.4,
      confidenceTier: edgeEnv.confidenceTier || "L1",
      city: edgeEnv.city,
      region: edgeEnv.region,
      country: edgeEnv.country || "IN",
      latitude: edgeEnv.latitude,
      longitude: edgeEnv.longitude,
      categories: edgeEnv.categories || {
        healthcare: 0.25,
        education: 0.30,
        business: 0.75,
        finance: 0.40,
        government: 0.20,
        retail: 0.35,
        transport: 0.30,
        hospitality: 0.25,
        industrial: 0.45,
        residential: 0.50,
        cultural: 0.20,
      },
      nearestRepresentative: edgeEnv.nearestRepresentative || [],
    };

    const behavior = existing?.behavior || {
      sections: {},
      topicsOfInterest: {},
      attentionScore: 0.5,
      readingDepthScore: 0.2,
      backtrackingRatio: 0.0,
      ctasClicked: [],
      searchQueries: [],
    };

    const direct = existing?.direct || {
      promptQueries: [],
      statedProblem: body.statedProblem,
    };

    const { hypotheses, topSolution } = scoreProblemHypotheses(
      environment,
      behavior,
      direct,
      temporal,
      technical
    );

    const predictedSolutions = scoreAndRankPredictedSolutions(
      environment,
      behavior,
      direct,
      temporal,
      technical
    );

    const initialGraph: LaxvishContextGraph = {
      sessionId: clientSessionId,
      anonymousVisitorId,
      isReturning: Boolean(existing),
      technical,
      temporal,
      environment,
      behavior,
      direct,
      hypotheses,
      topSolution,
      predictedSolutions,
      narratives: {},
      activeStage: "arrival",
    };

    // Pre-populate baseline narratives for all 5 stages so client never shows placeholders
    const STAGES: NarrativeStage[] = ["arrival", "environment", "opportunity", "interaction", "synthesis"];
    for (const stg of STAGES) {
      initialGraph.narratives[stg] = generateDeterministicNarrative(initialGraph, stg);
    }

    // Persist session — immediate on init so the session row exists before
    // any narrative generation references it.
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    await persistContextSession(initialGraph, clientIp, { immediate: true });

    const response = NextResponse.json({
      ok: true,
      data: {
        sessionId: clientSessionId,
        isReturning: initialGraph.isReturning,
        environment: initialGraph.environment,
        hypotheses: initialGraph.hypotheses,
        topSolution: initialGraph.topSolution,
        solutions: initialGraph.predictedSolutions,
        predictedSolutions: initialGraph.predictedSolutions,
        narratives: initialGraph.narratives,
      },
    });

    response.cookies.set("laxvish_session_id", clientSessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("[POST /api/context/init Error]", error);
    return NextResponse.json(
      { ok: false, error: { code: "INIT_FAILED", message: "Failed to initialize context session." } },
      { status: 500 }
    );
  }
}
