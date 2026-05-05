import type { Metadata } from "next";
import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Enterprise AI Voice Agent — Conversational AI for Business Calls",
  description:
    "Deploy an enterprise AI voice agent that handles calls with natural conversation, compliance-grade controls, and seamless workflow integration. AI voice automation built for production.",
  path: "/callme",
  keywords: [
    "enterprise ai voice agent",
    "ai voice automation",
    "conversational ai system",
  ],
});

export default function CallmePage() {
  const content = PAGE_CONTENT.callme;

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
