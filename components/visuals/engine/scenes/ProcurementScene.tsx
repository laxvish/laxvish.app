"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function ProcurementScene() {
  const [phase, setPhase] = useState<"suppliers" | "benchmarking" | "po">("suppliers");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("benchmarking"), 1500);
    const t2 = setTimeout(() => setPhase("po"), 3600);
    const t3 = setTimeout(() => setPhase("suppliers"), 7500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase]);

  return (
    <div className="relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-[#F2EAE0] p-8 text-charcoal sm:p-12 border border-vaultAmber/20 ">
      {/* Header */}
      <div className="flex items-center justify-between font-mono text-[11px] text-vaultAmber uppercase tracking-[0.18em] border-b border-vaultAmber/15 pb-4">
        <span>Chapter 11 : Autonomous Procurement</span>
        <span className="text-charcoal/60">
          {phase === "suppliers" && "3 Authorized Suppliers Ingesting"}
          {phase === "benchmarking" && "The Thread Benchmarks Price & Terms"}
          {phase === "po" && "Purchase Order Solidified"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "suppliers" && (
          <div className="flex gap-4 font-mono text-xs">
            {["CompuAge Direct (₹31.4k)", "TechData India (₹33.9k)", "Redington Hub (₹32.0k)"].map(
              (supp, idx) => (
                <motion.div
                  key={supp}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.9 }}
                  transition={{ delay: idx * 0.15 }}
                  className="rounded-xl border border-vaultAmber/20 bg-voidSurface p-4 text-center"
                >
                  <span className="text-[10px] text-vaultAmber/70 uppercase">Supplier #{idx + 1}</span>
                  <p className="font-bold mt-1 text-neonCyan">{supp}</p>
                </motion.div>
              )
            )}
          </div>
        )}

        {phase === "benchmarking" && (
          <div className="flex flex-col items-center gap-3 font-mono text-xs">
            <span className="text-[10px] text-vaultAmber/60 uppercase tracking-wider">
              EVALUATING PRICE + DELIVERY SLA + HISTORICAL RELIABILITY
            </span>
            <div className="rounded-full bg-voidSurface border border-vaultAmber/30 px-6 py-2 text-charcoal font-semibold ">
              CompuAge Direct wins on Total Value Score (Saved ₹1,00,000)
            </div>
          </div>
        )}

        {phase === "po" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-none border border-mark bg-voidSurface p-6 text-left font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-vaultAmber/15 pb-3 text-[10px] text-vaultAmber uppercase">
              <span>PURCHASE ORDER DISPATCHED</span>
              <span className="font-bold text-neonCyan">PO #PO-8819 ✓</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal/50">Awarded Supplier:</span>
                <span className="font-bold text-charcoal">CompuAge Direct</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Unit Price / Quantity:</span>
                <span className="font-semibold text-charcoal">₹31,400 (40 Units)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Net Savings:</span>
                <span className="font-bold text-vaultAmber">₹1,00,000 Saved vs List</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-vaultAmber/15 pt-4 font-mono text-xs text-charcoal/60">
        The procurement workflow chooses itself through evidence, without manual quote juggling.
      </div>
    </div>
  );
}
