import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import {
  SOLUTION_OPPORTUNITY_REGISTRY,
  scoreAndRankPredictedSolutions,
} from "../lib/context/ontology.ts";
import { sanitizeModelOutput } from "../lib/context/poolside.ts";
import type {
  BehaviorModel,
  DirectInputModel,
  EnvironmentModel,
  TechnicalModel,
  TemporalModel,
} from "../lib/context/types.ts";

const COMPONENT_PATH = path.resolve(
  process.cwd(),
  "components/sections/PersonalizedIntelligenceSection.tsx"
);

test("PersonalizedIntelligenceSection: Strict anti-leak guarantee (No <think>, SYS_THINK, or raw telemetry)", () => {
  const content = fs.readFileSync(COMPONENT_PATH, "utf-8");

  // 1. Must NEVER display SYS_THINK or raw reasoning traces in UI
  assert.ok(
    !content.includes("SYS_THINK"),
    "UI must not render SYS_THINK"
  );
  assert.ok(
    !content.includes("REASONING TRACE"),
    "UI must not render REASONING TRACE"
  );
  assert.ok(
    !content.includes("<think>"),
    "UI must not contain <think> tags"
  );
  assert.ok(
    !content.includes("dangerouslySetInnerHTML"),
    "UI must not use dangerouslySetInnerHTML"
  );
});

test("PersonalizedIntelligenceSection: Renders 5 predicted opportunities with AGENTS.md tokens", () => {
  const content = fs.readFileSync(COMPONENT_PATH, "utf-8");

  // 1. Header overline format
  assert.match(
    content,
    /WHAT LAXVISH CAN BUILD FOR YOU|PREDICTED SOLUTION|PREDICTED AI OPPORTUNITY/i,
    "Header must state what Laxvish builds for the visitor"
  );

  // 2. Palette tokens
  assert.match(content, /bg-obsidian/, "Must use obsidian background");
  assert.match(content, /text-charcoal/, "Must use charcoal text");
  assert.match(content, /text-neonCyan/, "Must use neonCyan text");

  // 3. Motion safety
  assert.match(content, /prefersReducedMotion|prefers-reduced-motion/i, "Must support reduced motion");
});

test("SOLUTION_OPPORTUNITY_REGISTRY contains 15+ rich multi-industry AI opportunities", () => {
  assert.ok(
    SOLUTION_OPPORTUNITY_REGISTRY.length >= 15,
    `Registry must contain at least 15 solution opportunities, found ${SOLUTION_OPPORTUNITY_REGISTRY.length}`
  );

  const categories = new Set(SOLUTION_OPPORTUNITY_REGISTRY.map((s) => s.category));
  assert.ok(
    categories.size >= 10,
    `Registry must cover at least 10 distinct categories, found ${categories.size}`
  );

  for (const sol of SOLUTION_OPPORTUNITY_REGISTRY) {
    assert.ok(sol.id, "Solution must have an id");
    assert.ok(sol.title.startsWith("AI for") || sol.title.includes("AI"), "Title should be AI solution oriented");
    assert.ok(sol.headline.length > 5, "Headline must be informative");
    assert.ok(sol.description.length >= 20, "Description must be substantive");
    assert.ok(sol.laxvishCapabilities.length > 0, "Must map to Laxvish capabilities");
    assert.ok(sol.ctaHref.startsWith("/"), "CTA href must be a valid path");
  }
});

