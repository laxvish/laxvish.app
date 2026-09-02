"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const TOTAL_PHASES = 6;

const PHASES = [
  { id: 0, title: "00 · Quiescent", label: "Optical Prism Chamber at Rest" },
  { id: 1, title: "01 · Ingestion", label: "3-Layer Isometric Vellum Strata Suspended" },
  { id: 2, title: "02 · Alidade", label: "Optical Laser Alidade Piercing 3 Layers" },
  { id: 3, title: "03 · Detachment", label: "Volumetric Numeral Field Detachment" },
  { id: 4, title: "04 · Reconciliation", label: "3-Way Match Zero-Variance Check" },
  { id: 5, title: "05 · Commitment", label: "Embossed #9B8EC7 Verification Token Committed ✓" },
];

export function DocumentScene() {
  const [phase, setPhase] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const nextPhase = useCallback(() => {
    setPhase((p) => (p + 1) % TOTAL_PHASES);
  }, []);

  const prevPhase = useCallback(() => {
    setPhase((p) => (p - 1 + TOTAL_PHASES) % TOTAL_PHASES);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setTimeout(() => {
      setPhase((p) => (p + 1) % TOTAL_PHASES);
    }, 2800);
    return () => clearTimeout(timer);
  }, [phase, isAutoPlay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[520px] w-full flex-col justify-between overflow-hidden rounded-none bg-[#F2EAE0] p-6 text-[#1A1820] sm:p-8 border border-[#9B8EC7]/25 shadow-sm"
      style={{ perspective: "1000px" }}
    >
      {/* Background Architectural Isometric Grid */}
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
      <div className="pointer-events-none absolute top-3 left-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 00.16.PO</div>
      <div className="pointer-events-none absolute top-3 right-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 00.16.DC</div>
      <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 00.16.INV</div>
      <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 00.16.ERP</div>

      {/* Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[#9B8EC7]/20 pb-3.5 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-[#9B8EC7] animate-pulse" />
          <span className="font-semibold tracking-[0.2em] text-[#1A1820] uppercase">
            ARTIFACT III : THE DOCUMENT STRATA & OPTICAL ALIDADE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-none border border-[#9B8EC7] bg-[#EDE3D2] px-3 py-1 font-mono text-[11px] font-medium text-[#1A1820]">
            PHASE {phase} / 05 · {PHASES[phase].label}
          </span>
        </div>
      </div>

      {/* 3D Interactive Spatial Stage */}
      <motion.div
        animate={{
          rotateX: -mousePos.y * 8,
          rotateY: mousePos.x * 8,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-4 text-center"
      >
        <AnimatePresence mode="wait">
          {/* Phase 0: Standby */}
          {phase === 0 && (
            <motion.div
              key="phase-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative flex h-32 w-32 items-center justify-center rounded-none border-2 border-[#1A1820] bg-[#EDE3D2] p-4 shadow-md">
                <svg className="h-14 w-14 text-[#9B8EC7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <div className="absolute top-1 left-1.5 font-mono text-[8px] text-[#1A1820]/60">OPTICAL PRISM</div>
              </div>
              <p className="max-w-md font-mono text-xs text-[#1A1820]/70">
                Optical alidade chamber ready. Multi-format purchase orders, delivery receipts, and tax invoices welcomed.
              </p>
            </motion.div>
          )}

          {/* Phase 1: 3-Layer Isometric Vellum Strata */}
          {phase === 1 && (
            <motion.div
              key="phase-1"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex h-56 w-full max-w-lg items-center justify-center"
            >
              {[
                {
                  id: "1. PO #PO-4401",
                  title: "Purchase Order (ERP)",
                  desc: "10x NVMe Enterprise Racks · ₹1,46,320.00",
                  x: -120,
                  y: 10,
                  rotate: -8,
                  bg: "bg-[#EDE3D2]",
                },
                {
                  id: "2. Challan #DC-992",
                  title: "Delivery Challan (Inward)",
                  desc: "Warehouse Receipt · 10/10 Inward Safe",
                  x: 0,
                  y: -10,
                  rotate: 0,
                  bg: "bg-[#F2EAE0]",
                },
                {
                  id: "3. Tax Bill #INV-104",
                  title: "Tax Invoice (GST Portal)",
                  desc: "GSTIN: 27AAACH... · IGST ₹26,337.60",
                  x: 120,
                  y: 10,
                  rotate: 8,
                  bg: "bg-[#EDE3D2]",
                },
              ].map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: doc.y, x: doc.x, rotate: doc.rotate, opacity: 1 }}
                  transition={{ delay: idx * 0.12, type: "spring" }}
                  className={`absolute h-48 w-36 rounded-none border border-[#9B8EC7] ${doc.bg} p-3 text-left shadow-md flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#9B8EC7]/30 pb-1 font-mono text-[8px] font-bold text-[#9B8EC7] uppercase">
                      <span>{doc.id}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9B8EC7]" />
                    </div>
                    <div className="mt-2 text-[10px] font-bold text-[#1A1820] leading-tight">
                      {doc.title}
                    </div>
                    <div className="mt-1 font-mono text-[8px] text-[#1A1820]/70 leading-normal">
                      {doc.desc}
                    </div>
                  </div>

                  <div className="space-y-1 opacity-50">
                    <div className="h-1 w-full bg-[#1A1820]/20" />
                    <div className="h-1 w-4/5 bg-[#1A1820]/20" />
                    <div className="h-1 w-2/3 bg-[#9B8EC7]/30" />
                  </div>

                  <div className="border-t border-[#9B8EC7]/20 pt-1 font-mono text-[7px] text-[#1A1820]/50">
                    VELLUM STRATA LAYER 0{idx + 1}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Phase 2: Optical Laser Alidade Slicing Through 3 Layers */}
          {phase === 2 && (
            <motion.div
              key="phase-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex w-full max-w-lg flex-col items-center justify-center py-2"
            >
              <div className="w-full border border-[#9B8EC7] bg-[#EDE3D2] px-4 py-2 mb-2 font-mono text-xs flex justify-between">
                <span className="font-bold text-[#9B8EC7]">OPTICAL LASER ALIDADE ENGAGED</span>
                <span className="font-bold text-[#1A1820]">PERPENDICULAR SLICE AXIS</span>
              </div>

              <svg viewBox="0 0 500 110" className="h-28 w-full overflow-visible">
                {/* Horizontal Slicing Alidade Laser Ray */}
                <motion.line
                  x1="10"
                  y1="55"
                  x2="490"
                  y2="55"
                  stroke="#9B8EC7"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />

                {/* Slicing Reticles penetrating PO, Challan, Tax Invoice */}
                <circle cx="120" cy="55" r="7" fill="#EDE3D2" stroke="#9B8EC7" strokeWidth="2" />
                <circle cx="250" cy="55" r="9" fill="#1A1820" stroke="#9B8EC7" strokeWidth="2.5" />
                <circle cx="380" cy="55" r="7" fill="#EDE3D2" stroke="#9B8EC7" strokeWidth="2" />

                <text x="95" y="80" fill="#1A1820" fontSize="9" fontFamily="monospace" fontWeight="bold">PO RETICLE</text>
                <text x="220" y="82" fill="#9B8EC7" fontSize="10" fontFamily="monospace" fontWeight="bold">ALIDADE AXIS</text>
                <text x="355" y="80" fill="#1A1820" fontSize="9" fontFamily="monospace" fontWeight="bold">INV RETICLE</text>
              </svg>

              <span className="font-mono text-xs font-semibold text-[#1A1820]">
                OPTICAL ALIDADE PIERCING PURCHASE ORDER, DELIVERY CHALLAN & TAX INVOICE
              </span>
            </motion.div>
          )}

          {/* Phase 3: Volumetric Numeral Detachment */}
          {phase === 3 && (
            <motion.div
              key="phase-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs max-w-lg"
            >
              {[
                { tag: "VENDOR", val: "Horizon Cloud Corp" },
                { tag: "RECONCILED AMOUNT", val: "₹1,46,320.00" },
                { tag: "GSTIN", val: "27AAACH7409R1ZZ (Valid)" },
                { tag: "LINE ITEMS", val: "10x NVMe Enterprise Racks" },
                { tag: "DUE DATE", val: "15 June 2025 (Net 30)" },
              ].map((pill, idx) => (
                <motion.div
                  key={pill.tag}
                  initial={{ scale: 0.85, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2 rounded-none border border-[#9B8EC7] bg-[#EDE3D2] px-3.5 py-2 text-[#1A1820] shadow-sm"
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#9B8EC7]">{pill.tag}:</span>
                  <span className="font-semibold text-[#1A1820]">{pill.val}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Phase 4: 3-Way Match Zero-Variance Check */}
          {phase === 4 && (
            <motion.div
              key="phase-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4 font-mono text-xs"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#9B8EC7] bg-[#1A1820] text-[#F2EAE0]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  className="absolute inset-1 rounded-full border-t-2 border-[#9B8EC7]"
                />
                <span className="font-bold tracking-widest text-[#9B8EC7]">BRAKES</span>
              </div>
              <div className="rounded-none border border-[#9B8EC7] bg-[#EDE3D2] px-6 py-3 text-center text-[#1A1820]">
                <span className="text-[#1A1820]/70">3-Way Matrix Reconciliation: </span>
                <strong className="font-semibold text-[#1A1820]">
                  PO #PO-4401 = DC #DC-992 = INV #INV-104 (Zero Variance Confirmed) ✓
                </strong>
              </div>
            </motion.div>
          )}

          {/* Phase 5: Embossed 3-Way Match Verification Token in #9B8EC7 */}
          {phase === 5 && (
            <motion.div
              key="phase-5"
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="relative w-full max-w-md rounded-none border-2 border-[#9B8EC7] bg-[#EDE3D2] p-6 text-left shadow-[6px_6px_0_0_rgba(157,142,199,0.25)]"
            >
              {/* Corner Pins */}
              <div className="absolute top-2.5 left-2.5 h-1.5 w-1.5 rounded-full bg-[#9B8EC7]" />
              <div className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-[#9B8EC7]" />
              <div className="absolute bottom-2.5 left-2.5 h-1.5 w-1.5 rounded-full bg-[#9B8EC7]" />
              <div className="absolute bottom-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-[#9B8EC7]" />

              <div className="flex items-center justify-between border-b border-[#9B8EC7]/30 pb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-none bg-[#9B8EC7]" />
                  <span className="font-bold tracking-widest text-[#1A1820] uppercase">
                    3-WAY MATCH TOKEN COMMITTED
                  </span>
                </div>
                <span className="rounded-none bg-[#9B8EC7] px-2 py-0.5 font-mono text-[10px] font-bold text-[#F2EAE0]">
                  ZERO VARIANCE · GST SAFE ✓
                </span>
              </div>

              <div className="mt-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between border-b border-[#9B8EC7]/15 py-1">
                  <span className="text-[#1A1820]/60">Reconciled Total</span>
                  <span className="font-semibold text-[#1A1820]">₹1,46,320.00 (100% Match)</span>
                </div>
                <div className="flex justify-between border-b border-[#9B8EC7]/15 py-1">
                  <span className="text-[#1A1820]/60">Tax Input ITC Claim</span>
                  <span className="font-bold text-[#9B8EC7]">₹26,337.60 Validated on Portal</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#1A1820]/60">ERP Direct Injection</span>
                  <span className="font-semibold text-[#1A1820]">SAP S/4HANA & Tally Prime Locked</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Controls Footbar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-[#9B8EC7]/20 pt-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="flex items-center gap-1.5 border border-[#9B8EC7] bg-[#EDE3D2] px-2.5 py-1 text-[10px] font-medium text-[#1A1820] hover:bg-[#B4D3D9] cursor-pointer transition-colors"
            aria-label={isAutoPlay ? "Pause automated cycle" : "Play automated cycle"}
          >
            {isAutoPlay ? "⏸ PAUSE" : "▶ PLAY"}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAutoPlay(false);
              prevPhase();
            }}
            className="border border-[#9B8EC7]/40 bg-[#F2EAE0] px-2 py-1 text-[10px] font-mono text-[#1A1820] hover:border-[#9B8EC7] hover:bg-[#EDE3D2] cursor-pointer transition-colors"
            aria-label="Previous step"
          >
            ← PREV
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAutoPlay(false);
              nextPhase();
            }}
            className="border border-[#9B8EC7]/40 bg-[#F2EAE0] px-2 py-1 text-[10px] font-mono text-[#1A1820] hover:border-[#9B8EC7] hover:bg-[#EDE3D2] cursor-pointer transition-colors"
            aria-label="Next step"
          >
            NEXT →
          </button>
        </div>

        {/* Phase Step Selector Buttons */}
        <div className="flex items-center gap-1">
          {PHASES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setIsAutoPlay(false);
                setPhase(p.id);
              }}
              className={`px-2 py-1 text-[10px] font-mono cursor-pointer transition-all ${
                phase === p.id
                  ? "bg-[#9B8EC7] text-[#F2EAE0] font-bold"
                  : "bg-[#EDE3D2] text-[#1A1820]/70 hover:text-[#1A1820] hover:bg-[#B4D3D9]"
              }`}
              title={p.label}
              aria-label={`Select Phase ${p.id}: ${p.label}`}
            >
              {p.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
