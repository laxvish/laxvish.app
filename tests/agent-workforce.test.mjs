/*
 * Agent Workforce section contract: verifies the homepage AI agents showcase.
 *
 * Static source-level test (repo convention — see hero-copy.test.mjs):
 * no build, no server. Asserts the section carries the requested heading,
 * supporting copy, grounded agent cards, verified routes, and mounts directly after Hero.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SECTION_PATH = path.join(ROOT, "components", "sections", "AgentWorkforceSection.tsx");
const HOME_PATH = path.join(ROOT, "app", "page.tsx");

function sectionSourceNormalized() {
  return fs.readFileSync(SECTION_PATH, "utf8").replace(/\s+/g, " ");
}

test("AgentWorkforceSection: file exists and exports AgentWorkforceSection", () => {
  assert.ok(fs.existsSync(SECTION_PATH), "AgentWorkforceSection.tsx must exist");
  const raw = fs.readFileSync(SECTION_PATH, "utf8");
  assert.match(raw, /export\s+function\s+AgentWorkforceSection\s*\(/, "Must export AgentWorkforceSection");
});

test("AgentWorkforceSection: carries requested section heading and supporting copy", () => {
  const src = sectionSourceNormalized();
  assert.ok(src.includes("Meet your AI workforce"), 'Must contain heading "Meet your AI workforce"');
  assert.ok(
    src.includes(
      "Specialized AI agents built to handle real business work — from customer conversations and sales operations to research and repetitive workflows."
    ),
    "Must contain exact supporting copy"
  );
});

test("AgentWorkforceSection: presents real, concrete AI agents including CallMe as a member", () => {
  const src = sectionSourceNormalized();
  // CallMe voice agent
  assert.ok(src.includes("CallMe"), "CallMe agent must be present");
  assert.ok(src.includes("/callme"), "CallMe route /callme must be linked");

  // Sales & Lead Qualification
  assert.ok(src.includes("Sales") && src.includes("Lead"), "Sales & Lead Qualification agent must be present");
  assert.ok(src.includes("/solutions/sales-automation"), "Sales automation route must be linked");

  // Customer Support
  assert.ok(src.includes("Customer Support"), "Customer Support agent must be present");
  assert.ok(src.includes("/solutions/customer-support"), "Customer support route must be linked");

  // Document & Extraction
  assert.ok(src.includes("Document"), "Document & Extraction agent must be present");
  assert.ok(src.includes("/solutions/document-processing"), "Document processing route must be linked");

  // Internal Knowledge
  assert.ok(src.includes("Internal Knowledge"), "Internal Knowledge agent must be present");
  assert.ok(src.includes("/solutions/internal-knowledge"), "Internal knowledge route must be linked");

  // Finance & AP
  assert.ok(src.includes("Finance") || src.includes("Accounts Payable"), "Finance agent must be present");
  assert.ok(src.includes("/solutions/finance-ap"), "Finance AP route must be linked");
});

test("AgentWorkforceSection: all linked routes physically exist on disk", () => {
  const raw = fs.readFileSync(SECTION_PATH, "utf8");
  const hrefMatches = [...raw.matchAll(/href(?::|=)\s*["']([^"']+)["']/g)].map((m) => m[1]);

  assert.ok(hrefMatches.length >= 6, "Must link to at least 6 agent destinations");

  // Read USE_CASES slugs for dynamic /solutions/[slug] routes
  const useCasesRaw = fs.readFileSync(path.join(ROOT, "lib", "use-cases.ts"), "utf8");
  const validSlugs = new Set([...useCasesRaw.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]));

  for (const href of hrefMatches) {
    if (href.startsWith("http") || href.startsWith("#")) continue;

    const cleanPath = href.split("?")[0].replace(/^\//, "");
    const directPage = path.join(ROOT, "app", cleanPath, "page.tsx");

    if (cleanPath.startsWith("solutions/")) {
      const slug = cleanPath.replace("solutions/", "");
      const dynamicPage = path.join(ROOT, "app", "solutions", "[slug]", "page.tsx");
      assert.ok(
        fs.existsSync(dynamicPage) && validSlugs.has(slug),
        `Route ${href} with slug "${slug}" must exist in USE_CASES and match ${dynamicPage}`
      );
    } else {
      assert.ok(
        fs.existsSync(directPage),
        `Route ${href} must resolve to a valid page at ${directPage}`
      );
    }
  }
});

test("AgentWorkforceSection: mounted directly after Hero in app/page.tsx", () => {
  assert.ok(fs.existsSync(HOME_PATH), "app/page.tsx must exist");
  const homeContent = fs.readFileSync(HOME_PATH, "utf8").replace(/\s+/g, " ");

  assert.ok(
    homeContent.includes("<Hero /> <AgentWorkforceSection />") ||
    homeContent.includes("<Hero/> <AgentWorkforceSection/>") ||
    homeContent.includes("<Hero /> <AgentWorkforceSection"),
    "AgentWorkforceSection must be placed directly after Hero in app/page.tsx"
  );
});
