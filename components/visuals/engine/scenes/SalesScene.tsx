"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const TOTAL_PHASES = 6;

const PHASES = [
  { id: 0, title: "00 · Standby", label: "48kHz Basalt Aperture Quiescent" },
  { id: 1, title: "01 · Ingestion", label: "84dB Acoustic Telephony Wave" },
  { id: 2, title: "02 · Resonance", label: "4 Concentric Frequency Orbits" },
  { id: 3, title: "03 · Gravitation", label: "Semantic Rune Shards to Nucleus" },
  { id: 4, title: "04 · Governance", label: "Brakes Fleet Matrix Verification" },
  { id: 5, title: "05 · Covenant", label: "Embossed #9B8EC7 Enterprise Seal" },
];

export function SalesScene() {
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
      {/* Background Architectural Grid & Calibration Crosshairs */}
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
      <div className="pointer-events-none absolute top-3 left-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 00.12.A</div>
      <div className="pointer-events-none absolute top-3 right-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 00.12.B</div>
      <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 00.12.C</div>
      <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 00.12.D</div>

      {/* Monolith Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[#9B8EC7]/20 pb-3.5 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-[#9B8EC7] animate-pulse" />
          <span className="font-semibold tracking-[0.2em] text-[#1A1820] uppercase">
            ARTIFACT I : THE ACOUSTIC BASALT MONOLITH
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
          {/* Phase 0: Standby · Dormant Basalt Obelisk & Acoustic Aperture */}
          {phase === 0 && (
            <motion.div
              key="phase-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Tactile Basalt Stone Column Visual */}
              <div className="relative flex h-36 w-28 flex-col items-center justify-between rounded-none border-2 border-[#1A1820] bg-[#1A1820] p-3 text-[#F2EAE0] shadow-md">
                {/* Monolith Top Bevel & Rivets */}
                <div className="flex w-full justify-between px-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9B8EC7]" />
                  <span className="font-mono text-[8px] tracking-widest text-[#BDA6CE]">48 kHz</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9B8EC7]" />
                </div>

                {/* Vertical Acoustic Fluting Grooves */}
                <div className="flex h-16 w-full items-center justify-center gap-1.5">
                  <div className="h-full w-1 bg-[#2D2A38] border-r border-[#1A1820]" />
                  <div className="h-full w-1 bg-[#2D2A38] border-r border-[#1A1820]" />
                  {/* Central Acoustic Gold Diaphragm */}
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#9B8EC7] bg-[#1A1820]">
                    <div className="h-4 w-4 rounded-full bg-[#9B8EC7]/30 border border-[#9B8EC7]" />
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                      className="absolute inset-0 rounded-full border border-[#9B8EC7]"
                    />
                  </div>
                  <div className="h-full w-1 bg-[#2D2A38] border-l border-[#1A1820]" />
                  <div className="h-full w-1 bg-[#2D2A38] border-l border-[#1A1820]" />
                </div>

                {/* Basalt Base Inscription */}
                <div className="w-full border-t border-[#BDA6CE]/20 pt-1 font-mono text-[8px] tracking-widest text-[#BDA6CE] uppercase">
                  BASALT MONOLITH
                </div>
              </div>

              <p className="max-w-md font-mono text-xs text-[#1A1820]/70">
                The acoustic basalt stone column stands in calibrated equilibrium. Ready to ingest enterprise telephony streams.
              </p>
            </motion.div>
          )}

          {/* Phase 1: Inbound Contact · Telephony Ingestion */}
          {phase === 1 && (
            <motion.div
              key="phase-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex w-full max-w-lg flex-col items-center gap-3"
            >
              <div className="w-full rounded-none border border-[#9B8EC7] bg-[#EDE3D2] p-4 text-left">
                <div className="flex items-center justify-between border-b border-[#9B8EC7]/20 pb-2 font-mono text-[10px] text-[#1A1820]">
                  <span className="font-bold uppercase tracking-wider text-[#9B8EC7]">INBOUND TELEPHONY WAVE</span>
                  <span className="font-semibold text-[#1A1820]">PRESSURE: 84 dB · 48kHz</span>
                </div>
                <p className="mt-2.5 font-mono text-sm leading-relaxed text-[#1A1820]">
                  &ldquo;Need automated dispatch routing and real-time fuel reconciliation for 120 fleet trucks before Q3 close...&rdquo;
                </p>
                <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-[#1A1820]/60">
                  <span>SOURCE: PRI-2 TELEPHONY TRUNK</span>
                  <span className="font-semibold text-[#9B8EC7]">VOICE CONTACT LOCKED</span>
                </div>
              </div>

              {/* Acoustic Waveform Linework */}
              <svg viewBox="0 0 460 50" className="h-12 w-full overflow-visible">
                <motion.path
                  d="M 0,25 Q 40,5 80,25 T 160,25 T 240,25 T 320,25 T 400,25 T 460,25"
                  stroke="#9B8EC7"
                  strokeWidth="2.5"
                  fill="none"
                  animate={{
                    d: [
                      "M 0,25 Q 40,5 80,25 T 160,25 T 240,25 T 320,25 T 400,25 T 460,25",
                      "M 0,25 Q 40,45 80,25 T 160,25 T 240,25 T 320,25 T 400,25 T 460,25",
                      "M 0,25 Q 40,5 80,25 T 160,25 T 240,25 T 320,25 T 400,25 T 460,25",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          )}

          {/* Phase 2: Phonetic Resonance · 4 Concentric Elliptical Orbits */}
          {phase === 2 && (
            <motion.div
              key="phase-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex w-full max-w-lg flex-col items-center justify-center py-2"
            >
              {/* SVG 4 Concentric Elliptical Frequency Orbits */}
              <svg viewBox="0 0 500 180" className="h-44 w-full overflow-visible">
                {/* Orbit 1: 120 Hz (Fundamental) */}
                <ellipse cx="250" cy="90" rx="220" ry="68" fill="none" stroke="#9B8EC7" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                {/* Orbit 2: 440 Hz (Formant) */}
                <ellipse cx="250" cy="90" rx="165" ry="50" fill="none" stroke="#9B8EC7" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.6" />
                {/* Orbit 3: 2.4 kHz (Telephony) */}
                <ellipse cx="250" cy="90" rx="110" ry="34" fill="none" stroke="#9B8EC7" strokeWidth="1.5" opacity="0.8" />
                {/* Orbit 4: 8.0 kHz (Aperture Air) */}
                <ellipse cx="250" cy="90" rx="60" ry="18" fill="none" stroke="#9B8EC7" strokeWidth="2" />

                {/* Central Basalt Nucleus */}
                <rect x="238" y="72" width="24" height="36" fill="#1A1820" stroke="#9B8EC7" strokeWidth="1.5" />
                <circle cx="250" cy="90" r="4" fill="#9B8EC7" />

                {/* Resonant Frequency Markers */}
                <text x="35" y="93" fill="#1A1820" fontSize="9" fontFamily="monospace" fontWeight="bold">120 Hz</text>
                <text x="90" y="80" fill="#1A1820" fontSize="9" fontFamily="monospace" fontWeight="bold">440 Hz</text>
                <text x="145" y="70" fill="#9B8EC7" fontSize="9" fontFamily="monospace" fontWeight="bold">2.4 kHz</text>
                <text x="195" y="60" fill="#9B8EC7" fontSize="9" fontFamily="monospace" fontWeight="bold">8.0 kHz</text>

                {/* Orbiting Harmonic Nodes */}
                <motion.circle
                  cx="250"
                  cy="90"
                  r="5"
                  fill="#9B8EC7"
                  animate={{
                    cx: [250 + 220, 250, 250 - 220, 250, 250 + 220],
                    cy: [90, 90 + 68, 90, 90 - 68, 90],
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />
                <motion.circle
                  cx="250"
                  cy="90"
                  r="4"
                  fill="#1A1820"
                  stroke="#9B8EC7"
                  animate={{
                    cx: [250 - 165, 250, 250 + 165, 250, 250 - 165],
                    cy: [90, 90 - 50, 90, 90 + 50, 90],
                  }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
                />
              </svg>

              <span className="font-mono text-xs font-semibold tracking-wider text-[#1A1820]">
                4 CONCENTRIC ELLIPTICAL ORBITS ISOLATING PHONETIC HARMONICS
              </span>
            </motion.div>
          )}

          {/* Phase 3: Semantic Gravitation · Rune Shards Inward Attraction */}
          {phase === 3 && (
            <motion.div
              key="phase-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex w-full max-w-lg flex-col items-center justify-center py-2"
            >
              <div className="relative flex h-48 w-full items-center justify-center">
                {/* Central Basalt Nucleus with Gravitational Field */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-none border-2 border-[#9B8EC7] bg-[#1A1820] text-[#F2EAE0] shadow-md font-mono text-[10px] font-bold">
                  NUCLEUS
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -inset-2 border border-[#9B8EC7]/50"
                  />
                </div>

                {/* Semantic Rune Shards gravitating inward */}
                {[
                  { label: "120 TRUCKS", sub: "Fleet Scale", x: -140, y: -45, delay: 0 },
                  { label: "Q3 CLOSE", sub: "Target Timeline", x: 140, y: -40, delay: 0.1 },
                  { label: "TIER-1 ICP", sub: "96.4% Fit Score", x: -130, y: 45, delay: 0.2 },
                  { label: "₹18L ARR", sub: "Contract Valuation", x: 130, y: 50, delay: 0.3 },
                ].map((shard) => (
                  <motion.div
                    key={shard.label}
                    initial={{ x: shard.x * 1.5, y: shard.y * 1.5, opacity: 0 }}
                    animate={{ x: shard.x, y: shard.y, opacity: 1 }}
                    transition={{ duration: 0.6, delay: shard.delay }}
                    className="absolute z-20 flex flex-col items-start rounded-none border border-[#9B8EC7] bg-[#EDE3D2] px-3 py-1.5 font-mono text-xs text-[#1A1820] shadow-sm"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[#1A1820]">
                      <span className="text-[#9B8EC7]">✦</span>
                      <span>{shard.label}</span>
                    </div>
                    <span className="text-[9px] text-[#1A1820]/60">{shard.sub}</span>
                  </motion.div>
                ))}

                {/* Gravitational Trajectory Vector Lines */}
                <svg className="pointer-events-none absolute inset-0 h-full w-full">
                  <line x1="120" y1="50" x2="250" y2="96" stroke="#9B8EC7" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="380" y1="55" x2="250" y2="96" stroke="#9B8EC7" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="130" y1="140" x2="250" y2="96" stroke="#9B8EC7" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="370" y1="145" x2="250" y2="96" stroke="#9B8EC7" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
              </div>

              <span className="font-mono text-xs text-[#1A1820]/80">
                Acoustic flux frozen into immutable semantic entities.
              </span>
            </motion.div>
          )}

          {/* Phase 4: Brakes Verification Check */}
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
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute inset-1 rounded-full border-t-2 border-[#9B8EC7]"
                />
                <span className="font-bold tracking-widest text-[#9B8EC7]">BRAKES</span>
              </div>
              <div className="rounded-none border border-[#9B8EC7] bg-[#EDE3D2] px-6 py-3 text-center text-[#1A1820]">
                <span className="text-[#1A1820]/70">Enterprise Governance Gate: </span>
                <strong className="font-semibold text-[#1A1820]">
                  120 Truck Fleet Schedule + Route Constraints Verified ✓
                </strong>
              </div>
            </motion.div>
          )}

          {/* Phase 5: Embossed Covenant Seal in #9B8EC7 */}
          {phase === 5 && (
            <motion.div
              key="phase-5"
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="relative w-full max-w-md rounded-none border-2 border-[#9B8EC7] bg-[#EDE3D2] p-6 text-left shadow-[6px_6px_0_0_rgba(157,142,199,0.25)]"
            >
              {/* Embossed Corner Rivet Pins */}
              <div className="absolute top-2.5 left-2.5 h-1.5 w-1.5 rounded-full bg-[#9B8EC7]" />
              <div className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-[#9B8EC7]" />
              <div className="absolute bottom-2.5 left-2.5 h-1.5 w-1.5 rounded-full bg-[#9B8EC7]" />
              <div className="absolute bottom-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-[#9B8EC7]" />

              <div className="flex items-center justify-between border-b border-[#9B8EC7]/30 pb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-none bg-[#9B8EC7]" />
                  <span className="font-bold tracking-widest text-[#1A1820] uppercase">
                    ENTERPRISE COVENANT SEAL
                  </span>
                </div>
                <span className="rounded-none bg-[#9B8EC7] px-2 py-0.5 font-mono text-[10px] font-bold text-[#F2EAE0]">
                  FIT: 96.4% TIER-1 ICP ✓
                </span>
              </div>

              <div className="mt-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between border-b border-[#9B8EC7]/15 py-1">
                  <span className="text-[#1A1820]/60">Fleet Volume</span>
                  <span className="font-semibold text-[#1A1820]">120 Fleet Trucks (Routing + Fuel)</span>
                </div>
                <div className="flex justify-between border-b border-[#9B8EC7]/15 py-1">
                  <span className="text-[#1A1820]/60">Contract ARR</span>
                  <span className="font-bold text-[#9B8EC7]">₹18,00,000 / yr</span>
                </div>
                <div className="flex justify-between border-b border-[#9B8EC7]/15 py-1">
                  <span className="text-[#1A1820]/60">CRM Status</span>
                  <span className="font-medium text-[#1A1820]">HubSpot Deal #OPP-892 Locked</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#1A1820]/60">Calendar Sync</span>
                  <span className="font-bold text-[#1A1820]">Thu 3:30 PM (Executive AE Locked)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Interactive State Control Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-[#9B8EC7]/20 pt-4 font-mono text-xs">
        {/* Play / Pause & Step Navigation Controls */}
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
