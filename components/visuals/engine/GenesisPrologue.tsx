"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function GenesisPrologue() {
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // 6-step genesis sequence
  useEffect(() => {
    if (!isPlaying) return;
    const timers = [
      setTimeout(() => setStep(1), 800),   // Point awakens and starts trail
      setTimeout(() => setStep(2), 2200),  // Encounters phone silhouette
      setTimeout(() => setStep(3), 3800),  // Thread enters phone, conversation starts
      setTimeout(() => setStep(4), 5400),  // Extracts meaning & intent
      setTimeout(() => setStep(5), 7000),  // Forms opportunity & commits to CRM
      setTimeout(() => setStep(0), 10000), // Reset loop
    ];
    return () => timers.forEach(clearTimeout);
  }, [step, isPlaying]);

  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-charcoal/5 p-2 ring-1 ring-charcoal/10 shadow-2xl">
      <div className="relative flex min-h-[460px] w-full flex-col justify-between overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-[#FAF8F5] p-6 text-charcoal sm:p-10">
        {/* Background Grid Accent */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#111111_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.06]" />

        {/* Top Header / Status bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/10 pb-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold tracking-wider uppercase text-charcoal">GENESIS 0.0 : THE LAXVISH MACHINE</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-charcoal/60">
            <span className="hidden sm:inline">STATE:</span>
            <span className="rounded-full border border-charcoal/15 bg-white px-3 py-1 font-medium text-charcoal shadow-xs">
              {step === 0 && "01 · Vacuum State"}
              {step === 1 && "02 · The Thread Awakens"}
              {step === 2 && "03 · Real-World Contact"}
              {step === 3 && "04 · Thread Ingests Conversation"}
              {step === 4 && "05 · Semantic Extraction"}
              {step === 5 && "06 · Verified Opportunity Committed"}
            </span>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="rounded-full border border-charcoal/20 bg-charcoal px-3 py-1 font-mono text-[10px] text-white hover:bg-charcoal/80 transition-colors cursor-pointer"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </div>

        {/* Center Stage: The Graphic Machine Structure */}
        <div className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6 text-center">
          {/* Machine Diagram ASCII Title */}
          <div className="mb-6 space-y-1">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-charcoal/40">
              LAXVISH OPERATING ARCHITECTURE
            </p>
            <div className="flex items-center justify-center gap-6 font-mono text-xs font-medium tracking-widest text-charcoal/80">
              <span className={step >= 2 ? "text-charcoal font-bold" : "text-charcoal/40"}>WORK</span>
              <span className="text-charcoal/30">────────</span>
              <span className="relative flex items-center justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-charcoal" />
                {step >= 1 && (
                  <motion.span
                    layoutId="thread-glow"
                    className="absolute h-5 w-5 rounded-full bg-emerald-400/50 animate-ping"
                  />
                )}
              </span>
              <span className="text-charcoal/30">────────</span>
              <span className={step >= 4 ? "text-charcoal font-bold" : "text-charcoal/40"}>INTELLIGENCE</span>
              <span className="text-charcoal/30">────────</span>
              <span className={step === 5 ? "text-emerald-700 font-bold" : "text-charcoal/40"}>DONE</span>
            </div>
          </div>

          {/* Interactive Simulation Area */}
          <div className="relative flex h-52 w-full max-w-2xl items-center justify-center">
            {/* Step 0: Warm White Silence */}
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-charcoal/30" />
                <span className="font-serif text-sm italic text-charcoal/50">
                  Silence. The space before work arrives.
                </span>
              </motion.div>
            )}

            {/* Step 1: Single point awakens and leaves thin glowing trail */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex h-full w-full items-center justify-center"
              >
                <svg viewBox="0 0 500 100" className="h-28 w-full overflow-visible">
                  {/* Glowing Thread Trail */}
                  <motion.path
                    d="M 50,50 Q 150,10 250,50 T 450,50"
                    stroke="#111111"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                  {/* Point of Light */}
                  <motion.circle
                    cx="250"
                    cy="50"
                    r="4"
                    fill="#111111"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                </svg>
                <span className="absolute bottom-2 font-mono text-[11px] text-charcoal/60">
                  The Laxvish Thread wakes. A single vector of intelligence.
                </span>
              </motion.div>
            )}

            {/* Step 2: Encounters Phone Silhouette */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-charcoal bg-white shadow-lg">
                  <svg className="h-7 w-7 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500" />
                  </span>
                </div>
                <span className="font-mono text-xs font-semibold text-charcoal">
                  INBOUND SIP LINE · 120 FLEET TRUCKS INQUIRY
                </span>
                <span className="font-serif text-xs italic text-charcoal/70">
                  The Thread touches physical communication and awakens the channel.
                </span>
              </motion.div>
            )}

            {/* Step 3: Thread enters phone, conversation starts */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex w-full max-w-lg flex-col items-center gap-3"
              >
                <div className="w-full rounded-2xl border border-charcoal/15 bg-white p-4 text-left shadow-md">
                  <div className="flex items-center justify-between border-b border-charcoal/10 pb-2 font-mono text-[10px] text-charcoal/40">
                    <span>AUDIO STREAM LIVE</span>
                    <span className="font-bold text-emerald-700">THREAD CONNECTED (240ms)</span>
                  </div>
                  <p className="mt-2.5 font-serif text-sm italic text-charcoal/80">
                    &ldquo;Need to automate dispatch routing and fuel reconciliation for 120 fleet trucks before Q3 close...&rdquo;
                  </p>
                </div>
                {/* Waveform becoming line */}
                <svg viewBox="0 0 400 30" className="h-6 w-80 overflow-visible">
                  <motion.path
                    d="M 0,15 Q 50,0 100,15 T 200,15 T 300,15 T 400,15"
                    stroke="#111111"
                    strokeWidth="1.5"
                    fill="none"
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs"
              >
                {[
                  { tag: "INTENT", val: "Fleet Operations Automation" },
                  { tag: "SCALE", val: "120 Commercial Vehicles" },
                  { tag: "TIMELINE", val: "Target Q3 Deployment" },
                  { tag: "ESTIMATE", val: "₹18L ARR Contract" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.tag}
                    initial={{ y: 15, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.12 }}
                    className="flex items-center gap-2 rounded-xl border border-charcoal/15 bg-white px-3.5 py-2 shadow-sm"
                  >
                    <span className="text-[10px] text-charcoal/40 uppercase">{item.tag}</span>
                    <span className="font-semibold text-charcoal">{item.val}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Step 5: Committed Opportunity Card */}
            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-md rounded-2xl border border-charcoal/20 bg-white p-5 text-left shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-charcoal/10 pb-2.5 font-mono text-[10px] text-charcoal/40">
                  <span className="font-bold text-charcoal">ENTERPRISE OPPORTUNITY READY</span>
                  <span className="font-bold text-emerald-700">SYNCED TO HUBSPOT & CALENDAR ✓</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-xs">
                  <div className="rounded-lg bg-charcoal/5 p-2">
                    <span className="block text-[9px] uppercase text-charcoal/40">Buyer Tier</span>
                    <span className="font-bold text-charcoal">Enterprise ICP (96.4%)</span>
                  </div>
                  <div className="rounded-lg bg-charcoal/5 p-2">
                    <span className="block text-[9px] uppercase text-charcoal/40">Next Action</span>
                    <span className="font-bold text-charcoal">Rep Meeting: Thu 3:30pm</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Timeline Step Indicators */}
        <div className="relative z-10 flex items-center justify-between border-t border-charcoal/10 pt-4 font-mono text-[11px] text-charcoal/50">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setStep(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === idx ? "w-8 bg-charcoal" : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
                }`}
                title={`Jump to Shot ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-wider text-charcoal/40">
            Work Enters → Intelligence Moves → Finished
          </span>
        </div>
      </div>
    </div>
  );
}
