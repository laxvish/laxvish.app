/**
 * ============================================================================
 * LAXVISH VISUAL ENGINE — SHARED TYPE SYSTEM & CONTRACTS
 * ============================================================================
 * 
 * Pillar 1: The Trans-Page Living Thread Spine & 5 Flagship Artifacts.
 * 
 * Strictly follows AGENTS.md Brand Palette & Anti-Slop Discipline:
 * - Surface (base): Cream Ash (#F2EAE0)
 * - Surface (elevated): Mist Teal (#B4D3D9)
 * - Ink (body): Lavender Mist (#BDA6CE)
 * - Mark (brand accent): Lavender Indigo (#9B8EC7)
 * - High-Contrast Display Ink: Deep Ink (#1A1820)
 * - Neutral Separator: Parchment (#EDE3D2)
 * 
 * ZERO purple/blue gradients, ZERO blur glow blobs.
 */

// ============================================================================
// 1. BRAND PALETTE CONSTANTS
// ============================================================================

export const BRAND_PALETTE = {
  /** Surface (base) — Cream Ash. Primary background / parchment / alabaster. */
  cream: "#F2EAE0",
  /** Surface (elevated) — Mist Teal. Cards on cream, secondary panels, resting tone. */
  mist: "#B4D3D9",
  /** Ink (body) — Lavender Mist. Body text, fine print, secondary ink, axis labels. */
  ink: "#BDA6CE",
  /** Mark (brand accent) — Lavender Indigo. Primary CTA fill, active state, brand mark. */
  mark: "#9B8EC7",
  /** High-contrast text on cream — warm near-black display ink. */
  deepink: "#1A1820",
  /** Cooler parchment separator tone. */
  parchment: "#EDE3D2",
} as const;

export type BrandColor = (typeof BRAND_PALETTE)[keyof typeof BRAND_PALETTE];

// ============================================================================
// 2. SUBCONTINENT TELEMETRY HUBS
// ============================================================================

export type SubcontinentHubId =
  | "DEL"
  | "BOM"
  | "BLR"
  | "HYD"
  | "MAA"
  | "CCU"
  | "PNQ"
  | "AMD"
  | "NIXI-IND";

export interface SubcontinentHub {
  id: SubcontinentHubId;
  name: string;
  code: string;
  lat: number;
  lng: number;
  coordinatesLabel: string;
  region: string;
  frequency?: string;
  elevation?: string;
  isEdgeGateway?: boolean;
}

export const SUBCONTINENT_HUBS: Record<SubcontinentHubId, SubcontinentHub> = {
  DEL: {
    id: "DEL",
    name: "Delhi NCR Gateway",
    code: "DEL-01",
    lat: 28.6139,
    lng: 77.209,
    coordinatesLabel: "28.61°N · 77.20°E",
    region: "Northern Corridor",
    frequency: "142.8 HZ",
    elevation: "216M",
    isEdgeGateway: true,
  },
  BOM: {
    id: "BOM",
    name: "Mumbai Financial Ring",
    code: "BOM-02",
    lat: 19.076,
    lng: 72.8777,
    coordinatesLabel: "19.07°N · 72.87°E",
    region: "Western Commercial Hub",
    frequency: "142.8 HZ",
    elevation: "14M",
    isEdgeGateway: true,
  },
  BLR: {
    id: "BLR",
    name: "Bengaluru Tech Spine",
    code: "BLR-03",
    lat: 12.9716,
    lng: 77.5946,
    coordinatesLabel: "12.97°N · 77.59°E",
    region: "Southern Silicon Core",
    frequency: "142.8 HZ",
    elevation: "920M",
    isEdgeGateway: true,
  },
  HYD: {
    id: "HYD",
    name: "Hyderabad Cyber Lattice",
    code: "HYD-04",
    lat: 17.385,
    lng: 78.4867,
    coordinatesLabel: "17.38°N · 78.48°E",
    region: "Deccan Plateau Hub",
    frequency: "142.8 HZ",
    elevation: "542M",
    isEdgeGateway: true,
  },
  MAA: {
    id: "MAA",
    name: "Chennai Marine Node",
    code: "MAA-05",
    lat: 13.0827,
    lng: 80.2707,
    coordinatesLabel: "13.08°N · 80.27°E",
    region: "Coromandel Gateway",
    frequency: "142.8 HZ",
    elevation: "6M",
    isEdgeGateway: false,
  },
  CCU: {
    id: "CCU",
    name: "Kolkata Eastern Nexus",
    code: "CCU-06",
    lat: 22.5726,
    lng: 88.3639,
    coordinatesLabel: "22.57°N · 88.36°E",
    region: "Eastern Industrial Ring",
    frequency: "142.8 HZ",
    elevation: "9M",
    isEdgeGateway: false,
  },
  PNQ: {
    id: "PNQ",
    name: "Pune Automotive Cluster",
    code: "PNQ-07",
    lat: 18.5204,
    lng: 73.8567,
    coordinatesLabel: "18.52°N · 73.85°E",
    region: "Maharashtra Corridor",
    frequency: "142.8 HZ",
    elevation: "560M",
    isEdgeGateway: false,
  },
  AMD: {
    id: "AMD",
    name: "Ahmedabad Enterprise Grid",
    code: "AMD-08",
    lat: 23.0225,
    lng: 72.5714,
    coordinatesLabel: "23.02°N · 72.57°E",
    region: "Gujarat Manufacturing Hub",
    frequency: "142.8 HZ",
    elevation: "53M",
    isEdgeGateway: false,
  },
  "NIXI-IND": {
    id: "NIXI-IND",
    name: "National Sovereign AI Fabric",
    code: "NIXI-00",
    lat: 20.5937,
    lng: 78.9629,
    coordinatesLabel: "20.59°N · 78.96°E",
    region: "Subcontinent Sovereign Fabric",
    frequency: "142.8 HZ",
    elevation: "SEA-LEVEL",
    isEdgeGateway: true,
  },
};

