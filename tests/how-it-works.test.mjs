/*
 * How It Works section contract: verifies the homepage customer journey progression.
 *
 * Static source-level test (repo convention):
 * Asserts the section carries the requested heading, supporting copy,
 * five ordered steps (Choose, Configure, Connect, Deploy, Monitor),
 * accessible progression semantics, and mounts directly after AgentWorkforceSection in app/page.tsx.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SECTION_PATH = path.join(ROOT, "components", "sections", "HowItWorksSection.tsx");
const HOME_PATH = path.join(ROOT, "app", "page.tsx");

function sectionSourceNormalized() {
  return fs.readFileSync(SECTION_PATH, "utf8").replace(/\s+/g, " ");
}

test("HowItWorksSection: file exists and exports HowItWorksSection", () => {
  assert.ok(fs.existsSync(SECTION_PATH), "HowItWorksSection.tsx must exist");
  const raw = fs.readFileSync(SECTION_PATH, "utf8");
  assert.match(raw, /export\s+function\s+HowItWorksSection\s*\(/, "Must export HowItWorksSection");
});

test("HowItWorksSection: carries requested section heading and supporting copy", () => {
  assert.ok(fs.existsSync(SECTION_PATH), "HowItWorksSection.tsx must exist");
  const src = sectionSourceNormalized();
  assert.ok(
    src.includes("From AI agent to working system"),
    'Must contain heading "From AI agent to working system"'
  );
  assert.ok(
    src.includes(
      "Start with an agent built for a specific business task. Configure how it works, connect the systems it needs, and put it into your workflow."
    ),
    "Must contain exact supporting copy"
  );
});

test("HowItWorksSection: contains all five sequential steps with accurate copy", () => {
  assert.ok(fs.existsSync(SECTION_PATH), "HowItWorksSection.tsx must exist");
  const src = sectionSourceNormalized();

  // 01 — Choose
  assert.ok(src.includes("01"), "Step 01 must exist");
  assert.ok(src.includes("Choose"), "Step 01 title must be Choose");
  assert.ok(
    src.includes("Start with an AI agent built for a specific business workflow."),
    "Step 01 description must match"
  );

  // 02 — Configure
  assert.ok(src.includes("02"), "Step 02 must exist");
  assert.ok(src.includes("Configure"), "Step 02 title must be Configure");
  assert.ok(
    src.includes(
      "Customize its behavior, instructions, knowledge, and how it should handle different situations."
    ),
    "Step 02 description must match"
  );

  // 03 — Connect
  assert.ok(src.includes("03"), "Step 03 must exist");
  assert.ok(src.includes("Connect"), "Step 03 title must be Connect");
  assert.ok(
    src.includes(
      "Give the agent access to the tools, data, and systems required for its work."
    ),
    "Step 03 description must match"
  );

  // 04 — Deploy
  assert.ok(src.includes("04"), "Step 04 must exist");
  assert.ok(src.includes("Deploy"), "Step 04 title must be Deploy");
  assert.ok(
    src.includes("Put the agent into the workflow where your team needs it."),
    "Step 04 description must match"
  );

  // 05 — Monitor
  assert.ok(src.includes("05"), "Step 05 must exist");
  assert.ok(src.includes("Monitor"), "Step 05 title must be Monitor");
  assert.ok(
    src.includes(
      "Review activity, outcomes, exceptions, and improve how the agent operates over time."
    ),
    "Step 05 description must match"
  );
});

test("HowItWorksSection: mounted directly after AgentWorkforceSection in app/page.tsx", () => {
  assert.ok(fs.existsSync(HOME_PATH), "app/page.tsx must exist");
  const homeContent = fs.readFileSync(HOME_PATH, "utf8").replace(/\s+/g, " ");

  assert.ok(
    homeContent.includes("<AgentWorkforceSection /> <HowItWorksSection />") ||
      homeContent.includes("<AgentWorkforceSection/> <HowItWorksSection/>") ||
      homeContent.includes("<AgentWorkforceSection /> <HowItWorksSection"),
    "HowItWorksSection must be placed directly after AgentWorkforceSection in app/page.tsx"
  );
});
