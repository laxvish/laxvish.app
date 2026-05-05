import type { Metadata } from "next";
import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Workflow Automation — Enterprise Solutions That Execute",
  description:
    "Deploy AI workflow automation with measurable business impact. Laxvish aligns enterprise automation AI with real process outcomes across revenue, operations, and compliance.",
  path: "/solutions",
  keywords: [
    "ai workflow automation",
    "enterprise automation ai",
    "ai workflow system",
  ],
});

export default function SolutionsPage() {
  const content = PAGE_CONTENT.solutions;

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        summary={content.summary}
        shape="sphere"
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
