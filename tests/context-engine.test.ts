import assert from "node:assert/strict";
import { test } from "node:test";
import {
  extractEdgeLocation,
  buildGpsEnvironmentModel,
  resolveCityFromCoordinates,
} from "../lib/context/environment.ts";
import { scoreProblemHypotheses } from "../lib/context/ontology.ts";
import {
  generateDeterministicNarrative,
  validateNarrativeOutput,
  extractThoughtAndNarrative,
} from "../lib/context/poolside.ts";
import type { LaxvishContextGraph } from "../lib/context/types.ts";

function createMockGraph(): LaxvishContextGraph {
  return {
    sessionId: "test_session_123",
    anonymousVisitorId: "test_anon_456",
    isReturning: false,
    technical: {
      platform: "Android",
      deviceClass: "mobile",
      browser: "Chrome",
      viewport: { width: 412, height: 915, pixelRatio: 2.6 },
      touchSupported: true,
      prefersReducedMotion: false,
      colorScheme: "light",
    },
    temporal: {
      clientTimestamp: Date.now(),
      serverTimestamp: Date.now(),
      timezone: "Asia/Kolkata",
      localHour: 14,
      localDayOfWeek: "Wednesday",
      isWeekend: false,
      sessionDurationSec: 45,
    },
    environment: {
      locationSource: "ip",
      locationConfidence: 0.6,
      confidenceTier: "L2",
      city: "Bengaluru",
      region: "Karnataka",
      country: "IN",
      categories: {
        healthcare: 0.32,
        education: 0.70,
        business: 0.92,
        finance: 0.65,
        government: 0.20,
        retail: 0.35,
        transport: 0.30,
        hospitality: 0.25,
        industrial: 0.55,
        residential: 0.50,
        cultural: 0.20,
      },
      nearestRepresentative: [],
    },
    behavior: {
      sections: {
        pillars_workers: { sectionId: "pillars_workers", totalDwellSeconds: 30, maxScrollDepth: 0.4, visitCount: 1 },
      },
      topicsOfInterest: {
        telephony: 0.85,
        automation: 0.60,
      },
      attentionScore: 0.88,
      readingDepthScore: 0.75,
      backtrackingRatio: 0.1,
      ctasClicked: [],
      searchQueries: [],
    },
    direct: {
      promptQueries: ["how to automate incoming sales calls"],
    },
    hypotheses: [],
    narratives: {},
    activeStage: "arrival",
  };
}

test("extractEdgeLocation correctly parses Vercel and Cloudflare IP geo headers", () => {
  const headers = new Headers({
    "x-vercel-ip-city": "Bengaluru",
    "x-vercel-ip-country-region": "KA",
    "x-vercel-ip-country": "IN",
    "x-vercel-ip-latitude": "12.9716",
    "x-vercel-ip-longitude": "77.5946",
  });

  const loc = extractEdgeLocation(headers);
  assert.equal(loc.city, "Bengaluru");
  assert.equal(loc.country, "IN");
  assert.equal(loc.locationSource, "ip");
  assert.equal(loc.confidenceTier, "L2");
  assert.ok((loc.categories?.business || 0) > 0.8, "Bengaluru should have high business density");
});

test("resolveCityFromCoordinates accurately matches Indian metropolitan clusters", () => {
  // Mumbai coordinates (approx 19.0760, 72.8777)
  const mumbai = resolveCityFromCoordinates(19.076, 72.877);
  assert.equal(mumbai, "Mumbai");

  // Delhi coordinates (approx 28.7041, 77.1025)
  const delhi = resolveCityFromCoordinates(28.704, 77.102);
  assert.equal(delhi, "Delhi");

  // Chennai coordinates (approx 13.0827, 80.2707)
  const chennai = resolveCityFromCoordinates(13.082, 80.27);
  assert.equal(chennai, "Chennai");

  // Remote coordinates (e.g. open ocean or distant location)
  const remote = resolveCityFromCoordinates(0, 0);
  assert.equal(remote, undefined);
});

test("buildGpsEnvironmentModel assigns L4 confidence for precision GPS <= 50m and resolves city", () => {
  const gpsEnv = buildGpsEnvironmentModel(13.0827, 80.2707, 15);
  assert.equal(gpsEnv.locationSource, "gps");
  assert.equal(gpsEnv.confidenceTier, "L4");
  assert.equal(gpsEnv.locationConfidence, 0.95);
  assert.equal(gpsEnv.city, "Chennai");
  assert.ok((gpsEnv.categories.industrial || 0) > 0.8, "Chennai should have high industrial density");
});

