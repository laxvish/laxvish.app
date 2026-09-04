import type { ProcessedAttachment } from "./types.ts";

/**
 * Aggregates document summaries into a concise semantic context block.
 */
export function formatDocumentSummariesForPrompt(
  attachments: ProcessedAttachment[],
  maxSummaries = 4
): string {
  const summaries = attachments
    .filter((att) => att.summary && att.summary.overview)
    .slice(0, maxSummaries)
    .map((att) => {
      const parts: string[] = [`Document: "${att.name}" (${att.category.toUpperCase()})`];
      if (att.summary?.overview) parts.push(`Summary: ${att.summary.overview}`);
      if (att.summary?.keySections && att.summary.keySections.length > 0) {
        parts.push(`Key Sections: ${att.summary.keySections.join(", ")}`);
      }
      if (att.summary?.operationalBottlenecks && att.summary.operationalBottlenecks.length > 0) {
        parts.push(`Bottlenecks Found: ${att.summary.operationalBottlenecks.join("; ")}`);
      }
      if (att.processing.warning) {
        parts.push(`Note: ${att.processing.warning}`);
      }
      return parts.join("\n  ");
    });

  if (summaries.length === 0) return "";

  return `[DOCUMENT CONTEXT & SUMMARIES]\n${summaries.join("\n\n")}`;
}