// ============================================================================
// 3. TRANS-PAGE LIVING THREAD SPINE & MILESTONES
// ============================================================================

export interface TransPageSpineMilestone {
  /** Unique milestone identifier */
  id: string;
  /** 0-based sequence index */
  index: number;
  /** Technical drafting node code (e.g., "NODE // 01", "CORE // 142.8 HZ") */
  nodeCode: string;
  /** Primary milestone label */
  label: string;
  /** Secondary narrative subtitle */
  sublabel?: string;
  /** Target chapter or section slug */
  chapterSlug?: string;
  /** Scroll progress threshold (0.0 to 1.0) where this milestone activates */
  progressThreshold: number;
  /** Y-position percent along the viewport/page spine (0 to 100) */
  yPositionPercent: number;
  /** Optional linked subcontinent hub */
  hubRef?: SubcontinentHubId;
  /** Formatted latitude/longitude watermark */
  coordinateLabel?: string;
  /** Lifecycle status */
  status?: "dormant" | "active" | "verified" | "completed";
  /** Telemetry indicators */
  telemetry?: {
    freq?: string;
    metric?: string;
    statusText?: string;
  };
}

export const SPINE_MILESTONES: TransPageSpineMilestone[] = [
  {
    id: "spine-node-01",
    index: 0,
    nodeCode: "NODE // 01 · GENESIS",
    label: "Aperture Inception",
    sublabel: "Acoustic filament awakens in void",
    chapterSlug: "genesis",
    progressThreshold: 0.15,
    yPositionPercent: 18,
    hubRef: "DEL",
    coordinateLabel: "28.61°N · 77.20°E",
    status: "active",
    telemetry: {
      freq: "48.0 kHz",
      metric: "SNR 94.2 dB",
      statusText: "TELEPHONY APERTURE LOCKED",
    },
  },
  {
    id: "spine-node-02",
    index: 1,
    nodeCode: "CORE // 142.8 HZ",
    label: "Resonant Backbone",
    sublabel: "Enterprise multi-agent mesh synchronization",
    chapterSlug: "network",
    progressThreshold: 0.45,
    yPositionPercent: 48,
    hubRef: "BOM",
    coordinateLabel: "19.07°N · 72.87°E",
    status: "active",
    telemetry: {
      freq: "142.8 Hz",
      metric: "1.4s P99",
      statusText: "ZERO VARIANCE MESH",
    },
  },
  {
    id: "spine-node-03",
    index: 2,
    nodeCode: "DPDP // VERIFIED",
    label: "Sovereign Proof Gate",
    sublabel: "Zero-trust Indian data compliance seal",
    chapterSlug: "security",
    progressThreshold: 0.75,
    yPositionPercent: 78,
    hubRef: "NIXI-IND",
    coordinateLabel: "20.59°N · 78.96°E",
    status: "verified",
    telemetry: {
      freq: "SHA-256",
      metric: "100% AUDIT",
      statusText: "DPDP ACT 2023 READY",
    },
  },
];

