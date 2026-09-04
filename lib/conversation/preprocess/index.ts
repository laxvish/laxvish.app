import type { RawAttachmentInput, ProcessedAttachment, AttachmentCategory } from "../types.ts";
import { processTextFile } from "./text.ts";
import { processSpreadsheetData } from "./spreadsheet.ts";
import { processDocumentData } from "./document.ts";
import { processImageData } from "./image.ts";

/**
 * Preprocessing Orchestrator.
 * Converts raw heterogeneous file attachments into normalized, typed, fact-extracted representations.
 */
export function preprocessAttachment(
  raw: RawAttachmentInput,
  index: number
): ProcessedAttachment {
  const id = `att_${Date.now()}_${index}`;
  const name = (raw.name || `attachment_${index}`).trim();
  const ext = name.split(".").pop()?.toLowerCase() || "";
  const mimeType = (raw.type || "").toLowerCase();
  const size = raw.size || 0;
  const content = raw.content || "";

  const category = detectCategory(ext, mimeType);

  switch (category) {
    case "spreadsheet":
      return processSpreadsheetData(id, name, mimeType, size, content);

    case "document":
      return processDocumentData(id, name, mimeType, size, content);

    case "image":
      return processImageData(id, name, mimeType, size);

    case "text":
    default:
      return processTextFile(id, name, mimeType, size, content);
  }
}

export function detectCategory(ext: string, mime: string): AttachmentCategory {
  if (
    ["xlsx", "xls", "csv", "tsv"].includes(ext) ||
    mime.includes("spreadsheet") ||
    mime.includes("csv") ||
    mime.includes("excel")
  ) {
    return "spreadsheet";
  }

  if (
    ["pdf", "docx", "doc", "rtf"].includes(ext) ||
    mime.includes("pdf") ||
    mime.includes("word") ||
    mime.includes("officedocument")
  ) {
    return "document";
  }

  if (
    ["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext) ||
    mime.startsWith("image/")
  ) {
    return "image";
  }

  return "text";
}
