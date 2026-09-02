"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function MarketingScene() {
  const [phase, setPhase] = useState<"fragments" | "linking" | "ready">("fragments");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("linking"), 1500);
    const t2 = setTimeout(() => setPhase("ready"), 3600);
    const t3 = setTimeout(() => setPhase("fragments"), 7500);
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
        <span>Chapter 10 : Marketing Operations</span>
        <span className="text-charcoal/60">
          {phase === "fragments" && "Isolated Campaign Fragments"}
          {phase === "linking" && "The Thread Drawing Relationships"}
          {phase === "ready" && "Campaign Ready"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "fragments" && (
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            {["Audience: 4,850 CROs", "Creative: DPDP Brief", "Channel: WhatsApp + Email", "Timing: Tuesday 9:00 AM"].map(
              (frag, idx) => (
                <motion.div
                  key={frag}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.9 }}
                  transition={{ delay: idx * 0.12 }}
                  className="rounded-xl border border-vaultAmber/20 bg-voidSurface px-4 py-2.5 shadow-md text-charcoal"
                >
                  {frag}
                </motion.div>
              )
            )}
          </div>
        )}

        {phase === "linking" && (
          <div className="flex flex-col items-center gap-3 font-mono text-xs">
            <span className="text-[10px] text-vaultAmber/60 uppercase tracking-wider">
              AUDIENCE → MESSAGE → CREATIVE → CHANNEL → TIMING
            </span>
            <div className="rounded-full bg-voidSurface border border-vaultAmber/30 px-6 py-2 text-charcoal font-semibold shadow-lg">
              Synthesizing Multi-Channel Dispatch Logic
            </div>
          </div>
        )}

        {phase === "ready" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-vaultAmber/30 bg-gradient-to-b from-[#14151B] to-[#08080B] p-6 shadow-xl text-left font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-vaultAmber/15 pb-3 text-[10px] text-vaultAmber uppercase">
              <span>CAMPAIGN READY</span>
              <span className="font-bold text-neonCyan">46.8% Open Rate Projected</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal/50">Target Accounts:</span>
                <span className="font-semibold text-charcoal">4,812 Verified Leads</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Attributed Pipeline:</span>
                <span className="font-bold text-vaultAmber">₹42.0L ARR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Lead Sync:</span>
                <span className="font-semibold text-neonCyan">HubSpot Live Stream ✓</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-vaultAmber/15 pt-4 font-serif text-xs italic text-charcoal/60">
        Marketing shouldn&rsquo;t look like design templates. Strategy seamlessly becomes execution.
      </div>
    </div>
  );
}
