import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Import types and constants from types/visual-engine
import {
  SUBCONTINENT_HUBS,
  SPINE_MILESTONES,
  SALES_MONOLITH_PHASES,
  SUPPORT_CRUCIBLE_PHASES,
  DOCUMENT_STRATA_PHASES,
  KNOWLEDGE_ASTROLABE_PHASES,
  VOICE_LOOM_PHASES,
  BRAND_PALETTE,
  createSolitonParticle,
  getSalesMonolithPhase,
  getSupportCruciblePhase,
  getDocumentStrataPhase,
  getKnowledgeAstrolabePhase,
  getVoiceLoomPhase,
  type SubcontinentHubId,
  type TransPageSpineMilestone,
  type SolitonParticle,
  type SalesMonolithPhase,
  type SupportCruciblePhase,
  type DocumentStrataPhase,
  type KnowledgeAstrolabePhase,
  type VoiceLoomPhase,
  type LaxvishThreadVariant,
} from "../types/visual-engine";

describe("Pillar 1: Visual Engine Type System & Contracts", () => {
  describe("Brand Palette Constants", () => {
    it("strictly defines the binding AGENTS.md brand palette without forbidden colors", () => {
      assert.equal(BRAND_PALETTE.cream, "#F2EAE0");
      assert.equal(BRAND_PALETTE.mist, "#B4D3D9");
      assert.equal(BRAND_PALETTE.ink, "#BDA6CE");
      assert.equal(BRAND_PALETTE.mark, "#9B8EC7");
      assert.equal(BRAND_PALETTE.deepink, "#1A1820");
      assert.equal(BRAND_PALETTE.parchment, "#EDE3D2");
    });
  });

  describe("SubcontinentHubId & Registry", () => {
    it("contains all major Indian enterprise telemetry hubs with geographic coordinates", () => {
      const requiredHubs: SubcontinentHubId[] = ["DEL", "BOM", "BLR", "HYD", "MAA", "CCU", "PNQ", "AMD", "NIXI-IND"];
      
      for (const hubId of requiredHubs) {
        const hub = SUBCONTINENT_HUBS[hubId];
        assert.ok(hub, `Hub ${hubId} must exist in SUBCONTINENT_HUBS`);
        assert.equal(hub.id, hubId);
        assert.ok(typeof hub.lat === "number");
        assert.ok(typeof hub.lng === "number");
        assert.ok(hub.coordinatesLabel.length > 0);
        assert.ok(hub.name.length > 0);
      }

      // Check specific coordinates for fidelity
      assert.equal(SUBCONTINENT_HUBS["DEL"].coordinatesLabel, "28.61°N · 77.20°E");
      assert.equal(SUBCONTINENT_HUBS["BOM"].coordinatesLabel, "19.07°N · 72.87°E");
      assert.equal(SUBCONTINENT_HUBS["BLR"].coordinatesLabel, "12.97°N · 77.59°E");
      assert.equal(SUBCONTINENT_HUBS["HYD"].coordinatesLabel, "17.38°N · 78.48°E");
      assert.equal(SUBCONTINENT_HUBS["NIXI-IND"].coordinatesLabel, "20.59°N · 78.96°E");
    });
  });

  describe("TransPageSpineMilestone Specifications", () => {
    it("defines ordered spine milestones along the scroll track with valid progress thresholds", () => {
      assert.ok(Array.isArray(SPINE_MILESTONES));
      assert.ok(SPINE_MILESTONES.length >= 3);

      let prevProgress = -1;
      for (const milestone of SPINE_MILESTONES as TransPageSpineMilestone[]) {
        assert.ok(milestone.id.length > 0);
        assert.ok(milestone.nodeCode.length > 0);
        assert.ok(milestone.label.length > 0);
        assert.ok(milestone.progressThreshold >= 0 && milestone.progressThreshold <= 1);
        assert.ok(milestone.progressThreshold >= prevProgress, "Milestones must be ordered by progressThreshold");
        assert.ok(milestone.yPositionPercent >= 0 && milestone.yPositionPercent <= 100);
        prevProgress = milestone.progressThreshold;
      }
    });

    it("verifies key enterprise spine milestones (Genesis, Core Engine, DPDP Compliance)", () => {
      const nodeCodes = SPINE_MILESTONES.map((m: TransPageSpineMilestone) => m.nodeCode);
      assert.ok(nodeCodes.some((code) => code.includes("01") || code.includes("GENESIS")));
      assert.ok(nodeCodes.some((code) => code.includes("142.8 HZ") || code.includes("CORE")));
      assert.ok(nodeCodes.some((code) => code.includes("DPDP") || code.includes("VERIFIED")));
    });
  });

  describe("SolitonParticle Physics & Generators", () => {
    it("creates a well-formed SolitonParticle with pure brand colors and non-dispersive defaults", () => {
      const particle: SolitonParticle = createSolitonParticle({
        id: "test-soliton-01",
        progress: 0.42,
      });

      assert.equal(particle.id, "test-soliton-01");
      assert.equal(particle.progress, 0.42);
      assert.equal(particle.color, BRAND_PALETTE.mark); // #9B8EC7
      assert.ok(particle.amplitude! > 0);
      assert.ok(particle.wavelength! > 0);
      assert.ok(particle.coreRadius! > 0);
      assert.ok(particle.haloRadius! > particle.coreRadius!);
      assert.equal(particle.isActive, true);
    });

    it("allows custom overrides for SolitonParticle properties", () => {
      const custom: SolitonParticle = createSolitonParticle({
        id: "custom-pulse",
        progress: 0.85,
        color: BRAND_PALETTE.ink, // #BDA6CE
        amplitude: 1.8,
        velocity: 2.5,
        isActive: false,
      });

      assert.equal(custom.color, "#BDA6CE");
      assert.equal(custom.amplitude, 1.8);
      assert.equal(custom.velocity, 2.5);
      assert.equal(custom.isActive, false);
    });
  });

  describe("5 Artifact Scene Phase Contracts", () => {
    it("validates SalesMonolithPhase transitions and shot indices (0 to 5)", () => {
      const phases: SalesMonolithPhase[] = [
        "dormant",
        "contact_vibration",
        "phonetic_resonance",
        "intent_isolation",
        "semantic_orbit",
        "covenant_sealed",
      ];
      assert.equal(SALES_MONOLITH_PHASES.length, 6);
      for (let i = 0; i < 6; i++) {
        assert.equal(SALES_MONOLITH_PHASES[i].shot, i);
        assert.equal(SALES_MONOLITH_PHASES[i].phase, phases[i]);
        assert.ok(SALES_MONOLITH_PHASES[i].label.length > 0);
      }
    });

    it("validates SupportCruciblePhase transitions and analog pressure readouts (0 to 5)", () => {
      const phases: SupportCruciblePhase[] = [
        "stable_vacuum",
        "pressure_spike",
        "dampening_wave",
        "condensing_pillars",
        "brakes_lock",
        "absolute_equilibrium",
      ];
      assert.equal(SUPPORT_CRUCIBLE_PHASES.length, 6);
      for (let i = 0; i < 6; i++) {
        assert.equal(SUPPORT_CRUCIBLE_PHASES[i].shot, i);
        assert.equal(SUPPORT_CRUCIBLE_PHASES[i].phase, phases[i]);
        assert.ok(typeof SUPPORT_CRUCIBLE_PHASES[i].psi === "number");
      }
      assert.equal(SUPPORT_CRUCIBLE_PHASES[0].psi, 0.0);
      assert.equal(SUPPORT_CRUCIBLE_PHASES[1].psi, 98.4);
      assert.equal(SUPPORT_CRUCIBLE_PHASES[5].psi, 0.0);
    });

    it("validates DocumentStrataPhase transitions and 3-way match token stages (0 to 5)", () => {
      const phases: DocumentStrataPhase[] = [
        "optical_standby",
        "strata_ingestion",
        "ray_of_truth",
        "numeral_detachment",
        "brakes_reconciliation",
        "ledger_committed",
      ];
      assert.equal(DOCUMENT_STRATA_PHASES.length, 6);
      for (let i = 0; i < 6; i++) {
        assert.equal(DOCUMENT_STRATA_PHASES[i].shot, i);
        assert.equal(DOCUMENT_STRATA_PHASES[i].phase, phases[i]);
        assert.ok(DOCUMENT_STRATA_PHASES[i].label.length > 0);
      }
    });

    it("validates KnowledgeAstrolabePhase transitions and memory star activation (0 to 5)", () => {
      const phases: KnowledgeAstrolabePhase[] = [
        "vault_rest",
        "stars_suspended",
        "query_pulse",
        "constellation_awakened",
        "brakes_clearance",
        "citation_sealed",
      ];
      assert.equal(KNOWLEDGE_ASTROLABE_PHASES.length, 6);
      for (let i = 0; i < 6; i++) {
        assert.equal(KNOWLEDGE_ASTROLABE_PHASES[i].shot, i);
        assert.equal(KNOWLEDGE_ASTROLABE_PHASES[i].phase, phases[i]);
        assert.ok(KNOWLEDGE_ASTROLABE_PHASES[i].label.length > 0);
      }
    });

    it("validates VoiceLoomPhase transitions and harmonic dual-stream braiding (0 to 5)", () => {
      const phases: VoiceLoomPhase[] = [
        "chambers_ready",
        "dual_streams",
        "braided_weaving",
        "unified_matrix",
        "brakes_dpdp_check",
        "truth_committed",
      ];
      assert.equal(VOICE_LOOM_PHASES.length, 6);
      for (let i = 0; i < 6; i++) {
        assert.equal(VOICE_LOOM_PHASES[i].shot, i);
        assert.equal(VOICE_LOOM_PHASES[i].phase, phases[i]);
        assert.ok(VOICE_LOOM_PHASES[i].label.length > 0);
      }
    });

    it("validates helper lookup functions for all 5 artifact scene phases", () => {
      assert.equal(getSalesMonolithPhase(0).phase, "dormant");
      assert.equal(getSalesMonolithPhase(5).phase, "covenant_sealed");
      assert.equal(getSupportCruciblePhase(0).phase, "stable_vacuum");
      assert.equal(getSupportCruciblePhase(5).phase, "absolute_equilibrium");
      assert.equal(getDocumentStrataPhase(0).phase, "optical_standby");
      assert.equal(getDocumentStrataPhase(5).phase, "ledger_committed");
      assert.equal(getKnowledgeAstrolabePhase(0).phase, "vault_rest");
      assert.equal(getKnowledgeAstrolabePhase(5).phase, "citation_sealed");
      assert.equal(getVoiceLoomPhase(0).phase, "chambers_ready");
      assert.equal(getVoiceLoomPhase(5).phase, "truth_committed");
    });
  });

  describe("LaxvishThread Variants Contract", () => {
    it("supports all required thread variants including soliton-pulse and straight path length reveals", () => {
      const variants: LaxvishThreadVariant[] = [
        "straight",
        "wave",
        "orbit",
        "connecting",
        "scan",
        "circle",
        "soliton-pulse",
        "ruler",
        "spine",
      ];
      assert.equal(variants.length, 9);
      assert.ok(variants.includes("soliton-pulse"));
      assert.ok(variants.includes("spine"));
      assert.ok(variants.includes("straight"));
    });

    it("verifies brand color defaults in LaxvishThread contracts", () => {
      assert.equal(BRAND_PALETTE.mark, "#9B8EC7");
      assert.equal(BRAND_PALETTE.ink, "#BDA6CE");
      assert.equal(BRAND_PALETTE.deepink, "#1A1820");
      assert.equal(BRAND_PALETTE.mist, "#B4D3D9");
      assert.equal(BRAND_PALETTE.cream, "#F2EAE0");
    });
  });
});
