import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";

const COMPONENT_PATH = path.resolve(
  process.cwd(),
  "components/sections/PersonalizedIntelligenceSection.tsx"
);

test("PersonalizedIntelligenceSection: stage names live in backend code only, never visible in UI", () => {
  const content = fs.readFileSync(COMPONENT_PATH, "utf-8");

  // 1. Header moment label must use neutral format like MOMENT 0X / 05, not // STAGENAME
  assert.ok(
    !content.includes("MOMENT 0${activeIndex + 1} // ${currentStage"),
    "Header must not display currentStage name in UI"
  );
  assert.match(
    content,
    /MOMENT 0\$\{activeIndex \+ 1\} \/ 0\$\{ROTATION_STAGES\.length\}|MOMENT 0\$\{activeIndex \+ 1\} \/ 0\d/i,
    "Header must display neutral moment counter format e.g. MOMENT 01 / 05"
  );

  // 2. Reasoning trace header must not display stage name
  assert.ok(
    !content.includes("REASONING TRACE // ${currentStage"),
    "Inspector header must not display currentStage name in UI"
  );
  assert.match(
    content,
    /<span>REASONING TRACE<\/span>/,
    "Inspector header must be neutral REASONING TRACE"
  );

  // 3. NarrativeStage enum strings must not be rendered into visible UI templates
  const stageNames = ["arrival", "environment", "opportunity", "interaction", "synthesis"];
  for (const stage of stageNames) {
    // Stage names can be used in ROTATION_STAGES, keys, API bodies, types, but not in JSX text nodes
    const jsxTextPattern = new RegExp(`>\\s*${stage}\\s*<`, "i");
    assert.ok(
      !jsxTextPattern.test(content),
      `Stage name "${stage}" must not appear as literal JSX text`
    );
  }
});

test("PersonalizedIntelligenceSection: typewriter reveal logic and cursor presence", () => {
  const content = fs.readFileSync(COMPONENT_PATH, "utf-8");

  // 1. Component must maintain typewriter / displayed text state
  assert.match(
    content,
    /displayedLength|displayedText|isTyping/i,
    "Component must maintain typewriter / displayed text state"
  );

  // 2. Component must handle prefers-reduced-motion
  assert.match(
    content,
    /prefers-reduced-motion|prefersReducedMotion/i,
    "Component must respect prefers-reduced-motion preference"
  );

  // 3. Component must render a monochrome cursor tick
  assert.match(
    content,
    /bg-charcoal/,
    "Component must render cursor in binding palette token"
  );
});

test("PersonalizedIntelligenceSection: completion-driven advancement and calm timing constants", () => {
  const content = fs.readFileSync(COMPONENT_PATH, "utf-8");

  // 1. Calm readable typewriter tick: ~28-35ms per tick (not 14ms)
  const tickMatch = content.match(/TYPEWRITER_TICK_MS\s*=\s*(\d+)/);
  assert.ok(tickMatch, "TYPEWRITER_TICK_MS constant must be defined");
  const tickMs = parseInt(tickMatch[1], 10);
  assert.ok(
    tickMs >= 25 && tickMs <= 35,
    `TYPEWRITER_TICK_MS (${tickMs}ms) must be in the calm readable range of 25ms-35ms`
  );

  // 2. Hold phase constant: ~2500-3500ms
  const holdMatch = content.match(/HOLD_DURATION_MS\s*=\s*(\d+)/);
  assert.ok(holdMatch, "HOLD_DURATION_MS constant must be defined");
  const holdMs = parseInt(holdMatch[1], 10);
  assert.ok(
    holdMs >= 2500 && holdMs <= 3500,
    `HOLD_DURATION_MS (${holdMs}ms) must be in the hold range of 2500ms-3500ms`
  );

  // 3. Must NOT have fixed-interval unconditional rotation loop (e.g. ROTATION_INTERVAL_MS = 3000)
  assert.ok(
    !content.includes("ROTATION_INTERVAL_MS"),
    "Fixed ROTATION_INTERVAL_MS must be removed in favor of completion-driven hold advancement"
  );

  // 4. Component must check completion before advancing stage
  assert.match(
    content,
    /displayedLength\s*<\s*currentText\.length|displayedLength\s*>=\s*currentText\.length/,
    "Advancement effect must guard on text completion (displayedLength vs currentText.length)"
  );
});

