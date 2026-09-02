"use client";

import Link from "next/link";
import { FadeIn, FadeInStagger } from "@/components/ui/FadeIn";
import { SystemPanel } from "@/components/ui/SystemPanel";
import { LaxvishConstellationStage } from "@/components/visuals/engine/LaxvishConstellationStage";
import {
  getFlagshipUseCases,
  getOtherUseCases,
} from "@/lib/use-cases";

export function UseCaseGrid() {
  const flagship = getFlagshipUseCases();
  const others = getOtherUseCases();

  return (
    <section
      id="what-we-automate"
      className="relative z-10 border-y border-vaultAmber/15 bg-obsidian"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
        {/* The Grand Creative Narrative */}
        <FadeIn>
          <div className="max-w-3xl space-y-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-vaultAmber">
              The Workforce, Reimagined
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
              Every call. Every document. Every decision. Every workflow.
            </h2>
            <p className="max-w-xl text-base leading-relaxed tracking-wide text-charcoal/70 sm:text-lg">
              Laxvish turns the scattered work across your company into one continuous flow of intelligent action. Work enters. Intelligence moves. Work comes back finished.
            </p>
          </div>
        </FadeIn>

        {/* The Living Constellation Stage (13 Windows into the Same Intelligent Organism) */}
        <FadeIn>
          <div className="mt-16">
            <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-vaultAmber">
                  The Living System
                </p>
                <h3 className="text-xl font-normal tracking-tight text-charcoal sm:text-2xl">
                  Explore 13 windows into the Laxvish intelligence layer
                </h3>
              </div>
              <span className="font-mono text-xs text-charcoal/50">
                Click any capability to shift focus
              </span>
            </div>

            <LaxvishConstellationStage initialSlug="sales-automation" showConstellationNav={true} />
          </div>
        </FadeIn>

        {/* Flagship Cards Overview */}
        <div className="mt-28">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-vaultAmber">
                Flagship Deployments
              </p>
              <h3 className="mt-2 text-2xl font-normal tracking-tight text-charcoal sm:text-3xl">
                Ready to take off your team&rsquo;s plate today.
              </h3>
            </div>
          </FadeIn>

          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2">
            {flagship.map((uc) => (
              <FadeIn key={uc.slug}>
                <Link href={`/solutions/${uc.slug}`} className="block h-full">
                  <SystemPanel className="group flex h-full flex-col rounded-2xl border border-vaultAmber/20 bg-voidSurface p-8 transition-all duration-500 hover:border-vaultAmber/50 hover:bg-mist/30 sm:p-10">
                    <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-vaultAmber">
                      {uc.category}
                    </div>
                    <h4 className="mt-4 text-2xl font-normal tracking-tight text-charcoal group-hover:text-vaultAmber sm:text-3xl transition-colors">
                      {uc.title}
                    </h4>
                    <p className="mt-6 text-base leading-relaxed text-charcoal/70 sm:text-lg">
                      {uc.oneLiner}
                    </p>
                    <span className="mt-auto pt-8 font-mono text-xs font-semibold tracking-widest uppercase text-vaultAmber underline underline-offset-4 decoration-vaultAmber/30 transition-colors duration-300">
                      View full briefing & outcomes →
                    </span>
                  </SystemPanel>
                </Link>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>

        {/* Other use cases as a compact list */}
        {others.length > 0 && (
          <FadeIn>
            <div className="mt-20 border-t border-vaultAmber/15 pt-12">
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                All 13 Capabilities
              </p>
              <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((uc) => (
                  <li key={uc.slug}>
                    <Link
                      href={`/solutions/${uc.slug}`}
                      className="group block py-2 text-base text-charcoal/80 transition-colors hover:text-vaultAmber"
                    >
                      <span className="border-b border-transparent group-hover:border-vaultAmber">
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
              className="inline-flex items-center font-mono text-xs font-semibold uppercase tracking-widest text-vaultAmber underline underline-offset-4 decoration-vaultAmber/30 hover:decoration-vaultAmber"
            >
              See all 13 automations index →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
