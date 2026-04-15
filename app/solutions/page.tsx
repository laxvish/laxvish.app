import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { PAGE_CONTENT } from "@/lib/site-pages";

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
