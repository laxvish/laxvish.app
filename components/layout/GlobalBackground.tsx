"use client";

import { useMemo, useEffect, useState } from "react";
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

  // Calculate soliton pulse Y position along the vertical spine (2vh to 96vh)
  const solitonY = useTransform(smoothProgress, [0, 1], ["3vh", "95vh"]);
  const pulseOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.3, 1, 1, 0.4]);

  // Generate top edge ruler ticks (0 to 1440px every 20px)
  const topRulerTicks = useMemo(() => {
    const ticks = [];
    for (let x = 0; x <= 1440; x += 20) {
      const isMajor = x % 100 === 0;
      ticks.push({
        x,
        isMajor,
        height: isMajor ? 6 : 3,
      });
    }
    return ticks;
  }, []);

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
        className="absolute inset-0 h-full w-full opacity-70"
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
            {/* Micro-dot at center of cell (70, 70) */}
            <circle cx="70" cy="70" r="0.75" fill="#B4D3D9" fillOpacity="0.3" />
            {/* Precision Crosshair (+) at grid intersections */}
            <path
              d="M -3.5 0 L 3.5 0 M 0 -3.5 L 0 3.5"
              stroke="#1A1820"
              strokeWidth="0.75"
              strokeOpacity="0.14"
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
      {/* LAYER 2: 1440PX EDITORIAL COLUMN GUIDES & TOP RULER TICK  */}
      {/* ========================================================= */}
      <div className="absolute inset-x-0 mx-auto flex h-full w-full max-w-[1440px] justify-between px-4 sm:px-8 lg:px-16">
        {/* Left Column Boundary */}
        <div className="h-full w-px border-l border-deepink/[0.04]" />
        {/* Center Sub-Column Boundary (Desktop only) */}
        <div className="hidden h-full w-px border-l border-deepink/[0.025] lg:block" />
        {/* Right Column Boundary */}
        <div className="h-full w-px border-r border-deepink/[0.04]" />
      </div>

      {/* Top Precision Metric Drafting Ruler (Desktop) */}
      <div className="hidden lg:flex absolute top-0 inset-x-0 mx-auto h-4 w-full max-w-[1440px] items-start justify-between px-16">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 1440 10">
          {topRulerTicks.map((tick) => (
            <g key={tick.x} transform={`translate(${tick.x}, 0)`}>
              <line
                x1="0"
                y1="0"
                x2="0"
                y2={tick.height}
                stroke="#1A1820"
                strokeWidth={tick.isMajor ? "0.75" : "0.5"}
                strokeOpacity={tick.isMajor ? "0.2" : "0.08"}
              />
              {tick.isMajor && tick.x > 0 && tick.x < 1400 && (
                <text
                  x="2"
                  y="8"
                  className="fill-deepink/30 font-mono text-[5.5px]"
                >
                  {tick.x}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* ========================================================= */}
      {/* LAYER 3: TRANS-PAGE KINETIC THREAD SPINE (THE PROTAGONIST)*/}
      {/* ========================================================= */}
      <div className="absolute top-0 bottom-0 left-3 sm:left-6 lg:left-10 xl:left-[max(1.5rem,calc(50vw-708px))] flex flex-col items-center justify-between py-6">
        {/* Continuous Hairline Spine Path */}
        <div className="relative h-full w-px bg-gradient-to-b from-transparent via-mark/25 to-transparent">
          {/* Milestone Node 01 */}
          <div className="absolute top-[18%] -left-1 flex items-center gap-1.5 font-mono text-[7px] font-medium tracking-widest text-deepink/35 uppercase">
            <span className="h-2 w-2 rotate-45 border border-mark/50 bg-cream" />
            <span className="hidden xl:inline">NODE // 01</span>
          </div>

          {/* Milestone Node 02 */}
          <div className="absolute top-[48%] -left-1 flex items-center gap-1.5 font-mono text-[7px] font-medium tracking-widest text-deepink/35 uppercase">
            <span className="h-2 w-2 rotate-45 border border-mark/50 bg-cream" />
            <span className="hidden xl:inline">CORE // 142.8 HZ</span>
          </div>

          {/* Milestone Node 03 */}
          <div className="absolute top-[78%] -left-1 flex items-center gap-1.5 font-mono text-[7px] font-medium tracking-widest text-deepink/35 uppercase">
            <span className="h-2 w-2 rotate-45 border border-mark/50 bg-cream" />
            <span className="hidden xl:inline">DPDP // VERIFIED</span>
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
              {/* Pulse Core Dot & Trailing Segment */}
              <div className="relative flex h-2 w-2 items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-mark shadow-sm" />
                <span className="absolute h-3.5 w-3.5 rounded-full border border-mark/60" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 4: VIEWPORT CORNER TELEMETRY & INDIAN LATITUDES     */}
      {/* ========================================================= */}
      <div className="font-mono text-[7px] sm:text-[8px] tracking-widest uppercase text-deepink/35">
        {/* Top-Right: Geographic Grid Reference */}
        <div className="absolute top-3 right-3 sm:top-5 sm:right-6 lg:right-10 flex flex-col items-end gap-0.5 border-r border-t border-mark/30 pr-1.5 pt-1">
          <span className="font-semibold text-deepink/50">GRID // NIXI-IND</span>
          <span className="text-[6.5px] sm:text-[7px]">20.59°N · 78.96°E</span>
        </div>

        {/* Bottom-Right: System Operational Telemetry */}
        <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-6 lg:right-10 flex items-center gap-1.5 border-r border-b border-mark/30 pr-1.5 pb-1">
          <span className="h-1 w-1 bg-mark/70" />
          <span className="text-[6.5px] sm:text-[7.5px] text-deepink/50">
            LAXVISH THREAD // SYNCHRONIZED
          </span>
        </div>

        {/* Bottom-Left: Security & Privacy Compliance Seal */}
        <div className="hidden sm:flex absolute bottom-3 left-3 sm:bottom-5 sm:left-6 lg:left-10 items-center gap-1.5 border-l border-b border-mark/30 pl-1.5 pb-1">
          <span className="text-[6.5px] sm:text-[7.5px] text-deepink/50">
            DPDP ACT 2023 // READY
          </span>
        </div>

        {/* Subtle Right-Margin Latitude Watermarks (Desktop 2XL) */}
        <div className="hidden 2xl:flex absolute right-6 top-1/3 -rotate-90 origin-right flex-col gap-1 text-[6.5px] text-deepink/25 tracking-wider">
          <span>LAT 28.61°N [DEL] · LAT 19.07°N [BOM]</span>
          <span>LAT 17.38°N [HYD] · LAT 12.97°N [BLR]</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 5: AMBIENT HARMONIC FOURIER RESONANCE FILAMENT      */}
      {/* ========================================================= */}
      <div className="absolute bottom-0 inset-x-0 h-8 opacity-25">
        <svg
          viewBox="0 0 1440 24"
          className="h-full w-full preserve-3d"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 12 Q 180 4, 360 12 T 720 12 T 1080 12 T 1440 12"
            fill="none"
            stroke="#BDA6CE"
            strokeWidth="0.75"
          />
          <path
            d="M 0 12 Q 180 20, 360 12 T 720 12 T 1080 12 T 1440 12"
            fill="none"
            stroke="#9B8EC7"
            strokeWidth="0.5"
            strokeOpacity="0.5"
            strokeDasharray="4 6"
          />
        </svg>
      </div>
    </div>
  );
}
