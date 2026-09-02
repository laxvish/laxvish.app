import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/depth/PageHero";
import { FadeIn, FadeInStagger } from "@/components/ui/FadeIn";
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

export default function SolutionsPage() {
  const grouped = getUseCasesByCategory();
  const categories = Object.keys(grouped) as UseCaseCategory[];

  return (
    <>
      <PageHero
        eyebrow="What we automate"
        title="AI workers for every part of your business."
        summary="Pick the work you want to take off your team's plate. We'll show you what the AI worker does, how it's controlled, and what it costs."
        shape="sphere"
      />

      <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
        <FadeInStagger className="space-y-24">
          {categories.map((category) => (
            <div key={category} className="space-y-8">
              <FadeIn>
                <div className="max-w-3xl space-y-3 border-b border-vaultAmber/20 pb-6">
                  <div className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-vaultAmber">
                    {category}
                  </div>
                  <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-[1.1] tracking-tight text-charcoal">
                    {category}
                  </h2>
                  <p className="text-base leading-relaxed text-charcoal/70 sm:text-lg">
                    {CATEGORY_INTRO[category]}
                  </p>
                </div>
              </FadeIn>

              <FadeInStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {grouped[category].map((uc) => (
                  <Link
                    key={uc.slug}
                    href={`/solutions/${uc.slug}`}
                    className="group block rounded-2xl border border-vaultAmber/20 bg-voidSurface p-6 transition-all duration-500 hover:border-vaultAmber/60 hover:bg-mist/30"
                  >
                    <h3 className="text-lg font-medium text-charcoal group-hover:text-vaultAmber transition-colors">
                      {uc.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                      {uc.oneLiner}
                    </p>
                    <div className="mt-6 font-mono text-xs font-semibold uppercase tracking-widest text-vaultAmber">
                      Learn more →
                    </div>
                  </Link>
                ))}
              </FadeInStagger>
            </div>
          ))}
        </FadeInStagger>
      </section>
    </>
  );
}
