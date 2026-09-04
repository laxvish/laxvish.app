"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MouseEvent, useRef, useState } from "react";

const VELLUM = "#EAEAEA";
const PAPER = "#FAFAFA";

export interface TheMoonProps {
  progress?: MotionValue<number>;
  disableOuterTransform?: boolean;
}

/**
 * The Moon — Metamorphic Scroll-Driven Celestial Surface.
 *
 * 1. Rest State (Scroll 0):
 *    - Serene, breathing, 90% opaque monochrome moon with lunar maria, craters, and Tycho rays.
 *
 * 2. Moving Metamorphosis (Scroll 0.12 -> 0.76 of hold track):
 *    - As the moon moves towards the center, the color palette becomes disorganized & turbulent.
 *    - Color channels (Red/Orange, Green/Cyan, Blue/Violet) scatter, swirl, and refract at differing angular velocities.
 *    - The fluid turbulence displacement creates a dynamic disorganized prismatic vortex.
 *
 * 3. Settled & Continuous Color Circulation (Scroll 100% / progress >= 0.92+):
 *    - The Moon sphere, craters (Tycho, Copernicus, Plato), maria, and 3D spherical lighting stay COMPLETELY FIXED in place.
 *    - ONLY the internal chromatic rainbow fluid wave rotates 360 degrees continuously around the center (16s linear loop).
 *    - The stationary lunar features create the unmistakable perception of colored light swirling inside an unmoving crystal moon.
 *    - All color layers remain strictly hard-clipped to #moon-sphere-clip.
 */
