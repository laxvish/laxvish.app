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
      className="relative flex min-h-[480px] w-full flex-col justify-between overflow-hidden rounded-none bg-[#F2EAE0] p-6 text-charcoal sm:p-10 border border-vaultAmber/20"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Deep Celestial Ambient Lighting */}
      
      
      <div className="pointer-events-none absolute inset-0 [background-size:28px_28px] opacity-30" />

      {/* Astrolabe Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-vaultAmber/15 pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-mark animate-pulse" />
          <span className="font-medium tracking-[0.2em] text-vaultAmber uppercase">
            ARTIFACT IV : THE CONSTELLATION ASTROLABE
          </span>
        </div>
        <div>
          <span className="rounded-none border border-mark bg-mark/10 px-3 py-1 font-mono text-[10px] font-medium text-vaultAmber">
            {shot === 0 && "MEMORY VAULT AT REST"}
            {shot === 1 && "4,200+ CORPORATE STARS SUSPENDED"}
            {shot === 2 && "SONAR QUERY PULSE EMITTED"}
            {shot === 3 && "3-STAR POLICY CONSTELLATION AWAKENED"}
            {shot === 4 && "BRAKES RBAC CLEARANCE AUDIT"}
            {shot === 5 && "LUMINOUS CITATION TABLET SEALED ✓"}
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
          {/* Shot 0: Idle celestial vault */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-vaultAmber/25 bg-voidSurface ">
                <span className="h-2.5 w-2.5 rounded-full bg-vaultAmber animate-ping" />
              </div>
              <p className="font-mono text-sm text-charcoal/50 max-w-sm">
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
                      opacity: [0.15, 0.7, 0.15],
                      scale: [0.8, 1.25, 0.8],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.5,
                      delay: (i % 9) * 0.2,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-mark"
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-charcoal/60">
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
              <div className="w-full rounded-2xl border border-vaultAmber/25 bg-voidSurface p-4 text-left ">
                <div className="flex justify-between font-mono text-[10px] text-vaultAmber uppercase">
                  <span>CELESTIAL QUERY PULSE</span>
                  <span className="font-bold text-neonCyan">14ms SEARCH RADAR</span>
                </div>
                <p className="mt-2 font-mono text-sm text-charcoal/90">
                  &ldquo;What is our travel reimbursement policy for client on-sites exceeding 14 days?&rdquo;
                </p>
              </div>

              {/* Expanding Shockwave Rings */}
              <div className="relative flex h-16 w-full items-center justify-center">
                <motion.div
                  initial={{ scale: 0.2, opacity: 0.9 }}
                  animate={{ scale: 2.1, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.3, ease: "easeOut" }}
                  className="h-14 w-14 rounded-full border border-vaultAmber"
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
                    className="rounded-2xl border border-vaultAmber/40 bg-voidSurface p-3.5 "
                  >
                    <div className="flex justify-between text-[8px] text-vaultAmber pb-1">
                      <span>POLICY STAR</span>
                      <span className="font-bold text-neonCyan">{star.conf}</span>
                    </div>
                    <div className="font-semibold text-[11px] text-charcoal mt-1 leading-tight">{star.title}</div>
                    <div className="text-[10px] text-charcoal/60 mt-1">{star.desc}</div>
                  </motion.div>
                ))}
              </div>
              <span className="mt-4 font-mono text-xs text-vaultAmber">
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
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-vaultAmber bg-black0_0_30px_rgba(157,142,199,0.3)]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-1.5 rounded-full border-t border-vaultAmber"
                />
                <span className="text-xs font-bold tracking-widest text-vaultAmber">BRAKES</span>
              </div>
              <div className="rounded-none border border-mark bg-voidSurface px-5 py-2.5 text-charcoal ">
                <span className="text-charcoal/70">Access Security Gate: </span>
                <strong className="text-neonCyan">User RBAC Tier Verified · Zero Hallucination Confirmed ✓</strong>
              </div>
            </motion.div>
          )}

          {/* Shot 5: Luminous Citation Tablet */}
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
                    THE COMPANY REMEMBERS
                  </span>
                </div>
                <span className="font-mono font-bold text-neonCyan">SOURCE VERIFIED ✓</span>
              </div>

              <div className="mt-4 space-y-3 font-mono text-xs">
                <p className="font-serif text-sm leading-relaxed text-charcoal">
                  &ldquo;For client on-site deployments exceeding 14 days, the per-diem increases to <strong className="font-mono text-xs font-bold text-vaultAmber">₹3,500/day</strong> with direct hotel master-billing and weekend travel allowance.&rdquo;
                </p>
                <div className="flex items-center justify-between rounded-xl bg-mist/30 px-3 py-2 text-[11px] text-charcoal border border-vaultAmber/20">
                  <span className="text-charcoal/80">Cited: HR-Policy-Handbook-2025.pdf (§4.2, Pg 18)</span>
                  <span className="font-bold text-vaultAmber">RBAC Gated</span>
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
          <span>Infinite Memory Nebula → One Calm Truth</span>
        </div>
      </div>
    </div>
  );
}
