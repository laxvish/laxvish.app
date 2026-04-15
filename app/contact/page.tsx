import { ContactPanel } from "@/components/sections/ContactPanel";
import { PageHero } from "@/components/sections/depth/PageHero";
import { PAGE_CONTENT } from "@/lib/site-pages";

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