// ============================================================================
// 4. SOLITON PARTICLE (NON-DISPERSIVE WAVE PACKET)
// ============================================================================

export interface SolitonParticle {
  /** Unique particle instance identifier */
  id: string;
  /** Position along the carrier thread (0.0 to 1.0) */
  progress: number;
  /** Velocity along carrier line (units / second) */
  velocity?: number;
  /** Wave amplitude in pixels */
  amplitude?: number;
  /** Spatial wavelength in pixels */
  wavelength?: number;
  /** Brand color token */
  color?: string;
  /** Inner core radius in pixels */
  coreRadius?: number;
  /** Outer shockwave/halo ring radius in pixels */
  haloRadius?: number;
  /** Normalized opacity (0.0 to 1.0) */
  opacity?: number;
  /** Trail decay length in pixels */
  trailLength?: number;
  /** Trail opacity decay rate */
  trailDecay?: number;
  /** Oscillatory phase angle in radians */
  phase?: number;
  /** Active state toggle */
  isActive?: boolean;
  /** Harmonic resonance frequency */
  resonanceFrequency?: number;
}

export function createSolitonParticle(
  overrides?: Partial<SolitonParticle>
): SolitonParticle {
  return {
    id: overrides?.id ?? `soliton-${Math.random().toString(36).substring(2, 9)}`,
    progress: overrides?.progress ?? 0,
    velocity: overrides?.velocity ?? 1.0,
    amplitude: overrides?.amplitude ?? 1.0,
    wavelength: overrides?.wavelength ?? 120,
    color: overrides?.color ?? BRAND_PALETTE.mark,
    coreRadius: overrides?.coreRadius ?? 1.5,
    haloRadius: overrides?.haloRadius ?? 3.5,
    opacity: overrides?.opacity ?? 1.0,
    trailLength: overrides?.trailLength ?? 24,
    trailDecay: overrides?.trailDecay ?? 0.85,
    phase: overrides?.phase ?? 0,
    isActive: overrides?.isActive ?? true,
    resonanceFrequency: overrides?.resonanceFrequency ?? 142.8,
  };
}

// ============================================================================
// 5. THE 5 FLAGSHIP ARTIFACT SCENE PHASES
// ============================================================================

/**
 * Artifact I: The Acoustic Sales Monolith
 * Acoustic telephony contact → Waveform resonance → Semantic crystallization → Deal seal.
 */
export type SalesMonolithPhase =
  | "dormant"
  | "contact_vibration"
  | "phonetic_resonance"
  | "intent_isolation"
  | "semantic_orbit"
  | "covenant_sealed";

export type SalesMonolithShot = 0 | 1 | 2 | 3 | 4 | 5;

export interface SalesMonolithPhaseConfig {
  shot: SalesMonolithShot;
  phase: SalesMonolithPhase;
  label: string;
  subtitle: string;
  voicePressureDb?: number;
  frequencyHz?: number;
  icpFitPercent?: number;
  arrEstimate?: string;
  crmStatus?: string;
}

export const SALES_MONOLITH_PHASES: SalesMonolithPhaseConfig[] = [
  {
    shot: 0,
    phase: "dormant",
    label: "STANDBY · 48kHz TELEPHONY APERTURE",
    subtitle: "The obelisk stands in silence. Ready to receive the enterprise voice stream.",
    frequencyHz: 48000,
  },
  {
    shot: 1,
    phase: "contact_vibration",
    label: "CALL CONTACT · ACOUSTIC VIBRATION",
    subtitle: "Inbound fleet director call connected over PRI trunk.",
    voicePressureDb: 72,
    frequencyHz: 3200,
  },
  {
    shot: 2,
    phase: "phonetic_resonance",
    label: "PHONETIC RESONANCE RISING",
    subtitle: "Spectrogram locked on 120 fleet truck dispatch requirements.",
    voicePressureDb: 84,
    frequencyHz: 1420,
  },
  {
    shot: 3,
    phase: "intent_isolation",
    label: "GOLDEN THREAD ISOLATING INTENT",
    subtitle: "The Thread freezes raw audio into physical geometric certainty.",
    frequencyHz: 142.8,
  },
  {
    shot: 4,
    phase: "semantic_orbit",
    label: "SEMANTIC SHARDS GRAVITATING",
    subtitle: "Dispatch routing, fuel reconciliation, and Q3 deployment orbit nucleus.",
    frequencyHz: 142.8,
  },
  {
    shot: 5,
    phase: "covenant_sealed",
    label: "ENTERPRISE COVENANT SEALED ✓",
    subtitle: "Embossed deal seal forged with ₹18,00,000 ARR in HubSpot CRM.",
    icpFitPercent: 96.4,
    arrEstimate: "₹18,00,000 / yr",
    crmStatus: "HubSpot Deal #OPP-892 Locked",
  },
];

