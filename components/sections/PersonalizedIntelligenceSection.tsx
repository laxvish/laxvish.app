"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLaxvishContext } from "@/lib/laxvish-context/client";
import type { AIPrediction, PredictedSolutionOpportunity } from "@/lib/context/types";

const TYPEWRITER_TICK_MS = 22;
const PREDICTION_HOLD_MS = 2000;
const FADE_DURATION_SEC = 0.25;

const FALLBACK_PREDICTIONS: AIPrediction[] = [
  {
    text: "I think we could help you scale your business with AI — taking some of the repetitive operational work away so your team can spend more time on the decisions that actually matter.",
  },
  {
    text: "And if education or institutional training is part of your world, we could build an AI layer around your curriculum and administration that gives teachers more time and creates a better experience for students.",
  },
  {
    text: "If your team spends time moving information between documents, people, and systems, we could turn that entire extraction and verification process into something that largely takes care of itself.",
  },
  {
    text: "You may also have opportunities on the front line of your business. We could build agents that talk to prospects in natural Indian languages, qualify opportunities, and keep conversations moving without asking your team to do every follow-up themselves.",
  },
  {
    text: "The bigger opportunity may be connecting all of this together — giving your organization an AI layer that understands its work, remembers what matters, and can actually do things on your behalf.",
  },
];

export function PersonalizedIntelligenceSection() {
  const { predictedSolutions, contextGraph } = useLaxvishContext();
  const [activePredictionIndex, setActivePredictionIndex] = useState<number>(0);
  const [displayedLength, setDisplayedLength] = useState<number>(0);

  const prefersReducedMotion = Boolean(
    contextGraph?.technical?.prefersReducedMotion ||
      (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)
  );

  // Validate and strongly type the predictions array
  const predictions: AIPrediction[] = useMemo(() => {
    if (Array.isArray(predictedSolutions) && predictedSolutions.length > 0) {
      const valid = predictedSolutions
        .map((s: PredictedSolutionOpportunity) => ({
          text: (s.text || s.description || "").trim(),
        }))
        .filter((p: AIPrediction) => p.text.length > 0);

      if (valid.length > 0) {
        return valid.slice(0, 5);
      }
    }
    return FALLBACK_PREDICTIONS;
  }, [predictedSolutions]);

  const currentPrediction = predictions[activePredictionIndex] || predictions[0];
  const fullText = currentPrediction.text;

  // 1. Reset or initialize displayed length when active prediction changes
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedLength(fullText.length);
    } else {
      setDisplayedLength(0);
    }
  }, [activePredictionIndex, fullText.length, prefersReducedMotion]);

  // 2. Letter-by-letter typewriter reveal
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedLength(fullText.length);
      return;
    }

    if (displayedLength >= fullText.length) {
      return;
    }

    const typingTimer = window.setTimeout(() => {
      setDisplayedLength((prev) => Math.min(prev + 1, fullText.length));
    }, TYPEWRITER_TICK_MS);

    return () => window.clearTimeout(typingTimer);
  }, [displayedLength, fullText.length, prefersReducedMotion]);

  // 3. Closed-loop transition: Once full text is typed, hold for 2 seconds, then transition to next in loop (1->2->3->4->5->1...)
  useEffect(() => {
    if (predictions.length <= 1) return;
    if (displayedLength < fullText.length) return;

    const holdTimer = window.setTimeout(() => {
      setActivePredictionIndex((current: number) => (current + 1) % predictions.length);
    }, PREDICTION_HOLD_MS);

    return () => window.clearTimeout(holdTimer);
  }, [displayedLength, fullText.length, predictions.length]);

  const displayedText = prefersReducedMotion ? fullText : fullText.slice(0, displayedLength);
  const isTyping = !prefersReducedMotion && displayedLength < fullText.length;

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

        {/* Single Active Thought with One-Letter-at-a-Time Typewriter Reveal */}
        <div className="py-14 sm:py-20 lg:py-28 min-h-[220px] sm:min-h-[260px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePredictionIndex}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{
                duration: prefersReducedMotion ? 0 : FADE_DURATION_SEC,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="w-full"
            >
              <p className="text-xl sm:text-2xl lg:text-[1.85rem] font-normal leading-[1.65] tracking-[-0.01em] text-charcoal font-space-grotesk">
                {displayedText}
                {isTyping && (
                  <span
                    aria-hidden="true"
                    className="inline-block w-[2px] h-[0.9em] bg-charcoal ml-1 align-baseline animate-pulse"
                  />
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quiet Closing Action Link */}
        <div className="pt-10 border-t border-charcoal/15 flex items-center justify-between">
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
