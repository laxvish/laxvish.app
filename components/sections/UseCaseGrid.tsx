"use client";

// ============================================================================
// EDITORIAL USE CASE LEDGER
// World: working engineering docket — categorised by year, no card surfaces.
// No rounded cards, no identical tiles, no shadow-lg.
// Navigation is by deep-link inline paragraphs with mono category tags.
// ============================================================================

import Link from "next/link";
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
      className="relative z-10 border-y border-rule-hair"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
        {/* Section manifesto */}
        <header className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
              The Workforce — Categorical Index
            </p>
            <h2 className="mt-6 font-serif text-[clamp(2.5rem,5.5vw,4.25rem)] font-normal leading-[1.04] tracking-tight text-deepink">
              Every call. Every document. Every decision.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
            <p className="max-w-md text-base leading-relaxed text-deepink/75 sm:text-lg">
              What follows is the working catalog of functions the Laxvish
              Thread takes on inside a real Indian enterprise. It is the same
              set of thirteen regardless of which one your business needs first
              — they are coordinated, not compartmentalised.
            </p>
          </div>
        </header>

        {/* Constellation — already delivered, kept as the protagonist reference */}
        <div className="mt-16 border-t border-rule-hair pt-12">
          <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
                Navigation Index
              </p>
              <h3 className="mt-2 font-serif text-2xl font-normal leading-tight tracking-tight text-deepink sm:text-3xl">
                Thirteen windows into the same organism.
              </h3>
            </div>
            <span className="font-mono text-[11px] tracking-[0.18em] text-deepink/55 uppercase">
              Tap any cluster to focus
            </span>
          </div>

          <LaxvishConstellationStage initialSlug="sales-automation" showConstellationNav={true} />
        </div>

        {/* Flagship dockets as editorial entries, NOT cards */}
        <div className="mt-24 border-t border-rule-hair pt-12">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
            Flagship engagements
          </p>
          <h3 className="mt-4 font-serif text-3xl font-normal leading-[1.06] tracking-tight text-deepink sm:text-4xl">
            Capabilities actively deployed with Indian enterprises today.
          </h3>

          <ol className="mt-12 divide-y divide-rule-hair">
            {flagship.map((uc, i) => (
              <li key={uc.slug} className="grid grid-cols-[auto_1fr_auto] gap-x-8 py-10">
                {/* Roman ordinal index */}
                <span className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Body — category tag, title, oneLiner, NOT a card */}
                <div className="space-y-3">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-deepink/55 uppercase">
                    {uc.category}
                  </span>
                  <h4 className="font-serif text-3xl font-normal leading-tight tracking-tight text-deepink sm:text-4xl">
                    {uc.title}
                  </h4>
                  <p className="max-w-2xl text-base leading-relaxed text-deepink/75 sm:text-lg">
                    {uc.oneLiner}
                  </p>
                </div>

                {/* Deep-link action */}
                <Link
                  href={`/solutions/${uc.slug}`}
                  className="hidden shrink-0 self-end border-b border-mark pb-1 font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase transition-colors hover:border-deepink hover:text-deepink md:inline-block"
                >
                  Read full briefing <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* Other use cases as a numbered typographic legend */}
        {others.length > 0 && (
          <div className="mt-20 border-t border-rule-hair pt-12">
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
              Supporting Functions
            </p>
            <h3 className="mt-4 font-serif text-2xl font-normal leading-[1.06] tracking-tight text-deepink sm:text-3xl">
              The remaining capabilities of the catalog.
            </h3>
            <ol className="mt-10 grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((uc, i) => (
                <li key={uc.slug} className="flex items-baseline gap-3 py-1.5">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-deepink/45 uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/solutions/${uc.slug}`}
                    className="text-base text-deepink/80 transition-colors hover:text-mark"
                  >
                    {uc.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* See all */}
        <div className="mt-16 border-t border-rule-hair pt-8">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 border-b border-mark pb-1 font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase transition-colors hover:border-deepink hover:text-deepink"
          >
            <span>See all 13 automations index</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
