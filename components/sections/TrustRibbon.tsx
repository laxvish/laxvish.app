const trustItems = [
  "DPDP Act 2026 Compliant",
  "Bhashini Native Integration",
  "RBI Audit Ready",
];

export function TrustRibbon() {
  return (
    <section className="border-y border-white/5 bg-black/20">
      <div className="mx-auto flex w-full max-w-[96rem] flex-col items-center justify-center divide-y divide-gray-800 px-4 py-4 text-xs text-gray-400 sm:flex-row sm:divide-x sm:divide-y-0 sm:px-6 sm:py-5 sm:text-sm lg:px-8">
        {trustItems.map((item) => (
          <span key={item} className="px-4 py-2 text-center sm:px-8">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
