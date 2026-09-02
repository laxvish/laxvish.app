"use client";

import { motion } from "framer-motion";

export function ExecutiveIntelligenceSim() {
  return (
    <div className="group relative rounded-[2rem] p-2 bg-charcoal/5 ring-1 ring-charcoal/10 shadow-2xl transition-all duration-700">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#0D0F12] p-6 text-white sm:p-8">
        {/* Glow background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
              Executive Intelligence Radar • Multi-Join Query Engine
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/60">
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              Sources: <strong className="text-white">BigQuery + Stripe + CRM</strong>
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left: Dynamic Sparkline & KPI Cards */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md lg:col-span-7">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-white/70">
                Q2 REVENUE & COHORT NET RETENTION
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                +14.2% YoY
              </span>
            </div>

            {/* SVG Sparkline */}
            <div className="h-28 w-full pt-2">
              <svg viewBox="0 0 400 90" className="h-full w-full overflow-visible">
                <defs>
                  <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,70 Q 70,80 130,45 T 260,35 T 380,12 L 400,10 L 400,90 L 0,90 Z"
                  fill="url(#chartGrad)"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  d="M 0,70 Q 70,80 130,45 T 260,35 T 380,12 L 400,10"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center font-mono text-xs">
              <div className="rounded-xl bg-black/40 p-2 border border-white/5">
                <span className="text-[9px] text-white/40">ARR RUN-RATE</span>
                <p className="font-bold text-white mt-0.5">₹4.82 Cr</p>
              </div>
              <div className="rounded-xl bg-black/40 p-2 border border-white/5">
                <span className="text-[9px] text-white/40">NET RETENTION</span>
                <p className="font-bold text-emerald-400 mt-0.5">118.4%</p>
              </div>
              <div className="rounded-xl bg-black/40 p-2 border border-white/5">
                <span className="text-[9px] text-white/40">BLENDED CAC</span>
                <p className="font-bold text-white mt-0.5">₹2,140</p>
              </div>
            </div>
          </div>

          {/* Right: AI Synthesis Bullet Points */}
          <div className="flex flex-col justify-between space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md lg:col-span-5">
            <div>
              <span className="font-mono text-xs font-semibold uppercase text-white/70">
                AI EXECUTIVE BRIEF
              </span>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-white/80">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>Enterprise tier expanded 24% driven by logistics client pilots.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>Starter tier churn isolated to self-serve onboarding step 3.</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-3 text-[11px] font-mono text-white/60 flex justify-between">
              <span>Zero Reconciliation Error</span>
              <span className="text-emerald-400 font-bold">RECONCILED ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
