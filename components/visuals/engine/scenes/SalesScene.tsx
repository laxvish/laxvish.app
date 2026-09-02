"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function SalesScene() {
  const [shot, setShot] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!isAutoPlay) return;
    const timers = [
      setTimeout(() => setShot(1), 1600), // Shot 1: Call vibrations awaken
      setTimeout(() => setShot(2), 3400), // Shot 2: 3D Acoustic Waveform erupts
      setTimeout(() => setShot(3), 5200), // Shot 3: Golden Thread strikes & crystallizes
      setTimeout(() => setShot(4), 7000), // Shot 4: Semantic shards orbit nucleus
      setTimeout(() => setShot(5), 9000), // Shot 5: Embossed Gilded Enterprise Deal Seal
      setTimeout(() => setShot(0), 13000), // Reset
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
      className="relative flex min-h-[480px] w-full flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#0A0C10] p-6 text-white sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-white/10"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Ambient Radial Golden/Emerald Backlight */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.04]" />

      {/* Machined Brass Monolith Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse" />
          <span className="font-bold tracking-[0.2em] text-amber-300 uppercase">ARTIFACT I : THE ACOUSTIC MONOLITH</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[10px] font-semibold text-amber-200">
            {shot === 0 && "Standby · 48kHz Telephony Line"}
            {shot === 1 && "Call Contact · Voice Pressure Detected"}
            {shot === 2 && "Acoustic Resonance Shards Rising"}
            {shot === 3 && "Golden Thread Isolating Intent"}
            {shot === 4 && "Semantic Nucleus Orbiting"}
            {shot === 5 && "Gilded Enterprise Opportunity Sealed ✓"}
          </span>
        </div>
      </div>

      {/* 3D Interactive Spatial Stage */}
      <motion.div
        animate={{
          rotateX: -mousePos.y * 12,
          rotateY: mousePos.x * 12,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6 text-center"
      >
        <AnimatePresence mode="wait">
          {/* Shot 0: Dormant Acoustic Monolith in deep space */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl shadow-2xl">
                <svg className="h-10 w-10 text-amber-300/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
                {/* Floating frequency rings */}
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -inset-3 rounded-3xl border border-amber-400/20 pointer-events-none"
                />
              </div>
              <p className="font-serif text-sm italic text-white/50 max-w-sm">
                Awaiting inbound enterprise voice stream. The air is still.
              </p>
            </motion.div>
          )}

          {/* Shot 1: Physical call vibration shockwave */}
          {shot === 1 && (
            <motion.div
              key="shot-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 0.98, 1.05, 1], rotate: [-2, 2, -1, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="relative flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-amber-400/20 via-neutral-900 to-black p-4 shadow-[0_0_50px_rgba(245,158,11,0.4)]"
              >
                <svg className="h-12 w-12 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {/* Acoustic shockwave ripples */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-0 rounded-3xl border-2 border-amber-400"
                />
              </motion.div>
              <div className="font-mono text-sm font-bold tracking-wider text-amber-200">
                INBOUND HIGH-STAKES CALL · FLEET VP CONNECTED
              </div>
            </motion.div>
          )}

          {/* Shot 2: 3D Acoustic Waveform Erupts */}
          {shot === 2 && (
            <motion.div
              key="shot-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full max-w-lg flex-col items-center gap-4"
            >
              {/* Spoken Word Floating Holograph */}
              <div className="relative rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-md text-left shadow-2xl">
                <div className="flex items-center justify-between font-mono text-[10px] text-amber-300">
                  <span>VOICE PRESSURE: 84 dB</span>
                  <span>SPECTROGRAM LOCK</span>
                </div>
                <p className="mt-2 font-serif text-base italic text-amber-100/90 leading-relaxed">
                  &ldquo;Need to automate dispatch routing and fuel reconciliation for 120 fleet trucks before Q3 close...&rdquo;
                </p>
              </div>

              {/* Holographic Glowing Sine Waves */}
              <svg viewBox="0 0 450 60" className="h-16 w-full overflow-visible">
                <motion.path
                  d="M 0,30 Q 40,5 80,30 T 160,30 T 240,30 T 320,30 T 400,30 T 450,30"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  fill="none"
                  filter="drop-shadow(0 0 8px rgba(245,158,11,0.8))"
                  animate={{
                    d: [
                      "M 0,30 Q 40,5 80,30 T 160,30 T 240,30 T 320,30 T 400,30 T 450,30",
                      "M 0,30 Q 40,55 80,30 T 160,30 T 240,30 T 320,30 T 400,30 T 450,30",
                      "M 0,30 Q 40,5 80,30 T 160,30 T 240,30 T 320,30 T 400,30 T 450,30",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          )}

          {/* Shot 3 & 4: Golden Thread strikes & Crystallizes meaning shards */}
          {(shot === 3 || shot === 4) && (
            <motion.div
              key="shot-3-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex flex-col items-center justify-center gap-4"
            >
              <div className="relative flex h-40 w-full max-w-lg items-center justify-center">
                {/* Central Glowing Thread Filament */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], boxShadow: ["0 0 20px #10B981", "0 0 40px #F59E0B", "0 0 20px #10B981"] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="h-14 w-14 rounded-full border-2 border-amber-300 bg-black flex items-center justify-center font-mono text-xs font-bold text-amber-200"
                >
                  NUCLEUS
                </motion.div>

                {/* Floating Crystalline Meaning Shards */}
                {[
                  { label: "Dispatch Routing", x: -140, y: -40, delay: 0 },
                  { label: "Fuel Reconciliation", x: 140, y: -30, delay: 0.1 },
                  { label: "120 Commercial Trucks", x: -110, y: 50, delay: 0.2 },
                  { label: "Target Q3 Deployment", x: 120, y: 45, delay: 0.3 },
                ].map((shard) => (
                  <motion.div
                    key={shard.label}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{
                      x: shard.x,
                      y: shard.y,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.7, delay: shard.delay }}
                    className="absolute rounded-xl border border-amber-400/40 bg-gradient-to-r from-amber-500/20 to-neutral-900/90 px-3 py-1.5 font-mono text-xs text-amber-200 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.25)] whitespace-nowrap"
                  >
                    ✦ {shard.label}
                  </motion.div>
                ))}
              </div>
              <span className="font-mono text-xs text-amber-300/80">
                The Laxvish Thread freezes raw audio into physical geometric certainty.
              </span>
            </motion.div>
          )}

          {/* Shot 5: Gilded Enterprise Opportunity Deal Seal */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.85, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative w-full max-w-md rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-[#16181F] to-[#0A0C10] p-6 text-left shadow-[0_0_60px_rgba(245,158,11,0.35)]"
            >
              {/* Embossed Corner Brass Screws */}
              <div className="absolute top-3 left-3 h-2 w-2 rounded-full border border-amber-400/40 bg-amber-500/20" />
              <div className="absolute top-3 right-3 h-2 w-2 rounded-full border border-amber-400/40 bg-amber-500/20" />
              <div className="absolute bottom-3 left-3 h-2 w-2 rounded-full border border-amber-400/40 bg-amber-500/20" />
              <div className="absolute bottom-3 right-3 h-2 w-2 rounded-full border border-amber-400/40 bg-amber-500/20" />

              <div className="flex items-center justify-between border-b border-amber-400/20 pb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span className="font-bold tracking-widest text-amber-300 uppercase">ENTERPRISE DEAL SEAL</span>
                </div>
                <span className="font-mono font-bold text-emerald-400">FIT: 96.4% ICP ✓</span>
              </div>

              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Scope</span>
                  <span className="font-bold text-amber-100">120 Fleet Trucks (Routing + Fuel)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Contract ARR</span>
                  <span className="font-bold text-emerald-300">₹18,00,000 / yr</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">CRM Status</span>
                  <span className="text-amber-200">HubSpot Deal #OPP-892 Injected</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/40">Calendar Sync</span>
                  <span className="font-bold text-white">Thu 3:30 PM (Executive AE Locked)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Machined Footbar */}
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
                shot === i ? "w-8 bg-amber-400 shadow-[0_0_8px_#f59e0b]" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              title={`Jump to Shot ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase text-amber-300/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Acoustic Waveform → Enterprise Commitment</span>
        </div>
      </div>
    </div>
  );
}
