"use client";

import { motion } from "framer-motion";

export function VoiceWhatsAppSim() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-mono text-xs font-semibold text-charcoal">
            SIP PRI Line #2 • Inbound Voice Stream (Exotel Gateway)
          </span>
        </div>
        <span className="font-mono text-[11px] text-charcoal/50">
          Codec: Opus HD (240ms Latency)
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        {/* Left: Waveform Studio & Transcript */}
        <div className="space-y-4 rounded-xl border border-charcoal/10 bg-obsidian p-5 md:col-span-7">
          <div className="flex items-center justify-between text-xs font-mono text-charcoal/50">
            <span>LIVE AUDIO STREAM</span>
            <span>+91 98200 XXXXX</span>
          </div>

          {/* Sine Wave Graphic */}
          <div className="flex h-16 items-center justify-center gap-1 rounded-lg bg-white p-3 border border-charcoal/5">
            {[14, 28, 44, 58, 32, 60, 48, 22, 54, 38, 18, 46, 62, 30, 20].map((h, i) => (
              <motion.span
                key={i}
                animate={{ height: [8, h, 10] }}
                transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.05 }}
                className="w-1.5 rounded-full bg-charcoal"
              />
            ))}
          </div>

          {/* Live Transcript Stream */}
          <div className="space-y-2 text-xs">
            <div className="rounded-lg bg-white p-3 border border-charcoal/5">
              <span className="font-mono text-[10px] text-charcoal/40">CALLER (HINDI/ENG):</span>
              <p className="mt-1 text-charcoal">
                &ldquo;Hello, mujhe Dr. Sharma ke saath kal afternoon ka appointment reschedule karna hai.&rdquo;
              </p>
            </div>
            <div className="rounded-lg bg-charcoal p-3 text-obsidian">
              <span className="font-mono text-[10px] text-neonCyan">AI RECEPTIONIST (VOICE):</span>
              <p className="mt-1">
                &ldquo;Sure! Kal afternoon 3:30 PM ka slot available hai. Should I confirm this for you?&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Right: Hospital EMR & Calendar Action */}
        <div className="flex flex-col justify-between space-y-4 rounded-xl border border-charcoal/10 bg-vaultAmber/20 p-5 md:col-span-5">
          <div>
            <span className="font-mono text-xs font-semibold text-charcoal/70">
              EMR / CALENDAR MUTATION
            </span>

            <div className="mt-4 space-y-2.5 font-mono text-xs">
              <div className="rounded-lg bg-white p-3 border border-charcoal/5">
                <span className="text-[10px] text-charcoal/40">PATIENT ID</span>
                <p className="font-bold text-charcoal">P-88219 (Vikram Patel)</p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-charcoal/5">
                <span className="text-[10px] text-charcoal/40">NEW SLOT CONFIRMED</span>
                <p className="font-bold text-emerald-700">Tomorrow 3:30 PM IST</p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-charcoal/5">
                <span className="text-[10px] text-charcoal/40">WHATSAPP SUMMARY</span>
                <p className="font-bold text-charcoal">Dispatched with location link</p>
              </div>
            </div>
          </div>

          <div className="border-t border-charcoal/10 pt-3 text-[11px] font-mono text-charcoal/60">
            <span>Audio Redaction: DPDP Safe ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
