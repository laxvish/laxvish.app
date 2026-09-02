"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function SalesScene() {
  const [shot, setShot] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timers = [
      setTimeout(() => setShot(1), 1000), // Shot 1: Incoming call, vibration
      setTimeout(() => setShot(2), 2400), // Shot 2: Voice waveform emerges
      setTimeout(() => setShot(3), 4200), // Shot 3: Thread enters -> becomes meaning
      setTimeout(() => setShot(4), 6000), // Shot 4: Concepts orbit and converge
      setTimeout(() => setShot(5), 7800), // Shot 5: Lead entity forms
      setTimeout(() => setShot(6), 9600), // Shot 6: Thread carries to CRM/Calendar
      setTimeout(() => setShot(0), 12500), // Reset
    ];
    return () => timers.forEach(clearTimeout);
  }, [shot, isAutoPlay]);

  return (
    <div className="relative flex min-h-[420px] w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-[#FAF8F5] p-6 text-charcoal sm:p-10">
      {/* Background Subtle Mesh */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#111111_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-[0.05]" />

      {/* Header / Chapter Navigation */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-charcoal/10 pb-3.5 font-mono text-[11px] text-charcoal/50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-charcoal uppercase">SCENE 01</span>
          <span>:</span>
          <span className="uppercase tracking-wider">REVENUE & LEAD ENGINE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-charcoal/5 px-2.5 py-0.5 text-[10px] font-semibold text-charcoal">
            {shot === 0 && "Shot 1 · Standby Channel"}
            {shot === 1 && "Shot 2 · Inbound Call Vibration"}
            {shot === 2 && "Shot 3 · Voice Waveform Ingestion"}
            {shot === 3 && "Shot 4 · Thread Extracts Meaning"}
            {shot === 4 && "Shot 5 · Semantic Convergence"}
            {shot === 5 && "Shot 6 · Enterprise Opportunity Formed"}
            {shot === 6 && "Shot 7 · Brain Routes to CRM & Calendar"}
          </span>
        </div>
      </div>

      {/* Main Kinetic Film Stage */}
      <div className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6 text-center">
        <AnimatePresence mode="wait">
          {/* Shot 0: Tiny phone silhouette in empty space */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-charcoal/20 bg-white shadow-xs">
                <svg className="h-6 w-6 text-charcoal/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <span className="font-serif text-xs italic text-charcoal/40">
                Awaiting inbound enterprise voice or WhatsApp lead...
              </span>
            </motion.div>
          )}

          {/* Shot 1: Incoming call with vibration */}
          {shot === 1 && (
            <motion.div
              key="shot-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{ rotate: [-2, 2, -2, 2, 0] }}
                transition={{ repeat: Infinity, duration: 0.4 }}
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-charcoal bg-charcoal text-white shadow-lg"
              >
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500" />
                </span>
              </motion.div>
              <span className="font-mono text-xs font-bold text-charcoal">
                INCOMING CALL · FLEET LOGISTICS VP
              </span>
            </motion.div>
          )}

          {/* Shot 2: Voice waveform emerges */}
          {shot === 2 && (
            <motion.div
              key="shot-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full max-w-md flex-col items-center gap-3"
            >
              <div className="w-full rounded-2xl border border-charcoal/15 bg-white p-4 shadow-sm text-left">
                <span className="font-mono text-[10px] uppercase text-charcoal/40">Raw Audio Stream</span>
                <p className="mt-1.5 font-serif text-sm italic text-charcoal/80">
                  &ldquo;Need to automate dispatch routing and fuel reconciliation for 120 fleet trucks before Q3 close...&rdquo;
                </p>
              </div>
              <svg viewBox="0 0 320 30" className="h-6 w-full overflow-visible">
                <motion.path
                  d="M 0,15 Q 40,0 80,15 T 160,15 T 240,15 T 320,15"
                  stroke="#111111"
                  strokeWidth="1.75"
                  fill="none"
                  animate={{
                    d: [
                      "M 0,15 Q 40,0 80,15 T 160,15 T 240,15 T 320,15",
                      "M 0,15 Q 40,30 80,15 T 160,15 T 240,15 T 320,15",
                      "M 0,15 Q 40,0 80,15 T 160,15 T 240,15 T 320,15",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          )}

          {/* Shot 3: Thread enters waveform -> becomes meaning */}
          {shot === 3 && (
            <motion.div
              key="shot-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs"
            >
              {["dispatch", "routing", "fuel reconciliation", "120 fleet trucks", "before Q3"].map((token, idx) => (
                <motion.div
                  key={token}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-full border border-charcoal/20 bg-charcoal px-3.5 py-1.5 text-white font-medium shadow-xs"
                >
                  {token}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Shot 4: Concepts orbit and converge */}
          {shot === 4 && (
            <motion.div
              key="shot-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex h-36 w-full items-center justify-center"
            >
              {/* Central Nucleus */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="h-10 w-10 rounded-full border-2 border-charcoal bg-white flex items-center justify-center font-mono text-[10px] font-bold"
              >
                ICP
              </motion.div>
              {/* Orbiting Ring with Tags */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute h-32 w-32 rounded-full border border-dashed border-charcoal/30 flex items-center justify-between"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-charcoal" />
              </motion.div>
              <div className="absolute -bottom-2 font-mono text-[11px] text-charcoal/60">
                Semantic synthesis: High-intent enterprise lead detected.
              </div>
            </motion.div>
          )}

          {/* Shot 5: Enterprise Opportunity Formed */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-charcoal/20 bg-white p-5 text-left shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-2 font-mono text-[10px] text-charcoal/40">
                <span className="font-bold text-charcoal uppercase">ENTERPRISE OPPORTUNITY</span>
                <span className="font-bold text-emerald-700">FIT SCORE: 96.4%</span>
              </div>
              <div className="mt-3 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-charcoal/5">
                  <span className="text-charcoal/50">Intent Scope</span>
                  <span className="font-bold text-charcoal">Fleet Routing & Fuel (120 Vehicles)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-charcoal/5">
                  <span className="text-charcoal/50">Deal Sizing</span>
                  <span className="font-bold text-charcoal">₹18,00,000 ARR</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-charcoal/50">Target Close</span>
                  <span className="font-bold text-charcoal">Q3 (High Urgency)</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Shot 6: Thread carries opportunity away to CRM & Calendar */}
          {shot === 6 && (
            <motion.div
              key="shot-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex w-full max-w-md flex-col gap-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between rounded-xl bg-charcoal p-3.5 text-white shadow-md">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="font-bold">HubSpot CRM Record Created</span>
                </div>
                <span className="text-[10px] text-white/60">Deal #OPP-892</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-charcoal/15 bg-white p-3.5 text-charcoal shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Calendar Invites Sent to VP + Enterprise AE</span>
                </div>
                <span className="font-bold text-emerald-700">Thu 3:30 PM ✓</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Scrubber & Brakes Indicator */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-charcoal/10 pt-3.5 font-mono text-[11px] text-charcoal/50">
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIsAutoPlay(false);
                setShot(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                shot === i ? "w-6 bg-charcoal" : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
              }`}
              title={`Jump to Shot ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
          <span>Brakes Verification: Zero Autonomous Hallucination</span>
        </div>
      </div>
    </div>
  );
}
