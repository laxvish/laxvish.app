"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function SupportScene() {
  const [phase, setPhase] = useState<"chaos" | "connecting" | "clarity">("chaos");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("connecting"), 1400);
    const t2 = setTimeout(() => setPhase("clarity"), 3600);
    const t3 = setTimeout(() => setPhase("chaos"), 7500);
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
        <span>Chapter 02 : Customer Support Engine</span>
        <span>
          {phase === "chaos" && "Messages Accumulating"}
          {phase === "connecting" && "The Thread Traces Root Cause"}
          {phase === "clarity" && "Chaos Becomes Clarity"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "chaos" && (
          <div className="flex w-full max-w-md flex-col gap-2 text-left text-xs font-mono">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border border-charcoal/10 bg-white p-3 shadow-sm text-charcoal/80"
            >
              &ldquo;I can&rsquo;t log in to my dashboard since 9am.&rdquo;
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-charcoal/10 bg-white p-3 shadow-sm text-charcoal/80"
            >
              &ldquo;I&rsquo;ve tried password reset twice already, no email received.&rdquo;
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-xl border border-charcoal/10 bg-white p-3 shadow-sm text-charcoal/80"
            >
              &ldquo;Need urgent access for board meeting in 15 mins.&rdquo;
            </motion.div>
          </div>
        )}

        {phase === "connecting" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs"
          >
            {["IDENTITY: rajiv@apex.com", "AUTH: SSO Token Expired", "ACCESS: Auto-Refresh Role"].map(
              (concept, idx) => (
                <motion.div
                  key={concept}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.2 }}
                  className="rounded-full border border-charcoal/20 bg-charcoal px-5 py-2 text-white font-medium shadow-md"
                >
                  {concept}
                </motion.div>
              )
            )}
          </motion.div>
        )}

        {phase === "clarity" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl text-left"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3 font-mono text-[10px] text-charcoal/40 uppercase">
              <span>Resolution Stream</span>
              <span className="font-bold text-emerald-700">1.2s • Zero Human Escalation</span>
            </div>
            <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal">
              &ldquo;We identified the SSO session timeout and refreshed your enterprise clearance. A direct one-click login link has been sent to your primary mobile.&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-charcoal/10 pt-3 font-mono text-[10px] text-charcoal/60">
              <span>Customer Status: Satisfied</span>
              <span className="font-bold text-charcoal">Resolved ✓</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-charcoal/10 pt-4 font-serif text-xs italic text-charcoal/60">
        The system doesn&rsquo;t merely generate text. It isolates the core issue and quietly restores order.
      </div>
    </div>
  );
}
