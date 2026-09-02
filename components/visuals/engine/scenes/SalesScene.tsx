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
      setTimeout(() => setShot(2), 3400), // Shot 2: Acoustic Waveform resonates
      setTimeout(() => setShot(3), 5200), // Shot 3: Golden Thread isolates intent
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
      className="relative flex min-h-[480px] w-full flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#07080B] p-6 text-charcoal sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-vaultAmber/20"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Ambient Radial Golden Champagne Backlight */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-vaultAmber/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-vaultAmber/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(182,176,159,0.15)_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />

      {/* Machined Monolith Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-vaultAmber/15 pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-vaultAmber shadow-[0_0_8px_#B6B09F] animate-pulse" />
          <span className="font-medium tracking-[0.2em] text-vaultAmber uppercase">
            ARTIFACT I : THE ACOUSTIC MONOLITH
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-vaultAmber/30 bg-vaultAmber/10 px-3 py-1 font-mono text-[10px] font-medium text-vaultAmber">
            {shot === 0 && "STANDBY · 48kHz TELEPHONY APERTURE"}
            {shot === 1 && "CALL CONTACT · ACOUSTIC VIBRATION"}
            {shot === 2 && "PHONETIC RESONANCE RISING"}
            {shot === 3 && "GOLDEN THREAD ISOLATING INTENT"}
            {shot === 4 && "SEMANTIC SHARDS GRAVITATING"}
            {shot === 5 && "ENTERPRISE COVENANT SEALED ✓"}
          </span>
        </div>
      </div>

      {/* 3D Interactive Spatial Stage */}
      <motion.div
        animate={{
          rotateX: -mousePos.y * 10,
          rotateY: mousePos.x * 10,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6 text-center"
      >
        <AnimatePresence mode="wait">
          {/* Shot 0: Dormant Acoustic Monolith */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-vaultAmber/25 bg-voidSurface backdrop-blur-xl shadow-2xl">
                <svg className="h-10 w-10 text-vaultAmber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
                {/* Floating frequency rings */}
                <motion.div
                  animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ repeat: Infinity, duration: 3.5 }}
                  className="absolute -inset-3 rounded-3xl border border-vaultAmber/20 pointer-events-none"
                />
              </div>
              <p className="font-serif text-sm italic text-charcoal/50 max-w-sm">
                The obelisk stands in silence. Ready to receive the enterprise voice stream.
              </p>
            </motion.div>
          )}

          {/* Shot 1: Call vibration */}
          {shot === 1 && (
            <motion.div
              key="shot-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 0.98, 1.03, 1], rotate: [-1, 1, -1, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-vaultAmber/50 bg-voidSurface p-4 shadow-[0_0_40px_rgba(182,176,159,0.25)]"
              >
                <svg className="h-10 w-10 text-vaultAmber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {/* Acoustic shockwave ripples */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.7 }}
                  animate={{ scale: 2.1, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeOut" }}
                  className="absolute inset-0 rounded-3xl border border-vaultAmber/60"
                />
              </motion.div>
              <div className="font-mono text-xs font-bold tracking-widest text-vaultAmber uppercase">
                INBOUND CALL DETECTED · FLEET DIRECTOR CONNECTED
              </div>
            </motion.div>
          )}

          {/* Shot 2: Acoustic Waveform resonates */}
          {shot === 2 && (
            <motion.div
              key="shot-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full max-w-lg flex-col items-center gap-4"
            >
              <div className="relative rounded-2xl border border-vaultAmber/25 bg-voidSurface p-4 backdrop-blur-md text-left shadow-2xl">
                <div className="flex items-center justify-between font-mono text-[10px] text-vaultAmber">
                  <span>VOICE PRESSURE: 84 dB</span>
                  <span className="text-neonCyan font-bold">SPECTROGRAM LOCKED</span>
                </div>
                <p className="mt-2 font-serif text-base italic text-charcoal/90 leading-relaxed">
                  &ldquo;Need to automate dispatch routing and fuel reconciliation for 120 fleet trucks before Q3 close...&rdquo;
                </p>
              </div>

              {/* Sine Waves */}
              <svg viewBox="0 0 450 60" className="h-16 w-full overflow-visible">
                <motion.path
                  d="M 0,30 Q 40,5 80,30 T 160,30 T 240,30 T 320,30 T 400,30 T 450,30"
                  stroke="#B6B09F"
                  strokeWidth="2"
                  fill="none"
                  filter="drop-shadow(0 0 6px rgba(182,176,159,0.7))"
                  animate={{
                    d: [
                      "M 0,30 Q 40,5 80,30 T 160,30 T 240,30 T 320,30 T 400,30 T 450,30",
                      "M 0,30 Q 40,55 80,30 T 160,30 T 240,30 T 320,30 T 400,30 T 450,30",
                      "M 0,30 Q 40,5 80,30 T 160,30 T 240,30 T 320,30 T 400,30 T 450,30",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          )}

          {/* Shot 3 & 4: Golden Thread strikes & Shards orbit nucleus */}
          {(shot === 3 || shot === 4) && (
            <motion.div
              key="shot-3-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex flex-col items-center justify-center gap-4"
            >
              <div className="relative flex h-40 w-full max-w-lg items-center justify-center">
                {/* Central Thread Nucleus */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], boxShadow: ["0 0 15px rgba(182,176,159,0.3)", "0 0 35px rgba(182,176,159,0.6)", "0 0 15px rgba(182,176,159,0.3)"] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="h-14 w-14 rounded-full border border-vaultAmber bg-black flex items-center justify-center font-mono text-[10px] font-bold text-vaultAmber tracking-wider"
                >
                  NUCLEUS
                </motion.div>

                {/* Floating Shards */}
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
                    className="absolute rounded-xl border border-vaultAmber/30 bg-voidSurface/90 px-3 py-1.5 font-mono text-xs text-charcoal backdrop-blur-md shadow-lg whitespace-nowrap"
                  >
                    ✦ {shard.label}
                  </motion.div>
                ))}
              </div>
              <span className="font-mono text-xs text-vaultAmber">
                The Laxvish Thread freezes raw audio into physical geometric certainty.
              </span>
            </motion.div>
          )}

          {/* Shot 5: Gilded Enterprise Opportunity Deal Seal */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="relative w-full max-w-md rounded-3xl border border-vaultAmber/40 bg-gradient-to-b from-[#14151B] to-[#08080B] p-6 text-left shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
            >
              {/* Embossed Corner Brass Pins */}
              <div className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-vaultAmber/60" />
              <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-vaultAmber/60" />
              <div className="absolute bottom-3 left-3 h-1.5 w-1.5 rounded-full bg-vaultAmber/60" />
              <div className="absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full bg-vaultAmber/60" />

              <div className="flex items-center justify-between border-b border-vaultAmber/20 pb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-vaultAmber shadow-[0_0_6px_#B6B09F]" />
                  <span className="font-bold tracking-widest text-vaultAmber uppercase">ENTERPRISE DEAL SEAL</span>
                </div>
                <span className="font-mono font-bold text-neonCyan">FIT: 96.4% ICP ✓</span>
              </div>

              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-charcoal/40">Scope</span>
                  <span className="font-medium text-charcoal">120 Fleet Trucks (Routing + Fuel)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-charcoal/40">Contract ARR</span>
                  <span className="font-bold text-vaultAmber">₹18,00,000 / yr</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-charcoal/40">CRM Status</span>
                  <span className="text-charcoal/90">HubSpot Deal #OPP-892 Locked</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-charcoal/40">Calendar Sync</span>
                  <span className="font-bold text-neonCyan">Thu 3:30 PM (Executive AE Locked)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Machined Footbar */}
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
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                shot === i ? "w-8 bg-vaultAmber shadow-[0_0_8px_#B6B09F]" : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
              }`}
              title={`Jump to Shot 0${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase text-vaultAmber/80">
          <span className="h-1.5 w-1.5 rounded-full bg-vaultAmber" />
          <span>Acoustic Waveform → Enterprise Commitment</span>
        </div>
      </div>
    </div>
  );
}
