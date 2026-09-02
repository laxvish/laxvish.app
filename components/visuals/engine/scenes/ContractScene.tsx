"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function ContractScene() {
  const [phase, setPhase] = useState<"landscape" | "revealing" | "structured">("landscape");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("revealing"), 1500);
    const t2 = setTimeout(() => setPhase("structured"), 3800);
    const t3 = setTimeout(() => setPhase("landscape"), 7500);
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
        <span>Chapter 07 : Contract Intelligence</span>
        <span className="text-charcoal/60">
          {phase === "landscape" && "34-Page MSA Landscape"}
          {phase === "revealing" && "Hidden Structure Rising"}
          {phase === "structured" && "Contract Distilled"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "landscape" && (
          <div className="flex w-full max-w-md flex-col gap-2 opacity-60">
            <div className="h-1.5 w-full bg-vaultAmber/30 rounded" />
            <div className="h-1.5 w-5/6 bg-vaultAmber/20 rounded" />
            <div className="h-1.5 w-4/6 bg-vaultAmber/15 rounded" />
            <div className="h-1.5 w-full bg-vaultAmber/30 rounded" />
            <p className="mt-2 text-center font-mono text-[10px] text-vaultAmber/60">
              34-PAGE MASTER SERVICES AGREEMENT
            </p>
          </div>
        )}

        {phase === "revealing" && (
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            {["OBLIGATION: Net 30 Payment", "RISK: Unlimited Liability (Clause 14.1)", "TERM: 2-Year Auto-Renewal", "INDEMNITY: Capped 12x Fees"].map(
              (clause, idx) => (
                <motion.div
                  key={clause}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.15 }}
                  className={`rounded-xl border px-4 py-2.5 shadow-md font-medium ${
                    clause.includes("RISK")
                      ? "border-[#A8583E]/60 bg-[#1A0E0A] text-charcoal"
                      : "border-vaultAmber/30 bg-voidSurface text-charcoal"
                  }`}
                >
                  {clause}
                </motion.div>
              )
            )}
          </div>
        )}

        {phase === "structured" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-vaultAmber/30 bg-voidSurface p-6 shadow-xl text-left"
          >
            <div className="flex items-center justify-between border-b border-vaultAmber/15 pb-3 font-mono text-[10px] text-vaultAmber uppercase">
              <span>CONTRACT DISTILLED</span>
              <span className="font-bold text-neonCyan">1-Click Legal Sign-off</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="rounded-xl bg-voidSurface border border-vaultAmber/20 p-3">
                <span className="text-[10px] text-charcoal/50">OBLIGATIONS</span>
                <p className="font-bold text-base text-charcoal mt-1">12 Identified</p>
              </div>
              <div className="rounded-xl bg-voidSurface border border-vaultAmber/20 p-3">
                <span className="text-[10px] text-charcoal/50">KEY TERMS</span>
                <p className="font-bold text-base text-charcoal mt-1">4 Verified</p>
              </div>
              <div className="rounded-xl bg-[#1A0E0A] border border-[#A8583E]/40 p-3 text-charcoal">
                <span className="text-[10px] text-[#C46B4E] uppercase">RISK FLAGS</span>
                <p className="font-bold text-base mt-1 text-[#E08A6F]">1 Auto-Redlined</p>
              </div>
              <div className="rounded-xl bg-voidSurface border border-vaultAmber/20 p-3 text-charcoal">
                <span className="text-[10px] uppercase text-vaultAmber">JURISDICTION</span>
                <p className="font-bold text-base mt-1 text-neonCyan">Mumbai Courts ✓</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-vaultAmber/15 pt-4 font-serif text-xs italic text-charcoal/60">
        Laxvish sees what is buried inside the work and exposes the underlying commitments.
      </div>
    </div>
  );
}
