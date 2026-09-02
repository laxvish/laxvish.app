"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const TOTAL_PHASES = 6;

const PHASES = [
  { id: 0, title: "00 · Quiescent", label: "0.0 PSI · Titanium Vessel in Equilibrium" },
  { id: 1, title: "01 · Surge", label: "98.4 PSI · Bourdon Tube Critical Distress Spike" },
  { id: 2, title: "02 · Dampening", label: "62.0 PSI · Thread Magnetic Wave Dissipation" },
  { id: 3, title: "03 · Triad", label: "24.5 PSI · 3 Titanium Root Cause Pillars" },
  { id: 4, title: "04 · Forge", label: "6.0 PSI · STS Cryptographic Key Forge" },
  { id: 5, title: "05 · Calm", label: "0.0 PSI · Absolute Equilibrium Restored ✓" },
];

export function SupportScene() {
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

  // Helper for Bourdon Gauge needle angle (0 to 120 PSI mapped across 270 degrees: -135deg to +135deg)
  const getGaugeAngle = (p: number) => {
    switch (p) {
      case 0: return -135; // 0 PSI
      case 1: return 86;   // 98.4 PSI
      case 2: return 4.5;  // 62.0 PSI
      case 3: return -80;  // 24.5 PSI
      case 4: return -121; // 6.0 PSI
      case 5: return -135; // 0.0 PSI
      default: return -135;
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[520px] w-full flex-col justify-between overflow-hidden rounded-none bg-[#F2EAE0] p-6 text-[#1A1820] sm:p-8 border border-[#9B8EC7]/25 shadow-sm"
      style={{ perspective: "1000px" }}
    >
      {/* Background Architectural Blueprint Grid */}
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
      <div className="pointer-events-none absolute top-3 left-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 00.14.CRU</div>
      <div className="pointer-events-none absolute top-3 right-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 00.14.PSI</div>
      <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 00.14.KEY</div>
      <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 00.14.CALM</div>

      {/* Titanium Crucible Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[#9B8EC7]/20 pb-3.5 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-2 w-2 rounded-full transition-colors duration-300 ${
              phase === 1 ? "bg-[#9B8EC7] animate-ping" : "bg-[#9B8EC7] animate-pulse"
            }`}
          />
          <span className="font-semibold tracking-[0.2em] text-[#1A1820] uppercase">
            ARTIFACT II : THE HIGH-PRESSURE TITANIUM CRUCIBLE
          </span>
        </div>

        {/* Real-time Bourdon Tube PSI Readout */}
        <div className="flex items-center gap-2">
          <span className="rounded-none border border-[#9B8EC7] bg-[#EDE3D2] px-3 py-1 font-mono text-[11px] font-medium text-[#1A1820]">
            {PHASES[phase].label}
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
          {/* Phase 0: Quiescent Equilibrium · Titanium Vessel in Vacuum */}
          {phase === 0 && (
            <motion.div
              key="phase-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Machined Titanium Crucible Outer Casing & Bourdon Gauge */}
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-[#1A1820] bg-[#EDE3D2] shadow-md">
                {/* 12 Perimeter Hex Bolts */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <div
                    key={deg}
                    className="absolute h-1.5 w-1.5 rounded-full bg-[#1A1820]"
                    style={{
                      transform: `rotate(${deg}deg) translate(0, -62px)`,
                    }}
                  />
                ))}

                {/* 270° Circular Bourdon Tube PSI Gauge */}
                <svg viewBox="0 0 100 100" className="h-28 w-28 overflow-visible">
                  {/* Gauge Arc 270 Degrees */}
                  <path
                    d="M 22,78 A 40,40 0 1,1 78,78"
                    fill="none"
                    stroke="#1A1820"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Calibrated Tick Marks */}
                  <line x1="22" y1="78" x2="26" y2="74" stroke="#9B8EC7" strokeWidth="2" />
                  <line x1="10" y1="50" x2="16" y2="50" stroke="#1A1820" strokeWidth="1.5" />
                  <line x1="22" y1="22" x2="26" y2="26" stroke="#1A1820" strokeWidth="1.5" />
                  <line x1="50" y1="10" x2="50" y2="16" stroke="#1A1820" strokeWidth="2" />
                  <line x1="78" y1="22" x2="74" y2="26" stroke="#9B8EC7" strokeWidth="1.5" />
                  <line x1="90" y1="50" x2="84" y2="50" stroke="#9B8EC7" strokeWidth="1.5" />
                  <line x1="78" y1="78" x2="74" y2="74" stroke="#9B8EC7" strokeWidth="2" />

                  {/* Pressure Needle at 0.0 PSI */}
                  <motion.line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="18"
                    stroke="#9B8EC7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      originX: "50px",
                      originY: "50px",
                      rotate: getGaugeAngle(0),
                    }}
                  />
                  <circle cx="50" cy="50" r="4" fill="#1A1820" />
                </svg>

                <div className="absolute bottom-2 font-mono text-[9px] font-bold text-[#1A1820]">
                  0.0 PSI · VACUUM
                </div>
              </div>

              <p className="max-w-md font-mono text-xs text-[#1A1820]/70">
                The high-pressure titanium vessel rests in vacuum. Ready to absorb enterprise friction without fatigue.
              </p>
            </motion.div>
          )}

          {/* Phase 1: Pressure Spike · Inbound Distress Packets */}
          {phase === 1 && (
            <motion.div
              key="phase-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex w-full max-w-lg flex-col items-center gap-2.5 font-mono text-xs"
            >
              {/* Bourdon Tube Gauge reading 98.4 PSI */}
              <div className="flex items-center justify-between w-full border border-[#9B8EC7] bg-[#EDE3D2] px-4 py-2">
                <span className="font-bold text-[#9B8EC7]">BOURDON GAUGE: CRITICAL SPIKE</span>
                <span className="font-bold text-[#1A1820]">98.4 PSI · SURGE TREMOR</span>
              </div>

              {/* Jittering Distress Packet 1 */}
              <motion.div
                animate={{ x: [-2, 2, -2], rotate: [-0.5, 0.5, -0.5] }}
                transition={{ repeat: Infinity, duration: 0.3 }}
                className="w-full rounded-none border border-[#9B8EC7] bg-[#EDE3D2] p-3 text-left"
              >
                <div className="flex justify-between border-b border-[#9B8EC7]/20 pb-1 text-[9px] text-[#1A1820]">
                  <span className="font-bold text-[#9B8EC7]">DISPATCH STREAM #994</span>
                  <span className="font-bold">SEVERITY 1 · ESCALATED</span>
                </div>
                <p className="mt-1.5 text-xs text-[#1A1820]">
                  &ldquo;I can&rsquo;t login to the production dashboard since 9:00 AM!&rdquo;
                </p>
              </motion.div>

              {/* Jittering Distress Packet 2 */}
              <motion.div
                animate={{ x: [2, -2, 2], rotate: [0.5, -0.5, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.35, delay: 0.05 }}
                className="w-full rounded-none border border-[#9B8EC7] bg-[#EDE3D2] p-3 text-left"
              >
                <div className="flex justify-between border-b border-[#9B8EC7]/20 pb-1 text-[9px] text-[#1A1820]">
                  <span className="font-bold text-[#9B8EC7]">WHATSAPP VIP ESCALATION</span>
                  <span className="font-bold">UNRESOLVED · TIMEOUT</span>
                </div>
                <p className="mt-1.5 text-xs text-[#1A1820]">
                  &ldquo;Password reset link never arrived in my inbox or phone.&rdquo;
                </p>
              </motion.div>

              {/* Jittering Distress Packet 3 */}
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 0.28, delay: 0.1 }}
                className="w-full rounded-none border border-[#9B8EC7] bg-[#EDE3D2] p-3 text-left"
              >
                <div className="flex justify-between border-b border-[#9B8EC7]/20 pb-1 text-[9px] text-[#1A1820]">
                  <span className="font-bold text-[#9B8EC7]">EXECUTIVE BOARD ALERT</span>
                  <span className="font-bold">URGENT (15 MINS)</span>
                </div>
                <p className="mt-1.5 text-xs text-[#1A1820]">
                  &ldquo;Need access immediately! Annual Board Meeting starts in 15 mins!&rdquo;
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Phase 2: Magnetic Thread Wave Dissipation */}
          {phase === 2 && (
            <motion.div
              key="phase-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex w-full max-w-lg flex-col items-center justify-center py-4"
            >
              <div className="flex items-center justify-between w-full border border-[#9B8EC7] bg-[#EDE3D2] px-4 py-2 mb-2 font-mono text-xs">
                <span className="font-bold text-[#9B8EC7]">MAGNETIC WAVE DAMPENING</span>
                <span className="font-bold text-[#1A1820]">PRESSURE DISSIPATING: 62.0 PSI</span>
              </div>

              <svg viewBox="0 0 500 90" className="h-24 w-full overflow-visible">
                <motion.path
                  d="M 20,45 Q 140,5 250,45 T 480,45"
                  stroke="#9B8EC7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="250"
                  cy="45"
                  r="6"
                  fill="#1A1820"
                  stroke="#9B8EC7"
                  strokeWidth="2"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />
              </svg>

              <span className="font-mono text-xs font-semibold tracking-wider text-[#1A1820]">
                MAGNETIC DAMPENING FIELD ABSORBING DISTRESS ENERGY
              </span>
            </motion.div>
          )}

          {/* Phase 3: Root Cause Isolation · 3 Core Pillars */}
          {phase === 3 && (
            <motion.div
              key="phase-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex w-full max-w-lg flex-col items-center gap-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between w-full border border-[#9B8EC7] bg-[#EDE3D2] px-4 py-2 font-mono text-xs">
                <span className="font-bold text-[#9B8EC7]">ROOT CAUSE CONDENSATION</span>
                <span className="font-bold text-[#1A1820]">PRESSURE: 24.5 PSI</span>
              </div>

              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
                {[
                  { tag: "IDENTITY", val: "rajiv@apexcap.in (Verified Okta SSO)" },
                  { tag: "AUTH FAULT", val: "SAML Session Revoked by Timeout" },
                  { tag: "TARGET ROLE", val: "Tier-1 Board Executive Clearance" },
                ].map((pillar, idx) => (
                  <motion.div
                    key={pillar.tag}
                    initial={{ scale: 0.9, y: 15, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.12 }}
                    className="flex flex-col rounded-none border border-[#9B8EC7] bg-[#EDE3D2] p-3 text-left text-[#1A1820]"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#9B8EC7]">
                      {pillar.tag}
                    </span>
                    <span className="mt-1 text-xs font-semibold text-[#1A1820] leading-tight">
                      {pillar.val}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Phase 4: Cryptographic Key Forge */}
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
                <span className="font-bold tracking-widest text-[#9B8EC7]">KEY FORGE</span>
              </div>
              <div className="rounded-none border border-[#9B8EC7] bg-[#EDE3D2] px-6 py-3 text-center text-[#1A1820]">
                <span className="text-[#1A1820]/70">STS Security Governance Check: </span>
                <strong className="font-semibold text-[#1A1820]">
                  Zero-Trust Cryptographic Key Stamped · PSI Dropping to 6.0 PSI ✓
                </strong>
              </div>
            </motion.div>
          )}

          {/* Phase 5: Cryptographic Master Key & Absolute Equilibrium (0.0 PSI) */}
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
                    ABSOLUTE EQUILIBRIUM RESTORED
                  </span>
                </div>
                <span className="rounded-none bg-[#9B8EC7] px-2 py-0.5 font-mono text-[10px] font-bold text-[#F2EAE0]">
                  0.0 PSI · 1.4s TOTAL ELAPSED ✓
                </span>
              </div>

              <div className="mt-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between border-b border-[#9B8EC7]/15 py-1">
                  <span className="text-[#1A1820]/60">Okta SSO Session</span>
                  <span className="font-semibold text-[#1A1820]">Re-Authenticated (Key #K-4091)</span>
                </div>
                <div className="flex justify-between border-b border-[#9B8EC7]/15 py-1">
                  <span className="text-[#1A1820]/60">VIP Direct Channel</span>
                  <span className="font-bold text-[#9B8EC7]">WhatsApp Magic Link Pushed</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#1A1820]/60">Board Room State</span>
                  <span className="font-semibold text-[#1A1820]">Executive Access Live (0 Tickets Pending)</span>
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
