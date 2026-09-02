"use client";

import { FadeIn, FadeInStagger } from "@/components/ui/FadeIn";

const steps = [
  {
    step: "01",
    title: "Tell us about the work",
    description:
      "A 15-minute call to understand what you want to automate. No pitch deck — just questions and honest answers.",
  },
  {
    step: "02",
    title: "We build your AI worker",
    description:
      "The AI is trained on your business, your tone, and your rules. You see it working before it goes live.",
  },
  {
    step: "03",
    title: "You watch it work",
    description:
      "The AI worker takes over the work. You see every action, approve what matters, and scale what works.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32"
    >
      <FadeIn>
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vaultAmber">
            How it works
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
            From first call to AI in production in weeks.
          </h2>
        </div>
      </FadeIn>

      <FadeInStagger className="mt-20 grid gap-12 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.step} className="space-y-4 border-t border-vaultAmber/20 pt-6">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-vaultAmber">
              {s.step}
            </div>
            <h3 className="text-2xl font-normal tracking-tight text-charcoal">
              {s.title}
            </h3>
            <p className="text-base leading-relaxed text-charcoal/70">
              {s.description}
            </p>
          </div>
        ))}
      </FadeInStagger>
    </section>
  );
}
