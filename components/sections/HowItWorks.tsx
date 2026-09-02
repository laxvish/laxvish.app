"use client";

import { EditorialReveal } from "@/components/ui/FadeIn";

const steps = [
  {
    step: "01",
    title: "Tell us about the work",
    description:
      "A 15-minute call. You describe the work — the inputs, the rules, the exceptions. We listen. No pitch deck.",
  },
  {
    step: "02",
    title: "We build your AI worker",
    description:
      "The AI is trained on your business, your tone, your policy. You watch it work on real examples before it touches production.",
  },
  {
    step: "03",
    title: "You watch it run",
    description:
      "It takes over the work. You see every action, approve what matters, and scale what works. The Thread keeps it honest.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32"
    >
      <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
        <EditorialReveal>
          <div className="space-y-6 md:sticky md:top-32">
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-mark uppercase">
              How it works
            </p>
            <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight text-deepink">
              From first call to AI in production in weeks.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-deepink/70">
              No six-month transformation. We move from a conversation to a
              working AI on your real work in 2–4 weeks.
            </p>
          </div>
        </EditorialReveal>

        <ol className="space-y-16">
          {steps.map((s, i) => (
            <EditorialReveal key={s.step} delay={0.05 * i}>
              <li className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 border-t border-rule-hair pt-8">
                <span
                  aria-hidden="true"
                  className="font-mono text-sm font-medium tracking-[0.18em] text-mark pt-1"
                >
                  {s.step}
                </span>
                <div className="space-y-3 max-w-xl">
                  <h3 className="text-2xl font-normal leading-tight tracking-tight text-deepink sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="text-base leading-relaxed text-deepink/75">
                    {s.description}
                  </p>
                </div>
              </li>
            </EditorialReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
