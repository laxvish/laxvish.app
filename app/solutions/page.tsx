import type { Metadata } from "next";
import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Solutions for Enterprise Workflows",
  description:
    "Explore enterprise AI solutions mapped to revenue, operations, and risk-aware scaling outcomes.",
  path: "/solutions",
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
      <PageBlocks details={content.details} outcomes={content.outcomes} />
    </>
  );
}
