import { NextRequest } from "next/server";
import { streamNarrativeFromPoolside } from "@/lib/context/poolside";
import { getSessionFromMemory, persistNarrativeMoment } from "@/lib/context/session-store";
import { NarrativeStage } from "@/lib/context/types";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const sessionId = body.sessionId || request.cookies.get("laxvish_session_id")?.value;
    const stage: NarrativeStage = body.stage || "arrival";

    if (!sessionId) {
      return new Response(JSON.stringify({ ok: false, error: "Session ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const graph = getSessionFromMemory(sessionId);
    if (!graph) {
      return new Response(JSON.stringify({ ok: false, error: "Session not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const encoder = new TextEncoder();
    const startTime = Date.now();

    const stream = new ReadableStream({
      async start(controller) {
        let fullText = "";

        try {
          // Send initial metadata event
          controller.enqueue(
            encoder.encode(
              `event: meta\ndata: ${JSON.stringify({
                stage,
                confidence: graph.hypotheses[0]?.confidence || 0.85,
                evidenceUsed: graph.hypotheses[0]?.supportingEvidence || [],
                solutionCandidate: graph.topSolution,
              })}\n\n`
            )
          );

          // Stream narrative tokens from Poolside Laguna-xs-2.1
          for await (const token of streamNarrativeFromPoolside(graph, stage)) {
            fullText += token;
            controller.enqueue(
              encoder.encode(`event: token\ndata: ${JSON.stringify({ token })}\n\n`)
            );
          }

          // Update session memory
          const moment = {
            stage,
            text: fullText,
            confidence: graph.hypotheses[0]?.confidence || 0.85,
            evidenceUsed: graph.hypotheses[0]?.supportingEvidence || [],
            problemHypothesis: graph.hypotheses[0]?.title,
            solutionCandidate: graph.topSolution,
            generatedAt: Date.now(),
            isFallback: !process.env.POOLSIDE_API_KEY,
          };

          graph.narratives[stage] = moment;
          graph.activeStage = stage;

          // Save narrative generation record
          const latencyMs = Date.now() - startTime;
          await persistNarrativeMoment(sessionId, moment, "poolside/laguna-xs-2.1", latencyMs);

          // Send final completion event
          controller.enqueue(
            encoder.encode(`event: done\ndata: ${JSON.stringify({ stage, fullText, latencyMs })}\n\n`)
          );
        } catch (err) {
          console.error("[SSE Stream Generation Error]", err);
          controller.enqueue(
            encoder.encode(
              `event: error\ndata: ${JSON.stringify({ message: "Streaming error occurred" })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("[POST /api/narrative/stream Error]", error);
    return new Response(JSON.stringify({ ok: false, error: "Internal stream server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
