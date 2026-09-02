"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function ItHelpdeskScene() {
  const [phase, setPhase] = useState<"broken" | "tracing" | "restored">("broken");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("tracing"), 1500);
    const t2 = setTimeout(() => setPhase("restored"), 3600);
    const t3 = setTimeout(() => setPhase("broken"), 7500);
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
        <span>Chapter 08 : IT Helpdesk & Nervous System</span>
        <span>
          {phase === "broken" && "Node Interruption Detected"}
          {phase === "tracing" && "The Thread Tracing Root Cause"}
          {phase === "restored" && "System Restored"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "broken" && (
          <div className="flex items-center gap-4 font-mono text-xs">
            <div className="rounded-lg bg-white border border-charcoal/20 px-3 py-2">DEVICE</div>
            <span>→</span>
            <div className="rounded-lg bg-white border border-charcoal/20 px-3 py-2">NETWORK</div>
            <span>→</span>
            <div className="rounded-lg bg-red-100 border border-red-300 px-3 py-2 text-red-900 font-bold">
              AUTH (STS ROLE TIMEOUT) ✗
            </div>
            <span>→</span>
            <div className="rounded-lg bg-white/50 border border-charcoal/10 px-3 py-2 text-charcoal/40">SERVICE</div>
          </div>
        )}

        {phase === "tracing" && (
          <div className="flex flex-col items-center gap-3 font-mono text-xs">
            <span className="text-[10px] uppercase text-charcoal/40 tracking-wider">
              VALIDATING PAGERDUTY ON-CALL ROSTER & OKTA IDENTITY
            </span>
            <div className="rounded-full bg-charcoal px-5 py-2 text-white font-medium shadow-md">
              Generating 4-Hour Time-Bound STS Elevation Token
            </div>
          </div>
        )}

        {phase === "restored" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl text-left font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3 text-[10px] text-charcoal/40 uppercase">
              <span>SYSTEM RESTORED</span>
              <span className="font-bold text-emerald-700">SOC-2 COMPLIANT ✓</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal/50">Engineer:</span>
                <span className="font-semibold text-charcoal">karthik.m@laxvish.app</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Temporary Role:</span>
                <span className="font-bold text-charcoal">CloudWatch-LogViewer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/50">Auto-Revocation Timer:</span>
                <span className="font-bold text-emerald-700">Armed (03:59:42)</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-charcoal/10 pt-4 font-serif text-xs italic text-charcoal/60">
        No ticket backlog. Diagnosis, intervention, and recovery happen in one unbroken motion.
      </div>
    </div>
  );
}
