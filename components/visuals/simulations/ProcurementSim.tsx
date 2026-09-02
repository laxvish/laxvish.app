"use client";

export function ProcurementSim() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs font-semibold text-charcoal">
            Procurement Engine • 3-Vendor Benchmark & PO Dispatch
          </span>
        </div>
        <span className="font-mono text-[11px] text-charcoal/50">
          Saved ₹1,00,000 vs List Price
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {/* Comparison Table */}
        <div className="overflow-hidden rounded-xl border border-charcoal/10 bg-obsidian font-mono text-xs">
          <div className="grid grid-cols-4 bg-vaultAmber/40 p-3 font-semibold text-charcoal">
            <span>VENDOR</span>
            <span>UNIT PRICE</span>
            <span>DELIVERY SLA</span>
            <span>DECISION</span>
          </div>
          <div className="grid grid-cols-4 border-t border-charcoal/5 p-3 text-charcoal bg-white font-medium">
            <span>CompuAge Direct</span>
            <span className="font-bold text-emerald-700">₹31,400</span>
            <span>3 Days (FOB)</span>
            <span className="font-bold text-emerald-700">AWARDED (Best Score)</span>
          </div>
          <div className="grid grid-cols-4 border-t border-charcoal/5 p-3 text-charcoal/60">
            <span>TechData India</span>
            <span>₹33,900</span>
            <span>Next Day</span>
            <span>Outpriced</span>
          </div>
          <div className="grid grid-cols-4 border-t border-charcoal/5 p-3 text-charcoal/60">
            <span>Redington Hub</span>
            <span>₹32,000</span>
            <span>10 Days</span>
            <span>Slow SLA</span>
          </div>
        </div>

        {/* PO Dispatch Stamp */}
        <div className="flex items-center justify-between rounded-xl border border-charcoal/10 bg-vaultAmber/20 p-4 font-mono text-xs">
          <div>
            <span className="text-charcoal/50 text-[10px]">GENERATED PURCHASE ORDER</span>
            <p className="font-bold text-charcoal">PO #PO-8819 Dispatched to CompuAge Direct</p>
          </div>
          <span className="rounded bg-charcoal px-3 py-1 font-bold text-obsidian">
            PO COMMITTED ✓
          </span>
        </div>
      </div>
    </div>
  );
}
