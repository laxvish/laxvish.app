"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function SupportScene() {
  const [shot, setShot] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!isAutoPlay) return;
    const timers = [
      setTimeout(() => setShot(1), 1600), // Shot 1: Pressure Spike (Panic Messages)
      setTimeout(() => setShot(2), 3600), // Shot 2: Thread Magnetic Dampening Wave
      setTimeout(() => setShot(3), 5600), // Shot 3: Chaos liquefies into 3 Core Pillars
      setTimeout(() => setShot(4), 7600), // Shot 4: Brakes Cryptographic Forge Check
      setTimeout(() => setShot(5), 9600), // Shot 5: Cryptographic Key & Oceanic Calm (0 PSI)
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
      className="relative flex min-h-[480px] w-full flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#080B12] p-6 text-white sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-cyan-500/20"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Dynamic Ambient Lighting: Red Alert transitioning to Deep Cyan/Indigo Calm */}
      <div
        className={`pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full blur-[100px] transition-all duration-1000 ${
          shot === 1 ? "bg-red-600/25" : "bg-cyan-500/15"
        }`}
      />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#06b6d4_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.05]" />

      {/* Titanium Crucible Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-2.5 w-2.5 rounded-full transition-colors duration-500 ${
              shot === 1
                ? "bg-red-500 shadow-[0_0_10px_#ef4444] animate-ping"
                : "bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse"
            }`}
          />
          <span className="font-bold tracking-[0.2em] text-cyan-300 uppercase">
            ARTIFACT II : THE PRESSURE CRUCIBLE
          </span>
        </div>

        {/* Analog Pressure Meter */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-white/50 uppercase">Crucible PSI:</span>
          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs">
            <span
              className={`font-bold transition-colors ${
                shot === 1 ? "text-red-400" : shot === 5 ? "text-emerald-400" : "text-cyan-300"
              }`}
            >
              {shot === 0 && "0 PSI · STABLE"}
              {shot === 1 && "98 PSI · CRITICAL SPIKE"}
              {shot === 2 && "62 PSI · DAMPENING"}
              {shot === 3 && "24 PSI · CONDENSING"}
              {shot === 4 && "6 PSI · BRAKES LOCK"}
              {shot === 5 && "0 PSI · ABSOLUTE EQUILIBRIUM ✓"}
            </span>
          </div>
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
          {/* Shot 0: Deep Equilibrium */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-md">
                <span className="h-3 w-3 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <p className="font-serif text-sm italic text-cyan-100/60 max-w-sm">
                The crucible rests in vacuum. Ready to absorb enterprise friction.
              </p>
            </motion.div>
          )}

          {/* Shot 1: Chaotic Misaligned Red Distress Shards */}
          {shot === 1 && (
            <motion.div
              key="shot-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex w-full max-w-md flex-col gap-3 font-mono text-xs"
            >
              <motion.div
                animate={{ x: [-3, 3, -3], rotate: [-2, -3, -2] }}
                transition={{ repeat: Infinity, duration: 0.3 }}
                className="rounded-2xl border-2 border-red-500/80 bg-red-950/70 p-3.5 text-left text-red-100 shadow-[0_0_25px_rgba(239,68,68,0.4)]"
              >
                <div className="flex justify-between text-[9px] text-red-300/60 pb-1">
                  <span>DISPATCH STREAM #994</span>
                  <span className="font-bold text-red-400">SEVERITY 1</span>
                </div>
                &ldquo;I can&rsquo;t login to the production dashboard since 9:00 AM!&rdquo;
              </motion.div>

              <motion.div
                animate={{ x: [3, -3, 3], rotate: [2, 1, 2] }}
                transition={{ repeat: Infinity, duration: 0.35, delay: 0.1 }}
                className="rounded-2xl border-2 border-amber-500/80 bg-amber-950/70 p-3.5 text-left text-amber-100 shadow-[0_0_25px_rgba(245,158,11,0.3)]"
              >
                <div className="flex justify-between text-[9px] text-amber-300/60 pb-1">
                  <span>WHATSAPP VIP ESCALATION</span>
                  <span className="font-bold text-amber-400">UNRESOLVED</span>
                </div>
                &ldquo;Password reset link never arrived in my inbox or phone.&rdquo;
              </motion.div>

              <motion.div
                animate={{ y: [-2, 2, -2], rotate: [-1, 0, -1] }}
                transition={{ repeat: Infinity, duration: 0.25, delay: 0.2 }}
                className="rounded-2xl border-2 border-rose-500/80 bg-rose-950/70 p-3.5 text-left text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.4)] font-semibold"
              >
                <div className="flex justify-between text-[9px] text-rose-300/60 pb-1">
                  <span>EXECUTIVE BOARD ALERT</span>
                  <span className="font-bold text-rose-300">URGENT (15 MINS)</span>
                </div>
                &ldquo;Need access immediately! Annual Board Meeting starts in 15 mins!&rdquo;
              </motion.div>
            </motion.div>
          )}

          {/* Shot 2: The Laxvish Thread creates a Magnetic Dampening Wave */}
          {shot === 2 && (
            <motion.div
              key="shot-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex w-full max-w-lg flex-col items-center justify-center py-4"
            >
              <svg viewBox="0 0 500 100" className="h-24 w-full overflow-visible">
                {/* Magnetic Wave Barrier */}
                <motion.path
                  d="M 20,50 Q 150,5 250,50 T 480,50"
                  stroke="#22D3EE"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  filter="drop-shadow(0 0 15px rgba(34,211,238,0.9))"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="250"
                  cy="50"
                  r="7"
                  fill="#22D3EE"
                  animate={{ scale: [1, 1.5, 1], boxShadow: ["0 0 20px #22D3EE"] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              </svg>
              <span className="font-mono text-xs font-bold tracking-wider text-cyan-300">
                MAGNETIC DAMPENING FIELD ENGAGED · TRACING ROOT CAUSE
              </span>
            </motion.div>
          )}

          {/* Shot 3: Chaos liquefies into 3 Pure Pillars */}
          {shot === 3 && (
            <motion.div
              key="shot-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs"
            >
              {[
                { tag: "IDENTITY", val: "rajiv@apexcap.in (Verified Okta SSO)", color: "border-cyan-400 bg-cyan-950/60 text-cyan-200" },
                { tag: "AUTH FAULT", val: "SAML Session Revoked by Timeout", color: "border-amber-400 bg-amber-950/60 text-amber-200" },
                { tag: "TARGET ROLE", val: "Tier-1 Board Executive Clearance", color: "border-emerald-400 bg-emerald-950/60 text-emerald-200" },
              ].map((pillar, idx) => (
                <motion.div
                  key={pillar.tag}
                  initial={{ scale: 0.8, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.15 }}
                  className={`flex items-center gap-2.5 rounded-2xl border-2 px-4 py-3 shadow-xl backdrop-blur-md ${pillar.color}`}
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider">{pillar.tag}</span>
                  <span className="font-bold">✦ {pillar.val}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Shot 4: Brakes Cryptographic Forge Check */}
          {shot === 4 && (
            <motion.div
              key="shot-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 font-mono text-xs"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyan-400 bg-black/80 shadow-[0_0_40px_rgba(34,211,238,0.5)]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                  className="absolute inset-1.5 rounded-full border-t-2 border-emerald-400"
                />
                <span className="text-xs font-bold tracking-widest text-cyan-300">BRAKES</span>
              </div>
              <div className="rounded-2xl border border-cyan-400/40 bg-cyan-950/40 px-5 py-2.5 text-cyan-200 backdrop-blur-md">
                <span>Security Governance Audit: </span>
                <strong className="text-emerald-400">Zero-Trust STS Elevation Approved ✓</strong>
              </div>
            </motion.div>
          )}

          {/* Shot 5: Cryptographic Master Key & Oceanic Equilibrium */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.88, rotateX: -20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative w-full max-w-md rounded-3xl border-2 border-emerald-400/60 bg-gradient-to-b from-[#0F1B1A] to-[#080E10] p-6 text-left shadow-[0_0_60px_rgba(52,211,153,0.35)]"
            >
              <div className="flex items-center justify-between border-b border-emerald-400/20 pb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  <span className="font-bold tracking-widest text-emerald-300 uppercase">
                    EQUILIBRIUM RESTORED
                  </span>
                </div>
                <span className="font-mono font-bold text-emerald-400">1.4s TOTAL ELAPSED ✓</span>
              </div>

              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Okta SSO Session</span>
                  <span className="font-bold text-emerald-300">Re-Authenticated (Key #K-4091)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">VIP Channel</span>
                  <span className="text-white font-medium">WhatsApp OTP & Direct Magic Link Pushed</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/40">Board Room State</span>
                  <span className="font-bold text-cyan-300">Executive Access Live (0 Tickets Pending)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
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
                shot === i ? "w-8 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              title={`Jump to Shot ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase text-cyan-300/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>High-Pressure Friction → Oceanic Calm</span>
        </div>
      </div>
    </div>
  );
}
