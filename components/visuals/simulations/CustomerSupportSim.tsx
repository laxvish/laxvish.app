"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function CustomerSupportSim() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="group relative rounded-[2rem] p-2 bg-charcoal/5 ring-1 ring-charcoal/10 shadow-2xl transition-all duration-700">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#0D0F12] p-6 text-white sm:p-8">
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
              Omnichannel Support Engine • 24/7 Live
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/60">
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              Avg Resolution: <strong className="text-cyan-400">1.4s</strong>
            </span>
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              Escalation: <strong className="text-emerald-400">0.0%</strong>
            </span>
          </div>
        </div>

        {/* Main Conversation Stream */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left: Chat Thread */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md lg:col-span-7">
            <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
              <span>WHATSAPP CONVERSATION #8841</span>
              <span>+91 98200 XXXXX</span>
            </div>

            {/* Customer Message */}
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xs font-bold text-white">
                C
              </div>
              <div className="rounded-2xl rounded-tl-none border border-white/10 bg-white/[0.05] p-3.5 text-xs text-white/90 shadow-sm">
                <p>&ldquo;Mera order #48291 abhi tak deliver nahi hua, need urgent update.&rdquo;</p>
                <span className="mt-1 block font-mono text-[9px] text-white/40">11:42 AM • WhatsApp</span>
              </div>
            </div>

            {/* AI Agent Response */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-start justify-end gap-3"
            >
              <div className="rounded-2xl rounded-tr-none border border-cyan-500/30 bg-gradient-to-br from-cyan-950/60 to-black p-3.5 text-xs text-white shadow-lg">
                <p className="leading-relaxed">
                  &ldquo;Namaste! Aapka package Bandra Hub se nikal chuka hai. Delivery partner Suresh K. is on the way (ETA: 3:30 PM). Live tracking link sent to your WhatsApp.&rdquo;
                </p>
                <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-cyan-400/80 border-t border-white/10 pt-2">
                  <span>Resolved via ERP Telemetry RAG</span>
                  <span>✓✓ Delivered</span>
                </div>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-xs font-bold text-black shadow-md">
                AI
              </div>
            </motion.div>
          </div>

          {/* Right: Audio Waveform & RAG Telemetry */}
          <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md lg:col-span-5">
            <div>
              <span className="font-mono text-xs font-semibold uppercase text-white/70">
                Voice & Telemetry Radar
              </span>

              {/* Dynamic Equalizer Waveform */}
              <div className="mt-4 flex h-16 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-black/40 p-3">
                {[20, 42, 58, 28, 52, 68, 38, 62, 32, 48, 24, 56, 36, 60, 22].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{ height: [10, h, 12] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.06 }}
                    className="w-1 rounded-full bg-cyan-400"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between rounded-xl bg-black/40 p-2.5 border border-white/5">
                <span className="text-white/40">Language Detection</span>
                <span className="font-bold text-white">Hinglish (Hindi+English)</span>
              </div>
              <div className="flex justify-between rounded-xl bg-black/40 p-2.5 border border-white/5">
                <span className="text-white/40">Confidence Score</span>
                <span className="font-bold text-emerald-400">99.1% (Auto-Sent)</span>
              </div>
              <div className="flex justify-between rounded-xl bg-black/40 p-2.5 border border-white/5">
                <span className="text-white/40">CRM Ticket Committed</span>
                <span className="font-bold text-cyan-400">Zendesk #8812</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
