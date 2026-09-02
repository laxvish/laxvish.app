"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function ReportingAnalyticsScene() {
  const [phase, setPhase] = useState<"noise" | "patterns" | "insights">("noise");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("patterns"), 1500);
    const t2 = setTimeout(() => setPhase("insights"), 3600);
    const t3 = setTimeout(() => setPhase("noise"), 7500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase]);

  return (
    <div className="relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-[#F2EAE0] p-8 text-charcoal sm:p-12 border border-vaultAmber/20 ">
      {/* Header */}
      <div className="flex items-center justify-between font-mono text-[11px] text-vaultAmber uppercase tracking-widest border-b border-vaultAmber/15 pb-4">
        <span>Chapter 13 : Narrative Analytics</span>
        <span className="text-charcoal/60">
          {phase === "noise" && "420,000 Unorganized Data Points"}
          {phase === "patterns" && "The Thread Sweeping into Patterns"}
          {phase === "insights" && "3 Essential Insights Remain"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "noise" && (
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-charcoal/40 max-w-md">
            {["142", "382", "7.2%", "₹9,48,200", "19", "4.7%", "82", "118.4%", "₹2,140", "0.98", "420k", "14ms"].map(
              (num, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-1 text-vaultAmber/40"
                >
                  {num}
                </motion.span>
              )
            )}
          </div>
        )}

        {phase === "patterns" && (
          <div className="flex flex-col items-center gap-3 font-mono text-xs">
            <span className="text-[10px] text-vaultAmber/60 uppercase tracking-wider">
              EXTRACTING MATHEMATICAL CORRELATIONS & GAAP DRIFT
            </span>
            <div className="flex flex-wrap gap-2.5 justify-center">
              <div className="rounded-full bg-voidSurface border border-vaultAmber/30 px-4 py-1.5 text-charcoal">Revenue: +14.2%</div>
              <div className="rounded-full bg-voidSurface border border-vaultAmber/30 px-4 py-1.5 text-charcoal">CAC: ₹2,140 (-12%)</div>
              <div className="rounded-full bg-voidSurface border border-vaultAmber/30 px-4 py-1.5 text-charcoal">Conversion: 8.4%</div>
            </div>
          </div>
        )}

        {phase === "insights" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-none border border-mark bg-voidSurface p-6 text-left font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-vaultAmber/15 pb-3 text-[10px] text-vaultAmber uppercase">
              <span>WEEKLY EXECUTIVE BRIEF</span>
              <span className="font-bold text-neonCyan">Delivered Mon 8:01 AM</span>
            </div>
            <div className="mt-4 space-y-2 text-charcoal/90">
              <p>1. Revenue rose 14.2% WoW driven by enterprise expansions.</p>
              <p>2. Blended CAC fell to ₹2,140 with organic referral strength.</p>
              <p>3. Zero mathematical variance across GAAP ledger sheets.</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-vaultAmber/15 pt-4 font-mono text-xs text-charcoal/60">
        The system doesn&rsquo;t stop at &ldquo;here is a dashboard.&rdquo; It ends with &ldquo;now you know what matters.&rdquo;
      </div>
    </div>
  );
}
