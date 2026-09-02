"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function SalesScene() {
  const [phase, setPhase] = useState<"incoming" | "understanding" | "resolved">("incoming");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("understanding"), 1200);
    const t2 = setTimeout(() => setPhase("resolved"), 3400);
    const t3 = setTimeout(() => setPhase("incoming"), 7000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase]);

  return (
    <div className="relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-[#FAF8F5] p-8 text-charcoal sm:p-12">
      {/* Scene Header */}
      <div className="flex items-center justify-between font-mono text-[11px] text-charcoal/40 uppercase tracking-widest border-b border-charcoal/10 pb-4">
        <span>Chapter 01 : Sales & Lead Engine</span>
        <span>
          {phase === "incoming" && "Voice Stream Arriving"}
          {phase === "understanding" && "The Thread Separates Meaning"}
          {phase === "resolved" && "Opportunity Materialized"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "incoming" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-charcoal text-white shadow-md">
              <span className="font-mono text-xs">CALL</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            </div>
            <p className="font-serif text-lg italic text-charcoal/80">
              &ldquo;Need to automate dispatch routing and fuel reconciliation for 120 fleet trucks before Q3...&rdquo;
            </p>
            {/* Incoming waveform line */}
            <svg viewBox="0 0 300 40" className="h-8 w-64 overflow-visible">
              <motion.path
                d="M 0,20 Q 30,5 60,20 T 120,20 T 180,20 T 240,20 T 300,20"
                stroke="#111111"
                strokeWidth="1.5"
                fill="none"
                animate={{
                  d: [
                    "M 0,20 Q 30,5 60,20 T 120,20 T 180,20 T 240,20 T 300,20",
                    "M 0,20 Q 30,35 60,20 T 120,20 T 180,20 T 240,20 T 300,20",
                    "M 0,20 Q 30,5 60,20 T 120,20 T 180,20 T 240,20 T 300,20",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        )}

        {phase === "understanding" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {["NEED: Fleet Automation", "BUDGET: ₹18L ARR", "TIMELINE: Before Q3 Close", "INTENT: 96.4% Tier-1"].map(
              (concept, idx) => (
                <motion.div
                  key={concept}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.15 }}
                  className="rounded-full border border-charcoal/20 bg-white px-5 py-2.5 font-mono text-xs font-medium text-charcoal shadow-sm"
                >
                  {concept}
                </motion.div>
              )
            )}
          </motion.div>
        )}

        {phase === "resolved" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl text-left"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3 font-mono text-[10px] text-charcoal/40 uppercase">
              <span>Apex Freight Express • Lead Profile</span>
              <span className="font-bold text-emerald-700">Ready for Sales</span>
            </div>
            <div className="mt-4 space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal/50">Opportunity:</span>
                <span className="font-semibold text-charcoal">120 Vehicle Workflow System</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Confirmed Demo:</span>
                <span className="font-bold text-charcoal">Thursday, 3:30 PM IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Assigned Solutions Rep:</span>
                <span className="font-semibold text-charcoal">Rohan Sharma</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-charcoal/10 pt-4 font-serif text-xs italic text-charcoal/60">
        The phone call wasn&rsquo;t merely answered. A conversation quietly became an enterprise opportunity.
      </div>
    </div>
  );
}
