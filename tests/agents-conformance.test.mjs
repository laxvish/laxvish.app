/*
 * AGENTS.md conformance gate.
 *
 * AGENTS.md is declared binding for every agent and human touching this repo,
 * but a markdown contract with no enforcement drifts silently — the palette
 * violations this test now prevents had already spread across ten files.
 *
 * This test scans the actual source tree and fails with file:line locations.
 * It is deliberately a *static* test: no build, no database, no server.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["components", "app", "lib"];
const SOURCE_EXTENSIONS = /\.(ts|tsx)$/;

/** Directories that legitimately fall outside the rules. */
const EXEMPT_PATHS = [
  path.join("lib", "generated"), // Prisma client output
  path.join("app", "opengraph-image.tsx"), // binds the palette as literals by design
  path.join("app", "icon.tsx"), // same
];

// AGENTS.md §1 — the four binding tokens.
const ALLOWED_HEX = new Set(["#FAFAFA", "#EAEAEA", "#111111", "#666666"]);

const RULES = [
  {
    id: "foreign-hex",
    // A 6-digit hex literal. rgba()/hsl() and Tailwind's `charcoal/20` opacity
    // syntax never match this, so they cannot false-positive.
    pattern: /#(?:[0-9A-Fa-f]{6})\b/g,
    describe: (line, match) =>
      ALLOWED_HEX.has(match.toUpperCase())
        ? null
        : `hex ${match} is not in the binding palette (${[...ALLOWED_HEX].join(", ")})`,
  },
  {
    id: "glassmorphism",
    pattern: /\bbackdrop-blur[\w-]*/g,
    message: "backdrop-blur is banned (AGENTS.md §4.3)",
  },
  {
    id: "gradient-class",
    pattern: /\bbg-gradient-[\w-]*/g,
    message: "bg-gradient-* utility is banned (AGENTS.md §4.1)",
  },
  {
    id: "excessive-radius",
    pattern: /\brounded-(?:2xl|3xl)\b/g,
    message: "rounded-2xl / rounded-3xl is banned (AGENTS.md §4.4)",
  },
  {
    id: "heavy-shadow",
    pattern: /\bshadow-(?:lg|2xl|xl)\b/g,
    message: "shadow-lg / shadow-xl / shadow-2xl is banned (AGENTS.md §4.5)",
  },
  {
    id: "banned-font",
    pattern: /\b(Geist|Poppins|Manrope|Plus Jakarta|Sora)\b/g,
    message: "font is on the AGENTS.md §2 banned list",
  },
  {
    // "Roboto" would also match "robotic"; require the font-ish context.
    id: "banned-font-roboto",
    pattern: /\bRoboto\b/g,
    message: "Roboto is on the AGENTS.md §2 banned list",
  },
  {
    id: "generic-cta",
    pattern: /\bGet Started\b/g,
    message: '"Get Started" is banned; name the action (AGENTS.md §4.7)',
  },
  {
    id: "marketing-fluff",
    // Narrowed on purpose: a bare /\bTransform\b/ flags the `transform` CSS
    // property, `transform-gpu`, `transformStyle` and `transformers`, which is
    // noise. Only the sales-deal phrasing is caught.
    pattern:
      /\b(?:transform|revolutioni[sz]e|unlock the power of|seamlessly integrate)\s+(?:your|the|business|workflows?|operations)\b/gi,
    message: "generic marketing fluff (AGENTS.md §4.6)",
  },
];

function collectSourceFiles() {
  const files = [];
  for (const dir of SCAN_DIRS) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const entry of fs.readdirSync(abs, { withFileTypes: true, recursive: true })) {
      if (!entry.isFile()) continue;
      const full = path.join(entry.parentPath ?? entry.path, entry.name);
      const rel = path.relative(ROOT, full);
      if (!SOURCE_EXTENSIONS.test(rel)) continue;
      if (EXEMPT_PATHS.some((skip) => rel.startsWith(skip))) continue;
      files.push(rel);
    }
  }
  return files.sort();
}

function scan() {
  const violations = [];

  for (const rel of collectSourceFiles()) {
    const lines = fs.readFileSync(path.join(ROOT, rel), "utf8").split("\n");
    lines.forEach((line, index) => {
      // Allow an explicit, reviewable opt-out on the offending line.
      if (/conformance-ignore/.test(line)) return;

      for (const rule of RULES) {
        const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
        let match;
        while ((match = regex.exec(line)) !== null) {
          const detail = rule.describe
            ? rule.describe(line, match[0])
            : rule.message ?? match[0];
          if (!detail) continue;
          violations.push(`${rel}:${index + 1}  [${rule.id}]  ${detail}`);
        }
      }
    });
  }

  return violations;
}

test("AGENTS.md conformance: no foreign palette colours or banned utilities", () => {
  const violations = scan();

  // Group by rule id so the failure reads as a work list, not a wall of text.
  const byRule = new Map();
  for (const v of violations) {
    const rule = v.match(/\[([\w-]+)\]/)?.[1] ?? "unknown";
    if (!byRule.has(rule)) byRule.set(rule, []);
    byRule.get(rule).push(v);
  }

  const report = [...byRule.entries()]
    .map(
      ([rule, items]) =>
        `\n\n${rule} — ${items.length} occurrence(s):\n  ` + items.join("\n  "),
    )
    .join("");

  assert.equal(
    violations.length,
    0,
    `${violations.length} AGENTS.md violation(s) found. The palette and utility` +
      ` bans in AGENTS.md are binding and may not be relaxed.` +
      `\n\nIf a violation is genuinely intentional, append the comment` +
      ` conformance-ignore to that line so the exception stays reviewable.` +
      report,
  );
});

test("AGENTS.md conformance: the scanner actually sees source files", () => {
  // Guards against the gate silently passing because a path filter broke.
  const files = collectSourceFiles();
  assert.ok(files.length > 20, `expected to scan the component tree, found ${files.length} files`);
  assert.ok(
    files.some((f) => f.startsWith("components/sections/")),
    "scanner lost components/sections/",
  );
});
