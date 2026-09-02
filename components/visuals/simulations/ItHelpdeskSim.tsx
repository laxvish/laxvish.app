"use client";

export function ItHelpdeskSim() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs font-semibold text-charcoal">
            IT Security Terminal • Zero-Trust Access Controller
          </span>
        </div>
        <span className="font-mono text-[11px] text-charcoal/50">
          SOC-2 Type II Audited
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        {/* Left: Terminal Log Stream */}
        <div className="space-y-3 rounded-xl border border-charcoal/20 bg-charcoal p-5 font-mono text-xs text-obsidian md:col-span-8">
          <div className="flex items-center justify-between text-[10px] text-neonCyan/80">
            <span>TERMINAL SESSION ID: SEC-88912</span>
            <span>OKTA SSO: VERIFIED</span>
          </div>

          <div className="space-y-1.5 pt-2 text-[11px] leading-relaxed">
            <p className="text-emerald-400">
              ➜ [INTAKE] Ticket #INC-4029: Production P1 Incident assigned to karthik.m
            </p>
            <p className="text-obsidian/80">
              ➜ [SECURITY RADAR] Validating PagerDuty On-Call Roster... Match Confirmed.
            </p>
            <p className="text-neonCyan">
              ➜ [IAM ELEVATION] Generating AWS STS AssumeRole token for CloudWatch-Logs-Viewer...
            </p>
            <p className="text-emerald-400 font-bold">
              ➜ [STATUS] 4-Hour Access Granted. Auto-revocation armed at 19:30 IST.
            </p>
          </div>
        </div>

        {/* Right: Security Badge & Access Timer */}
        <div className="flex flex-col justify-between space-y-4 rounded-xl border border-charcoal/10 bg-vaultAmber/20 p-5 md:col-span-4 font-mono">
          <div>
            <span className="text-xs font-semibold text-charcoal/70">
              TIME-BOUND ACCESS
            </span>
            <div className="mt-3 rounded-lg bg-white p-3 text-center border border-charcoal/5">
              <span className="text-[10px] text-charcoal/40 uppercase">Auto-Revoke In</span>
              <p className="text-xl font-bold text-charcoal">03:59:42</p>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-charcoal/50">Privilege:</span>
              <span className="font-semibold text-charcoal">Read-Only</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/50">SIEM Hash:</span>
              <span className="font-semibold text-emerald-700">0x9f2a...b441 ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
