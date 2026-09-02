"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SalesAutomationSim() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* HUD Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-mono text-xs font-semibold text-charcoal">
            SalesEngine.AI / Pipeline Radar
          </span>
        </div>
        <div className="flex gap-2">
          {["Inbound", "Scoring", "Outreach", "Booked"].map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => setStage(i)}
              className={`rounded px-2.5 py-1 font-mono text-[10px] transition-colors ${
                stage === i
                  ? "bg-charcoal text-obsidian font-bold"
                  : "bg-vaultAmber/40 text-charcoal/60 hover:text-charcoal"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left: Lead Dossier */}
        <div className="space-y-4 lg:col-span-7">
          <div className="rounded-xl border border-charcoal/10 bg-obsidian p-4">
            <div className="flex items-center justify-between text-xs text-charcoal/50">
              <span>INCOMING LEAD (WHATSAPP)</span>
              <span className="font-mono text-[10px]">Just now</span>
            </div>
            <div className="mt-3 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-sm font-bold text-obsidian">
                RM
              </div>
              <div>
                <h4 className="text-sm font-semibold text-charcoal">
                  Rajan Mehta
                </h4>
                <p className="text-xs text-charcoal/60">
                  VP Operations • Apex Freight Express (120 Fleet)
                </p>
                <p className="mt-2 rounded-lg bg-white p-2.5 text-xs text-charcoal/80 border border-charcoal/5">
                  &ldquo;Need to automate dispatch routing and POD invoice matching for 120 trucks. Can we deploy this month?&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Live Action Card based on stage */}
          <AnimatePresence mode="wait">
            {stage >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-charcoal/10 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neonCyan">
                  <span>AI QUALIFICATION MATRIX</span>
                  <span className="font-bold text-emerald-600">96.4% ICP MATCH</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded bg-vaultAmber/30 p-2">
                    <span className="block text-[10px] text-charcoal/50">Deal Size</span>
                    <span className="font-mono font-bold text-charcoal">₹18L ARR</span>
                  </div>
                  <div className="rounded bg-vaultAmber/30 p-2">
                    <span className="block text-[10px] text-charcoal/50">Urgency</span>
                    <span className="font-mono font-bold text-emerald-600">Immediate</span>
                  </div>
                  <div className="rounded bg-vaultAmber/30 p-2">
                    <span className="block text-[10px] text-charcoal/50">Routing</span>
                    <span className="font-mono font-bold text-charcoal">Enterprise AE</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Calendar & Outbound Stream */}
        <div className="flex flex-col justify-between rounded-xl border border-charcoal/10 bg-vaultAmber/20 p-5 lg:col-span-5">
          <div>
            <span className="font-mono text-xs font-semibold text-charcoal/70">
              CALENDAR DISPATCH
            </span>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm border border-charcoal/5">
                <span className="text-xs font-medium text-charcoal">Thursday, 3:30 PM IST</span>
                <motion.span
                  animate={{ scale: stage >= 3 ? [1, 1.15, 1] : 1 }}
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    stage >= 3 ? "bg-emerald-100 text-emerald-700" : "bg-charcoal/5 text-charcoal/50"
                  }`}
                >
                  {stage >= 3 ? "CONFIRMED ✓" : "PROPOSED"}
                </motion.span>
              </div>

              <div className="rounded-lg bg-white/60 p-3 text-xs text-charcoal/70">
                <p className="font-mono text-[10px] text-neonCyan">ASSIGNED REP</p>
                <p className="font-medium text-charcoal">Rohan S. (Senior Solutions Architect)</p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-charcoal/10 pt-4 text-xs">
            <span className="font-mono text-[10px] text-charcoal/50">CRM SYNC</span>
            <div className="mt-1 flex items-center justify-between text-charcoal/80">
              <span className="font-mono">SF-LEAD-9042</span>
              <span className="font-semibold text-emerald-600">Synced to HubSpot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
