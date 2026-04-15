import type { Metadata } from "next";
import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Orchestration Brain for Enterprise Control",
  description:
    "Understand how Laxvish Brain routes tasks, coordinates workers, and governs execution flows.",
  path: "/brain",
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
      <PageBlocks details={content.details} outcomes={content.outcomes} />
    </>
  );
}
