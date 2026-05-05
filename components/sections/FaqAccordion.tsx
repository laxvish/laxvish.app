interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "What makes Laxvish different from other enterprise AI platforms?",
    answer:
      "Laxvish combines three integrated layers — Workers for execution, Brain for orchestration, and Brakes for verification — into one enterprise AI operating system. Most platforms offer only one of these capabilities. We deliver all three in a unified system designed for production, not just proof-of-concept.",
  },
  {
    question: "How quickly can we deploy AI workflow automation with Laxvish?",
    answer:
      "Most teams begin with one high-value workflow and a focused pilot scope. You can deploy a production-ready AI workflow within weeks, with measurable success criteria and governance controls active from day one.",
  },
  {
    question: "Does Laxvish support enterprise compliance and governance requirements?",
    answer:
      "Yes. Brakes provides AI governance and verification controls including pre-action validation, risk-triggered escalation, and audit-grade execution traces. The platform is designed with DPDP-first controls for enterprise procurement confidence.",
  },
  {
    question: "Can Laxvish run in private enterprise infrastructure?",
    answer:
      "The platform direction supports enterprise-controlled deployments and private environment requirements. Contact us to discuss your specific infrastructure needs.",
  },
];

export function FaqAccordion() {
  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-4xl px-6 py-24 sm:px-12 lg:py-32"
    >
      <h2 className="text-4xl font-normal tracking-tight text-charcoal sm:text-5xl">
        Common questions about enterprise AI.
      </h2>
      <div className="mt-12 flex flex-col border-t border-charcoal">
        {faqItems.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="group border-b border-charcoal/20 py-6 transition-colors hover:bg-vaultAmber/50"
          >
            <summary className="cursor-pointer list-none text-xl font-normal text-charcoal outline-none marker:hidden">
              {item.question}
            </summary>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-neonCyan">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
