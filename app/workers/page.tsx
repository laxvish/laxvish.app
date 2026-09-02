import type { Metadata } from "next";
import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Enterprise AI Agents — Domain Workers for Real Operations",
  description:
    "Deploy enterprise AI agents scoped to specific business functions. Laxvish Workers handle repeatable, production-grade tasks with predictable behavior, measurable output, and verification controls.",
  path: "/workers",
  keywords: [
    "enterprise ai agents",
    "domain ai agents",
    "ai agents for operations",
  ],
});

export default function WorkersPage() {
  const content = PAGE_CONTENT.workers;

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        summary={content.summary}
        shape="torus"
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
    </>
  );
}
