import { NextRequest } from "next/server";
import { extractThoughtAndNarrative, streamNarrativeFromPoolside } from "@/lib/context/poolside";
import {
  findCachedNarrative,
  getSessionFromMemory,
  persistNarrativeMoment,
} from "@/lib/context/session-store";
import { getRateLimitStore, getRequesterKey } from "@/lib/rate-limit";
import type { NarrativeStage } from "@/lib/context/types";

export const runtime = "nodejs";

const NARRATIVE_RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW_SECONDS = 60;

function tooManyRequests(retryAfterSeconds: number): Response {
  return new Response(
    JSON.stringify({ ok: false, message: "Too many narrative requests. Please retry shortly." }),
    {
      status: 429,
      headers: {
        "content-type": "application/json",
        "retry-after": String(Math.max(1, retryAfterSeconds)),
      },
    }
  );
}

function chunkText(text: string, size = 24): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

export async function POST(request: NextRequest) {
  try {
    const store = getRateLimitStore();
    const { key: requesterKey, identified } = getRequesterKey(request.headers);
    const decision = await store.hit(
      `narrative:${requesterKey}`,
      identified ? NARRATIVE_RATE_LIMIT : NARRATIVE_RATE_LIMIT * 3,
      RATE_LIMIT_WINDOW_SECONDS
    );
    if (!decision.allowed) {
      return tooManyRequests(decision.retryAfterSeconds);
    }

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

          // Dedup cache: repeat (session, stage) views are served from
          // memory/Postgres at zero LLM cost, streamed in chunks so the
          // client UX is identical to a live generation.
          const cached = await findCachedNarrative(sessionId, stage);

          if (cached) {
            fullText = cached;
            for (const chunk of chunkText(cached)) {
              controller.enqueue(
                encoder.encode(`event: token\ndata: ${JSON.stringify({ token: chunk })}\n\n`)
              );
            }
          } else {
            for await (const token of streamNarrativeFromPoolside(graph, stage)) {
              fullText += token;
              controller.enqueue(
                encoder.encode(`event: token\ndata: ${JSON.stringify({ token })}\n\n`)
              );
            }
          }

          const { thought, text: cleanText } = extractThoughtAndNarrative(fullText);
          const narrativeText = cleanText || fullText;

          const moment = {
            stage,
            text: narrativeText,
            thought: thought || undefined,
            confidence: graph.hypotheses[0]?.confidence || 0.85,
            evidenceUsed: graph.hypotheses[0]?.supportingEvidence || [],
            problemHypothesis: graph.hypotheses[0]?.title,
            solutionCandidate: graph.topSolution,
            generatedAt: Date.now(),
            isFallback: !process.env.POOLSIDE_API_KEY,
          };

          graph.narratives[stage] = moment;
          graph.activeStage = stage;

          // Only record fresh generations — cached replays must not create
          // duplicate narrativeGeneration rows.
          if (!cached) {
            const latencyMs = Date.now() - startTime;
            await persistNarrativeMoment(sessionId, moment, "poolside/laguna-xs-2.1", latencyMs);
          }

          controller.enqueue(
            encoder.encode(
              `event: done\ndata: ${JSON.stringify({
                stage,
                fullText,
                text: narrativeText,
                thought,
                latencyMs: Date.now() - startTime,
              })}\n\n`
            )
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
