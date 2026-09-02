import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

const COMPONENT_PATH = path.resolve(process.cwd(), "components/visuals/engine/LivingNetworkStage.tsx");

const BANNED_PATTERNS = [
  /from-purple/i,
  /from-blue/i,
  /to-indigo/i,
  /to-blue/i,
  /\bInter\b/,
  /\bPoppins\b/,
  /\bGeist\b(?!\s*Mono)/,
  /\bSpace Grotesk\b/,
  /\bRoboto\b/,
  /backdrop-blur-(?:xl|2xl|3xl)/i,
  /glow-blob/i,
];

test("LivingNetworkStage.tsx: Anti-slop and brand palette compliance", () => {
  assert.ok(fs.existsSync(COMPONENT_PATH), "LivingNetworkStage.tsx must exist");
  const content = fs.readFileSync(COMPONENT_PATH, "utf8");

  // Export check
  assert.match(content, /export\s+function\s+LivingNetworkStage\s*\(/);

  // Anti-slop checks
  for (const banned of BANNED_PATTERNS) {
    assert.doesNotMatch(content, banned, `LivingNetworkStage contains banned pattern ${banned}`);
  }

  // Brand Palette references
  assert.match(content, /#9B8EC7|mark/i, "Must use brand mark #9B8EC7");
  assert.match(content, /#F2EAE0|cream/i, "Must use brand cream #F2EAE0");
  assert.match(content, /#1A1820|deepink/i, "Must use brand deep ink #1A1820");
  assert.match(content, /#B4D3D9|mist/i, "Must use brand mist #B4D3D9");
  assert.match(content, /#BDA6CE|ink/i, "Must use brand ink #BDA6CE");
});

test("LivingNetworkStage.tsx: 4 Core Indian Regional Hubs topology", () => {
  const content = fs.readFileSync(COMPONENT_PATH, "utf8");

  // DEL Hub: 28.61°N, 77.20°E // top: 16%, left: 50%
  assert.match(content, /DEL/i, "Must define DEL hub");
  assert.match(content, /28\.61°?\s*N/i, "DEL must have 28.61°N coordinate");
  assert.match(content, /77\.20°?\s*E/i, "DEL must have 77.20°E coordinate");
  assert.match(content, /Executive.*Policy.*Kernel/i, "DEL must be Executive & Policy Kernel");

  // BOM Hub: 19.07°N, 72.87°E // top: 48%, left: 18%
  assert.match(content, /BOM/i, "Must define BOM hub");
  assert.match(content, /19\.07°?\s*N/i, "BOM must have 19.07°N coordinate");
  assert.match(content, /72\.87°?\s*E/i, "BOM must have 72.87°E coordinate");
  assert.match(content, /Financial\s+Ledger.*GSTN\s+Gateway/i, "BOM must be Financial Ledger & GSTN Gateway");

  // HYD Hub: 17.38°N, 78.48°E // top: 48%, left: 82%
  assert.match(content, /HYD/i, "Must define HYD hub");
  assert.match(content, /17\.38°?\s*N/i, "HYD must have 17.38°N coordinate");
  assert.match(content, /78\.48°?\s*E/i, "HYD must have 78.48°E coordinate");
  assert.match(content, /DPDP\s+Vault.*Storage\s+Cluster/i, "HYD must be DPDP Vault & Storage Cluster");

  // BLR Hub: 12.97°N, 77.59°E // top: 80%, left: 50%
  assert.match(content, /BLR/i, "Must define BLR hub");
  assert.match(content, /12\.97°?\s*N/i, "BLR must have 12.97°N coordinate");
  assert.match(content, /77\.59°?\s*E/i, "BLR must have 77.59°E coordinate");
  assert.match(content, /Neural\s+Autonomous\s+Workers\s+Engine/i, "BLR must be Neural Autonomous Workers Engine");
});

test("LivingNetworkStage.tsx: 8 Specialized Autonomous Agent Synapses", () => {
  const content = fs.readFileSync(COMPONENT_PATH, "utf8");

  // 8 specialized agent roles/vignettes
  assert.match(content, /executive/i, "Must include executive agent");
  assert.match(content, /finance/i, "Must include finance agent");
  assert.match(content, /marketing/i, "Must include marketing agent");
  assert.match(content, /procurement/i, "Must include procurement agent");
  assert.match(content, /hr/i, "Must include HR agent");
  assert.match(content, /contract/i, "Must include contract agent");
  assert.match(content, /it/i, "Must include IT helpdesk agent");
  assert.match(content, /analytics/i, "Must include analytics agent");
});

test("LivingNetworkStage.tsx: Traveling Solitons Data Stream Engine", () => {
  const content = fs.readFileSync(COMPONENT_PATH, "utf8");

  // Vector stream telemetry specifications
  assert.match(content, /GSTN_ITC_MATCH/i, "Must include GSTN_ITC_MATCH soliton stream");
  assert.match(content, /4,82,100|482100/i, "Must include ₹4,82,100 invoice match payload");
  assert.match(content, /18\s*ms/i, "Must include 18ms latency for GSTN_ITC_MATCH");

  assert.match(content, /DPDP_CONSENT_TOKEN/i, "Must include DPDP_CONSENT_TOKEN soliton stream");
  assert.match(content, /ACTIVE/i, "Must include ACTIVE status for DPDP token");
  assert.match(content, /12\s*ms/i, "Must include 12ms latency for DPDP_CONSENT_TOKEN");

  assert.match(content, /SAML_SSO_RENEW/i, "Must include SAML_SSO_RENEW soliton stream");
  assert.match(content, /AUTH_OK/i, "Must include AUTH_OK status for SAML SSO");
  assert.match(content, /14\s*ms/i, "Must include 14ms latency for SAML_SSO_RENEW");

  assert.match(content, /EXECUTIVE_POLICY_DISPATCH/i, "Must include EXECUTIVE_POLICY_DISPATCH soliton stream");
  assert.match(content, /22\s*ms/i, "Must include 22ms latency for policy dispatch");

  assert.match(content, /LEDGER_RECONCILIATION/i, "Must include LEDGER_RECONCILIATION soliton stream");
  assert.match(content, /16\s*ms/i, "Must include 16ms latency for ledger reconciliation");

  // Soliton packet visual representation (3-dot vector packet cluster with trailing tick marks)
  assert.match(content, /soliton|packet/i, "Must feature soliton packet stream system");
});

test("LivingNetworkStage.tsx: Interactive Sighting Alidade & Active Node Inspector", () => {
  const content = fs.readFileSync(COMPONENT_PATH, "utf8");

  // Sighting Alidade & telemetry inspector
  assert.match(content, /alidade|reticle|target|crosshair|sighting/i, "Must feature interactive sighting alidade / reticle");
  assert.match(content, /NIXI/i, "Must show NIXI backbone telemetry");
  assert.match(content, /latency|ms/i, "Must display link latency");
  assert.match(content, /protocol|status/i, "Must display active protocols and operational status");
});
