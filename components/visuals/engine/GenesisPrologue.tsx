"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function GenesisPrologue() {
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 6-step cinematic genesis sequence
  useEffect(() => {
    if (!isPlaying) return;
    const timers = [
      setTimeout(() => setStep(1), 1200),  // 01: The golden filament awakens in the void
      setTimeout(() => setStep(2), 2800),  // 02: Encounters telephony acoustic boundary
      setTimeout(() => setStep(3), 4600),  // 03: Ingests raw voice pressure waveform
      setTimeout(() => setStep(4), 6400),  // 04: Isolates semantic rune shards
      setTimeout(() => setStep(5), 8200),  // 05: Forges immutable Enterprise Deal Token
      setTimeout(() => setStep(0), 12000), // Reset loop
    ];
    return () => timers.forEach(clearTimeout);
  }, [step, isPlaying]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#050507] p-6 text-charcoal sm:p-10 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] border border-vaultAmber/20"
      style={{ perspective: "1000px" }}
    >
      {/* Cinematic Film Atmosphere & Anamorphic Glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-vaultAmber/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-vaultAmber/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(182,176,159,0.15)_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />

      {/* Cinematic Letterbox Camera Status Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-vaultAmber/15 pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-vaultAmber shadow-[0_0_8px_#B6B09F] animate-pulse" />
          <span className="font-medium tracking-[0.25em] text-vaultAmber uppercase">
            GENESIS SEQUENCE · THE LAXVISH THREAD
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-charcoal/70">
          <span className="rounded-full border border-vaultAmber/30 bg-vaultAmber/10 px-3 py-1 font-mono text-vaultAmber">
            {step === 0 && "01 · THE VOID BEFORE WORK"}
            {step === 1 && "02 · THE THREAD AWAKENS"}
            {step === 2 && "03 · ACOUSTIC CONTACT"}
            {step === 3 && "04 · PHONETIC INGESTION"}
            {step === 4 && "05 · SEMANTIC SYNTHESIS"}
            {step === 5 && "06 · ENTERPRISE SEAL FORGED ✓"}
          </span>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full border border-charcoal/20 bg-white/5 px-3 py-1 font-mono text-[10px] text-charcoal hover:bg-white/15 transition-colors cursor-pointer"
          >
            {isPlaying ? "Pause Reel" : "Play Reel"}
          </button>
        </div>
      </div>

      {/* Center 3D Cinematic Stage */}
      <motion.div
        animate={{
          rotateX: -mousePos.y * 6,
          rotateY: mousePos.x * 6,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6 text-center"
      >
        {/* Cinematic Narrative Hierarchy */}
        <div className="mb-6 space-y-2">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-vaultAmber/60">
            THE LIVING OPERATING SYSTEM
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 font-mono text-xs tracking-widest text-charcoal/80">
            <span className={step >= 2 ? "text-neonCyan font-bold" : "text-charcoal/30"}>WORK ENTERS</span>
            <span className="text-vaultAmber/20">───────</span>
            <span className="relative flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-vaultAmber shadow-[0_0_10px_#B6B09F]" />
              {step >= 1 && (
                <motion.span
                  className="absolute h-6 w-6 rounded-full bg-vaultAmber/30 animate-ping"
                />
              )}
            </span>
            <span className="text-vaultAmber/20">───────</span>
            <span className={step >= 4 ? "text-vaultAmber font-bold" : "text-charcoal/30"}>THE THREAD WEAVES</span>
            <span className="text-vaultAmber/20">───────</span>
            <span className={step === 5 ? "text-neonCyan font-bold" : "text-charcoal/30"}>FINISHED COMMITMENT</span>
          </div>
        </div>

        {/* Spatial Kinetic Arena */}
        <div className="relative flex h-52 w-full max-w-2xl items-center justify-center">
          <AnimatePresence mode="wait">
            {/* Step 0: The Quiet Void */}
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-vaultAmber/30 shadow-[0_0_12px_rgba(182,176,159,0.4)]" />
                <span className="font-serif text-sm italic text-charcoal/50 max-w-md">
                  Silence in the enterprise void. Waiting for human work to enter the aperture.
                </span>
              </motion.div>
            )}

            {/* Step 1: The Golden Thread Awakens */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex h-full w-full items-center justify-center"
              >
                <svg viewBox="0 0 500 100" className="h-28 w-full overflow-visible">
                  <motion.path
                    d="M 50,50 Q 150,15 250,50 T 450,50"
                    stroke="#B6B09F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    filter="drop-shadow(0 0 10px rgba(182,176,159,0.85))"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="250"
                    cy="50"
                    r="5"
                    fill="#FFFFFF"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                </svg>
                <span className="absolute bottom-2 font-mono text-[11px] text-vaultAmber">
                  The Laxvish Thread stirs. A single living filament of celestial intelligence.
                </span>
              </motion.div>
            )}

            {/* Step 2: Encounters Physical Inbound Telephony */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-vaultAmber/40 bg-voidSurface p-4 shadow-[0_0_35px_rgba(182,176,159,0.25)] backdrop-blur-md">
                  <svg className="h-8 w-8 text-vaultAmber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vaultAmber opacity-75" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-vaultAmber" />
                  </span>
                </div>
                <span className="font-mono text-xs font-bold tracking-wider text-charcoal">
                  INBOUND SIP TELEPHONY · FLEET DISPATCH LINE
                </span>
                <span className="font-serif text-xs italic text-charcoal/60">
                  The Thread makes physical contact with the enterprise communication channel.
                </span>
              </motion.div>
            )}

            {/* Step 3: Enters Audio Waveform */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex w-full max-w-lg flex-col items-center gap-3"
              >
                <div className="w-full rounded-2xl border border-vaultAmber/20 bg-voidSurface/80 p-4 text-left backdrop-blur-md shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 font-mono text-[10px] text-vaultAmber">
                    <span>AUDIO FREQUENCY CAPTURE</span>
                    <span className="font-bold text-neonCyan">THREAD SYNCHRONIZED (240ms)</span>
                  </div>
                  <p className="mt-2.5 font-serif text-sm italic text-charcoal/90">
                    &ldquo;Need to automate dispatch routing and fuel reconciliation for 120 fleet trucks before Q3 close...&rdquo;
                  </p>
                </div>
                {/* Acoustic waveform becoming thread */}
                <svg viewBox="0 0 400 30" className="h-6 w-80 overflow-visible">
                  <motion.path
                    d="M 0,15 Q 50,0 100,15 T 200,15 T 300,15 T 400,15"
                    stroke="#B6B09F"
                    strokeWidth="2"
                    fill="none"
                    filter="drop-shadow(0 0 6px rgba(182,176,159,0.7))"
                    animate={{
                      d: [
                        "M 0,15 Q 50,0 100,15 T 200,15 T 300,15 T 400,15",
                        "M 0,15 Q 50,30 100,15 T 200,15 T 300,15 T 400,15",
                        "M 0,15 Q 50,0 100,15 T 200,15 T 300,15 T 400,15",
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  />
                </svg>
              </motion.div>
            )}

            {/* Step 4: Semantic Extraction */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs"
              >
                {[
                  { tag: "INTENT", val: "Fleet Automation" },
                  { tag: "SCALE", val: "120 Commercial Trucks" },
                  { tag: "TIMELINE", val: "Q3 Target Rollout" },
                  { tag: "VALUATION", val: "₹18,00,000 ARR" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.tag}
                    initial={{ y: 20, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.12 }}
                    className="flex items-center gap-2 rounded-xl border border-vaultAmber/30 bg-voidSurface px-4 py-2 text-charcoal shadow-lg backdrop-blur-md"
                  >
                    <span className="text-[9px] text-vaultAmber uppercase font-bold">{item.tag}:</span>
                    <span className="font-semibold text-neonCyan">{item.val}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Step 5: Finished Enterprise Deal Seal */}
            {step === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="w-full max-w-md rounded-3xl border border-vaultAmber/40 bg-gradient-to-b from-[#121318] to-[#08080B] p-6 text-left shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-center justify-between border-b border-vaultAmber/20 pb-3 font-mono text-[11px]">
                  <span className="font-bold text-vaultAmber uppercase tracking-wider">ENTERPRISE OPPORTUNITY READY</span>
                  <span className="font-bold text-neonCyan">HUBSPOT & CALENDAR LOCKED ✓</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                    <span className="block text-[9px] uppercase text-charcoal/40">Buyer Tier</span>
                    <span className="font-bold text-vaultAmber">Enterprise ICP (96.4%)</span>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                    <span className="block text-[9px] uppercase text-charcoal/40">Next Action</span>
                    <span className="font-bold text-neonCyan">Rep Meeting: Thu 3:30pm</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Cinematic Frame Reel Track */}
      <div className="relative z-20 flex items-center justify-between border-t border-vaultAmber/15 pt-4 font-mono text-[11px] text-charcoal/50">
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setStep(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                step === idx ? "w-8 bg-vaultAmber shadow-[0_0_8px_#B6B09F]" : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
              }`}
              title={`Jump to Frame 0${idx + 1}`}
            />
          ))}
        </div>
        <span className="text-[10px] uppercase tracking-widest text-vaultAmber/80">
          Work Enters → Intelligence Weaves → Finished Commitment
        </span>
      </div>
    </div>
  );
}
