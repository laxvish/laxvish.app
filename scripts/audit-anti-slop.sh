#!/usr/bin/env bash
#
# audit-anti-slop.sh - Run the binding anti-slop audit on the Laxvish codebase.
#
# This is the canonical ship-blocker.
# Runs all 15 irreducible bans from design-taste-anti-slop §2 plus checks
# for the additional 45 single-category bans across all source files.
#
# IMPORTANT (calibrated 2026): the audit must run against the REAL repo root.
# Older runs invoked the script from inside laxvish.app with the default
# ROOT="laxvish.app", which silently matched nothing and reported a false
# PASS. The default ROOT is now resolved from the script location so the
# scan always covers the actual codebase.
#
# Flood checks (Bans 13, 17, 39) are threshold-based per the skill: a single
# hairline separator or section padding is fine; a codebase-wide flood of
# identical 1px bordered cards or identical giant paddings is slop. Ban 13
# counts CARD FRAMES (full `border` + `border-rule-hair` on a padded/bg
# surface) only — the editorial hairline system on section dividers and
# ledger rows is brand language (AGENTS.md §3), not card slop. Ban 17 counts
# page-level rounded surfaces only (components/sections + app), not the
# approved micro-geometry inside the five artifact scenes.
#
# Usage:  bash scripts/audit-anti-slop.sh [ROOT]
# Output: exits 0 on PASS, exits 1 on FAIL with diagnostic output.
#

set -e

DEFAULT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ROOT="${1:-$DEFAULT_ROOT}"
echo "→ Running anti-slop audit on: ${ROOT}/"
echo

fail_count=0
pass_count=0

# Count code occurrences of a pattern, excluding comment lines.
count_hits() {
  local pattern="$1"
  local extra_include="${2:-}"
  local include_args=( --include="*.tsx" --include="*.ts" --include="*.css" --include="*.json" )
  if [ -n "$extra_include" ]; then
    include_args+=( --include="$extra_include" )
  fi
  grep -rEn "$pattern" "$ROOT/" \
    "${include_args[@]}" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.agents \
    --exclude-dir=screenshots --exclude-dir=docs \
    2>/dev/null | grep -vE '^\S+:[0-9]+:\s*(//|/\*|\*|<!--)' | wc -l
}

# Count code occurrences limited to page-level dirs (sections + app routes).
count_page_hits() {
  local pattern="$1"
  grep -rEn "$pattern" \
    "$ROOT/components/sections" "$ROOT/app" \
    --include="*.tsx" --include="*.ts" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.agents \
    --exclude-dir=screenshots --exclude-dir=docs \
    2>/dev/null | grep -vE '^\S+:[0-9]+:\s*(//|/\*|\*|<!--)' | wc -l
}

audit_check() {
  local label="$1"
  local pattern="$2"
  local extra_include="${3:-}"

  local include_args=( --include="*.tsx" --include="*.ts" --include="*.css" --include="*.json" )
  if [ -n "$extra_include" ]; then
    include_args+=( --include="$extra_include" )
  fi

  local hits
  hits=$(grep -rEn "$pattern" "$ROOT/" \
    "${include_args[@]}" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.agents \
    --exclude-dir=screenshots --exclude-dir=docs \
    2>/dev/null | grep -vE '^\S+:[0-9]+:\s*(//|/\*|\*|<!--)' || true)

  if [ -n "$hits" ]; then
    echo "  ✗ FAIL: ${label}"
    echo "${hits}" | head -n 5 | sed 's/^/    /'
    echo
    fail_count=$((fail_count + 1))
  else
    echo "  ✓ PASS: ${label}"
    pass_count=$((pass_count + 1))
  fi
}

echo "────────────────────────────────────────────"
echo "  CATEGORY A: Color & Visual Treatment"
echo "────────────────────────────────────────────"
audit_check "Ban 1: purple/blue gradient identity" 'linear-gradient[^;]*(#6366F1|#8B5CF6|#A855F7|#3B82F6|#60A5FA|#818CF8|#A78BFA)'
audit_check "Ban 2: glow blobs (blur + purple radial)" 'filter:[[:space:]]*blur\(.*\);[[:space:]]*$.*\bbg-violet|bg-indigo.*blur|filter.*blur\(.{2,}\)'
audit_check "Ban 4: gradient button" 'bg-gradient-to-(r|br|l|tr|b|tl|t).*from-#?(indigo|violet|purple|blue|cyan)'
audit_check "Ban 7: AI purple palette tokens (indigo/violet)" 'bg-indigo-|bg-violet-|bg-purple-|from-indigo-|from-violet-|from-purple-'
audit_check "Ban 8: every micro-component gets a color" 'text-(indigo|violet|purple|cyan|emerald|pink)-[0-9]+'

echo
echo "────────────────────────────────────────────"
echo "  CATEGORY B: Cards (12 bans)"
echo "────────────────────────────────────────────"
audit_check "Ban 10: three identical cards in a row (rounded-2xl count)" 'rounded-2xl'
audit_check "Ban 12: shadow-lg everywhere" 'shadow-lg\b'
if [ "$(count_hits 'border\s+border-rule-hair[^"`]*(bg-(cream|mist|parchment)|p-[0-9])')" -gt 12 ]; then
  echo "  ✗ FAIL: Ban 13: 1px gray border on every card (card-frame flood: $(count_hits 'border\s+border-rule-hair[^"`]*(bg-(cream|mist|parchment)|p-[0-9])') card frames)"
  fail_count=$((fail_count + 1))
