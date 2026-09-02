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
      <h2 className="text-4xl font-normal tracking-tight text-charcoal sm:text-5xl">
        Common questions.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/70 sm:text-lg">
        If your question isn&rsquo;t here, just ask on the call. We answer honestly.
      </p>
      <div className="mt-12 flex flex-col border-t border-vaultAmber/20">
        {faqItems.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="group border-b border-vaultAmber/15 py-6 transition-colors hover:bg-white/5 px-4 rounded-xl"
          >
            <summary className="cursor-pointer list-none text-xl font-normal text-charcoal outline-none marker:hidden flex justify-between items-center">
              <span>{item.question}</span>
              <span className="text-vaultAmber text-sm transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-charcoal/80">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
