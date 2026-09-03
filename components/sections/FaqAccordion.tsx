interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "What does Laxvish actually do?",
    answer:
      "We build AI workers that take over the repetitive work in your business — sales, customer support, document processing, finance, IT helpdesk, and more. Each AI worker is trained on a specific job and runs on your rules. You stay in control of every decision.",
  },
  {
    question: "Do I need a data science team to use Laxvish?",
    answer:
      "No. We deploy and manage the AI for you. Your team uses it like any other business tool. If you can describe the work you want automated, we can build an AI worker for it.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Most pilots show measurable results in 2–4 weeks. The first week is understanding your work. The second week is building and training the AI. By week three it's running on your real work, with your oversight.",
  },
  {
    question: "What if it doesn't work for my business?",
    answer:
      "Pilots are scoped with a clear go/no-go decision point. You'll know within weeks whether the AI is delivering the value you expected. If it isn't, we tell you honestly and help you figure out what would.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. Laxvish follows DPDP requirements, your data stays in India unless you say otherwise, and every AI decision is logged for your compliance team. You can ask us to update or delete your data at any time.",
  },
  {
    question: "How is Laxvish different from ChatGPT or other AI tools?",
    answer:
      "ChatGPT is a general tool — it's great for exploration but not built for your business. Laxvish is built around your workflows, your data, and your rules. The AI worker is trained on your business, knows your tone, follows your policies, and integrates with the tools you already use.",
  },
];

export function FaqAccordion() {
  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-10 sm:py-20 lg:py-28"
    >
      <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase mb-3">
        Frequently asked questions
      </p>
      <h2 className="text-[clamp(1.85rem,3.5vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
        Common questions about enterprise AI.
      </h2>
      <div className="mt-8 sm:mt-10 border-t border-charcoal">
        {faqItems.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="group border-b border-charcoal/20 transition-colors hover:bg-vaultAmber/40"
          >
            <summary className="flex cursor-pointer items-center justify-between py-5 sm:py-6 text-lg sm:text-xl font-normal text-charcoal outline-none marker:hidden select-none">
              <span className="pr-4">{item.question}</span>
              <span className="text-xl font-light text-neonCyan transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-6 max-w-3xl text-base leading-relaxed text-charcoal/70">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
