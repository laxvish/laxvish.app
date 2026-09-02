"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

/**
 * EditorialReveal — the binding motion primitive.
 *
 * Replaces the LLM fade-up-on-scroll default (F1, F3, F6 in AGENTS.md §4).
 * Allowed motion: a single slow opacity fade (700–1000ms) and a small,
 * considered vertical shift of ≤ 8px. No scale. No blur entrance. No
 * mechanical stagger.
 */
interface EditorialRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  yOffset?: number;
}

export function EditorialReveal({
  children,
  delay = 0,
  duration = 0.8,
  once = true,
  className = "",
  yOffset = 8,
}: EditorialRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Backward-compatible aliases for code that still imports FadeIn / FadeInStagger.
export const FadeIn = EditorialReveal;

export function FadeInStagger({
  children,
  className = "",
  staggerDelay = 0.08,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
