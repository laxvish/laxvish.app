import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { PAGE_CONTENT } from "@/lib/site-pages";

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
