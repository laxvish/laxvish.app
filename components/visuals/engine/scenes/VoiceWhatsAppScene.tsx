"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const TOTAL_PHASES = 6;

const PHASES = [
  { id: 0, title: "00 · Quiescent", label: "Dual Harmonic Chambers Balanced in Loom" },
  { id: 1, title: "01 · Ingestion", label: "Analog Tungsten Tube + Digital Quartz Streams" },
  { id: 2, title: "02 · Helical", label: "Center Helical Braided Spindle Weaves Filaments" },
  { id: 3, title: "03 · Synthesis", label: "Unified Customer Context Assembly" },
  { id: 4, title: "04 · DPDP", label: "Brakes DPDP Redaction & EMR Conflict Check" },
  { id: 5, title: "05 · Truth", label: "Unified Customer Truth Committed to EMR ✓" },
];

export function VoiceWhatsAppScene() {
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
      {/* Background Textile Loom Warp/Weft Grid */}
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
      <div className="pointer-events-none absolute top-3 left-3 font-mono text-[9px] text-[#BDA6CE]/60">+ CH-L: ANALOG</div>
      <div className="pointer-events-none absolute top-3 right-3 font-mono text-[9px] text-[#BDA6CE]/60">+ CH-R: QUARTZ</div>
      <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[9px] text-[#BDA6CE]/60">+ LOOM SPINDLE</div>
      <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] text-[#BDA6CE]/60">+ TRUTH TABLET</div>

      {/* Loom Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[#9B8EC7]/20 pb-3.5 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-[#9B8EC7] animate-pulse" />
          <span className="font-semibold tracking-[0.2em] text-[#1A1820] uppercase">
            ARTIFACT V : THE HARMONIC DUAL-STREAM VOICE LOOM
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
          {/* Phase 0: Standby · Quiescent Dual Chambers */}
          {phase === 0 && (
            <motion.div
              key="phase-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-4">
                {/* Left Analog Tungsten Chamber Icon */}
                <div className="flex h-24 w-20 flex-col items-center justify-between rounded-t-full border-2 border-[#1A1820] bg-[#EDE3D2] p-2 shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-[#9B8EC7]" />
                  <div className="h-8 w-1 bg-[#1A1820]" />
                  <span className="font-mono text-[7px] font-bold text-[#1A1820]">TUNGSTEN</span>
                </div>

                {/* Center Loom Spindle Gear */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#9B8EC7] bg-[#1A1820] text-[#F2EAE0]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute inset-1 rounded-full border-t-2 border-[#9B8EC7]"
                  />
                  <span className="font-mono text-[7px] font-bold text-[#9B8EC7]">LOOM</span>
                </div>

                {/* Right Digital Quartz Chamber Icon */}
                <div className="flex h-24 w-20 flex-col items-center justify-between rounded-none border-2 border-[#1A1820] bg-[#EDE3D2] p-2 shadow-sm">
                  <div className="h-2 w-2 rounded-none bg-[#9B8EC7]" />
                  <div className="h-6 w-10 border border-[#9B8EC7]/40 flex items-center justify-center font-mono text-[7px] text-[#1A1820]">
                    {"{JSON}"}
                  </div>
                  <span className="font-mono text-[7px] font-bold text-[#1A1820]">QUARTZ</span>
                </div>
              </div>

              <p className="max-w-md font-mono text-xs text-[#1A1820]/70">
                Dual telephony lines and WhatsApp webhook streams balanced in the loom. Ready to weave continuous voice and discrete text.
              </p>
            </motion.div>
          )}

          {/* Phase 1: Dual Parallel Streams */}
          {phase === 1 && (
            <motion.div
              key="phase-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid w-full max-w-lg gap-3 sm:grid-cols-2 font-mono text-xs text-left"
            >
              {/* Left Chamber: Analog Tungsten Vacuum Tube */}
              <div className="flex flex-col justify-between rounded-none border border-[#9B8EC7] bg-[#EDE3D2] p-3.5 shadow-sm">
                <div>
                  <div className="flex items-center justify-between border-b border-[#9B8EC7]/20 pb-1 text-[9px] text-[#1A1820]">
                    <span className="font-bold text-[#9B8EC7] uppercase">ANALOG TUNGSTEN TUBE</span>
                    <span className="font-bold">240ms · 48kHz</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#1A1820]">
                    &ldquo;Reschedule my clinic appointment for tomorrow afternoon...&rdquo;
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1.5 border-t border-[#9B8EC7]/20 pt-1 text-[9px] text-[#1A1820]/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9B8EC7] animate-pulse" />
                  <span>Continuous Vacuum Tube Telephony</span>
                </div>
              </div>

              {/* Right Chamber: Digital Quartz WhatsApp */}
              <div className="flex flex-col justify-between rounded-none border border-[#9B8EC7] bg-[#EDE3D2] p-3.5 shadow-sm">
                <div>
                  <div className="flex items-center justify-between border-b border-[#9B8EC7]/20 pb-1 text-[9px] text-[#1A1820]">
                    <span className="font-bold text-[#9B8EC7] uppercase">DIGITAL QUARTZ PACKET</span>
                    <span className="font-bold">DPDP VERIFIED</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#1A1820]">
                    &ldquo;Patient ID: P-88219 (Vikram Patel). Please confirm Dr. Rao slot.&rdquo;
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1.5 border-t border-[#9B8EC7]/20 pt-1 text-[9px] text-[#1A1820]/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9B8EC7] animate-pulse" />
                  <span>Discrete Quartz JSON Telemetry</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase 2: Center Helical Braided Spindle */}
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
                <span className="font-bold text-[#9B8EC7]">CENTER HELICAL SPINDLE</span>
                <span className="font-bold text-[#1A1820]">BRAIDED HARMONIC CORE</span>
              </div>

              <svg viewBox="0 0 500 100" className="h-24 w-full overflow-visible">
                {/* Voice Analog Filament */}
                <motion.path
                  d="M 20,25 Q 150,5 250,50 T 480,75"
                  stroke="#9B8EC7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />
                {/* WhatsApp Digital Filament */}
                <motion.path
                  d="M 20,75 Q 150,95 250,50 T 480,25"
                  stroke="#1A1820"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.15 }}
                />

                {/* Center Spindle Rotor */}
                <circle cx="250" cy="50" r="10" fill="#EDE3D2" stroke="#9B8EC7" strokeWidth="2.5" />
                <circle cx="250" cy="50" r="4" fill="#1A1820" />
              </svg>

              <span className="font-mono text-xs font-semibold text-[#1A1820] tracking-wider">
                CENTER HELICAL SPINDLE BRAIDING CONTINUOUS VOICE & DIGITAL PACKETS
              </span>
            </motion.div>
          )}

          {/* Phase 3: Semantic Convergence */}
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
                { tag: "PATIENT IDENTITY", val: "Vikram Patel (P-88219)" },
                { tag: "CLINICAL INTENT", val: "Cardiology Reschedule" },
                { tag: "TARGET DOCTOR", val: "Dr. Rao (OPD Room 3)" },
                { tag: "REQUESTED TIME", val: "Tomorrow 3:30 PM" },
              ].map((pill, idx) => (
                <motion.div
                  key={pill.tag}
                  initial={{ scale: 0.85, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2 rounded-none border border-[#9B8EC7] bg-[#EDE3D2] px-3.5 py-2 text-[#1A1820] shadow-sm"
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#9B8EC7]">{pill.tag}:</span>
                  <span className="font-semibold text-[#1A1820]">✦ {pill.val}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Phase 4: Brakes DPDP Redaction & EMR Conflict Check */}
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
                <span className="text-[#1A1820]/70">Clinical Conflict & DPDP Redaction Gate: </span>
                <strong className="font-semibold text-[#1A1820]">
                  Dr. Rao OPD Slot Available · Voice Audio PII Encrypted at Edge ✓
                </strong>
              </div>
            </motion.div>
          )}

          {/* Phase 5: Unified Customer Truth Tablet */}
          {phase === 5 && (
            <motion.div
              key="phase-5"
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="relative w-full max-w-md rounded-none border-2 border-[#9B8EC7] bg-[#EDE3D2] p-6 text-left shadow-lg"
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
                    UNIFIED CUSTOMER TRUTH TABLET
                  </span>
                </div>
                <span className="rounded-none bg-[#9B8EC7] px-2 py-0.5 font-mono text-[10px] font-bold text-[#F2EAE0]">
                  EMR LOCKED ✓
                </span>
              </div>

              <div className="mt-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between border-b border-[#9B8EC7]/15 py-1">
                  <span className="text-[#1A1820]/60">Hospital EMR Slot</span>
                  <span className="font-semibold text-[#1A1820]">Tomorrow 3:30 PM (Dr. Rao, Cardiology)</span>
                </div>
                <div className="flex justify-between border-b border-[#9B8EC7]/15 py-1">
                  <span className="text-[#1A1820]/60">WhatsApp Dispatch</span>
                  <span className="font-bold text-[#9B8EC7]">Official Calendar Pass Delivered</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#1A1820]/60">DPDP Compliance</span>
                  <span className="font-semibold text-[#1A1820]">Voice Audio Stream Redacted at Edge</span>
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
