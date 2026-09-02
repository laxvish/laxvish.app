"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function ExecutiveScene() {
  const [phase, setPhase] = useState<"streams" | "compressing" | "insight">("streams");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("compressing"), 1500);
    const t2 = setTimeout(() => setPhase("insight"), 3600);
    const t3 = setTimeout(() => setPhase("streams"), 7500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase]);

  return (
    <div className="relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-[#FAF8F5] p-8 text-charcoal sm:p-12">
      {/* Header */}
      <div className="flex items-center justify-between font-mono text-[11px] text-charcoal/40 uppercase tracking-widest border-b border-charcoal/10 pb-4">
        <span>Chapter 09 : Executive Intelligence</span>
        <span>
          {phase === "streams" && "Dozens of Independent Streams"}
          {phase === "compressing" && "The Thread Compresses Noise"}
          {phase === "insight" && "One Decision Remains"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "streams" && (
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-charcoal/60 max-w-lg">
            {["Sales Pipeline", "Cloud Capex", "Support CSAT", "HR Tenure", "Procurement POs", "Billing Churn", "GST ITC Claims", "API Latencies"].map(
              (stream, i) => (
                <motion.span
                  key={stream}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-full bg-white border border-charcoal/10 px-3 py-1 shadow-sm"
                >
                  {stream}
                </motion.span>
              )
            )}
          </div>
        )}

        {phase === "compressing" && (
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[10px] uppercase text-charcoal/40">
              DISCARDING UNNECESSARY NOISE • SYNTHESIZING COMPANY STATE
            </span>
            <div className="rounded-full bg-charcoal px-6 py-2.5 font-mono text-xs text-white font-medium shadow-md">
              Federating BigQuery + Stripe + CRM
            </div>
          </div>
        )}

        {phase === "insight" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-2xl border border-charcoal/15 bg-white p-8 shadow-xl text-center"
          >
            <span className="font-mono text-[10px] uppercase text-charcoal/40 tracking-wider">
              EXECUTIVE SIGNAL
            </span>
            <p className="mt-3 font-serif text-xl italic text-charcoal leading-relaxed">
              &ldquo;Revenue is accelerating (+14.2% YoY), but self-serve onboarding conversion is slowing at step 3.&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-3 font-mono text-[10px] text-charcoal/60">
              <span>ARR: ₹4.82 Cr</span>
              <span className="font-bold text-emerald-700">Bank Reconciled ✓</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-charcoal/10 pt-4 font-serif text-xs italic text-charcoal/60">
        Thousands of scattered facts become one clear decision. That is executive intelligence.
      </div>
    </div>
  );
}