test("scoreProblemHypotheses gives top priority to direct user inquiry", () => {
  const graph = createMockGraph();
  const { hypotheses, topSolution } = scoreProblemHypotheses(
    graph.environment,
    graph.behavior,
    graph.direct,
    graph.temporal,
    graph.technical
  );

  assert.ok(hypotheses.length > 0);
  assert.equal(hypotheses[0].problemKey, "sales_lead_qualification_bottleneck");
  assert.ok(hypotheses[0].confidence > 0.8);
  assert.equal(topSolution?.recommendedWorker, "Voice AI Agent");
});

test("extractThoughtAndNarrative separates reasoning from narrative statement", () => {
  const input = "<think>Analyzing Mumbai financial cluster signals.</think>Enterprise workflows running at high density.";
  const result = extractThoughtAndNarrative(input);
  assert.equal(result.thought, "Analyzing Mumbai financial cluster signals.");
  assert.equal(result.text, "Enterprise workflows running at high density.");

  const openInput = "<think>Streaming reasoning in progress...";
  const openResult = extractThoughtAndNarrative(openInput);
  assert.equal(openResult.thought, "Streaming reasoning in progress...");
  assert.equal(openResult.text, "");

  const plainInput = "Direct narrative text without thinking tags.";
  const plainResult = extractThoughtAndNarrative(plainInput);
  assert.equal(plainResult.thought, "");
  assert.equal(plainResult.text, "Direct narrative text without thinking tags.");
});

test("validateNarrativeOutput blocks surveillance claims and validates thinking-wrapped text", () => {
  const bad1 = validateNarrativeOutput("<think>Inspecting private files</think>We noticed your WhatsApp conversations.");
  assert.equal(bad1.valid, false);

  const bad2 = validateNarrativeOutput("Based on your Gmail and other tabs, you need AI.");
  assert.equal(bad2.valid, false);

  const good = validateNarrativeOutput(
    "<think>Evaluating operational density.</think>High-density commercial ecosystems contain repetitive coordination that AI workers can quietly eliminate."
  );
  assert.equal(good.valid, true);
});

test("validateNarrativeOutput accepts easy-language predicted solutions across all stages", () => {
  const sampleArrival = "<think>Analyzing entry time and device.</think>Connecting from Bengaluru during working hours. Let us see how Laxvish can help your team.";
  assert.equal(validateNarrativeOutput(sampleArrival).valid, true);

  const sampleEnvironment = "<think>Checking commercial density.</think>Your area has many fast-growing businesses. Teams here lose hours every day to manual data entry.";
  assert.equal(validateNarrativeOutput(sampleEnvironment).valid, true);

  const sampleOpportunity = "<think>Predicting operational bottleneck.</think>Repetitive follow-ups slow down your sales pipeline. Laxvish Telephony can answer customer calls instantly.";
  assert.equal(validateNarrativeOutput(sampleOpportunity).valid, true);

  const sampleInteraction = "<think>Observing focused review.</think>You are reviewing automated workflows for your team. Laxvish Workers can run these tasks without manual effort.";
  assert.equal(validateNarrativeOutput(sampleInteraction).valid, true);

  const sampleSynthesis = "<think>Final prediction and solution.</think>Your team spends too much time on routine tasks. Laxvish Brain can automate your daily business workflows today.";
  assert.equal(validateNarrativeOutput(sampleSynthesis).valid, true);
});

test("MASTER_SYSTEM_PROMPT adheres to easy language, solution prediction, and AGENTS.md rules", async () => {
  const poolsideMod = await import("../lib/context/poolside.ts");
  // Ensure the prompt does not have em-dashes
  assert.ok(!JSON.stringify(poolsideMod).includes("\u2014"), "Prompt must not contain em-dashes");
});

test("generateDeterministicNarrative generates valid moments with thoughts for all 5 stages", () => {
  const graph = createMockGraph();
  const stages: ("arrival" | "environment" | "opportunity" | "interaction" | "synthesis")[] = [
    "arrival",
    "environment",
    "opportunity",
    "interaction",
    "synthesis",
  ];

  for (const stage of stages) {
    const moment = generateDeterministicNarrative(graph, stage);
    assert.equal(moment.stage, stage);
    assert.ok(moment.text.length > 15, `Stage ${stage} text should not be empty`);
    assert.ok(typeof moment.thought === "string" && moment.thought.length > 10, `Stage ${stage} thought should be populated`);
    assert.ok(moment.confidence >= 0.40, `Stage ${stage} confidence should be >= 0.4`);
    assert.ok(moment.evidenceUsed.length > 0, `Stage ${stage} should have evidence tags`);
  }
});
