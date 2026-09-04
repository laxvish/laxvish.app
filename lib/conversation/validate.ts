import type {
  ConversationMessage,
  RawAttachmentInput,
  ValidatedConversationInput,
} from "./types.ts";

export const MAX_MESSAGES = 20;
export const MAX_MESSAGE_CHARS = 4000;
export const MAX_TOTAL_CHARS = 24000;
export const MAX_ATTACHMENTS = 5;
export const MAX_ATTACHMENT_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Validates untrusted request payload from the browser.
 */
export function validateConversationRequest(
  payload: unknown
): ValidatedConversationInput | null {
  if (!isRecord(payload)) return null;

  const { messages, attachments: rawAttachments } = payload;
  if (!Array.isArray(messages) || messages.length < 1 || messages.length > MAX_MESSAGES) {
    return null;
  }

  const cleanHistory: ConversationMessage[] = [];
  let totalChars = 0;

  for (const entry of messages) {
    if (!isRecord(entry)) return null;
    if (entry.role !== "user" && entry.role !== "assistant") return null;
    if (typeof entry.content !== "string") return null;
    const content = entry.content.trim();
    if (content.length < 1 || content.length > MAX_MESSAGE_CHARS) return null;
    totalChars += content.length;
    if (totalChars > MAX_TOTAL_CHARS) return null;
    cleanHistory.push({ role: entry.role, content });
  }

  const currentDirective =
    cleanHistory[cleanHistory.length - 1].role === "user"
      ? cleanHistory[cleanHistory.length - 1].content
      : "";

  const cleanAttachments: RawAttachmentInput[] = [];
  if (Array.isArray(rawAttachments)) {
    if (rawAttachments.length > MAX_ATTACHMENTS) return null;

    for (const att of rawAttachments) {
      if (!isRecord(att)) continue;
      const name = typeof att.name === "string" ? att.name.trim().slice(0, 120) : "unnamed_file";
      const size = typeof att.size === "number" ? att.size : 0;
      if (size > MAX_ATTACHMENT_SIZE_BYTES) continue;

      const type = typeof att.type === "string" ? att.type.slice(0, 100) : "application/octet-stream";
      const content = typeof att.content === "string" ? att.content.slice(0, 500_000) : undefined;
      const encoding = att.encoding === "base64" || att.encoding === "utf-8" ? att.encoding : undefined;

      cleanAttachments.push({
        name,
        size,
        type,
        content,
        encoding,
      });
    }
  }

  return {
    history: cleanHistory,
    currentDirective,
    attachments: cleanAttachments,
  };
}
