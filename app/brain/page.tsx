import type { Metadata } from "next";
import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Orchestration Platform — Coordinate Workers with Intelligence",
  description:
    "The Laxvish AI orchestration platform routes decisions, sequences tasks, and governs workflow execution between AI agents and human teams from one unified control layer.",
  path: "/brain",
  keywords: [
    "ai orchestration platform",
    "workflow orchestration ai",
    "ai coordination system",
  ],
});

export default function BrainPage() {
  const content = PAGE_CONTENT.brain;

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        summary={content.summary}
        shape="icosahedron"
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
