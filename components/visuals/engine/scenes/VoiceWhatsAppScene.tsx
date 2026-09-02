"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function VoiceWhatsAppScene() {
  const [shot, setShot] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timers = [
      setTimeout(() => setShot(1), 1800), // Shot 1: Dual parallel streams
      setTimeout(() => setShot(2), 3800), // Shot 2: Thread enters both streams
      setTimeout(() => setShot(3), 5800), // Shot 3: Streams converge into one customer model
      setTimeout(() => setShot(4), 7800), // Shot 4: Brakes verification
      setTimeout(() => setShot(5), 9800), // Shot 5: ONE CUSTOMER TRUTH
      setTimeout(() => setShot(0), 13000), // Reset
    ];
    return () => timers.forEach(clearTimeout);
  }, [shot, isAutoPlay]);

  return (
    <div className="relative flex min-h-[420px] w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-[#FAF8F5] p-6 text-charcoal sm:p-10">
      {/* Background Matrix */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#111111_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-[0.05]" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-charcoal/10 pb-3.5 font-mono text-[11px] text-charcoal/50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-charcoal uppercase">SCENE 05</span>
          <span>:</span>
          <span className="uppercase tracking-wider">VOICE & WHATSAPP CONVERGENCE</span>
        </div>
        <div>
          <span className="rounded-full bg-charcoal/5 px-2.5 py-0.5 text-[10px] font-semibold text-charcoal">
            {shot === 0 && "Standby Reception Core"}
            {shot === 1 && "Shot 1 · Dual Independent Streams"}
            {shot === 2 && "Shot 2 · Thread Traverses Both Vectors"}
            {shot === 3 && "Shot 3 · Unified Customer Model"}
            {shot === 4 && "Shot 4 · Brakes Identity & Schedule Check"}
            {shot === 5 && "Shot 5 · One Customer Truth ✓"}
          </span>
        </div>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6 text-center">
        <AnimatePresence mode="wait">
          {/* Shot 0: Idle state */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 font-mono text-xs text-charcoal/40"
            >
              <div className="h-3 w-3 rounded-full bg-charcoal/30 animate-pulse" />
              <span>Monitoring Indian SIP PRI lines & WhatsApp Business API simultaneously...</span>
            </motion.div>
          )}

          {/* Shot 1: Dual parallel streams */}
          {shot === 1 && (
            <motion.div
              key="shot-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid w-full max-w-lg gap-4 md:grid-cols-2 text-left font-mono text-xs"
            >
              {/* Left: Voice telephony stream */}
              <div className="rounded-2xl border border-charcoal/15 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-charcoal/10 pb-1.5 text-[10px] text-charcoal/40 uppercase">
                  <span>Voice Telephony</span>
                  <span className="text-emerald-700 font-bold">PRI Line 2</span>
                </div>
                <p className="mt-2 font-serif text-xs italic text-charcoal/80">
                  &ldquo;Reschedule my clinic appointment for tomorrow afternoon...&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] text-charcoal/50">240ms Low-Latency Stream</span>
                </div>
              </div>

              {/* Right: WhatsApp message stream */}
              <div className="rounded-2xl border border-charcoal/15 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-charcoal/10 pb-1.5 text-[10px] text-charcoal/40 uppercase">
                  <span>WhatsApp Business</span>
                  <span className="text-emerald-700 font-bold">+91 9845...</span>
                </div>
                <p className="mt-2 font-serif text-xs italic text-charcoal/80">
                  &ldquo;Patient ID: P-88219 (Vikram Patel). Please confirm Dr. Rao slot.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[9px] text-charcoal/50">DPDP Consent Token Valid</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Shot 2: The Laxvish Thread enters both streams */}
          {shot === 2 && (
            <motion.div
              key="shot-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex w-full max-w-md flex-col items-center justify-center py-4"
            >
              <svg viewBox="0 0 400 80" className="h-20 w-full overflow-visible">
                {/* Voice line */}
                <motion.path
                  d="M 20,25 Q 100,5 200,40 T 380,55"
                  stroke="#111111"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />
                {/* WhatsApp line */}
                <motion.path
                  d="M 20,55 Q 100,75 200,40 T 380,25"
                  stroke="#111111"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.circle cx="200" cy="40" r="5" fill="#111111" />
              </svg>
              <span className="font-mono text-xs font-bold text-charcoal">
                The Thread binds telephony audio and chat metadata into one model.
              </span>
            </motion.div>
          )}

          {/* Shot 3: Unified Customer Model */}
          {shot === 3 && (
            <motion.div
              key="shot-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs"
            >
              {[
                { tag: "INTENT", val: "Appointment Rescheduling" },
                { tag: "IDENTITY", val: "Vikram Patel (P-88219)" },
                { tag: "REQUEST", val: "Tomorrow 3:30 PM (Dr. Rao)" },
                { tag: "HISTORY", val: "Cardiology Follow-Up" },
                { tag: "ACTION", val: "EMR Slot Reservation" },
              ].map((pill, idx) => (
                <motion.div
                  key={pill.tag}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.12 }}
                  className="rounded-xl border border-charcoal/20 bg-charcoal px-3.5 py-1.5 text-white shadow-xs"
                >
                  <span className="text-[9px] uppercase tracking-wider text-emerald-400 mr-1.5 font-bold">{pill.tag}:</span>
                  <span className="text-white/90 font-medium">{pill.val}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Shot 4: Brakes Verification Check */}
          {shot === 4 && (
            <motion.div
              key="shot-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 font-mono text-xs"
            >
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-charcoal bg-white shadow-lg">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-1 rounded-full border-t-2 border-emerald-600"
                />
                <span className="text-[10px] font-bold text-charcoal">BRAKES</span>
              </div>
              <div className="rounded-xl border border-charcoal/15 bg-white px-4 py-2 shadow-xs">
                <span className="text-charcoal/60">Schedule Conflict Check: </span>
                <span className="font-bold text-emerald-700">Dr. Rao 3:30 PM Slot Available & Reserved ✓</span>
              </div>
            </motion.div>
          )}

          {/* Shot 5: ONE CUSTOMER TRUTH */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-charcoal/20 bg-white p-5 text-left shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-2.5 font-mono text-[10px]">
                <span className="font-bold uppercase text-charcoal">ONE CUSTOMER TRUTH COMMITTED</span>
                <span className="font-bold text-emerald-700">EMR SYNCED ✓</span>
              </div>
              <div className="mt-3 space-y-2 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-charcoal/5">
                  <span className="text-charcoal/50">EMR Appointment</span>
                  <span className="font-bold text-charcoal">Tomorrow 3:30 PM (Dr. Rao, OPD-3)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-charcoal/5">
                  <span className="text-charcoal/50">WhatsApp Confirmation</span>
                  <span className="font-bold text-emerald-700">Instant Template Dispatched</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-charcoal/50">Audio Privacy</span>
                  <span className="font-bold text-charcoal">DPDP PII Redacted at Edge</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Scrubber */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-charcoal/10 pt-3.5 font-mono text-[11px] text-charcoal/50">
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4, 5].map((i) => (
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
        <div className="text-[10px] uppercase text-charcoal/40">
          Two Inbound Streams · One Unified Customer Model
        </div>
      </div>
    </div>
  );
}
