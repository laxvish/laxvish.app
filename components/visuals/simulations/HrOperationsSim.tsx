"use client";

export function HrOperationsSim() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs font-semibold text-charcoal">
            PeopleOps • Automated Onboarding & Document Verification
          </span>
        </div>
        <span className="font-mono text-[11px] text-charcoal/50">
          SLA: 4 mins (was 3 days)
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        {/* Left: Employee Digital Passport */}
        <div className="space-y-3 rounded-xl border border-charcoal/10 bg-obsidian p-5 font-mono text-xs md:col-span-6">
          <div className="flex items-center justify-between text-[10px] text-charcoal/40">
            <span>EMPLOYEE ONBOARDING PASSPORT</span>
            <span>DAY 1 READY</span>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-sm font-bold text-obsidian">
              PS
            </div>
            <div>
              <p className="font-bold text-charcoal text-sm">Priya Sharma</p>
              <p className="text-[11px] text-charcoal/60">Senior Frontend Engineer (Bangalore)</p>
            </div>
          </div>
          <div className="space-y-1.5 pt-2 text-[11px]">
            <div className="flex justify-between border-b border-charcoal/5 py-1">
              <span>PAN Verification:</span>
              <span className="font-bold text-emerald-700">NSDL API Matched ✓</span>
            </div>
            <div className="flex justify-between border-b border-charcoal/5 py-1">
              <span>Aadhaar Vault:</span>
              <span className="font-bold text-emerald-700">Tokenized (DPDP Safe) ✓</span>
            </div>
            <div className="flex justify-between py-1">
              <span>PF & Gratuity:</span>
              <span className="font-bold text-emerald-700">Enrolled ✓</span>
            </div>
          </div>
        </div>

        {/* Right: Tool Provisioning Checklist */}
        <div className="flex flex-col justify-between space-y-4 rounded-xl border border-charcoal/10 bg-vaultAmber/20 p-5 md:col-span-6 font-mono text-xs">
          <div>
            <span className="text-xs font-semibold text-charcoal/70">
              SYSTEM PROVISIONING CHECKLIST
            </span>
            <div className="mt-3 space-y-2 text-[11px]">
              <div className="flex items-center justify-between rounded bg-white p-2 border border-charcoal/5">
                <span>Google Workspace (priya.s@laxvish.app)</span>
                <span className="font-bold text-emerald-700">PROVISIONED ✓</span>
              </div>
              <div className="flex items-center justify-between rounded bg-white p-2 border border-charcoal/5">
                <span>GitHub Enterprise & Slack #engineering</span>
                <span className="font-bold text-emerald-700">INVITED ✓</span>
              </div>
              <div className="flex items-center justify-between rounded bg-white p-2 border border-charcoal/5">
                <span>MacBook Pro Hardware Dispatch</span>
                <span className="font-bold text-charcoal">Bluedart #BD-9912</span>
              </div>
            </div>
          </div>

          <div className="border-t border-charcoal/10 pt-2 text-[11px] text-charcoal/60">
            <span>HRMS (Keka / Darwinbox) state committed in 4 minutes.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
