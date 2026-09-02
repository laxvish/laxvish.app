"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { FinanceApScene } from "./scenes/FinanceApScene";
import { ContractScene } from "./scenes/ContractScene";
import { ItHelpdeskScene } from "./scenes/ItHelpdeskScene";
import { ExecutiveScene } from "./scenes/ExecutiveScene";
import { MarketingScene } from "./scenes/MarketingScene";
import { ProcurementScene } from "./scenes/ProcurementScene";
import { HrOperationsScene } from "./scenes/HrOperationsScene";
import { ReportingAnalyticsScene } from "./scenes/ReportingAnalyticsScene";

// ============================================================================
// TYPE DEFINITIONS - Subcontinent Bus Topology
// ============================================================================
export type SubcontinentHubId = "DEL" | "BOM" | "BLR" | "HYD";

export interface NetworkSpecialist {
  id: string;
  slug: string;
  name: string;
  role: string;
  category: string;
  parentHub: SubcontinentHubId;
  oneLiner: string;
  vignetteStory: string;
  x: number;
  y: number;
  telemetry: string;
}

export interface BusTract {
  id: string;
  fromHub: SubcontinentHubId;
  toHub: SubcontinentHubId;
  channelCode: string;
  impedance: string;
  lengthKm: number;
}

const BRAND = {
  cream: "#F2EAE0",
  mist: "#B4D3D9",
  ink: "#BDA6CE",
  mark: "#9B8EC7",
  deepink: "#1A1820",
} as const;

const SUBCONTINENT_REGIONS: Record<
  SubcontinentHubId,
  { name: string; lat: string; lon: string; role: string; x: number; y: number; nixiLatency: string; busHead: string }
> = {
  DEL: {
    name: "DELHI // NCR",
    lat: "28.61° N",
    lon: "77.20° E",
    role: "Executive Policy & Sovereign Kernel",
    x: 50,
    y: 14,
    nixiLatency: "1.8 ms",
    busHead: "POLICY_BUS_28A",
  },
  BOM: {
    name: "MUMBAI // WEST",
    lat: "19.07° N",
    lon: "72.87° E",
    role: "GSTN Tax Gateway & Treasury",
    x: 16,
    y: 48,
    nixiLatency: "2.4 ms",
    busHead: "TREASURY_BUS_19B",
  },
  HYD: {
    name: "HYDERABAD // DECCAN",
    lat: "17.38° N",
    lon: "78.48° E",
    role: "DPDP Vault & Memory Retrieval",
    x: 84,
    y: 48,
    nixiLatency: "2.9 ms",
    busHead: "VAULT_BUS_17C",
  },
  BLR: {
    name: "BENGALURU // SOUTH",
    lat: "12.97° N",
    lon: "77.59° E",
    role: "Autonomous Workers Fabric",
    x: 50,
    y: 84,
    nixiLatency: "3.1 ms",
    busHead: "WORKER_BUS_12D",
  },
};

// 6 distinct bus tracts connecting all 4 hubs (full mesh)
const BUS_TRACTS: BusTract[] = [
  { id: "DEL-BOM", fromHub: "DEL", toHub: "BOM", channelCode: "NORTH_WEST_CORRIDOR", impedance: "Z₀ = 50.2 Ω", lengthKm: 1420 },
  { id: "DEL-HYD", fromHub: "DEL", toHub: "HYD", channelCode: "NORTH_EAST_CORRIDOR", impedance: "Z₀ = 50.0 Ω", lengthKm: 1540 },
  { id: "BOM-BLR", fromHub: "BOM", toHub: "BLR", channelCode: "WEST_SOUTH_CORRIDOR", impedance: "Z₀ = 50.4 Ω", lengthKm: 980 },
  { id: "HYD-BLR", fromHub: "HYD", toHub: "BLR", channelCode: "EAST_SOUTH_CORRIDOR", impedance: "Z₀ = 50.1 Ω", lengthKm: 568 },
  { id: "DEL-BLR", fromHub: "DEL", toHub: "BLR", channelCode: "PENINSULAR_SPINE", impedance: "Z₀ = 50.0 Ω", lengthKm: 1740 },
  { id: "BOM-HYD", fromHub: "BOM", toHub: "HYD", channelCode: "TRANS_DECCAN_CROSS_LINK", impedance: "Z₀ = 49.8 Ω", lengthKm: 1240 },
];

