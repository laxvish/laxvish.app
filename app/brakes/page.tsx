import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { PAGE_CONTENT } from "@/lib/site-pages";

export default function BrakesPage() {
  const content = PAGE_CONTENT.brakes;

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        summary={content.summary}
        shape="cone"
      />
      <PageBlocks details={content.details} outcomes={content.outcomes} />
    </>
  );
}
