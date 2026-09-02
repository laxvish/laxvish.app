"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function CustomerSupportSim() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % 3);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs font-semibold text-charcoal">
            Omnichannel Support Desk • 24/7 Active
          </span>
        </div>
        <span className="font-mono text-[11px] text-charcoal/50">
          Latency: 1.2s • Sentiment: Resolved
        </span>
      </div>

      {/* Main Conversation Stream */}
      <div className="mt-6 grid gap-6 md:grid-cols-12">
        {/* Left: Chat Simulation */}
        <div className="space-y-4 rounded-xl border border-charcoal/10 bg-obsidian p-4 md:col-span-7">
          <div className="flex items-center justify-between text-[11px] text-charcoal/40 font-mono">
            <span>WHATSAPP CONVERSATION #8841</span>
            <span>+91 98200 XXXXX</span>
          </div>

          {/* User Message */}
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-charcoal/10 text-xs font-bold text-charcoal">
              U
            </div>
            <div className="rounded-2xl rounded-tl-none bg-white p-3 text-xs text-charcoal shadow-sm border border-charcoal/5">
              <p>&ldquo;Mera order #48291 abhi tak deliver nahi hua, can you check status?&rdquo;</p>
              <span className="mt-1 block font-mono text-[9px] text-charcoal/40">11:42 AM</span>
            </div>
          </div>

          {/* AI Response */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-start justify-end gap-3"
          >
            <div className="rounded-2xl rounded-tr-none bg-charcoal p-3 text-xs text-obsidian shadow-sm">
              <p>
                &ldquo;Namaste! Aapka package Bandra Hub se dispatch ho chuka hai. Delivery agent Suresh K. is on the way (ETA: 3:30 PM). Live tracking link sent to your SMS.&rdquo;
              </p>
              <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-obsidian/70">
                <span>Auto-resolved via ERP RAG</span>
                <span>✓✓ Read</span>
              </div>
            </div>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neonCyan text-xs font-bold text-obsidian">
              AI
            </div>
          </motion.div>
        </div>

        {/* Right: Real-time Telemetry & Waveform HUD */}
        <div className="flex flex-col justify-between space-y-4 rounded-xl border border-charcoal/10 bg-vaultAmber/20 p-4 md:col-span-5">
          <div>
            <span className="font-mono text-xs font-semibold text-charcoal/70">
              AUDIO & TELEMETRY RADAR
            </span>

            {/* Dynamic Equalizer Bars */}
            <div className="mt-4 flex h-14 items-center justify-center gap-1.5 rounded-lg bg-white p-3 border border-charcoal/5">
              {[18, 36, 52, 24, 48, 64, 32, 56, 28, 44, 20].map((h, idx) => (
                <motion.span
                  key={idx}
                  animate={{
                    height: phase === 1 ? [12, h, 8] : [8, h * 0.7, 12],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    delay: idx * 0.08,
                  }}
                  className="w-1.5 rounded-full bg-neonCyan"
                />
              ))}
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between rounded bg-white p-2 border border-charcoal/5">
              <span className="text-charcoal/50">Language</span>
              <span className="font-bold text-charcoal">Hinglish (Hindi+English)</span>
            </div>
            <div className="flex justify-between rounded bg-white p-2 border border-charcoal/5">
              <span className="text-charcoal/50">Confidence</span>
              <span className="font-bold text-emerald-600">99.1% (No Human Gate)</span>
            </div>
            <div className="flex justify-between rounded bg-white p-2 border border-charcoal/5">
              <span className="text-charcoal/50">CRM Sync</span>
              <span className="font-bold text-charcoal">Zendesk #8812</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