export function TheMoon({ progress, disableOuterTransform = false }: TheMoonProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = !prefersReducedMotion;
  const [isFullySettled, setIsFullySettled] = useState(false);

  // Track global window scroll fallback
  const { scrollY } = useScroll();

  // Normalized scroll value reference
  const fallbackProgress = useTransform(scrollY, [0, 450], [0, 1]);
  const activeProgress = progress ?? fallbackProgress;

  // Inertial spring for standalone scroll fallback, or direct motion value from parent
  const fallbackSpring = useSpring(fallbackProgress, {
    stiffness: 52,
    damping: 22,
    mass: 0.8,
  });
  const smoothProgress = progress ? activeProgress : fallbackSpring;

  // Continuous color circulation trigger: starts after transformation reaches 100%
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.90 && !isFullySettled) {
      setIsFullySettled(true);
    } else if (latest < 0.80 && isFullySettled) {
      setIsFullySettled(false);
    }
  });

  // ——— 1. Metamorphic Cross-Fade (Monochrome -> Chromatic) ———
  const chromaticProgress = useTransform(smoothProgress, [0.12, 0.65], [0, 1]);
  const monoProgress = useTransform(smoothProgress, [0.12, 0.65], [1, 0]);

  // ——— 2. Disorganized Color Palette Swirl on Movement ———
  // Dynamic chaotic angular rotation per color band (Disorganized Chromatic Dispersion)
  const redWaveRotate = useTransform(
    smoothProgress,
    [0, 0.35, 0.70],
    [0, 110, 22]
  );
  const greenWaveRotate = useTransform(
    smoothProgress,
    [0, 0.35, 0.70],
    [0, -95, -18]
  );
  const blueWaveRotate = useTransform(
    smoothProgress,
    [0, 0.35, 0.70],
    [0, 140, 36]
  );

  // Core wave rotation during scroll transit
  const coreWaveRotate = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0, 45, 28]
  );

  // Standalone fallback transforms if not controlled by parent
  const rawShiftX = useTransform(scrollY, [0, 420], [0, -90]);
  const shiftX = useSpring(rawShiftX, { stiffness: 55, damping: 22 });

  const rawShiftY = useTransform(scrollY, [0, 420], [0, 45]);
  const shiftY = useSpring(rawShiftY, { stiffness: 55, damping: 22 });

  const rawScrollScale = useTransform(scrollY, [0, 420], [1, 1.08]);
  const scrollScale = useSpring(rawScrollScale, { stiffness: 60, damping: 24 });

  // Interactive mouse tilt physics
  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const tiltX = useSpring(rawTiltX, { stiffness: 60, damping: 22 });
  const tiltY = useSpring(rawTiltY, { stiffness: 60, damping: 22 });
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [1.4, -1.4]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-1.4, 1.4]);

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

  // Center coordinates
  const MOON_CX = 280;
  const MOON_CY = 240;

  const STARS = [
    { x: 64, y: 72, s: 0.7, dur: 11, delay: 0.4, drift: 2 },
    { x: 496, y: 88, s: 0.65, dur: 13, delay: 1.6, drift: -1.8 },
    { x: 504, y: 376, s: 0.55, dur: 10, delay: 2.4, drift: 1.6 },
  ];

  return (
    <div ref={containerRef} className="relative w-full">
      <motion.div
        role="img"
        aria-label="Metamorphic moon emblem: transitions from serene monochrome to luminous disorganized chromatic rainbow spectrum during movement, then aligns gracefully above the solution interface with internal circulating colored light"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={motionEnabled ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          rotateX,
          rotateY,
          x: motionEnabled && !disableOuterTransform ? shiftX : 0,
          y: motionEnabled && !disableOuterTransform ? shiftY : 0,
          scale: motionEnabled && !disableOuterTransform ? scrollScale : 1,
          transformPerspective: 1200,
        }}
        className="w-full will-change-transform"
      >
        <svg
          viewBox="0 0 560 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full overflow-visible"
        >
          <defs>
            {/* 1A. MONOCHROME AMBIENT AURA (Pure monochrome vellum/paper glow at rest) */}
            <radialGradient id="moon-aura-mono" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={PAPER} stopOpacity="0.55" />
              <stop offset="55%" stopColor={VELLUM} stopOpacity="0.18" />
              <stop offset="100%" stopColor={VELLUM} stopOpacity="0" />
            </radialGradient>

            {/* 1B. CHROMATIC AMBIENT AURA (Very subtle, soft same-color atmospheric radiation outside moon) */}
            <radialGradient id="moon-aura-chromatic" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="65%" stopColor="#00C7BE" stopOpacity="0.16" />
              <stop offset="80%" stopColor="#AF52DE" stopOpacity="0.06" />
              <stop offset="92%" stopColor="#FF9500" stopOpacity="0.02" />
              <stop offset="100%" stopColor={PAPER} stopOpacity="0" />
            </radialGradient>

            {/* 2. DISORGANIZED CHROMATIC WAVE GRADIENTS (Enriched saturation & luminous opacity) */}
            <linearGradient
              id="wave-red-disorganized"
              x1="400"
              y1="400"
              x2="660"
              y2="140"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FF2D55" stopOpacity="1" />
              <stop offset="65%" stopColor="#FF3B30" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#FF9500" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient
              id="wave-orange-disorganized"
              x1="400"
              y1="400"
              x2="660"
              y2="420"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FF9500" stopOpacity="1" />
              <stop offset="65%" stopColor="#FFCC00" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#FF3B30" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient
              id="wave-yellow-disorganized"
              x1="400"
              y1="400"
              x2="500"
              y2="660"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFCC00" stopOpacity="1" />
              <stop offset="65%" stopColor="#34C759" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#FF9500" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient
              id="wave-green-disorganized"
              x1="400"
              y1="400"
              x2="280"
              y2="660"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#34C759" stopOpacity="1" />
              <stop offset="65%" stopColor="#00C7BE" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#FFCC00" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient
              id="wave-cyan-disorganized"
              x1="400"
              y1="400"
              x2="140"
              y2="500"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#00C7BE" stopOpacity="1" />
              <stop offset="65%" stopColor="#007AFF" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#34C759" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient
              id="wave-blue-disorganized"
              x1="400"
              y1="400"
              x2="140"
              y2="280"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#007AFF" stopOpacity="1" />
              <stop offset="65%" stopColor="#5856D6" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#00C7BE" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient
              id="wave-violet-disorganized"
              x1="400"
              y1="400"
              x2="320"
              y2="140"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#AF52DE" stopOpacity="1" />
              <stop offset="65%" stopColor="#FF2D55" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#5856D6" stopOpacity="0.45" />
            </linearGradient>

            {/* 3. FLUID TURBULENCE & PRISMATIC DISPERSION FILTER (Calibrated for crisp luminous saturation) */}
            <filter
              id="fluid-rainbow-wave"
              x="-35%"
              y="-35%"
              width="170%"
              height="170%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.007 0.005"
                numOctaves="4"
                seed="18"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="50"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feGaussianBlur
                in="displaced"
                stdDeviation="20"
                result="fluidSpectrum"
              />
            </filter>

            {/* 4. MONOCHROME BASE & SHADING */}
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

            {/* 5. SPHERICAL CHROMATIC SHADING (Dimensional specular lighting without color washing) */}
            <radialGradient id="spherical-shading" cx="32%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.0" />
              <stop offset="85%" stopColor="#0B0F19" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#030712" stopOpacity="0.45" />
            </radialGradient>

            {/* 6. AUTHORITATIVE MOON SILHOUETTE CLIPPING BOUNDARY */}
            <clipPath id="moon-sphere-clip">
              <circle cx="400" cy="400" r="240" />
            </clipPath>
          </defs>

          {/* ============================================================ */}
          {/* HALO BREATH LAYER — ATMOSPHERIC AURA (OUTSIDE THE MOON)      */}
          {/* ============================================================ */}
          <motion.g
            animate={
              motionEnabled
                ? { opacity: [0.4, 0.75, 0.4], scale: [1, 1.06, 1] }
                : { opacity: 0.5, scale: 1 }
            }
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: `${MOON_CX}px`, originY: `${MOON_CY}px` }}
          >
            {/* Pure Monochrome atmospheric aura at rest */}
            <motion.circle
              cx={MOON_CX}
              cy={MOON_CY}
              r="230"
              fill="url(#moon-aura-mono)"
              style={{ opacity: monoProgress }}
            />
            {/* Very subtle same-color chromatic atmospheric radiation awakening on scroll */}
            <motion.circle
              cx={MOON_CX}
              cy={MOON_CY}
              r="230"
              fill="url(#moon-aura-chromatic)"
              style={{ opacity: chromaticProgress }}
            />
          </motion.g>

          {/* ============================================================ */}
          {/* THE MOON CORE SVG — STRICTLY CLIPPED TO MOON SILHOUETTE      */}
          {/* ============================================================ */}
          <motion.g
            initial={
              motionEnabled ? { opacity: 0, y: 20 } : { opacity: 0.9, y: 0 }
            }
            animate={
              motionEnabled
                ? {
                    opacity: 0.9,
                    y: 0,
                    scale: [1, 1.015, 1],
                  }
                : { opacity: 0.9, y: 0, scale: 1 }
            }
            transition={{
              opacity: { duration: 1.2, delay: 0.2 },
              y: { type: "spring", stiffness: 50, damping: 18, delay: 0.2 },
              scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
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
              {/* AUTHORITATIVE CLIPPED MOON BODY: ZERO RAINBOW PIXELS OUTSIDE */}
              <g clipPath="url(#moon-sphere-clip)">
                
                {/* 1. BASE MONOCHROME SPHERE (Stationary) */}
                <motion.circle
                  cx="400"
                  cy="400"
                  r="240"
                  fill="url(#minimal-moon-base)"
                  style={{ opacity: monoProgress }}
                />

                {/* 2. ROTATING INTERNAL CHROMATIC RAINBOW FLUID FIELD (Only the color light rotates inside!) */}
                <motion.g
                  style={{
                    opacity: chromaticProgress,
                    originX: "400px",
                    originY: "400px",
                  }}
                  animate={
                    motionEnabled && isFullySettled
                      ? { rotate: 360 }
                      : { rotate: 0 }
                  }
                  transition={
                    motionEnabled && isFullySettled
                      ? { duration: 16, ease: "linear", repeat: Infinity }
                      : { duration: 0.6, ease: "easeOut" }
                  }
                >
                  <motion.g
                    style={{
                      originX: "400px",
                      originY: "400px",
                      rotate: coreWaveRotate,
                    }}
                  >
                    <g filter="url(#fluid-rainbow-wave)">
                      {/* RED / ORANGE SECTOR (Swirls with redWaveRotate) */}
                      <motion.g
                        style={{
                          originX: "400px",
                          originY: "400px",
                          rotate: redWaveRotate,
                        }}
                      >
                        <path
                          d="M 400 400 C 480 300, 560 220, 700 100 C 620 60, 500 80, 400 400 Z"
                          fill="url(#wave-red-disorganized)"
                        />
                        <path
                          d="M 400 400 C 530 350, 620 300, 700 350 C 700 460, 600 530, 400 400 Z"
                          fill="url(#wave-orange-disorganized)"
                          opacity="0.95"
                        />
                      </motion.g>

                      {/* GREEN / CYAN SECTOR (Counter-swirls with greenWaveRotate) */}
                      <motion.g
                        style={{
                          originX: "400px",
                          originY: "400px",
                          rotate: greenWaveRotate,
                        }}
                      >
                        <path
                          d="M 400 400 C 490 490, 530 570, 600 700 C 490 700, 400 640, 400 400 Z"
                          fill="url(#wave-yellow-disorganized)"
                          opacity="0.95"
                        />
                        <path
                          d="M 400 400 C 370 520, 330 600, 260 700 C 180 640, 160 550, 400 400 Z"
                          fill="url(#wave-green-disorganized)"
                          opacity="0.95"
                        />
                        <path
                          d="M 400 400 C 290 490, 200 520, 100 550 C 80 440, 120 350, 400 400 Z"
                          fill="url(#wave-cyan-disorganized)"
                          opacity="0.95"
                        />
                      </motion.g>

                      {/* BLUE / VIOLET SECTOR (Swirls with blueWaveRotate) */}
                      <motion.g
                        style={{
                          originX: "400px",
                          originY: "400px",
                          rotate: blueWaveRotate,
                        }}
                      >
                        <path
                          d="M 400 400 C 250 350, 160 300, 100 240 C 140 160, 230 140, 400 400 Z"
                          fill="url(#wave-blue-disorganized)"
                          opacity="0.95"
                        />
                        <path
                          d="M 400 400 C 310 260, 260 180, 240 100 C 350 60, 440 100, 400 400 Z"
                          fill="url(#wave-violet-disorganized)"
                          opacity="0.95"
                        />
                      </motion.g>

                      {/* Overlapping chromatic dispersion ribbons */}
                      <motion.path
                        d="M 400 400 C 510 260, 600 180, 700 200 C 700 290, 620 360, 400 400 Z"
                        fill="url(#wave-red-disorganized)"
                        opacity="0.75"
                        style={{
                          originX: "400px",
                          originY: "400px",
                          rotate: redWaveRotate,
                        }}
                      />
                      <motion.path
                        d="M 400 400 C 330 200, 350 120, 460 80 C 550 100, 600 190, 400 400 Z"
                        fill="url(#wave-violet-disorganized)"
                        opacity="0.75"
                        style={{
                          originX: "400px",
                          originY: "400px",
                          rotate: blueWaveRotate,
                        }}
                      />
                    </g>
                  </motion.g>
                </motion.g>

                {/* 3. SURFACE TOPOGRAPHY & LUNAR MARIA (Stationary on the Moon — Anchored Landforms) */}
                <path
                  d="M 160 400 A 240 240 0 0 0 640 400 A 240 160 0 0 1 160 400"
                  fill="#FFFFFF"
                  opacity="0.18"
                />
                <path
                  d="M 400 160 A 240 240 0 0 0 400 640 A 160 240 0 0 1 400 160"
                  fill="#000000"
                  opacity="0.12"
                />

                {/* Surface Shimmer — Stationary Maria Plains */}
                <g fill="#FFFFFF" opacity="0.16">
                  {/* Mare Imbrium / Procellarum */}
                  <path d="M 220 250 C 180 300, 200 380, 250 400 C 300 420, 330 350, 320 290 C 310 230, 250 210, 220 250 Z" />
                  {/* Mare Serenitatis / Tranquillitatis */}
                  <path d="M 380 230 C 440 210, 500 250, 480 310 C 460 360, 400 360, 370 320 C 340 280, 340 240, 380 230 Z" />
                  {/* Mare Foecunditatis */}
                  <path d="M 440 380 C 500 370, 530 420, 500 470 C 470 500, 420 470, 420 420 C 420 395, 430 385, 440 380 Z" />
                  {/* Mare Crisium */}
                  <ellipse
                    cx="530"
                    cy="270"
                    rx="26"
                    ry="18"
                    transform="rotate(-15 530 270)"
                  />
                </g>

                {/* Lunar Crater Rings & Markings (Stationary Landforms) */}
                <g fill="none" opacity="0.28">
                  {/* Tycho */}
                  <circle
                    cx="370"
                    cy="580"
                    r="20"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  <circle cx="370" cy="580" r="5" fill="#FFFFFF" stroke="none" />

                  {/* Copernicus */}
                  <circle
                    cx="270"
                    cy="370"
                    r="22"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  <circle cx="270" cy="370" r="6" fill="#FFFFFF" stroke="none" />

                  {/* Aristarchus Accent */}
                  <circle
                    cx="210"
                    cy="260"
                    r="12"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    opacity="0.8"
                  />

                  {/* Plato */}
                  <ellipse
                    cx="330"
                    cy="180"
                    rx="16"
                    ry="10"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                  />

                  {/* Secondary Craters */}
                  <circle
                    cx="200"
                    cy="350"
                    r="12"
                    stroke="#1F2937"
                    strokeWidth="1"
                  />
                  <circle
                    cx="510"
                    cy="400"
                    r="15"
                    stroke="#1F2937"
                    strokeWidth="1"
                  />
                  <circle
                    cx="430"
                    cy="530"
                    r="10"
                    stroke="#1F2937"
                    strokeWidth="1"
                  />
                </g>

                {/* Tycho Ray Accent Lines (Stationary) */}
                <g stroke="#FFFFFF" strokeLinecap="round" opacity={0.25}>
                  <line x1="370" y1="580" x2="220" y2="680" strokeWidth="1" />
                  <line x1="370" y1="580" x2="160" y2="520" strokeWidth="1" />
                  <line x1="370" y1="580" x2="260" y2="380" strokeWidth="1" />
                  <line x1="370" y1="580" x2="500" y2="420" strokeWidth="1" />
                </g>

                {/* 4. STATIONARY VOLUMETRIC SHADING & TOP SPECULAR HIGHLIGHTS */}
                {/* Volumetric Spherical Shading (Monochrome mode) */}
                <motion.circle
                  cx="400"
                  cy="400"
                  r="240"
                  fill="url(#minimal-shading)"
                  style={{ opacity: monoProgress }}
                />

                {/* Volumetric Spherical Shading (Chromatic mode - dimensional specular illumination) */}
                <motion.circle
                  cx="400"
                  cy="400"
                  r="240"
                  fill="url(#spherical-shading)"
                  style={{ opacity: chromaticProgress }}
                />

                {/* Top Specular & Crescent Rim Highlights (Stationary Light Source) */}
                <motion.path
                  d="M 220 200 A 200 200 0 0 1 580 180 A 230 230 0 0 0 220 200"
                  fill="#FFFFFF"
                  opacity={0.35}
                  animate={
                    motionEnabled
                      ? { opacity: [0.25, 0.45, 0.25] }
                      : { opacity: 0.35 }
                  }
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <path
                  d="M 400 160 A 240 240 0 0 1 640 400 A 242 242 0 0 0 400 158 Z"
                  fill="#FFFFFF"
                  opacity={0.4}
                />
              </g>
            </svg>
          </motion.g>

          {/* ============================================================ */}
          {/* #8 WISH-STARS TWINKLE — three ethereal wish stars around moon */}
          {/* ============================================================ */}
          {STARS.map((st, i) => (
            <motion.g
              key={i}
              initial={motionEnabled ? { opacity: 0 } : false}
              animate={
                motionEnabled
                  ? {
                      opacity: [0.15, 0.75, 0.15],
                      scale: [st.s * 0.85, st.s * 1.25, st.s * 0.85],
                      y: [0, st.drift, 0],
                    }
                  : { opacity: 0.4, scale: st.s }
              }
              transition={{
                duration: st.dur,
                delay: st.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ originX: `${st.x}px`, originY: `${MOON_CY}px` }}
            >
              <circle cx={st.x} cy={st.y} r="3" fill="#FFFFFF" opacity="0.9" />
              <line
                x1={st.x - 7}
                y1={st.y}
                x2={st.x + 7}
                y2={st.y}
                stroke="#FFFFFF"
                strokeWidth="0.8"
                opacity="0.6"
              />
              <line
                x1={st.x}
                y1={st.y - 7}
                x2={st.x}
                y2={st.y + 7}
                stroke="#FFFFFF"
                strokeWidth="0.8"
                opacity="0.6"
              />
            </motion.g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
