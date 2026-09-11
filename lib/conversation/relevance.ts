import type { ProcessedAttachment, StructuredFact } from "./types.ts";

const STOP_WORDS: ReadonlySet<string> = new Set([
  "the", "is", "at", "which", "on", "a", "an", "and", "or", "in", "for", "to",
  "of", "with", "we", "our", "you", "your", "can", "how", "what", "why", "where",
  "help", "business", "faster", "save", "money", "time",
]);
const NON_WORD_RE = /[^\w\s]/g;

/**
 * Filters facts and attachment excerpts based on relevance to the user's active directive.
 * Uses a Set for O(1) term membership instead of repeated target.includes(term) scans,
 * and avoids per-fact template-string lowercasing by checking individual fields.
 */
export function filterRelevantFacts(
  facts: StructuredFact[],
  userQuery: string,
  maxResults = 12
): StructuredFact[] {
  if (!userQuery.trim() || facts.length <= maxResults) {
    return facts.slice(0, maxResults);
  }

  const queryTerms = extractKeywords(userQuery);
  if (queryTerms.length === 0) {
    return facts.slice(0, maxResults);
  }
  const querySet = new Set(queryTerms);

  const scored = facts.map((fact) => {
    let score = 0;
    // Build a word-set from the fact's text instead of repeated String.includes
    const factWords = `${fact.key} ${fact.value} ${fact.category || ""}`
      .toLowerCase()
      .split(/\W+/)
      .filter(Boolean);
    for (const w of factWords) {
      if (querySet.has(w)) score += 2;
    }

    if (fact.confidence) score += fact.confidence;

    return { fact, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxResults).map((s) => s.fact);
}

/**
 * Selects only attachments that are relevant or limit to top N.
 */
export function filterRelevantAttachments(
  attachments: ProcessedAttachment[],
  userQuery: string,
  maxAttachments = 3
): ProcessedAttachment[] {
  if (attachments.length <= maxAttachments) return attachments;

  const queryTerms = extractKeywords(userQuery);
  if (queryTerms.length === 0) return attachments.slice(0, maxAttachments);

  const querySet = new Set(queryTerms);

  const scored = attachments.map((att) => {
    let score = 0;
    const targetWords = `${att.name} ${att.summary?.overview || ""} ${att.facts.map((f) => f.key).join(" ")}`
      .toLowerCase()
      .split(/\W+/)
      .filter(Boolean);
    for (const w of targetWords) {
      if (querySet.has(w)) score += 3;
    }

    if (att.facts.length > 0) score += 1;

    return { att, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxAttachments).map((s) => s.att);
}

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(NON_WORD_RE, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}
