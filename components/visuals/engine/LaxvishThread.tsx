"use client";

import { motion } from "framer-motion";
import {
  BRAND_PALETTE,
  createSolitonParticle,
  type LaxvishThreadProps,
} from "@/types/visual-engine";

export function LaxvishThread({
  variant = "straight",
  className = "",
  color = BRAND_PALETTE.mark,
  secondaryColor = BRAND_PALETTE.ink,
  strokeWidth = 1.25,
  soliton: solitonConfig,
  progress,
  ariaLabel,
  animated = true,
  duration = 2.4,
}: LaxvishThreadProps) {
  const soliton = createSolitonParticle(solitonConfig);

  // 1. WAVE VARIANT: Sinusoidal waveform with traveling soliton pulse
  if (variant === "wave") {
    return (
      <svg
        role="img"
        aria-label={ariaLabel ?? "Laxvish Harmonic Waveform Thread"}
        viewBox="0 0 400 60"
        className={`w-full overflow-visible ${className}`}
        fill="none"
      >
        {/* Carrier Guide Line */}
        <line
          x1="0"
          y1="30"
          x2="400"
          y2="30"
          stroke={secondaryColor}
          strokeWidth="0.5"
          strokeOpacity="0.25"
          strokeDasharray="2 4"
        />

        {/* Sinusoidal Waveform Path Length Reveal */}
        <motion.path
          d="M 0,30 Q 50,5 100,30 T 200,30 T 300,30 T 400,30"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={
            animated
              ? {
                  pathLength: progress !== undefined ? progress : 1,
                  opacity: 1,
                }
              : { pathLength: 1, opacity: 1 }
          }
          transition={{
            duration,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Traveling Soliton Crest Particle */}
        {animated && (
          <motion.circle
            cx="200"
            cy="30"
            r={soliton.coreRadius ?? 2.5}
            fill={color}
            animate={{
              cx: [0, 400],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: duration * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </svg>
    );
  }

  // 2. SOLITON-PULSE VARIANT: Non-dispersive solitary wave packet propagation
  if (variant === "soliton-pulse") {
    return (
      <svg
        role="img"
        aria-label={ariaLabel ?? "Laxvish Soliton Pulse Thread"}
        viewBox="0 0 480 50"
        className={`w-full overflow-visible ${className}`}
        fill="none"
      >
        {/* Carrier Harmonic Substrate Line */}
        <line
          x1="0"
          y1="25"
          x2="480"
          y2="25"
          stroke={secondaryColor}
          strokeWidth="0.75"
          strokeOpacity="0.22"
          strokeDasharray="3 4"
        />

        {/* Central Carrier Thread Filament */}
        <motion.path
          d="M 0,25 L 480,25"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeOpacity="0.55"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />

        {/* Propagating Soliton Envelope */}
        {animated && (
          <motion.g
            animate={{
              x: [-20, 500],
            }}
            transition={{
              duration: duration * 1.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Lead Pulse Core */}
            <circle cx="0" cy="25" r={soliton.coreRadius ?? 2} fill={color} />

            {/* Non-Dispersive Halo Shockwave Ring */}
            <circle
              cx="0"
              cy="25"
              r={soliton.haloRadius ?? 4.5}
              stroke={color}
              strokeWidth="0.75"
              strokeOpacity="0.7"
            />

            {/* Trailing Decaying Attenuation Nodes */}
            <circle
              cx="-12"
              cy="25"
              r="1.25"
              fill={secondaryColor}
              fillOpacity="0.5"
            />
            <circle
              cx="-24"
              cy="25"
              r="0.75"
              fill={secondaryColor}
              fillOpacity="0.25"
            />
          </motion.g>
        )}
      </svg>
    );
  }

  // 3. SCAN VARIANT: Telemetry aperture scanning hairline
  if (variant === "scan") {
    return (
      <div
        role="img"
        aria-label={ariaLabel ?? "Laxvish Telemetry Scan Line"}
        className={`relative w-full overflow-hidden ${className}`}
      >
        <motion.div
          animate={
            animated
              ? {
                  top: ["0%", "100%", "0%"],
                  opacity: [0.4, 0.9, 0.4],
                }
              : { top: "50%", opacity: 0.8 }
          }
          transition={{
            duration: duration * 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-x-0 h-[1.25px] bg-mark z-20"
        />
      </div>
    );
  }

  // 4. CIRCLE VARIANT: Closed verification loop with checkmark path draw
  if (variant === "circle") {
    return (
      <svg
        role="img"
        aria-label={ariaLabel ?? "Laxvish Verification Loop"}
        viewBox="0 0 100 100"
        className={`w-16 h-16 ${className}`}
        fill="none"
      >
        {/* Outer Registration Ring */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke={secondaryColor}
          strokeWidth="0.75"
          strokeOpacity="0.25"
          strokeDasharray="3 3"
        />

        {/* Primary Animated Ring Reveal */}
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray="264"
          initial={{ strokeDashoffset: 264 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Inner Verification Angle */}
        <motion.path
          d="M 32 52 L 44 64 L 68 38"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
        />
      </svg>
    );
  }

  // 5. ORBIT VARIANT: Orbital ellipse with satellite tracking
  if (variant === "orbit") {
    return (
      <svg
        role="img"
        aria-label={ariaLabel ?? "Laxvish Orbital Thread"}
        viewBox="0 0 200 100"
        className={`w-full overflow-visible ${className}`}
        fill="none"
      >
        {/* Orbital Trajectory */}
        <motion.ellipse
          cx="100"
          cy="50"
          rx="80"
          ry="36"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Orbiting Satellite Node */}
        {animated && (
          <motion.circle
            cx="100"
            cy="14"
            r="2.5"
            fill={color}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </svg>
    );
  }

  // 6. CONNECTING VARIANT: Segment with joint connection markers
  if (variant === "connecting") {
    return (
      <svg
        role="img"
        aria-label={ariaLabel ?? "Laxvish Connecting Thread"}
        viewBox="0 0 320 40"
        className={`w-full overflow-visible ${className}`}
        fill="none"
      >
        {/* Connection Line */}
        <motion.line
          x1="10"
          y1="20"
          x2="310"
          y2="20"
          stroke={color}
          strokeWidth={strokeWidth}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress !== undefined ? progress : 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Start Joint Marker */}
        <rect
          x="6"
          y="16"
          width="8"
          height="8"
          className="rotate-45"
          style={{ transformOrigin: "10px 20px" }}
          stroke={color}
          strokeWidth="0.75"
          fill={BRAND_PALETTE.cream}
        />

        {/* End Joint Marker */}
        <rect
          x="306"
          y="16"
          width="8"
          height="8"
          className="rotate-45"
          style={{ transformOrigin: "310px 20px" }}
          stroke={color}
          strokeWidth="0.75"
          fill={color}
        />
      </svg>
    );
  }

  // 7. RULER VARIANT: Technical linear drafting ruler with millimeter ticks
  if (variant === "ruler") {
    return (
      <svg
        role="img"
        aria-label={ariaLabel ?? "Laxvish Technical Drafting Line"}
        viewBox="0 0 300 24"
        className={`w-full overflow-visible ${className}`}
        fill="none"
      >
        {/* Baseline Filament */}
        <line
          x1="0"
          y1="12"
          x2="300"
          y2="12"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity="0.6"
        />

        {/* Metric Ticks */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map((pos, idx) => (
          <line
            key={pos}
            x1={pos}
            y1={idx % 2 === 0 ? 6 : 9}
            x2={pos}
            y2={12}
            stroke={idx % 2 === 0 ? color : secondaryColor}
            strokeWidth="0.5"
            strokeOpacity={idx % 2 === 0 ? "0.6" : "0.3"}
          />
        ))}
      </svg>
    );
  }

  // 8. SPINE VARIANT: Vertical living thread segment with milestone dot
  if (variant === "spine") {
    return (
      <svg
        role="img"
        aria-label={ariaLabel ?? "Laxvish Spine Segment"}
        viewBox="0 0 20 200"
        className={`h-full overflow-visible ${className}`}
        fill="none"
      >
        {/* Carrier Guide */}
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="200"
          stroke={secondaryColor}
          strokeWidth="0.75"
          strokeOpacity="0.2"
          strokeDasharray="2 3"
        />

        {/* Spine Unspooling Line */}
        <motion.line
          x1="10"
          y1="0"
          x2="10"
          y2="200"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress !== undefined ? progress : 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />

        {/* Milestone Node */}
        <circle cx="10" cy="100" r="2.5" fill={color} />
        <circle
          cx="10"
          cy="100"
          r="5"
          stroke={color}
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />
      </svg>
    );
  }

  // 9. DEFAULT / STRAIGHT VARIANT: Smooth SVG linear path length reveal
  return (
    <svg
      role="img"
      aria-label={ariaLabel ?? "Laxvish Thread"}
      viewBox="0 0 300 40"
      className={`w-full ${className}`}
      fill="none"
    >
      {/* Carrier Background Line */}
      <line
        x1="0"
        y1="20"
        x2="300"
        y2="20"
        stroke={secondaryColor}
        strokeWidth="0.75"
        strokeOpacity="0.25"
        strokeDasharray="4 4"
      />

      {/* Main Living Thread Path Length Reveal */}
      <motion.path
        d="M 0,20 L 300,20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: progress !== undefined ? progress : 1,
        }}
        transition={{
          duration,
          repeat: progress !== undefined ? 0 : Infinity,
          ease: "linear",
        }}
      />
    </svg>
  );
}
