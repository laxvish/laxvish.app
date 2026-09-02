"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function GlobalBackground() {
  const [mounted, setMounted] = useState(false);

  // Scroll tracking for the trans-page kinetic thread spine
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 90,
    mass: 0.8,
  });

  // Calculate soliton pulse Y position along the vertical spine (0 to 100vh)
  const solitonY = useTransform(smoothProgress, [0, 1], ["2vh", "96vh"]);
  const pulseOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.3, 1, 1, 0.4]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
    >
      {/* ========================================================= */}
      {/* LAYER 1: TACTILE ARCHITECTURAL GRID & REGISTRATION MARKS  */}
      {/* ========================================================= */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 140px x 140px Technical Blueprint Grid Pattern */}
          <pattern
            id="globalBlueprintGrid"
            width="140"
            height="140"
            patternUnits="userSpaceOnUse"
          >
            {/* Hairline Grid Rules */}
            <path
              d="M 140 0 L 0 0 0 140"
              fill="none"
              stroke="#1A1820"
              strokeWidth="0.5"
              strokeOpacity="0.04"
            />
            {/* Micro-dot at sub-grid 70, 70 */}
            <circle cx="70" cy="70" r="0.75" fill="#B4D3D9" fillOpacity="0.25" />
            {/* Precision Crosshair (+) at grid intersections */}
            <path
              d="M -3 0 L 3 0 M 0 -3 L 0 3"
              stroke="#1A1820"
              strokeWidth="0.75"
              strokeOpacity="0.12"
            />
          </pattern>

          {/* Micro-Halftone Paper Texture Matrix */}
          <pattern
            id="paperHalftone"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="14" cy="14" r="0.65" fill="#1A1820" fillOpacity="0.035" />
          </pattern>
        </defs>

        {/* Base Grid Substrates */}
        <rect width="100%" height="100%" fill="url(#paperHalftone)" />
        <rect width="100%" height="100%" fill="url(#globalBlueprintGrid)" />
      </svg>

      {/* ========================================================= */}
      {/* LAYER 2: 1440PX EDITORIAL COLUMN GUIDES & MERIDIAN SEAMS   */}
      {/* ========================================================= */}
      <div className="absolute inset-x-0 mx-auto flex h-full w-full max-w-[1440px] justify-between px-4 sm:px-8 lg:px-16">
        {/* Left Column Boundary */}
        <div className="h-full w-px border-l border-deepink/[0.04]" />
        {/* Center Sub-Column Boundary (Desktop only) */}
        <div className="hidden h-full w-px border-l border-deepink/[0.025] lg:block" />
        {/* Right Column Boundary */}
        <div className="h-full w-px border-r border-deepink/[0.04]" />
      </div>

      {/* ========================================================= */}
      {/* LAYER 3: TRANS-PAGE KINETIC THREAD SPINE (THE PROTAGONIST)*/}
      {/* ========================================================= */}
      <div className="absolute top-0 bottom-0 left-3 sm:left-6 lg:left-10 xl:left-[max(1.5rem,calc(50vw-708px))] flex flex-col items-center justify-between py-8">
        {/* Continuous Hairline Spine Path */}
        <div className="relative h-full w-px bg-gradient-to-b from-transparent via-mark/20 to-transparent">
          {/* Static Milestone Anchors */}
          <div className="absolute top-[20%] -left-1 flex items-center gap-1.5 font-mono text-[7px] font-medium tracking-widest text-deepink/30 uppercase">
            <span className="h-2 w-2 rotate-45 border border-mark/40 bg-cream" />
            <span className="hidden xl:inline">NODE // 01</span>
          </div>

          <div className="absolute top-[50%] -left-1 flex items-center gap-1.5 font-mono text-[7px] font-medium tracking-widest text-deepink/30 uppercase">
            <span className="h-2 w-2 rotate-45 border border-mark/40 bg-cream" />
            <span className="hidden xl:inline">CORE // 142.8 HZ</span>
          </div>

          <div className="absolute top-[80%] -left-1 flex items-center gap-1.5 font-mono text-[7px] font-medium tracking-widest text-deepink/30 uppercase">
            <span className="h-2 w-2 rotate-45 border border-mark/40 bg-cream" />
            <span className="hidden xl:inline">DPDP // PASS</span>
          </div>

          {/* Traveling Soliton Data Pulse (Scroll-Driven) */}
          {mounted && (
            <motion.div
              style={{
                top: solitonY,
                opacity: pulseOpacity,
              }}
              className="absolute -left-[3px] -translate-y-1/2"
            >
              {/* Pulse Core Dot */}
              <div className="relative flex h-2 w-2 items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-mark shadow-sm" />
                <span className="absolute h-3 w-3 rounded-full border border-mark/60" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 4: VIEWPORT CORNER TELEMETRY & INDIAN LATITUDES     */}
      {/* ========================================================= */}
      <div className="font-mono text-[7px] sm:text-[8px] tracking-widest uppercase text-deepink/30">
        {/* Top-Right Geographic Reference */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex flex-col items-end gap-0.5">
          <span className="font-semibold text-deepink/40">GRID // NIXI-IND</span>
          <span className="text-[6.5px] sm:text-[7px]">20.59°N · 78.96°E</span>
        </div>

        {/* Bottom-Right System Operational Indicator */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 flex items-center gap-1.5">
          <span className="h-1 w-1 bg-mark/60" />
          <span className="text-[6.5px] sm:text-[7.5px] text-deepink/40">
            LAXVISH THREAD // SYNCHRONIZED
          </span>
        </div>

        {/* Subtle Right-Margin Latitude Watermarks (Desktop XL) */}
        <div className="hidden 2xl:flex absolute right-6 top-1/3 -rotate-90 origin-right flex-col gap-1 text-[7px] text-deepink/25">
          <span>LAT 28.61°N [DEL] · LAT 19.07°N [BOM]</span>
          <span>LAT 17.38°N [HYD] · LAT 12.97°N [BLR]</span>
        </div>
      </div>
    </div>
  );
}
