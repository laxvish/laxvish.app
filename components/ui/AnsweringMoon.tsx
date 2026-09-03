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
const MUTED = "#666666";
const PAPER = "#FAFAFA";

/* Hand-placed stars of the sky — each a wish drifting toward the moon. */
const STARS = [
  { x: 112, y: 128, s: 1.05, dur: 9.5, delay: 0.2, drift: 5 },
  { x: 452, y: 96, s: 0.8, dur: 11, delay: 1.6, drift: -4 },
  { x: 492, y: 312, s: 0.9, dur: 12.5, delay: 2.8, drift: 4 },
  { x: 76, y: 318, s: 0.7, dur: 10.5, delay: 3.7, drift: -5 },
  { x: 168, y: 58, s: 0.65, dur: 13, delay: 1.1, drift: 4 },
  { x: 402, y: 44, s: 0.75, dur: 9, delay: 2.2, drift: -4 },
  { x: 148, y: 470, s: 0.6, dur: 11.5, delay: 0.9, drift: 3 },
  { x: 436, y: 468, s: 0.7, dur: 12, delay: 3.1, drift: -3 },
];

/* Halo rays — varied lengths like an old woodcut, deterministic (SSR-safe). */
const RAY_LENGTHS = [26, 9, 16, 9, 21, 9, 12, 9] as const;
const RAYS = Array.from({ length: 48 }, (_, i) => {
  const angle = (i * 7.5 * Math.PI) / 180;
  const inner = 172;
  const outer = inner + RAY_LENGTHS[i % RAY_LENGTHS.length];
  return {
    x1: 280 + Math.cos(angle) * inner,
    y1: 248 + Math.sin(angle) * inner,
    x2: 280 + Math.cos(angle) * outer,
    y2: 248 + Math.sin(angle) * outer,
    key: i,
  };
});

/* Craters — engraved, hand-placed. */
const CRATERS = [
  { cx: 233, cy: 192, r: 18 },
  { cx: 316, cy: 222, r: 26 },
  { cx: 253, cy: 288, r: 13 },
  { cx: 331, cy: 301, r: 9 },
  { cx: 212, cy: 251, r: 7 },
  { cx: 299, cy: 163, r: 11 },
  { cx: 352, cy: 258, r: 6 },
];

const MOON_CENTER = "280px 248px";

const STAR_PATH =
  "M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z";

/**
 * The Answering Moon — the hero's fantasy centerpiece.
 *
 * An engraved woodcut moon over a still lake: one slow halo, drifting
 * wish-stars, a breathing reflection. Around 70% of the plate holds still;
 * the piece carries the hero's sense of wonder without a single technical
 * surface. Everything freezes under reduced motion.
 */
export function AnsweringMoon() {
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = !prefersReducedMotion;

  // Gentle cursor tilt — the plate leans toward you like a held object.
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

  return (
    <motion.div
      role="img"
      aria-label="Engraved illustration: a dark moon with a slowly turning halo drifts above a still lake, ringed by twinkling wish-stars — the Answering Moon, emblem of Laxvish"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={motionEnabled ? { opacity: 0, y: 72 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 45, damping: 16 }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <svg
        viewBox="0 0 560 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
      >
        <defs>
          <clipPath id="moon-clip">
            <circle cx="280" cy="248" r="150" />
          </clipPath>
        </defs>

        {/* The still lake */}
        <line x1="40" y1="566" x2="520" y2="566" stroke={INK} strokeOpacity="0.25" strokeWidth="1" />

        {/* Moonrise — the disc ascends once, then holds perfectly still */}
        <g>
          {/* Halo — the only continuous rotation, slow as a shadow */}
          <motion.g
            animate={motionEnabled ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            style={{ originX: MOON_CENTER, originY: MOON_CENTER }}
          >
            {RAYS.map((ray) => (
              <line
                key={ray.key}
                x1={ray.x1}
                y1={ray.y1}
                x2={ray.x2}
                y2={ray.y2}
                stroke={INK}
                strokeOpacity="0.45"
                strokeWidth="1"
              />
            ))}
          </motion.g>

          {/* The dark moon */}
          <circle cx="280" cy="248" r="150" fill={INK} />

          {/* Phase light — a quiet veil on the lower limb */}
          <g clipPath="url(#moon-clip)">
            <circle cx="320" cy="288" r="150" fill={PAPER} opacity="0.07" />
          </g>

          {/* Engraved craters */}
          {CRATERS.map((c) => (
            <circle
              key={`${c.cx}-${c.cy}`}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              stroke={MUTED}
              strokeOpacity="0.35"
              strokeWidth="1"
              fill="none"
            />
          ))}

          {/* Grain — distant points of light on the dark surface */}
          {[
            [262, 232], [304, 262], [238, 266], [322, 196], [280, 312], [252, 210],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill={PAPER} opacity="0.2" />
          ))}
        </g>

        {/* Wish-stars — drifting, twinkling */}
        {STARS.map((star, i) => (
          <motion.g
            key={i}
            animate={
              motionEnabled
                ? {
                    x: [0, star.drift, 0],
                    y: [0, -star.drift, 0],
                    opacity: [0.35, 0.9, 0.35],
                  }
                : { x: 0, y: 0, opacity: 0.6 }
            }
            transition={{
              duration: star.dur,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path d={STAR_PATH} transform={`translate(${star.x} ${star.y}) scale(${star.s})`} fill={INK} />
          </motion.g>
        ))}

        {/* Reflection — the moon answering in the water */}
        <motion.g
          animate={motionEnabled ? { opacity: [0.5, 0.7, 0.5] } : { opacity: 0.6 }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="280" cy="592" rx="76" ry="10" fill={INK} opacity="0.08" />
          <ellipse cx="280" cy="584" rx="104" ry="6" stroke={INK} strokeOpacity="0.2" strokeWidth="1" fill="none" />
          <ellipse cx="280" cy="602" rx="64" ry="5" stroke={INK} strokeOpacity="0.16" strokeWidth="1" fill="none" />
          <ellipse cx="280" cy="616" rx="118" ry="4" stroke={INK} strokeOpacity="0.1" strokeWidth="1" fill="none" />
          <line x1="196" y1="594" x2="364" y2="594" stroke={INK} strokeOpacity="0.12" strokeWidth="1" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
