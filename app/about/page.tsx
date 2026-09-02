import type { Metadata } from "next";
import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "About Laxvish",
  description:
    "Learn how Laxvish helps enterprises move from AI experimentation to reliable operations.",
  path: "/about",
});

export default function AboutPage() {
  const content = PAGE_CONTENT.about;

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        summary={content.summary}
      />
      <PageBlocks details={content.details} outcomes={content.outcomes} />
    </>
  );
}
