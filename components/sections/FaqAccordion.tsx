interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Can Laxvish run in private enterprise infrastructure?",
    answer:
      "Yes. The platform direction supports enterprise-controlled deployments and private environment requirements.",
  },
  {
    question: "How does it support trust and DPDP-aligned operations?",
    answer:
      "The operating model centers on verification, policy-aware controls, and auditable execution signals.",
  },
  {
    question: "How quickly can we start with one workflow?",
    answer:
      "Most teams begin with one high-value process and a focused pilot scope to prove measurable outcomes.",
  },
];

export function FaqAccordion() {
  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
    >
      <h2 className="text-3xl font-bold text-neonCyan [font-family:var(--font-space-grotesk)] sm:text-4xl">
        FAQ
      </h2>
      <div className="mt-6 space-y-3">
        {faqItems.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="rounded-xl border border-charcoal/20 bg-[#0d0d0d] p-5"
          >
            <summary className="cursor-pointer list-none text-sm font-medium text-neonCyan">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-6 text-charcoal/80">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
