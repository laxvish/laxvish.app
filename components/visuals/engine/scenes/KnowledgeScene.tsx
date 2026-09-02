"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function KnowledgeScene() {
  const [shot, setShot] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!isAutoPlay) return;
    const timers = [
      setTimeout(() => setShot(1), 1600), // Shot 1: 4,200 Suspended Memory Stars
      setTimeout(() => setShot(2), 3600), // Shot 2: Radiant Query Pulse Shockwave
      setTimeout(() => setShot(3), 5600), // Shot 3: 3-Star Policy Constellation Ignites
      setTimeout(() => setShot(4), 7600), // Shot 4: Brakes RBAC Governance Lock
      setTimeout(() => setShot(5), 9600), // Shot 5: Luminous Citation Tablet (One Calm Answer)
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
      className="relative flex min-h-[480px] w-full flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#07090E] p-6 text-white sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-violet-500/20"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Deep Violet & Emerald Celestial Ambient Lighting */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-violet-600/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#8b5cf6_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.05]" />

      {/* Astrolabe Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_#a78bfa] animate-pulse" />
          <span className="font-bold tracking-[0.2em] text-violet-300 uppercase">
            ARTIFACT IV : THE CONSTELLATION ASTROLABE
          </span>
        </div>
        <div>
          <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 font-mono text-[10px] font-semibold text-violet-200">
            {shot === 0 && "Memory Vault At Rest"}
            {shot === 1 && "4,200+ Corporate Stars Suspended"}
            {shot === 2 && "Sonar Query Pulse Emitted"}
            {shot === 3 && "3-Star Policy Constellation Awakened"}
            {shot === 4 && "Brakes RBAC Clearance Audit"}
            {shot === 5 && "Luminous Citation Tablet Sealed ✓"}
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
          {/* Shot 0: Idle celestial vault */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 backdrop-blur-md">
                <span className="h-3 w-3 rounded-full bg-violet-400 animate-ping" />
              </div>
              <p className="font-serif text-sm italic text-violet-200/60 max-w-sm">
                4,200 company memories suspended across Notion, SharePoint, and Google Drive.
              </p>
            </motion.div>
          )}

          {/* Shot 1: 4,200+ Suspended Memory Stars */}
          {shot === 1 && (
            <motion.div
              key="shot-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="grid grid-cols-10 gap-3 sm:grid-cols-12 max-w-lg">
                {Array.from({ length: 48 }).map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [0.8, 1.3, 0.8],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      delay: (i % 9) * 0.18,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_6px_#c4b5fd]"
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-violet-200/60">
                4,200+ enterprise documents suspended in celestial silence.
              </span>
            </motion.div>
          )}

          {/* Shot 2: Radiant Query Pulse Shockwave */}
          {shot === 2 && (
            <motion.div
              key="shot-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full max-w-md flex-col items-center gap-4"
            >
              <div className="w-full rounded-2xl border border-violet-400/30 bg-violet-950/40 p-4 text-left backdrop-blur-md shadow-2xl">
                <div className="flex justify-between font-mono text-[10px] text-violet-300 uppercase">
                  <span>CELESTIAL QUERY PULSE</span>
                  <span>14ms SEARCH RADAR</span>
                </div>
                <p className="mt-2 font-serif text-sm italic text-violet-100">
                  &ldquo;What is our travel reimbursement policy for client on-sites exceeding 14 days?&rdquo;
                </p>
              </div>

              {/* Expanding Shockwave Rings */}
              <div className="relative flex h-16 w-full items-center justify-center">
                <motion.div
                  initial={{ scale: 0.2, opacity: 1 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
                  className="h-14 w-14 rounded-full border-2 border-violet-400"
                />
              </div>
            </motion.div>
          )}

          {/* Shot 3: 3-Star Policy Constellation Ignites */}
          {shot === 3 && (
            <motion.div
              key="shot-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex w-full max-w-lg flex-col items-center justify-center py-2"
            >
              <div className="grid grid-cols-3 gap-3 font-mono text-xs text-left">
                {[
                  { title: "HR Handbook 2025 §4.2", desc: "Per-diem rules after day 14", conf: "99.4%" },
                  { title: "Travel Matrix SOP.pdf", desc: "Tier-1 Hotel Bangalore Master Billing", conf: "98.9%" },
                  { title: "Executive SOP #22", desc: "Client billing override pass-through", conf: "97.8%" },
                ].map((star, idx) => (
                  <motion.div
                    key={star.title}
                    initial={{ scale: 0.8, y: 30, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.15, type: "spring" }}
                    className="rounded-2xl border-2 border-violet-400/80 bg-gradient-to-b from-violet-950 to-black p-3.5 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  >
                    <div className="flex justify-between text-[8px] text-violet-300 pb-1">
                      <span>POLICY STAR</span>
                      <span className="font-bold text-emerald-400">{star.conf}</span>
                    </div>
                    <div className="font-bold text-[11px] text-white mt-1 leading-tight">{star.title}</div>
                    <div className="text-[10px] text-violet-200/70 mt-1">{star.desc}</div>
                  </motion.div>
                ))}
              </div>
              <span className="mt-4 font-mono text-xs text-violet-300/80">
                4,197 irrelevant documents fade to black. The exact 3 stars ignite.
              </span>
            </motion.div>
          )}

          {/* Shot 4: Brakes RBAC Clearance Audit */}
          {shot === 4 && (
            <motion.div
              key="shot-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 font-mono text-xs"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-violet-400 bg-black shadow-[0_0_40px_rgba(139,92,246,0.5)]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-1.5 rounded-full border-t-2 border-emerald-400"
                />
                <span className="text-xs font-bold tracking-widest text-violet-300">BRAKES</span>
              </div>
              <div className="rounded-2xl border border-violet-400/40 bg-violet-950/40 px-5 py-2.5 text-violet-200 backdrop-blur-md">
                <span>Access Security Gate: </span>
                <strong className="text-emerald-400">User RBAC Tier Verified · Zero Hallucination Confirmed ✓</strong>
              </div>
            </motion.div>
          )}

          {/* Shot 5: Luminous Citation Tablet */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.88, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative w-full max-w-md rounded-3xl border-2 border-violet-400/60 bg-gradient-to-b from-[#181328] to-[#0A0812] p-6 text-left shadow-[0_0_60px_rgba(139,92,246,0.35)]"
            >
              <div className="flex items-center justify-between border-b border-violet-400/20 pb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  <span className="font-bold tracking-widest text-violet-300 uppercase">
                    THE COMPANY REMEMBERS
                  </span>
                </div>
                <span className="font-mono font-bold text-emerald-400">SOURCE VERIFIED ✓</span>
              </div>

              <div className="mt-4 space-y-3 font-mono text-xs">
                <p className="font-serif text-sm leading-relaxed text-white">
                  &ldquo;For client on-site deployments exceeding 14 days, the per-diem increases to <strong className="font-mono text-xs font-bold text-emerald-300">₹3,500/day</strong> with direct hotel master-billing and weekend travel allowance.&rdquo;
                </p>
                <div className="flex items-center justify-between rounded-xl bg-violet-950/60 px-3 py-2 text-[11px] text-violet-200 border border-violet-400/20">
                  <span>Cited: HR-Policy-Handbook-2025.pdf (§4.2, Pg 18)</span>
                  <span className="font-bold text-emerald-400">RBAC Gated</span>
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
                shot === i ? "w-8 bg-violet-400 shadow-[0_0_8px_#a78bfa]" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              title={`Jump to Shot ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase text-violet-300/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Infinite Memory Nebula → One Calm Truth</span>
        </div>
      </div>
    </div>
  );
}
