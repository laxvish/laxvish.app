import type { ProcessedAttachment, StructuredFact } from "./types.ts";

/**
 * Filters facts and attachment excerpts based on relevance to the user's active directive.
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

  // Score each fact by term match
  const scored = facts.map((fact) => {
    let score = 0;
    const targetText = `${fact.key} ${fact.value} ${fact.category || ""}`.toLowerCase();

    queryTerms.forEach((term) => {
      if (targetText.includes(term)) {
        score += 2;
      }
    });

    // High confidence facts get slight baseline weight
    if (fact.confidence) {
      score += fact.confidence;
    }

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
  const scored = attachments.map((att) => {
    let score = 0;
    const target = `${att.name} ${att.summary?.overview || ""} ${att.facts.map((f) => f.key).join(" ")}`.toLowerCase();

    queryTerms.forEach((term) => {
      if (target.includes(term)) score += 3;
    });

    // Spreadsheets and documents with facts get higher relevance priority
    if (att.facts.length > 0) score += 1;

    return { att, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxAttachments).map((s) => s.att);
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    "the", "is", "at", "which", "on", "a", "an", "and", "or", "in", "for", "to",
    "of", "with", "we", "our", "you", "your", "can", "how", "what", "why", "where",
    "help", "business", "faster", "save", "money", "time"
  ]);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));
}
