import type { StructuredBlueprint } from "./types.ts";

const SECTION_LOOKAHEAD = "(?=\\n\\s*(?:DIAGNOSIS|PROBLEM IDENTIFIED|CORE BOTTLENECK|ARCHITECTURE|SYSTEM PIPELINE|OPERATIONAL STAGES|WORKERS|WORKER ROLES|EXECUTION LAYER|BRAIN|COORDINATION LAYER|ROUTING|BRAKES|VERIFICATION|GOVERNANCE|ASSUMPTIONS|WORKING ASSUMPTIONS|NEXT STEP|NEXT STEPS|ACTIONABLE NEXT STEP)[\\s:]|$)";

/**
 * Parses and validates the LLM response into a typed StructuredBlueprint.
 */
export function parseStructuredBlueprint(rawText: string): StructuredBlueprint {
  const text = rawText.trim();

  const blueprint: StructuredBlueprint = {
    diagnosis: "",
    architecture: [],
    workers: [],
    brain: [],
    brakes: [],
    assumptions: [],
    nextSteps: [],
    rawText: text,
  };

  if (!text) return blueprint;

  const diagnosisMatch = text.match(new RegExp(`(?:DIAGNOSIS|PROBLEM IDENTIFIED|CORE BOTTLENECK)[:\\s]+([\\s\\S]*?)${SECTION_LOOKAHEAD}`, "i"));
  if (diagnosisMatch) {
    blueprint.diagnosis = diagnosisMatch[1].trim();
  }

  const architectureMatch = text.match(new RegExp(`(?:ARCHITECTURE|SYSTEM PIPELINE|OPERATIONAL STAGES)[:\\s]+([\\s\\S]*?)${SECTION_LOOKAHEAD}`, "i"));
  if (architectureMatch) {
    blueprint.architecture = extractBulletList(architectureMatch[1]);
  }

  const workersMatch = text.match(new RegExp(`(?:WORKERS|WORKER ROLES|EXECUTION LAYER)[:\\s]+([\\s\\S]*?)${SECTION_LOOKAHEAD}`, "i"));
  if (workersMatch) {
    blueprint.workers = extractBulletList(workersMatch[1]);
  }

  const brainMatch = text.match(new RegExp(`(?:BRAIN|COORDINATION LAYER|ROUTING)[:\\s]+([\\s\\S]*?)${SECTION_LOOKAHEAD}`, "i"));
  if (brainMatch) {
    blueprint.brain = extractBulletList(brainMatch[1]);
  }

  const brakesMatch = text.match(new RegExp(`(?:BRAKES|VERIFICATION & SAFETY|GOVERNANCE)[:\\s]+([\\s\\S]*?)${SECTION_LOOKAHEAD}`, "i"));
  if (brakesMatch) {
    blueprint.brakes = extractBulletList(brakesMatch[1]);
  }

  const assumptionsMatch = text.match(new RegExp(`(?:ASSUMPTIONS|WORKING ASSUMPTIONS)[:\\s]+([\\s\\S]*?)${SECTION_LOOKAHEAD}`, "i"));
  if (assumptionsMatch) {
    blueprint.assumptions = extractBulletList(assumptionsMatch[1]);
  }

  const nextStepsMatch = text.match(new RegExp(`(?:NEXT STEP|NEXT STEPS|ACTIONABLE NEXT STEP)[:\\s]+([\\s\\S]*?)$`, "i"));
  if (nextStepsMatch) {
    blueprint.nextSteps = extractBulletList(nextStepsMatch[1]);
  }

  // Fallback: If no structured sections were matched, use the first paragraph as diagnosis
  if (!blueprint.diagnosis) {
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim());
    if (paragraphs.length > 0) {
      blueprint.diagnosis = paragraphs[0].trim();
    }
  }

  return blueprint;
}

function extractBulletList(sectionText: string): string[] {
  return sectionText
    .split(/\r?\n/)
    .map((l) => l.replace(/^[-*•\d.)\s]+/, "").trim())
    .filter((l) => l.length > 0 && !l.endsWith(":"));
}


