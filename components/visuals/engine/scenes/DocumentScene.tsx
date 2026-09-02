"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function DocumentScene() {
  const [shot, setShot] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!isAutoPlay) return;
    const timers = [
      setTimeout(() => setShot(1), 1600), // Shot 1: 3-Layer Isometric Documents Hover
      setTimeout(() => setShot(2), 3600), // Shot 2: Prism Laser Beam Pierces Strata
      setTimeout(() => setShot(3), 5600), // Shot 3: Semantic Numbers Float in Volumetric Space
      setTimeout(() => setShot(4), 7600), // Shot 4: Brakes 3-Way Laser Matrix Alignment
      setTimeout(() => setShot(5), 9600), // Shot 5: Embossed 3-Way Match Token Committed ✓
      setTimeout(() => setShot(0), 13500), // Reset
    ];
    return () => timers.forEach(clearTimeout);
  }, [shot, isAutoPlay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[480px] w-full flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#0D0F14] p-6 text-white sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-emerald-500/20"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Dynamic Emerald/Gold Laser Ambient Glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.05]" />

      {/* Machined Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
          <span className="font-bold tracking-[0.2em] text-emerald-300 uppercase">
            ARTIFACT III : THE TACTILE LEDGER PRISM
          </span>
        </div>
        <div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] font-semibold text-emerald-200">
            {shot === 0 && "Standby Optical Stage"}
            {shot === 1 && "3 Layer Physical Strata Ingested"}
            {shot === 2 && "Prism Laser Beam Piercing Parchment"}
            {shot === 3 && "Volumetric Semantic Field Detachment"}
            {shot === 4 && "Brakes Zero-Variance 3-Way Match Check"}
            {shot === 5 && "Audited & Committed to ERP Ledger ✓"}
          </span>
        </div>
      </div>

      {/* 3D Spatial Canvas */}
      <motion.div
        animate={{
          rotateX: -mousePos.y * 12,
          rotateY: mousePos.x * 12,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6 text-center"
      >
        <AnimatePresence mode="wait">
          {/* Shot 0: Idle state */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-md">
                <svg className="h-8 w-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <p className="font-serif text-sm italic text-emerald-100/60 max-w-sm">
                Optical prism ready. Multi-format bills, challans, and POs welcomed.
              </p>
            </motion.div>
          )}

          {/* Shot 1: 3-Layer Isometric Physical Documents in Depth */}
          {shot === 1 && (
            <motion.div
              key="shot-1"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex h-52 w-full max-w-lg items-center justify-center"
            >
              {[
                { id: "1. PO #PO-4401", title: "Enterprise Purchase Order", rotate: -12, x: -110, y: 10, bg: "from-neutral-900 to-black" },
                { id: "2. Challan #DC-992", title: "Warehouse Delivery Receipt", rotate: 0, x: 0, y: -15, bg: "from-[#111827] to-black" },
                { id: "3. Tax Bill #INV-104", title: "Vendor GST Tax Invoice", rotate: 12, x: 110, y: 10, bg: "from-neutral-900 to-black" },
              ].map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: doc.y, x: doc.x, rotate: doc.rotate, opacity: 1 }}
                  transition={{ delay: idx * 0.15, type: "spring" }}
                  className={`absolute h-44 w-32 rounded-2xl border-2 border-emerald-400/40 bg-gradient-to-b ${doc.bg} p-3.5 text-left shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-md`}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5 font-mono text-[8px] text-emerald-300 uppercase">
                    <span>{doc.id.split(".")[1]}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="mt-2 text-[9px] font-bold text-white leading-tight">{doc.title}</div>
                  <div className="mt-4 space-y-1 opacity-50">
                    <div className="h-1 w-full bg-white/30 rounded" />
                    <div className="h-1 w-4/5 bg-white/20 rounded" />
                    <div className="h-1 w-3/5 bg-white/20 rounded" />
                  </div>
                  <div className="mt-6 font-mono text-[8px] text-emerald-400/80 font-semibold">
                    GSTIN: 27AAACH...
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Shot 2: Laser Prism Pierces Through */}
          {shot === 2 && (
            <motion.div
              key="shot-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex w-full max-w-lg flex-col items-center justify-center py-4"
            >
              <svg viewBox="0 0 500 100" className="h-24 w-full overflow-visible">
                {/* Laser Prism Ray */}
                <motion.line
                  x1="0"
                  y1="50"
                  x2="500"
                  y2="50"
                  stroke="#10B981"
                  strokeWidth="3.5"
                  filter="drop-shadow(0 0 12px rgba(16,185,129,0.9))"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9 }}
                />
                {/* Prism Nodes */}
                <circle cx="120" cy="50" r="6" fill="#10B981" />
                <circle cx="250" cy="50" r="8" fill="#F59E0B" />
                <circle cx="380" cy="50" r="6" fill="#10B981" />
              </svg>
              <span className="font-mono text-xs font-bold text-emerald-300">
                PRISM LASER REFRACTING TAX CODES, QUANTITIES, & TOTALS ACROSS STRATA
              </span>
            </motion.div>
          )}

          {/* Shot 3: Volumetric Semantic Fields Detaching */}
          {shot === 3 && (
            <motion.div
              key="shot-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs"
            >
              {[
                { tag: "VENDOR", val: "Horizon Cloud Corp", color: "border-emerald-400 bg-emerald-950/60 text-emerald-200" },
                { tag: "AMOUNT", val: "₹1,46,320.00", color: "border-amber-400 bg-amber-950/60 text-amber-200" },
                { tag: "GSTIN", val: "27AAACH7409R1ZZ (Valid)", color: "border-cyan-400 bg-cyan-950/60 text-cyan-200" },
                { tag: "LINE ITEMS", val: "10x NVMe Enterprise Racks", color: "border-emerald-400 bg-emerald-950/60 text-emerald-200" },
                { tag: "DUE DATE", val: "15 June 2025 (Net 30)", color: "border-white/30 bg-neutral-900/80 text-white" },
              ].map((pill, idx) => (
                <motion.div
                  key={pill.tag}
                  initial={{ scale: 0.8, y: 25, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.12 }}
                  className={`flex items-center gap-2 rounded-2xl border-2 px-4 py-2.5 shadow-xl backdrop-blur-md ${pill.color}`}
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider">{pill.tag}:</span>
                  <span className="font-bold">{pill.val}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Shot 4: Brakes 3-Way Match Verification Check */}
          {shot === 4 && (
            <motion.div
              key="shot-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 font-mono text-xs"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-400 bg-black shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-1.5 rounded-full border-t-2 border-amber-400"
                />
                <span className="text-xs font-bold tracking-widest text-emerald-300">BRAKES</span>
              </div>
              <div className="rounded-2xl border border-emerald-400/40 bg-emerald-950/40 px-5 py-2.5 text-emerald-200 backdrop-blur-md">
                <span>3-Way Matrix Reconciliation: </span>
                <strong className="text-emerald-400">PO #PO-4401 = DC #992 = INV #104 (Zero Variance) ✓</strong>
              </div>
            </motion.div>
          )}

          {/* Shot 5: Embossed 3-Way Match Token */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.88, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative w-full max-w-md rounded-3xl border-2 border-emerald-400/60 bg-gradient-to-b from-[#0F1B18] to-[#080E0C] p-6 text-left shadow-[0_0_60px_rgba(16,185,129,0.35)]"
            >
              <div className="flex items-center justify-between border-b border-emerald-400/20 pb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  <span className="font-bold tracking-widest text-emerald-300 uppercase">
                    3-WAY MATCH COMMITTED
                  </span>
                </div>
                <span className="font-mono font-bold text-emerald-400">GST ITC SAFE ✓</span>
              </div>

              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Reconciled Total</span>
                  <span className="font-bold text-white">₹1,46,320.00 (100% Match)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Tax Input Claim</span>
                  <span className="font-bold text-emerald-300">₹26,337.60 Validated on Portal</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/40">ERP Direct Injection</span>
                  <span className="text-amber-200 font-medium">SAP S/4HANA & Tally Prime Ledger Locked</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footbar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-[11px] text-white/50">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIsAutoPlay(false);
                setShot(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                shot === i ? "w-8 bg-emerald-400 shadow-[0_0_8px_#34d399]" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              title={`Jump to Shot ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase text-emerald-300/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Multi-Strata Extraction → Audit-Grade Token</span>
        </div>
      </div>
    </div>
  );
}