export function getSalesMonolithPhase(shot: SalesMonolithShot): SalesMonolithPhaseConfig {
  return SALES_MONOLITH_PHASES[shot] ?? SALES_MONOLITH_PHASES[0];
}

/**
 * Artifact II: The Support Pressure Crucible
 * Critical support panic → Magnetic dampening wave → 3 Core Pillars → 0 PSI Oceanic Equilibrium.
 */
export type SupportCruciblePhase =
  | "stable_vacuum"
  | "pressure_spike"
  | "dampening_wave"
  | "condensing_pillars"
  | "brakes_lock"
  | "absolute_equilibrium";

export type SupportCrucibleShot = 0 | 1 | 2 | 3 | 4 | 5;

export interface SupportCruciblePhaseConfig {
  shot: SupportCrucibleShot;
  phase: SupportCruciblePhase;
  label: string;
  subtitle: string;
  psi: number;
  elapsedSeconds?: number;
  ssoStatus?: string;
  ticketCount?: number;
}

export const SUPPORT_CRUCIBLE_PHASES: SupportCruciblePhaseConfig[] = [
  {
    shot: 0,
    phase: "stable_vacuum",
    label: "0.0 PSI · STABLE VACUUM",
    subtitle: "The crucible rests in vacuum. Ready to absorb enterprise friction.",
    psi: 0.0,
    ticketCount: 0,
  },
  {
    shot: 1,
    phase: "pressure_spike",
    label: "98.4 PSI · CRITICAL SPIKE",
    subtitle: "Board meeting 15-minute emergency lockout alert.",
    psi: 98.4,
    ticketCount: 3,
  },
  {
    shot: 2,
    phase: "dampening_wave",
    label: "62.0 PSI · DAMPENING WAVE",
    subtitle: "Magnetic dampening field engaged · tracing root cause.",
    psi: 62.0,
  },
  {
    shot: 3,
    phase: "condensing_pillars",
    label: "24.5 PSI · CONDENSING PILLARS",
    subtitle: "Chaos liquefies into Identity, Auth Fault, and Tier-1 Clearance.",
    psi: 24.5,
  },
  {
    shot: 4,
    phase: "brakes_lock",
    label: "6.0 PSI · BRAKES LOCK",
    subtitle: "Zero-Trust STS elevation approved under cryptographic forge.",
    psi: 6.0,
  },
  {
    shot: 5,
    phase: "absolute_equilibrium",
    label: "0.0 PSI · ABSOLUTE EQUILIBRIUM ✓",
    subtitle: "Re-authenticated in 1.4s with 0 tickets pending.",
    psi: 0.0,
    elapsedSeconds: 1.4,
    ssoStatus: "Okta SSO Key #K-4091 Re-Authenticated",
    ticketCount: 0,
  },
];

export function getSupportCruciblePhase(shot: SupportCrucibleShot): SupportCruciblePhaseConfig {
  return SUPPORT_CRUCIBLE_PHASES[shot] ?? SUPPORT_CRUCIBLE_PHASES[0];
}

/**
 * Artifact III: The Tactile Document Strata & Ledger Prism
 * 3-Layer isometric documents → Ray of truth → Volumetric numerals → Audit-grade 3-way match.
 */
export type DocumentStrataPhase =
  | "optical_standby"
  | "strata_ingestion"
  | "ray_of_truth"
  | "numeral_detachment"
  | "brakes_reconciliation"
  | "ledger_committed";

export type DocumentStrataShot = 0 | 1 | 2 | 3 | 4 | 5;

export interface DocumentStrataPhaseConfig {
  shot: DocumentStrataShot;
  phase: DocumentStrataPhase;
  label: string;
  subtitle: string;
  reconciledTotal?: string;
  gstItcClaim?: string;
  variance?: number;
  documentsIngested?: number;
}

