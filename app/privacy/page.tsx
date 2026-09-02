import type { Metadata } from "next";
import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Review Laxvish privacy principles for data minimization and responsible information handling.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const content = PAGE_CONTENT.privacy;

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
