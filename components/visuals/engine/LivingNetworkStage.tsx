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

export interface NetworkNode {
  id: string;
  slug: string;
  name: string;
  role: string;
  category: string;
  oneLiner: string;
  vignetteStory: string;
  x: number; // percentage in network coordinate plane
  y: number;
}

const NETWORK_NODES: NetworkNode[] = [
  {
    id: "executive",
    slug: "executive-intelligence",
    name: "Executive Intelligence",
    role: "Multi-Signal Radar",
    category: "Leadership",
    oneLiner: "Hundreds of sales, churn, and cashflow signals compressed into 1 clear insight.",
    vignetteStory: "The Thread scans daily business noise across CRM, ERP, and HRIS, eliminating vanity metrics to formulate an executive morning brief.",
    x: 50,
    y: 12,
  },
  {
    id: "finance",
    slug: "finance-ap",
    name: "Finance & Accounts Payable",
    role: "Ledger Reconciliation",
    category: "Finance",
    oneLiner: "Invoices extracted, validated against GST ITC, and set payment-ready.",
    vignetteStory: "The Thread visits incoming bills, matches line items to POs, verifies tax math, and prepares batch payouts in Tally / SAP.",
    x: 18,
    y: 35,
  },
  {
    id: "marketing",
    slug: "marketing-operations",
    name: "Marketing Operations",
    role: "Campaign Orchestration",
    category: "Growth",
    oneLiner: "Audience intent identified, personalized copy created, multi-channel rollout executed.",
    vignetteStory: "The Thread synchronizes ad accounts, synthesizes content tailored to ICP segments, and tracks attribution across channels.",
    x: 82,
    y: 35,
  },
  {
    id: "procurement",
    slug: "procurement",
    name: "Procurement & Vendor Engine",
    role: "Supplier Matching",
    category: "Operations",
    oneLiner: "Multiple vendor bids compared on price, delivery SLA, and compliance.",
    vignetteStory: "The Thread evaluates competing vendor proposals, extracts hidden delivery fees, selects the optimal bid, and issues the PO.",
    x: 20,
    y: 65,
  },
  {
    id: "hr",
    slug: "hr-operations",
    name: "People & HR Operations",
    role: "Lifecycle Management",
    category: "People",
    oneLiner: "Employee queries answered, leave approved, policy verified with zero wait.",
    vignetteStory: "The Thread checks handbook policies, reviews remaining employee leave balances, and logs approved requests directly in HRMS.",
    x: 80,
    y: 65,
  },
  {
    id: "contract",
    slug: "contract-automation",
    name: "Contract Risk Analyzer",
    role: "Clause Intelligence",
    category: "Legal",
    oneLiner: "Multi-page agreements scanned for hidden liability, indemnity, and SLA risks.",
    vignetteStory: "The Thread isolates non-standard indemnities and uncapped liabilities, scoring contract risk before legal sign-off.",
    x: 28,
    y: 88,
  },
  {
    id: "it",
    slug: "it-helpdesk",
    name: "IT Helpdesk & Access Terminal",
    role: "Diagnostic & Repair",
    category: "Security",
    oneLiner: "Broken endpoints diagnosed, VPN tokens renewed, systems restored in seconds.",
    vignetteStory: "The Thread intercepts outage alerts, isolates failing API endpoints, executes automated cache purges, and restores access.",
    x: 50,
    y: 78,
  },
  {
    id: "analytics",
    slug: "reporting-analytics",
    name: "Narrative Analytics Studio",
    role: "WBR Synthesis",
    category: "Intelligence",
    oneLiner: "Raw tabular database rows synthesized into structured narrative management reports.",
    vignetteStory: "The Thread detects hidden cohort retention anomalies in SQL tables and drafts a crisp 3-point Weekly Business Review.",
    x: 72,
    y: 88,
  },
];

