import type { ProcessedAttachment, StructuredFact, DocumentSummary } from "../types.ts";

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

  // Extract headings / structural blocks
  lines.forEach((line) => {
    if (/^(?:section|chapter|\d+\.|\b[A-Z\s]{4,30}\b|#)/i.test(line) && line.length < 80) {
      const heading = line.replace(/^[#\d.\-\s]+/, "").trim();
      if (heading && keySections.length < 8) {
        keySections.push(heading);
      }
    }

    // Extract SLA / Turnaround facts
    const slaMatch = line.match(/(?:sla|turnaround|response time|resolution time|tat)[:\s]+([^.,\n]+)/i);
    if (slaMatch && facts.length < 10) {
      facts.push({
        key: "SLA / Turnaround Target",
        value: slaMatch[1].trim(),
        category: "constraint",
        confidence: 0.9,
        source: name,
      });
    }

    // Extract team / employee size facts
    const teamMatch = line.match(/(?:team size|headcount|staff|employees|agents)[:\s]+(\d+[\d,]*\+?)/i);
    if (teamMatch && facts.length < 10) {
      facts.push({
        key: "Team / Headcount",
        value: teamMatch[1].trim(),
        category: "metric",
        confidence: 0.9,
        source: name,
      });
    }

    // Extract bottleneck / operational challenges
    if (/(?:bottleneck|delay|manual step|blocker|risk|compliance gap|backlog)/i.test(line)) {
      if (bottlenecks.length < 4 && line.length < 200) {
        bottlenecks.push(line);
      }
    }
  });

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
  // Strip control characters while keeping newlines and printable text
  return raw
    .replace(/[^\x20-\x7E\r\n\t\u00A0-\u024F]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n/g, "\n\n")
    .trim();
}

function getDocumentFormatLabel(name: string, mime: string): string {
  const ext = name.split(".").pop()?.toUpperCase() || "";
  if (ext === "PDF" || mime.includes("pdf")) return "PDF Document";
  if (ext === "DOCX" || ext === "DOC" || mime.includes("word")) return "Word Document (DOCX)";
  if (ext === "RTF" || mime.includes("rtf")) return "Rich Text (RTF)";
  return "Enterprise Document";
}
