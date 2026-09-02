"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

// ============================================================================
// STRICT BRAND PALETTE
// ============================================================================
const BRAND = {
  cream: "#F2EAE0",
  mist: "#B4D3D9",
  ink: "#BDA6CE",
  mark: "#9B8EC7",
  deepink: "#1A1820",
  parchment: "#EDE3D2",
} as const;

// ============================================================================
// STEPPED ZIGGURAT :: Concentric Tier Cathedral
// ============================================================================
export type ZigguratLayer = "all" | "workers" | "brain" | "brakes";

const ZIGGURAT_TIERS = [
  {
    layerId: "all" as const,
    tierIndex: 0,
    label: "00 · UNIFIED CATHEDRAL",
    elevation: "DATUM ±0.000 M",
    load: "σ_net = 1,420 MPa",
    tolerance: "MONOLITHIC",
    ringOuter: 240,
    ringInner: 210,
    azimuth: 360,
    role: "Complete enterprise organism",
    deepLink: "/solutions",
  },
  {
    layerId: "workers" as const,
    tierIndex: 1,
    label: "01 · EXECUTION BUTTRESSES",
    elevation: "TIER 01 // +4.200 M",
    load: "σ_buttress = 480 MPa",
    tolerance: "±0.005 MM",
    ringOuter: 200,
    ringInner: 168,
    azimuth: 180,
    role: "Autonomous specialists hands",
    deepLink: "/workers",
  },
  {
    layerId: "brain" as const,
    tierIndex: 2,
    label: "02 · NERVOUS CLOISTER",
    elevation: "TIER 02 // +9.600 M",
    load: "σ_cloister = 620 MPa",
    tolerance: "±0.002 MM",
    ringOuter: 160,
    ringInner: 130,
    azimuth: 90,
    role: "Central neural routing",
    deepLink: "/brain",
  },
  {
    layerId: "brakes" as const,
    tierIndex: 3,
    label: "03 · KEYSTONE GATE",
    elevation: "TIER 03 // +14.200 M",
    load: "σ_keystone = 320 MPa",
    tolerance: "ABSOLUTE ZERO",
    ringOuter: 122,
    ringInner: 92,
    azimuth: 45,
    role: "Sovereign Brakes verification",
    deepLink: "/brakes",
  },
];

// ============================================================================
// Ziggurat voussoir points generator (12 voussoirs at outer ring)
// ============================================================================
const voussoirPoints = (cx: number, cy: number, ringOuter: number, ringInner: number, slices: number) => {
  const pts: string[] = [];
  for (let i = 0; i < slices; i++) {
    const a0 = (i / slices) * Math.PI * 2;
    const a1 = ((i + 1) / slices) * Math.PI * 2;
    pts.push(
      `${cx + ringInner * Math.cos(a0)},${cy + ringInner * Math.sin(a0)}`,
      `${cx + ringOuter * Math.cos(a0)},${cy + ringOuter * Math.sin(a0)}`,
      `${cx + ringOuter * Math.cos(a1)},${cy + ringOuter * Math.sin(a1)}`,
      `${cx + ringInner * Math.cos(a1)},${cy + ringInner * Math.sin(a1)}`
    );
  }
  return pts.join(" ");
};

