"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLaxvishContext } from "@/lib/laxvish-context/client";
import type { PredictedSolutionOpportunity } from "@/lib/context/types";

const ROTATION_INTERVAL_MS = 6000;
const TRANSITION_DURATION = 0.45;

export function PersonalizedIntelligenceSection() {
  const {
    predictedSolutions,
    activeSolutionIndex,
    setActiveSolutionIndex,
    contextGraph,
  } = useLaxvishContext();

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showRationale, setShowRationale] = useState<boolean>(false);

  const prefersReducedMotion = Boolean(
    contextGraph?.technical?.prefersReducedMotion ||
      (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)
  );

  const solutions: PredictedSolutionOpportunity[] = useMemo(() => {
    if (Array.isArray(predictedSolutions) && predictedSolutions.length >= 5) {
      return predictedSolutions.slice(0, 5);
    }
    return [
      {
        id: "ai_operations_automation",
        rank: 1,
        title: "AI for Operations",
        category: "operations",
        headline: "Autonomous Cross-System Enterprise Workflows",
        description: "We can turn repetitive business processes into autonomous AI workflows that operate safely across your existing software systems.",
        rationale: "Designed for multi-department enterprises with legacy databases and modern cloud ERPs.",
        targetIndustries: ["Manufacturing", "IT Services", "Logistics"],
        targetRoles: ["COO", "VP Operations"],
        problemDomains: ["Cross-Tool Data Sync", "Manual Status Updates"],
        laxvishCapabilities: ["Workers", "Brain", "Brakes"],
        ctaText: "Explore Operations AI",
        ctaHref: "/workers",
        confidence: 0.92,
      },
      {
        id: "ai_sales_telephony_agent",
        rank: 2,
        title: "AI for Sales",
        category: "sales",
        headline: "Autonomous Voice Qualification & Inbound Triage",
        description: "We can build AI agents that qualify leads, handle customer conversations in natural Indian languages, and keep your sales pipeline moving.",
        rationale: "Optimized for fast-moving sales teams and high-volume inbound pipelines.",
        targetIndustries: ["B2B SaaS", "Real Estate", "Insurance"],
        targetRoles: ["VP Sales", "Chief Commercial Officer"],
        problemDomains: ["Lead Response Time", "Inbound Call Qualification"],
        laxvishCapabilities: ["Telephony", "Workers", "Brain"],
        ctaText: "Explore Sales AI",
        ctaHref: "/callme",
        confidence: 0.88,
      },
      {
        id: "ai_document_intelligence",
        rank: 3,
        title: "AI for Documents",
        category: "document",
        headline: "Deterministic Extraction for Invoices, Contracts & Records",
        description: "We can extract, validate, and verify unstructured enterprise documents with zero hallucination risk and cryptographic audit trails.",
        rationale: "Built for paperwork-heavy compliance, legal, and operational environments.",
        targetIndustries: ["Banking", "Insurance", "Logistics"],
        targetRoles: ["Head of Shared Services", "Compliance Lead"],
        problemDomains: ["Manual Data Entry", "KYC Verification"],
        laxvishCapabilities: ["Brain", "Brakes"],
        ctaText: "Explore Document AI",
        ctaHref: "/brain",
        confidence: 0.84,
      },
      {
        id: "ai_finance_platform",
        rank: 4,
        title: "AI for Finance",
        category: "finance",
        headline: "Autonomous Invoicing, Reconciliation & Cash Flow Intelligence",
        description: "We can help you scale your finance operations with AI — from repetitive reconciliations to instant decision-support.",
        rationale: "Tailored for high-volume enterprise financial operations and commercial corridors.",
        targetIndustries: ["Banking", "Fintech", "Corporate"],
        targetRoles: ["CFO", "Finance Controller"],
        problemDomains: ["Invoice Reconciliation", "Ledger Auditing"],
        laxvishCapabilities: ["Workers", "Brain", "Brakes"],
        ctaText: "Explore Finance AI",
        ctaHref: "/workers",
        confidence: 0.80,
      },
      {
        id: "ai_enterprise_brain",
        rank: 5,
        title: "AI for Enterprise Knowledge",
        category: "knowledge",
        headline: "Unified Semantic Memory & Internal AI Copilots",
        description: "We can connect your company's distributed documents, communications, and databases into a single searchable thinking backbone.",
        rationale: "Created for organizations seeking to eliminate internal knowledge silos.",
        targetIndustries: ["Enterprises", "Consulting", "Engineering"],
        targetRoles: ["CTO", "CIO"],
        problemDomains: ["Internal Silos", "Information Retrieval Delays"],
        laxvishCapabilities: ["Brain", "Workers"],
        ctaText: "Explore Enterprise Brain",
        ctaHref: "/brain",
        confidence: 0.76,
      },
    ];
  }, [predictedSolutions]);

  const activeIndex = Math.min(Math.max(0, activeSolutionIndex), solutions.length - 1);
  const currentSolution = solutions[activeIndex] || solutions[0];

  // Auto-advance loop when not paused and not reduced-motion
  useEffect(() => {
    if (isPaused || prefersReducedMotion || solutions.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActiveSolutionIndex((activeIndex + 1) % solutions.length);
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused, prefersReducedMotion, setActiveSolutionIndex, solutions.length]);

  return (
    <section
      id="intelligence"
      aria-label="Personalized AI Opportunities"
      className="w-full bg-obsidian border-b border-charcoal/20 py-16 sm:py-24 lg:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="border border-charcoal/20 bg-obsidian p-6 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[560px]">
          {/* Top Bar: Section Title + Interactive 5 Opportunity Selectors */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-charcoal/10">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 bg-charcoal" />
              <span className="text-xs font-mono tracking-[0.2em] text-neonCyan uppercase">
                WHAT LAXVISH CAN BUILD FOR YOU // 0{activeIndex + 1} OF 0{solutions.length}
              </span>
            </div>

            {/* 5 Solution Navigation Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2" role="tablist" aria-label="Predicted AI Solutions">
              {solutions.map((sol, index) => {
                const isCurrent = index === activeIndex;
                const shortLabel = sol.title.replace(/^AI for\s+/i, "");
                return (
                  <button
                    key={sol.id || index}
                    role="tab"
                    aria-selected={isCurrent}
                    type="button"
                    onClick={() => {
                      setActiveSolutionIndex(index);
                      setIsPaused(true);
                    }}
                    className={`px-3 py-1 text-[11px] font-mono tracking-[0.1em] uppercase transition-all border cursor-pointer ${
                      isCurrent
                        ? "bg-charcoal text-obsidian border-charcoal font-semibold shadow-sm"
                        : "bg-obsidian text-neonCyan border-charcoal/20 hover:border-charcoal/50 hover:text-charcoal hover:bg-vaultAmber"
                    }`}
                  >
                    0{index + 1} {shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Display: Active Solution Details */}
          <div className="py-8 sm:py-12 my-auto max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSolution.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: prefersReducedMotion ? 0 : TRANSITION_DURATION, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Category & Headline */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-[0.18em] text-neonCyan">
                    // PREDICTED SOLUTION
                  </span>
                  <span className="text-xs font-mono text-neonCyan/60">·</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-charcoal/80">
                    {currentSolution.headline}
                  </span>
                </div>

                {/* Primary Display Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-charcoal font-space-grotesk">
                  {currentSolution.title}
                </h2>

                {/* Main Editorial Copy */}
                <p className="text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed text-charcoal/90 font-space-grotesk max-w-3xl">
                  {currentSolution.description}
                </p>

                {/* Actions and Capabilities */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href={currentSolution.ctaHref || "/workers"}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-obsidian text-xs font-mono uppercase tracking-[0.15em] hover:bg-neonCyan transition-colors"
                  >
                    <span>{currentSolution.ctaText || "Explore Solution"}</span>
                    <span aria-hidden="true">→</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setShowRationale((prev) => !prev)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-charcoal/20 bg-obsidian text-charcoal text-xs font-mono uppercase tracking-[0.12em] hover:border-charcoal hover:bg-vaultAmber transition-colors cursor-pointer"
                  >
                    <span>{showRationale ? "Hide Context" : "Why This Matters"}</span>
                  </button>

                  {/* Capabilities Tags */}
                  {currentSolution.laxvishCapabilities && currentSolution.laxvishCapabilities.length > 0 && (
                    <div className="flex items-center gap-1.5 ml-auto text-[11px] font-mono text-neonCyan tracking-wider uppercase">
                      <span>BUILT WITH:</span>
                      <span className="text-charcoal font-semibold">
                        {currentSolution.laxvishCapabilities.join(" + ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Why This Matters Drawer (Customer-facing rationale only - Zero think leakage!) */}
                <AnimatePresence>
                  {showRationale && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden pt-2"
                    >
                      <div className="p-4 bg-vaultAmber/60 border border-charcoal/15 font-mono text-xs text-charcoal/90 leading-relaxed">
                        <span className="text-neonCyan uppercase tracking-wider block mb-1">
                          [ RELEVANCE SIGNAL ]
                        </span>
                        {currentSolution.rationale || "Synthesized from your operational workflow preferences and regional business ecosystem."}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Bar: Carousel Controls & Navigation Dots */}
          <div className="flex items-center justify-between pt-6 border-t border-charcoal/10 text-xs font-mono text-neonCyan">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveSolutionIndex((activeIndex - 1 + solutions.length) % solutions.length);
                  setIsPaused(true);
                }}
                aria-label="Previous opportunity"
                className="px-2.5 py-1 border border-charcoal/20 hover:border-charcoal hover:text-charcoal transition-colors cursor-pointer"
              >
                ← PREV
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveSolutionIndex((activeIndex + 1) % solutions.length);
                  setIsPaused(true);
                }}
                aria-label="Next opportunity"
                className="px-2.5 py-1 border border-charcoal/20 hover:border-charcoal hover:text-charcoal transition-colors cursor-pointer"
              >
                NEXT →
              </button>
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="px-2.5 py-1 border border-charcoal/20 hover:border-charcoal hover:text-charcoal transition-colors cursor-pointer uppercase"
              >
                {isPaused ? "▶ PLAY" : "❚❚ PAUSE"}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {solutions.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => {
                    setActiveSolutionIndex(dotIdx);
                    setIsPaused(true);
                  }}
                  aria-label={`Go to opportunity 0${dotIdx + 1}`}
                  className={`h-1.5 transition-all cursor-pointer ${
                    dotIdx === activeIndex ? "w-6 bg-charcoal" : "w-2 bg-charcoal/20 hover:bg-charcoal/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
