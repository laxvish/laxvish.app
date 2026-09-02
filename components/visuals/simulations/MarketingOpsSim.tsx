"use client";

export function MarketingOpsSim() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs font-semibold text-charcoal">
            Marketing Ops • Campaign Orchestrator & ROI Radar
          </span>
        </div>
        <span className="font-mono text-[11px] text-charcoal/50">
          Audience: 4,850 Target ICP Accounts
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-charcoal/10 bg-obsidian p-4">
          <span className="font-mono text-[10px] uppercase text-charcoal/40">1. SEGMENT SPLIT</span>
          <p className="mt-1 font-bold text-charcoal text-sm">CROs & Risk Heads</p>
          <div className="mt-3 space-y-1 font-mono text-xs text-charcoal/70">
            <p>NBFC Upper Layer: 1,420</p>
            <p>Fintech Growth: 3,430</p>
          </div>
        </div>

        <div className="rounded-xl border border-charcoal/10 bg-obsidian p-4">
          <span className="font-mono text-[10px] uppercase text-charcoal/40">2. MULTI-CHANNEL DISPATCH</span>
          <p className="mt-1 font-bold text-charcoal text-sm">Email + WhatsApp API</p>
          <div className="mt-3 space-y-1 font-mono text-xs text-charcoal/70">
            <p className="text-emerald-700 font-bold">Open Rate: 46.8%</p>
            <p>Delivered: 99.2%</p>
          </div>
        </div>

        <div className="rounded-xl border border-charcoal/10 bg-vaultAmber/30 p-4">
          <span className="font-mono text-[10px] uppercase text-charcoal/40">3. PIPELINE ATTRIBUTION</span>
          <p className="mt-1 font-bold text-charcoal text-sm">348 Registrations</p>
          <div className="mt-3 space-y-1 font-mono text-xs text-charcoal/70">
            <p className="font-bold text-charcoal">Pipeline: ₹42.0L</p>
            <p>Cost/Lead: ₹182</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-4 text-xs font-mono">
        <span className="text-charcoal/60">Automated lead score sync to HubSpot Active</span>
        <span className="rounded bg-charcoal px-3 py-1 font-bold text-obsidian">
          CAMPAIGN LIVE ✓
        </span>
      </div>
    </div>
  );
}
