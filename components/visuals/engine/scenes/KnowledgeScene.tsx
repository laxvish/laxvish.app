"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const TOTAL_PHASES = 6;

const PHASES = [
  { id: 0, title: "00 · Quiescent", label: "4,200 Enterprise Stars in Celestial Silence" },
  { id: 1, title: "01 · Nebula", label: "Astrolabe Coordinate Grid & Memory Vault" },
  { id: 2, title: "02 · Sonar", label: "14ms Radial Sonar Query Wavefront Emitted" },
  { id: 3, title: "03 · Triangulate", label: "3-Star Policy Constellation Awakened" },
  { id: 4, title: "04 · RBAC", label: "Brakes RBAC Clearance & Vector Audit" },
  { id: 5, title: "05 · Tablet", label: "Luminous Citation Tablet (One Calm Truth) ✓" },
];

export function KnowledgeScene() {
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
      {/* Astrolabe Coordinate Grid Background */}
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
      <div className="pointer-events-none absolute top-3 left-3 font-mono text-[9px] text-[#BDA6CE]/60">+ RA 14h 29m</div>
      <div className="pointer-events-none absolute top-3 right-3 font-mono text-[9px] text-[#BDA6CE]/60">+ DEC +62° 40′</div>
      <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[9px] text-[#BDA6CE]/60">+ EPOCH 2025.0</div>
      <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] text-[#BDA6CE]/60">+ 4,200 STARS</div>

      {/* Astrolabe Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[#9B8EC7]/20 pb-3.5 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-[#9B8EC7] animate-pulse" />
          <span className="font-semibold tracking-[0.2em] text-[#1A1820] uppercase">
            ARTIFACT IV : THE KNOWLEDGE CONSTELLATION ASTROLABE
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
          {/* Phase 0: Standby · Quiescent Celestial Vault */}
          {phase === 0 && (
            <motion.div
              key="phase-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-[#1A1820] bg-[#EDE3D2] shadow-md">
                {/* Concentric Astrolabe Declination Rings */}
                <div className="absolute inset-3 rounded-full border border-[#9B8EC7]/40" />
                <div className="absolute inset-7 rounded-full border border-[#9B8EC7]/30" />
                <div className="absolute inset-11 rounded-full border border-[#9B8EC7]/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#9B8EC7] animate-ping" />
                <div className="absolute bottom-1.5 font-mono text-[8px] font-bold text-[#1A1820]/70">
                  ASTROLABE · 4,200 NODES
                </div>
              </div>

              <p className="max-w-md font-mono text-xs text-[#1A1820]/70">
                4,200 company memories suspended across Notion, SharePoint, Google Drive, and PDFs in calm equilibrium.
              </p>
            </motion.div>
          )}

          {/* Phase 1: 4,200-Star Coordinate Grid */}
          {phase === 1 && (
            <motion.div
              key="phase-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex w-full max-w-lg flex-col items-center gap-3"
            >
              {/* Sparse 48-Lattice Representation of 4,200 Corporate Stars */}
              <div className="grid grid-cols-8 gap-3 sm:grid-cols-12 p-3 border border-[#9B8EC7]/30 bg-[#EDE3D2]">
                {Array.from({ length: 48 }).map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      delay: (i % 8) * 0.15,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-[#9B8EC7]"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between w-full font-mono text-[10px] text-[#1A1820]/80">
                <span>ASTROLABE MAP: 4,200+ CORP DOCUMENTS</span>
                <span className="font-semibold text-[#9B8EC7]">ZERO HALLUCINATION RADAR</span>
              </div>
            </motion.div>
          )}

          {/* Phase 2: Radial Sonar Query Wavefront Emitted */}
          {phase === 2 && (
            <motion.div
              key="phase-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex w-full max-w-lg flex-col items-center gap-3"
            >
              <div className="w-full rounded-none border border-[#9B8EC7] bg-[#EDE3D2] p-4 text-left">
                <div className="flex items-center justify-between border-b border-[#9B8EC7]/20 pb-2 font-mono text-[10px] text-[#1A1820]">
                  <span className="font-bold text-[#9B8EC7] uppercase">RADIAL SONAR QUERY PULSE</span>
                  <span className="font-semibold text-[#1A1820]">14ms SEARCH RADAR</span>
                </div>
                <p className="mt-2.5 font-mono text-sm leading-relaxed text-[#1A1820]">
                  &ldquo;What is our travel reimbursement policy for client on-sites exceeding 14 days?&rdquo;
                </p>
              </div>

              {/* Expanding Sonar Shockwave Rings */}
              <div className="relative flex h-16 w-full items-center justify-center">
                <motion.div
                  initial={{ scale: 0.2, opacity: 0.9 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.3, ease: "easeOut" }}
                  className="h-14 w-14 rounded-full border-2 border-[#9B8EC7]"
                />
                <motion.div
                  initial={{ scale: 0.4, opacity: 0.8 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.3, delay: 0.2, ease: "easeOut" }}
                  className="absolute h-14 w-14 rounded-full border border-[#9B8EC7]"
                />
                <span className="font-mono text-xs font-semibold text-[#1A1820]">
                  SONAR PING PENETRATING 4,200 NODES IN 14ms
                </span>
              </div>
            </motion.div>
          )}

          {/* Phase 3: 3-Star Policy Constellation Triangulation */}
          {phase === 3 && (
            <motion.div
              key="phase-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex w-full max-w-lg flex-col items-center justify-center py-2"
            >
              {/* 3 Policy Stars Forming Geometric Triangulation */}
              <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-3 font-mono text-xs text-left">
                {[
                  { title: "HR Handbook 2025 §4.2", desc: "Per-diem rules after day 14", conf: "99.4%" },
                  { title: "Travel Matrix SOP.pdf", desc: "Tier-1 Hotel Bangalore Master Billing", conf: "98.9%" },
                  { title: "Executive SOP #22", desc: "Client billing override pass-through", conf: "97.8%" },
                ].map((star, idx) => (
                  <motion.div
                    key={star.title}
                    initial={{ scale: 0.85, y: 25, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.12, type: "spring" }}
                    className="flex flex-col justify-between rounded-none border border-[#9B8EC7] bg-[#EDE3D2] p-3 text-[#1A1820] shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[8px] text-[#1A1820] pb-1 border-b border-[#9B8EC7]/20">
                        <span className="font-bold text-[#9B8EC7]">POLICY STAR 0{idx + 1}</span>
                        <span className="font-bold">{star.conf}</span>
                      </div>
                      <div className="mt-1.5 font-bold text-[11px] text-[#1A1820] leading-tight">
                        {star.title}
                      </div>
                      <div className="mt-1 text-[10px] text-[#1A1820]/70">
                        {star.desc}
                      </div>
                    </div>
                    <div className="mt-2 font-mono text-[7px] text-[#9B8EC7] font-semibold">
                      VECTOR TRIANGULATION LOCKED
                    </div>
                  </motion.div>
                ))}
              </div>

              <span className="mt-3 font-mono text-xs text-[#1A1820]">
                4,197 irrelevant documents fade into silence. The exact 3 stars ignite.
              </span>
            </motion.div>
          )}

          {/* Phase 4: Brakes RBAC Governance Lock */}
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
                <span className="text-[#1A1820]/70">Access Security & Hallucination Audit: </span>
                <strong className="font-semibold text-[#1A1820]">
                  User RBAC Tier-1 Verified · 100% Deterministic Citation Grounding ✓
                </strong>
              </div>
            </motion.div>
          )}

          {/* Phase 5: Luminous Citation Tablet (One Calm Truth) */}
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
                    THE COMPANY REMEMBERS
                  </span>
                </div>
                <span className="rounded-none bg-[#9B8EC7] px-2 py-0.5 font-mono text-[10px] font-bold text-[#F2EAE0]">
                  SOURCE VERIFIED ✓
                </span>
              </div>

              <div className="mt-4 space-y-3 font-mono text-xs">
                {/* Cormorant Garamond Serif Editorial Quote */}
                <p className="font-serif text-base leading-relaxed text-[#1A1820]">
                  &ldquo;For client on-site deployments exceeding 14 days, the per-diem increases to{" "}
                  <strong className="font-mono text-xs font-bold text-[#9B8EC7]">₹3,500/day</strong>{" "}
                  with direct hotel master-billing and weekend travel allowance.&rdquo;
                </p>

                {/* JetBrains Mono Source Citation */}
                <div className="flex items-center justify-between border border-[#9B8EC7]/30 bg-[#F2EAE0] px-3 py-2 text-[10px] font-mono text-[#1A1820]">
                  <span>Cited: HR-Policy-Handbook-2025.pdf (§4.2, Pg 18)</span>
                  <span className="font-bold text-[#9B8EC7]">RBAC Gated</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Interactive State Control Bar */}
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
