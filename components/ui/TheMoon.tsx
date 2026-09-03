"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MouseEvent, useRef } from "react";

const VELLUM = "#EAEAEA";
const PAPER = "#FAFAFA";

/**
 * The Moon — Metamorphic Scroll-Driven Celestial Surface.
 *
 * At rest in the Hero: Serene, breathing, 90% opaque monochrome moon with
 * shimmering aura, lunar maria, craters, and Tycho rays.
 *
 * On scroll: As the user scrolls down, the moon smoothly glides towards the center
 * of the viewport, while the monochromatic surface gradually metamorphoses into an
 * iridescent center-originating fluid rainbow wave spectrum with organic wave distortion
 * and ambient chromatic halo.
 */
export function TheMoon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = !prefersReducedMotion;

  // Track global window scroll progress for smooth continuous metamorphosis
  const { scrollY } = useScroll();

  // Scroll mapping (0px -> 380px scroll distance)
  // 1. Chromatic color awakening (0 -> 1)
  const rawChromatic = useTransform(scrollY, [0, 360], [0, 1]);
  const chromaticProgress = useSpring(rawChromatic, {
    stiffness: 70,
    damping: 24,
    mass: 0.8,
  });

  // 2. Monochrome layer fade out (1 -> 0)
  const rawMono = useTransform(scrollY, [0, 360], [1, 0]);
  const monoProgress = useSpring(rawMono, {
    stiffness: 70,
    damping: 24,
    mass: 0.8,
  });

  // 3. Desktop horizontal shift towards center
  const rawShiftX = useTransform(scrollY, [0, 420], [0, -90]);
  const shiftX = useSpring(rawShiftX, {
    stiffness: 55,
    damping: 22,
  });

  // 4. Subtle vertical float & scale on scroll
  const rawShiftY = useTransform(scrollY, [0, 420], [0, 45]);
  const shiftY = useSpring(rawShiftY, {
    stiffness: 55,
    damping: 22,
  });

  const rawScrollScale = useTransform(scrollY, [0, 420], [1, 1.07]);
  const scrollScale = useSpring(rawScrollScale, {
    stiffness: 60,
    damping: 24,
  });

  // 5. Chromatic wave gentle rotation with scroll
  const rawWaveRotate = useTransform(scrollY, [0, 600], [0, 24]);
  const waveRotate = useSpring(rawWaveRotate, {
    stiffness: 40,
    damping: 20,
  });

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

  // Center coordinate
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
        aria-label="Metamorphic moon emblem: transitions from serene monochrome to fluid chromatic rainbow spectrum on scroll"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={motionEnabled ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          rotateX,
          rotateY,
          x: motionEnabled ? shiftX : 0,
          y: motionEnabled ? shiftY : 0,
          scale: motionEnabled ? scrollScale : 1,
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
            {/* 1. MONOCHROME AMBIENT AURA */}
            <radialGradient id="moon-aura-mono" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={PAPER} stopOpacity="0.55" />
              <stop offset="55%" stopColor={VELLUM} stopOpacity="0.18" />
              <stop offset="100%" stopColor={VELLUM} stopOpacity="0" />
            </radialGradient>

            {/* 2. CHROMATIC RAINBOW HALO */}
            <radialGradient id="rainbow-halo" cx="50%" cy="50%" r="50%">
              <stop offset="55%" stopColor="#34C759" stopOpacity="0.22" />
              <stop offset="72%" stopColor="#007AFF" stopOpacity="0.16" />
              <stop offset="88%" stopColor="#AF52DE" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* 3. CENTER-ORIGINATING RADIAL RAINBOW WAVE GRADIENTS */}
            <linearGradient
              id="wave-red"
              x1="400"
              y1="400"
              x2="640"
              y2="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FF3B30" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#FF3B30" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF3B30" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient
              id="wave-orange"
              x1="400"
              y1="400"
              x2="640"
              y2="380"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FF9500" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#FF9500" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF9500" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient
              id="wave-yellow"
              x1="400"
              y1="400"
              x2="520"
              y2="620"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFCC00" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#FFCC00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFCC00" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient
              id="wave-green"
              x1="400"
              y1="400"
              x2="320"
              y2="640"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#34C759" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#34C759" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34C759" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient
              id="wave-cyan"
              x1="400"
              y1="400"
              x2="180"
              y2="520"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#00A8FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00A8FF" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient
              id="wave-blue"
              x1="400"
              y1="400"
              x2="160"
              y2="300"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#007AFF" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#007AFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#007AFF" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient
              id="wave-violet"
              x1="400"
              y1="400"
              x2="300"
              y2="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#AF52DE" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#AF52DE" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#AF52DE" stopOpacity="0.2" />
            </linearGradient>

            {/* 4. FLUID RAINBOW WAVE DISTORTION FILTER */}
            <filter
              id="fluid-rainbow-wave"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.006 0.004"
                numOctaves="3"
                seed="12"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="55"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feGaussianBlur
                in="displaced"
                stdDeviation="35"
                result="fluidSpectrum"
              />
            </filter>

            {/* 5. MONOCHROME BASE & SHADING */}
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

            {/* 6. SPHERICAL CHROMATIC SHADING */}
            <radialGradient id="spherical-shading" cx="32%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.0" />
              <stop offset="80%" stopColor="#1F2937" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#111827" stopOpacity="0.6" />
            </radialGradient>

            {/* 7. CLIPPING BOUNDARY */}
            <clipPath id="moon-sphere-clip">
              <circle cx="400" cy="400" r="240" />
            </clipPath>
          </defs>

          {/* ============================================================ */}
          {/* HALO BREATH LAYER — MONOCHROME + CHROMATIC CROSS-FADE        */}
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
            {/* Monochrome atmospheric aura */}
            <motion.circle
              cx={MOON_CX}
              cy={MOON_CY}
              r="170"
              fill="url(#moon-aura-mono)"
              style={{ opacity: monoProgress }}
            />
          </motion.g>

          {/* ============================================================ */}
          {/* THE MOON CORE SVG — INTERNAL METAMORPHOSIS                  */}
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
              {/* LAYER 1: Chromatic Outer Halo (Awakens on scroll) */}
              <motion.circle
                cx="400"
                cy="400"
                r="280"
                fill="url(#rainbow-halo)"
                style={{ opacity: chromaticProgress }}
              />

              {/* LAYER 2A: Monochrome Base Moon Body (Fades out on scroll) */}
              <motion.circle
                cx="400"
                cy="400"
                r="240"
                fill="url(#minimal-moon-base)"
                style={{ opacity: monoProgress }}
              />

              {/* LAYER 2B: Chromatic Fluid Center-Originating Rainbow Field Base */}
              <motion.g
                clipPath="url(#moon-sphere-clip)"
                style={{
                  opacity: chromaticProgress,
                  originX: "400px",
                  originY: "400px",
                  rotate: motionEnabled ? waveRotate : 0,
                }}
              >
                <g filter="url(#fluid-rainbow-wave)">
                  {/* Radial wave shapes originating from (400,400) outward */}
                  <path
                    d="M 400 400 C 480 320, 540 240, 680 120 C 600 80, 500 100, 400 400 Z"
                    fill="url(#wave-red)"
                  />
                  <path
                    d="M 400 400 C 520 360, 600 320, 680 360 C 680 460, 580 520, 400 400 Z"
                    fill="url(#wave-orange)"
                    opacity="0.9"
                  />
                  <path
                    d="M 400 400 C 480 480, 520 560, 580 680 C 480 680, 400 620, 400 400 Z"
                    fill="url(#wave-yellow)"
                    opacity="0.9"
                  />
                  <path
                    d="M 400 400 C 380 500, 340 580, 280 680 C 200 620, 180 540, 400 400 Z"
                    fill="url(#wave-green)"
                    opacity="0.9"
                  />
                  <path
                    d="M 400 400 C 300 480, 220 500, 120 540 C 100 440, 140 360, 400 400 Z"
                    fill="url(#wave-cyan)"
                    opacity="0.9"
                  />
                  <path
                    d="M 400 400 C 260 360, 180 320, 120 260 C 160 180, 240 160, 400 400 Z"
                    fill="url(#wave-blue)"
                    opacity="0.9"
                  />
                  <path
                    d="M 400 400 C 320 280, 280 200, 260 120 C 360 80, 440 120, 400 400 Z"
                    fill="url(#wave-violet)"
                    opacity="0.9"
                  />

                  {/* Overlapping secondary paths for smooth color blending */}
                  <path
                    d="M 400 400 C 500 280, 580 200, 680 220 C 680 300, 600 360, 400 400 Z"
                    fill="url(#wave-red)"
                    opacity="0.5"
                  />
                  <path
                    d="M 400 400 C 340 220, 360 140, 460 100 C 540 120, 580 200, 400 400 Z"
                    fill="url(#wave-violet)"
                    opacity="0.5"
                  />
                </g>
              </motion.g>

              {/* ======================================================= */}
              {/* SURFACE DETAILS & LUNAR MARIA (CLIPPED TO SPHERE)       */}
              {/* ======================================================= */}
              <g clipPath="url(#moon-sphere-clip)">
                {/* Longitudinal & Latitudinal Texture Lines */}
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

                {/* Surface Shimmer — Maria */}
                <motion.g
                  animate={
                    motionEnabled ? { opacity: [0.85, 1, 0.85] } : { opacity: 1 }
                  }
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
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

                  {/* Lunar Crater Rings & Markings */}
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
                </motion.g>

                {/* Tycho Ray Accent Lines */}
                <motion.g
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  opacity={0.25}
                  animate={
                    motionEnabled ? { opacity: [0.18, 0.35, 0.18] } : { opacity: 0.25 }
                  }
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <line x1="370" y1="580" x2="220" y2="680" strokeWidth="1" />
                  <line x1="370" y1="580" x2="160" y2="520" strokeWidth="1" />
                  <line x1="370" y1="580" x2="260" y2="380" strokeWidth="1" />
                  <line x1="370" y1="580" x2="500" y2="420" strokeWidth="1" />
                </motion.g>

                {/* Volumetric Spherical Shading (Monochrome mode) */}
                <motion.circle
                  cx="400"
                  cy="400"
                  r="240"
                  fill="url(#minimal-shading)"
                  style={{ opacity: monoProgress }}
                />

                {/* Volumetric Spherical Shading (Chromatic mode) */}
                <motion.circle
                  cx="400"
                  cy="400"
                  r="240"
                  fill="url(#spherical-shading)"
                  style={{ opacity: chromaticProgress }}
                />
              </g>

              {/* LAYER 8: Top Specular & Crescent Rim Highlights */}
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
              style={{ originX: `${st.x}px`, originY: `${st.y}px` }}
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
