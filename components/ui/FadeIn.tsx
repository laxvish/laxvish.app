"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { DecisionPhase } from "@/lib/motion-system";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  yOffset?: number;
}

const variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: DecisionPhase.duration.system,
      delay: delay + DecisionPhase.delay,
      ease: DecisionPhase.ease,
    },
  }),
};

export function FadeIn({
  children,
  delay = 0,
  duration = DecisionPhase.duration.system,
  once = true,
  className = "",
  yOffset = 30,
}: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      variants={{
        hidden: { opacity: 0, y: yOffset, scale: 0.96, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            duration,
            delay: delay + DecisionPhase.delay,
            ease: DecisionPhase.ease,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FadeInStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function FadeInStagger({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
}: FadeInStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: DecisionPhase.delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

