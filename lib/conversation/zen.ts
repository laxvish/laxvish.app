/**
 * Keyless OpenCode Zen provider for the Laxvish Conversation Box.
 *
 * The Conversation Box talks ONLY to our own `/api/conversation` route, which
 * uses this module server-side to reach the OpenAI-compatible Chat Completions
 * endpoint below. Authentication is intentionally absent: the verified free
 * upstream access requires no key, so there is no key to configure, rotate, or
 * leak. Do NOT add an Authorization header here. Do NOT read an API key from
 * env, source, or deployment config for this integration.
 *
 * Fixed model: nemotron-3.5-lightning-free. The server controls the model,
 * the system prompt, and the upstream URL. The browser controls none of them.
 * Never introduce a paid fallback: if the free model is unavailable, the
 * caller must surface the controlled unavailable state instead.
 */

export const ZEN_CHAT_COMPLETIONS_URL =
  "https://opencode.ai/zen/v1/chat/completions";
export const ZEN_MODEL = "nemotron-3.5-lightning-free";
export const ZEN_USER_AGENT = "Laxvish/1.0";
export const ZEN_MAX_TOKENS = 800;
export const ZEN_TIMEOUT_MS = 60_000;

export const MAX_MESSAGES = 20;
export const MAX_MESSAGE_CHARS = 2000;
export const MAX_TOTAL_CHARS = 12000;

export const LAXVISH_SYSTEM_PROMPT = [
  "You represent Laxvish, an AI company building AI systems for Indian enterprise.",
  "Laxvish builds AI systems that do real work: Workers execute, the Brain coordinates, and Brakes verify and govern.",
  "Laxvish focuses on practical, reliable and controlled AI systems. AI assists people; it does not falsely claim authority or actions.",
  "Be intelligent, concise, calm, precise, technical when appropriate, professional and human.",
  "Never invent customers, partnerships, integrations, statistics, capabilities, deployments, or company facts.",
  "If you do not know something, say so plainly.",
].join(" ");

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export type ConversationError =
  | "INVALID_REQUEST"
  | "RATE_LIMITED"
  | "AI_TEMPORARILY_UNAVAILABLE";

export type UpstreamFailure =
  | "network"
  | "timeout"
  | "http"
  | "malformed_json"
  | "malformed_response"
  | "empty_response";

export interface ZenSuccess {
  ok: true;
  reply: string;
}

export interface ZenFailure {
  ok: false;
  failure: UpstreamFailure;
  status?: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Validate the untrusted browser payload. Returns the sanitized history or
 * null when the payload is not a well-formed lightweight conversation.
 */
export function validateConversationPayload(
  payload: unknown,
): ConversationMessage[] | null {
  if (!isRecord(payload)) return null;
  const { messages } = payload;
  if (!Array.isArray(messages)) return null;
  if (messages.length < 1 || messages.length > MAX_MESSAGES) return null;

  const clean: ConversationMessage[] = [];
  let totalChars = 0;

  for (const entry of messages) {
    if (!isRecord(entry)) return null;
    if (entry.role !== "user" && entry.role !== "assistant") return null;
    if (typeof entry.content !== "string") return null;
    const content = entry.content.trim();
    if (content.length < 1 || content.length > MAX_MESSAGE_CHARS) return null;
    totalChars += content.length;
    if (totalChars > MAX_TOTAL_CHARS) return null;
    clean.push({ role: entry.role, content });
  }

  return clean;
}

/**
 * Send the conversation to OpenCode Zen and return the assistant reply text.
 * Always keyless: no Authorization header is set, on purpose.
 */
export async function chatWithZen(
  history: ConversationMessage[],
): Promise<ZenSuccess | ZenFailure> {
  const body = {
    model: ZEN_MODEL,
    messages: [
      { role: "system", content: LAXVISH_SYSTEM_PROMPT },
      ...history,
    ],
    max_tokens: ZEN_MAX_TOKENS,
    stream: false,
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
  if (!isRecord(first) || !isRecord(first.message)) {
    return { ok: false, failure: "malformed_response" };
  }
  const content = first.message.content;
  if (typeof content !== "string" || content.trim().length === 0) {
    return { ok: false, failure: "empty_response" };
  }

  return { ok: true, reply: content.trim() };
}
