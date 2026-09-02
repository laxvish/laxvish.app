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
      className="mx-auto w-full max-w-4xl px-6 py-24 sm:px-12 lg:py-32"
    >
      <div className="max-w-3xl space-y-6">
        <p className="font-mono text-xs font-medium tracking-[0.2em] text-mark uppercase">
          Frequently asked
        </p>
        <h2 className="text-4xl font-normal leading-[1.05] tracking-tight text-deepink sm:text-5xl">
          Common questions.
        </h2>
        <p className="text-base leading-relaxed text-deepink/70 sm:text-lg">
          If your question isn&rsquo;t here, just ask on the call. We answer
          honestly.
        </p>
      </div>

      <div className="mt-16 border-t border-rule-hair">
        {faqItems.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="group border-b border-rule-hair py-6"
          >
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 outline-none marker:hidden">
              <span className="font-mono text-xs tracking-[0.18em] text-mark pt-1.5 uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-xl font-normal leading-tight tracking-tight text-deepink sm:text-2xl">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-base text-mark transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 ml-12 max-w-2xl text-base leading-relaxed text-deepink/80">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
