"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeIn, FadeInStagger } from "@/components/ui/FadeIn";
import { SystemPanel } from "@/components/ui/SystemPanel";
import { AgentTaskSimulator } from "@/components/visuals/simulations/AgentTaskSimulator";
import {
  getFlagshipUseCases,
  getOtherUseCases,
} from "@/lib/use-cases";

export function UseCaseGrid() {
  const flagship = getFlagshipUseCases();
  const others = getOtherUseCases();
  const [selectedSlug, setSelectedSlug] = useState(flagship[0]?.slug ?? "sales-automation");

  return (
    <section
      id="what-we-automate"
      className="relative z-10 border-y border-charcoal/10 bg-obsidian"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
        <FadeIn>
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neonCyan">
              What we automate
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
              Pick the work you want to take off your team&rsquo;s plate.
            </h2>
            <p className="max-w-xl text-base leading-relaxed tracking-wide text-charcoal/70 sm:text-lg">
              We have AI workers ready for the most common work in your
              business. Each one is trained, tested, and ready to deploy in
              weeks — not months.
            </p>
          </div>
        </FadeIn>

        {/* Flagship cards */}
        <FadeInStagger className="mt-20 grid gap-8 md:grid-cols-2">
          {flagship.map((uc) => (
            <FadeIn key={uc.slug}>
              <Link href={`/solutions/${uc.slug}`} className="block h-full">
                <SystemPanel className="group flex h-full flex-col border border-charcoal/15 bg-white p-8 transition-colors hover:border-neonCyan sm:p-10">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neonCyan">
                    {uc.category}
                  </div>
                  <h3 className="mt-4 text-2xl font-normal tracking-tight text-charcoal group-hover:text-neonCyan sm:text-3xl">
                    {uc.title}
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-charcoal/70 sm:text-lg">
                    {uc.oneLiner}
                  </p>
                  <span className="mt-auto pt-8 text-sm font-medium tracking-wide text-charcoal underline underline-offset-4 decoration-charcoal/20 group-hover:decoration-neonCyan transition-colors duration-300">
                    See full details & live demo →
                  </span>
                </SystemPanel>
              </Link>
            </FadeIn>
          ))}
        </FadeInStagger>

        {/* Interactive Live Agent Preview Workbench */}
        <FadeIn>
          <div className="mt-24 rounded-3xl border border-charcoal/10 bg-vaultAmber/20 p-6 sm:p-10">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neonCyan">
                  Interactive Simulation
                </p>
                <h3 className="mt-2 text-2xl font-normal tracking-tight text-charcoal sm:text-3xl">
                  Watch an AI worker in action right now
                </h3>
              </div>

              {/* Tab Selector */}
              <div className="flex flex-wrap gap-2">
                {flagship.map((uc) => {
                  const isSelected = uc.slug === selectedSlug;
                  return (
                    <button
                      key={uc.slug}
                      type="button"
                      onClick={() => setSelectedSlug(uc.slug)}
                      className={`rounded-full px-4 py-2 font-mono text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-charcoal text-obsidian shadow-md"
                          : "border border-charcoal/15 bg-white text-charcoal/70 hover:border-charcoal hover:text-charcoal"
                      }`}
                    >
                      {uc.title.replace("AI ", "")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Terminal Simulator */}
            <AgentTaskSimulator key={selectedSlug} slug={selectedSlug} />
          </div>
        </FadeIn>

        {/* Other use cases as a compact list */}
        {others.length > 0 && (
          <FadeIn>
            <div className="mt-20 border-t border-charcoal/10 pt-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                More ways we help
              </p>
              <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((uc) => (
                  <li key={uc.slug}>
                    <Link
                      href={`/solutions/${uc.slug}`}
                      className="group block py-2 text-base text-charcoal/80 transition-colors hover:text-neonCyan"
                    >
                      <span className="border-b border-transparent group-hover:border-neonCyan">
                        {uc.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        )}

        {/* See all CTA */}
        <FadeIn>
          <div className="mt-12">
            <Link
              href="/solutions"
              className="inline-flex items-center text-sm font-medium tracking-wide text-charcoal underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal"
            >
              See all 13 automations and what they do →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
