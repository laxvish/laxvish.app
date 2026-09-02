"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function GenesisPrologue() {
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 6-step genesis sequence
  useEffect(() => {
    if (!isPlaying) return;
    const timers = [
      setTimeout(() => setStep(1), 1000),  // Point awakens and starts trail
      setTimeout(() => setStep(2), 2600),  // Encounters phone silhouette
      setTimeout(() => setStep(3), 4400),  // Thread enters phone, conversation starts
      setTimeout(() => setStep(4), 6200),  // Extracts meaning & intent
      setTimeout(() => setStep(5), 8000),  // Forms opportunity & commits to CRM
      setTimeout(() => setStep(0), 11500), // Reset loop
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
      className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#07090D] p-6 text-white sm:p-10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] border border-white/15"
      style={{ perspective: "1000px" }}
    >
      {/* Background Deep Cosmic Mesh */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.04]" />

      {/* Top Header / Status bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
          <span className="font-bold tracking-[0.2em] text-cyan-300 uppercase">
            GENESIS 0.0 : THE LIVING THREAD
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-white/60">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-medium text-cyan-200">
            {step === 0 && "01 · Vacuum State"}
            {step === 1 && "02 · The Thread Awakens"}
            {step === 2 && "03 · Real-World Contact"}
            {step === 3 && "04 · Ingesting Raw Voice"}
            {step === 4 && "05 · Semantic Synthesis"}
            {step === 5 && "06 · Verified Enterprise Opportunity ✓"}
          </span>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>

      {/* Center Stage: The Graphic Machine Structure */}
      <motion.div
        animate={{
          rotateX: -mousePos.y * 8,
          rotateY: mousePos.x * 8,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6 text-center"
      >
        {/* Machine Diagram ASCII Title */}
        <div className="mb-6 space-y-2">
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/40">
            THE LAXVISH ORGANISM
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 font-mono text-xs font-medium tracking-widest text-white/80">
            <span className={step >= 2 ? "text-cyan-300 font-bold" : "text-white/40"}>WORK</span>
            <span className="text-white/20">────────</span>
            <span className="relative flex items-center justify-center">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              {step >= 1 && (
                <motion.span
                  layoutId="genesis-glow"
                  className="absolute h-6 w-6 rounded-full bg-cyan-400/40 animate-ping"
                />
              )}
            </span>
            <span className="text-white/20">────────</span>
            <span className={step >= 4 ? "text-amber-300 font-bold" : "text-white/40"}>INTELLIGENCE</span>
            <span className="text-white/20">────────</span>
            <span className={step === 5 ? "text-emerald-400 font-bold" : "text-white/40"}>DONE</span>
          </div>
        </div>

        {/* Interactive Simulation Area */}
        <div className="relative flex h-52 w-full max-w-2xl items-center justify-center">
          <AnimatePresence mode="wait">
            {/* Step 0: Vacuum State */}
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-white/20" />
                <span className="font-serif text-sm italic text-white/40">
                  Silence. The space before work arrives.
                </span>
              </motion.div>
            )}

            {/* Step 1: Single point awakens and casts glowing filament */}
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
                    d="M 50,50 Q 150,10 250,50 T 450,50"
                    stroke="#22D3EE"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    filter="drop-shadow(0 0 12px rgba(34,211,238,0.9))"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="250"
                    cy="50"
                    r="6"
                    fill="#FFFFFF"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                </svg>
                <span className="absolute bottom-2 font-mono text-[11px] text-cyan-200/80">
                  The Laxvish Thread wakes. A single vector of intelligence.
                </span>
              </motion.div>
            )}

            {/* Step 2: Encounters Phone Silhouette */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-cyan-400 bg-cyan-950/60 p-4 shadow-[0_0_40px_rgba(34,211,238,0.4)] backdrop-blur-md">
                  <svg className="h-8 w-8 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-cyan-400" />
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-cyan-200">
                  INBOUND SIP TELEPHONY · 120 FLEET TRUCKS
                </span>
                <span className="font-serif text-xs italic text-white/60">
                  The Thread touches physical communication and awakens the channel.
                </span>
              </motion.div>
            )}

            {/* Step 3: Thread enters phone, conversation starts */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex w-full max-w-lg flex-col items-center gap-3"
              >
                <div className="w-full rounded-2xl border border-white/20 bg-white/5 p-4 text-left backdrop-blur-md shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[10px] text-cyan-300">
                    <span>AUDIO STREAM LIVE</span>
                    <span className="font-bold text-emerald-400">THREAD CONNECTED (240ms)</span>
                  </div>
                  <p className="mt-2.5 font-serif text-sm italic text-white/90">
                    &ldquo;Need to automate dispatch routing and fuel reconciliation for 120 fleet trucks before Q3 close...&rdquo;
                  </p>
                </div>
                {/* Waveform becoming line */}
                <svg viewBox="0 0 400 30" className="h-6 w-80 overflow-visible">
                  <motion.path
                    d="M 0,15 Q 50,0 100,15 T 200,15 T 300,15 T 400,15"
                    stroke="#22D3EE"
                    strokeWidth="2"
                    fill="none"
                    filter="drop-shadow(0 0 8px rgba(34,211,238,0.8))"
                    animate={{
                      d: [
                        "M 0,15 Q 50,0 100,15 T 200,15 T 300,15 T 400,15",
                        "M 0,15 Q 50,30 100,15 T 200,15 T 300,15 T 400,15",
                        "M 0,15 Q 50,0 100,15 T 200,15 T 300,15 T 400,15",
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
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
                  { tag: "SCALE", val: "120 Trucks" },
                  { tag: "TIMELINE", val: "Target Q3 Close" },
                  { tag: "VALUATION", val: "₹18L ARR Contract" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.tag}
                    initial={{ y: 20, opacity: 0, scale: 0.85 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.12 }}
                    className="flex items-center gap-2 rounded-xl border border-amber-400/40 bg-amber-950/60 px-4 py-2 text-amber-200 shadow-xl backdrop-blur-md"
                  >
                    <span className="text-[9px] text-amber-400 uppercase font-bold">{item.tag}:</span>
                    <span className="font-bold text-white">{item.val}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Step 5: Committed Opportunity Card */}
            {step === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, scale: 0.88, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="w-full max-w-md rounded-3xl border-2 border-emerald-400/60 bg-gradient-to-b from-[#121E1C] to-[#0A100F] p-6 text-left shadow-[0_0_60px_rgba(52,211,153,0.35)]"
              >
                <div className="flex items-center justify-between border-b border-emerald-400/20 pb-3 font-mono text-[11px]">
                  <span className="font-bold text-emerald-300 uppercase">ENTERPRISE OPPORTUNITY READY</span>
                  <span className="font-bold text-emerald-400">HUBSPOT & CALENDAR SYNCED ✓</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                    <span className="block text-[9px] uppercase text-white/40">Buyer Tier</span>
                    <span className="font-bold text-emerald-300">Enterprise ICP (96.4%)</span>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                    <span className="block text-[9px] uppercase text-white/40">Next Action</span>
                    <span className="font-bold text-white">Rep Meeting: Thu 3:30pm</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom Timeline Step Indicators */}
      <div className="relative z-20 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-white/50">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setStep(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                step === idx ? "w-8 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              title={`Jump to Step ${idx + 1}`}
            />
          ))}
        </div>
        <span className="text-[10px] uppercase tracking-wider text-cyan-300/70">
          Work Enters → Intelligence Moves → Finished
        </span>
      </div>
    </div>
  );
}
