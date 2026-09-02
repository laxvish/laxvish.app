"use client";

import { type ElementType, type MouseEvent, type ReactNode } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ExecutionPhase, ValidationPhase } from "@/lib/motion-system";
import { resolveMotionComponent } from "@/components/ui/withMotion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  [key: string]: unknown;
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

  // Not a render-time creation: `resolveMotionComponent` returns a reference
  // from a registry populated once at module scope (see withMotion.ts), so
  // element identity is stable across renders and no subtree state is reset.
  const MotionComponent = resolveMotionComponent(Component);

  return (
    /* eslint-disable-next-line react-hooks/static-components -- false positive: MotionComponent is a module-scope singleton, see withMotion.ts */
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
      className={className ?? `border border-charcoal/20 bg-transparent px-5 py-2 text-sm font-medium text-charcoal transition-colors duration-200 hover:border-charcoal hover:bg-vaultAmber`}
    >
      {children}
    </MotionComponent>
  );
}
