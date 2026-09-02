"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function SupportScene() {
  const [shot, setShot] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timers = [
      setTimeout(() => setShot(1), 1800), // Shot 1: Chaotic messages arriving
      setTimeout(() => setShot(2), 3800), // Shot 2: Thread sweeps through
      setTimeout(() => setShot(3), 5600), // Shot 3: Collapse into Identity/Auth/Access
      setTimeout(() => setShot(4), 7400), // Shot 4: Brakes verifies & acts
      setTimeout(() => setShot(5), 9400), // Shot 5: Access Restored (Calm settlement)
      setTimeout(() => setShot(0), 12500), // Reset
    ];
    return () => timers.forEach(clearTimeout);
  }, [shot, isAutoPlay]);

  return (
    <div className="relative flex min-h-[420px] w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-[#FAF8F5] p-6 text-charcoal sm:p-10">
      {/* Subtle Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#111111_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-[0.05]" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-charcoal/10 pb-3.5 font-mono text-[11px] text-charcoal/50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-charcoal uppercase">SCENE 02</span>
          <span>:</span>
          <span className="uppercase tracking-wider">CUSTOMER SUPPORT ENGINE</span>
        </div>
        <div>
          <span className="rounded-full bg-charcoal/5 px-2.5 py-0.5 text-[10px] font-semibold text-charcoal">
            {shot === 0 && "Standby Queue"}
            {shot === 1 && "Shot 1 · Chaotic Noise Inflow"}
            {shot === 2 && "Shot 2 · Thread Traverses Stream"}
            {shot === 3 && "Shot 3 · Semantic Reduction"}
            {shot === 4 && "Shot 4 · Brakes Verification Check"}
            {shot === 5 && "Shot 5 · Access Restored · Total Calm"}
          </span>
        </div>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6 text-center">
        <AnimatePresence mode="wait">
          {/* Shot 0: Idle support desk */}
          {shot === 0 && (
            <motion.div
              key="shot-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 font-mono text-xs text-charcoal/40"
            >
              <div className="h-3 w-3 rounded-full bg-charcoal/30 animate-pulse" />
              <span>Monitoring omnichannel customer inbox across WhatsApp, Web & Email...</span>
            </motion.div>
          )}

          {/* Shot 1: Chaotic misaligned messages entering */}
          {shot === 1 && (
            <motion.div
              key="shot-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex w-full max-w-md flex-col gap-2.5 text-left font-mono text-xs"
            >
              <motion.div
                initial={{ x: -25, rotate: -2, opacity: 0 }}
                animate={{ x: 0, rotate: -2, opacity: 1 }}
                className="rounded-xl border border-red-200 bg-white p-3 shadow-sm text-charcoal"
              >
                &ldquo;I can&rsquo;t login to the dashboard since 9:00 AM.&rdquo;
              </motion.div>
              <motion.div
                initial={{ x: 30, rotate: 1.5, opacity: 0 }}
                animate={{ x: 0, rotate: 1.5, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-amber-200 bg-white p-3 shadow-sm text-charcoal"
              >
                &ldquo;Password reset didn&rsquo;t work, no SMS or email arrived.&rdquo;
              </motion.div>
              <motion.div
                initial={{ y: 20, rotate: -1, opacity: 0 }}
                animate={{ y: 0, rotate: -1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-red-300 bg-white p-3 shadow-sm text-charcoal font-semibold"
              >
                &ldquo;Need access urgently! Board meeting in 15 mins!&rdquo;
              </motion.div>
              <div className="text-center font-mono text-[10px] text-charcoal/50 mt-1">
                Queue Depth: 42 tickets · Sentiment: Critical
              </div>
            </motion.div>
          )}

          {/* Shot 2: The Laxvish Thread appears and passes through every message */}
          {shot === 2 && (
            <motion.div
              key="shot-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex w-full max-w-md flex-col items-center justify-center py-4"
            >
              <svg viewBox="0 0 400 80" className="h-20 w-full overflow-visible">
                {/* Sweeping Thread line */}
                <motion.path
                  d="M 10,40 Q 100,5 200,40 T 390,40"
                  stroke="#111111"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="200"
                  cy="40"
                  r="5"
                  fill="#111111"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              </svg>
              <span className="font-mono text-xs font-bold text-charcoal">
                The Thread sweeps through chaos, isolating root cause from panic.
              </span>
            </motion.div>
          )}

          {/* Shot 3: Collapse into IDENTITY, AUTHENTICATION, ACCESS */}
          {shot === 3 && (
            <motion.div
              key="shot-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs"
            >
              {[
                { label: "IDENTITY", val: "rajiv@apexcap.in (Verified Okta SSO)" },
                { label: "AUTHENTICATION", val: "SAML Token Expired (TTL 24h)" },
                { label: "ACCESS", val: "Tier-1 Board Member Clearance" },
              ].map((pill, idx) => (
                <motion.div
                  key={pill.label}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex items-center gap-2 rounded-full border border-charcoal/20 bg-charcoal px-4 py-2 text-white shadow-md"
                >
                  <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">{pill.label}</span>
                  <span className="text-white/90">{pill.val}</span>
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
              {/* Brakes Ring */}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-charcoal bg-white shadow-lg">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-1 rounded-full border-t-2 border-emerald-600"
                />
                <span className="text-[10px] font-bold text-charcoal">BRAKES</span>
              </div>
              <div className="rounded-xl border border-charcoal/15 bg-white px-4 py-2 shadow-xs">
                <span className="text-charcoal/60">Evaluating Security Policy: </span>
                <span className="font-bold text-emerald-700">Automated Token Re-Issuance Cleared ✓</span>
              </div>
            </motion.div>
          )}

          {/* Shot 5: ACCESS RESTORED (Clarity and Complete Resolution) */}
          {shot === 5 && (
            <motion.div
              key="shot-5"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-charcoal/20 bg-white p-5 text-left shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-2.5 font-mono text-[10px]">
                <span className="font-bold uppercase text-charcoal">INCIDENT #INC-4402 RESOLVED</span>
                <span className="font-bold text-emerald-700">1.4s TOTAL ELAPSED ✓</span>
              </div>
              <div className="mt-3 space-y-2 font-mono text-xs">
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-emerald-950">
                  <span className="block font-bold">ACCESS RESTORED</span>
                  <span className="text-[11px] text-emerald-800">
                    SAML session re-authenticated. Magic link & WhatsApp OTP delivered to executive device.
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-charcoal/60 pt-1">
                  <span>Customer Sentiment</span>
                  <span className="font-bold text-charcoal">Calm · Ticket Closed</span>
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
          From Noisy Chaos to Verified Resolution
        </div>
      </div>
    </div>
  );
}
