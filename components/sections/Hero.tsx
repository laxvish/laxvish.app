import { NeuralCanvas } from "@/components/ui/NeuralCanvas";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-charcoal/20">
      <div className="absolute inset-0 opacity-82">
        <NeuralCanvas />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_18%,rgba(242,242,242,0.24),transparent_46%),radial-gradient(circle_at_76%_24%,rgba(182,176,159,0.18),transparent_42%),linear-gradient(to_bottom,rgba(0,0,0,0.40),rgba(0,0,0,0.94))]" />
      <div className="relative z-10 mx-auto flex min-h-[78svh] w-full max-w-[90rem] items-center px-4 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-vaultAmber uppercase">
            Laxvish
          </p>
          <h1
            className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.04] text-neonCyan [font-family:var(--font-space-grotesk)]"
          >
            Enterprise AI operations,
            <br />
            made clear and controllable.
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-charcoal/90 sm:text-base">
            Laxvish helps teams deploy AI workers with orchestration, verification,
            and policy confidence from day one.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              className="w-full rounded-full bg-vaultAmber px-6 py-3 text-sm font-semibold text-black transition-colors duration-200 hover:bg-[#c4beaf] sm:w-auto"
            >
              Request Pilot
            </button>
            <button
              type="button"
              className="w-full rounded-full border border-charcoal/40 px-6 py-3 text-sm font-semibold text-neonCyan transition-colors duration-200 hover:border-charcoal/75 sm:w-auto"
            >
              View System Brief
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
