"use client";

import { type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * PressButton — the binding interactive primitive.
 *
 * Replaces the LLM MagneticButton (scale 1.05 hover, scale 0.95 tap,
 * rounded-full default, glow shadow). Allowed: a quiet press-down
 * (scale 0.985) on tap, color/border change on hover, no scale-up
 * on hover (F3 in AGENTS.md §4).
 */
interface PressButtonProps {
  children: ReactNode;
  className?: string;
  as?: any;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  tabIndex?: number;
  "aria-hidden"?: boolean;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  autoComplete?: string;
}

export function PressButton({
  children,
  className,
  as: Component = "button",
  ...props
}: PressButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 25 });
  const springY = useSpring(y, { stiffness: 100, damping: 25 });
  const motionEnabled = !prefersReducedMotion;

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!motionEnabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.12); // smaller than the original — gentle, not theatrical
    y.set(offsetY * 0.12);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = motion.create(Component as any);

  return (
    <MotionComponent
      {...props}
      style={motionEnabled ? { x: springX, y: springY } : undefined}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={
        motionEnabled
          ? {
              scale: 0.985, // press-down only — no hover scale-up
              transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

// Backward-compatible alias.
export const MagneticButton = PressButton;
