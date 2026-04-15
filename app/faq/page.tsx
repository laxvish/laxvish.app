import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { PageHero } from "@/components/sections/depth/PageHero";

const FAQ_HERO = {
  eyebrow: "FAQ",
  title: "Answers for enterprise teams evaluating Laxvish.",
  summary:
    "Explore deployment, governance, and implementation questions before your pilot.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow={FAQ_HERO.eyebrow}
        title={FAQ_HERO.title}
        summary={FAQ_HERO.summary}
      />
      <FaqAccordion />
    </>
  );
}
