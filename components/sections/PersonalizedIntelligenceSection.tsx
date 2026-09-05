"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLaxvishContext } from "@/lib/laxvish-context/client";
import type { PredictedSolutionOpportunity } from "@/lib/context/types";

export function PersonalizedIntelligenceSection() {
  const { predictedSolutions, contextGraph } = useLaxvishContext();

  const prefersReducedMotion = Boolean(
    contextGraph?.technical?.prefersReducedMotion ||
      (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)
  );

  const thoughts: string[] = useMemo(() => {
    if (Array.isArray(predictedSolutions) && predictedSolutions.length >= 5) {
      return predictedSolutions.slice(0, 5).map((s: PredictedSolutionOpportunity) => s.text || s.description);
    }
    return [
      "I think we could help you scale your business with AI — taking some of the repetitive operational work away so your team can spend more time on the decisions that actually matter.",
      "And if education or institutional training is part of your world, we could build an AI layer around your curriculum and administration that gives teachers more time and creates a better experience for students.",
      "If your team spends time moving information between documents, people, and systems, we could turn that entire extraction and verification process into something that largely takes care of itself.",
      "You may also have opportunities on the front line of your business. We could build agents that talk to prospects in natural Indian languages, qualify opportunities, and keep conversations moving without asking your team to do every follow-up themselves.",
      "The bigger opportunity may be connecting all of this together — giving your organization an AI layer that understands its work, remembers what matters, and can actually do things on your behalf.",
    ];
  }, [predictedSolutions]);

  return (
    <section
      id="intelligence"
      aria-label="What Laxvish can build for you"
      className="w-full bg-obsidian border-b border-charcoal/20 py-24 sm:py-32 lg:py-44"
    >
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 lg:px-12">
        {/* Understated Section Introduction */}
        <div className="pb-12 sm:pb-16 lg:pb-20 border-b border-charcoal/15">
          <p className="text-[11px] sm:text-xs font-mono tracking-[0.2em] text-neonCyan uppercase">
            We’ve been thinking about what AI could do for you
          </p>
        </div>

        {/* The Sequence of Five Thoughts with Generous Whitespace */}
        <div className="pt-12 sm:pt-16 lg:pt-20 space-y-12 sm:space-y-16 lg:space-y-20">
          {thoughts.map((thoughtText, index) => (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.65,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative"
            >
              <p className="text-xl sm:text-2xl lg:text-[1.75rem] font-normal leading-[1.6] tracking-[-0.01em] text-charcoal font-space-grotesk">
                {thoughtText}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quiet closing action */}
        <div className="mt-16 sm:mt-24 lg:mt-32 pt-10 border-t border-charcoal/15 flex items-center justify-between">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 text-sm sm:text-base font-mono uppercase tracking-[0.14em] text-charcoal hover:text-neonCyan transition-colors group"
          >
            <span>Let’s talk about what we could build for you</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
