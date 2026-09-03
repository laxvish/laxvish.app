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
 * The Answering Moon — refined.
 *
 * A delicate engraved celestial chart, not a silhouette:
 *  - a pale vellum disc (palette-true, #EAEAEA) with a hairline outline
 *  - fine latitude arcs, a single meridian, a soft phase shadow
 *  - thin craters drawn as small open circles, never filled blobs
 *  - the halo becomes a hairline ring + a faint dashed ring + twelve
 *    short tick marks (a chart's degree marks, not sunburst rays)
 *  - wish-stars are tiny cross-glyphs, stroked, low-opacity
 *  - the lake reflects the moon as a single wavering hairline
 *
 * ~70% of the plate holds still. The single kinetic element is the slow
 * precession of the chart's outer rings. Everything freezes under reduced
 * motion. Built as layered SVG groups so each element can be retuned in
 * isolation.
 */
export function AnsweringMoon() {
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

  // Hand-placed craters — small, few, drawn as open circles.
  const CRATERS = [
    { cx: 244, cy: 208, r: 9 },
    { cx: 302, cy: 224, r: 13 },
    { cx: 258, cy: 274, r: 7 },
    { cx: 314, cy: 286, r: 5 },
    { cx: 232, cy: 248, r: 4 },
    { cx: 288, cy: 196, r: 6 },
    { cx: 332, cy: 252, r: 4 },
  ];

  // Twelve degree marks on the chart's outer rim.
  const TICKS = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return {
      x1: 280 + Math.cos(a) * 162,
      y1: 250 + Math.sin(a) * 162,
      x2: 280 + Math.cos(a) * 172,
      y2: 250 + Math.sin(a) * 172,
    };
  });

  // Six wish-stars — tiny cross-glyphs, deliberately sparse.
  const STARS = [
    { x: 116, y: 132, s: 0.9, dur: 9.5, delay: 0.2, drift: 3 },
    { x: 446, y: 102, s: 0.75, dur: 11, delay: 1.6, drift: -2.5 },
    { x: 484, y: 306, s: 0.8, dur: 12.5, delay: 2.8, drift: 2.5 },
    { x: 82, y: 320, s: 0.7, dur: 10.5, delay: 3.7, drift: -3 },
    { x: 168, y: 60, s: 0.65, dur: 13, delay: 1.1, drift: 2 },
    { x: 402, y: 46, s: 0.7, dur: 9, delay: 2.2, drift: -2 },
  ];

  const MOON_ORIGIN = "280px 250px";

  return (
    <motion.div
      role="img"
      aria-label="Engraved celestial chart: a pale moon with a slowly turning hairline halo drifts above a still lake, marked by a faint constellation of wish-stars — the Answering Moon, emblem of Laxvish"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={motionEnabled ? { opacity: 0, y: 56 } : false}
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
          <clipPath id="moon-chart">
            <circle cx="280" cy="250" r="128" />
          </clipPath>
        </defs>

        {/* The still lake — a single hairline horizon */}
        <line
          x1="48"
          y1="572"
          x2="512"
          y2="572"
          stroke={INK}
          strokeOpacity="0.18"
          strokeWidth="0.8"
        />

        {/* Halo — the chart's three rings and twelve degree marks,
            precessing together like a slow astrolabe */}
        <motion.g
          animate={motionEnabled ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{ originX: MOON_ORIGIN, originY: MOON_ORIGIN }}
        >
          <circle
            cx="280"
            cy="250"
            r="144"
            stroke={INK}
            strokeOpacity="0.28"
            strokeWidth="0.8"
          />
          <circle
            cx="280"
            cy="250"
            r="158"
            stroke={INK}
            strokeOpacity="0.2"
            strokeWidth="0.8"
            strokeDasharray="1.5 5"
          />
          <circle
            cx="280"
            cy="250"
            r="176"
            stroke={INK}
            strokeOpacity="0.12"
            strokeWidth="0.6"
          />
          {TICKS.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={INK}
              strokeOpacity="0.4"
              strokeWidth="0.8"
            />
          ))}
        </motion.g>

        {/* The moon — a vellum disc with a hairline outline */}
        <circle
          cx="280"
          cy="250"
          r="128"
          fill={VELLUM}
          stroke={INK}
          strokeOpacity="0.55"
          strokeWidth="1.1"
        />

        {/* Internal chart detail — clipped to the disc */}
        <g clipPath="url(#moon-chart)">
          {/* Soft phase shadow on the lower-right limb */}
          <circle cx="320" cy="280" r="128" fill={INK} opacity="0.09" />
          {/* Faint mare patches */}
          <ellipse cx="248" cy="232" rx="26" ry="14" fill={INK} opacity="0.05" />
          <ellipse cx="304" cy="276" rx="22" ry="11" fill={INK} opacity="0.05" />
          {/* Latitude arcs — two thin horizontal lines */}
          <path
            d="M152 232 Q280 244 408 232"
            stroke={INK}
            strokeOpacity="0.18"
            strokeWidth="0.7"
            fill="none"
          />
          <path
            d="M152 268 Q280 256 408 268"
            stroke={INK}
            strokeOpacity="0.18"
            strokeWidth="0.7"
            fill="none"
          />
          {/* Single meridian — a thin vertical ellipse */}
          <ellipse
            cx="280"
            cy="250"
            rx="14"
            ry="128"
            stroke={INK}
            strokeOpacity="0.2"
            strokeWidth="0.7"
            fill="none"
          />
          {/* Craters — open, fine */}
          {CRATERS.map((c) => (
            <circle
              key={`${c.cx}-${c.cy}`}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              stroke={INK}
              strokeOpacity="0.42"
              strokeWidth="0.8"
              fill="none"
            />
          ))}
        </g>

        {/* Wish-stars — tiny cross-glyphs, gently drifting */}
        {STARS.map((star, i) => (
          <motion.g
            key={i}
            animate={
              motionEnabled
                ? {
                    x: [0, star.drift, 0],
                    y: [0, -star.drift * 0.8, 0],
                    opacity: [0.35, 0.7, 0.35],
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
              d="M0 -4 L0 4 M-4 0 L4 0"
              transform={`translate(${star.x} ${star.y}) scale(${star.s})`}
              stroke={INK}
              strokeOpacity="0.55"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          </motion.g>
        ))}

        {/* Reflection — the moon answering in the water, faint */}
        <motion.g
          animate={motionEnabled ? { opacity: [0.45, 0.6, 0.45] } : { opacity: 0.5 }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        >
          <line
            x1="208"
            y1="592"
            x2="352"
            y2="592"
            stroke={INK}
            strokeOpacity="0.14"
            strokeWidth="0.7"
          />
          <line
            x1="232"
            y1="604"
            x2="328"
            y2="604"
            stroke={INK}
            strokeOpacity="0.1"
            strokeWidth="0.7"
          />
          <line
            x1="184"
            y1="616"
            x2="376"
            y2="616"
            stroke={INK}
            strokeOpacity="0.07"
            strokeWidth="0.7"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
