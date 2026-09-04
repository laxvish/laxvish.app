import { NextRequest, NextResponse } from "next/server";
import {
  ZEN_MODEL,
  chatWithZen,
  validateConversationPayload,
  type ConversationError,
} from "@/lib/conversation/zen";
import { getRateLimitStore, getRequesterKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_SECONDS = 60;
const MAX_REQUESTS_IDENTIFIED_WINDOW = 20;
const MAX_REQUESTS_UNIDENTIFIED_WINDOW = 60;

function errorResponse(
  error: ConversationError,
  status: number,
  retryAfterSeconds?: number,
): NextResponse {
  return NextResponse.json(
    { error },
    {
      status,
      headers:
        retryAfterSeconds !== undefined
          ? { "retry-after": String(Math.max(1, retryAfterSeconds)) }
          : undefined,
    },
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const requestId = Math.random().toString(36).slice(2, 10);
  const startedAt = Date.now();

  const store = getRateLimitStore();
  const { key: requesterKey, identified } = getRequesterKey(request.headers);
  const decision = await store.hit(
    `conversation:${requesterKey}`,
    identified
      ? MAX_REQUESTS_IDENTIFIED_WINDOW
      : MAX_REQUESTS_UNIDENTIFIED_WINDOW,
    RATE_LIMIT_WINDOW_SECONDS,
  );
  if (!decision.allowed) {
    return errorResponse(
      "RATE_LIMITED",
      429,
      decision.retryAfterSeconds,
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse("INVALID_REQUEST", 400);
  }

  const history = validateConversationPayload(payload);
  if (!history) {
    return errorResponse("INVALID_REQUEST", 400);
  }

  const result = await chatWithZen(history);
  const latencyMs = Date.now() - startedAt;

  if (!result.ok) {
    // Safe metadata only: never log message contents or headers.
    console.warn("[conversation] upstream unavailable", {
      requestId,
      model: ZEN_MODEL,
      failure: result.failure,
      status: result.status ?? null,
      latencyMs,
    });
    return errorResponse("AI_TEMPORARILY_UNAVAILABLE", 502);
  }

  return NextResponse.json({ reply: result.reply });
}
