"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import Link from "next/link";
import { FinanceApScene } from "./scenes/FinanceApScene";
import { ContractScene } from "./scenes/ContractScene";
import { ItHelpdeskScene } from "./scenes/ItHelpdeskScene";
import { ExecutiveScene } from "./scenes/ExecutiveScene";
import { MarketingScene } from "./scenes/MarketingScene";
import { ProcurementScene } from "./scenes/ProcurementScene";
import { HrOperationsScene } from "./scenes/HrOperationsScene";
import { ReportingAnalyticsScene } from "./scenes/ReportingAnalyticsScene";

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
  x: number; // percentage on canvas (0..100)
  y: number;
  telemetry: string;
}

const SUBCONTINENT_REGIONS: Record<
  SubcontinentHubId,
  { name: string; lat: string; lon: string; role: string; x: number; y: number; nixiLatency: string }
> = {
  DEL: {
    name: "DELHI // NCR",
    lat: "28.61° N",
    lon: "77.20° E",
    role: "Executive Policy & Sovereign Governance Kernel",
    x: 50,
    y: 14,
    nixiLatency: "1.8 ms",
  },
  BOM: {
    name: "MUMBAI // WEST",
    lat: "19.07° N",
    lon: "72.87° E",
    role: "GSTN Tax Gateway & Treasury Settlement",
    x: 18,
    y: 48,
    nixiLatency: "2.4 ms",
  },
  HYD: {
    name: "HYDERABAD // DECCAN",
    lat: "17.38° N",
    lon: "78.48° E",
    role: "DPDP Statutory Vault & Memory Retrieval",
    x: 82,
    y: 48,
    nixiLatency: "2.9 ms",
  },
  BLR: {
    name: "BENGALURU // SOUTH",
    lat: "12.97° N",
    lon: "77.59° E",
    role: "Autonomous Neural Workers & Execution Fabric",
    x: 50,
    y: 82,
    nixiLatency: "3.1 ms",
  },
};

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
    x: 50,
    y: 8,
    telemetry: "KERNEL // ACTIVE · SYNC RATE 99.98%",
  },
  {
    id: "finance",
    slug: "finance-ap",
    name: "Finance & Accounts Payable",
    role: "Ledger Reconciliation",
    category: "Finance",
    parentHub: "BOM",
    oneLiner: "Invoices extracted, validated against GST ITC, and set payment-ready.",
    vignetteStory: "The Thread visits incoming bills, matches line items to POs, verifies tax math, and prepares batch payouts in Tally / SAP.",
    x: 14,
    y: 34,
    telemetry: "GSTN ITC // 3-WAY MATCH ZERO VARIANCE",
  },
  {
    id: "marketing",
    slug: "marketing-operations",
    name: "Marketing Operations",
    role: "Campaign Orchestration",
    category: "Growth",
    parentHub: "DEL",
    oneLiner: "Audience intent identified, personalized copy created, multi-channel rollout executed.",
    vignetteStory: "The Thread synchronizes ad accounts, synthesizes content tailored to ICP segments, and tracks attribution across channels.",
    x: 86,
    y: 34,
    telemetry: "ICP MATCH // 84.2% RELEVANCE PASS",
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
    x: 14,
    y: 64,
    telemetry: "SLA AUDIT // L1 BIDDER VALIDATED",
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
    x: 86,
    y: 64,
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
    x: 28,
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
    y: 92,
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
    x: 72,
    y: 90,
    telemetry: "WBR // COHORT RETENTION COMPILED",
  },
];

