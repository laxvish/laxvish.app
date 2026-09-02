"use client";

export function ItHelpdeskSim() {
  return (
    <div className="group relative rounded-[2rem] p-2 bg-charcoal/5 ring-1 ring-charcoal/10 shadow-2xl transition-all duration-700">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#0D0F12] p-6 text-white sm:p-8">
        {/* Glow background */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
              Zero-Trust IT Terminal • STS Access Controller
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/60">
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              SOC-2: <strong className="text-blue-400">Type II Logged</strong>
            </span>
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              Okta: <strong className="text-emerald-400">MFA Verified</strong>
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left: Terminal Output Stream */}
          <div className="space-y-3 rounded-2xl border border-white/15 bg-black/60 p-5 font-mono text-xs backdrop-blur-md lg:col-span-8">
            <div className="flex items-center justify-between text-[10px] text-white/40">
              <span>SESSION ID: STS-IAM-88912</span>
              <span>USER: karthik.m@laxvish.app</span>
            </div>

            <div className="space-y-2 pt-2 text-[11px] leading-relaxed">
              <p className="text-emerald-400">
                ➜ [INTAKE] Incident Ticket #INC-4029: P1 Latency Spike assigned to on-call engineer.
              </p>
              <p className="text-white/80">
                ➜ [SECURITY RADAR] Validating PagerDuty active on-call schedule... Confirmed.
              </p>
              <p className="text-cyan-400">
                ➜ [STS ELEVATION] Generating time-bound AWS STS AssumeRole token for CloudWatch-Logs...
              </p>
              <p className="text-emerald-300 font-bold">
                ➜ [ACTIVE] 4-Hour Read-Only Access Granted. Auto-revoke armed for 19:30 IST.
              </p>
            </div>
          </div>

          {/* Right: Auto-Revocation Timer & Security Audit */}
          <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md lg:col-span-4 font-mono">
            <div>
              <span className="text-xs font-semibold uppercase text-white/70">
                TIME-BOUND ACCESS
              </span>
              <div className="mt-3 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-center">
                <span className="text-[10px] text-blue-300 uppercase tracking-wider">AUTO-REVOKE IN</span>
                <p className="text-2xl font-bold text-white tracking-widest mt-1">03:59:42</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-white/60">
                <span>Access Level:</span>
                <span className="font-semibold text-white">Read-Only Logs</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>SIEM Event:</span>
                <span className="font-semibold text-emerald-400">0x9f2a...b441 ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
