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
      {/* Problem Section */}
      {problemHeadline && (
        <section className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28 relative z-10">
          <FadeIn>
            <div className="max-w-3xl space-y-6 sm:space-y-8">
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.08] tracking-tight text-charcoal">
                {problemHeadline}
              </h2>
              {problemDescription && (
                <p className="max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-charcoal/70">
                  {problemDescription}
                </p>
              )}
              {problemPoints && problemPoints.length > 0 && (
                <ul className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                  {problemPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 sm:gap-4 text-sm sm:text-base leading-relaxed text-charcoal/70"
                    >
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal/40" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </FadeIn>
        </section>
      )}

      {/* Solution Section */}
      {solutionHeadline && (
        <section className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28 relative z-10 border-t border-charcoal/10">
          <FadeIn>
            <div className="max-w-3xl space-y-6 sm:space-y-8">
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.08] tracking-tight text-charcoal">
                {solutionHeadline}
              </h2>
              {solutionDescription && (
                <p className="max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-charcoal/70">
                  {solutionDescription}
                </p>
              )}
            </div>
          </FadeIn>

          {/* Details Grid */}
          <FadeInStagger className="mt-12 sm:mt-16 lg:mt-20 grid gap-6 sm:gap-8 md:grid-cols-3 group/grid">
            {details.map((item) => (
              <FadeIn key={item.title}>
                <SystemPanel
                  as="article"
                  className="group flex h-full flex-col border-t border-charcoal pt-6 sm:pt-8 transition-all duration-300 hover:opacity-100 opacity-90 group-hover/grid:opacity-30 hover:!opacity-100"
                >
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed tracking-wide text-charcoal/70">
                    {item.description}
                  </p>
                </SystemPanel>
              </FadeIn>
            ))}
          </FadeInStagger>
        </section>
      )}

      {/* How It Works */}
      {howItWorks && howItWorks.length > 0 && (
        <section className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28 relative z-10 border-t border-charcoal/10">
          <FadeIn>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.08] tracking-tight text-charcoal">
              How it works.
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3">
            {howItWorks.map((item) => (
              <FadeIn key={item.step}>
                <div className="flex flex-col border-l border-charcoal/20 pl-4 sm:pl-6">
                  <p className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-neonCyan">
                    Step {item.step}
                  </p>
                  <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-normal tracking-tight text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 sm:mt-4 text-sm sm:text-base leading-relaxed tracking-wide text-charcoal/70">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </section>
      )}

      {/* Use Cases */}
      {useCases && useCases.length > 0 && (
        <section className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28 relative z-10 border-t border-charcoal/10">
          <FadeIn>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.08] tracking-tight text-charcoal">
              Built for real scenarios.
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3 group/grid">
            {useCases.map((item) => (
              <FadeIn key={item.scenario}>
                <SystemPanel
                  as="article"
                  className="group flex h-full flex-col border-t border-charcoal pt-6 sm:pt-8 transition-all duration-300 hover:opacity-100 opacity-90 group-hover/grid:opacity-30 hover:!opacity-100"
                >
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-charcoal">
                    {item.scenario}
                  </h3>
                  <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed tracking-wide text-charcoal/70">
                    {item.description}
                  </p>
                </SystemPanel>
              </FadeIn>
            ))}
          </FadeInStagger>
        </section>
      )}

      {/* Differentiation */}
      {differentiationHeadline && differentiationPoints && (
        <section className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28 relative z-10 border-t border-charcoal/10">
          <FadeIn>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.08] tracking-tight text-charcoal">
              {differentiationHeadline}
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3">
            {differentiationPoints.map((item) => (
              <FadeIn key={item.point}>
                <div className="flex flex-col border-l border-charcoal/20 pl-4 sm:pl-6">
                  <h3 className="text-lg sm:text-xl font-normal tracking-tight text-charcoal">
                    {item.point}
                  </h3>
                  <p className="mt-2 sm:mt-4 text-sm sm:text-base leading-relaxed tracking-wide text-charcoal/70">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </section>
      )}

      {/* Outcomes */}
      <FadeIn className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28 relative z-10">
        <div className="border-t border-charcoal/20 pt-10 sm:pt-16">
          <h3 className="text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.08] tracking-tight text-charcoal">
            Expected outcomes
          </h3>
          <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 sm:grid-cols-3">
            {outcomes.map((item) => (
              <div
                key={item.metric}
                className="flex flex-col border-l border-charcoal/20 pl-4 sm:pl-6"
              >
                <p className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-neonCyan">
                  {item.metric}
                </p>
                <p className="mt-2 sm:mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-normal text-charcoal tracking-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* CTA Section */}
      {ctaHeadline && (
        <section className="mx-auto w-full max-w-[90rem] px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28 relative z-10">
          <FadeIn yOffset={30}>
            <SystemPanel className="border border-charcoal bg-vaultAmber p-8 sm:p-14 lg:p-16 text-center">
              <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-charcoal lg:text-5xl">
                {ctaHeadline}
              </h2>
              {ctaDescription && (
                <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-charcoal/70">
                  {ctaDescription}
                </p>
              )}
              <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:gap-5 sm:flex-row">
                <MagneticButton
                  as="a"
                  href={bookDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${BOOK_NOW_BUTTON_CLASS} w-full sm:w-auto text-center justify-center py-3 text-xs sm:text-sm`}
                >
                  <span>Book a Demo</span>
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  href={ctaHref}
                  className={`${SECONDARY_HERO_CTA_CLASS} w-full sm:w-auto text-center justify-center py-3 text-xs sm:text-sm`}
                >
                  Contact Us
                </MagneticButton>
              </div>
            </SystemPanel>
          </FadeIn>
        </section>
      )}

      {/* Internal Links */}
      {internalLinks && internalLinks.length > 0 && (
        <section className="mx-auto w-full max-w-[1440px] px-5 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-28 relative z-10">
          <FadeIn>
            <div className="border-t border-charcoal/10 pt-8 sm:pt-12">
              <p className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-neonCyan mb-4 sm:mb-6">
                Explore more
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {internalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs sm:text-sm font-medium tracking-wide text-charcoal underline underline-offset-4 decoration-charcoal/20 hover:decoration-charcoal transition-colors duration-200"
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
        <section className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28 relative z-10">
          <div className="mt-8 sm:mt-12">
            <MagneticButton
              as="a"
              href={ctaHref}
              className={`${SECONDARY_HERO_CTA_CLASS} w-full sm:w-auto text-center justify-center py-3 text-xs sm:text-sm`}
            >
              Continue Implementation
            </MagneticButton>
          </div>
        </section>
      )}
    </>
  );
}
