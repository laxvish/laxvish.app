"use client";

import { motion } from "framer-motion";

interface LaxvishThreadProps {
  variant?: "straight" | "wave" | "orbit" | "connecting" | "scan" | "circle";
  className?: string;
  color?: string;
}

export function LaxvishThread({
  variant = "straight",
  className = "",
  color = "#111111",
}: LaxvishThreadProps) {
  if (variant === "wave") {
    return (
      <svg
        viewBox="0 0 400 60"
        className={`w-full overflow-visible ${className}`}
        fill="none"
      >
        <motion.path
          d="M 0,30 Q 50,5 100,30 T 200,30 T 300,30 T 400,30"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.2, 0.9, 0.4] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="200"
          cy="30"
          r="3"
          fill={color}
          animate={{
            cx: [0, 400],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    );
  }

  if (variant === "scan") {
    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
        <motion.div
          animate={{
            top: ["0%", "100%", "0%"],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-x-0 h-[1.5px] bg-mark z-20"
        />
      </div>
    );
  }

  if (variant === "circle") {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`w-16 h-16 ${className}`}
        fill="none"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="264"
          initial={{ strokeDashoffset: 264 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M 32 52 L 44 64 L 68 38"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 300 40"
      className={`w-full ${className}`}
      fill="none"
    >
      <motion.path
        d="M 0,20 L 300,20"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}
