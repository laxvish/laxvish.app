import type { Metadata } from "next";
import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Domain AI Workers for Enterprise Operations",
  description:
    "See how specialized AI workers execute repeatable tasks with enterprise-grade controls.",
  path: "/workers",
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
      <PageBlocks details={content.details} outcomes={content.outcomes} />
    </>
  );
}
