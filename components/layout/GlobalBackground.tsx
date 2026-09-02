"use client";

import { useMemo, useSyncExternalStore } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  BRAND_PALETTE,
  SPINE_MILESTONES,
  SUBCONTINENT_HUBS,
} from "@/types/visual-engine";

const emptySubscribe = () => () => {};

export function GlobalBackground() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Scroll tracking for the trans-page kinetic thread spine with spring physics
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 26,
    stiffness: 85,
    mass: 0.85,
  });

  // Calculate soliton pulse Y position along the vertical spine (2vh to 96vh)
  const solitonY = useTransform(smoothProgress, [0, 1], ["2.5vh", "96.5vh"]);
  const pulseOpacity = useTransform(
    smoothProgress,
    [0, 0.04, 0.96, 1],
    [0.4, 1, 1, 0.5]
  );

  // Generate top edge technical drafting ruler ticks (0 to 1440px every 20px)
  const topRulerTicks = useMemo(() => {
    const ticks = [];
    for (let x = 0; x <= 1440; x += 20) {
      const isMajor = x % 100 === 0;
      ticks.push({
        x,
        isMajor,
        height: isMajor ? 7 : 3.5,
      });
    }
    return ticks;
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
              stroke={BRAND_PALETTE.deepink}
              strokeWidth="0.5"
              strokeOpacity="0.04"
            />
            {/* Micro-dot at center of cell (70, 70) */}
            <circle
              cx="70"
              cy="70"
              r="0.75"
              fill={BRAND_PALETTE.mist}
              fillOpacity="0.35"
            />
            {/* Precision Crosshair (+) at grid intersections */}
            <path
              d="M -3.5 0 L 3.5 0 M 0 -3.5 L 0 3.5"
              stroke={BRAND_PALETTE.deepink}
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
            <circle
              cx="14"
              cy="14"
              r="0.65"
              fill={BRAND_PALETTE.deepink}
              fillOpacity="0.035"
            />
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
      <div className="hidden lg:flex absolute top-0 inset-x-0 mx-auto h-5 w-full max-w-[1440px] items-start justify-between px-16">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 1440 12">
          {topRulerTicks.map((tick) => (
            <g key={tick.x} transform={`translate(${tick.x}, 0)`}>
              <line
                x1="0"
                y1="0"
                x2="0"
                y2={tick.height}
                stroke={BRAND_PALETTE.deepink}
                strokeWidth={tick.isMajor ? "0.75" : "0.5"}
                strokeOpacity={tick.isMajor ? "0.22" : "0.08"}
              />
              {tick.isMajor && tick.x > 0 && tick.x < 1400 && (
                <text
                  x="2.5"
                  y="9"
                  className="fill-deepink/30 font-mono text-[5.5px] tracking-tight"
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
        {/* Continuous Hairline Spine Path & Unspooling SVG Rail */}
        <div className="relative h-full w-2 flex items-center justify-center">
          {/* SVG Carrier Track & Unspooling Thread */}
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Hairline Carrier Guide Line */}
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke={BRAND_PALETTE.ink}
              strokeWidth="0.75"
              strokeOpacity="0.2"
              strokeDasharray="3 4"
            />
            {/* Living Thread Unspooling Path Length Reveal */}
            {mounted && (
              <motion.line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke={BRAND_PALETTE.mark}
                strokeWidth="1.25"
                strokeLinecap="round"
                style={{ pathLength: smoothProgress }}
              />
            )}
          </svg>

          {/* Spine Chapter Milestones */}
          {SPINE_MILESTONES.map((milestone) => (
            <div
              key={milestone.id}
              style={{ top: `${milestone.yPositionPercent}%` }}
              className="absolute -left-1.5 flex items-center gap-2 font-mono text-[7px] sm:text-[7.5px] tracking-widest text-deepink/35 uppercase"
            >
              {/* Precision Milestone Marker */}
              <div className="relative flex h-3 w-3 items-center justify-center">
                <span className="h-2 w-2 rotate-45 border border-mark/60 bg-cream" />
                <span className="absolute h-0.75 w-0.75 rotate-45 bg-mark" />
              </div>
              <div className="hidden xl:flex flex-col gap-0.5 whitespace-nowrap">
                <span className="font-medium text-deepink/50">
                  {milestone.nodeCode}
                </span>
                {milestone.telemetry?.statusText && (
                  <span className="text-[6px] text-ink tracking-wider">
                    {milestone.telemetry.statusText}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Traveling Soliton Data Pulse (Scroll-Driven with Spring Physics) */}
          {mounted && (
            <motion.div
              style={{
                top: solitonY,
                opacity: pulseOpacity,
              }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {/* Soliton Wave Packet: Core Dot, Halo, and Acoustic Crosshair */}
              <div className="relative flex h-4 w-4 items-center justify-center">
                {/* Core Soliton Point */}
                <span className="h-1.5 w-1.5 rounded-full bg-mark" />
                {/* Soliton Wave Envelope Halo */}
                <span className="absolute h-3.5 w-3.5 rounded-full border border-mark/60" />
                {/* Trailing Micro-Nodes */}
                <span className="absolute -top-2.5 h-0.75 w-0.75 rounded-full bg-mark/40" />
                <span className="absolute -bottom-2.5 h-0.75 w-0.75 rounded-full bg-mark/40" />
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
          <span className="font-semibold text-deepink/50">
            GRID // {SUBCONTINENT_HUBS["NIXI-IND"].code}
          </span>
          <span className="text-[6.5px] sm:text-[7px]">
            {SUBCONTINENT_HUBS["NIXI-IND"].coordinatesLabel}
          </span>
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
          <span>
            LAT {SUBCONTINENT_HUBS["DEL"].lat.toFixed(2)}°N [DEL] · LAT{" "}
            {SUBCONTINENT_HUBS["BOM"].lat.toFixed(2)}°N [BOM]
          </span>
          <span>
            LAT {SUBCONTINENT_HUBS["HYD"].lat.toFixed(2)}°N [HYD] · LAT{" "}
            {SUBCONTINENT_HUBS["BLR"].lat.toFixed(2)}°N [BLR]
          </span>
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
            stroke={BRAND_PALETTE.ink}
            strokeWidth="0.75"
          />
          <path
            d="M 0 12 Q 180 20, 360 12 T 720 12 T 1080 12 T 1440 12"
            fill="none"
            stroke={BRAND_PALETTE.mark}
            strokeWidth="0.5"
            strokeOpacity="0.5"
            strokeDasharray="4 6"
          />
        </svg>
      </div>
    </div>
  );
}
