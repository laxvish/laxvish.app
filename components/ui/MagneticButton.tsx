"use client";

import {
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
}

export function MagneticButton({
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const magneticEnabled = !prefersReducedMotion;

  const onMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (!magneticEnabled) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.2);
    y.set(offsetY * 0.2);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      {...props}
      style={magneticEnabled ? { x: springX, y: springY } : undefined}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className ?? `rounded-full border border-vaultAmber bg-transparent px-5 py-2 text-sm font-medium text-vaultAmber transition-shadow duration-200 hover:shadow-[0_0_18px_rgba(182,176,159,0.38)]`}
    >
      {children}
    </motion.button>
  );
}
