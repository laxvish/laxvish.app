const trustItems = [
  "DPDP Act 2026 Compliant",
  "Bhashini Native Telephony Integration",
  "RBI Audit-Ready Cryptographic Logs",
];

export function TrustRibbon() {
  return (
    <section className="border-y border-vaultAmber/15 bg-voidSurface/40">
      <div className="mx-auto flex w-full max-w-[96rem] flex-col items-center justify-center divide-y divide-vaultAmber/15 px-4 py-4 font-mono text-xs text-vaultAmber/90 sm:flex-row sm:divide-x sm:divide-y-0 sm:px-6 sm:py-4 lg:px-8">
        {trustItems.map((item) => (
          <span key={item} className="px-6 py-2 text-center sm:px-10 font-semibold tracking-wide">
            ✦ {item}
          </span>
        ))}
      </div>
    </section>
  );
}
