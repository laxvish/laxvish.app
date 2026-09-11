import type { ProcessedAttachment, StructuredFact, DocumentSummary } from "../types.ts";

const HEADING_RE = /^(?:section|chapter|\d+\.|\b[A-Z\s]{4,30}\b|#)/i;
const SLA_RE = /(?:sla|turnaround|response time|resolution time|tat)[:\s]+([^.,\n]+)/i;
const TEAM_RE = /(?:team size|headcount|staff|employees|agents)[:\s]+(\d+[\d,]*\+?)/i;
const BOTTLENECK_RE = /(?:bottleneck|delay|manual step|blocker|risk|compliance gap|backlog)/i;
const CONTROL_CHARS_RE = /[^\x20-\x7E\r\n\t\u00A0-\u024F]/g;
const H_SPACE_RE = /[ \t]+/g;
const BLANK_LINES_RE = /\n\s*\n/g;
const HEADING_PREFIX_RE = /^[#\d.\-\s]+/;

/**
 * Structured Document Preprocessor (PDF, DOCX, DOC, RTF).
 * Extracts headings, bulleted SLAs, compliance statements, workflow hierarchies, and metadata.
 */
export function processDocumentData(
  id: string,
  name: string,
  mimeType: string,
  size: number,
  rawContent: string
): ProcessedAttachment {
  // If the client passed raw text extracted in browser or plain text stream
  const cleanText = extractReadableText(rawContent);

  if (!cleanText || cleanText.length < 10) {
    // Pure binary without text stream available
    const sizeKb = Math.round(size / 1024);
    const facts: StructuredFact[] = [
      {
        key: "Document Type",
        value: getDocumentFormatLabel(name, mimeType),
        category: "system",
        confidence: 0.95,
        source: name,
      },
      {
        key: "File Payload Size",
        value: `${sizeKb} KB`,
        category: "metric",
        confidence: 1.0,
        source: name,
      },
    ];

    return {
      id,
      name,
      category: "document",
      mimeType,
      size,
      processing: {
        status: "partial",
        method: "Metadata Envelope Extraction",
        warning: "Binary document text could not be fully extracted client-side. Using metadata and directive context.",
      },
      summary: {
        overview: `${getDocumentFormatLabel(name, mimeType)} document (${sizeKb} KB).`,
      },
      facts,
    };
  }

  // We have extracted text from the document
  const lines = cleanText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const facts: StructuredFact[] = [];
  const keySections: string[] = [];
  const bottlenecks: string[] = [];

  // Single-pass: headings, SLA, team size, bottlenecks
  for (const line of lines) {
    if (HEADING_RE.test(line) && line.length < 80) {
      const heading = line.replace(HEADING_PREFIX_RE, "").trim();
      if (heading && keySections.length < 8) keySections.push(heading);
    }

    if (facts.length < 10) {
      const slaMatch = line.match(SLA_RE);
      if (slaMatch) {
        facts.push({
          key: "SLA / Turnaround Target",
          value: slaMatch[1].trim(),
          category: "constraint",
          confidence: 0.9,
          source: name,
        });
      }
      const teamMatch = line.match(TEAM_RE);
      if (teamMatch && facts.length < 10) {
        facts.push({
          key: "Team / Headcount",
          value: teamMatch[1].trim(),
          category: "metric",
          confidence: 0.9,
          source: name,
        });
      }
    }

    if (BOTTLENECK_RE.test(line) && bottlenecks.length < 4 && line.length < 200) {
      bottlenecks.push(line);
    }
  }

  const summary: DocumentSummary = {
    overview: `${getDocumentFormatLabel(name, mimeType)} containing ${lines.length} paragraphs (${Math.round(cleanText.length / 1024)} KB text).`,
    keySections: keySections.length > 0 ? keySections : undefined,
    operationalBottlenecks: bottlenecks.length > 0 ? bottlenecks : undefined,
  };

  return {
    id,
    name,
    category: "document",
    mimeType,
    size,
    processing: {
      status: "processed",
      method: "Structured Document & Paragraph Parser",
    },
    summary,
    facts,
    extractedExcerpt: cleanText.slice(0, 2000),
  };
}

function extractReadableText(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(CONTROL_CHARS_RE, " ")
    .replace(H_SPACE_RE, " ")
    .replace(BLANK_LINES_RE, "\n\n")
    .trim();
}

function getDocumentFormatLabel(name: string, mime: string): string {
  const ext = name.split(".").pop()?.toUpperCase() || "";
  if (ext === "PDF" || mime.includes("pdf")) return "PDF Document";
  if (ext === "DOCX" || ext === "DOC" || mime.includes("word")) return "Word Document (DOCX)";
  if (ext === "RTF" || mime.includes("rtf")) return "Rich Text (RTF)";
  return "Enterprise Document";
}
