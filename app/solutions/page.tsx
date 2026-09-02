import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/depth/PageHero";
import { EditorialReveal } from "@/components/ui/FadeIn";
import { buildPageMetadata } from "@/lib/seo";
import {
  getUseCasesByCategory,
  type UseCaseCategory,
} from "@/lib/use-cases";

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

const CATEGORY_INTRO: Record<UseCaseCategory, string> = {
  "Sales & Growth":
    "Automate the work that fills your pipeline and grows your revenue.",
  "Customer Operations":
    "Be there for every customer, on every channel, without scaling headcount.",
  "Internal Operations":
    "Free your team from repetitive internal work so they can focus on real projects.",
  "Finance & Compliance":
    "Move faster on the work your finance and compliance teams do every day — with full audit trails.",
};

/**
 * The catalog. Thirteen capabilities as a numbered ledger — mono index,
 * serif title, one honest line, and the worker file link. No card wall,
 * no rounded-2xl, no "Learn more" echo. See docs/DIRECTORS_TREATMENT.md C3.
 */
export default function SolutionsPage() {
  const grouped = getUseCasesByCategory();
  const categories = Object.keys(grouped) as UseCaseCategory[];
  let index = 0;

  return (
    <>
      <PageHero
        eyebrow="What we automate"
        title="AI workers for every part of your business."
        summary="Pick the work you want to take off your team's plate. We'll show you what the AI worker does, how it's controlled, and what it costs."
        stamp="CATALOG // 13 CAPABILITIES"
      />

      <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-24 sm:px-12 lg:px-16 lg:pb-32">
        {categories.map((category) => (
          <div key={category} className="border-t border-rule-hair">
            {/* Category band — editorial divider, not a card */}
            <div className="grid gap-4 py-10 sm:grid-cols-[16rem_1fr] sm:items-baseline sm:gap-10">
              <h2 className="font-serif text-2xl font-normal leading-tight tracking-tight text-deepink sm:text-3xl">
                {category}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-deepink/65">
                {CATEGORY_INTRO[category]}
              </p>
            </div>

            {/* Ledger rows */}
            <div className="border-t border-rule-hair">
              {grouped[category].map((uc) => {
                index += 1;
                const n = String(index).padStart(2, "0");
                return (
                  <Link
                    key={uc.slug}
                    href={`/solutions/${uc.slug}`}
                    className="group grid items-baseline gap-x-6 gap-y-2 border-b border-rule-hair py-6 sm:grid-cols-[4rem_18rem_1fr] sm:gap-x-10"
                  >
                    <span className="font-mono text-xs tracking-[0.14em] text-mark/70">
                      {n}
                    </span>
                    <span className="text-xl font-normal tracking-tight text-deepink transition-colors duration-300 group-hover:text-mark sm:text-2xl">
                      {uc.title}
                    </span>
                    <span className="flex items-baseline justify-between gap-6 text-base text-deepink/65">
                      <span>{uc.oneLiner}</span>
                      <span
                        aria-hidden="true"
                        className="hidden h-px w-10 shrink-0 self-center bg-mark/40 transition-all duration-500 group-hover:w-20 group-hover:bg-mark sm:block"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Catalog sign-off */}
        <EditorialReveal>
          <p className="mt-14 max-w-2xl border-l border-mark/50 pl-6 font-mono text-[11px] leading-relaxed tracking-wide text-deepink/55 uppercase">
            Thirteen workers and counting. If your work is not on this list,
            name it on the first call. We build the ones that matter.
          </p>
        </EditorialReveal>
      </section>
    </>
  );
}