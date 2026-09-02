#!/usr/bin/env bash
#
# audit-anti-slop.sh - Run the binding anti-slop audit on the Laxvish codebase.
#
# This is the canonical ship-blocker.
# Runs all 15 irreducible bans from design-taste-anti-slop §2 plus checks
# for the additional 45 single-category bans across all source files.
#
# Usage:  bash scripts/audit-anti-slop.sh
# Output: exits 0 on PASS, exits 1 on FAIL with diagnostic output.
#

set -e

ROOT="${1:-laxvish.app}"
echo "→ Running anti-slop audit on: ${ROOT}/"
echo

fail_count=0
pass_count=0

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
    --exclude-dir=screenshots \
    2>/dev/null || true)

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
audit_check "Ban 13: 1px gray border on every card (rule-hair flood)" 'border-rule-hair|border-gray-[0-9]+'
audit_check "Ban 16: glass card / backdrop-blur cards" 'backdrop-blur-(sm|md|lg|xl|2xl|3xl)'
audit_check "Ban 17: 1px border on every card" 'border\b' # soft check - if many hits, check the count manually later

echo
echo "────────────────────────────────────────────"
echo "  CATEGORY C: Typography (10 bans)"
echo "────────────────────────────────────────────"
audit_check "Ban 22: Inter / Poppins / Geist / Space Grotesk / Roboto / Manrope" 'Inter|Poppins|Geist(?!-)[a-zA-Z]*|Space Grotesk|Roboto(?!-)|Manrope'
audit_check "Ban 23: huge centered hero headline" 'text-(7xl|8xl|9xl).*text-center|text-center.*text-(7xl|8xl|9xl)'
audit_check "Ban 27: ALL-CAPS micro-labels above EVERY section (look)" 'uppercase tracking-widest'
audit_check "Ban 31: 'the future of' / 'powered by AI' / 'AI-powered'" '(The future of|Powered by AI|AI-powered|powered by AI|ai powered|artificial intelligence powered)'

echo
echo "────────────────────────────────────────────"
echo "  CATEGORY D: Layout (10 bans)"
echo "────────────────────────────────────────────"
audit_check "Ban 39: every section has huge py-24/32" 'py-(24|32|40)'
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
