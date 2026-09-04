import { NextRequest, NextResponse } from "next/server";
import {
  ConversationError,
  ConversationSuccessResponse,
  ProcessedAttachment,
} from "@/lib/conversation/types";
import { validateConversationRequest } from "@/lib/conversation/validate";
import { preprocessAttachment } from "@/lib/conversation/preprocess";
import { chatWithZenEngine, ZEN_MODEL } from "@/lib/conversation/zen";
import { parseStructuredBlueprint } from "@/lib/conversation/response";
import { getRateLimitStore, getRequesterKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_SECONDS = 60;
const MAX_REQUESTS_IDENTIFIED_WINDOW = 25;
const MAX_REQUESTS_UNIDENTIFIED_WINDOW = 60;

function errorResponse(
  error: ConversationError,
  status: number,
  retryAfterSeconds?: number
): NextResponse {
  return NextResponse.json(
    { error },
    {
      status,
      headers:
        retryAfterSeconds !== undefined
          ? { "retry-after": String(Math.max(1, retryAfterSeconds)) }
          : undefined,
    }
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const requestId = Math.random().toString(36).slice(2, 10);
  const startedAt = Date.now();

  // 1. Sliding Window Rate Limiting
  const store = getRateLimitStore();
  const { key: requesterKey, identified } = getRequesterKey(request.headers);
  const decision = await store.hit(
    `conversation:${requesterKey}`,
    identified
      ? MAX_REQUESTS_IDENTIFIED_WINDOW
      : MAX_REQUESTS_UNIDENTIFIED_WINDOW,
    RATE_LIMIT_WINDOW_SECONDS
  );

  if (!decision.allowed) {
    return errorResponse("RATE_LIMITED", 429, decision.retryAfterSeconds);
  }

  // 2. Parse & Validate Incoming Request
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse("INVALID_REQUEST", 400);
  }

  const validated = validateConversationRequest(payload);
  if (!validated) {
    return errorResponse("INVALID_REQUEST", 400);
  }

  // 3. Preprocess & Extract Facts from Attachments
  const preprocessStart = Date.now();
  const processedAttachments: ProcessedAttachment[] = validated.attachments.map((att, idx) =>
    preprocessAttachment(att, idx)
  );
  const preprocessLatencyMs = Date.now() - preprocessStart;

  // 4. Synthesize Solution via OpenCode Zen over Normalized Context
  const upstreamStart = Date.now();
  const result = await chatWithZenEngine(validated.history, processedAttachments);
  const upstreamLatencyMs = Date.now() - upstreamStart;
  const totalLatencyMs = Date.now() - startedAt;

  if (!result.ok) {
    console.warn("[conversation] upstream failure", {
      requestId,
      model: ZEN_MODEL,
      failure: result.failure,
      status: result.status ?? null,
      preprocessLatencyMs,
      upstreamLatencyMs,
      totalLatencyMs,
    });
    return errorResponse("AI_TEMPORARILY_UNAVAILABLE", 502);
  }

  // 5. Parse Structured Blueprint
  const blueprint = parseStructuredBlueprint(result.reply);

  const totalFactsCount = processedAttachments.reduce(
    (sum, a) => sum + a.facts.length,
    0
  );

  const responseBody: ConversationSuccessResponse = {
    reply: result.reply,
    blueprint,
    attachments: processedAttachments.map((a) => ({
      id: a.id,
      name: a.name,
      category: a.category,
      status: a.processing.status,
      factsCount: a.facts.length,
      summary: a.summary?.overview,
      warning: a.processing.warning,
    })),
    telemetry: {
      latencyMs: totalLatencyMs,
      factsCount: totalFactsCount,
      contextChars: validated.currentDirective.length,
    },
  };

  return NextResponse.json(responseBody);
}
