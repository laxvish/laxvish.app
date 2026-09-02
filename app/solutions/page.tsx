import type { Metadata } from "next";
import Link from "next/link";
import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";
import { getUseCasesByCategory } from "@/lib/use-cases";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Automations for Every Part of Your Business",
  description:
    "Laxvish builds AI workers that take over the repetitive work in your business — sales, support, operations, finance, IT, and more. Built for Indian enterprises. DPDP-ready.",
  path: "/solutions",
  keywords: [
    "ai automation for business",
    "ai workflow automation",
    "ai solutions india",
  ],
});

export default function SolutionsPage() {
  const content = PAGE_CONTENT.solutions;
  const grouped = getUseCasesByCategory();

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        summary={content.summary}
      />
      <PageBlocks
        details={content.details}
        outcomes={content.outcomes}
        problemHeadline={content.problemHeadline}
        problemDescription={content.problemDescription}
        problemPoints={content.problemPoints}
        solutionHeadline={content.solutionHeadline}
        solutionDescription={content.solutionDescription}
        howItWorks={content.howItWorks}
        useCases={content.useCases}
        differentiationHeadline={content.differentiationHeadline}
        differentiationPoints={content.differentiationPoints}
        ctaHeadline={content.ctaHeadline}
        ctaDescription={content.ctaDescription}
        internalLinks={content.internalLinks}
      />

      {/* All capabilities — grouped by category */}
      <section className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-charcoal/10 px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
        <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
          All of what we automate
        </h2>
        <div className="mt-16 space-y-20">
          {Object.entries(grouped).map(([category, useCases]) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neonCyan">
                {category}
              </p>
              <ul className="mt-8 border-t border-charcoal/20">
                {useCases.map((uc) => (
                  <li
                    key={uc.slug}
                    className="border-b border-charcoal/20 py-6 transition-colors hover:bg-vaultAmber/50"
                  >
                    <Link
                      href={`/solutions/${uc.slug}`}
                      className="group flex items-baseline justify-between gap-6"
                    >
                      <span className="text-2xl font-normal tracking-tight text-charcoal transition-colors duration-300 group-hover:text-neonCyan">
                        {uc.title}
                      </span>
                      <span className="max-w-md text-right text-sm leading-relaxed text-charcoal/70">
                        {uc.oneLiner}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}