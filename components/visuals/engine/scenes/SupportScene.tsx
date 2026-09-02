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
      className="relative flex min-h-[480px] w-full flex-col justify-between overflow-hidden rounded-none bg-[#F2EAE0] p-6 text-charcoal sm:p-10 border border-vaultAmber/20"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Dynamic Ambient Lighting: Heat dissolving into Champagne/Silver Equilibrium */}
      <div
        className={`pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full transition-all duration-1000 ${ shot === 1 ? "bg-[#8C4E36]/20" : "bg-vaultAmber/10" }`}
      />
      
      <div className="pointer-events-none absolute inset-0 [background-size:28px_28px] opacity-30" />

      {/* Titanium Crucible Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-vaultAmber/15 pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-2 w-2 rounded-full transition-colors duration-500 ${ shot === 1 ? "bg-[#C46B4E]0_0_8px_#C46B4E] animate-ping" : "bg-mark animate-pulse" }`}
          />
          <span className="font-medium tracking-[0.2em] text-vaultAmber uppercase">
            ARTIFACT II : THE PRESSURE CRUCIBLE
          </span>
        </div>

        {/* Analog Pressure Meter */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-charcoal/50 uppercase">Crucible PSI:</span>
          <div className="flex items-center gap-1.5 rounded-full border border-vaultAmber/30 bg-voidSurface px-3 py-1 font-mono text-xs">
            <span
              className={`font-semibold transition-colors ${ shot === 1 ? "text-[#E08A6F]" : shot === 5 ? "text-neonCyan" : "text-vaultAmber" }`}
            >
              {shot === 0 && "0.0 PSI · STABLE VACUUM"}
              {shot === 1 && "98.4 PSI · CRITICAL SPIKE"}
              {shot === 2 && "62.0 PSI · DAMPENING WAVE"}
              {shot === 3 && "24.5 PSI · CONDENSING PILLARS"}
              {shot === 4 && "6.0 PSI · BRAKES LOCK"}
              {shot === 5 && "0.0 PSI · ABSOLUTE EQUILIBRIUM ✓"}
            </span>
          </div>
        </div>
      </div>

      {/* 3D Spatial Canvas */}
      <motion.div
        animate={{
          rotateX: -mousePos.y * 10,
          rotateY: mousePos.x * 10,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
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
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-vaultAmber/25 bg-voidSurface ">
                <span className="h-2.5 w-2.5 rounded-full bg-vaultAmber animate-ping" />
              </div>
              <p className="font-mono text-sm text-charcoal/50 max-w-sm">
                The crucible rests in vacuum. Ready to absorb enterprise friction.
              </p>
            </motion.div>
          )}

          {/* Shot 1: Distress Shards under Heat */}
          {shot === 1 && (
            <motion.div
              key="shot-1"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex w-full max-w-md flex-col gap-2.5 font-mono text-xs"
            >
              <motion.div
                animate={{ x: [-2, 2, -2], rotate: [-1, -2, -1] }}
                transition={{ repeat: Infinity, duration: 0.4 }}
                className="rounded-2xl border border-[#A8583E]/50 bg-[#1A0E0A] p-3.5 text-left text-charcoal0_0_20px_rgba(168,88,62,0.25)]"
              >
                <div className="flex justify-between text-[9px] text-[#C46B4E] pb-1">
                  <span>DISPATCH STREAM #994</span>
                  <span className="font-bold">SEVERITY 1</span>
                </div>
                &ldquo;I can&rsquo;t login to the production dashboard since 9:00 AM!&rdquo;
              </motion.div>

              <motion.div
                animate={{ x: [2, -2, 2], rotate: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.45, delay: 0.1 }}
                className="rounded-2xl border border-vaultAmber/40 bg-voidSurface p-3.5 text-left text-charcoal "
              >
                <div className="flex justify-between text-[9px] text-vaultAmber pb-1">
                  <span>WHATSAPP VIP ESCALATION</span>
                  <span className="font-bold">UNRESOLVED</span>
                </div>
                &ldquo;Password reset link never arrived in my inbox or phone.&rdquo;
              </motion.div>

              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 0.35, delay: 0.2 }}
                className="rounded-2xl border border-[#A8583E]/60 bg-[#1A0E0A] p-3.5 text-left text-charcoal0_0_20px_rgba(168,88,62,0.25)]"
              >
                <div className="flex justify-between text-[9px] text-[#C46B4E] pb-1">
                  <span>EXECUTIVE BOARD ALERT</span>
                  <span className="font-bold">URGENT (15 MINS)</span>
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
                <motion.path
                  d="M 20,50 Q 150,5 250,50 T 480,50"
                  stroke="#9B8EC7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  filter="drop-shadow(0 0 10px rgba(157,142,199,0.85))"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="250"
                  cy="50"
                  r="6"
                  fill="#9B8EC7"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />
              </svg>
              <span className="font-mono text-xs font-semibold tracking-wider text-vaultAmber">
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
                { tag: "IDENTITY", val: "rajiv@apexcap.in (Verified Okta SSO)" },
                { tag: "AUTH FAULT", val: "SAML Session Revoked by Timeout" },
                { tag: "TARGET ROLE", val: "Tier-1 Board Executive Clearance" },
              ].map((pillar, idx) => (
                <motion.div
                  key={pillar.tag}
                  initial={{ scale: 0.8, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex items-center gap-2.5 rounded-none border border-mark bg-voidSurface px-4 py-3 text-charcoal"
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider text-vaultAmber">{pillar.tag}:</span>
                  <span className="font-semibold text-neonCyan">{pillar.val}</span>
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
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-vaultAmber bg-black0_0_30px_rgba(157,142,199,0.3)]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-1.5 rounded-full border-t border-vaultAmber"
                />
                <span className="text-xs font-bold tracking-widest text-vaultAmber">BRAKES</span>
              </div>
              <div className="rounded-none border border-mark bg-voidSurface px-5 py-2.5 text-charcoal ">
                <span className="text-charcoal/70">Security Governance Audit: </span>
                <strong className="text-neonCyan">Zero-Trust STS Elevation Approved ✓</strong>
              </div>
            </motion.div>
          )}

          {/* Shot 5: Cryptographic Master Key & Oceanic Equilibrium */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="relative w-full max-w-md rounded-none border border-mark bg-voidSurface p-6 text-left0_20px_60px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center justify-between border-b border-vaultAmber/20 pb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-mark" />
                  <span className="font-bold tracking-widest text-vaultAmber uppercase">
                    EQUILIBRIUM RESTORED
                  </span>
                </div>
                <span className="font-mono font-bold text-neonCyan">1.4s TOTAL ELAPSED ✓</span>
              </div>

              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-rule-hair">
                  <span className="text-charcoal/40">Okta SSO Session</span>
                  <span className="font-medium text-vaultAmber">Re-Authenticated (Key #K-4091)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rule-hair">
                  <span className="text-charcoal/40">VIP Channel</span>
                  <span className="text-charcoal">WhatsApp OTP & Direct Magic Link Pushed</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-charcoal/40">Board Room State</span>
                  <span className="font-bold text-neonCyan">Executive Access Live (0 Tickets Pending)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-vaultAmber/15 pt-4 font-mono text-[11px] text-charcoal/50">
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIsAutoPlay(false);
                setShot(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${ shot === i ? "w-8 bg-mark" : "w-2 bg-charcoal/20 hover:bg-charcoal/40" }`}
              title={`Jump to Shot 0${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase text-vaultAmber/80">
          <span className="h-1.5 w-1.5 rounded-full bg-vaultAmber" />
          <span>High-Pressure Friction → Oceanic Calm</span>
        </div>
      </div>
    </div>
  );
}