test("scoreAndRankPredictedSolutions enforces top 5 diversity across distinct categories", () => {
  const environment: EnvironmentModel = {
    locationSource: "ip",
    locationConfidence: 0.8,
    confidenceTier: "L3",
    city: "Mumbai",
    categories: {
      finance: 0.95,
      business: 0.90,
      healthcare: 0.30,
      education: 0.25,
      government: 0.20,
      retail: 0.80,
      transport: 0.75,
      hospitality: 0.25,
      industrial: 0.45,
      residential: 0.50,
      cultural: 0.20,
    },
    nearestRepresentative: [],
  };

  const behavior: BehaviorModel = {
    sections: {},
    topicsOfInterest: {},
    attentionScore: 0.5,
    readingDepthScore: 0.2,
    backtrackingRatio: 0,
    ctasClicked: [],
    searchQueries: [],
  };

  const direct: DirectInputModel = { promptQueries: [] };
  const temporal: TemporalModel = {
    clientTimestamp: Date.now(),
    serverTimestamp: Date.now(),
    timezone: "Asia/Kolkata",
    localHour: 14,
    localDayOfWeek: "Monday",
    isWeekend: false,
    sessionDurationSec: 10,
  };
  const technical: TechnicalModel = {
    platform: "macOS",
    deviceClass: "desktop",
    browser: "Chrome",
    viewport: { width: 1440, height: 900, pixelRatio: 2 },
    touchSupported: false,
    prefersReducedMotion: false,
    colorScheme: "light",
  };

  const top5 = scoreAndRankPredictedSolutions(environment, behavior, direct, temporal, technical);

  assert.equal(top5.length, 5, "Must return exactly 5 solutions");

  const categories = top5.map((s) => s.category);
  const uniqueCategories = new Set(categories);
  assert.equal(
    uniqueCategories.size,
    5,
    `Top 5 solutions must have 5 distinct categories for diversity, found: ${categories.join(", ")}`
  );

  for (let i = 0; i < 5; i++) {
    assert.equal(top5[i].rank, i + 1, `Solution at index ${i} must have rank ${i + 1}`);
  }
});

test("Direct user input overrides environmental baseline in solution ranking", () => {
  const environment: EnvironmentModel = {
    locationSource: "ip",
    locationConfidence: 0.9,
    confidenceTier: "L3",
    city: "Mumbai",
    categories: {
      finance: 0.95, // Heavy finance bias
      business: 0.90,
      healthcare: 0.10,
      education: 0.10,
      government: 0.10,
      retail: 0.20,
      transport: 0.20,
      hospitality: 0.10,
      industrial: 0.10,
      residential: 0.10,
      cultural: 0.10,
    },
    nearestRepresentative: [],
  };

  const behavior: BehaviorModel = {
    sections: {},
    topicsOfInterest: {},
    attentionScore: 0.5,
    readingDepthScore: 0.2,
    backtrackingRatio: 0,
    ctasClicked: [],
    searchQueries: [],
  };

  // Explicit user query looking for hospital / healthcare solutions
  const direct: DirectInputModel = {
    promptQueries: ["We need AI for our hospital clinical documentation and patient records"],
  };

  const temporal: TemporalModel = {
    clientTimestamp: Date.now(),
    serverTimestamp: Date.now(),
    timezone: "Asia/Kolkata",
    localHour: 11,
    localDayOfWeek: "Tuesday",
    isWeekend: false,
    sessionDurationSec: 30,
  };
  const technical: TechnicalModel = {
    platform: "Windows",
    deviceClass: "desktop",
    browser: "Chrome",
    viewport: { width: 1920, height: 1080, pixelRatio: 1 },
    touchSupported: false,
    prefersReducedMotion: false,
    colorScheme: "light",
  };

  const top5 = scoreAndRankPredictedSolutions(environment, behavior, direct, temporal, technical);

  assert.equal(top5[0].category, "healthcare", "Healthcare opportunity must be ranked #1 when user explicitly inquires about it");
  assert.equal(top5[0].title, "AI for Healthcare");
});

test("sanitizeModelOutput cleanly strips thinking tags and JSON code fences", () => {
  const dirty = `<think>
The visitor is in Bengaluru. I will synthesize an education solution.
</think>
\`\`\`json
{
  "solutions": [
    {
      "id": "ai_education_platform",
      "headline": "Institutional Administration",
      "description": "We can build an AI education platform."
    }
  ]
}
\`\`\``;

  const clean = sanitizeModelOutput(dirty);
  assert.ok(!clean.includes("<think>"), "Must strip <think>");
  assert.ok(!clean.includes("</think>"), "Must strip </think>");
  assert.ok(!clean.includes("```json"), "Must strip json code fence");
  assert.ok(!clean.includes("```"), "Must strip backticks");

  const parsed = JSON.parse(clean);
  assert.equal(parsed.solutions[0].id, "ai_education_platform");
});
