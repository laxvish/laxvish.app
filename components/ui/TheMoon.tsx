"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { MouseEvent } from "react";

const INK = "#111111";
const VELLUM = "#EAEAEA";

/**
 * The Moon — uses the exact moon SVG provided by the team, framed
 * inside the hero plate with a single hairline lake, a faint
 * reflection, and three small wish-stars. The moon itself is the
 * authored artwork and is reproduced verbatim (only SVG-attribute
 * names converted to React/JSX).
 */
export function TheMoon() {
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = !prefersReducedMotion;

  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const tiltX = useSpring(rawTiltX, { stiffness: 60, damping: 22 });
  const tiltY = useSpring(rawTiltY, { stiffness: 60, damping: 22 });
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [1.2, -1.2]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-1.2, 1.2]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawTiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawTiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    rawTiltX.set(0);
    rawTiltY.set(0);
  };

  // A few faint wish-stars, placed in the negative space around the moon.
  const STARS = [
    { x: 64, y: 72, s: 0.7, dur: 11, delay: 0.4, drift: 2 },
    { x: 496, y: 88, s: 0.65, dur: 13, delay: 1.6, drift: -1.8 },
    { x: 504, y: 376, s: 0.55, dur: 10, delay: 2.4, drift: 1.6 },
  ];

  return (
    <motion.div
      role="img"
      aria-label="Engraved illustration of a real moon — lit from the upper left, its dark terminator a quiet curve, maria and craters traced on its face — the answering moon, emblem of Laxvish"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={motionEnabled ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <svg
        viewBox="0 0 560 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
      >
        {/* The moon — the exact SVG provided, nested and centered */}
        <svg
          x="80"
          y="40"
          width="400"
          height="400"
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Soft Ambient Halo */}
            <radialGradient id="minimal-halo" cx="50%" cy="50%" r="50%">
              <stop offset="68%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="88%" stopColor="#E5E7EB" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Smooth Spherical Base */}
            <radialGradient id="minimal-moon-base" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F3F4F6" />
              <stop offset="80%" stopColor="#E5E7EB" />
              <stop offset="100%" stopColor="#D1D5DB" />
            </radialGradient>

            {/* Subtle Volumetric Shadow (Soft Lighting) */}
            <radialGradient id="minimal-shading" cx="32%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#000000" stopOpacity="0" />
              <stop offset="85%" stopColor="#1F2937" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#111827" stopOpacity="0.45" />
            </radialGradient>

            {/* Clip Path for Perfect Edge Alignment */}
            <clipPath id="moon-clip">
              <circle cx="400" cy="400" r="240" />
            </clipPath>
          </defs>

          {/* LAYER 1: Subtle Ambient Glow */}
          <circle cx="400" cy="400" r="280" fill="url(#minimal-halo)" />

          {/* LAYER 2: Base Moon Body */}
          <circle cx="400" cy="400" r="240" fill="url(#minimal-moon-base)" />

          {/* SURFACE DETAILS (CLIPPED TO MOON SPHERE) */}
          <g clipPath="url(#moon-clip)">
            {/* LAYER 3: Soft Maria (Minimal Flat Lowlands) */}
            <g fill="#9CA3AF" opacity="0.18">
              {/* Mare Imbrium / Procellarum (Northwest) */}
              <path d="M 220 250 C 180 300, 200 380, 250 400 C 300 420, 330 350, 320 290 C 310 230, 250 210, 220 250 Z" />
              {/* Mare Serenitatis / Tranquillitatis (Northeast) */}
              <path d="M 380 230 C 440 210, 500 250, 480 310 C 460 360, 400 360, 370 320 C 340 280, 340 240, 380 230 Z" />
              {/* Mare Foecunditatis (Southeast) */}
              <path d="M 440 380 C 500 370, 530 420, 500 470 C 470 500, 420 470, 420 420 C 420 395, 430 385, 440 380 Z" />
              {/* Mare Crisium (East Oval) */}
              <ellipse cx="530" cy="270" rx="26" ry="18" transform="rotate(-15 530 270)" />
            </g>

            {/* LAYER 4: Minimal Craters (Clean Soft Rings) */}
            <g fill="none" opacity="0.22">
              {/* Tycho (South) */}
              <circle cx="370" cy="580" r="20" stroke="#4B5563" strokeWidth="1.5" />
              <circle cx="370" cy="580" r="5" fill="#4B5563" stroke="none" />
              {/* Copernicus (Mid-West) */}
              <circle cx="270" cy="370" r="22" stroke="#4B5563" strokeWidth="1.5" />
              <circle cx="270" cy="370" r="6" fill="#4B5563" stroke="none" />
              {/* Aristarchus (Bright Accent) */}
              <circle cx="210" cy="260" r="12" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
              {/* Plato (North) */}
              <ellipse cx="330" cy="180" rx="16" ry="10" stroke="#4B5563" strokeWidth="1.2" />
              {/* Secondary Soft Craters */}
              <circle cx="200" cy="350" r="12" stroke="#6B7280" strokeWidth="1" />
              <circle cx="510" cy="400" r="15" stroke="#6B7280" strokeWidth="1" />
              <circle cx="430" cy="530" r="10" stroke="#6B7280" strokeWidth="1" />
            </g>

            {/* LAYER 5: Minimal Ray Accent Lines */}
            <g stroke="#FFFFFF" strokeLinecap="round" opacity="0.2">
              <line x1="370" y1="580" x2="220" y2="680" strokeWidth="1" />
              <line x1="370" y1="580" x2="160" y2="520" strokeWidth="1" />
              <line x1="370" y1="580" x2="260" y2="380" strokeWidth="1" />
              <line x1="370" y1="580" x2="500" y2="420" strokeWidth="1" />
            </g>

            {/* LAYER 6: Volumetric Soft Shadow */}
            <circle cx="400" cy="400" r="240" fill="url(#minimal-shading)" />
          </g>

          {/* LAYER 7: Delicate Crescent Rim Highlight */}
          <path
            d="M 400 160 A 240 240 0 0 1 640 400 A 242 242 0 0 0 400 158 Z"
            fill="#FFFFFF"
            opacity="0.4"
          />
        </svg>

        {/* Wish-stars — a few faint cross-glyphs around the moon */}
        {STARS.map((star, i) => (
          <motion.g
            key={i}
            animate={
              motionEnabled
                ? {
                    x: [0, star.drift, 0],
                    y: [0, -star.drift * 0.7, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }
                : { x: 0, y: 0, opacity: 0.45 }
            }
            transition={{
              duration: star.dur,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M0 -3.5 L0 3.5 M-3.5 0 L3.5 0"
              transform={`translate(${star.x} ${star.y}) scale(${star.s})`}
              stroke={INK}
              strokeOpacity="0.5"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </motion.g>
        ))}

        {/* The still lake — a single hairline horizon */}
        <line
          x1="48"
          y1="500"
          x2="512"
          y2="500"
          stroke={INK}
          strokeOpacity="0.2"
          strokeWidth="0.8"
        />

        {/* A faint reflection glow on the water — a soft elliptical wash
            with three ripple hairlines. Not a mirrored moon. */}
        <motion.g
          animate={motionEnabled ? { opacity: [0.3, 0.5, 0.3] } : { opacity: 0.4 }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="280" cy="520" rx="86" ry="6" fill={VELLUM} opacity="0.28" />
          <ellipse cx="280" cy="520" rx="120" ry="3" fill={INK} opacity="0.08" />
          <line x1="200" y1="534" x2="360" y2="534" stroke={INK} strokeOpacity="0.14" strokeWidth="0.7" />
          <line x1="224" y1="546" x2="336" y2="546" stroke={INK} strokeOpacity="0.1" strokeWidth="0.7" />
          <line x1="188" y1="558" x2="372" y2="558" stroke={INK} strokeOpacity="0.07" strokeWidth="0.7" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
