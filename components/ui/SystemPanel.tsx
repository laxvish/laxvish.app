"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, type MouseEvent, useRef } from "react";
import { ExecutionPhase, ValidationPhase } from "@/lib/motion-system";

interface SystemPanelProps {
  children: ReactNode;
  className?: string;
  as?: any;
}

export function SystemPanel({ children, className = "", as: Component = "div" }: SystemPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Decision-like lag on the 3D spring tilt
  const mouseXSpring = useSpring(x, { stiffness: 80, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 80, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = motion.create(Component as any);

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.02,
        transition: { 
          duration: ExecutionPhase.duration.micro, 
          ease: ExecutionPhase.ease 
        }
      }}
      whileTap={{
        scale: 0.96, // Slight compression before release
        transition: { 
          duration: ValidationPhase.duration.standard, 
          ease: ValidationPhase.ease 
        }
      }}
      className={`relative transform-gpu ${className}`}
    >
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: "radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(102, 102, 102, 0.05), transparent 40%)"
        }}
      />
      <div className="relative z-10 w-full h-full transform-gpu" style={{ transform: "translateZ(15px)" }}>
        {children}
      </div>
    </MotionComponent>
  );
}