export const DOCUMENT_STRATA_PHASES: DocumentStrataPhaseConfig[] = [
  {
    shot: 0,
    phase: "optical_standby",
    label: "STANDBY · OPTICAL PRISM STAGE",
    subtitle: "Optical prism ready. Multi-format bills, challans, and POs welcomed.",
    documentsIngested: 0,
  },
  {
    shot: 1,
    phase: "strata_ingestion",
    label: "3-LAYER ISOMETRIC STRATA INGESTED",
    subtitle: "PO #PO-4401, Challan #DC-992, and Tax Bill #INV-104 loaded in depth.",
    documentsIngested: 3,
  },
  {
    shot: 2,
    phase: "ray_of_truth",
    label: "RAY OF TRUTH PIERCING PARCHMENT",
    subtitle: "Ray of truth aligning tax codes, quantities, and line items across strata.",
    documentsIngested: 3,
  },
  {
    shot: 3,
    phase: "numeral_detachment",
    label: "VOLUMETRIC NUMERAL DETACHMENT",
    subtitle: "GSTIN, Net 30 due dates, and item amounts float in volumetric space.",
    documentsIngested: 3,
  },
  {
    shot: 4,
    phase: "brakes_reconciliation",
    label: "BRAKES 3-WAY ZERO VARIANCE CHECK",
    subtitle: "PO = Delivery Challan = Tax Invoice (Zero Variance Confirmed).",
    variance: 0.0,
  },
  {
    shot: 5,
    phase: "ledger_committed",
    label: "AUDITED & COMMITTED TO ERP LEDGER ✓",
    subtitle: "₹1,46,320 total reconciled with ₹26,337.60 GST ITC safe in SAP/Tally.",
    reconciledTotal: "₹1,46,320.00",
    gstItcClaim: "₹26,337.60",
    variance: 0.0,
  },
];

export function getDocumentStrataPhase(shot: DocumentStrataShot): DocumentStrataPhaseConfig {
  return DOCUMENT_STRATA_PHASES[shot] ?? DOCUMENT_STRATA_PHASES[0];
}

/**
 * Artifact IV: The Knowledge Constellation Astrolabe
 * 4,200 suspended stars → Radar query pulse → 3-Star policy ignition → Luminous citation tablet.
 */
export type KnowledgeAstrolabePhase =
  | "vault_rest"
  | "stars_suspended"
  | "query_pulse"
  | "constellation_awakened"
  | "brakes_clearance"
  | "citation_sealed";

export type KnowledgeAstrolabeShot = 0 | 1 | 2 | 3 | 4 | 5;

export interface KnowledgeAstrolabePhaseConfig {
  shot: KnowledgeAstrolabeShot;
  phase: KnowledgeAstrolabePhase;
  label: string;
  subtitle: string;
  memoryStarCount?: number;
  searchLatencyMs?: number;
  rbacVerified?: boolean;
  citationSource?: string;
}

export const KNOWLEDGE_ASTROLABE_PHASES: KnowledgeAstrolabePhaseConfig[] = [
  {
    shot: 0,
    phase: "vault_rest",
    label: "MEMORY VAULT AT REST",
    subtitle: "4,200 company memories suspended across Notion, SharePoint, and Google Drive.",
    memoryStarCount: 4200,
  },
  {
    shot: 1,
    phase: "stars_suspended",
    label: "4,200+ CORPORATE STARS SUSPENDED",
    subtitle: "Enterprise knowledge constellation floating in celestial silence.",
    memoryStarCount: 4200,
  },
  {
    shot: 2,
    phase: "query_pulse",
    label: "SONAR QUERY PULSE EMITTED",
    subtitle: "14ms semantic radar pulse sweeps across memory space.",
    searchLatencyMs: 14,
  },
  {
    shot: 3,
    phase: "constellation_awakened",
    label: "3-STAR POLICY CONSTELLATION AWAKENED",
    subtitle: "4,197 irrelevant files fade; exact 3 policy stars ignite (99.4% conf).",
    searchLatencyMs: 14,
  },
  {
    shot: 4,
    phase: "brakes_clearance",
    label: "BRAKES RBAC CLEARANCE AUDIT",
    subtitle: "User RBAC tier verified · Zero hallucination confirmed.",
    rbacVerified: true,
  },
  {
    shot: 5,
    phase: "citation_sealed",
    label: "LUMINOUS CITATION TABLET SEALED ✓",
    subtitle: "Exact per-diem policy quoted from HR Handbook §4.2 with verified provenance.",
    citationSource: "HR-Policy-Handbook-2025.pdf (§4.2, Pg 18)",
    rbacVerified: true,
  },
];

