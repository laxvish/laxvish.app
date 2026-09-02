"use client";

// ============================================================================
// EDITORIAL FAQ CHAPTER
// World: editorial print — Q&A printed in two columns, NOT an accordion.
// ============================================================================

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
      "Most pilots show measurable results in 2–4 weeks. The first week is understanding your work. The second week is building and training the AI. By week three it&rsquo;s running on your real work, with your oversight.",
  },
  {
    question: "What if it doesn&rsquo;t work for my business?",
    answer:
      "Pilots are scoped with a clear go/no-go decision point. You&rsquo;ll know within weeks whether the AI is delivering the value you expected. If it isn&rsquo;t, we tell you honestly and help you figure out what would.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. Laxvish follows DPDP requirements, your data stays in India unless you say otherwise, and every AI decision is logged for your compliance team. You can ask us to update or delete your data at any time.",
  },
  {
    question: "How is Laxvish different from ChatGPT or other AI tools?",
    answer:
      "ChatGPT is a general tool — it&rsquo;s great for exploration but not built for your business. Laxvish is built around your workflows, your data, and your rules. The AI worker is trained on your business, knows your tone, follows your policies, and integrates with the tools you already use.",
  },
];

export function FaqAccordion() {
  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-[1440px] border-t border-rule-hair px-6 py-20 sm:px-12 lg:px-16 lg:py-28"
    >
      <header className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
            Common Questions
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-normal leading-[1.04] tracking-tight text-deepink">
            Things enterprise buyers ask before they sign.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="max-w-md text-base leading-relaxed text-deepink/75">
            Edited from real conversations with founders, COOs, IT heads, and
            compliance officers. If yours isn&rsquo;t here, ask on the call —
            we&rsquo;ll answer honestly, in writing.
          </p>
        </div>
      </header>

      {/* Two-column editorial QA spread */}
      <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-12 border-t border-rule-hair pt-12 lg:grid-cols-2">
        <ol className="divide-y divide-rule-hair">
          {faqItems.slice(0, Math.ceil(faqItems.length / 2)).map((item, i) => (
            <li key={item.question} className="py-8">
              <div className="flex items-baseline gap-4 font-mono text-xs tracking-[0.18em] text-mark uppercase">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="text-deepink/50">Question</span>
              </div>
              <h3 className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight text-deepink">
                {item.question}
              </h3>
              <p
                className="mt-4 max-w-md text-base leading-relaxed text-deepink/75"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </li>
          ))}
        </ol>

        <ol className="divide-y divide-rule-hair">
          {faqItems.slice(Math.ceil(faqItems.length / 2)).map((item, i) => (
            <li key={item.question} className="py-8">
              <div className="flex items-baseline gap-4 font-mono text-xs tracking-[0.18em] text-mark uppercase">
                <span>{String(i + Math.ceil(faqItems.length / 2) + 1).padStart(2, "0")}</span>
                <span className="text-deepink/50">Question</span>
              </div>
              <h3 className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight text-deepink">
                {item.question}
              </h3>
              <p
                className="mt-4 max-w-md text-base leading-relaxed text-deepink/75"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </li>
          ))}
        </ol>
      </div>

      {/* Closing disclaimer — editor's tone, anti-slop */}
      <p className="mt-16 max-w-2xl border-t border-rule-hair pt-6 font-mono text-[11px] leading-relaxed tracking-wide text-deepink/55 uppercase">
        We do not maintain a marketing version and a real version of these
        answers. The text above is the same one we read on customer calls.
      </p>
    </section>
  );
}