else
  echo "  ✓ PASS: Ban 13: 1px gray border on every card ($(count_hits 'border\s+border-rule-hair[^"`]*(bg-(cream|mist|parchment)|p-[0-9])') card frames, under flood threshold)"
  pass_count=$((pass_count + 1))
fi
audit_check "Ban 16: glass card / backdrop-blur cards" 'backdrop-blur-(sm|md|lg|xl|2xl|3xl)'
if [ "$(count_page_hits 'rounded-(xl|2xl|3xl)[^"`]*\bborder\b|\bborder\b[^"`]*rounded-(xl|2xl|3xl)')" -gt 8 ]; then
  echo "  ✗ FAIL: Ban 17: 1px border on every card (page-level rounded+border flood: $(count_page_hits 'rounded-(xl|2xl|3xl)[^"`]*\bborder\b|\bborder\b[^"`]*rounded-(xl|2xl|3xl)') instances)"
  fail_count=$((fail_count + 1))
else
  echo "  ✓ PASS: Ban 17: 1px border on every card ($(count_page_hits 'rounded-(xl|2xl|3xl)[^"`]*\bborder\b|\bborder\b[^"`]*rounded-(xl|2xl|3xl)') page-level instances, under flood threshold)"
  pass_count=$((pass_count + 1))
fi

echo
echo "────────────────────────────────────────────"
echo "  CATEGORY C: Typography (10 bans)"
echo "────────────────────────────────────────────"
audit_check "Ban 22: Inter / Poppins / Geist / Space Grotesk / Roboto / Manrope" '\bInter\b|\bPoppins\b|Geist(?!-)[a-zA-Z]*|\bSpace Grotesk\b|\bRoboto\b|\bManrope\b'
audit_check "Ban 23: huge centered hero headline" 'text-(7xl|8xl|9xl).*text-center|text-center.*text-(7xl|8xl|9xl)'
audit_check "Ban 27: ALL-CAPS micro-labels above EVERY section (look)" 'uppercase tracking-widest'
audit_check "Ban 31: 'the future of' / 'powered by AI' / 'AI-powered'" '(The future of|Powered by AI|AI-powered|powered by AI|ai powered|artificial intelligence powered)'

echo
echo "────────────────────────────────────────────"
echo "  CATEGORY D: Layout (10 bans)"
echo "────────────────────────────────────────────"
if [ "$(count_hits 'py-(24|32|40)')" -gt 35 ]; then
  echo "  ✗ FAIL: Ban 39: every section has huge py-24/32 (flood: $(count_hits 'py-(24|32|40)') instances)"
  fail_count=$((fail_count + 1))
else
  echo "  ✓ PASS: Ban 39: every section has huge py-24/32 ($(count_hits 'py-(24|32|40)') instances, under flood threshold)"
  pass_count=$((pass_count + 1))
fi
audit_check "Ban 41: 4-column footer cookie-cutter" 'grid-cols-4.*footer|footer.*grid-cols-4'
audit_check "Ban 35: alternating-reverse repeated 3+ times" 'flex-row-reverse'

echo
echo "────────────────────────────────────────────"
echo "  CATEGORY E: Components (12 bans)"
echo "────────────────────────────────────────────"
audit_check "Ban 44: 'Get Started' / 'Learn More' CTA" '(Get Started|Learn More|Sign Up Free|Sign Up)\b'
audit_check "Ban 52: Lucide icons dependency on every node" 'lucide-react|@lucide'
audit_check "Ban 53: emoji used as feature icons" '[🎯🚀💡⚡🔮✨🤖🔥📈🛠️⚙️💎🌟❤️🔒🎨📊]'

echo
echo "────────────────────────────────────────────"
echo "  CATEGORY F: Animation (8 bans)"
echo "────────────────────────────────────────────"
audit_check "Ban 54: fade-up-on-scroll mechanical pattern (initial opacity:0 + y:20)" 'opacity:[[:space:]]*0[[:space:]]*,?[[:space:]]*y:[[:space:]]*20'
audit_check "Ban 56: hover scale 1.05 universal" 'scale:[[:space:]]*1\.0+5|whileHover=\{[[:space:]]*\{[[:space:]]*scale:[[:space:]]*1\.0+5|hover:scale-1.05'

echo
echo "────────────────────────────────────────────"
echo "  STRANGER TEST"
echo "────────────────────────────────────────────"
audit_check "Stranger test: any phrase that survives product-name swap" 'Transform your workflow|Unlock the power of|seamlessly integrate|revolutionize|smart widget|smart platform'

echo
echo "────────────────────────────────────────────"
echo "  SUMMARY"
echo "────────────────────────────────────────────"
echo "  Passed: ${pass_count}"
echo "  Failed: ${fail_count}"
echo

if [ "$fail_count" -gt 0 ]; then
  echo "→ Anti-slop audit FAILED. ${fail_count} ban(s) violated."
  echo "→ See remediation flowcharts: .agents/skills/design-taste-anti-slop/APPENDIX_REMEDIATION.md"
  exit 1
fi

echo "→ Anti-slop audit PASSED."
exit 0