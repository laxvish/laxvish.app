"use client";

import { useState } from "react";

export function ContractAutomationSim() {
  const [showRedline, setShowRedline] = useState(true);

  return (
    <div className="group relative rounded-[2rem] p-2 bg-charcoal/5 ring-1 ring-charcoal/10 shadow-2xl transition-all duration-700">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#0D0F12] p-6 text-white sm:p-8">
        {/* Glow background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-[80px]" />

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
              LegalRadar • Master Services Agreement Redline
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowRedline(!showRedline)}
              className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] text-white hover:bg-white/20 transition-colors"
            >
              {showRedline ? "SHOW ORIGINAL" : "SHOW REDLINE"}
            </button>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-400">
              Risk: Low (Post-Edit)
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left: Contract Paragraph */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 font-serif text-sm backdrop-blur-md lg:col-span-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[10px] text-white/40">
              <span>SECTION 14.1 — LIMITATION OF LIABILITY</span>
              <span>CLAUSE 14 OF 34</span>
            </div>

            <p className="leading-relaxed text-white/80 font-sans text-xs sm:text-sm">
              Except for gross negligence, in no event shall either party&rsquo;s total aggregate liability arising out of or related to this Agreement exceed{" "}
              {showRedline ? (
                <>
                  <span className="bg-red-500/20 text-red-300 line-through px-1 rounded">
                    an unlimited amount of direct or indirect damages
                  </span>{" "}
                  <span className="bg-emerald-500/20 text-emerald-300 px-1 font-semibold rounded">
                    the total fees paid or payable by Client in the twelve (12) months preceding the claim.
                  </span>
                </>
              ) : (
                <span className="bg-red-500/20 text-red-300 px-1 rounded">
                  an unlimited amount of direct or indirect damages
                </span>
              )}
            </p>

            <div className="rounded-xl border border-white/5 bg-black/40 p-3 font-mono text-xs text-white/70">
              <span className="font-bold text-amber-400">AI Legal Commentary:</span> Replaced client-requested uncapped liability with standard 12-month fee cap. Keeps enterprise exposure bounded.
            </div>
          </div>

          {/* Right: Playbook Audit Radar */}
          <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md lg:col-span-4 font-mono text-xs">
            <div>
              <span className="text-xs font-semibold uppercase text-white/70">
                PLAYBOOK AUDIT
              </span>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between rounded-xl bg-black/40 p-2.5 border border-white/5">
                  <span className="text-white/40">Jurisdiction</span>
                  <span className="font-bold text-white">Mumbai Courts ✓</span>
                </div>
                <div className="flex justify-between rounded-xl bg-black/40 p-2.5 border border-white/5">
                  <span className="text-white/40">Payment Terms</span>
                  <span className="font-bold text-white">Net 30 Days ✓</span>
                </div>
                <div className="flex justify-between rounded-xl bg-black/40 p-2.5 border border-white/5">
                  <span className="text-white/40">Indemnity Cap</span>
                  <span className="font-bold text-emerald-400">12x Fees ✓</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-white py-2.5 text-center font-mono text-xs font-bold text-black shadow-lg hover:bg-neonCyan hover:text-white transition-colors"
            >
              Sign-off & Accept Redline →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
