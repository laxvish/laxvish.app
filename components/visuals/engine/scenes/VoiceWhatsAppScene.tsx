"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function VoiceWhatsAppScene() {
  const [phase, setPhase] = useState<"dual" | "converging" | "unified">("dual");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("converging"), 1500);
    const t2 = setTimeout(() => setPhase("unified"), 3600);
    const t3 = setTimeout(() => setPhase("dual"), 7500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase]);

  return (
    <div className="relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-[#FAF8F5] p-8 text-charcoal sm:p-12">
      {/* Header */}
      <div className="flex items-center justify-between font-mono text-[11px] text-charcoal/40 uppercase tracking-widest border-b border-charcoal/10 pb-4">
        <span>Chapter 05 : Voice & WhatsApp Convergence</span>
        <span>
          {phase === "dual" && "Independent Channels"}
          {phase === "converging" && "The Thread Unifies Context"}
          {phase === "unified" && "Customer Understood"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "dual" && (
          <div className="grid w-full max-w-lg gap-6 md:grid-cols-2">
            {/* Left: Phone Waveform */}
            <div className="rounded-2xl border border-charcoal/10 bg-white p-4 shadow-sm text-center">
              <span className="font-mono text-[10px] text-charcoal/40 uppercase">Telephony (PRI Line 2)</span>
              <p className="mt-2 font-serif text-xs italic text-charcoal/70">
                &ldquo;Reschedule my clinic appointment for tomorrow afternoon...&rdquo;
              </p>
            </div>

            {/* Right: WhatsApp Fragment */}
            <div className="rounded-2xl border border-charcoal/10 bg-white p-4 shadow-sm text-center">
              <span className="font-mono text-[10px] text-charcoal/40 uppercase">WhatsApp Stream</span>
              <p className="mt-2 font-serif text-xs italic text-charcoal/70">
                &ldquo;Patient ID: P-88219 (Vikram Patel)&rdquo;
              </p>
            </div>
          </div>
        )}

        {phase === "converging" && (
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-charcoal/50">
              MERGING AUDIO + TEXT + HISTORICAL EMR CONTEXT
            </span>
            <div className="flex gap-2">
              {["VOICE STREAM", "+", "WHATSAPP METADATA", "+", "EMR DOCTOR SCHEDULE"].map((el, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-full bg-charcoal px-3 py-1 font-mono text-[11px] text-white"
                >
                  {el}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {phase === "unified" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl text-left"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3 font-mono text-[10px] text-charcoal/40 uppercase">
              <span>CUSTOMER STATE UNIFIED</span>
              <span className="font-bold text-emerald-700">Slot Confirmed</span>
            </div>
            <div className="mt-4 space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal/50">Patient:</span>
                <span className="font-semibold text-charcoal">Vikram Patel (#P-88219)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Doctor & Slot:</span>
                <span className="font-bold text-charcoal">Dr. Sharma • Tomorrow 3:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Confirmation:</span>
                <span className="font-semibold text-emerald-700">Voice TTS + WhatsApp Map Link Sent</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-charcoal/10 pt-4 font-serif text-xs italic text-charcoal/60">
        Laxvish does not care which channel work arrives through. All streams resolve into one customer truth.
      </div>
    </div>
  );
}
