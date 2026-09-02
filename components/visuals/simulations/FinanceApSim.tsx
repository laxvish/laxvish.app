"use client";

export function FinanceApSim() {
  return (
    <div className="group relative rounded-[2rem] p-2 bg-charcoal/5 ring-1 ring-charcoal/10 shadow-2xl transition-all duration-700">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#0D0F12] p-6 text-white sm:p-8">
        {/* Glow background */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
              Finance & AP Auto-Reconciliation (3-Way Match Deck)
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/60">
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              Variance: <strong className="text-emerald-400">₹0.00</strong>
            </span>
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              ERP: <strong className="text-white">SAP S/4HANA</strong>
            </span>
          </div>
        </div>

        {/* 3 Physical Cards in Deck */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {/* Card 1: Vendor Invoice */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 font-mono text-xs backdrop-blur-md">
            <div className="flex justify-between text-[10px] text-white/40">
              <span>1. VENDOR INVOICE</span>
              <span className="text-emerald-400">● VERIFIED</span>
            </div>
            <p className="mt-2 font-bold text-sm text-white">AWS India Cloud</p>
            <div className="mt-4 space-y-1.5 text-[11px] text-white/70">
              <div className="flex justify-between">
                <span>Invoice #:</span>
                <span className="font-semibold text-white">IN-2026-9921</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-bold text-white">₹3,42,100.00</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>GSTIN:</span>
                <span>27AAACH... ✓</span>
              </div>
            </div>
          </div>

          {/* Card 2: Budget / PO Cap */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 font-mono text-xs backdrop-blur-md">
            <div className="flex justify-between text-[10px] text-white/40">
              <span>2. BUDGET / PO CAP</span>
              <span className="text-emerald-400">● MATCHED</span>
            </div>
            <p className="mt-2 font-bold text-sm text-white">Engineering Infra</p>
            <div className="mt-4 space-y-1.5 text-[11px] text-white/70">
              <div className="flex justify-between">
                <span>Allocated Cap:</span>
                <span className="font-semibold text-white">₹4,00,000.00</span>
              </div>
              <div className="flex justify-between">
                <span>Utilization:</span>
                <span className="font-bold text-emerald-400">85.5% (Safe)</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>Variance:</span>
                <span>₹0.00 (Zero Drift)</span>
              </div>
            </div>
          </div>

          {/* Card 3: ERP Journal Commit */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 font-mono text-xs backdrop-blur-md">
            <div className="flex justify-between text-[10px] text-emerald-400 font-semibold">
              <span>3. ERP JOURNAL COMMIT</span>
              <span>AUTO-BATCHED</span>
            </div>
            <p className="mt-2 font-bold text-sm text-white">SAP / Tally Ledger</p>
            <div className="mt-4 space-y-1.5 text-[11px] text-white/80">
              <div className="flex justify-between">
                <span>Debit Ledger:</span>
                <span>Hosting Capex</span>
              </div>
              <div className="flex justify-between">
                <span>Credit Ledger:</span>
                <span>AP - AWS India</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-300 pt-1.5 border-t border-emerald-500/20">
                <span>GST ITC Claim:</span>
                <span>₹52,184.00 ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs">
          <span className="text-white/50">Scheduled for automated payment release batch</span>
          <span className="rounded-full bg-white px-3 py-1 font-bold text-black shadow-md">
            RECONCILED ✓
          </span>
        </div>
      </div>
    </div>
  );
}
