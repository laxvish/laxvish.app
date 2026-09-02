import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

const SCENES_DIR = path.resolve(process.cwd(), "components/visuals/engine/scenes");

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
];

test("SalesScene.tsx satisfies flagship architectural requirements", () => {
  const fileContent = fs.readFileSync(path.join(SCENES_DIR, "SalesScene.tsx"), "utf8");

  // Export check
  assert.match(fileContent, /export\s+function\s+SalesScene\s*\(/);

  // Anti-slop checks
  for (const banned of BANNED_PATTERNS) {
    assert.doesNotMatch(fileContent, banned, `SalesScene contains banned pattern ${banned}`);
  }

  // Brand Palette & Typography
  assert.match(fileContent, /#9B8EC7|mark/i, "Must use brand accent #9B8EC7");
  assert.match(fileContent, /#F2EAE0|cream/i, "Must use brand surface #F2EAE0");
  assert.match(fileContent, /#1A1820|deepink/i, "Must use brand deep ink #1A1820");

  // Basalt Monolith & Tactile Material
  assert.match(fileContent, /basalt/i, "Must feature acoustic basalt stone column");
  
  // Concentric Elliptical Orbits
  assert.match(fileContent, /orbit|frequency|concentric|ellipse/i, "Must feature concentric frequency orbits");
  assert.match(fileContent, /120\s*Hz|440\s*Hz|2\.4\s*kHz|8\s*kHz/i, "Must display phonetic frequency marks");

  // Semantic Rune Shards
  assert.match(fileContent, /120\s+TRUCKS/i, "Must contain '120 TRUCKS' semantic shard");
  assert.match(fileContent, /Q3\s+CLOSE/i, "Must contain 'Q3 CLOSE' semantic shard");
  assert.match(fileContent, /TIER-1\s+ICP/i, "Must contain 'TIER-1 ICP' semantic shard");

  // Embossed Covenant Seal
  assert.match(fileContent, /covenant|seal/i, "Must feature embossed covenant seal");
  assert.match(fileContent, /#9B8EC7/, "Covenant seal must feature #9B8EC7");

  // Controls
  assert.match(fileContent, /play|pause/i, "Must feature Play/Pause control");
  assert.match(fileContent, /prev|next|step/i, "Must feature phase step navigation");
});

test("SupportScene.tsx satisfies flagship architectural requirements", () => {
  const fileContent = fs.readFileSync(path.join(SCENES_DIR, "SupportScene.tsx"), "utf8");

  assert.match(fileContent, /export\s+function\s+SupportScene\s*\(/);

  for (const banned of BANNED_PATTERNS) {
    assert.doesNotMatch(fileContent, banned, `SupportScene contains banned pattern ${banned}`);
  }

  assert.match(fileContent, /#9B8EC7|mark/i);
  assert.match(fileContent, /#F2EAE0|cream/i);
  assert.match(fileContent, /#1A1820|deepink/i);

  // High-pressure titanium vessel
  assert.match(fileContent, /titanium/i, "Must feature high-pressure titanium vessel");

  // 270° circular Bourdon tube PSI gauge
  assert.match(fileContent, /bourdon/i, "Must feature Bourdon tube pressure gauge");
  assert.match(fileContent, /PSI/i, "Must feature PSI metric");
  assert.match(fileContent, /98\.4\s*PSI/i, "Must include 98.4 PSI surge state");
  assert.match(fileContent, /0\.0\s*PSI/i, "Must include 0.0 PSI equilibrium state");

  // Distress packet surge
  assert.match(fileContent, /distress|dispatch|escalation/i, "Must feature distress packet surge");

  // Magnetic wave dissipation
  assert.match(fileContent, /dampening|dissipat/i, "Must feature magnetic wave dissipation");

  // Central cryptographic key forge
  assert.match(fileContent, /forge|cryptographic|key/i, "Must feature central cryptographic key forge");

  // Controls
  assert.match(fileContent, /play|pause/i, "Must feature Play/Pause control");
  assert.match(fileContent, /prev|next|step/i, "Must feature phase step navigation");
});

test("DocumentScene.tsx satisfies flagship architectural requirements", () => {
  const fileContent = fs.readFileSync(path.join(SCENES_DIR, "DocumentScene.tsx"), "utf8");

  assert.match(fileContent, /export\s+function\s+DocumentScene\s*\(/);

  for (const banned of BANNED_PATTERNS) {
    assert.doesNotMatch(fileContent, banned, `DocumentScene contains banned pattern ${banned}`);
  }

  assert.match(fileContent, /#9B8EC7|mark/i);
  assert.match(fileContent, /#F2EAE0|cream/i);
  assert.match(fileContent, /#1A1820|deepink/i);

  // 3-layer isometric vellum sheets
  assert.match(fileContent, /vellum/i, "Must model vellum sheets");
  assert.match(fileContent, /purchase\s+order/i, "Must feature Purchase Order layer");
  assert.match(fileContent, /challan|delivery/i, "Must feature Delivery Challan layer");
  assert.match(fileContent, /tax\s+invoice/i, "Must feature Tax Invoice layer");

  // Optical laser alidade
  assert.match(fileContent, /alidade/i, "Must feature optical laser alidade");

  // 3-way match zero-variance verification token
  assert.match(fileContent, /zero\s*variance/i, "Must feature zero-variance match");
  assert.match(fileContent, /3-way\s*match|token/i, "Must feature 3-way match token");

  // Controls
  assert.match(fileContent, /play|pause/i, "Must feature Play/Pause control");
  assert.match(fileContent, /prev|next|step/i, "Must feature phase step navigation");
});

test("KnowledgeScene.tsx satisfies flagship architectural requirements", () => {
  const fileContent = fs.readFileSync(path.join(SCENES_DIR, "KnowledgeScene.tsx"), "utf8");

  assert.match(fileContent, /export\s+function\s+KnowledgeScene\s*\(/);

  for (const banned of BANNED_PATTERNS) {
    assert.doesNotMatch(fileContent, banned, `KnowledgeScene contains banned pattern ${banned}`);
  }

  assert.match(fileContent, /#9B8EC7|mark/i);
  assert.match(fileContent, /#F2EAE0|cream/i);
  assert.match(fileContent, /#1A1820|deepink/i);

  // 4,200-star celestial map / astrolabe
  assert.match(fileContent, /4,?200/i, "Must feature 4,200 celestial memory stars");
  assert.match(fileContent, /astrolabe/i, "Must feature knowledge astrolabe");

  // Radial sonar query pulse
  assert.match(fileContent, /sonar/i, "Must feature radial sonar query pulse");

  // 3-star policy constellation triangulation
  assert.match(fileContent, /triangulat/i, "Must feature constellation triangulation");

  // Luminous citation tablet with Cormorant Garamond quote + JetBrains Mono source reference
  assert.match(fileContent, /font-serif|cormorant/i, "Must use serif typography for quote");
  assert.match(fileContent, /font-mono|jetbrains/i, "Must use mono typography for source");
  assert.match(fileContent, /citation\s+tablet|handbook|pdf/i, "Must feature luminous citation tablet");

  // Controls
  assert.match(fileContent, /play|pause/i, "Must feature Play/Pause control");
  assert.match(fileContent, /prev|next|step/i, "Must feature phase step navigation");
});

test("VoiceWhatsAppScene.tsx satisfies flagship architectural requirements", () => {
  const fileContent = fs.readFileSync(path.join(SCENES_DIR, "VoiceWhatsAppScene.tsx"), "utf8");

  assert.match(fileContent, /export\s+function\s+VoiceWhatsAppScene\s*\(/);

  for (const banned of BANNED_PATTERNS) {
    assert.doesNotMatch(fileContent, banned, `VoiceWhatsAppScene contains banned pattern ${banned}`);
  }

  assert.match(fileContent, /#9B8EC7|mark/i);
  assert.match(fileContent, /#F2EAE0|cream/i);
  assert.match(fileContent, /#1A1820|deepink/i);

  // Dual-chamber loom: Left analog tungsten vacuum tube + Right digital quartz chamber
  assert.match(fileContent, /tungsten/i, "Must feature analog tungsten vacuum tube");
  assert.match(fileContent, /vacuum\s+tube/i, "Must feature vacuum tube chamber");
  assert.match(fileContent, /quartz/i, "Must feature digital quartz chamber");

  // Center helical braided spindle
  assert.match(fileContent, /helical|spindle/i, "Must feature center helical spindle");
  assert.match(fileContent, /braid/i, "Must feature braided filaments");

  // Unified customer truth tablet
  assert.match(fileContent, /truth\s+tablet|unified\s+customer/i, "Must feature unified customer truth tablet");

  // Controls
  assert.match(fileContent, /play|pause/i, "Must feature Play/Pause control");
  assert.match(fileContent, /prev|next|step/i, "Must feature phase step navigation");
});
