"use client";

export function ReportingAnalyticsSim() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs font-semibold text-charcoal">
            WBR Report Studio • Automated Pipeline Extraction (420k Rows)
          </span>
        </div>
        <span className="font-mono text-[11px] text-charcoal/50">
          Distribution: Slack #leadership + Exec PDF
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        {/* Left: Aggregation Pipeline */}
        <div className="space-y-3 rounded-xl border border-charcoal/10 bg-obsidian p-5 font-mono text-xs md:col-span-6">
          <span className="text-[10px] text-charcoal/40 uppercase">DATA SOURCES AGGREGATED</span>
          <div className="space-y-2 pt-2 text-[11px]">
            <div className="flex justify-between rounded bg-white p-2 border border-charcoal/5">
              <span>Google BigQuery (Prod Transactions)</span>
              <span className="font-bold text-emerald-700">380k Rows ✓</span>
            </div>
            <div className="flex justify-between rounded bg-white p-2 border border-charcoal/5">
              <span>Stripe Charges API</span>
              <span className="font-bold text-emerald-700">40k Rows ✓</span>
            </div>
            <div className="flex justify-between rounded bg-white p-2 border border-charcoal/5">
              <span>Google Ads & Meta Ads Spend</span>
              <span className="font-bold text-emerald-700">Reconciled ✓</span>
            </div>
          </div>
        </div>

        {/* Right: Compiled Executive Brief */}
        <div className="flex flex-col justify-between space-y-3 rounded-xl border border-charcoal/10 bg-vaultAmber/20 p-5 md:col-span-6 font-mono text-xs">
          <div>
            <span className="text-xs font-semibold text-charcoal/70">
              COMPILED WBR EXECUTIVE NARRATIVE
            </span>
            <div className="mt-3 space-y-2 text-[11px] leading-relaxed text-charcoal/80">
              <p>• Week-over-Week ARR rose <strong className="text-emerald-700">+14.2%</strong> led by enterprise upsells.</p>
              <p>• Blended CAC dropped to <strong className="text-charcoal">₹2,140</strong> with referral conversion at all-time high.</p>
              <p>• Zero mathematical discrepancy across GAAP balance sheets.</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-charcoal/10 pt-2 text-[11px] text-charcoal/60">
            <span>Delivered Monday 8:01 AM</span>
            <span className="font-bold text-charcoal">AUDITED ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
