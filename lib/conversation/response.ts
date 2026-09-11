import type { StructuredBlueprint } from "./types.ts";

// Precompiled once — was `new RegExp(...)` 7× per call (regex compile + 7 scans)
const SECTION_NAMES = [
  "DIAGNOSIS", "PROBLEM IDENTIFIED", "CORE BOTTLENECK",
  "ARCHITECTURE", "SYSTEM PIPELINE", "OPERATIONAL STAGES",
  "WORKERS", "WORKER ROLES", "EXECUTION LAYER",
  "BRAIN", "COORDINATION LAYER", "ROUTING",
  "BRAKES", "VERIFICATION", "VERIFICATION & SAFETY", "GOVERNANCE",
  "ASSUMPTIONS", "WORKING ASSUMPTIONS",
  "NEXT STEP", "NEXT STEPS", "ACTIONABLE NEXT STEP",
] as const;

const SECTION_ALIAS: Record<string, keyof Omit<StructuredBlueprint, "rawText">> = {
  DIAGNOSIS: "diagnosis", "PROBLEM IDENTIFIED": "diagnosis", "CORE BOTTLENECK": "diagnosis",
  ARCHITECTURE: "architecture", "SYSTEM PIPELINE": "architecture", "OPERATIONAL STAGES": "architecture",
  WORKERS: "workers", "WORKER ROLES": "workers", "EXECUTION LAYER": "workers",
  BRAIN: "brain", "COORDINATION LAYER": "brain", ROUTING: "brain",
  BRAKES: "brakes", VERIFICATION: "brakes", "VERIFICATION & SAFETY": "brakes", GOVERNANCE: "brakes",
  ASSUMPTIONS: "assumptions", "WORKING ASSUMPTIONS": "assumptions",
  "NEXT STEP": "nextSteps", "NEXT STEPS": "nextSteps", "ACTIONABLE NEXT STEP": "nextSteps",
};

// Anchored to line-start and requiring a colon — without this, plain words like
// "Routing" inside bullet content falsely split sections.
const HEADER_RE = new RegExp(
  `^\\s*(?:${SECTION_NAMES.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\s*:`,
  "gim"
);
const BULLET_PREFIX_RE = /^[-*•\d.)\s]+/;
/**
 * Single-pass blueprint parser — was 7 × `new RegExp` + match per call.
 * Now one `exec` scan over the text, then one split per section.
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

  // 1. Scan all section headers in one pass (anchored, so no false splits)
  const sections: Array<{ key: keyof Omit<StructuredBlueprint, "rawText">; start: number; headerEnd: number }> = [];
  let m: RegExpExecArray | null;
  HEADER_RE.lastIndex = 0;
  while ((m = HEADER_RE.exec(text)) !== null) {
    const rawHeader = m[0].replace(/:\s*$/, "").trim().toUpperCase();
    const alias = SECTION_ALIAS[rawHeader] ?? SECTION_ALIAS[rawHeader.replace(/\s+/g, " ").trim()];
    if (!alias) continue;
    if (sections.some((s) => s.key === alias)) continue;
    sections.push({ key: alias, start: m.index, headerEnd: m.index + m[0].length });
  }

  // 2. Slice content between consecutive headers
  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const contentStart = sec.headerEnd;
    const contentEnd = i + 1 < sections.length ? sections[i + 1].start : text.length;
    const slice = text.slice(contentStart, contentEnd).trim();
    if (!slice) continue;

    if (sec.key === "diagnosis") {
      blueprint.diagnosis = slice;
    } else {
      (blueprint[sec.key] as string[]) = extractBulletList(slice);
    }
  }

  // 3. Fallback diagnosis if nothing matched
  if (!blueprint.diagnosis) {
    if (sections.length === 0) {
      // No headers at all — first paragraph is the diagnosis
      const idx = text.search(/\n\s*\n/);
      blueprint.diagnosis = (idx === -1 ? text : text.slice(0, idx)).trim();
    } else {
      // Headers found but no DIAGNOSIS header — use first section's raw slice header? No, fallback paragraph before first header
      const beforeFirst = text.slice(0, sections[0].start).trim();
      if (beforeFirst) blueprint.diagnosis = beforeFirst;
    }
  }

  return blueprint;
}

function extractBulletList(sectionText: string): string[] {
  const out: string[] = [];
  for (const line of sectionText.split(/\r?\n/)) {
    const cleaned = line.replace(BULLET_PREFIX_RE, "").trim();
    if (cleaned.length > 0 && !cleaned.endsWith(":")) out.push(cleaned);
  }
  return out;
}


