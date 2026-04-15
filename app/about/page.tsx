import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { PAGE_CONTENT } from "@/lib/site-pages";

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
