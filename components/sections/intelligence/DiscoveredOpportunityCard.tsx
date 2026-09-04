"use client";

import React from "react";
import Link from "next/link";
import { ProblemHypothesis, SolutionCandidate } from "@/lib/context/types";
import { BOOK_NOW_BUTTON_CLASS, SECONDARY_HERO_CTA_CLASS } from "@/lib/site-navigation";

interface DiscoveredOpportunityCardProps {
  hypothesis?: ProblemHypothesis;
  solution?: SolutionCandidate;
}

export function DiscoveredOpportunityCard({
  hypothesis,
  solution,
}: DiscoveredOpportunityCardProps) {
  if (!hypothesis && !solution) return null;

  return (
    <div className="border border-charcoal/20 bg-obsidian p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-charcoal" />
          <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-neonCyan">
            DISCOVERED AI LEVERAGE BLUEPRINT
          </span>
        </div>
        {hypothesis && (
          <span className="text-[10px] font-mono text-charcoal font-semibold px-2 py-0.5 border border-charcoal/20 bg-vaultAmber">
            CONFIDENCE: {(hypothesis.confidence * 100).toFixed(0)}%
          </span>
        )}
      </div>

      <div>
        <h4 className="text-base sm:text-lg font-space-grotesk font-medium text-charcoal">
          {solution?.title || hypothesis?.title || "Enterprise Autonomous Workflow Opportunity"}
        </h4>
        <p className="mt-1 text-xs font-inter text-neonCyan leading-relaxed">
          {solution?.capabilitySummary ||
            "Deterministic orchestration across enterprise data, voice channels, and decision trees with cryptographic audit proofs."}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link
          href={solution?.ctaHref || "/contact"}
          className={BOOK_NOW_BUTTON_CLASS}
        >
          {solution?.ctaText || "Deploy Working Session"}
        </Link>
        <Link
          href="/solutions"
          className={SECONDARY_HERO_CTA_CLASS}
        >
          View Solution Catalog
        </Link>
      </div>
    </div>
  );
}