export function LivingNetworkStage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("executive");

  const activeNode = NETWORK_NODES.find((n) => n.id === selectedNodeId) || NETWORK_NODES[0];

  const renderActiveVignette = () => {
    switch (activeNode.id) {
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
    <div className="relative mx-auto w-full overflow-hidden rounded-[2.5rem] bg-charcoal/5 p-2 ring-1 ring-charcoal/10 shadow-2xl">
      <div className="relative flex flex-col justify-between overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-[#FAF8F5] p-6 text-charcoal sm:p-10">
        {/* Background Network Mesh */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#111111_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.05]" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col justify-between gap-4 border-b border-charcoal/10 pb-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neonCyan">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Extended Intelligence Network</span>
            </div>
            <h3 className="mt-2 text-2xl font-normal tracking-tight text-charcoal sm:text-3xl">
              The Thread expands across every enterprise department
            </h3>
            <p className="mt-1 text-xs text-charcoal/70 sm:text-sm font-mono">
              Click any specialized node below to inspect its live cinematic vignette.
            </p>
          </div>

          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-charcoal underline underline-offset-4 hover:text-neonCyan transition-colors cursor-pointer"
          >
            <span>Explore all 13 business solutions</span>
            <span>→</span>
          </Link>
        </div>

        {/* Interactive Layout: Left is the Living Network Map / Right is the Active Vignette */}
        <div className="relative z-10 mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left / Top: Interactive Living Network Diagram */}
          <div className="relative flex min-h-[380px] w-full flex-col justify-between rounded-2xl border border-charcoal/15 bg-white p-6 shadow-sm lg:col-span-6">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3 font-mono text-[10px] text-charcoal/40 uppercase">
              <span>LIVING NEURAL MAP</span>
              <span>SELECT NODE TO TRAVEL</span>
            </div>

            {/* SVG Connecting Thread Lines */}
            <div className="relative my-4 flex h-[280px] w-full items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible pointer-events-none">
                {/* Central Nexus Lines radiating from center (50, 50) */}
                {NETWORK_NODES.map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  return (
                    <motion.line
                      key={`line-${node.id}`}
                      x1="50"
                      y1="50"
                      x2={node.x}
                      y2={node.y}
                      stroke={isSelected ? "#111111" : "#111111"}
                      strokeOpacity={isSelected ? 0.8 : 0.15}
                      strokeWidth={isSelected ? "1.75" : "0.75"}
                      strokeDasharray={isSelected ? "none" : "2 2"}
                    />
                  );
                })}

                {/* Pulsing Central Hub */}
                <circle cx="50" cy="50" r="4" fill="#111111" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="9"
                  stroke="#111111"
                  strokeWidth="0.75"
                  fill="none"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                />
              </svg>

              {/* Central Core Label */}
              <div className="absolute top-[46%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-charcoal/30 bg-[#FAF8F5] px-2.5 py-0.5 font-mono text-[8px] font-bold text-charcoal shadow-xs pointer-events-none">
                LAXVISH BRAIN
              </div>

              {/* Node Buttons positioned absolutely */}
              {NETWORK_NODES.map((node) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                    }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-xl p-2 font-mono text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-2 border-charcoal bg-charcoal text-white shadow-lg scale-110 z-20"
                        : "border border-charcoal/20 bg-white text-charcoal shadow-xs hover:border-charcoal hover:bg-vaultAmber/30 hover:scale-105 z-10"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isSelected ? "bg-emerald-400" : "bg-charcoal/40 group-hover:bg-charcoal"
                        }`}
                      />
                      <span className="text-[10px] font-bold tracking-tight whitespace-nowrap">
                        {node.name.split(" ")[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Node Quick Summary Info */}
            <div className="border-t border-charcoal/10 pt-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-charcoal/50">Selected Specialist:</span>
                <span className="font-bold text-charcoal">{activeNode.name}</span>
              </div>
              <p className="mt-1 text-[11px] text-charcoal/70 italic font-serif">
                &ldquo;{activeNode.oneLiner}&rdquo;
              </p>
            </div>
          </div>

          {/* Right / Bottom: Active Specialist Vignette */}
          <div className="flex flex-col space-y-4 lg:col-span-6">
            <div className="rounded-2xl border border-charcoal/15 bg-white p-2 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                >
                  {renderActiveVignette()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Context & Link to full dedicated page */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-charcoal/10 bg-[#FAF8F5] p-4 font-mono text-xs">
              <div>
                <span className="block text-[10px] uppercase text-charcoal/40 font-bold">
                  {activeNode.category} Specialization
                </span>
                <span className="text-charcoal/80 text-[11px]">
                  {activeNode.vignetteStory}
                </span>
              </div>
              <Link
                href={`/solutions/${activeNode.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-charcoal bg-charcoal px-3.5 py-1.5 font-mono text-[11px] font-semibold text-white hover:bg-charcoal/80 transition-colors shadow-xs"
              >
                <span>Full {activeNode.name} Briefing</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
