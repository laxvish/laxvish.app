"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function FinanceApScene() {
  const [phase, setPhase] = useState<"invoices" | "extracting" | "ready">("invoices");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("extracting"), 1500);
    const t2 = setTimeout(() => setPhase("ready"), 3800);
    const t3 = setTimeout(() => setPhase("invoices"), 7500);
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
        <span>Chapter 06 : Finance & AP Reconciliation</span>
        <span>
          {phase === "invoices" && "Invoices Ingesting"}
          {phase === "extracting" && "Noise Fading • Essential Particles Extracted"}
          {phase === "ready" && "Payment Ready"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "invoices" && (
          <div className="flex gap-4">
            {["AWS Cloud ₹3.42L", "WeWork Office ₹1.20L", "Google Workspace ₹45K"].map((inv, idx) => (
              <motion.div
                key={inv}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.9 }}
                transition={{ delay: idx * 0.15 }}
                className="rounded-xl border border-charcoal/15 bg-white p-4 shadow-sm font-mono text-xs text-charcoal text-center"
              >
                <span className="text-[10px] text-charcoal/40 uppercase">Invoice #{idx + 1}</span>
                <p className="font-bold mt-1">{inv}</p>
              </motion.div>
            ))}
          </div>
        )}

        {phase === "extracting" && (
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            {["VENDOR: AWS India", "PO: #PO-4401", "AMOUNT: ₹3,42,100.00", "GST ITC: ₹52,184.00", "DUE: 15 June"].map(
              (token, i) => (
                <motion.div
                  key={token}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-full bg-charcoal px-4 py-2 text-white font-medium shadow-md"
                >
                  {token}
                </motion.div>
              )
            )}
          </div>
        )}

        {phase === "ready" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            {/* The Thread Circle Stamp */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-charcoal bg-white shadow-xl">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-2xl font-bold text-charcoal"
              >
                ✓
              </motion.span>
            </div>

            <div className="rounded-2xl border border-charcoal/15 bg-white p-6 shadow-lg text-left font-mono text-xs max-w-sm w-full">
              <div className="flex justify-between border-b border-charcoal/10 pb-2">
                <span className="text-charcoal/40 uppercase text-[10px]">ERP Batch Commit</span>
                <span className="font-bold text-emerald-700">PAYMENT READY</span>
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Total Reconciled:</span>
                  <span className="font-bold text-charcoal">₹3,42,100.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/50">ITC Claimed:</span>
                  <span className="font-semibold text-emerald-700">₹52,184.00 (Valid GSTR2B)</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-charcoal/10 pt-4 font-serif text-xs italic text-charcoal/60">
        Everything unnecessary fades. The essential obligations snap into verified accounting state.
      </div>
    </div>
  );
}
