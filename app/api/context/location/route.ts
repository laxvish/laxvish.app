import { NextRequest, NextResponse } from "next/server";
import { buildGpsEnvironmentModel } from "@/lib/context/environment";
import { scoreProblemHypotheses } from "@/lib/context/ontology";
import { getSessionFromMemory, persistContextSession } from "@/lib/context/session-store";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
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

      graph.hypotheses = hypotheses;
      graph.topSolution = topSolution;

      const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
      await persistContextSession(graph, clientIp);

      return NextResponse.json({
        ok: true,
        data: {
          locationConfidence: graph.environment.locationConfidence,
          locationSource: graph.environment.locationSource,
          confidenceTier: graph.environment.confidenceTier,
          environment: graph.environment,
          activeHypothesis: graph.hypotheses[0],
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
