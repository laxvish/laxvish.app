"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Can Laxvish run in a private enterprise environment?",
    answer:
      "Yes. Deployment patterns are designed for enterprise control requirements, including private infrastructure preferences.",
  },
  {
    question: "How does this align with DPDP compliance expectations?",
    answer:
      "The product narrative and control patterns are designed around privacy-first operations and audit-friendly verification signals.",
  },
  {
    question: "Do you support multilingual Indian enterprise workflows?",
    answer:
      "Yes. The platform direction includes India-native language readiness for business operations and citizen-facing scenarios.",
  },
  {
    question: "How does Laxvish integrate with existing enterprise systems?",
    answer:
      "Integrations are planned through modular API-first boundaries so teams can connect existing workflows without full replacement.",
  },
  {
    question: "How quickly can we start a pilot?",
    answer:
      "Pilot readiness typically begins with one high-value workflow and a scoped verification layer for measurable outcomes.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <h2 className="text-3xl font-bold text-white [font-family:var(--font-space-grotesk)] sm:text-4xl">
        Questions Leaders Ask Before Deployment
      </h2>
      <div className="mt-8 space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="pr-2 text-sm font-medium text-white">{item.question}</span>
                  <span className="text-neonCyan">{isOpen ? "−" : "+"}</span>
                </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-6 text-gray-400">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