// ============================================================================
// COMPONENT
// ============================================================================
export function SystemRevealPayoff() {
  const [activeLayer, setActiveLayer] = useState<ZigguratLayer>("all");

  const activeTier = ZIGGURAT_TIERS.find((t) => t.layerId === activeLayer) || ZIGGURAT_TIERS[0];

  // Calculate which tiers are visible
  const activeTierIndex = ZIGGURAT_TIERS.findIndex((t) => t.layerId === activeLayer);
  const tierVisible = (tierIndex: number) => {
    if (activeLayer === "all") return true;
    return tierIndex >= activeTierIndex - 1 && tierIndex <= activeTierIndex + 1;
  };

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="relative mx-auto w-full overflow-hidden border border-[#1A1820]/15 bg-[#F2EAE0] p-4 text-[#1A1820] sm:p-10">
        {/* Architectural Drafting Substrate */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="zigguratDots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.4" fill="#1A1820" />
            </pattern>
            <pattern id="zigguratHatch" width="14" height="14" patternUnits="userSpaceOnUse">
              <line x1="0" y1="14" x2="14" y2="0" stroke="#1A1820" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#zigguratDots)" />
        </svg>

        {/* Section Header */}
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#9B8EC7]">
            <span className="h-2 w-2 block bg-[#9B8EC7]" />
            <span>THE OPERATING SYSTEM REVEAL</span>
          </div>
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-normal leading-[1.04] tracking-tight text-[#1A1820]">
            ONE OPERATING SYSTEM.
            <br />
            THOUSANDS OF TASKS.
            <br />
            ONE INTELLIGENT FLOW.
          </h2>
          <p className="font-mono text-base text-[#9B8EC7] sm:text-lg">
            "The work gets done. You stay in control."
          </p>
        </div>

        {/* Layer Selector */}
        <div className="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-3 border-y border-[#1A1820]/15 py-3 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-bold mr-1 text-[#1A1820]/60">Tier Lens:</span>
            {ZIGGURAT_TIERS.map((tier) => (
              <button
                key={tier.layerId}
                type="button"
                onClick={() => setActiveLayer(tier.layerId)}
                className={`cursor-pointer border px-3 py-1.5 transition-all ${
                  activeLayer === tier.layerId
                    ? "border-2 border-[#9B8EC7] bg-[#B4D3D9] text-[#1A1820] font-bold"
                    : "border border-[#1A1820]/20 bg-[#EDE3D2] text-[#1A1820]/75 hover:border-[#9B8EC7]/60"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stage */}
        <div className="relative z-10 mt-8 grid gap-6 lg:grid-cols-12 lg:items-center">
          {/* Left: Ziggurat Blueprint Canvas */}
          <div className="flex w-full flex-col border border-[#1A1820]/15 bg-[#F2EAE0] p-4 sm:p-5 lg:col-span-7">
            {/* Title strip */}
            <div className="flex items-center justify-between border-b border-[#1A1820]/15 pb-2 font-mono text-[9.5px] uppercase text-[#1A1820]/60">
              <span className="font-semibold text-[#1A1820]">CATHEDRAL CROSS-SECTION ELEVATION // SCALE 1:240</span>
              <span className="text-[#9B8EC7]">{activeTier.role}</span>
            </div>

            {/* SVG Ziggurat Canvas */}
            <div className="relative my-4 flex h-[500px] w-full items-center justify-center">
              <svg
                viewBox="0 0 600 600"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <pattern id="hatchDiag" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#1A1820" strokeWidth="0.5" strokeOpacity="0.35" />
                  </pattern>
                </defs>

                {/* Ground line & section markers */}
                <line x1="20" y1="540" x2="580" y2="540" stroke="#1A1820" strokeWidth="1" />
                {[0, 0.25, 0.5, 0.75, 1].map((p) => (
                  <g key={`tick-${p}`} transform={`translate(${20 + p * 560}, 540)`}>
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#1A1820" strokeWidth="0.75" />
                    <text x="0" y="14" fontFamily="monospace" fontSize="6" fill="#1A1820" textAnchor="middle">
                      {Math.round(p * 100)}M
                    </text>
                  </g>
                ))}

                {/* 4 Ziggurat Tiers (concentric stepped pyramid viewed in plan) */}
                {ZIGGURAT_TIERS.map((tier) => {
                  const cx = 300;
                  const cy = 300;
                  const isActive = activeLayer === tier.layerId;
                  const isVisible = tierVisible(tier.tierIndex);
                  if (!isVisible) return null;
                  return (
                    <g key={tier.layerId} opacity={isActive ? 1 : 0.55}>
                      {/* Outer ring base (voussoir polygon stair) */}
                      <polygon
                        points={voussoirPoints(cx, cy, tier.ringOuter, tier.ringOuter - 14, 24)}
                        fill="none"
                        stroke="#1A1820"
                        strokeWidth={isActive ? 1.5 : 1}
                        strokeOpacity={isActive ? 0.9 : 0.6}
                      />
                      {/* Main circular tier ring */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={tier.ringOuter}
                        fill="none"
                        stroke="#1A1820"
                        strokeWidth={isActive ? 1.5 : 1}
                        strokeOpacity={isActive ? 0.9 : 0.5}
                      />
                      {/* Inner ring */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={tier.ringInner}
                        fill="none"
                        stroke="#9B8EC7"
                        strokeWidth={isActive ? 1.25 : 0.85}
                        strokeOpacity={isActive ? 0.8 : 0.4}
                        strokeDasharray={isActive ? "none" : "4 4"}
                      />
                      {/* Stepped elevation ring */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={tier.ringOuter - 14}
                        fill="none"
                        stroke="#1A1820"
                        strokeWidth="0.75"
                        strokeDasharray="1 3"
                      />
                      {/* Hatched floor pattern when active */}
                      {isActive && tier.tierIndex === 0 && (
                        <circle cx={cx} cy={cy} r={tier.ringOuter - 14} fill="url(#hatchDiag)" />
                      )}
                      {/* Hatched floor for elevated tiers */}
                      {isActive && tier.tierIndex > 0 && (
                        <circle cx={cx} cy={cy} r={(tier.ringOuter + tier.ringInner) / 2} fill="url(#hatchDiag)" opacity="0.5" />
                      )}
                      {/* Tier radial sub-divisions (24 steps) */}
                      {Array.from({ length: 24 }).map((_, i) => {
                        const a = (i / 24) * Math.PI * 2;
                        return (
                          <line
                            key={`step-${tier.layerId}-${i}`}
                            x1={cx + tier.ringOuter * Math.cos(a)}
                            y1={cy + tier.ringOuter * Math.sin(a)}
                            x2={cx + tier.ringInner * Math.cos(a)}
                            y2={cy + tier.ringInner * Math.sin(a)}
                            stroke="#1A1820"
                            strokeOpacity="0.4"
                            strokeWidth="0.5"
                          />
                        );
                      })}
                      {/* Cardinal labels at NE/SE/SW/NW on outer ring */}
                      {["NE", "SE", "SW", "NW"].map((dir, i) => {
                        const a = Math.PI / 4 + (i * Math.PI) / 2;
                        return (
                          <g key={`label-${tier.layerId}-${dir}`} transform={`translate(${cx + (tier.ringOuter + 14) * Math.cos(a)}, ${cy + (tier.ringOuter + 14) * Math.sin(a)})`}>
                            <text
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontFamily="monospace"
                              fontSize="7"
                              fontWeight="bold"
                              fill={isActive ? BRAND.mark : BRAND.deepink}
                            >
                              {dir}
                            </text>
                          </g>
                        );
                      })}
                      {/* Active tier dimensional label */}
                      {isActive && (
                        <g transform={`translate(${cx + tier.ringOuter + 26}, ${cy - tier.ringOuter - 24})`}>
                          <line x1="0" y1="0" x2="0" y2="14" stroke="#9B8EC7" strokeWidth="0.75" />
                          <text x="0" y="-2" fontFamily="monospace" fontSize="7" fill="#9B8EC7" fontWeight="bold">
                            EL {tier.elevation}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Architectural Section Cutting Line */}
                <line
                  x1="60"
                  y1="540"
                  x2="540"
                  y2="540"
                  stroke="#9B8EC7"
                  strokeWidth="0.75"
                  strokeDasharray="2 3"
                  opacity="0.5"
                />
                <text x="300" y="495" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#1A1820" opacity="0.6">
                  SECTION A-A : DATUM LINE
                </text>
              </svg>
            </div>

            {/* Blueprint Title Block (bottom-right of left card) */}
            <div className="mt-2 flex items-center justify-between gap-2 border border-[#1A1820]/15 bg-[#EDE3D2] p-2 font-mono text-[9.5px] uppercase text-[#1A1820]/70">
              <span>DWG // LR-OS-24.01</span>
              <span className="font-bold text-[#1A1820]">{activeTier.elevation}</span>
              <span className="text-[#9B8EC7]">SHEET 01/01</span>
            </div>
          </div>

          {/* Right Column: Engineering Specification Card */}
          <div className="flex flex-col space-y-4 lg:col-span-5">
            {/* Active Engineering Specs */}
            <div className="border border-[#1A1820]/15 bg-[#EDE3D2] p-4">
              <div className="flex items-center justify-between border-b border-[#1A1820]/15 pb-2 font-mono text-[10px] uppercase text-[#1A1820]/65">
                <span>ACTIVE TIER</span>
                <span className="font-bold text-[#9B8EC7]">{activeTier.label}</span>
              </div>

              <div className="mt-3 space-y-2">
                {/* Datum Elevation */}
                <div className="border-l-2 border-[#9B8EC7] pl-2">
                  <p className="font-mono text-[9.5px] uppercase text-[#1A1820]/55">DATUM ELEVATION</p>
                  <p className="font-mono text-base font-bold text-[#1A1820]">{activeTier.elevation}</p>
                </div>

                {/* Structural Load */}
                <div className="border-l-2 border-[#1A1820]/30 pl-2">
                  <p className="font-mono text-[9.5px] uppercase text-[#1A1820]/55">STRUCTURAL LOAD</p>
                  <p className="font-mono text-base font-bold text-[#1A1820]">{activeTier.load}</p>
                </div>

                {/* Keystone Tolerance */}
                <div className="border-l-2 border-[#1A1820]/30 pl-2">
                  <p className="font-mono text-[9.5px] uppercase text-[#1A1820]/55">KEYSTONE TOLERANCE</p>
                  <p className="font-mono text-base font-bold text-[#1A1820]">{activeTier.tolerance}</p>
                </div>

                {/* Architectural Role */}
                <div className="border-l-2 border-[#1A1820]/30 pl-2">
                  <p className="font-mono text-[9.5px] uppercase text-[#1A1820]/55">ARCHITECTURAL ROLE</p>
                  <p className="font-mono text-sm font-medium text-[#1A1820]/85">{activeTier.role}</p>
                </div>
              </div>
            </div>

            {/* All Four Tier Summary Table */}
            <div className="border border-[#1A1820]/15 bg-[#F2EAE0] p-3 font-mono text-[10px]">
              <div className="flex items-center justify-between border-b border-[#1A1820]/15 pb-1.5 mb-2 uppercase text-[#1A1820]/60">
                <span>ZIGGURAT TIER INDEX</span>
                <span className="text-[#9B8EC7] font-bold">4 TIERS</span>
              </div>
              {ZIGGURAT_TIERS.map((tier) => {
                const isActive = activeLayer === tier.layerId;
                return (
                  <button
                    key={tier.layerId}
                    onClick={() => setActiveLayer(tier.layerId)}
                    type="button"
                    className={`flex w-full cursor-pointer items-center justify-between border-t border-[#1A1820]/5 py-1.5 text-left transition-colors ${
                      isActive ? "bg-[#B4D3D9]/40 px-2 -ml-2 -mr-2 font-bold" : ""
                    }`}
                  >
                    <span className={isActive ? "text-[#1A1820]" : "text-[#1A1820]/70"}>
                      {tier.label}
                    </span>
                    <span className={isActive ? "text-[#9B8EC7]" : "text-[#1A1820]/55"}>
                      {tier.elevation}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Deep Briefing Action */}
            <Link
              href={activeTier.deepLink}
              className="inline-flex items-center justify-between border border-[#9B8EC7] bg-[#9B8EC7] px-5 py-3 font-mono text-[12px] font-semibold text-[#F2EAE0] hover:bg-[#1A1820] hover:border-[#1A1820]"
            >
              <span>EXPLORE {activeTier.label.replace(" · ", " // ")}</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Disclosure Strip */}
        <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#1A1820]/15 pt-3 font-mono text-[10px] uppercase text-[#1A1820]/55">
          <span>{activeTier.role.toUpperCase()} · {activeTier.elevation} · {activeTier.tolerance}</span>
          <span>BLUEPRINT-OS-24 // INDIA STATE STAMP</span>
        </div>
      </div>
    </section>
  );
}
