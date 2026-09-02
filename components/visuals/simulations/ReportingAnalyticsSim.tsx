"use client";

export function ReportingAnalyticsSim() {
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
              WBR Report Studio • Pipeline Extraction (420k Rows)
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/60">
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              Delivered: <strong className="text-white">Monday 8:01 AM IST</strong>
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-12">
          {/* Left: Aggregation Pipeline */}
          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 font-mono text-xs backdrop-blur-md md:col-span-6">
            <span className="text-[10px] text-white/40 uppercase">DATA SOURCES AGGREGATED</span>
            <div className="space-y-2 pt-2 text-[11px]">
              <div className="flex justify-between rounded-xl bg-black/40 p-2.5 border border-white/5">
                <span>Google BigQuery (Prod Transactions)</span>
                <span className="font-bold text-emerald-400">380k Rows ✓</span>
              </div>
              <div className="flex justify-between rounded-xl bg-black/40 p-2.5 border border-white/5">
                <span>Stripe Charges API</span>
                <span className="font-bold text-emerald-400">40k Rows ✓</span>
              </div>
              <div className="flex justify-between rounded-xl bg-black/40 p-2.5 border border-white/5">
                <span>Google Ads & Meta Spend Reconciled</span>
                <span className="font-bold text-emerald-400">Matched ✓</span>
              </div>
            </div>
          </div>

          {/* Right: Compiled Executive Brief */}
          <div className="flex flex-col justify-between space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md md:col-span-6 font-mono text-xs">
            <div>
              <span className="text-xs font-semibold uppercase text-white/70">
                COMPILED WBR EXECUTIVE NARRATIVE
              </span>
              <div className="mt-3 space-y-2.5 text-[11px] leading-relaxed text-white/80">
                <p>• Week-over-Week ARR rose <strong className="text-emerald-400">+14.2%</strong> led by enterprise logistics upsells.</p>
                <p>• Blended CAC dropped to <strong className="text-white">₹2,140</strong> with referral conversion at all-time high.</p>
                <p>• Zero mathematical discrepancy across GAAP balance sheets.</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[11px] text-white/50">
              <span>Auto-sent to Slack #leadership + Exec PDF</span>
              <span className="font-bold text-white">AUDITED ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
