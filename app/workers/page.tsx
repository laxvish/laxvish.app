import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { PAGE_CONTENT } from "@/lib/site-pages";

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
