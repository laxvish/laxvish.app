"use client";

import { motion } from "framer-motion";

export function ExecutiveIntelligenceSim() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs font-semibold text-charcoal">
            Executive Intelligence Radar • Federated Analytics Engine
          </span>
        </div>
        <span className="font-mono text-[11px] text-charcoal/50">
          Sync: BigQuery + Stripe + Postgres
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        {/* Left: Interactive Metric Card & Chart */}
        <div className="space-y-4 rounded-xl border border-charcoal/10 bg-obsidian p-5 md:col-span-7">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-charcoal/70">
              Q2 REVENUE & COHORT EXPANSION
            </span>
            <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
              +14.2% YoY
            </span>
          </div>

          {/* SVG Sparkline Simulation */}
          <div className="h-24 w-full pt-2">
            <svg viewBox="0 0 400 80" className="h-full w-full overflow-visible">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#111111" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#111111" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,60 Q 60,70 120,40 T 240,30 T 360,10 L 400,8 L 400,80 L 0,80 Z"
                fill="url(#grad)"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                d="M 0,60 Q 60,70 120,40 T 240,30 T 360,10 L 400,8"
                fill="none"
                stroke="#111111"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-charcoal/10 pt-3 text-center font-mono text-xs">
            <div>
              <span className="text-[10px] text-charcoal/40">ARR RUN-RATE</span>
              <p className="font-bold text-charcoal">₹4.82 Cr</p>
            </div>
            <div>
              <span className="text-[10px] text-charcoal/40">NET RETENTION</span>
              <p className="font-bold text-emerald-700">118.4%</p>
            </div>
            <div>
              <span className="text-[10px] text-charcoal/40">BLENDED CAC</span>
              <p className="font-bold text-charcoal">₹2,140</p>
            </div>
          </div>
        </div>

        {/* Right: AI Synthesis Bullet Points */}
        <div className="flex flex-col justify-between space-y-3 rounded-xl border border-charcoal/10 bg-vaultAmber/20 p-5 md:col-span-5">
          <div>
            <span className="font-mono text-xs font-semibold text-charcoal/70">
              AI NARRATIVE BRIEF
            </span>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-charcoal/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal" />
                <span>Enterprise tier expanded 24% driven by logistics client pilots.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal" />
                <span>Starter tier churn isolated to self-serve onboarding step 3.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-charcoal/10 pt-3 text-[11px] font-mono text-charcoal/60">
            <span>Reconciled vs Bank Deposits ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
