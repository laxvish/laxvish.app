"use client";

import { type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ExecutionPhase, ValidationPhase } from "@/lib/motion-system";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: any;
  [key: string]: any;
}

export function MagneticButton({
  children,
  className,
  as: Component = "button",
  ...props
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 25 });
  const springY = useSpring(y, { stiffness: 100, damping: 25 });
  const magneticEnabled = !prefersReducedMotion;

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!magneticEnabled) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.3);
    y.set(offsetY * 0.3);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = motion.create(Component as any);

  return (
    <MotionComponent
      {...props}
      style={magneticEnabled ? { x: springX, y: springY } : undefined}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{
        scale: 1.05,
        transition: { 
          duration: ExecutionPhase.duration.micro, 
          ease: ExecutionPhase.ease 
        }
      }}
      whileTap={{
        scale: 0.95, // Halt before complete, slight compression
        transition: { 
          duration: ValidationPhase.duration.standard, 
          ease: ValidationPhase.ease 
        }
      }}
      className={className ?? `rounded-full border border-vaultAmber bg-transparent px-5 py-2 text-sm font-medium text-vaultAmber transition-shadow duration-200 hover:shadow-[0_0_18px_rgba(182,176,159,0.38)]`}
    >
      {children}
    </MotionComponent>
  );
}
