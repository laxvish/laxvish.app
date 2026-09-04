import type {
  ConversationMessage,
  ProcessedAttachment,
  UpstreamSuccess,
  UpstreamFailure,
} from "./types.ts";
import { buildSynthesizedPromptMessages } from "./context.ts";
import {
  MAX_MESSAGE_CHARS,
  MAX_MESSAGES,
  validateConversationRequest,
} from "./validate.ts";

export { MAX_MESSAGE_CHARS, MAX_MESSAGES };

export const ZEN_CHAT_COMPLETIONS_URL =
  "https://opencode.ai/zen/v1/chat/completions";
export const ZEN_MODEL = "nemotron-3.5-lightning-free";
export const ZEN_USER_AGENT = "Laxvish/1.0";
export const ZEN_MAX_TOKENS = 1000;
export const ZEN_TIMEOUT_MS = 60_000;

/**
 * Backward compatibility validation helper.
 */
export function validateConversationPayload(
  payload: unknown
): ConversationMessage[] | null {
  const res = validateConversationRequest(payload);
  return res ? res.history : null;
}

/**
 * Executes chat completion with OpenCode Zen over normalized context.
 * Keyless, ephemeral, privacy-first.
 */
export async function chatWithZenEngine(
  history: ConversationMessage[],
  attachments: ProcessedAttachment[] = []
): Promise<UpstreamSuccess | UpstreamFailure> {
  const promptMessages = buildSynthesizedPromptMessages(history, attachments);

  const body = {
    model: ZEN_MODEL,
    messages: promptMessages,
    max_tokens: ZEN_MAX_TOKENS,
    stream: false,
    temperature: 0.2, // Low temperature for crisp, deterministic architectural synthesis
  };

  let response: Response;
  try {
    response = await fetch(ZEN_CHAT_COMPLETIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": ZEN_USER_AGENT,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(ZEN_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    const isTimeout =
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as { name?: unknown }).name === "TimeoutError";
    return { ok: false, failure: isTimeout ? "timeout" : "network" };
  }

  if (!response.ok) {
    return { ok: false, failure: "http", status: response.status };
  }

  let parsed: unknown;
  try {
    parsed = await response.json();
  } catch {
    return { ok: false, failure: "malformed_json" };
  }

  if (!isRecord(parsed) || !Array.isArray(parsed.choices) || parsed.choices.length < 1) {
    return { ok: false, failure: "malformed_response" };
  }

  const first = parsed.choices[0];
  if (!isRecord(first) || !isRecord(first.message) || typeof first.message.content !== "string") {
    return { ok: false, failure: "malformed_response" };
  }

  const reply = first.message.content.trim();
  if (!reply) {
    return { ok: false, failure: "empty_response" };
  }

  return { ok: true, reply };
}

// Backward-compatibility export for existing tests and routes
export async function chatWithZen(
  history: ConversationMessage[]
): Promise<UpstreamSuccess | UpstreamFailure> {
  return chatWithZenEngine(history, []);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