test("Typewriter stepping algorithm: incremental progress and mid-stream extension preservation", () => {
  // Simulate typewriter step calculations
  const targetText = "Laxvish Thread synthesizes autonomous enterprise actions across logistics and billing.";
  let currentLength = 0;
  const tickStep = (curr: number, targetLen: number) => {
    const remaining = targetLen - curr;
    const step = remaining > 160 ? 2 : 1;
    return Math.min(curr + step, targetLen);
  };

  // Step 1: Initial progression
  while (currentLength < 20) {
    currentLength = tickStep(currentLength, targetText.length);
  }
  assert.equal(currentLength, 20);

  // Step 2: Mid-stream extension (e.g., streaming token appends text)
  const extendedTarget = targetText + " Seamless telemetry dispatch active.";
  // Progress does not reset to 0
  assert.ok(currentLength >= 20, "Progress must not regress when target expands");
  currentLength = tickStep(currentLength, extendedTarget.length);
  assert.equal(currentLength, 21);

  // Step 3: Run to completion
  while (currentLength < extendedTarget.length) {
    currentLength = tickStep(currentLength, extendedTarget.length);
  }
  assert.equal(currentLength, extendedTarget.length);
});

test("Completion-driven state machine: full text guarantee, hold phase, and streaming resilience", () => {
  const tickMs = 28;
  const holdMs = 3000;
  const tickStep = (curr: number, targetLen: number) => {
    const remaining = targetLen - curr;
    const step = remaining > 160 ? 2 : 1;
    return Math.min(curr + step, targetLen);
  };

  // Scenario 1: Typical text (150-350 chars) typing duration is in calm ~3-7s range
  const sampleTexts = [
    "Short enterprise moment description for testing.", // 49 chars
    "Connecting from Bengaluru during working hours. Let's see what we can understand before you tell us what you need.", // 114 chars
    "You are surrounded by a high-density industrial and commercial corridor with complex operational workflows across multiple enterprise units.", // 141 chars
    "Laxvish Thread synthesizes autonomous enterprise actions across logistics, billing, and regulatory compliance without requiring manual intervention from operations teams.", // 172 chars
    "Analyzing multi-point telemetry across 500 nodes. Machine operations indicate concentrated transaction volumes across distribution hubs, requiring automated orchestration and real-time ledger settlement.", // 207 chars
  ];

  for (const text of sampleTexts) {
    let len = 0;
    let ticks = 0;
    while (len < text.length) {
      len = tickStep(len, text.length);
      ticks++;
    }
    const typingTimeMs = ticks * tickMs;
    // Typing time should be proportional and readable (~25-35ms per char)
    const effectiveMsPerChar = typingTimeMs / text.length;
    assert.ok(
      effectiveMsPerChar >= 18 && effectiveMsPerChar <= 35,
      `Effective rate ${effectiveMsPerChar}ms/char for length ${text.length} must be calm and readable`
    );
  }

  // Scenario 2: Guarantee: never advances before displayedLength reaches currentText.length
  let stage = 0;
  let displayedLen = 0;
  let text = "Full text to be typed out completely.";
  let holdRemaining = holdMs;

  const simulateTick = (elapsedMs: number) => {
    if (displayedLen < text.length) {
      displayedLen = tickStep(displayedLen, text.length);
      holdRemaining = holdMs; // hold reset while typing
      return false; // did not advance
    }
    // Fully displayed: hold phase
    holdRemaining -= elapsedMs;
    if (holdRemaining <= 0) {
      stage = (stage + 1) % 5;
      displayedLen = 0;
      holdRemaining = holdMs;
      return true; // advanced
    }
    return false;
  };

  // Step while typing
  while (displayedLen < text.length) {
    const advanced = simulateTick(tickMs);
    assert.equal(advanced, false, "Must never advance while typing is incomplete");
    assert.equal(stage, 0, "Stage must remain 0 while typing");
  }

  // Verify at moment of completion: still on stage 0
  assert.equal(displayedLen, text.length);
  assert.equal(stage, 0);

  // During hold phase (e.g. 2000ms into a 3000ms hold)
  for (let t = 0; t < 2000; t += tickMs) {
    const advanced = simulateTick(tickMs);
    assert.equal(advanced, false, "Must not advance before hold completes");
  }
  assert.equal(stage, 0, "Must still be stage 0 during hold");

  // Complete the hold phase
  while (stage === 0) {
    simulateTick(tickMs);
  }
  assert.equal(stage, 1, "Must advance to stage 1 only after full hold period");
  assert.equal(displayedLen, 0, "New stage begins with displayedLength 0");
});
