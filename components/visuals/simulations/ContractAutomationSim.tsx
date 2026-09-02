"use client";

export function ContractAutomationSim() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs font-semibold text-charcoal">
            LegalRadar • Master Services Agreement Redline
          </span>
        </div>
        <span className="font-mono text-[11px] text-charcoal/50">
          Human Sign-off Gate: Active
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left: Redlined Contract Excerpt */}
        <div className="space-y-4 rounded-xl border border-charcoal/10 bg-obsidian p-5 lg:col-span-8 font-serif text-sm">
          <div className="flex items-center justify-between border-b border-charcoal/10 pb-2 font-mono text-[10px] text-charcoal/40">
            <span>SECTION 14.1 — LIMITATION OF LIABILITY</span>
            <span>CLAUSE 14 OF 34</span>
          </div>

          <p className="leading-relaxed text-charcoal/80">
            Except for gross negligence, in no event shall either party&rsquo;s total aggregate liability arising out of or related to this Agreement exceed{" "}
            <span className="bg-red-100 text-red-800 line-through px-1 font-sans text-xs">
              an unlimited amount of direct or indirect damages
            </span>{" "}
            <span className="bg-emerald-100 text-emerald-800 px-1 font-sans text-xs font-semibold">
              the total fees paid or payable by Client in the twelve (12) months preceding the claim.
            </span>
          </p>

          <div className="rounded bg-white p-3 font-mono text-xs text-charcoal/70 border border-charcoal/5">
            <span className="font-bold text-red-700">AI Redline Commentary:</span> Replaced client-requested unlimited liability with standard market 12-month cap. Preserves vendor risk boundaries.
          </div>
        </div>

        {/* Right: Risk Radar & Approval Button */}
        <div className="flex flex-col justify-between space-y-4 rounded-xl border border-charcoal/10 bg-vaultAmber/20 p-5 lg:col-span-4">
          <div>
            <span className="font-mono text-xs font-semibold text-charcoal/70">
              PLAYBOOK AUDIT
            </span>

            <div className="mt-4 space-y-2 font-mono text-xs">
              <div className="flex justify-between rounded bg-white p-2 border border-charcoal/5">
                <span className="text-charcoal/50">Risk Level</span>
                <span className="font-bold text-emerald-700">Low (Post-Edit)</span>
              </div>
              <div className="flex justify-between rounded bg-white p-2 border border-charcoal/5">
                <span className="text-charcoal/50">Governing Law</span>
                <span className="font-bold text-charcoal">Mumbai Jurisdiction ✓</span>
              </div>
              <div className="flex justify-between rounded bg-white p-2 border border-charcoal/5">
                <span className="text-charcoal/50">Payment Terms</span>
                <span className="font-bold text-charcoal">Net 30 Days ✓</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full rounded bg-charcoal py-2 font-mono text-xs font-medium text-obsidian shadow-sm hover:bg-neonCyan transition-colors"
          >
            Accept AI Redline →
          </button>
        </div>
      </div>
    </div>
  );
}
