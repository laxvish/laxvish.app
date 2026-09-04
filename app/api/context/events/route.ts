import { NextRequest, NextResponse } from "next/server";
import { scoreProblemHypotheses } from "@/lib/context/ontology";
import { getSessionFromMemory, persistContextSession, persistEvents } from "@/lib/context/session-store";
import { LaxvishEvent } from "@/lib/context/types";

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

    const events: LaxvishEvent[] = Array.isArray(body.events) ? body.events : [];
    const aggregated = body.aggregatedFeatures || {};

    const graph = getSessionFromMemory(sessionId);

    if (graph) {
      // Update behavior metrics
      if (aggregated.attentionScore !== undefined) {
        graph.behavior.attentionScore = Number(aggregated.attentionScore);
      }
      if (aggregated.readingDepthScore !== undefined) {
        graph.behavior.readingDepthScore = Number(aggregated.readingDepthScore);
      }
      if (aggregated.topicsOfInterest && typeof aggregated.topicsOfInterest === "object") {
        graph.behavior.topicsOfInterest = {
          ...graph.behavior.topicsOfInterest,
          ...aggregated.topicsOfInterest,
        };
      }

      // Process discrete events
      for (const ev of events) {
        if (ev.type === "cta_click" && typeof ev.value === "string") {
          if (!graph.behavior.ctasClicked.includes(ev.value)) {
            graph.behavior.ctasClicked.push(ev.value);
          }
        } else if (ev.type === "search_query" && typeof ev.value === "string") {
          if (!graph.behavior.searchQueries.includes(ev.value)) {
            graph.behavior.searchQueries.push(ev.value);
            graph.direct.promptQueries.push(ev.value);
          }
        }
      }

      // Recalculate hypotheses
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
      await persistEvents(sessionId, events);

      return NextResponse.json({
        ok: true,
        data: {
          eventsProcessed: events.length,
          updatedTopicScores: graph.behavior.topicsOfInterest,
          activeHypothesis: graph.hypotheses[0],
          topSolution: graph.topSolution,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      data: { eventsProcessed: events.length },
    });
  } catch (error) {
    console.error("[POST /api/context/events Error]", error);
    return NextResponse.json(
      { ok: false, error: { code: "EVENTS_FAILED", message: "Failed to record context events." } },
      { status: 500 }
    );
  }
}
