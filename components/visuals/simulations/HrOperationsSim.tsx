"use client";

export function HrOperationsSim() {
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
              PeopleOps • Employee Onboarding & Identity Passport
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/60">
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              Onboarding SLA: <strong className="text-emerald-400">4 mins (was 3 days)</strong>
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-12">
          {/* Left: Employee Digital Passport */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 font-mono text-xs backdrop-blur-md md:col-span-6">
            <div className="flex items-center justify-between text-[10px] text-white/40">
              <span>EMPLOYEE ONBOARDING PASSPORT</span>
              <span className="text-emerald-400 font-bold">DAY 1 READY</span>
            </div>
            <div className="flex items-center gap-3.5 pt-2">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 text-sm font-bold text-black shadow-md">
                PS
              </div>
              <div>
                <p className="font-bold text-sm text-white">Priya Sharma</p>
                <p className="text-[11px] text-white/50">Senior Frontend Engineer (Bangalore)</p>
              </div>
            </div>
            <div className="space-y-1.5 pt-2 text-[11px] text-white/70">
              <div className="flex justify-between border-b border-white/5 py-1">
                <span>PAN Verification:</span>
                <span className="font-bold text-emerald-400">NSDL API Matched ✓</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-1">
                <span>Aadhaar Vault:</span>
                <span className="font-bold text-emerald-400">Tokenized (DPDP Safe) ✓</span>
              </div>
              <div className="flex justify-between py-1">
                <span>PF & Gratuity:</span>
                <span className="font-bold text-emerald-400">Enrolled ✓</span>
              </div>
            </div>
          </div>

          {/* Right: System Provisioning Checklist */}
          <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md md:col-span-6 font-mono text-xs">
            <div>
              <span className="text-xs font-semibold uppercase text-white/70">
                SYSTEM PROVISIONING CHECKLIST
              </span>
              <div className="mt-3 space-y-2 text-[11px]">
                <div className="flex items-center justify-between rounded-xl bg-black/40 p-2.5 border border-white/5">
                  <span>Google Workspace (priya.s@laxvish.app)</span>
                  <span className="font-bold text-emerald-400">PROVISIONED ✓</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-black/40 p-2.5 border border-white/5">
                  <span>GitHub Enterprise & Slack Access</span>
                  <span className="font-bold text-emerald-400">INVITED ✓</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-black/40 p-2.5 border border-white/5">
                  <span>Hardware Dispatch Track</span>
                  <span className="font-bold text-white">Bluedart #BD-9912</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-2 text-[11px] text-white/50">
              <span>HRMS (Keka / Darwinbox) state committed in 4 minutes.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
