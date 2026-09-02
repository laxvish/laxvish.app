"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function KnowledgeScene() {
  const [shot, setShot] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timers = [
      setTimeout(() => setShot(1), 1800), // Shot 1: 4,200+ docs in suspension
      setTimeout(() => setShot(2), 3800), // Shot 2: Query pulse emitted
      setTimeout(() => setShot(3), 5800), // Shot 3: Noise dims, 3-node constellation awakens
      setTimeout(() => setShot(4), 7800), // Shot 4: Nodes converge & Brakes audit
      setTimeout(() => setShot(5), 9800), // Shot 5: One calm answer (Source verified)
      setTimeout(() => setShot(0), 13000), // Reset
    ];
    return () => timers.forEach(clearTimeout);
  }, [shot, isAutoPlay]);

  return (
    <div className="relative flex min-h-[420px] w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-[#FAF8F5] p-6 text-charcoal sm:p-10">
      {/* Background Subtle Particle Matrix */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#111111_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-[0.05]" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-charcoal/10 pb-3.5 font-mono text-[11px] text-charcoal/50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-charcoal uppercase">SCENE 04</span>
          <span>:</span>
          <span className="uppercase tracking-wider">INTERNAL KNOWLEDGE ENGINE</span>
        </div>
        <div>
          <span className="rounded-full bg-charcoal/5 px-2.5 py-0.5 text-[10px] font-semibold text-charcoal">
            {shot === 0 && "Standby Memory Vault"}
            {shot === 1 && "Shot 1 · 4,200+ Documents in Suspension"}
            {shot === 2 && "Shot 2 · Query Pulse Emitted"}
            {shot === 3 && "Shot 3 · Constellation Awakens"}
            {shot === 4 && "Shot 4 · Information Merges"}
            {shot === 5 && "Shot 5 · One Calm Answer · Source Verified"}
          </span>
        </div>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6 text-center">
        <AnimatePresence mode="wait">
          {/* Shot 0: Dormant space */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 font-mono text-xs text-charcoal/40"
            >
              <div className="h-3 w-3 rounded-full bg-charcoal/30 animate-pulse" />
              <span>Indexing 4,200+ documents across Notion, SharePoint, Drive, and Confluence...</span>
            </motion.div>
          )}

          {/* Shot 1: 4,200+ Documents in suspension */}
          {shot === 1 && (
            <motion.div
              key="shot-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="grid grid-cols-8 gap-3 sm:grid-cols-10">
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.15, 0.5, 0.15],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      delay: (i % 7) * 0.2,
                    }}
                    className="h-2 w-2 rounded-full bg-charcoal/40"
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-charcoal/60">
                4,200+ corporate artifacts suspended in calm memory.
              </span>
            </motion.div>
          )}

          {/* Shot 2: User asks question -> Query pulse emerges */}
          {shot === 2 && (
            <motion.div
              key="shot-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full max-w-md flex-col items-center gap-3"
            >
              <div className="w-full rounded-2xl border border-charcoal/20 bg-white p-4 text-left shadow-sm">
                <span className="font-mono text-[10px] uppercase text-charcoal/40">Query Pulse</span>
                <p className="mt-1 font-serif text-sm italic text-charcoal/90">
                  &ldquo;What is our travel reimbursement policy for client on-sites exceeding 14 days?&rdquo;
                </p>
              </div>
              {/* Expanding Radial Pulse */}
              <div className="relative flex h-14 w-full items-center justify-center">
                <motion.div
                  initial={{ width: 20, opacity: 0.9 }}
                  animate={{ width: "90%", opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                  className="h-1 rounded-full bg-charcoal"
                />
              </div>
            </motion.div>
          )}

          {/* Shot 3: Noise dims, 3-node constellation awakens */}
          {shot === 3 && (
            <motion.div
              key="shot-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs"
            >
              {[
                { title: "HR Handbook 2025 §4.2", desc: "Per-diem rules after day 14", conf: "99.2%" },
                { title: "Finance Travel Matrix.pdf", desc: "Bangalore Tier-1 Hotel Cap", conf: "98.7%" },
                { title: "Executive SOP #22", desc: "Client billing override pass-through", conf: "97.4%" },
              ].map((doc, idx) => (
                <motion.div
                  key={doc.title}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.15 }}
                  className="rounded-2xl border border-charcoal/20 bg-charcoal p-3.5 text-left text-white shadow-md"
                >
                  <div className="flex items-center justify-between text-[9px] text-white/50 pb-1">
                    <span>MATCHED DOC</span>
                    <span className="text-emerald-400 font-bold">{doc.conf}</span>
                  </div>
                  <p className="font-bold text-xs mt-0.5">{doc.title}</p>
                  <p className="text-[11px] text-white/70 mt-0.5">{doc.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Shot 4: Nodes converge & Brakes audit */}
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
                <span className="text-charcoal/60">Citation Verification: </span>
                <span className="font-bold text-emerald-700">Exact Handbook Paragraph Corroborated ✓</span>
              </div>
            </motion.div>
          )}

          {/* Shot 5: One calm answer (Source verified) */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-charcoal/20 bg-white p-5 text-left shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-2.5 font-mono text-[10px]">
                <span className="font-bold uppercase text-charcoal">THE COMPANY REMEMBERS</span>
                <span className="font-bold text-emerald-700">SOURCE VERIFIED ✓</span>
              </div>
              <div className="mt-3.5 space-y-3 font-mono text-xs">
                <p className="font-serif text-sm leading-relaxed text-charcoal">
                  &ldquo;For client on-site deployments exceeding 14 days, the per-diem increases to <strong className="font-mono text-xs font-bold text-charcoal">₹3,500/day</strong> with direct hotel master-billing and weekend travel allowance.&rdquo;
                </p>
                <div className="flex items-center justify-between rounded-lg bg-charcoal/5 px-3 py-2 text-[11px] text-charcoal/70 border border-charcoal/10">
                  <span>Cited: HR-Policy-Handbook-2025.pdf (§4.2)</span>
                  <span className="font-bold text-charcoal">RBAC Clear</span>
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
          Vast Memory · One Calm, Verified Answer
        </div>
      </div>
    </div>
  );
}
