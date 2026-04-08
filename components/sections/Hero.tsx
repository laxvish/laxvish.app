import { NeuralCanvas } from "@/components/ui/NeuralCanvas";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <NeuralCanvas />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_32%,rgba(0,240,255,0.24),transparent_50%),radial-gradient(circle_at_72%_66%,rgba(255,184,0,0.16),transparent_44%),linear-gradient(to_bottom,rgba(5,5,5,0.14),rgba(5,5,5,0.50))]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-screen bg-[radial-gradient(circle_at_55%_35%,rgba(0,240,255,0.08),transparent_38%),radial-gradient(circle_at_38%_72%,rgba(255,184,0,0.06),transparent_40%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[96rem] items-center px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8">
        <div className="max-w-3xl space-y-6 text-center sm:space-y-8 lg:text-left">
          <h1
            className="text-[clamp(2.2rem,7vw,5.1rem)] font-bold leading-[1.05] text-white [font-family:var(--font-space-grotesk)]"
            style={{ textShadow: "0 0 14px rgba(0, 240, 255, 0.2)" }}
          >
            The Operating System for Enterprise AI.
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg lg:mx-0">
            Orchestrate, Verify, and Secure your digital workforce under the 2026
            DPDP Act.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
            <button
              type="button"
              className="w-full rounded-full bg-vaultAmber px-6 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto"
            >
              Start Building
            </button>
            <button
              type="button"
              className="w-full rounded-full border border-neonCyan px-6 py-3 text-sm font-semibold text-neonCyan transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto"
            >
              View Architecture
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
