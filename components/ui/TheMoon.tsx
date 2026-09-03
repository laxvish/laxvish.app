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
const PAPER = "#FAFAFA";

/**
 * The Moon — 9 life-animations, 10% transparent (opacity 0.9).
 *
 * The exact team-authored moon SVG is embedded verbatim. The moon is
 * nearly opaque (10% see-through) so its surface life is fully visible;
 * a breathing aura, twinkling stars, and a breathing lake reflection
 * carry the rest of the life around it.
 *
 * The nine life-animations:
 *  1. Moonrise entrance   — fade in to 90% and settle
 *  2. Breathing scale     — the moon inhales/exhales (1.0↔1.015)
 *  3. Celestial sway      — slow ±2° rotational sway
 *  4. Halo breath         — the ambient atmospheric glow pulses
 *  5. Crescent rim shimmer— the lit edge of the moon shimmers
 *  6. Tycho ray shimmer   — Tycho's ray lines pulse softly
 *  7. Surface shimmer     — the maria + crater field breathes
 *  8. Stars twinkle       — three wish-stars, staggered
 *  9. Reflection breath   — the lake's reflection glow breathes
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

  // Moon center in the outer coordinate system
  const MOON_CX = 280;
  const MOON_CY = 240;

  const STARS = [
    { x: 64, y: 72, s: 0.7, dur: 11, delay: 0.4, drift: 2 },
    { x: 496, y: 88, s: 0.65, dur: 13, delay: 1.6, drift: -1.8 },
    { x: 504, y: 376, s: 0.55, dur: 10, delay: 2.4, drift: 1.6 },
  ];

  return (
    <motion.div
      role="img"
      aria-label="Engraved illustration: a translucent ghost moon, breathing softly, its atmosphere alive with a shimmering halo, twinkling wish-stars, and a rare ring that ripples outward — the answering moon, emblem of Laxvish"
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
        <defs>
          {/* Aura glow gradient — the bright breathing atmosphere around the ghost moon */}
          <radialGradient id="moon-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={PAPER} stopOpacity="0.55" />
            <stop offset="55%" stopColor={VELLUM} stopOpacity="0.18" />
            <stop offset="100%" stopColor={VELLUM} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* #4 HALO BREATH — the bright breathing aura around the ghost moon.
            This carries the moon's visible life at full opacity. */}
        <motion.g
          animate={
            motionEnabled
              ? { opacity: [0.35, 0.7, 0.35], scale: [1, 1.06, 1] }
              : { opacity: 0.5, scale: 1 }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: `${MOON_CX}px`, originY: `${MOON_CY}px` }}
        >
          <circle cx={MOON_CX} cy={MOON_CY} r="170" fill="url(#moon-aura)" />
        </motion.g>

        {/* THE MOON — the exact team-authored SVG, wrapped in a motion.g
            for #1 entrance, #2 breathing, #3 sway, and the 10% transparency. */}
        <motion.g
          initial={motionEnabled ? { opacity: 0, y: 20 } : { opacity: 0.9, y: 0 }}
          animate={
            motionEnabled
              ? {
                  opacity: 0.9,
                  y: 0,
                  scale: [1, 1.015, 1],
                  rotate: [-2, 2, -2],
                }
              : { opacity: 0.9, y: 0, scale: 1, rotate: 0 }
          }
          transition={{
            opacity: { duration: 1.2, delay: 0.2 },
            y: { type: "spring", stiffness: 50, damping: 18, delay: 0.2 },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 24, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ originX: `${MOON_CX}px`, originY: `${MOON_CY}px` }}
        >
          <svg
            x="80"
            y="40"
            width="400"
            height="400"
            viewBox="0 0 800 800"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="minimal-halo" cx="50%" cy="50%" r="50%">
                <stop offset="68%" stopColor="#FFFFFF" stopOpacity="0.08" />
                <stop offset="88%" stopColor="#E5E7EB" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="minimal-moon-base" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F3F4F6" />
                <stop offset="80%" stopColor="#E5E7EB" />
                <stop offset="100%" stopColor="#D1D5DB" />
              </radialGradient>
              <radialGradient id="minimal-shading" cx="32%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#000000" stopOpacity="0" />
                <stop offset="85%" stopColor="#1F2937" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#111827" stopOpacity="0.45" />
              </radialGradient>
              <clipPath id="moon-clip">
                <circle cx="400" cy="400" r="240" />
              </clipPath>
            </defs>

            {/* LAYER 1: Subtle Ambient Glow (faint inside the ghost) */}
            <circle cx="400" cy="400" r="280" fill="url(#minimal-halo)" />

            {/* LAYER 2: Base Moon Body */}
            <circle cx="400" cy="400" r="240" fill="url(#minimal-moon-base)" />

            <g clipPath="url(#moon-clip)">
              {/* #7 SURFACE SHIMMER — the maria + crater field breathes together */}
              <motion.g
                animate={
                  motionEnabled
                    ? { opacity: [0.85, 1, 0.85] }
                    : { opacity: 1 }
                }
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* LAYER 3: Soft Maria */}
                <g fill="#9CA3AF" opacity="0.18">
                  <path d="M 220 250 C 180 300, 200 380, 250 400 C 300 420, 330 350, 320 290 C 310 230, 250 210, 220 250 Z" />
                  <path d="M 380 230 C 440 210, 500 250, 480 310 C 460 360, 400 360, 370 320 C 340 280, 340 240, 380 230 Z" />
                  <path d="M 440 380 C 500 370, 530 420, 500 470 C 470 500, 420 470, 420 420 C 420 395, 430 385, 440 380 Z" />
                  <ellipse cx="530" cy="270" rx="26" ry="18" transform="rotate(-15 530 270)" />
                </g>
                {/* LAYER 4: Craters */}
                <g fill="none" opacity="0.22">
                  <circle cx="370" cy="580" r="20" stroke="#4B5563" strokeWidth="1.5" />
                  <circle cx="370" cy="580" r="5" fill="#4B5563" stroke="none" />
                  <circle cx="270" cy="370" r="22" stroke="#4B5563" strokeWidth="1.5" />
                  <circle cx="270" cy="370" r="6" fill="#4B5563" stroke="none" />
                  <circle cx="210" cy="260" r="12" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
                  <ellipse cx="330" cy="180" rx="16" ry="10" stroke="#4B5563" strokeWidth="1.2" />
                  <circle cx="200" cy="350" r="12" stroke="#6B7280" strokeWidth="1" />
                  <circle cx="510" cy="400" r="15" stroke="#6B7280" strokeWidth="1" />
                  <circle cx="430" cy="530" r="10" stroke="#6B7280" strokeWidth="1" />
                </g>
              </motion.g>

              {/* #6 TYCHO RAY SHIMMER — the ray lines pulse softly */}
              <motion.g
                stroke="#FFFFFF"
                strokeLinecap="round"
                animate={
                  motionEnabled
                    ? { opacity: [0.12, 0.32, 0.12] }
                    : { opacity: 0.2 }
                }
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <line x1="370" y1="580" x2="220" y2="680" strokeWidth="1" />
                <line x1="370" y1="580" x2="160" y2="520" strokeWidth="1" />
                <line x1="370" y1="580" x2="260" y2="380" strokeWidth="1" />
                <line x1="370" y1="580" x2="500" y2="420" strokeWidth="1" />
              </motion.g>

              {/* LAYER 6: Volumetric Soft Shadow */}
              <circle cx="400" cy="400" r="240" fill="url(#minimal-shading)" />
            </g>

            {/* #5 CRESCENT RIM SHIMMER — the lit edge of the moon */}
            <motion.path
              d="M 400 160 A 240 240 0 0 1 640 400 A 242 242 0 0 0 400 158 Z"
              fill="#FFFFFF"
              animate={
                motionEnabled
                  ? { opacity: [0.25, 0.55, 0.25] }
                  : { opacity: 0.4 }
              }
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.g>

        {/* #8 STARS TWINKLE — three wish-stars, staggered */}
        {STARS.map((star, i) => (
          <motion.g
            key={i}
            animate={
              motionEnabled
                ? {
                    x: [0, star.drift, 0],
                    y: [0, -star.drift * 0.7, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }
                : { x: 0, y: 0, opacity: 0.5 }
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
              strokeOpacity="0.55"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          </motion.g>
        ))}

        {/* The still lake */}
        <line
          x1="48"
          y1="500"
          x2="512"
          y2="500"
          stroke={INK}
          strokeOpacity="0.22"
          strokeWidth="0.8"
        />

        {/* #9 REFLECTION BREATH — the lake's reflection glow breathes */}
        <motion.g
          animate={motionEnabled ? { opacity: [0.3, 0.55, 0.3] } : { opacity: 0.4 }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="280" cy="520" rx="92" ry="6" fill={VELLUM} opacity="0.3" />
          <ellipse cx="280" cy="520" rx="128" ry="3" fill={INK} opacity="0.1" />
          <line x1="200" y1="534" x2="360" y2="534" stroke={INK} strokeOpacity="0.16" strokeWidth="0.7" />
          <line x1="224" y1="546" x2="336" y2="546" stroke={INK} strokeOpacity="0.11" strokeWidth="0.7" />
          <line x1="188" y1="558" x2="372" y2="558" stroke={INK} strokeOpacity="0.08" strokeWidth="0.7" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
