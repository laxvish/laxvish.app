"use client";

import Link from "next/link";
import { SystemPanel } from "@/components/ui/SystemPanel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FadeIn, FadeInStagger } from "@/components/ui/FadeIn";
import type {
  DetailItem,
  OutcomeItem,
  StepItem,
  UseCaseItem,
  DiffItem,
  InternalLink,
} from "@/lib/site-pages";
import {
  BOOK_NOW_BUTTON_CLASS,
  SECONDARY_HERO_CTA_CLASS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

interface PageBlocksProps {
  details: DetailItem[];
  outcomes: OutcomeItem[];
  ctaHref?: string;
  problemHeadline?: string;
  problemDescription?: string;
  problemPoints?: string[];
  solutionHeadline?: string;
  solutionDescription?: string;
  howItWorks?: StepItem[];
  useCases?: UseCaseItem[];
  differentiationHeadline?: string;
  differentiationPoints?: DiffItem[];
  ctaHeadline?: string;
  ctaDescription?: string;
  internalLinks?: InternalLink[];
}

/**
 * The series. Every chapter (route) plays on the same machine, but each
 * instrument uses a different layout family — never three identical columns:
 * - Problem:  ruled ledger rows (numbered, hairline dividers)
 * - Details:  asymmetric editorial split with rule-draw hover
 * - How it works:  running-rule timeline with Cormorant numerals
 * - Use cases:  full-width ledger rows with index numerals
 * - Differentiation:  asymmetric 5/7 split with pull-line
 * - Outcomes:  datum strip (big serif figures on a baseline rule)
 * - CTA:  asymmetric close, ONE primary contact action, text link to explore
 * See docs/DIRECTORS_TREATMENT.md §2 (C1).
 */
export function PageBlocks({
  details,
  outcomes,
  ctaHref = "/contact",
  problemHeadline,
  problemDescription,
  problemPoints,
  solutionHeadline,
  solutionDescription,
  howItWorks,
  useCases,
  differentiationHeadline,
  differentiationPoints,
  ctaHeadline,
  ctaDescription,
  internalLinks,
}: PageBlocksProps) {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <>
      {/* Problem Section — editorial manifesto + ruled ledger, no dot bullets */}
      {problemHeadline && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
          <FadeIn>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
                  {problemHeadline}
                </h2>
              </div>
              <div className="lg:col-span-7">
                {problemDescription && (
                  <p className="max-w-xl text-base leading-relaxed tracking-wide text-deepink/70 sm:text-lg">
                    {problemDescription}
                  </p>
                )}
                {problemPoints && problemPoints.length > 0 && (
                  <ol className="mt-10">
                    {problemPoints.map((point, i) => (
                      <li
                        key={point}
                        className="grid grid-cols-[3rem_1fr] gap-x-6 border-t border-rule-hair py-5"
                      >
                        <span className="font-mono text-xs tracking-[0.14em] text-mark/80">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="max-w-xl text-base leading-relaxed text-deepink/70">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* Details — asymmetric editorial split; hover draws a rule, not a dim */}
      {solutionHeadline && (
        <section className="relative z-10 border-t border-rule-hair bg-parchment/60">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
            <FadeIn>
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
                    {solutionHeadline}
                  </h2>
                  {solutionDescription && (
                    <p className="mt-6 max-w-md text-base leading-relaxed tracking-wide text-deepink/70 sm:text-lg">
                      {solutionDescription}
                    </p>
                  )}
                </div>

                <div className="lg:col-span-8">
                  <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                    {details.map((item, i) => (
                      <SystemPanel
                        key={item.title}
                        as="article"
                        className="group border-t border-rule-hair pt-6"
                      >
                        <p className="font-mono text-[11px] tracking-[0.14em] text-mark/70 uppercase">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-3 text-2xl font-normal tracking-tight text-deepink">
                          {item.title}
                        </h3>
                        <p className="mt-4 text-base leading-relaxed text-deepink/70">
                          {item.description}
                        </p>
                        <span
                          aria-hidden="true"
                          className="mt-5 block h-px w-10 bg-mark/40 transition-all duration-500 group-hover:w-full group-hover:bg-mark"
                        />
                      </SystemPanel>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* How It Works — running-rule timeline, Cormorant numerals, no "Step" eyebrows */}
      {howItWorks && howItWorks.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
          <FadeIn>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
              How it works.
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-14">
            {howItWorks.map((item, i) => (
              <div
                key={item.step}
                className="grid grid-cols-[5rem_1fr] gap-x-8 border-t border-rule-hair py-8 sm:grid-cols-[8rem_1fr] lg:grid-cols-[10rem_minmax(0,42rem)_1fr] lg:gap-x-12"
              >
                <span className="font-serif text-4xl leading-none text-mark/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="space-y-3">
                  <h3 className="text-2xl font-normal leading-tight tracking-tight text-deepink">
                    {item.title}
                  </h3>
                  <p className="max-w-xl text-base leading-relaxed text-deepink/70">
                    {item.description}
                  </p>
                </div>
                <span className="hidden self-start pt-2 font-mono text-[11px] tracking-[0.14em] text-deepink/40 uppercase lg:block">
                  {item.step}
                </span>
              </div>
            ))}
          </FadeInStagger>
        </section>
      )}

      {/* Use Cases — full-width ledger rows with index numerals */}
      {useCases && useCases.length > 0 && (
        <section className="relative z-10 border-t border-rule-hair bg-parchment/60">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
            <FadeIn>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
                Built for real scenarios.
              </h2>
            </FadeIn>
            <FadeInStagger className="mt-14 border-t border-rule-hair">
              {useCases.map((item, i) => (
                <div
                  key={item.scenario}
                  className="group grid gap-x-10 gap-y-2 border-b border-rule-hair py-7 sm:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_minmax(0,24rem)_1fr] lg:items-baseline lg:gap-x-14"
                >
                  <span className="font-serif text-3xl leading-none text-mark/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-normal tracking-tight text-deepink">
                    {item.scenario}
                  </h3>
                  <p className="max-w-xl text-base leading-relaxed text-deepink/70 transition-colors duration-300 group-hover:text-deepink/85">
                    {item.description}
                  </p>
                </div>
              ))}
            </FadeInStagger>
          </div>
        </section>
      )}

      {/* Differentiation — asymmetric 5/7 split with pull-line */}
      {differentiationHeadline && differentiationPoints && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
          <FadeIn>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
                  {differentiationHeadline}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-10">
                  {differentiationPoints.map((item, i) => (
                    <div
                      key={item.point}
                      className="grid gap-4 border-l border-rule-hair pl-6 sm:grid-cols-[7rem_1fr] sm:gap-x-8"
                    >
                      <span className="font-mono text-xs tracking-[0.14em] text-mark/70 uppercase">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl font-normal tracking-tight text-deepink">
                          {item.point}
                        </h3>
                        <p className="mt-3 max-w-xl text-base leading-relaxed text-deepink/70">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* Outcomes — datum strip with baseline rule, not three equal boxes */}
      <FadeIn className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
        <div className="border-t border-rule-hair pt-14">
          <h3 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
            Expected outcomes
          </h3>
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((item) => (
              <div key={item.metric} className="border-t border-rule-hair pt-5">
                <p className="font-sans text-2xl font-normal tracking-tight text-deepink sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-deepink/50 uppercase">
                  {item.metric}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* CTA — asymmetric editorial close, ONE primary action, explore as text link */}
      {ctaHeadline && (
        <section className="relative z-10 border-t border-rule-hair bg-parchment/60">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
            <FadeIn yOffset={16}>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                  <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-normal leading-[1.04] tracking-tight text-deepink">
                    {ctaHeadline}
                  </h2>
                  {ctaDescription && (
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-deepink/70 sm:text-lg">
                      {ctaDescription}
                    </p>
                  )}
                  <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                    <MagneticButton
                      as="a"
                      href={bookDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={BOOK_NOW_BUTTON_CLASS}
                    >
                      <span>Book a working session</span>
                    </MagneticButton>
                    <Link
                      href={ctaHref}
                      className="group inline-flex items-center gap-2 border-b border-mark pb-1 font-mono text-xs font-medium tracking-[0.16em] text-mark uppercase transition-colors duration-200 hover:text-deepink hover:border-deepink"
                    >
                      <span>Explore the capabilities</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:col-span-5 lg:block">
                  <div className="border border-rule-hair bg-cream p-6">
                    <p className="font-mono text-[11px] tracking-[0.14em] text-deepink/50 uppercase">
                      On the first call
                    </p>
                    <ul className="mt-6 space-y-4">
                      <li className="flex gap-3 font-mono text-xs text-deepink/70">
                        <span className="text-mark">—</span> 15 minutes, no pitch deck
                      </li>
                      <li className="flex gap-3 font-mono text-xs text-deepink/70">
                        <span className="text-mark">—</span> A walk-through on your
                        kind of work
                      </li>
                      <li className="flex gap-3 font-mono text-xs text-deepink/70">
                        <span className="text-mark">—</span> Honest scope, cost, and
                        what we cannot do
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Internal Links */}
      {internalLinks && internalLinks.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-12 lg:px-16 lg:pb-28">
          <FadeIn>
            <div className="border-t border-rule-hair pt-10">
              <p className="mb-6 font-mono text-[11px] font-medium tracking-[0.14em] text-deepink/50 uppercase">
                Explore more
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {internalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-mono text-xs font-medium tracking-wide text-deepink underline underline-offset-4 decoration-mark/40 transition-colors duration-300 hover:text-mark"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* Fallback CTA for pages without extended content */}
      {!ctaHeadline && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
          <div className="mt-16">
            <MagneticButton
              as="a"
              href={ctaHref}
              className={SECONDARY_HERO_CTA_CLASS}
            >
              Continue Implementation
            </MagneticButton>
          </div>
        </section>
      )}
    </>
  );
}