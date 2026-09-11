/*
 * Hero copy contract: the "AI agents that do the work" messaging.
 *
 * Static source-level test (repo convention — see navbar-navigation.test.mjs):
 * no build, no server. Asserts the hero copy block carries the approved
 * headline/sub-line/paragraph, wires both CTAs to real internal routes
 * (/solutions, /contact), and has fully retired the external neetocal
 * booking CTA and the previous "Workers execute. Brain coordinates" copy.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const HERO_PATH = path.join(ROOT, "components", "sections", "Hero.tsx");

/** Source with whitespace collapsed so JSX line-wrapping cannot break a match. */
function heroSourceNormalized() {
  return fs.readFileSync(HERO_PATH, "utf8").replace(/\s+/g, " ");
}

const NEW_EYEBROW = "AI Agents for Business";
const NEW_HEADLINE = "AI agents that do the work.";
const NEW_SUBLINE =
  "Deploy, customize, and control an AI workforce for your business.";
const NEW_PARAGRAPH =
  "Laxvish gives businesses specialized AI agents for sales, support, research, operations, and workflows — with the tools to connect them to the systems your team already uses and keep their execution under control.";

test("Hero copy: eyebrow, headline, and sub-line carry the AI-agents messaging", () => {
  const src = heroSourceNormalized();
  assert.ok(src.includes(NEW_EYEBROW), `eyebrow "${NEW_EYEBROW}" must be present`);
  assert.ok(src.includes(NEW_HEADLINE), `h1 "${NEW_HEADLINE}" must be present`);
  assert.ok(src.includes(NEW_SUBLINE), `sub-line "${NEW_SUBLINE}" must be present`);
});

test("Hero copy: supporting paragraph replaced with the agent-workforce positioning", () => {
  const src = heroSourceNormalized();
  assert.ok(src.includes(NEW_PARAGRAPH), "new supporting paragraph must be present verbatim (em-dash included)");
  assert.ok(
    !src.includes("Workers execute. Brain coordinates"),
    "old paragraph lead-in must be gone",
  );
});

test("Hero CTAs: Explore AI Agents (solid) → /solutions and Talk to Laxvish (outline) → /contact", () => {
  const src = heroSourceNormalized();
  assert.ok(src.includes("Explore AI Agents"), 'primary CTA label "Explore AI Agents" must be present');
  assert.ok(src.includes('href="/solutions"'), 'primary CTA must link to internal route href="/solutions"');
  assert.ok(src.includes("Talk to Laxvish"), 'secondary CTA label "Talk to Laxvish" must be present');
  assert.ok(src.includes('href="/contact"'), 'secondary CTA must link to internal route href="/contact"');
  // The asserted routes must physically exist as app-router pages, not just strings.
  assert.ok(
    fs.existsSync(path.join(ROOT, "app", "solutions", "page.tsx")),
    'route /solutions must exist at app/solutions/page.tsx',
  );
  assert.ok(
    fs.existsSync(path.join(ROOT, "app", "contact", "page.tsx")),
    'route /contact must exist at app/contact/page.tsx',
  );
  // Shared button classes stay in use (lib/site-navigation.ts constants).
  assert.ok(src.includes("BOOK_NOW_BUTTON_CLASS"), "solid CTA must reuse BOOK_NOW_BUTTON_CLASS");
  assert.ok(src.includes("SECONDARY_HERO_CTA_CLASS"), "outline CTA must reuse SECONDARY_HERO_CTA_CLASS");
  // Primary precedes secondary in the CTA row.
  assert.ok(
    src.indexOf("Explore AI Agents") < src.indexOf("Talk to Laxvish"),
    '"Explore AI Agents" must come before "Talk to Laxvish"',
  );
});

test("Hero CTAs: external neetocal booking wiring fully removed", () => {
  const src = heroSourceNormalized();
  assert.ok(!src.includes("Book a working session"), 'old label "Book a working session" must be absent');
  assert.ok(!src.includes("getBookDemoUrl"), "getBookDemoUrl import/call must be removed");
  assert.ok(!src.includes("bookDemoUrl"), "bookDemoUrl variable must be removed");
  assert.ok(!src.includes('target="_blank"'), "no external target=_blank may remain in the hero");
  assert.ok(!/rel="noopener/.test(src), "no external rel attributes may remain in the hero");
});

test("Hero copy: previous messaging retired", () => {
  const src = heroSourceNormalized();
  assert.ok(
    !src.includes("We build AI systems that do the real work."),
    "old headline must be gone",
  );
  assert.ok(!src.includes("An AI company"), 'old eyebrow "An AI company" must be gone');
  assert.ok(
    !src.includes("Brakes verify"),
    "old paragraph fragments (Brakes verify) must be gone",
  );
});

test("Hero: no invented routes or unsubstantiated marketplace claims", () => {
  const src = heroSourceNormalized();
  assert.ok(!src.includes('href="/agents"'), 'must not link to a non-existent href="/agents" route');
  assert.ok(!/marketplace/i.test(src), "no marketplace claims");
  assert.ok(!/\bSDK\b/.test(src), "no SDK claims");
  assert.ok(!/self[-\s]?serv/i.test(src), "no self-serve/self-service claims");
});
