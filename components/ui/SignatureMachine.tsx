"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { useRef } from "react";

/**
 * SignatureMachine — the Laxvish machine cross-section.
 *
 * A crafted, monochrome engineering drawing of a layered machine: stacked
 * angular plates on fasteners, a rotating flywheel hub, a ruled gauge arc and
 * a signal trace. Drawn entirely in hairline `#111111` / `#666666` strokes on
 * the `#EAEAEA` panel — no gradients, no blobs, no glass.
 *
 * Motion is weighted and singular: the flywheel turns, the gauge needle
 * sweeps with scroll, everything else holds still (the "silence" that gives
 * the movement meaning). `prefers-reduced-motion` freezes every frame.
 *
 * Per AGENTS.md §3/§4: purposeful motion only; monochrome discipline.
 */

const INK = "#111111";
const MUTED = "#666666";

export function SignatureMachine({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = !prefersReducedMotion;

  // Scroll-linked gauge sweep: the needle reads progress through the hero.
  const { scrollY } = useScroll();
  const rawNeedle = useTransform(scrollY, [0, 600], [-38, 38]);
  const needle = useSpring(rawNeedle, { stiffness: 180, damping: 25 });

  // Cursor parallax on the whole assembly — heavy, damped, mechanical.
  const rawTiltX = useMotionValue(0);
  const tiltX = useSpring(rawTiltX, { stiffness: 180, damping: 25 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!motionEnabled || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(yPct * -3.5);
  };
  const handleLeave = () => tiltX.set(0);

  // Flywheel rotation — one full revolution per 26s, linear, perpetual but
  // slow enough to read as a running machine rather than decoration.
  const flywheelRotate = motionEnabled
    ? { rotate: 360 }
    : { rotate: 0 };
  const flywheelTransition = motionEnabled
    ? { duration: 26, repeat: Infinity, ease: "linear" as const }
    : { duration: 0 };

  // Draw-on: hairlines draw themselves once on mount.
  const drawTransition = motionEnabled
    ? { duration: 1.6, ease: [0.4, 0, 0.2, 1] as const, delay: 0.2 }
    : { duration: 0 };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative select-none ${className}`}
      role="img"
      aria-label="Cutaway engineering drawing of a Laxvish machine: stacked plates on fasteners, a running flywheel and a calibration gauge."
    >
      <motion.div style={{ rotateX: tiltX, transformStyle: "preserve-3d", transformPerspective: 1200 }}>
        <svg
          viewBox="0 0 560 560"
          fill="none"
          className="h-auto w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ——— Ruled backdrop grid (static, the "silence") ——— */}
          <g stroke={MUTED} strokeOpacity={0.18} strokeWidth={0.5}>
            {[80, 160, 240, 320, 400, 480].map((x) => (
              <line key={`v${x}`} x1={x} y1={24} x2={x} y2={536} />
            ))}
            {[80, 160, 240, 320, 400, 480].map((y) => (
              <line key={`h${y}`} x1={24} y1={y} x2={536} y2={y} />
            ))}
          </g>

          {/* ——— Outer chassis frame + corner registration ticks ——— */}
          <rect x={24} y={24} width={512} height={512} stroke={INK} strokeOpacity={0.35} strokeWidth={1} />
          <g stroke={INK} strokeWidth={1.25}>
            {/* corner ticks */}
            <path d="M24 44V24H44" />
            <path d="M516 24H536V44" />
            <path d="M536 516V536H516" />
            <path d="M44 536H24V516" />
          </g>

          {/* ——— Layered machine plates (the cross-section) ——— */}
          {/* plate 3 — rear, largest (dashed construction line: static, part of the silence) */}
          <path
            d="M120 148 L372 118 L452 176 L448 428 L356 486 L124 452 L96 300 Z"
            stroke={MUTED}
            strokeWidth={0.75}
            strokeDasharray="3 4"
          />
          {/* plate 2 — mid */}
          <motion.path
            d="M152 180 L360 156 L424 208 L420 412 L344 456 L156 428 L136 300 Z"
            fill="#EAEAEA"
            stroke={INK}
            strokeWidth={1}
            initial={motionEnabled ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ ...drawTransition, delay: 0.35 }}
          />
          {/* plate 1 — front */}
          <motion.path
            d="M188 214 L352 196 L396 240 L392 388 L330 424 L192 400 L176 304 Z"
            fill="#FAFAFA"
            stroke={INK}
            strokeWidth={1.25}
            initial={motionEnabled ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ ...drawTransition, delay: 0.5 }}
          />

          {/* ——— Fasteners pinning the plate stack ——— */}
          <g stroke={INK} strokeWidth={1}>
            {[
              [204, 226],
              [382, 208],
              [404, 372],
              [318, 436],
              [190, 388],
            ].map(([cx, cy]) => (
              <g key={`f${cx}-${cy}`}>
                <circle cx={cx} cy={cy} r={7} fill="#EAEAEA" />
                <circle cx={cx} cy={cy} r={2.5} fill={INK} stroke="none" />
                <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} strokeOpacity={0.5} strokeWidth={0.5} />
              </g>
            ))}
          </g>

          {/* ——— Flywheel hub (the one kinetic element) ——— */}
          <g>
            <circle cx={282} cy={310} r={64} fill="#FAFAFA" stroke={INK} strokeWidth={1.25} />
            <motion.g
              style={{ originX: "282px", originY: "310px" }}
              animate={flywheelRotate}
              transition={flywheelTransition}
            >
              {/* spokes */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line
                  key={`s${deg}`}
                  x1={282}
                  y1={310}
                  x2={282 + 62 * Math.cos((deg * Math.PI) / 180)}
                  y2={310 + 62 * Math.sin((deg * Math.PI) / 180)}
                  stroke={MUTED}
                  strokeWidth={0.75}
                  strokeOpacity={0.7}
                />
              ))}
              {/* rim + balance mark */}
              <circle cx={282} cy={310} r={58} stroke={MUTED} strokeWidth={0.75} />
              <rect x={330} y={306} width={12} height={8} fill={INK} stroke="none" />
            </motion.g>
            <circle cx={282} cy={310} r={12} fill="#EAEAEA" stroke={INK} strokeWidth={1.25} />
            <circle cx={282} cy={310} r={3} fill={INK} stroke="none" />
          </g>

          {/* ——— Calibration gauge (scroll-linked needle) ——— */}
          <g>
            {/* arc */}
            <path d="M120 118 A 176 176 0 0 1 420 108" stroke={MUTED} strokeWidth={1} fill="none" />
            {/* tick marks along the arc, ruled */}
            {Array.from({ length: 13 }).map((_, i) => {
              const angle = Math.PI * (1.28 - (i * 0.9) / 12);
              const r1 = 168;
              const r2 = i % 3 === 0 ? 152 : 160;
              const cx0 = 272;
              const cy0 = 268;
              return (
                <line
                  key={`t${i}`}
                  x1={cx0 + r1 * Math.cos(angle)}
                  y1={cy0 - r1 * Math.sin(angle)}
                  x2={cx0 + r2 * Math.cos(angle)}
                  y2={cy0 - r2 * Math.sin(angle)}
                  stroke={INK}
                  strokeOpacity={i % 3 === 0 ? 0.8 : 0.4}
                  strokeWidth={i % 3 === 0 ? 1.25 : 0.75}
                />
              );
            })}
            {/* needle — reads scroll progress */}
            <motion.g style={{ originX: "272px", originY: "268px", rotate: needle }}>
              <line x1={272} y1={268} x2={272} y2={130} stroke={INK} strokeWidth={1.5} />
              <circle cx={272} cy={268} r={4} fill={INK} stroke="none" />
            </motion.g>
          </g>

          {/* ——— Signal trace: work in, commitment out (static) ——— */}
          <g stroke={MUTED} strokeWidth={0.75}>
            <motion.path
              d="M60 500 H200 L226 474 H470"
              initial={motionEnabled ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ ...drawTransition, delay: 0.8 }}
            />
            <circle cx={470} cy={474} r={3.5} fill={INK} stroke="none" />
            <path d="M60 500 V474 H120" strokeOpacity={0.5} />
          </g>

          {/* ——— Micro-engraved metadata (the tactile close-up detail) ——— */}
          <g fill={MUTED} fontSize={9} letterSpacing={2} style={{ fontFamily: "var(--font-inter)" }}>
            <text x={44} y={548}>FIG. 01</text>
            <text x={430} y={548}>LAXVISH — MACHINE SECTION</text>
          </g>
          <text x={44} y={40} fill={MUTED} fontSize={9} letterSpacing={2} style={{ fontFamily: "var(--font-inter)" }}>
            SCALE 1:1
          </text>
        </svg>
      </motion.div>
    </div>
  );
}
