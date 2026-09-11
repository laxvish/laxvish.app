"use client";

import { FadeIn, FadeInStagger } from "@/components/ui/FadeIn";

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Choose",
    description:
      "Start with an AI agent built for a specific business workflow.",
  },
  {
    number: "02",
    title: "Configure",
    description:
      "Customize its behavior, instructions, knowledge, and how it should handle different situations.",
  },
  {
    number: "03",
    title: "Connect",
    description:
      "Give the agent access to the tools, data, and systems required for its work.",
  },
  {
    number: "04",
    title: "Deploy",
    description:
      "Put the agent into the workflow where your team needs it.",
  },
  {
    number: "05",
    title: "Monitor",
    description:
      "Review activity, outcomes, exceptions, and improve how the agent operates over time.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-label="How it works"
      className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28 border-b border-charcoal/10 bg-obsidian"
    >
      <div className="max-w-3xl space-y-3 sm:space-y-4">
        <FadeIn>
          <p className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
            How it works
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-space-grotesk text-[clamp(1.75rem,4vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
            From AI agent to working system
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-sm sm:text-base lg:text-lg text-charcoal/70 leading-relaxed max-w-2xl">
            Start with an agent built for a specific business task. Configure how it works, connect the systems it needs, and put it into your workflow.
          </p>
        </FadeIn>
      </div>

      <FadeInStagger className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4 xl:gap-5">
        {STEPS.map((step, index) => (
          <FadeIn
            key={step.number}
            className={`h-full ${
              index === STEPS.length - 1 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div className="border border-charcoal/20 bg-vaultAmber/20 p-5 sm:p-6 lg:p-6 transition-colors duration-200 hover:border-charcoal/40 hover:bg-vaultAmber/30 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-charcoal/15 pb-3">
                  <span className="text-neonCyan font-mono text-xs sm:text-sm font-semibold tracking-[0.2em]">
                    {step.number}
                  </span>
                  {index < STEPS.length - 1 ? (
                    <span
                      className="hidden lg:inline-block font-mono text-xs text-neonCyan/50"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  ) : (
                    <span
                      className="hidden lg:inline-block font-mono text-[10px] tracking-widest text-neonCyan/70 uppercase"
                      aria-hidden="true"
                    >
                      Live
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-xl sm:text-2xl font-medium tracking-tight font-space-grotesk text-charcoal">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-charcoal/70">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-charcoal/10 flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-neonCyan/80 uppercase">
                  Step {step.number}
                </span>
                {index < STEPS.length - 1 ? (
                  <span
                    className="lg:hidden text-xs font-mono text-neonCyan/60"
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                ) : (
                  <span
                    className="lg:hidden text-[10px] font-mono tracking-wider text-neonCyan/80 uppercase"
                    aria-hidden="true"
                  >
                    Live
                  </span>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </section>
  );
}
