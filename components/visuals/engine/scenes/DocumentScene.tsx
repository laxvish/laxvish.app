"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function DocumentScene() {
  const [phase, setPhase] = useState<"floating" | "extracting" | "structured">("floating");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("extracting"), 1500);
    const t2 = setTimeout(() => setPhase("structured"), 3800);
    const t3 = setTimeout(() => setPhase("floating"), 7500);
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
        <span>Chapter 03 : Document Processing Engine</span>
        <span>
          {phase === "floating" && "Documents Ingesting"}
          {phase === "extracting" && "Semantic Particles Detaching"}
          {phase === "structured" && "Document Understood"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "floating" && (
          <div className="relative flex h-36 w-full max-w-sm items-center justify-center">
            {[-12, 0, 14].map((rotate, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.9, rotate }}
                className="absolute h-32 w-24 rounded-lg border border-charcoal/20 bg-white p-3 shadow-md"
              >
                <div className="h-1.5 w-10 bg-charcoal/20 rounded" />
                <div className="mt-2 h-1 w-16 bg-charcoal/10 rounded" />
                <div className="mt-1 h-1 w-12 bg-charcoal/10 rounded" />
                <div className="mt-6 font-mono text-[8px] text-charcoal/40">INV-{idx + 104}</div>
              </motion.div>
            ))}
          </div>
        )}

        {phase === "extracting" && (
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            {["Vendor: Horizon Tech", "GSTIN: 27AAACH...", "Line Items: 10x NVMe", "Total: ₹1,46,320.00", "PO Match: #PO-4401"].map(
              (token, idx) => (
                <motion.div
                  key={token}
                  initial={{ y: 20, opacity: 0, scale: 0.8 }}
                  animate={{ y: [20, -5, 0], opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.12 }}
                  className="rounded-lg border border-charcoal/15 bg-white px-3.5 py-2 text-charcoal shadow-sm"
                >
                  {token}
                </motion.div>
              )
            )}
          </div>
        )}

        {phase === "structured" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl text-left"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3 font-mono text-[10px] text-charcoal/40 uppercase">
              <span>DOCUMENT UNDERSTOOD</span>
              <span className="font-bold text-emerald-700">3-WAY MATCH VERIFIED ✓</span>
            </div>
            <div className="mt-4 space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal/50">Vendor:</span>
                <span className="font-semibold text-charcoal">Horizon Tech Supplies</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Amount:</span>
                <span className="font-bold text-charcoal">₹1,46,320.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">ITC Tax Credit:</span>
                <span className="font-semibold text-emerald-700">₹22,320.00 Claimable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">ERP Target:</span>
                <span className="font-semibold text-charcoal">SAP S/4HANA (Batch Queued)</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-charcoal/10 pt-4 font-serif text-xs italic text-charcoal/60">
        Don&rsquo;t merely extract text. Animate the understanding of real business commitments.
      </div>
    </div>
  );
}
