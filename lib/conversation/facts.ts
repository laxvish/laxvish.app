import type { ProcessedAttachment, StructuredFact } from "./types.ts";

/**
 * Aggregates, deduplicates, and formats structured facts from all processed attachments.
 */
export function aggregateStructuredFacts(
  attachments: ProcessedAttachment[]
): StructuredFact[] {
  const allFacts: StructuredFact[] = [];
  const seenKeys = new Set<string>();

  attachments.forEach((att) => {
    att.facts.forEach((fact) => {
      const normalizedKey = `${fact.key.toLowerCase()}:${fact.value.toLowerCase()}`;
      if (!seenKeys.has(normalizedKey)) {
        seenKeys.add(normalizedKey);
        allFacts.push(fact);
      }
    });
  });

  return allFacts;
}

/**
 * Formats structured facts into a clean, LLM-digestible Markdown block.
 */
export function formatFactsForPrompt(facts: StructuredFact[], maxFacts = 15): string {
  if (facts.length === 0) return "";

  const lines = facts.slice(0, maxFacts).map((f) => {
    const src = f.source ? ` [source: ${f.source}]` : "";
    return `• ${f.key}: ${f.value}${src}`;
  });

  return `[STRUCTURED OPERATIONAL EVIDENCE]\n${lines.join("\n")}`;
}
