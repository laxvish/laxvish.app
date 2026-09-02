"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function VoiceWhatsAppScene() {
  const [shot, setShot] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!isAutoPlay) return;
    const timers = [
      setTimeout(() => setShot(1), 1600), // Shot 1: Dual Streams (Analog Vacuum Tube + Digital Quartz)
      setTimeout(() => setShot(2), 3600), // Shot 2: Braided Thread Weaves Both Currents
      setTimeout(() => setShot(3), 5600), // Shot 3: Converging into Unified Customer Context
      setTimeout(() => setShot(4), 7600), // Shot 4: Brakes DPDP Redaction & Doctor Schedule Lock
      setTimeout(() => setShot(5), 9600), // Shot 5: ONE CUSTOMER TRUTH Committed to EMR ✓
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
      className="relative flex min-h-[480px] w-full flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#0A0D12] p-6 text-white sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-rose-500/20"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Dynamic Ambient Rose & Emerald Dual Glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-rose-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#f43f5e_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.05]" />

      {/* Loom Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-rose-400 shadow-[0_0_10px_#fb7185] animate-pulse" />
          <span className="font-bold tracking-[0.2em] text-rose-300 uppercase">
            ARTIFACT V : THE HARMONIC DUAL-STREAM LOOM
          </span>
        </div>
        <div>
          <span className="rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 font-mono text-[10px] font-semibold text-rose-200">
            {shot === 0 && "Dual Harmonic Chambers Ingesting"}
            {shot === 1 && "Analog Vacuum Tube + Digital Quartz"}
            {shot === 2 && "Braided Thread Weaving Vectors"}
            {shot === 3 && "Unified Customer Matrix Formed"}
            {shot === 4 && "Brakes DPDP Privacy & EMR Conflict Check"}
            {shot === 5 && "One Customer Truth Committed ✓"}
          </span>
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
          {/* Shot 0: Idle state */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-rose-400/30 bg-rose-500/10 backdrop-blur-md">
                <span className="h-3 w-3 rounded-full bg-rose-400 animate-ping" />
              </div>
              <p className="font-serif text-sm italic text-rose-100/60 max-w-sm">
                Dual telephony lines and WhatsApp webhook streams balanced.
              </p>
            </motion.div>
          )}

          {/* Shot 1: Dual Streams (Analog Vacuum Tube + Digital Quartz) */}
          {shot === 1 && (
            <motion.div
              key="shot-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="grid w-full max-w-lg gap-4 md:grid-cols-2 font-mono text-xs text-left"
            >
              {/* Left Chamber: Analog Vacuum Tube Voice */}
              <div className="rounded-3xl border-2 border-rose-400/50 bg-gradient-to-b from-rose-950/60 to-black p-4 shadow-[0_0_30px_rgba(244,63,94,0.25)] backdrop-blur-md">
                <div className="flex justify-between text-[9px] text-rose-300 uppercase pb-1 border-b border-rose-400/20">
                  <span>Analog Voice (PRI-2)</span>
                  <span className="font-bold text-rose-400">240ms Low Latency</span>
                </div>
                <p className="mt-2.5 font-serif text-xs italic text-rose-100/90 leading-relaxed">
                  &ldquo;Reschedule my clinic appointment for tomorrow afternoon...&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[10px] text-rose-300/70">Acoustic Audio Stream</span>
                </div>
              </div>

              {/* Right Chamber: Digital Quartz WhatsApp */}
              <div className="rounded-3xl border-2 border-emerald-400/50 bg-gradient-to-b from-emerald-950/60 to-black p-4 shadow-[0_0_30px_rgba(16,185,129,0.25)] backdrop-blur-md">
                <div className="flex justify-between text-[9px] text-emerald-300 uppercase pb-1 border-b border-emerald-400/20">
                  <span>WhatsApp Digital</span>
                  <span className="font-bold text-emerald-400">DPDP Verified</span>
                </div>
                <p className="mt-2.5 font-serif text-xs italic text-emerald-100/90 leading-relaxed">
                  &ldquo;Patient ID: P-88219 (Vikram Patel). Please confirm Dr. Rao slot.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-300/70">Encrypted JSON Packet</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Shot 2: Braided Thread Weaves Both Currents */}
          {shot === 2 && (
            <motion.div
              key="shot-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex w-full max-w-lg flex-col items-center justify-center py-4"
            >
              <svg viewBox="0 0 500 100" className="h-24 w-full overflow-visible">
                {/* Rose voice wave */}
                <motion.path
                  d="M 20,25 Q 150,5 250,50 T 480,75"
                  stroke="#FB7185"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  filter="drop-shadow(0 0 10px rgba(251,113,133,0.8))"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />
                {/* Emerald WhatsApp wave */}
                <motion.path
                  d="M 20,75 Q 150,95 250,50 T 480,25"
                  stroke="#34D399"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  filter="drop-shadow(0 0 10px rgba(52,211,153,0.8))"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.15 }}
                />
                <circle cx="250" cy="50" r="7" fill="#FFFFFF" filter="drop-shadow(0 0 15px #FFFFFF)" />
              </svg>
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                BRAIDED THREAD WEAVING ANALOG VOICE & DIGITAL TEXT INTO ONE REALITY
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
              className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs"
            >
              {[
                { tag: "PATIENT IDENTITY", val: "Vikram Patel (P-88219)", color: "border-rose-400 bg-rose-950/60 text-rose-200" },
                { tag: "CLINICAL INTENT", val: "Cardiology Reschedule", color: "border-amber-400 bg-amber-950/60 text-amber-200" },
                { tag: "TARGET DOCTOR", val: "Dr. Rao (OPD Room 3)", color: "border-emerald-400 bg-emerald-950/60 text-emerald-200" },
                { tag: "REQUESTED TIME", val: "Tomorrow 3:30 PM", color: "border-cyan-400 bg-cyan-950/60 text-cyan-200" },
              ].map((pill, idx) => (
                <motion.div
                  key={pill.tag}
                  initial={{ scale: 0.8, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.12 }}
                  className={`flex items-center gap-2 rounded-2xl border-2 px-4 py-2.5 shadow-xl backdrop-blur-md ${pill.color}`}
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider">{pill.tag}:</span>
                  <span className="font-bold">✦ {pill.val}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Shot 4: Brakes DPDP Privacy & EMR Conflict Check */}
          {shot === 4 && (
            <motion.div
              key="shot-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 font-mono text-xs"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-rose-400 bg-black shadow-[0_0_40px_rgba(244,63,94,0.5)]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-1.5 rounded-full border-t-2 border-emerald-400"
                />
                <span className="text-xs font-bold tracking-widest text-rose-300">BRAKES</span>
              </div>
              <div className="rounded-2xl border border-rose-400/40 bg-rose-950/40 px-5 py-2.5 text-rose-200 backdrop-blur-md">
                <span>Clinical Conflict Check & DPDP Redaction: </span>
                <strong className="text-emerald-400">Dr. Rao Slot Available · Audio PII Encrypted ✓</strong>
              </div>
            </motion.div>
          )}

          {/* Shot 5: ONE CUSTOMER TRUTH */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.88, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative w-full max-w-md rounded-3xl border-2 border-emerald-400/60 bg-gradient-to-b from-[#180F16] to-[#0A070D] p-6 text-left shadow-[0_0_60px_rgba(244,63,94,0.35)]"
            >
              <div className="flex items-center justify-between border-b border-rose-400/20 pb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  <span className="font-bold tracking-widest text-emerald-300 uppercase">
                    ONE CUSTOMER TRUTH COMMITTED
                  </span>
                </div>
                <span className="font-mono font-bold text-emerald-400">EMR LOCKED ✓</span>
              </div>

              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Hospital EMR Slot</span>
                  <span className="font-bold text-white">Tomorrow 3:30 PM (Dr. Rao, Cardiology)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">WhatsApp Dispatch</span>
                  <span className="text-emerald-300 font-bold">Official Calendar Pass Delivered</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/40">DPDP Compliance</span>
                  <span className="text-rose-300">Voice Audio Stream Redacted at Edge</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footbar */}
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
                shot === i ? "w-8 bg-rose-400 shadow-[0_0_8px_#fb7185]" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              title={`Jump to Shot ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase text-rose-300/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Telephony Wave + WhatsApp Text → Single Unified Record</span>
        </div>
      </div>
    </div>
  );
}
