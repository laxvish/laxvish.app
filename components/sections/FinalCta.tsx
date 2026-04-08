export function FinalCta() {
  return (
    <section
      id="compliance"
      className="mx-auto w-full max-w-[96rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center sm:p-10">
        <h2 className="text-3xl font-bold text-white [font-family:var(--font-space-grotesk)] sm:text-5xl">
          Deploy Verified AI Operations, Not Agent Sprawl.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-gray-400">
          Move from fragmented pilots to governed execution with DPDP-first
          guardrails and enterprise-grade reliability.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="rounded-full bg-vaultAmber px-7 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Book an Executive Demo
          </button>
          <button
            type="button"
            className="rounded-full border border-neonCyan px-7 py-3 text-sm font-semibold text-neonCyan transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Download Architecture Brief
          </button>
        </div>
      </div>

      <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-gray-500 sm:flex-row">
        <span className="tracking-[0.24em] text-white">LAXVISH</span>
        <span>DPDP-First • Audit-Ready • India-Native</span>
      </footer>
    </section>
  );
}