export function LivingNetworkStage() {
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string>("executive");
  const [selectedHubId, setSelectedHubId] = useState<SubcontinentHubId>("DEL");

  const activeSpecialist =
    NETWORK_SPECIALISTS.find((n) => n.id === selectedSpecialistId) || NETWORK_SPECIALISTS[0];
  const activeHub = SUBCONTINENT_REGIONS[selectedHubId];

  // Soliton transmission streams between major hubs
  const solitonStreams = useMemo(() => {
    return [
      { id: "del-bom", x1: 50, y1: 14, x2: 18, y2: 48, label: "GSTN_ITC_MATCH // ₹4.82L", duration: 3.2 },
      { id: "del-hyd", x1: 50, y1: 14, x2: 82, y2: 48, label: "DPDP_CONSENT_TOKEN", duration: 3.6 },
      { id: "bom-blr", x1: 18, y1: 48, x2: 50, y2: 82, label: "SAML_SSO_RENEW", duration: 3.0 },
      { id: "hyd-blr", x1: 82, y1: 48, x2: 50, y2: 82, label: "EMR_RECORD_SYNC", duration: 3.4 },
      { id: "del-blr", x1: 50, y1: 14, x2: 50, y2: 82, label: "PENINSULAR_SPINE", duration: 4.2 },
      { id: "bom-hyd", x1: 18, y1: 48, x2: 82, y2: 48, label: "DECCAN_CROSS_LINK", duration: 3.8 },
    ];
  }, []);

  const renderActiveVignette = () => {
    switch (activeSpecialist.id) {
      case "executive":
        return <ExecutiveScene />;
      case "finance":
        return <FinanceApScene />;
      case "marketing":
        return <MarketingScene />;
      case "procurement":
        return <ProcurementScene />;
      case "hr":
        return <HrOperationsScene />;
      case "contract":
        return <ContractScene />;
      case "it":
        return <ItHelpdeskScene />;
      case "analytics":
        return <ReportingAnalyticsScene />;
      default:
        return <ExecutiveScene />;
    }
  };

  return (
    <div className="relative mx-auto w-full overflow-hidden border border-rule-hair bg-cream p-4 sm:p-8 lg:p-10 text-deepink">
      {/* Background Micro-Halftone Substrate */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(26, 24, 32, 0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col justify-between gap-4 border-b border-rule-hair pb-6 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-mark">
            <span className="h-2 w-2 bg-mark" />
            <span>THE SUBCONTINENT NERVE GRID</span>
          </div>
          <h3 className="mt-2 text-2xl font-normal tracking-tight text-deepink sm:text-3xl">
            The Laxvish Thread synchronizes across every enterprise function
          </h3>
          <p className="mt-1 font-mono text-xs text-deepink/70 sm:text-sm">
            Interactive continental neural map connecting Indian regional hubs with specialized autonomous workers.
          </p>
        </div>

        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 font-mono text-xs font-medium text-deepink underline underline-offset-4 hover:text-mark transition-colors cursor-pointer"
        >
          <span>Explore all 13 enterprise solutions</span>
          <span>→</span>
        </Link>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Subcontinent Nerve Grid & Soliton Stream Canvas */}
        <div className="relative flex min-h-[500px] w-full flex-col justify-between border border-rule-hair bg-cream p-4 sm:p-6 lg:col-span-6">
          {/* Top Stage Header & Telemetry */}
          <div className="flex items-center justify-between border-b border-rule-hair pb-3 font-mono text-[9.5px] uppercase text-deepink/60">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-mark" />
              <span className="font-semibold text-deepink">NIXI MESH // 4 HUBS ACTIVE</span>
            </div>
            <span className="text-mark font-medium">SELECT HUB OR WORKER</span>
          </div>

          {/* Interactive Tactical SVG Map Stage */}
          <div className="relative my-4 flex h-[380px] w-full items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full overflow-visible pointer-events-none"
            >
              {/* Defs for Soliton Data Stream Packets */}
              <defs>
                <linearGradient id="solitonPacketGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#BDA6CE" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#9B8EC7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#1A1820" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Interconnecting Subcontinent Fiber Backbone Lines */}
              {solitonStreams.map((stream) => (
                <g key={stream.id}>
                  {/* Static Baseline Guide Line */}
                  <line
                    x1={stream.x1}
                    y1={stream.y1}
                    x2={stream.x2}
                    y2={stream.y2}
                    stroke="#BDA6CE"
                    strokeOpacity="0.35"
                    strokeWidth="0.75"
                    strokeDasharray="2 3"
                  />

                  {/* High-Frequency Travelling Soliton Wave Packet */}
                  <motion.line
                    x1={stream.x1}
                    y1={stream.y1}
                    x2={stream.x2}
                    y2={stream.y2}
                    stroke="#9B8EC7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="8 80"
                    animate={{
                      strokeDashoffset: [-88, 88],
                    }}
                    transition={{
                      duration: stream.duration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </g>
              ))}

              {/* Connecting Lines from Specialists to Parent Hubs */}
              {NETWORK_SPECIALISTS.map((spec) => {
                const parent = SUBCONTINENT_REGIONS[spec.parentHub];
                const isSelected = spec.id === selectedSpecialistId;
                return (
                  <line
                    key={`spec-line-${spec.id}`}
                    x1={parent.x}
                    y1={parent.y}
                    x2={spec.x}
                    y2={spec.y}
                    stroke={isSelected ? "#9B8EC7" : "#1A1820"}
                    strokeOpacity={isSelected ? 0.9 : 0.25}
                    strokeWidth={isSelected ? 1.25 : 0.5}
                  />
                );
              })}

              {/* Subcontinent Hub Node Markers (DEL, BOM, BLR, HYD) */}
              {Object.entries(SUBCONTINENT_REGIONS).map(([key, hub]) => {
                const isSelected = selectedHubId === key;
                return (
                  <g key={key} transform={`translate(${hub.x}, ${hub.y})`}>
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 5.5 : 4}
                      fill={isSelected ? "#9B8EC7" : "#F2EAE0"}
                      stroke="#1A1820"
                      strokeWidth="1.25"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 9 : 6.5}
                      fill="none"
                      stroke="#9B8EC7"
                      strokeWidth="0.75"
                      strokeOpacity={isSelected ? 0.8 : 0.4}
                      strokeDasharray={isSelected ? "none" : "2 2"}
                    />
                  </g>
                );
              })}

              {/* Center Peninsular Nexus Jewel */}
              <circle cx="50" cy="48" r="2.5" fill="#1A1820" />
              <circle cx="50" cy="48" r="5" fill="none" stroke="#9B8EC7" strokeWidth="0.75" strokeOpacity="0.5" />
            </svg>

            {/* Clickable 4 Core Subcontinent Hub Buttons */}
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
                      ? "border-2 border-mark bg-cream px-2 py-1 shadow-sm"
                      : "border border-rule-hair bg-cream/90 px-1.5 py-0.5 hover:border-mark"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 ${isSelected ? "bg-mark" : "bg-deepink/50"}`} />
                    <span className="text-[9px] font-bold tracking-tight text-deepink">
                      {key} // {hub.nixiLatency}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Clickable 8 Specialized Department Worker Nodes */}
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
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer font-mono text-left transition-colors duration-150 z-30 ${
                    isSelected
                      ? "border-2 border-mark bg-cream px-2 py-1 shadow-sm"
                      : "border border-rule-hair bg-cream/95 px-1.5 py-0.5 hover:border-mark"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className={`h-1 w-1 ${isSelected ? "bg-mark" : "bg-deepink/40"}`} />
                    <span className="text-[8px] sm:text-[8.5px] font-medium tracking-tight text-deepink whitespace-nowrap">
                      {spec.name.split(" ")[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Active Telemetry Box */}
          <div className="border-t border-rule-hair pt-3 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] text-deepink/60">
              <span>HUB FOCUS: <strong className="text-deepink">{activeHub.name}</strong></span>
              <span className="text-mark">{activeSpecialist.telemetry}</span>
            </div>
            <p className="mt-1 font-mono text-[10.5px] text-deepink/75">
              {activeSpecialist.oneLiner}
            </p>
          </div>
        </div>

        {/* Right Column: Live Specialist Cinematic Vignette & Briefing Card */}
        <div className="flex flex-col space-y-4 lg:col-span-6">
          <div className="border border-rule-hair bg-cream p-2">
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

          {/* Context Card & Deep Briefing Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 border border-rule-hair bg-cream p-4 font-mono text-xs">
            <div className="max-w-md">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-wider text-mark font-semibold">
                  {activeSpecialist.category} SPECIALIZATION // {activeSpecialist.parentHub} NODE
                </span>
              </div>
              <span className="text-deepink/75 text-[11px] leading-relaxed block mt-1">
                {activeSpecialist.vignetteStory}
              </span>
            </div>
            <Link
              href={`/solutions/${activeSpecialist.slug}`}
              className="inline-flex items-center gap-1.5 border border-mark bg-mark px-4 py-2 font-mono text-[10.5px] font-semibold text-cream transition-colors hover:bg-deepink cursor-pointer"
            >
              <span>Full {activeSpecialist.name} Briefing</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
