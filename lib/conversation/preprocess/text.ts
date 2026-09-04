import type { ProcessedAttachment, StructuredFact, DocumentSummary } from "../types.ts";

/**
 * Text & Code Preprocessor (TXT, MD, JSON, LOG).
 * Normalizes unstructured text, extracts operational facts and generates a compact summary.
 */
export function processTextFile(
  id: string,
  name: string,
  mimeType: string,
  size: number,
  rawContent: string
): ProcessedAttachment {
  const content = rawContent.trim();
  if (!content) {
    return {
      id,
      name,
      category: "text",
      mimeType,
      size,
      processing: {
        status: "failed",
        warning: "Empty text file content.",
      },
      facts: [],
    };
  }

  const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const facts: StructuredFact[] = [];
  const keySections: string[] = [];

  // Try parsing JSON if applicable
  if (name.endsWith(".json") || content.startsWith("{") || content.startsWith("[")) {
    try {
      const parsed = JSON.parse(content);
      if (typeof parsed === "object" && parsed !== null) {
        const keys = Object.keys(parsed);
        facts.push({
          key: "JSON Top-Level Keys",
          value: keys.slice(0, 10).join(", "),
          category: "system",
          confidence: 0.95,
          source: name,
        });
        if (Array.isArray(parsed)) {
          facts.push({
            key: "JSON Array Length",
            value: `${parsed.length} items`,
            category: "metric",
            confidence: 0.99,
            source: name,
          });
        }
      }
    } catch {
      // Fallback to text line analysis
    }
  }

  // Extract Markdown Headings / Sections
  lines.forEach((line) => {
    if (line.startsWith("#") || line.startsWith("==") || line.startsWith("--")) {
      const heading = line.replace(/^[#=\-\s]+/, "").trim();
      if (heading && keySections.length < 8) {
        keySections.push(heading);
      }
    }

    // Extract explicit Key: Value pairs
    const kvMatch = line.match(/^([A-Za-z0-9\s_\-]{3,30}):\s*(.+)$/);
    if (kvMatch && facts.length < 15) {
      const key = kvMatch[1].trim();
      const val = kvMatch[2].trim();
      if (val.length > 0 && val.length < 150) {
        facts.push({
          key,
          value: val,
          category: categorizeFactKey(key),
          confidence: 0.9,
          source: name,
        });
      }
    }
  });

  // Extract common metric or volume patterns (e.g., "5000 users", "SLA: 2 hours", "10k records/day")
  const volumeMatch = content.match(/(\d+[\d,]*\+?\s*(?:users|employees|records|tickets|leads|calls|transactions|orders))/i);
  if (volumeMatch && !facts.some((f) => f.key.toLowerCase().includes("volume"))) {
    facts.push({
      key: "Detected Operational Volume",
      value: volumeMatch[1],
      category: "metric",
      confidence: 0.85,
      source: name,
    });
  }

  const summary: DocumentSummary = {
    overview: `Text document containing ${lines.length} lines (${Math.round(content.length / 1024)} KB).`,
    keySections: keySections.length > 0 ? keySections : undefined,
  };

  return {
    id,
    name,
    category: "text",
    mimeType: mimeType || "text/plain",
    size,
    processing: {
      status: "processed",
      method: "Deterministic Text & Syntax Parser",
    },
    summary,
    facts,
    extractedExcerpt: content.slice(0, 1500),
  };
}

function categorizeFactKey(key: string): StructuredFact["category"] {
  const k = key.toLowerCase();
  if (k.includes("time") || k.includes("sla") || k.includes("latency") || k.includes("delay")) return "constraint";
  if (k.includes("system") || k.includes("tool") || k.includes("stack") || k.includes("db") || k.includes("crm")) return "system";
  if (k.includes("count") || k.includes("volume") || k.includes("size") || k.includes("rate") || k.includes("total")) return "metric";
  if (k.includes("issue") || k.includes("error") || k.includes("bottleneck") || k.includes("problem")) return "bottleneck";
  if (k.includes("process") || k.includes("workflow") || k.includes("step") || k.includes("stage")) return "workflow";
  return "general";
}
