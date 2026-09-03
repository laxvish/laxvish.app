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
 * Rising Wish — a paper lantern rises from the lake toward a small moon.
 *
 * The opposite of a chart: a single subject, a single motion. One
 * delicate lantern drawn as fine linework lifts on a weighted spring
 * from the still water toward a small answering moon. A faint
 * constellation gathers above. Everything else holds perfectly still.
 *
 * Cultural reference: the Indian sky-lantern tradition (Uttarayan) —
 * wishes sent up. Here the wish is the work handed to Laxvish; the
 * answering moon is the system, always in view, never approached.
 *
 * ~70% of the plate holds still. The single kinetic element is the
 * lantern's slow rise and gentle bob. Everything freezes under reduced
 * motion. Layered SVG groups so each element can be retuned.
 */
export function RisingWish() {
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = !prefersReducedMotion;

  // Gentle cursor tilt on the whole plate
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

  // Wish-stars — a few faint cross-glyphs, mostly in the upper sky.
  const STARS = [
    { x: 110, y: 96, s: 0.7, dur: 11, delay: 0.4, drift: 2 },
    { x: 230, y: 198, s: 0.55, dur: 13, delay: 1.6, drift: -1.6 },
    { x: 476, y: 68, s: 0.7, dur: 10, delay: 2.4, drift: 1.8 },
    { x: 92, y: 228, s: 0.5, dur: 12, delay: 3.2, drift: -1.4 },
    { x: 184, y: 60, s: 0.55, dur: 14, delay: 1.0, drift: 1.6 },
  ];

  // Constellation gathering above the moon — three faint points.
  const CONSTELLATION = [
    { x: 340, y: 108 },
    { x: 300, y: 88 },
    { x: 318, y: 148 },
  ];

  return (
    <motion.div
      role="img"
      aria-label="Engraved illustration: a single paper lantern rises from a still lake toward a small answering moon, a faint constellation of wishes gathering above — emblem of Laxvish"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={motionEnabled ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <svg
        viewBox="0 0 560 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
      >
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

        {/* Faint constellation — three points connected by whisper lines */}
        <g>
          {CONSTELLATION.map((p, i) =>
            CONSTELLATION.slice(i + 1).map((q, j) => (
              <line
                key={`${i}-${j}`}
                x1={p.x}
                y1={p.y}
                x2={q.x}
                y2={q.y}
                stroke={INK}
                strokeOpacity="0.18"
                strokeWidth="0.7"
              />
            )),
          )}
          {CONSTELLATION.map((p, i) => (
            <circle
              key={`c-${i}`}
              cx={p.x}
              cy={p.y}
              r="1.4"
              fill={INK}
              opacity="0.5"
            />
          ))}
        </g>

        {/* The small answering moon — upper right, holds perfectly still */}
        <g>
          {/* hairline halo rings */}
          <circle
            cx="380"
            cy="138"
            r="52"
            stroke={INK}
            strokeOpacity="0.12"
            strokeWidth="0.7"
            strokeDasharray="1 5"
          />
          <circle
            cx="380"
            cy="138"
            r="44"
            stroke={INK}
            strokeOpacity="0.22"
            strokeWidth="0.8"
          />
          {/* the moon itself */}
          <circle
            cx="380"
            cy="138"
            r="34"
            fill={VELLUM}
            stroke={INK}
            strokeOpacity="0.55"
            strokeWidth="1"
          />
          {/* soft phase shadow */}
          <circle cx="388" cy="144" r="34" fill={INK} opacity="0.08" clipPath="url(#moon-clip)" />
          {/* a single tiny crater */}
          <circle
            cx="370"
            cy="128"
            r="2.5"
            stroke={INK}
            strokeOpacity="0.4"
            strokeWidth="0.7"
            fill="none"
          />
        </g>

        {/* Wish-stars — tiny cross-glyphs */}
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

        {/* The lantern — the single kinetic subject. Rises from the lake
            on a weighted spring, then holds and gently bobs. */}
        <motion.g
          initial={motionEnabled ? { y: 220, opacity: 0 } : { y: 0, opacity: 1 }}
          animate={
            motionEnabled
              ? {
                  y: [0, -3, 0],
                  opacity: 1,
                }
              : { y: 0, opacity: 1 }
          }
          transition={{
            y: {
              type: "spring",
              stiffness: 22,
              damping: 14,
              mass: 1.2,
              delay: 0.4,
            },
            opacity: { duration: 0.8, delay: 0.2 },
          }}
        >
          <g transform="translate(280 0)">
            {/* hanging cord */}
            <line
              x1="0"
              y1="280"
              x2="0"
              y2="262"
              stroke={INK}
              strokeOpacity="0.45"
              strokeWidth="0.8"
            />
            {/* top frame cap */}
            <line
              x1="-20"
              y1="262"
              x2="20"
              y2="262"
              stroke={INK}
              strokeOpacity="0.6"
              strokeWidth="0.9"
            />
            {/* lantern body */}
            <path
              d="M-18 262 Q-22 262 -22 256 L-22 222 Q-22 212 -14 212 L14 212 Q22 212 22 222 L22 256 Q22 262 18 262 Z"
              fill={VELLUM}
              stroke={INK}
              strokeOpacity="0.6"
              strokeWidth="1"
            />
            {/* inner fold lines */}
            <line
              x1="-9"
              y1="214"
              x2="-9"
              y2="260"
              stroke={INK}
              strokeOpacity="0.22"
              strokeWidth="0.7"
            />
            <line
              x1="0"
              y1="213"
              x2="0"
              y2="261"
              stroke={INK}
              strokeOpacity="0.22"
              strokeWidth="0.7"
            />
            <line
              x1="9"
              y1="214"
              x2="9"
              y2="260"
              stroke={INK}
              strokeOpacity="0.22"
              strokeWidth="0.7"
            />
            {/* bottom frame cap */}
            <line
              x1="-20"
              y1="262"
              x2="20"
              y2="262"
              stroke={INK}
              strokeOpacity="0.6"
              strokeWidth="0.9"
            />
            {/* tassel */}
            <line
              x1="0"
              y1="262"
              x2="0"
              y2="272"
              stroke={INK}
              strokeOpacity="0.5"
              strokeWidth="0.8"
            />
            <line
              x1="-2"
              y1="272"
              x2="0"
              y2="278"
              stroke={INK}
              strokeOpacity="0.4"
              strokeWidth="0.7"
            />
            <line
              x1="2"
              y1="272"
              x2="0"
              y2="278"
              stroke={INK}
              strokeOpacity="0.4"
              strokeWidth="0.7"
            />
            {/* flame — a single charcoal point */}
            <circle cx="0" cy="252" r="1.4" fill={INK} opacity="0.85" />
          </g>
        </motion.g>

        {/* Reflection of the lantern in the lake — faint, wavering */}
        <motion.g
          animate={motionEnabled ? { opacity: [0.25, 0.45, 0.25] } : { opacity: 0.35 }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <line
            x1="248"
            y1="510"
            x2="312"
            y2="510"
            stroke={INK}
            strokeOpacity="0.15"
            strokeWidth="0.7"
          />
          <ellipse
            cx="280"
            cy="520"
            rx="18"
            ry="3"
            fill={VELLUM}
            opacity="0.25"
          />
          <line
            x1="256"
            y1="530"
            x2="304"
            y2="530"
            stroke={INK}
            strokeOpacity="0.1"
            strokeWidth="0.7"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
