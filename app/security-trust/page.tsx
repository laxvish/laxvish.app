import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { PAGE_CONTENT } from "@/lib/site-pages";

export default function SecurityTrustPage() {
  const content = PAGE_CONTENT["security-trust"];

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        summary={content.summary}
        shape="octahedron"
      />
      <PageBlocks details={content.details} outcomes={content.outcomes} />
    </>
  );
}
