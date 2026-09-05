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
  AIPrediction,
  AIPredictionsResponse,
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

test("PersonalizedIntelligenceSection: Strict anti-dashboard and anti-leak guarantee", () => {
  const content = fs.readFileSync(COMPONENT_PATH, "utf-8");

  // 1. Must NEVER display SYS_THINK, INSPECT, or raw reasoning traces in UI
  assert.ok(!content.includes("SYS_THINK"), "UI must not render SYS_THINK");
  assert.ok(!content.includes("REASONING TRACE"), "UI must not render REASONING TRACE");
  assert.ok(!content.includes("INSPECT"), "UI must not render INSPECT button");
  assert.ok(!content.includes("<think>"), "UI must not contain <think> tags");
  assert.ok(!content.includes("dangerouslySetInnerHTML"), "UI must not use dangerouslySetInnerHTML");

  // 2. Must NOT render dashboard cards, meters, badges, or telemetry tables
  assert.ok(!content.includes("CONFIDENCE:"), "UI must not render confidence score percentage in UI");
  assert.ok(!content.includes("BUILT WITH:"), "UI must not render technical capability badge flood");
  assert.ok(!content.includes("[ RELEVANCE SIGNAL ]"), "UI must not render telemetry tags in UI");
  assert.ok(!content.includes("1 of 5"), "UI must not render 1 of 5 indicators");
  assert.ok(!content.includes("01 / 05"), "UI must not render 01 / 05 indicators");
});

test("PersonalizedIntelligenceSection: One-letter-at-a-time typewriter and closed-loop transition", () => {
  const content = fs.readFileSync(COMPONENT_PATH, "utf-8");

  // 1. Understated section introduction
  assert.match(
    content,
    /We’ve been thinking about what AI could do for you/i,
    "Header must state understated intro: We’ve been thinking about what AI could do for you"
  );

  // 2. One letter at a time typewriter reveal
  assert.match(
    content,
    /TYPEWRITER_TICK_MS|displayedLength/i,
    "Must implement one-letter-at-a-time typewriter reveal logic"
  );

  // 3. Holds each complete prediction for 2000ms
  assert.match(
    content,
    /PREDICTION_HOLD_MS\s*=\s*2000|2000/i,
    "Must hold each prediction for 2000ms before transitioning"
  );

  // 4. Closed loop transition: (current + 1) % predictions.length
  assert.match(
    content,
    /\(current\s*\+\s*1\)\s*%\s*predictions\.length/,
    "Must implement closed-loop progression (1 -> 2 -> 3 -> 4 -> 5 -> 1)"
  );

  // 5. Palette tokens
  assert.match(content, /bg-obsidian/, "Must use obsidian background");
  assert.match(content, /text-charcoal/, "Must use charcoal text");
  assert.match(content, /text-neonCyan/, "Must use neonCyan text");

  // 6. Motion safety
  assert.match(content, /prefersReducedMotion|prefers-reduced-motion/i, "Must support reduced motion");

  // 7. Closing action
  assert.match(content, /Let’s talk about what we could build for you/i, "Must have quiet conversational closing action");
});

test("TypeScript types: AIPrediction and AIPredictionsResponse conform to contract", () => {
  const prediction: AIPrediction = {
    text: "I think we could help you scale your business with AI.",
  };
  assert.ok(typeof prediction.text === "string");

  const response: AIPredictionsResponse = {
    predictions: [
      prediction,
      { text: "If education is part of your world..." },
    ],
  };
  assert.ok(Array.isArray(response.predictions));
  assert.equal(response.predictions.length, 2);
  assert.equal(response.predictions[0].text, prediction.text);
});

test("Sequential state machine progresses in a closed loop (1->2->3->4->5->1)", () => {
  const predictions: AIPrediction[] = [
    { text: "Thought 1" },
    { text: "Thought 2" },
    { text: "Thought 3" },
    { text: "Thought 4" },
    { text: "Thought 5" },
  ];

  let activeIndex = 0;

  const advanceInClosedLoop = (current: number) => {
    return (current + 1) % predictions.length;
  };

  // 0 -> 1 -> 2 -> 3 -> 4 -> 0
  activeIndex = advanceInClosedLoop(activeIndex);
  assert.equal(activeIndex, 1);
  activeIndex = advanceInClosedLoop(activeIndex);
  assert.equal(activeIndex, 2);
  activeIndex = advanceInClosedLoop(activeIndex);
  assert.equal(activeIndex, 3);
  activeIndex = advanceInClosedLoop(activeIndex);
  assert.equal(activeIndex, 4);

  // After 4 (Thought 5), advances back to 0 (Thought 1) - Closed Loop!
  activeIndex = advanceInClosedLoop(activeIndex);
  assert.equal(activeIndex, 0, "Must loop back to prediction #1 after #5 in a closed loop");
});

test("SOLUTION_OPPORTUNITY_REGISTRY contains 15+ rich multi-industry AI opportunities with conversational thoughts", () => {
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
    assert.ok(sol.conversationalThought.length >= 30, "Must have rich conversational thought text");
    assert.ok(!sol.conversationalThought.includes("<think>"), "Conversational thought must not contain <think>");
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
    assert.ok(top5[i].text.length >= 30, `Thought text at rank ${i + 1} must be substantial`);
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
  assert.ok(top5[0].text.includes("healthcare") || top5[0].text.includes("clinical"), "Thought text must reflect healthcare domain");
});

test("sanitizeModelOutput cleanly strips thinking tags and JSON code fences", () => {
  const dirty = `<think>
The visitor is in Bengaluru. I will synthesize an education solution.
</think>
\`\`\`json
{
  "predictions": [
    {
      "id": "ai_education_platform",
      "text": "And if education is part of your world, we could build an AI layer around your school."
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
  assert.equal(parsed.predictions[0].id, "ai_education_platform");
  assert.ok(parsed.predictions[0].text.startsWith("And if education"));
});
