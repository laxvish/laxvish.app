"use client";

import { motion } from "framer-motion";

export function VoiceWhatsAppSim() {
  return (
    <div className="group relative rounded-[2rem] p-2 bg-charcoal/5 ring-1 ring-charcoal/10 shadow-2xl transition-all duration-700">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#0D0F12] p-6 text-white sm:p-8">
        {/* Glow background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-500/10 blur-[80px]" />

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
              PRI Trunk #2 • Inbound Telephony Stream (Exotel/Twilio)
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/60">
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              Latency: <strong className="text-rose-400">240ms</strong>
            </span>
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              Redaction: <strong className="text-emerald-400">DPDP Active</strong>
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left: Sine Wave Audio Canvas & Transcript */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md lg:col-span-7">
            <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
              <span>ACTIVE AUDIO STREAM</span>
              <span>+91 98200 XXXXX</span>
            </div>

            {/* Dynamic Equalizer Canvas */}
            <div className="flex h-16 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-black/50 p-3">
              {[16, 32, 54, 68, 42, 64, 52, 28, 60, 44, 20, 52, 70, 36, 24].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: [8, h, 10] }}
                  transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.05 }}
                  className="w-1.5 rounded-full bg-rose-400"
                />
              ))}
            </div>

            {/* Live Transcript Stream */}
            <div className="space-y-2.5 text-xs font-mono">
              <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                <span className="text-[10px] text-white/40">CALLER (HINDI/ENG):</span>
                <p className="mt-1 text-white">
                  &ldquo;Hello, mujhe Dr. Sharma ke saath kal afternoon ka appointment reschedule karna hai.&rdquo;
                </p>
              </div>
              <div className="rounded-xl border border-rose-500/30 bg-gradient-to-br from-rose-950/60 to-black p-3 text-white">
                <span className="text-[10px] text-rose-300">AI VOICE RECEPTIONIST:</span>
                <p className="mt-1">
                  &ldquo;Sure! Kal afternoon 3:30 PM ka slot available hai. Should I confirm this for you?&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right: Hospital EMR & Calendar Action */}
          <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md lg:col-span-5">
            <div>
              <span className="font-mono text-xs font-semibold uppercase text-white/70">
                Hospital EMR & Calendar Commit
              </span>

              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                  <span className="text-[10px] text-white/40">PATIENT RECORD</span>
                  <p className="font-bold text-white">P-88219 (Vikram Patel)</p>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <span className="text-[10px] text-emerald-400">SLOT RESCHEDULED</span>
                  <p className="font-bold text-emerald-300">Tomorrow 3:30 PM IST ✓</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                  <span className="text-[10px] text-white/40">WHATSAPP NOTIFICATION</span>
                  <p className="font-bold text-white">Delivered with Hospital Map Link</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 text-[11px] font-mono text-white/60 flex justify-between">
              <span>Audio PII Scrubbed</span>
              <span className="text-emerald-400 font-bold">DPDP COMPLIANT ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
