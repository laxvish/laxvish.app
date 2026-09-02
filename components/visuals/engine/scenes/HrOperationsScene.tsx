"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function HrOperationsScene() {
  const [phase, setPhase] = useState<"request" | "connecting" | "resolved">("request");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("connecting"), 1500);
    const t2 = setTimeout(() => setPhase("resolved"), 3600);
    const t3 = setTimeout(() => setPhase("request"), 7500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase]);

  return (
    <div className="relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-[#07080B] p-8 text-charcoal sm:p-12 border border-vaultAmber/20 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between font-mono text-[11px] text-vaultAmber uppercase tracking-widest border-b border-vaultAmber/15 pb-4">
        <span>Chapter 12 : People Operations & Lifecycle</span>
        <span className="text-charcoal/60">
          {phase === "request" && "Human Request Received"}
          {phase === "connecting" && "The Thread Connecting Policy & Context"}
          {phase === "resolved" && "Request Resolved in Minutes"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "request" && (
          <div className="flex flex-col items-center text-center font-serif text-lg italic text-charcoal/90">
            &ldquo;I need to understand the maternity leave policy and provision my upcoming handover schedule.&rdquo;
          </div>
        )}

        {phase === "connecting" && (
          <div className="flex flex-col items-center gap-3 font-mono text-xs">
            <span className="text-[10px] text-vaultAmber/60 uppercase tracking-wider">
              PERSON + POLICY + TENURE CONTEXT
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Priya Sharma (Senior Eng)", "+", "Maternity SOP 2026", "+", "26-Week Benefit"].map((token, i) => (
                <motion.span
                  key={token}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-full bg-voidSurface border border-vaultAmber/30 px-3.5 py-1.5 text-charcoal font-semibold shadow-md"
                >
                  {token}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {phase === "resolved" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-vaultAmber/30 bg-gradient-to-b from-[#14151B] to-[#08080B] p-6 shadow-xl text-left font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-vaultAmber/15 pb-3 text-[10px] text-vaultAmber uppercase">
              <span>REQUEST RESOLVED</span>
              <span className="font-bold text-neonCyan">HRMS Updated (4 mins)</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal/50">Policy Benefit:</span>
                <span className="font-bold text-charcoal">26 Weeks Fully Paid Leave</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Handover Workspace:</span>
                <span className="font-semibold text-charcoal">Created in Slack & Jira</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Compliance Log:</span>
                <span className="font-semibold text-neonCyan">DPDP & NSDL Verified ✓</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-vaultAmber/15 pt-4 font-serif text-xs italic text-charcoal/60">
        The company understands its people without forcing them through bureaucratic friction.
      </div>
    </div>
  );
}
