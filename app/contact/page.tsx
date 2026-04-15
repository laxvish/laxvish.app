import type { Metadata } from "next";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Laxvish",
  description:
    "Start an enterprise AI pilot conversation with Laxvish and define your implementation path.",
  path: "/contact",
});

export default function ContactPage() {
  const content = PAGE_CONTENT.contact;

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        summary={content.summary}
      />
      <ContactPanel />
    </>
  );
}
