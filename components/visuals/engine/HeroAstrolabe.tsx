"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface HeroAstrolabeProps {
  className?: string;
}

export function HeroAstrolabe({ className = "" }: HeroAstrolabeProps) {
  const [mounted, setMounted] = useState(false);
  const [activeHub, setActiveHub] = useState<string>("DEL");
  const isInteractingRef = useRef(false);

  // Mouse / Touch parallax motion values (normalized -0.5 to 0.5)
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  // Calibrated physical inertia spring physics (heavy brass/instrument mass)
  const springConfig = { damping: 26, stiffness: 80, mass: 1.1 };
  const smoothX = useSpring(motionX, springConfig);
  const smoothY = useSpring(motionY, springConfig);

  // 3D Parallax angles & depth shifts
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  // Layered differential depth parallax
  const fgDepthX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const fgDepthY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);
  const mgDepthX = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const mgDepthY = useTransform(smoothY, [-0.5, 0.5], [-7, 7]);
  const bgDepthX = useTransform(smoothX, [-0.5, 0.5], [5, -5]);
  const bgDepthY = useTransform(smoothY, [-0.5, 0.5], [5, -5]);

  useEffect(() => {
    setMounted(true);

    // Passive ambient motion loop for mobile / idle states
    let animationFrameId: number;
    let startTime = Date.now();

    const animateIdle = () => {
      if (!isInteractingRef.current) {
        const elapsed = (Date.now() - startTime) / 1000;
        // Gentle Lissajous ambient drift
        const idleX = Math.sin(elapsed * 0.4) * 0.18;
        const idleY = Math.cos(elapsed * 0.3) * 0.14;
        motionX.set(idleX);
        motionY.set(idleY);

        // Slow ambient hub rotation in idle mode
        const cycle = Math.floor((elapsed / 6) % 4);
        const hubs = ["DEL", "BOM", "BLR", "HYD"];
        setActiveHub(hubs[cycle]);
      }
      animationFrameId = requestAnimationFrame(animateIdle);
    };

    animationFrameId = requestAnimationFrame(animateIdle);
    return () => cancelAnimationFrame(animationFrameId);
  }, [motionX, motionY]);

  // Pointer & Mouse Interaction
  const handlePointerMove = (clientX: number, clientY: number, currentTarget: HTMLElement) => {
    isInteractingRef.current = true;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    motionX.set(x);
    motionY.set(y);

    // Dynamic Quadrant Hub Focus
    if (y < -0.1) setActiveHub("DEL");
    else if (x > 0.1) setActiveHub("BOM");
    else if (y > 0.1) setActiveHub("BLR");
    else if (x < -0.1) setActiveHub("HYD");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerMove(e.clientX, e.clientY, e.currentTarget);
  };

  const handleMouseLeave = () => {
    isInteractingRef.current = false;
  };

  // Touch handlers for mobile devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handlePointerMove(touch.clientX, touch.clientY, e.currentTarget);
    }
  };

  const handleTouchEnd = () => {
    isInteractingRef.current = false;
  };

  // 1. Generate 360 Degree Azimuth Ticks (1°, 5°, 10°, 30°, 90° hierarchy)
  const azimuthTicks = useMemo(() => {
    const ticks = [];
    const radius = 236;
    for (let deg = 0; deg < 360; deg += 2) {
      const rad = (deg * Math.PI) / 180;
      const isQuadrant = deg % 90 === 0;
      const isMajor = deg % 30 === 0;
      const isMedium = deg % 10 === 0;
      const isMinor = deg % 5 === 0;

      const len = isQuadrant ? 14 : isMajor ? 10 : isMedium ? 7 : isMinor ? 4.5 : 2.5;
      const rInner = radius - len;

      const x1 = radius * Math.sin(rad);
      const y1 = -radius * Math.cos(rad);
      const x2 = rInner * Math.sin(rad);
      const y2 = -rInner * Math.cos(rad);

      ticks.push({
        deg,
        x1,
        y1,
        x2,
        y2,
        isQuadrant,
        isMajor,
        isMedium,
        isMinor,
      });
    }
    return ticks;
  }, []);

  // 2. Generate 24-Hour Solar Time Scale (96 quarterly subdivisions)
  const hourTicks = useMemo(() => {
    const ticks = [];
    const radius = 218;
    for (let i = 0; i < 96; i++) {
      const angle = (i * 360) / 96;
      const rad = (angle * Math.PI) / 180;
      const isHour = i % 4 === 0;
      const isHalf = i % 2 === 0 && !isHour;
      const len = isHour ? 8 : isHalf ? 5 : 3;
      const rInner = radius - len;

      const x1 = radius * Math.sin(rad);
      const y1 = -radius * Math.cos(rad);
      const x2 = rInner * Math.sin(rad);
      const y2 = -rInner * Math.cos(rad);

      ticks.push({
        idx: i,
        hour: i / 4,
        x1,
        y1,
        x2,
        y2,
        isHour,
        angle,
      });
    }
    return ticks;
  }, []);

  // 3. Generate 10-division Vernier Nonius Caliper Scale
  const vernierTicks = useMemo(() => {
    const ticks = [];
    const radius = 246;
    for (let i = -5; i <= 5; i++) {
      const deg = i * 0.9;
      const rad = (deg * Math.PI) / 180;
      const len = i === 0 ? 8 : i % 5 === 0 ? 6 : 4;
      const rOuter = radius + len;

      const x1 = radius * Math.sin(rad);
      const y1 = -radius * Math.cos(rad);
      const x2 = rOuter * Math.sin(rad);
      const y2 = -rOuter * Math.cos(rad);

      ticks.push({
        val: i + 5,
        x1,
        y1,
        x2,
        y2,
        isCenter: i === 0,
      });
    }
    return ticks;
  }, []);

  // 4. Generate 64-Tooth Involute Gear Ring
  const gearTeeth = useMemo(() => {
    const teeth = [];
    const count = 64;
    const rBase = 162;
    const rTip = 167;
    for (let i = 0; i < count; i++) {
      const angle = (i * 360) / count;
      const rad = (angle * Math.PI) / 180;
      const radNext = ((angle + 360 / count / 2) * Math.PI) / 180;

      const x1 = rBase * Math.sin(rad);
      const y1 = -rBase * Math.cos(rad);
      const x2 = rTip * Math.sin(rad);
      const y2 = -rTip * Math.cos(rad);
      const x3 = rTip * Math.sin(radNext);
      const y3 = -rTip * Math.cos(radNext);
      const x4 = rBase * Math.sin(radNext);
      const y4 = -rBase * Math.cos(radNext);

      teeth.push({
        id: i,
        d: `M ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} L ${x4.toFixed(2)} ${y4.toFixed(2)} Z`,
      });
    }
    return teeth;
  }, []);

  // 5. Stereographic Almucantar Arcs for Indian Latitudes
  const almucantars = useMemo(() => {
    return [
      { alt: "10°", cx: 0, cy: -110, r: 148, strokeOpacity: 0.25 },
      { alt: "20°", cx: 0, cy: -85, r: 122, strokeOpacity: 0.3 },
      { alt: "30°", cx: 0, cy: -64, r: 98, strokeOpacity: 0.35 },
      { alt: "40°", cx: 0, cy: -46, r: 76, strokeOpacity: 0.4 },
      { alt: "50°", cx: 0, cy: -32, r: 56, strokeOpacity: 0.45 },
      { alt: "60°", cx: 0, cy: -20, r: 38, strokeOpacity: 0.5 },
      { alt: "70°", cx: 0, cy: -10, r: 22, strokeOpacity: 0.55 },
      { alt: "80°", cx: 0, cy: -4, r: 10, strokeOpacity: 0.6 },
    ];
  }, []);

  // 6. Cardinal Degree Numerals
  const degreeLabels = [
    { deg: "000°", x: 0, y: -247, anchor: "middle" },
    { deg: "030°", x: 124, y: -214, anchor: "middle" },
    { deg: "060°", x: 215, y: -123, anchor: "middle" },
    { deg: "090°", x: 250, y: 3, anchor: "start" },
    { deg: "120°", x: 215, y: 128, anchor: "middle" },
    { deg: "150°", x: 124, y: 220, anchor: "middle" },
    { deg: "180°", x: 0, y: 254, anchor: "middle" },
    { deg: "210°", x: -124, y: 220, anchor: "middle" },
    { deg: "240°", x: -215, y: 128, anchor: "middle" },
    { deg: "270°", x: -250, y: 3, anchor: "end" },
    { deg: "300°", x: -215, y: -123, anchor: "middle" },
    { deg: "330°", x: -124, y: -214, anchor: "middle" },
  ];

  // 7. Indian Enterprise Hub Nodes
  const enterpriseHubs = [
    {
      id: "DEL",
      name: "DELHI // NCR",
      lat: "28.61° N",
      lon: "77.20° E",
      x: 0,
      y: -198,
      angle: 0,
    },
    {
      id: "BOM",
      name: "MUMBAI // WEST",
      lat: "19.07° N",
      lon: "72.87° E",
      x: 198,
      y: 0,
      angle: 90,
    },
    {
      id: "BLR",
      name: "BENGALURU // SOUTH",
      lat: "12.97° N",
      lon: "77.59° E",
      x: 0,
      y: 198,
      angle: 180,
    },
    {
      id: "HYD",
      name: "HYDERABAD // DECCAN",
      lat: "17.38° N",
      lon: "78.48° E",
      x: -198,
      y: 0,
      angle: 270,
    },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative flex aspect-square h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] md:h-[480px] md:w-[480px] lg:h-[530px] lg:w-[530px] max-w-full select-none items-center justify-center [perspective:1400px] touch-none ${className}`}
      aria-label="The Precision Astrolabe & Kinetic Thread Core"
    >
      {/* ========================================================= */}
      {/* INDUSTRIAL TELEMETRY HUD & CALIBRATED CORNER FRAMING      */}
      {/* ========================================================= */}
      <div className="pointer-events-none absolute inset-0 font-mono text-[7.5px] sm:text-[8px] md:text-[9px] uppercase tracking-wider sm:tracking-widest text-deepink/60">
        {/* Top-Left: Chronometer ID & Indian Enterprise Geographic Center */}
        <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 flex flex-col gap-0.5 border-l border-t sm:border-l-2 sm:border-t-2 border-mark/50 pl-1.5 pt-1 sm:pl-2 sm:pt-1.5">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 bg-mark" />
            <span className="font-semibold tracking-wider text-deepink">
              INST // TYPE-04
            </span>
          </div>
          <span className="text-[6.5px] sm:text-[7.5px] md:text-[8px] text-deepink/60">
            COORD // 20.59°N · 78.96°E
          </span>
          <span className="hidden sm:inline text-[7px] md:text-[7.5px] text-deepink/40">
            TIMEBASE // +05:30 IST
          </span>
        </div>

        {/* Top-Right: Kinetic Thread Carrier Frequency & NIXI Latency */}
        <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 flex flex-col items-end gap-0.5 border-r border-t sm:border-r-2 sm:border-t-2 border-mark/50 pr-1.5 pt-1 sm:pr-2 sm:pt-1.5 text-right">
          <span className="font-semibold text-mark">THREAD // 142.84 HZ</span>
          <span className="text-[6.5px] sm:text-[7.5px] md:text-[8px] text-deepink/70">
            NIXI BACKBONE // 3.2 MS
          </span>
          <span className="hidden sm:inline text-[7px] md:text-[7.5px] text-deepink/40">
            JITTER // 0.008 MS · ZERO LOSS
          </span>
        </div>

        {/* Bottom-Left: Subcontinent Enterprise Topography Matrix */}
        <div className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 flex flex-col gap-0.5 border-b border-l sm:border-b-2 sm:border-l-2 border-mark/50 pb-1 pl-1.5 sm:pb-1.5 sm:pl-2">
          <span className="font-semibold text-deepink/80">
            ACTIVE // {activeHub} NODE
          </span>
          <span className="text-[6.5px] sm:text-[7.5px] md:text-[8px] text-deepink/60">
            DEL · BOM · BLR · HYD
          </span>
          <span className="hidden sm:inline text-[7px] md:text-[7.5px] text-deepink/40">
            TOPOLOGY // 4 REGIONS SYNC
          </span>
        </div>

        {/* Bottom-Right: Governance & Statutory Compliance Telemetry */}
        <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 flex flex-col items-end gap-0.5 border-b border-r sm:border-b-2 sm:border-r-2 border-mark/50 pb-1 pr-1.5 sm:pb-1.5 sm:pr-2 text-right">
          <span className="font-semibold text-deepink/80">
            DPDP ACT // READY
          </span>
          <span className="text-[6.5px] sm:text-[7.5px] md:text-[8px] text-deepink/60">
            GSTN // VERIFIED
          </span>
          <span className="hidden sm:inline text-[7px] md:text-[7.5px] text-deepink/40">
            STATE // SYSTEM ACTIVE
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3D SUSPENDED INSTRUMENT STAGE                             */}
      {/* ========================================================= */}
      <motion.div
        style={
          mounted
            ? {
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
        className="relative flex h-full w-full items-center justify-center"
      >
        <svg
          viewBox="-280 -280 560 560"
          className="h-full w-full max-h-full max-w-full overflow-visible"
        >
          {/* ========================================================= */}
          {/* DEFS & PATTERNS                                           */}
          {/* ========================================================= */}
          <defs>
            {/* Strict Brand Palette Gradient for Thread Waveform Pulse */}
            <linearGradient id="astroThreadGradMobile" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BDA6CE" stopOpacity="0.2" />
              <stop offset="25%" stopColor="#9B8EC7" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#1A1820" stopOpacity="1" />
              <stop offset="75%" stopColor="#9B8EC7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#BDA6CE" stopOpacity="0.2" />
            </linearGradient>

            {/* Subtle Alabaster/Cream Instrument Plate Base */}
            <radialGradient id="materPlateMobile" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#B4D3D9" stopOpacity="0.12" />
              <stop offset="55%" stopColor="#F2EAE0" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#F2EAE0" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ========================================================= */}
          {/* LAYER 0: MECHANICAL SUSPENSION SHACKLE ("THRONE" / KURSI) */}
          {/* ========================================================= */}
          <g className="pointer-events-none">
            {/* Top Suspension Shackle Ring */}
            <circle
              cx="0"
              cy="-262"
              r="12"
              fill="none"
              stroke="#1A1820"
              strokeWidth="2"
              strokeOpacity="0.6"
            />
            <circle
              cx="0"
              cy="-262"
              r="7"
              fill="none"
              stroke="#9B8EC7"
              strokeWidth="1.25"
            />

            {/* Brass Mounting Lug & Knurled Pivot Bolt */}
            <path
              d="M -16 -244 L 16 -244 L 10 -252 L -10 -252 Z"
              fill="#B4D3D9"
              fillOpacity="0.3"
              stroke="#1A1820"
              strokeWidth="1.2"
            />
            <circle cx="0" cy="-248" r="3.5" fill="#1A1820" />
            <circle cx="0" cy="-248" r="1.5" fill="#F2EAE0" />

            {/* Micro Calibration Stamp */}
            <text
              x="0"
              y="-255"
              textAnchor="middle"
              className="fill-deepink/60 font-mono text-[5px] font-bold uppercase tracking-wider"
            >
              LX-IND // 2026
            </text>
          </g>

          {/* ========================================================= */}
          {/* LAYER 1: MATER BASE PLATE & STEREOGRAPHIC TYMPAN          */}
          {/* ========================================================= */}
          <motion.g
            style={
              mounted
                ? {
                    x: bgDepthX,
                    y: bgDepthY,
                  }
                : undefined
            }
          >
            {/* Base Instrument Surface */}
            <circle cx="0" cy="0" r="244" fill="url(#materPlateMobile)" />

            {/* Outer Structural Bevel Rings */}
            <circle
              cx="0"
              cy="0"
              r="244"
              fill="none"
              stroke="#1A1820"
              strokeWidth="1.75"
              strokeOpacity="0.75"
            />
            <circle
              cx="0"
              cy="0"
              r="238"
              fill="none"
              stroke="#1A1820"
              strokeWidth="0.75"
              strokeOpacity="0.3"
            />

            {/* Prime Meridian & Equinoctial Crosshairs */}
            <line
              x1="0"
              y1="-238"
              x2="0"
              y2="238"
              stroke="#1A1820"
              strokeWidth="0.75"
              strokeOpacity="0.25"
            />
            <line
              x1="-238"
              y1="0"
              x2="238"
              y2="0"
              stroke="#1A1820"
              strokeWidth="0.75"
              strokeOpacity="0.25"
            />

            {/* Tropic of Cancer (23.44°N), Equator, and Tropic of Capricorn Arcs */}
            <circle
              cx="0"
              cy="0"
              r="174"
              fill="none"
              stroke="#9B8EC7"
              strokeWidth="0.75"
              strokeOpacity="0.35"
              strokeDasharray="4 4"
            />
            <circle
              cx="0"
              cy="0"
              r="134"
              fill="none"
              stroke="#BDA6CE"
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
            <circle
              cx="0"
              cy="0"
              r="94"
              fill="none"
              stroke="#1A1820"
              strokeWidth="0.75"
              strokeOpacity="0.2"
              strokeDasharray="2 4"
            />

            {/* Stereographic Almucantar Arcs for Indian Latitudes */}
            <g className="pointer-events-none">
              {almucantars.map((arc, i) => (
                <circle
                  key={i}
                  cx={arc.cx}
                  cy={arc.cy}
                  r={arc.r}
                  fill="none"
                  stroke="#BDA6CE"
                  strokeWidth="0.6"
                  strokeOpacity={arc.strokeOpacity}
                />
              ))}

              {/* Subcontinent Latitudinal Horizon Markers */}
              <text
                x="6"
                y="-186"
                className="fill-deepink/50 font-mono text-[5.5px] font-medium tracking-tight"
              >
                DELHI LAT 28.61°N [HORIZON]
              </text>
              <text
                x="6"
                y="-132"
                className="fill-deepink/50 font-mono text-[5.5px] font-medium tracking-tight"
              >
                MUMBAI LAT 19.07°N [PRIME]
              </text>
              <text
                x="6"
                y="-92"
                className="fill-deepink/50 font-mono text-[5.5px] font-medium tracking-tight"
              >
                BENGALURU LAT 12.97°N [NADIR]
              </text>
            </g>
          </motion.g>

          {/* ========================================================= */}
          {/* LAYER 2: MATER GRADUATED LIMB & 360° AZIMUTH SCALE        */}
          {/* (Slow 120s Counter-Clockwise Precision Clockwork)         */}
          {/* ========================================================= */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            {/* 360 Azimuth Graduation Ticks */}
            {azimuthTicks.map((tick, i) => (
              <line
                key={i}
                x1={tick.x1}
                y1={tick.y1}
                x2={tick.x2}
                y2={tick.y2}
                stroke={
                  tick.isQuadrant
                    ? "#1A1820"
                    : tick.isMajor
                    ? "#9B8EC7"
                    : tick.isMedium
                    ? "#1A1820"
                    : "#BDA6CE"
                }
                strokeWidth={
                  tick.isQuadrant ? "1.5" : tick.isMajor ? "1" : "0.6"
                }
                strokeOpacity={
                  tick.isQuadrant ? "0.9" : tick.isMajor ? "0.75" : "0.4"
                }
              />
            ))}

            {/* Cardinal Degree Numerals */}
            {degreeLabels.map((lbl, idx) => (
              <text
                key={idx}
                x={lbl.x}
                y={lbl.y}
                textAnchor={lbl.anchor as "middle" | "start" | "end"}
                className="fill-deepink/75 font-mono text-[6.5px] font-bold"
              >
                {lbl.deg}
              </text>
            ))}

            {/* Four Indian Enterprise Hub Coordinate Beacons */}
            {enterpriseHubs.map((hub) => (
              <g key={hub.id} transform={`rotate(${hub.angle})`}>
                {/* Precision Node Anchor */}
                <circle cx="0" cy="-228" r="2.5" fill="#9B8EC7" />
                <circle
                  cx="0"
                  cy="-228"
                  r="5.5"
                  fill="none"
                  stroke="#9B8EC7"
                  strokeWidth="0.75"
                  strokeOpacity="0.6"
                />

                {/* Hub Geographic Label & Latitude */}
                <text
                  x="0"
                  y="-212"
                  textAnchor="middle"
                  className="fill-deepink/80 font-mono text-[6px] font-bold tracking-tight"
                >
                  {hub.id} // {hub.lat}
                </text>
              </g>
            ))}
          </motion.g>

          {/* ========================================================= */}
          {/* LAYER 3: 24-HOUR SOLAR DIAL & VERNIER NONIUS CALIPER      */}
          {/* (90s Clockwise Geared Motion)                             */}
          {/* ========================================================= */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          >
            {/* Solar Scale Inner Ring */}
            <circle
              cx="0"
              cy="0"
              r="218"
              fill="none"
              stroke="#1A1820"
              strokeWidth="0.75"
              strokeOpacity="0.3"
            />
            <circle
              cx="0"
              cy="0"
              r="210"
              fill="none"
              stroke="#BDA6CE"
              strokeWidth="0.5"
              strokeOpacity="0.4"
              strokeDasharray="2 4"
            />

            {/* 96 Quarter-Hour Graduation Ticks */}
            {hourTicks.map((tick) => (
              <line
                key={tick.idx}
                x1={tick.x1}
                y1={tick.y1}
                x2={tick.x2}
                y2={tick.y2}
                stroke={tick.isHour ? "#1A1820" : "#BDA6CE"}
                strokeWidth={tick.isHour ? "1" : "0.5"}
                strokeOpacity={tick.isHour ? "0.6" : "0.3"}
              />
            ))}
          </motion.g>

          {/* Vernier Nonius Fixed Sub-Scale at Top Meridian */}
          <g className="pointer-events-none">
            <path
              d="M -32 -244 Q 0 -250 32 -244"
              fill="none"
              stroke="#1A1820"
              strokeWidth="1.25"
              strokeOpacity="0.5"
            />
            {vernierTicks.map((v, i) => (
              <line
                key={i}
                x1={v.x1}
                y1={v.y1}
                x2={v.x2}
                y2={v.y2}
                stroke={v.isCenter ? "#9B8EC7" : "#1A1820"}
                strokeWidth={v.isCenter ? "1.5" : "0.75"}
                strokeOpacity={v.isCenter ? "1" : "0.6"}
              />
            ))}
            <text
              x="0"
              y="-234"
              textAnchor="middle"
              className="fill-mark font-mono text-[5.5px] font-bold"
            >
              VERNIER 0.05°
            </text>
          </g>

          {/* ========================================================= */}
          {/* LAYER 4: 64-TOOTH INVOLUTE GEAR RING & EPICYCLIC TRAIN    */}
          {/* ========================================================= */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
          >
            {/* Gear Annulus Ring */}
            <circle
              cx="0"
              cy="0"
              r="162"
              fill="none"
              stroke="#1A1820"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <circle
              cx="0"
              cy="0"
              r="167"
              fill="none"
              stroke="#BDA6CE"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />

            {/* 64 Involute Gear Teeth */}
            {gearTeeth.map((tooth) => (
              <path
                key={tooth.id}
                d={tooth.d}
                fill="#B4D3D9"
                fillOpacity="0.2"
                stroke="#1A1820"
                strokeWidth="0.5"
                strokeOpacity="0.45"
              />
            ))}

            {/* 3 Epicyclic Planetary Pinion Gears at 120° Offsets */}
            {[0, 120, 240].map((deg) => (
              <g key={deg} transform={`rotate(${deg}) translate(0, -162)`}>
                <circle
                  cx="0"
                  cy="0"
                  r="12"
                  fill="#F2EAE0"
                  stroke="#1A1820"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="4"
                  fill="#9B8EC7"
                  stroke="#1A1820"
                  strokeWidth="0.75"
                />
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#1A1820" strokeWidth="0.5" strokeOpacity="0.4" />
                <line x1="0" y1="-12" x2="0" y2="12" stroke="#1A1820" strokeWidth="0.5" strokeOpacity="0.4" />
              </g>
            ))}
          </motion.g>

          {/* ========================================================= */}
          {/* LAYER 5: 3-AXIS GYROSCOPIC GIMBAL WITH TRUNNION BOLTS     */}
          {/* (Fibonacci Harmonic Periods: 55s, 34s, 21s)              */}
          {/* ========================================================= */}
          <motion.g
            style={
              mounted
                ? {
                    x: mgDepthX,
                    y: mgDepthY,
                  }
                : undefined
            }
          >
            {/* GIMBAL RING A: Pitch Axis (55s, Clockwise, Tilted +32°) */}
            <g transform="rotate(32)">
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              >
                <ellipse
                  cx="0"
                  cy="0"
                  rx="182"
                  ry="86"
                  fill="none"
                  stroke="#9B8EC7"
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                  strokeDasharray="16 6 4 6"
                />
                <ellipse
                  cx="0"
                  cy="0"
                  rx="182"
                  ry="86"
                  fill="none"
                  stroke="#1A1820"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                />

                {/* Mechanical Trunnion Pivot Bolts at X Axis */}
                <g transform="translate(182, 0)">
                  <rect x="-4" y="-3" width="8" height="6" fill="#B4D3D9" stroke="#1A1820" strokeWidth="0.75" />
                  <circle cx="0" cy="0" r="2" fill="#9B8EC7" />
                </g>
                <g transform="translate(-182, 0)">
                  <rect x="-4" y="-3" width="8" height="6" fill="#B4D3D9" stroke="#1A1820" strokeWidth="0.75" />
                  <circle cx="0" cy="0" r="2" fill="#9B8EC7" />
                </g>
              </motion.g>
            </g>

            {/* GIMBAL RING B: Roll Axis (34s, Counter-Clockwise, Tilted -48°) */}
            <g transform="rotate(-48)">
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
              >
                <ellipse
                  cx="0"
                  cy="0"
                  rx="152"
                  ry="68"
                  fill="none"
                  stroke="#1A1820"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  strokeDasharray="8 6"
                />
                <ellipse
                  cx="0"
                  cy="0"
                  rx="152"
                  ry="68"
                  fill="none"
                  stroke="#BDA6CE"
                  strokeWidth="0.6"
                  strokeOpacity="0.4"
                />

                {/* Sighting Crosshairs on Ring B */}
                <g transform="translate(0, 68)">
                  <circle cx="0" cy="0" r="3" fill="#9B8EC7" />
                  <line x1="-6" y1="0" x2="6" y2="0" stroke="#1A1820" strokeWidth="0.75" />
                  <line x1="0" y1="-6" x2="0" y2="6" stroke="#1A1820" strokeWidth="0.75" />
                </g>
                <g transform="translate(0, -68)">
                  <circle cx="0" cy="0" r="2.5" fill="#1A1820" />
                </g>
              </motion.g>
            </g>

            {/* GIMBAL RING C: Yaw Axis (21s, Clockwise, Tilted +76°) */}
            <g transform="rotate(76)">
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 21, repeat: Infinity, ease: "linear" }}
              >
                <ellipse
                  cx="0"
                  cy="0"
                  rx="122"
                  ry="52"
                  fill="none"
                  stroke="#B4D3D9"
                  strokeWidth="0.85"
                  strokeOpacity="0.7"
                  strokeDasharray="3 3"
                />
                <circle cx="122" cy="0" r="2.5" fill="#9B8EC7" />
                <circle cx="-122" cy="0" r="2.5" fill="#9B8EC7" />
              </motion.g>
            </g>
          </motion.g>

          {/* ========================================================= */}
          {/* LAYER 6: THE SKELETAL RETE & STAR-WEB FLAME POINTERS      */}
          {/* ========================================================= */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Eccentric Ecliptic Ring (Sun's Path Tilted 23.44°) */}
            <ellipse
              cx="0"
              cy="-24"
              rx="118"
              ry="110"
              fill="none"
              stroke="#9B8EC7"
              strokeWidth="1.25"
              strokeOpacity="0.55"
            />
            <ellipse
              cx="0"
              cy="-24"
              rx="112"
              ry="104"
              fill="none"
              stroke="#1A1820"
              strokeWidth="0.5"
              strokeOpacity="0.25"
              strokeDasharray="3 5"
            />

            {/* Pierced Filigree Structural Arches */}
            <path
              d="M -90 -24 Q 0 -90 90 -24 Q 0 42 -90 -24 Z"
              fill="none"
              stroke="#BDA6CE"
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />

            {/* 4 Flame-Pointers (Alhidade Daggers) */}
            <path
              d="M -3 -120 L 0 -150 L 3 -120 Q 0 -130 -3 -120 Z"
              fill="#9B8EC7"
              stroke="#1A1820"
              strokeWidth="0.5"
            />
            <path
              d="M 120 -3 L 150 0 L 120 3 Q 130 0 120 -3 Z"
              fill="#9B8EC7"
              stroke="#1A1820"
              strokeWidth="0.5"
            />
            <path
              d="M -3 120 L 0 150 L 3 120 Q 0 130 -3 120 Z"
              fill="#9B8EC7"
              stroke="#1A1820"
              strokeWidth="0.5"
            />
            <path
              d="M -120 -3 L -150 0 L -120 3 Q -130 0 -120 -3 Z"
              fill="#9B8EC7"
              stroke="#1A1820"
              strokeWidth="0.5"
            />
          </motion.g>

          {/* ========================================================= */}
          {/* LAYER 7: CENTRAL RETICLE & HARMONIC COLLIMATOR            */}
          {/* ========================================================= */}
          <motion.g
            style={
              mounted
                ? {
                    x: fgDepthX,
                    y: fgDepthY,
                  }
                : undefined
            }
          >
            {/* Fixed Inner Reticle Chamber Ring */}
            <circle
              cx="0"
              cy="0"
              r="88"
              fill="none"
              stroke="#1A1820"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <circle
              cx="0"
              cy="0"
              r="82"
              fill="none"
              stroke="#BDA6CE"
              strokeWidth="0.6"
              strokeOpacity="0.4"
              strokeDasharray="1 3"
            />

            {/* 12-Segment Radial Vernier Ticks */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
              (ang) => (
                <g key={ang} transform={`rotate(${ang})`}>
                  <line
                    x1="0"
                    y1="-88"
                    x2="0"
                    y2="-82"
                    stroke="#1A1820"
                    strokeWidth="0.8"
                    strokeOpacity="0.6"
                  />
                </g>
              )
            )}

            {/* Counter-Rotating Inner Dodecagon Aperture */}
            <motion.circle
              cx="0"
              cy="0"
              r="44"
              fill="none"
              stroke="#9B8EC7"
              strokeWidth="0.85"
              strokeDasharray="6 4"
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />

            {/* Sapphire Pivot Bearing Housing */}
            <circle
              cx="0"
              cy="0"
              r="24"
              fill="#F2EAE0"
              stroke="#1A1820"
              strokeWidth="1.25"
              strokeOpacity="0.6"
            />
            <circle
              cx="0"
              cy="0"
              r="18"
              fill="none"
              stroke="#9B8EC7"
              strokeWidth="1"
              strokeOpacity="0.75"
            />
          </motion.g>

          {/* ========================================================= */}
          {/* LAYER 8: THE KINETIC THREAD WAVEGUIDE & SOLITON STREAM    */}
          {/* ========================================================= */}
          <g className="pointer-events-none">
            {/* Primary Guided Fourier Filament Track */}
            <path
              d="M -110 0 C -75 -44, -35 44, 0 0 C 35 -44, 75 44, 110 0"
              fill="none"
              stroke="#BDA6CE"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />

            {/* Continuous Travelling Soliton Data Stream 1 */}
            <motion.path
              d="M -110 0 C -75 -44, -35 44, 0 0 C 35 -44, 75 44, 110 0"
              fill="none"
              stroke="url(#astroThreadGradMobile)"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeDasharray="32 190"
              animate={{
                strokeDashoffset: [-222, 222],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Secondary High-Frequency Micro-Pulse Stream 2 */}
            <motion.path
              d="M -110 0 C -75 -44, -35 44, 0 0 C 35 -44, 75 44, 110 0"
              fill="none"
              stroke="#9B8EC7"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeDasharray="6 80"
              animate={{
                strokeDashoffset: [86, -86],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Central Solid Focal Jewel & Breathing Pulse Nucleus */}
            <motion.circle
              cx="0"
              cy="0"
              r="5.5"
              fill="#9B8EC7"
              animate={{
                scale: [1, 1.22, 1],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* True Center Micro-Aperture */}
            <circle cx="0" cy="0" r="2" fill="#F2EAE0" />
            <circle cx="0" cy="0" r="0.75" fill="#1A1820" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