const NETWORK_SPECIALISTS: NetworkSpecialist[] = [
  {
    id: "executive",
    slug: "executive-intelligence",
    name: "Executive Intelligence",
    role: "Multi-Signal Radar",
    category: "Leadership",
    parentHub: "DEL",
    oneLiner: "Hundreds of sales, churn, and cashflow signals compressed into 1 clear insight.",
    vignetteStory: "The Thread scans daily business noise across CRM, ERP, and HRIS, eliminating vanity metrics to formulate an executive morning brief.",
    x: 80,
    y: 14,
    telemetry: "KERNEL // ACTIVE · SYNC 99.98%",
  },
  {
    id: "finance",
    slug: "finance-ap",
    name: "Finance & AP",
    role: "Ledger Reconciliation",
    category: "Finance",
    parentHub: "BOM",
    oneLiner: "Invoices extracted, validated against GST ITC, and set payment-ready.",
    vignetteStory: "The Thread visits incoming bills, matches line items to POs, verifies tax math, and prepares batch payouts in Tally / SAP.",
    x: 6,
    y: 30,
    telemetry: "GSTN ITC // 3-WAY MATCH",
  },
  {
    id: "marketing",
    slug: "marketing-operations",
    name: "Marketing Operations",
    role: "Campaign Orchestration",
    category: "Growth",
    parentHub: "DEL",
    oneLiner: "Audience intent identified, copy created, multi-channel rollout executed.",
    vignetteStory: "The Thread synchronizes ad accounts, synthesizes content tailored to ICP segments, and tracks attribution across channels.",
    x: 94,
    y: 30,
    telemetry: "ICP MATCH // 84.2% RELEVANCE",
  },
  {
    id: "procurement",
    slug: "procurement",
    name: "Procurement & Vendor Engine",
    role: "Supplier Matching",
    category: "Operations",
    parentHub: "BOM",
    oneLiner: "Multiple vendor bids compared on price, delivery SLA, and compliance.",
    vignetteStory: "The Thread evaluates competing vendor proposals, extracts hidden delivery fees, selects the optimal bid, and issues the PO.",
    x: 6,
    y: 66,
    telemetry: "SLA AUDIT // L1 VALIDATED",
  },
  {
    id: "hr",
    slug: "hr-operations",
    name: "People & HR Operations",
    role: "Lifecycle Management",
    category: "People",
    parentHub: "HYD",
    oneLiner: "Employee queries answered, leave approved, policy verified with zero wait.",
    vignetteStory: "The Thread checks handbook policies, reviews remaining employee leave balances, and logs approved requests directly in HRMS.",
    x: 94,
    y: 66,
    telemetry: "HRMS // LEAVE BALANCES SYNCED",
  },
  {
    id: "contract",
    slug: "contract-automation",
    name: "Contract Risk Analyzer",
    role: "Clause Intelligence",
    category: "Legal",
    parentHub: "BOM",
    oneLiner: "Multi-page agreements scanned for hidden liability, indemnity, and SLA risks.",
    vignetteStory: "The Thread isolates non-standard indemnities and uncapped liabilities, scoring contract risk before legal sign-off.",
    x: 22,
    y: 90,
    telemetry: "LEGAL // ZERO UNCAPPED INDEMNITY",
  },
  {
    id: "it",
    slug: "it-helpdesk",
    name: "IT Helpdesk & Access Terminal",
    role: "Diagnostic & Repair",
    category: "Security",
    parentHub: "BLR",
    oneLiner: "Broken endpoints diagnosed, VPN tokens renewed, systems restored in seconds.",
    vignetteStory: "The Thread intercepts outage alerts, isolates failing API endpoints, executes automated cache purges, and restores access.",
    x: 50,
    y: 96,
    telemetry: "SAML SSO // OKTA RBAC VERIFIED",
  },
  {
    id: "analytics",
    slug: "reporting-analytics",
    name: "Narrative Analytics Studio",
    role: "WBR Synthesis",
    category: "Intelligence",
    parentHub: "HYD",
    oneLiner: "Raw tabular database rows synthesized into structured narrative management reports.",
    vignetteStory: "The Thread detects hidden cohort retention anomalies in SQL tables and drafts a crisp 3-point Weekly Business Review.",
    x: 78,
    y: 90,
    telemetry: "WBR // COHORT RETENTION COMPILED",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================
export function LivingNetworkStage() {
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string>("executive");
  const [selectedHubId, setSelectedHubId] = useState<SubcontinentHubId>("DEL");

  const activeSpecialist = NETWORK_SPECIALISTS.find((n) => n.id === selectedSpecialistId) || NETWORK_SPECIALISTS[0];
  const activeHub = SUBCONTINENT_REGIONS[selectedHubId];

  const renderActiveVignette = () => {
    switch (activeSpecialist.id) {
      case "executive": return <ExecutiveScene />;
      case "finance": return <FinanceApScene />;
      case "marketing": return <MarketingScene />;
      case "procurement": return <ProcurementScene />;
      case "hr": return <HrOperationsScene />;
      case "contract": return <ContractScene />;
      case "it": return <ItHelpdeskScene />;
      case "analytics": return <ReportingAnalyticsScene />;
      default: return <ExecutiveScene />;
    }
  };

  // Helper: orthogonal/Manhattan routing - maps two points into an L-shaped step path
  const manhattanPath = (x1: number, y1: number, x2: number, y2: number, midY: number) => {
    return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
  };

  return (
    <div className="relative mx-auto w-full overflow-hidden border border-[#1A1820]/15 bg-[#F2EAE0] p-4 sm:p-8 lg:p-10 text-[#1A1820]">
      {/* PCB Solder-Mask Background Pattern */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="pcbTrace" width="32" height="32" patternUnits="userSpaceOnUse">
            {/* PCB Copper Weave Substrate */}
            <path d="M 0 0 L 32 0 M 0 16 L 32 16 M 0 0 L 0 32 M 16 0 L 16 32" stroke="#1A1820" strokeWidth="0.25" strokeOpacity="0.08" />
            {/* Through-Hole Via Spots */}
            <circle cx="16" cy="16" r="0.5" fill="#9B8EC7" fillOpacity="0.4" />
            <circle cx="16" cy="16" r="1" fill="none" stroke="#9B8EC7" strokeWidth="0.4" strokeOpacity="0.3" />
          </pattern>
          <pattern id="pcbTick" width="60" height="60" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="12" y2="0" stroke="#9B8EC7" strokeWidth="0.3" strokeOpacity="0.25" />
            <line x1="0" y1="0" x2="0" y2="12" stroke="#9B8EC7" strokeWidth="0.3" strokeOpacity="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcbTrace)" />
        <rect width="100%" height="100%" fill="url(#pcbTick)" />
      </svg>

      {/* Section Header */}
      <div className="relative z-10 flex flex-col justify-between gap-4 border-b border-[#1A1820]/15 pb-6 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#9B8EC7]">
            <span className="h-2 w-2 block bg-[#9B8EC7]" />
            <span>SUBCONTINENT BUS TOPOLOGY // NIXI TRUNK</span>
          </div>
          <h3 className="mt-2 text-2xl font-normal tracking-tight text-[#1A1820] sm:text-3xl">
            The Thread runs on a continental fiber registry
          </h3>
          <p className="mt-1 font-mono text-xs text-[#1A1820]/75 sm:text-sm">
            Strictly orthogonal fiber routing between DEL, BOM, HYD, BLR with active worker modules.
          </p>
        </div>

        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[#1A1820] underline underline-offset-4 hover:text-[#9B8EC7]"
        >
          <span>Explore 13 enterprise solutions</span>
          <span>→</span>
        </Link>
      </div>

      {/* Header Telemetry Bar */}
      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-2 border border-[#1A1820]/15 bg-[#EDE3D2] p-2 font-mono text-[10px] uppercase">
        <span className="text-[#9B8EC7] font-bold">SUBCONTINENT BUS TOPOLOGY ACTIVE</span>
        <span className="text-[#1A1820]/70">4 CORES // 6 BUS TRACTS // 8 WORKERS</span>
        <span className="text-[#1A1820]/70">[ DEL · BOM · BLR · HYD ]</span>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 mt-5 grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Orthogonal Subcontinent PCB Schematic */}
        <div className="relative flex min-h-[500px] w-full flex-col border border-[#1A1820]/15 bg-[#F2EAE0] p-4 sm:p-5 lg:col-span-7">
          {/* PCB Title Block */}
          <div className="flex items-center justify-between border-b border-[#1A1820]/15 pb-2 font-mono text-[9.5px] uppercase text-[#1A1820]/60">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 block bg-[#9B8EC7]" />
              <span className="font-semibold text-[#1A1820]">NIXI BUS TOPOLOGY // LAYER_01</span>
            </div>
            <span className="text-[#9B8EC7]">SELECT CORE OR WORKER</span>
          </div>

          {/* Interactive PCB Canvas */}
          <div className="relative my-3 flex h-[460px] w-full items-center justify-center">
            <svg
              viewBox="0 0 600 400"
              className="absolute inset-0 h-full w-full overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* PCB Backing Grid */}
              <defs>
                <pattern id="pcbInner" width="15" height="15" patternUnits="userSpaceOnUse">
                  <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#1A1820" strokeWidth="0.25" strokeOpacity="0.15" />
                </pattern>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#9B8EC7" fillOpacity="0.6" />
                </marker>
              </defs>
              <rect width="600" height="400" fill="url(#pcbInner)" />

              {/* 6 Subcontinent Bus Traces (Manhattan Octilinear routing) */}
              {BUS_TRACTS.map((tract) => {
                const from = SUBCONTINENT_REGIONS[tract.fromHub];
                const to = SUBCONTINENT_REGIONS[tract.toHub];
                const cx1 = (from.x / 100) * 600;
                const cy1 = (from.y / 100) * 400;
                const cx2 = (to.x / 100) * 600;
                const cy2 = (to.y / 100) * 400;
                const midY = (cy1 + cy2) / 2;

                return (
                  <g key={tract.id} className="pointer-events-none">
                    {/* Inner trace */}
                    <path
                      d={manhattanPath(cx1, cy1, cx2, cy2, midY)}
                      fill="none"
                      stroke="#9B8EC7"
                      strokeOpacity="0.45"
                      strokeWidth="1.25"
                    />
                    {/* Outer halo */}
                    <path
                      d={manhattanPath(cx1, cy1, cx2, cy2, midY)}
                      fill="none"
                      stroke="#1A1820"
                      strokeOpacity="0.18"
                      strokeWidth="2.75"
                    />
                    {/* Channel label on mid-segment */}
                    <g transform={`translate(${(cx1 + cx2) / 2 - 28}, ${midY - 8})`}>
                      <rect width="60" height="12" fill="#F2EAE0" stroke="#9B8EC7" strokeWidth="0.5" />
                      <text x="30" y="9" textAnchor="middle" fill="#1A1820" fontFamily="monospace" fontSize="6" fontWeight="bold">
                        {tract.channelCode}
                      </text>
                    </g>
                    {/* Soliton signal pulse traveling along trace */}
                    <motion.rect
                      x={0}
                      y={0}
                      width="6"
                      height="6"
                      fill="#9B8EC7"
                      stroke="#1A1820"
                      strokeWidth="0.5"
                      initial={{ x: cx1 - 3, y: cy1 - 3 }}
                      animate={{
                        x: [cx1 - 3, cx1 - 3, cx2 - 3, cx2 - 3],
                        y: [cy1 - 3, midY - 3, midY - 3, cy2 - 3],
                      }}
                      transition={{
                        duration: 3.6 + Math.random() * 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.45, 0.55, 1],
                      }}
                    />
                  </g>
                );
              })}

              {/* SMD Hub Chip Quadratic Flat-Packs (DEL, BOM, HYD, BLR) */}
              {Object.entries(SUBCONTINENT_REGIONS).map(([key, hub]) => {
                const isSelected = selectedHubId === key;
                const cx = (hub.x / 100) * 600;
                const cy = (hub.y / 100) * 400;
                return (
                  <g key={`hub-chip-${key}`} transform={`translate(${cx}, ${cy})`} className="pointer-events-none">
                    {/* PCB pad landing */}
                    <rect x="-22" y="-22" width="44" height="44" fill="#EDE3D2" stroke="#9B8EC7" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
                    {/* Chip package body */}
                    <rect x="-16" y="-16" width="32" height="32" fill="#F2EAE0" stroke="#1A1820" strokeWidth={isSelected ? 2 : 1.5} />
                    {/* Pin 1 marker (top-left corner) */}
                    <circle cx="-12" cy="-12" r="1.5" fill="#1A1820" />
                    {/* Left/right side pins */}
                    {[0, 1, 2, 3].map((i) => (
                      <g key={`pin-${i}`}>
                        <rect x="-19" y={-12 + i * 8} width="3" height="3" fill="#9B8EC7" stroke="#1A1820" strokeWidth="0.5" />
                        <rect x="16" y={-12 + i * 8} width="3" height="3" fill="#9B8EC7" stroke="#1A1820" strokeWidth="0.5" />
                      </g>
                    ))}
                    {/* Active indicator */}
                    {isSelected && (
                      <>
                        <rect x="-18" y="-18" width="36" height="36" fill="none" stroke="#9B8EC7" strokeWidth="1.5" strokeDasharray="2 1" />
                        <circle cx="0" cy="0" r="2" fill="#9B8EC7" />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Hub Buttons */}
            {Object.entries(SUBCONTINENT_REGIONS).map(([key, hub]) => {
              const isSelected = selectedHubId === key;
              return (
                <button
                  key={`hub-btn-${key}`}
                  type="button"
                  onClick={() => setSelectedHubId(key as SubcontinentHubId)}
                  style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer font-mono text-left z-20 ${
                    isSelected
                      ? "border-2 border-[#9B8EC7] bg-[#F2EAE0] px-2 py-1 shadow-sm"
                      : "border border-[#1A1820]/20 bg-[#F2EAE0]/90 px-1.5 py-0.5 hover:border-[#9B8EC7]"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 block ${isSelected ? "bg-[#9B8EC7]" : "bg-[#1A1820]/50"}`} />
                    <span className="text-[9px] font-bold tracking-tight text-[#1A1820]">
                      {key} · {hub.nixiLatency}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Specialist Buttons */}
            {NETWORK_SPECIALISTS.map((spec) => {
              const isSelected = spec.id === selectedSpecialistId;
              return (
                <button
                  key={`spec-btn-${spec.id}`}
                  type="button"
                  onClick={() => {
                    setSelectedSpecialistId(spec.id);
                    setSelectedHubId(spec.parentHub);
                  }}
                  style={{ left: `${spec.x}%`, top: `${spec.y}%` }}
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer font-mono text-left z-30 ${
                    isSelected
                      ? "border-2 border-[#9B8EC7] bg-[#F2EAE0] px-2 py-1 shadow-sm"
                      : "border border-[#1A1820]/20 bg-[#F2EAE0]/95 px-1.5 py-0.5 hover:border-[#9B8EC7]"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className={`h-1 w-1 block ${isSelected ? "bg-[#9B8EC7]" : "bg-[#1A1820]/40"}`} />
                    <span className="text-[8.5px] font-medium text-[#1A1820] whitespace-nowrap">
                      {spec.name.split(" ")[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Active Telemetry */}
          <div className="border-t border-[#1A1820]/15 pt-3 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] text-[#1A1820]/60 uppercase">
              <span>HUB <strong className="text-[#1A1820]">{activeHub.name}</strong> // {activeHub.busHead}</span>
              <span className="text-[#9B8EC7] font-bold">{activeSpecialist.telemetry}</span>
            </div>
            <p className="mt-1 font-mono text-[10.5px] text-[#1A1820]/75">
              {activeSpecialist.oneLiner}
            </p>
          </div>
        </div>

        {/* Right Column: Live Specialist Cinematic Vignette */}
        <div className="flex flex-col space-y-4 lg:col-span-5">
          <div className="border border-[#1A1820]/15 bg-[#F2EAE0] p-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpecialist.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                {renderActiveVignette()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border border-[#1A1820]/15 bg-[#EDE3D2] p-4 font-mono text-xs">
            <div className="max-w-md">
              <span className="text-[9px] uppercase tracking-wider text-[#9B8EC7] font-semibold">
                {activeSpecialist.category} · {activeSpecialist.parentHub} MODULE
              </span>
              <span className="text-[#1A1820]/75 text-[11px] leading-relaxed block mt-1">
                {activeSpecialist.vignetteStory}
              </span>
            </div>
            <Link
              href={`/solutions/${activeSpecialist.slug}`}
              className="inline-flex items-center gap-1.5 border border-[#9B8EC7] bg-[#9B8EC7] px-4 py-2 font-mono text-[10.5px] font-semibold text-[#F2EAE0] hover:bg-[#1A1820] hover:border-[#1A1820]"
            >
              <span>Full Briefing</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
