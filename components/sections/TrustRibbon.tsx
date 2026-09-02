"use client";

// ============================================================================
// EDITORIAL TRUST RIBBON
// World: a print colophon, not a SaaS badge.
// One line of typography. No pill badges. No rounded surfaces.
// ============================================================================

const trustItems: string[] = [
  "DPDP Act 2026 Compliant",
  "Bhashini Native Telephony Integration",
  "RBI Audit-Ready Cryptographic Logs",
];

export function TrustRibbon() {
  return (
    <section className="border-y border-deepink/15">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-6 py-5 font-mono text-[11px] uppercase tracking-[0.18em] text-deepink/75 sm:flex-row sm:px-12 lg:px-16">
        <span className="font-medium text-mark mr-0 sm:mr-6">Compliance</span>
        <div className="flex flex-col items-center divide-y divide-rule-hair sm:flex-row sm:divide-x sm:divide-y-0">
          {trustItems.map((item) => (
            <span key={item} className="px-6 py-2 sm:px-8">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
