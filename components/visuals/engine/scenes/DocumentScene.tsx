"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function DocumentScene() {
  const [shot, setShot] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timers = [
      setTimeout(() => setShot(1), 1800), // Shot 1: 3 distinct docs arrive
      setTimeout(() => setShot(2), 3800), // Shot 2: Semantic meaning lifts out
      setTimeout(() => setShot(3), 5800), // Shot 3: 3 streams merge into matrix
      setTimeout(() => setShot(4), 7800), // Shot 4: Brakes 3-way reconciliation
      setTimeout(() => setShot(5), 9800), // Shot 5: 3-WAY MATCH ✓ Committed
      setTimeout(() => setShot(0), 13000), // Reset
    ];
    return () => timers.forEach(clearTimeout);
  }, [shot, isAutoPlay]);

  return (
    <div className="relative flex min-h-[420px] w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-[#FAF8F5] p-6 text-charcoal sm:p-10">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#111111_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-[0.05]" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-charcoal/10 pb-3.5 font-mono text-[11px] text-charcoal/50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-charcoal uppercase">SCENE 03</span>
          <span>:</span>
          <span className="uppercase tracking-wider">DOCUMENT INTELLIGENCE</span>
        </div>
        <div>
          <span className="rounded-full bg-charcoal/5 px-2.5 py-0.5 text-[10px] font-semibold text-charcoal">
            {shot === 0 && "Standby Ingestion"}
            {shot === 1 && "Shot 1 · 3 Disparate Invoices Arrive"}
            {shot === 2 && "Shot 2 · Semantic Meaning Lifts Out"}
            {shot === 3 && "Shot 3 · Streams Merge into Matrix"}
            {shot === 4 && "Shot 4 · Brakes 3-Way Match Check"}
            {shot === 5 && "Shot 5 · Reconciled & Committed to ERP ✓"}
          </span>
        </div>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6 text-center">
        <AnimatePresence mode="wait">
          {/* Shot 0: Idle state */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 font-mono text-xs text-charcoal/40"
            >
              <div className="h-3 w-3 rounded-full bg-charcoal/30 animate-pulse" />
              <span>Awaiting multi-format invoices, POs, and vendor delivery challans...</span>
            </motion.div>
          )}

          {/* Shot 1: Three different documents enter */}
          {shot === 1 && (
            <motion.div
              key="shot-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex h-40 w-full max-w-md items-center justify-center"
            >
              {[
                { id: "INV-104", label: "Horizon Cloud", rotate: -10, x: -80 },
                { id: "INV-105", label: "Apex Logistics", rotate: 0, x: 0 },
                { id: "INV-106", label: "Tata Steelworks", rotate: 12, x: 80 },
              ].map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, rotate: doc.rotate, x: doc.x }}
                  transition={{ delay: idx * 0.15 }}
                  className="absolute h-36 w-28 rounded-xl border border-charcoal/20 bg-white p-3 shadow-md text-left font-mono"
                >
                  <div className="h-2 w-12 bg-charcoal/30 rounded-xs" />
                  <div className="mt-2 h-1 w-16 bg-charcoal/10 rounded-xs" />
                  <div className="mt-1 h-1 w-14 bg-charcoal/10 rounded-xs" />
                  <div className="mt-8 border-t border-charcoal/10 pt-2 font-mono text-[9px] font-bold text-charcoal">
                    {doc.id}
                  </div>
                  <div className="text-[8px] text-charcoal/50">{doc.label}</div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Shot 2: Semantic meaning lifts out */}
          {shot === 2 && (
            <motion.div
              key="shot-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs"
            >
              {[
                { tag: "VENDOR", val: "Horizon Cloud Corp" },
                { tag: "AMOUNT", val: "₹1,46,320.00" },
                { tag: "GSTIN", val: "27AAACH7409R1ZZ" },
                { tag: "PO MATCH", val: "#PO-4401" },
                { tag: "DUE DATE", val: "15 June 2025" },
              ].map((token, idx) => (
                <motion.div
                  key={token.tag}
                  initial={{ y: 25, opacity: 0, scale: 0.85 }}
                  animate={{ y: [25, -5, 0], opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2 rounded-xl border border-charcoal/15 bg-white px-3.5 py-2 text-charcoal shadow-sm"
                >
                  <span className="text-[9px] uppercase tracking-wider text-charcoal/40 font-bold">{token.tag}:</span>
                  <span className="font-semibold">{token.val}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Shot 3: Streams merge into verification matrix */}
          {shot === 3 && (
            <motion.div
              key="shot-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid w-full max-w-lg grid-cols-3 gap-2 text-center font-mono text-xs"
            >
              <div className="rounded-xl border border-charcoal/15 bg-white p-3 shadow-xs">
                <span className="block text-[9px] uppercase text-charcoal/40">1. PO #PO-4401</span>
                <span className="font-bold mt-1 block">10x Enterprise Racks</span>
                <span className="text-[10px] text-charcoal/60">₹1,46,320.00</span>
              </div>
              <div className="rounded-xl border border-charcoal/15 bg-white p-3 shadow-xs">
                <span className="block text-[9px] uppercase text-charcoal/40">2. Challan #DC-992</span>
                <span className="font-bold mt-1 block">Received @ Warehouse</span>
                <span className="text-[10px] text-emerald-700">10/10 Verified</span>
              </div>
              <div className="rounded-xl border border-charcoal/15 bg-white p-3 shadow-xs">
                <span className="block text-[9px] uppercase text-charcoal/40">3. Invoice #INV-104</span>
                <span className="font-bold mt-1 block">GSTIN Validated</span>
                <span className="text-[10px] text-emerald-700">100% Tax Match</span>
              </div>
            </motion.div>
          )}

          {/* Shot 4: Brakes 3-Way Reconciliation Check */}
          {shot === 4 && (
            <motion.div
              key="shot-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 font-mono text-xs"
            >
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-charcoal bg-white shadow-lg">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-1 rounded-full border-t-2 border-emerald-600"
                />
                <span className="text-[10px] font-bold text-charcoal">BRAKES</span>
              </div>
              <div className="rounded-xl border border-charcoal/15 bg-white px-4 py-2 shadow-xs">
                <span className="text-charcoal/60">Zero Variance Check: </span>
                <span className="font-bold text-emerald-700">All 3 Vectors Aligned (Delta = ₹0.00) ✓</span>
              </div>
            </motion.div>
          )}

          {/* Shot 5: 3-WAY MATCH ✓ Committed */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-charcoal/20 bg-white p-5 text-left shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-2.5 font-mono text-[10px]">
                <span className="font-bold uppercase text-charcoal">AUDIT-GRADE 3-WAY MATCH</span>
                <span className="font-bold text-emerald-700">COMMITTED TO SAP & TALLY ✓</span>
              </div>
              <div className="mt-3 space-y-2 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-charcoal/5">
                  <span className="text-charcoal/50">Tax Eligibility</span>
                  <span className="font-bold text-charcoal">GST ITC Claimable (₹26,337.60)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-charcoal/5">
                  <span className="text-charcoal/50">Payment Status</span>
                  <span className="font-bold text-emerald-700">Approved for Batch Payout</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-charcoal/50">Audit State</span>
                  <span className="font-bold text-charcoal">DPDP & GSTIN Verified</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Scrubber */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-charcoal/10 pt-3.5 font-mono text-[11px] text-charcoal/50">
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIsAutoPlay(false);
                setShot(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                shot === i ? "w-6 bg-charcoal" : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
              }`}
              title={`Jump to Shot ${i + 1}`}
            />
          ))}
        </div>
        <div className="text-[10px] uppercase text-charcoal/40">
          Semantic Understanding · Not Simple OCR
        </div>
      </div>
    </div>
  );
}
