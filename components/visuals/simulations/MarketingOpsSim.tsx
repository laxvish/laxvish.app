"use client";

export function MarketingOpsSim() {
  return (
    <div className="group relative rounded-[2rem] p-2 bg-charcoal/5 ring-1 ring-charcoal/10 shadow-2xl transition-all duration-700">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#0D0F12] p-6 text-white sm:p-8">
        {/* Glow background */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
              Marketing Ops • Multi-Channel Campaign Orchestrator
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/60">
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              Audience: <strong className="text-white">4,850 Target ICP Accounts</strong>
            </span>
          </div>
        </div>

        {/* 3 Step Flow Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 font-mono text-xs backdrop-blur-md">
            <span className="text-[10px] text-white/40 uppercase">1. AUDIENCE SPLIT</span>
            <p className="mt-2 font-bold text-sm text-white">CROs & Risk Heads</p>
            <div className="mt-3 space-y-1 text-[11px] text-white/70">
              <p>NBFC Upper Layer: 1,420</p>
              <p>Fintech Growth: 3,430</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 font-mono text-xs backdrop-blur-md">
            <span className="text-[10px] text-white/40 uppercase">2. DYNAMIC DISPATCH</span>
            <p className="mt-2 font-bold text-sm text-white">Email + WhatsApp API</p>
            <div className="mt-3 space-y-1 text-[11px] text-white/70">
              <p className="text-emerald-400 font-bold">Open Rate: 46.8%</p>
              <p>Delivered: 99.2% (4,812)</p>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 font-mono text-xs backdrop-blur-md">
            <span className="text-[10px] text-cyan-300 uppercase">3. PIPELINE ATTRIBUTION</span>
            <p className="mt-2 font-bold text-sm text-white">348 Registrations</p>
            <div className="mt-3 space-y-1 text-[11px] text-white/80">
              <p className="font-bold text-emerald-300">Pipeline: ₹42.0L</p>
              <p>Cost Per Lead: ₹182</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs">
          <span className="text-white/50">Lead score stream synced to HubSpot CRM</span>
          <span className="rounded-full bg-white px-3 py-1 font-bold text-black shadow-md">
            CAMPAIGN ACTIVE ✓
          </span>
        </div>
      </div>
    </div>
  );
}
