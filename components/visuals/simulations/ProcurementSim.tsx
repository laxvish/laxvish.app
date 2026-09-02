"use client";

export function ProcurementSim() {
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
              Procurement Engine • 3-Vendor Price Benchmark & PO Dispatch
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/60">
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              Savings: <strong className="text-emerald-400">₹1,00,000 Saved</strong>
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {/* Comparison Table */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] font-mono text-xs backdrop-blur-md">
            <div className="grid grid-cols-4 bg-white/5 p-3.5 font-semibold text-white/70">
              <span>VENDOR</span>
              <span>UNIT QUOTE</span>
              <span>DELIVERY SLA</span>
              <span>DECISION</span>
            </div>
            <div className="grid grid-cols-4 border-t border-white/10 p-3.5 text-white bg-emerald-500/10 font-medium">
              <span className="font-bold">CompuAge Direct</span>
              <span className="font-bold text-emerald-400">₹31,400</span>
              <span>3 Days (FOB)</span>
              <span className="font-bold text-emerald-300">AWARDED ✓</span>
            </div>
            <div className="grid grid-cols-4 border-t border-white/5 p-3.5 text-white/50">
              <span>TechData India</span>
              <span>₹33,900</span>
              <span>Next Day</span>
              <span>Outpriced</span>
            </div>
            <div className="grid grid-cols-4 border-t border-white/5 p-3.5 text-white/50">
              <span>Redington Hub</span>
              <span>₹32,000</span>
              <span>10 Days</span>
              <span>Slow SLA</span>
            </div>
          </div>

          {/* PO Dispatch Action */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-mono text-xs">
            <div>
              <span className="text-[10px] text-white/40 uppercase">AUTO-GENERATED PURCHASE ORDER</span>
              <p className="font-bold text-white mt-0.5">PO #PO-8819 Dispatched to CompuAge Direct</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 font-bold text-black shadow-md">
              PO COMMITTED ✓
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