export function getKnowledgeAstrolabePhase(shot: KnowledgeAstrolabeShot): KnowledgeAstrolabePhaseConfig {
  return KNOWLEDGE_ASTROLABE_PHASES[shot] ?? KNOWLEDGE_ASTROLABE_PHASES[0];
}

/**
 * Artifact V: The Harmonic Dual-Stream Voice Loom
 * Analog telephony + WhatsApp digital → Braided filament weaving → One unified customer truth.
 */
export type VoiceLoomPhase =
  | "chambers_ready"
  | "dual_streams"
  | "braided_weaving"
  | "unified_matrix"
  | "brakes_dpdp_check"
  | "truth_committed";

export type VoiceLoomShot = 0 | 1 | 2 | 3 | 4 | 5;

export interface VoiceLoomPhaseConfig {
  shot: VoiceLoomShot;
  phase: VoiceLoomPhase;
  label: string;
  subtitle: string;
  voiceLatencyMs?: number;
  isDpdpRedacted?: boolean;
  emrSlotLocked?: boolean;
}

export const VOICE_LOOM_PHASES: VoiceLoomPhaseConfig[] = [
  {
    shot: 0,
    phase: "chambers_ready",
    label: "DUAL HARMONIC CHAMBERS READY",
    subtitle: "Dual telephony lines and WhatsApp webhook streams balanced in the loom.",
  },
  {
    shot: 1,
    phase: "dual_streams",
    label: "ANALOG VACUUM TUBE + DIGITAL QUARTZ",
    subtitle: "Inbound voice call (240ms) and encrypted WhatsApp packet stream concurrently.",
    voiceLatencyMs: 240,
  },
  {
    shot: 2,
    phase: "braided_weaving",
    label: "BRAIDED THREAD WEAVING VECTORS",
    subtitle: "Braided thread weaving analog voice and digital text into one reality.",
  },
  {
    shot: 3,
    phase: "unified_matrix",
    label: "UNIFIED CUSTOMER MATRIX FORMED",
    subtitle: "Patient identity, clinical intent, doctor slot, and appointment time synthesized.",
  },
  {
    shot: 4,
    phase: "brakes_dpdp_check",
    label: "BRAKES DPDP PRIVACY & EMR CHECK",
    subtitle: "Dr. Rao slot verified · Voice audio stream redacted at edge.",
    isDpdpRedacted: true,
  },
  {
    shot: 5,
    phase: "truth_committed",
    label: "ONE CUSTOMER TRUTH COMMITTED ✓",
    subtitle: "Hospital EMR slot locked for 3:30 PM with calendar pass pushed via WhatsApp.",
    emrSlotLocked: true,
    isDpdpRedacted: true,
  },
];

export function getVoiceLoomPhase(shot: VoiceLoomShot): VoiceLoomPhaseConfig {
  return VOICE_LOOM_PHASES[shot] ?? VOICE_LOOM_PHASES[0];
}

// ============================================================================
// 6. LAXVISH THREAD COMPONENT CONTRACTS
// ============================================================================

export type LaxvishThreadVariant =
  | "straight"
  | "wave"
  | "orbit"
  | "connecting"
  | "scan"
  | "circle"
  | "soliton-pulse"
  | "ruler"
  | "spine";

export interface LaxvishThreadProps {
  /** Visual variant representation of the thread */
  variant?: LaxvishThreadVariant;
  /** Custom wrapper CSS class */
  className?: string;
  /** Primary thread color (defaults to brand mark #9B8EC7) */
  color?: string;
  /** Secondary or carrier thread color (defaults to brand ink #BDA6CE) */
  secondaryColor?: string;
  /** Stroke width in pixels (defaults to 1.25 or 1.5) */
  strokeWidth?: number;
  /** Custom soliton particle configuration for soliton-pulse / spine variants */
  soliton?: Partial<SolitonParticle>;
  /** Manual progress control (0.0 to 1.0) */
  progress?: number;
  /** Accessible description label */
  ariaLabel?: string;
  /** Whether kinetic animation is enabled */
  animated?: boolean;
  /** Cycle duration in seconds */
  duration?: number;
}
