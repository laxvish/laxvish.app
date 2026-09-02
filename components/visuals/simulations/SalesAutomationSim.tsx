"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SalesAutomationSim() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="group relative rounded-[2rem] p-2 bg-charcoal/5 ring-1 ring-charcoal/10 shadow-2xl transition-all duration-700">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#0D0F12] p-6 text-white sm:p-8">
        {/* Background glow orb */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />

        {/* Top Hardware HUD Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
              Deal Desk Radar • Inbound Velocity
            </span>
          </div>

          <div className="flex gap-1.5 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
            {["1. Ingest", "2. Score", "3. Dispatch", "4. Sync"].map((step, idx) => (
              <button
                key={step}
                type="button"
                onClick={() => setStage(idx)}
                className={`rounded-full px-3 py-1 font-mono text-[10px] transition-all ${
                  stage === idx
                    ? "bg-white text-black font-bold shadow-sm"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        {/* Main Split Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left: Lead Prospect Dossier */}
          <div className="space-y-4 lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
              <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
                <span>INCOMING WEBHOOK • WHATSAPP ENTERPRISE</span>
                <span className="text-emerald-400 font-semibold">● LIVE STREAM</span>
              </div>

              <div className="mt-4 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 text-base font-bold text-black shadow-lg">
                  RM
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-white">Rajan Mehta</h4>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[9px] text-white/70">
                      Apex Freight Express
                    </span>
                  </div>
                  <p className="text-xs text-white/50">
                    VP Operations • 120 Fleet Trucks • Mumbai, MH
                  </p>
                  <p className="mt-3 rounded-xl border border-white/5 bg-black/40 p-3 text-xs leading-relaxed text-white/80">
                    &ldquo;Looking to automate driver POD verification and fuel invoice reconciliation for 120 vehicles before Q3 close. Need custom demo.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* ICP Score Dial & Velocity Gauge */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                  ICP Match
                </span>
                <p className="mt-1 font-mono text-lg font-bold text-emerald-400">
                  96.4%
                </p>
                <span className="text-[9px] text-white/50">Tier-1 Qualified</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                  Estimated ARR
                </span>
                <p className="mt-1 font-mono text-lg font-bold text-white">
                  ₹18.5L
                </p>
                <span className="text-[9px] text-white/50">120 Seat License</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                  Velocity
                </span>
                <p className="mt-1 font-mono text-lg font-bold text-emerald-400">
                  14 mins
                </p>
                <span className="text-[9px] text-white/50">Time to Meeting</span>
              </div>
            </div>
          </div>

          {/* Right: Automated Calendar Slotter & CRM Commit */}
          <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md lg:col-span-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase text-white/70">
                  AI Slot Dispatch
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-400">
                  Auto-Slotted
                </span>
              </div>

              {/* Interactive Calendar Card */}
              <div className="mt-4 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 shadow-inner">
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-emerald-300">CONFIRMED DEMO SLOT</p>
                    <p className="font-bold text-white">Thursday, 3:30 PM IST</p>
                  </div>
                  <span className="text-base font-bold text-emerald-400">✓</span>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                  <p className="text-[10px] text-white/40">ASSIGNED SOLUTIONS ARCHITECT</p>
                  <p className="font-semibold text-white">Rohan Sharma (Enterprise Lead)</p>
                  <p className="text-[10px] text-white/50">Google Meet invite dispatched via WhatsApp</p>
                </div>
              </div>
            </div>

            {/* CRM Webhook Footer */}
            <div className="border-t border-white/10 pt-4 font-mono text-[11px] text-white/60">
              <div className="flex justify-between">
                <span>HubSpot / Salesforce Sync:</span>
                <span className="text-emerald-400 font-semibold">LEAD-9042 COMMITTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
