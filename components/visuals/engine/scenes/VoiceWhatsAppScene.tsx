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
      className="relative flex min-h-[480px] w-full flex-col justify-between overflow-hidden rounded-none bg-[#F2EAE0] p-6 text-charcoal sm:p-10 border border-vaultAmber/20"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Ambient Warm Tungsten/Champagne Backlight */}
      
      
      <div className="pointer-events-none absolute inset-0 [background-size:28px_28px] opacity-30" />

      {/* Loom Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-vaultAmber/15 pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-mark animate-pulse" />
          <span className="font-medium tracking-[0.2em] text-vaultAmber uppercase">
            ARTIFACT V : THE HARMONIC DUAL-STREAM LOOM
          </span>
        </div>
        <div>
          <span className="rounded-none border border-mark bg-mark/10 px-3 py-1 font-mono text-[10px] font-medium text-vaultAmber">
            {shot === 0 && "DUAL HARMONIC CHAMBERS READY"}
            {shot === 1 && "ANALOG VACUUM TUBE + DIGITAL QUARTZ"}
            {shot === 2 && "BRAIDED THREAD WEAVING VECTORS"}
            {shot === 3 && "UNIFIED CUSTOMER MATRIX FORMED"}
            {shot === 4 && "BRAKES DPDP PRIVACY & EMR CHECK"}
            {shot === 5 && "ONE CUSTOMER TRUTH COMMITTED ✓"}
          </span>
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
          {/* Shot 0: Idle state */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-vaultAmber/25 bg-voidSurface ">
                <span className="h-2.5 w-2.5 rounded-full bg-vaultAmber animate-ping" />
              </div>
              <p className="font-mono text-sm text-charcoal/50 max-w-sm">
                Dual telephony lines and WhatsApp webhook streams balanced in the loom.
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
              <div className="rounded-none border border-mark bg-voidSurface p-4 ">
                <div className="flex justify-between text-[9px] text-vaultAmber uppercase pb-1 border-b border-vaultAmber/20">
                  <span>Analog Voice (PRI-2)</span>
                  <span className="font-bold text-neonCyan">240ms Latency</span>
                </div>
                <p className="mt-2.5 font-mono text-xs text-charcoal leading-relaxed">
                  &ldquo;Reschedule my clinic appointment for tomorrow afternoon...&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-vaultAmber animate-pulse" />
                  <span className="text-[10px] text-charcoal/60">Acoustic Audio Stream</span>
                </div>
              </div>

              {/* Right Chamber: Digital Quartz WhatsApp */}
              <div className="rounded-none border border-mark bg-voidSurface p-4 ">
                <div className="flex justify-between text-[9px] text-vaultAmber uppercase pb-1 border-b border-vaultAmber/20">
                  <span>WhatsApp Digital</span>
                  <span className="font-bold text-neonCyan">DPDP Verified</span>
                </div>
                <p className="mt-2.5 font-mono text-xs text-charcoal leading-relaxed">
                  &ldquo;Patient ID: P-88219 (Vikram Patel). Please confirm Dr. Rao slot.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-vaultAmber animate-pulse" />
                  <span className="text-[10px] text-charcoal/60">Encrypted JSON Packet</span>
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
                {/* Voice filament */}
                <motion.path
                  d="M 20,25 Q 150,5 250,50 T 480,75"
                  stroke="#9B8EC7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  filter="drop-shadow(0 0 8px rgba(157,142,199,0.8))"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />
                {/* WhatsApp filament */}
                <motion.path
                  d="M 20,75 Q 150,95 250,50 T 480,25"
                  stroke="#1A1820"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  filter="drop-shadow(0 0 8px rgba(234,228,213,0.8))"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.15 }}
                />
                <circle cx="250" cy="50" r="6" fill="#1A1820" />
              </svg>
              <span className="font-mono text-xs font-semibold text-vaultAmber tracking-wider">
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
                { tag: "PATIENT IDENTITY", val: "Vikram Patel (P-88219)" },
                { tag: "CLINICAL INTENT", val: "Cardiology Reschedule" },
                { tag: "TARGET DOCTOR", val: "Dr. Rao (OPD Room 3)" },
                { tag: "REQUESTED TIME", val: "Tomorrow 3:30 PM" },
              ].map((pill, idx) => (
                <motion.div
                  key={pill.tag}
                  initial={{ scale: 0.8, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.12 }}
                  className="flex items-center gap-2 rounded-none border border-mark bg-voidSurface px-4 py-2.5 text-charcoal"
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider text-vaultAmber">{pill.tag}:</span>
                  <span className="font-semibold text-neonCyan">✦ {pill.val}</span>
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
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-vaultAmber bg-black0_0_30px_rgba(157,142,199,0.3)]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-1.5 rounded-full border-t border-vaultAmber"
                />
                <span className="text-xs font-bold tracking-widest text-vaultAmber">BRAKES</span>
              </div>
              <div className="rounded-none border border-mark bg-voidSurface px-5 py-2.5 text-charcoal ">
                <span className="text-charcoal/70">Clinical Conflict Check & DPDP Redaction: </span>
                <strong className="text-neonCyan">Dr. Rao Slot Available · Audio PII Encrypted ✓</strong>
              </div>
            </motion.div>
          )}

          {/* Shot 5: ONE CUSTOMER TRUTH */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="relative w-full max-w-md rounded-none border border-mark bg-voidSurface p-6 text-left0_20px_60px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center justify-between border-b border-vaultAmber/20 pb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-mark" />
                  <span className="font-bold tracking-widest text-vaultAmber uppercase">
                    ONE CUSTOMER TRUTH COMMITTED
                  </span>
                </div>
                <span className="font-mono font-bold text-neonCyan">EMR LOCKED ✓</span>
              </div>

              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-rule-hair">
                  <span className="text-charcoal/40">Hospital EMR Slot</span>
                  <span className="font-medium text-charcoal">Tomorrow 3:30 PM (Dr. Rao, Cardiology)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rule-hair">
                  <span className="text-charcoal/40">WhatsApp Dispatch</span>
                  <span className="text-vaultAmber font-semibold">Official Calendar Pass Delivered</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-charcoal/40">DPDP Compliance</span>
                  <span className="text-neonCyan">Voice Audio Stream Redacted at Edge</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footbar */}
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
          <span>Telephony Wave + WhatsApp Text → Single Unified Record</span>
        </div>
      </div>
    </div>
  );
}
