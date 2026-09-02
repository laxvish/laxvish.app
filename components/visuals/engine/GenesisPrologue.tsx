"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";

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
// ATOMIC HELIUM CORE :: 6-PHASE INCEPTION
// Prismatic nuclear shell model (NOT hex-lattice, NOT orbit ellipses)
// ============================================================================
export type AtomicInceptionCode =
  | "0x00_COLD"
  | "0x18_ION"
  | "0x2A_CORE"
  | "0x3F_SHELL"
  | "0x4D_LINK"
  | "0x5E_SEAL";

export interface AtomicInceptionStep {
  index: number;
  code: AtomicInceptionCode;
  label: string;
  descriptor: string;
  electronCount: number;
  nucleusSpin: string;
  isotopeMass: string;
  radiationRate: string;
  narrative: string;
  payload: Array<{ key: string; val: string }>;
}

export const GENESIS_STEPS: AtomicInceptionStep[] = [
  {
    index: 0,
    code: "0x00_COLD",
    label: "THE CRYOGENIC PLASMA",
    descriptor: "Absolute Zero · No Nucleon Vibration",
    electronCount: 0,
    nucleusSpin: "0/2",
    isotopeMass: "4.002 u",
    radiationRate: "0.000 Bq",
    narrative:
      "The helium core rests at absolute zero. Every nucleon frozen. Awaiting the first spark.",
    payload: [
      { key: "TEMP", val: "0.00 K" },
      { key: "PRESSURE", val: "1.0e-12 Pa" },
      { key: "ISOTOPE", val: "He-4 · STABLE" },
    ],
  },
  {
    index: 1,
    code: "0x18_ION",
    label: "FIELD IGNITION",
    descriptor: "Dipole Field · 1.8 MV/m",
    electronCount: 1,
    nucleusSpin: "1/2",
    isotopeMass: "4.002 u",
    radiationRate: "0.034 Bq",
    narrative:
      "A single dipole field ignites. First proton and first neutron bond at 86 fm.",
    payload: [
      { key: "FIELD", val: "DIPOLE · 1.8 MV/m" },
      { key: "BOND", val: "86 fm" },
      { key: "STATE", val: "IONIZATION" },
    ],
  },
  {
    index: 2,
    code: "0x2A_CORE",
    label: "NUCLEUS CONSTRAINT",
    descriptor: "2p · 2n · Strong Force Binding",
    electronCount: 2,
    nucleusSpin: "0/0",
    isotopeMass: "4.002 u",
    radiationRate: "0.142 Bq",
    narrative:
      "Helium-4 nucleus contracts. Two protons + two neutrons locked by the strong nuclear force.",
    payload: [
      { key: "PROTONS", val: "+02" },
      { key: "NEUTRONS", val: "N02" },
      { key: "FORCE", val: "STRONG" },
    ],
  },
  {
    index: 3,
    code: "0x3F_SHELL",
    label: "QUANTUM SHELL ORBIT",
    descriptor: "K Shell · 1s² · Quantum n=1",
    electronCount: 2,
    nucleusSpin: "0/0",
    isotopeMass: "4.002 u",
    radiationRate: "0.682 Bq",
    narrative:
      "Two electrons converge on the K shell at 1s². Quantum probability density stabilizes around the nucleus.",
    payload: [
      { key: "SHELL", val: "K · 1s²" },
      { key: "ENERGY", val: "-24.58 eV" },
      { key: "DENSITY", val: "PEAK" },
    ],
  },
  {
    index: 4,
    code: "0x4D_LINK",
    label: "REMOTE ENTANGLEMENT",
    descriptor: "Atom ↔ Node · Quantum Pair Bond",
    electronCount: 2,
    nucleusSpin: "0/0",
    isotopeMass: "4.002 u",
    radiationRate: "0.964 Bq",
    narrative:
      "The helium core entangles with a remote worker node. Quantum pair bond established across the lattice.",
    payload: [
      { key: "BELL", val: "S = 2.0000" },
      { key: "FIDELITY", val: "99.84%" },
      { key: "PATH", val: "DEL → BLR" },
    ],
  },
  {
    index: 5,
    code: "0x5E_SEAL",
    label: "MATTER IMMUTABILITY",
    descriptor: "Atom Locked · Zero Radioactivity",
    electronCount: 2,
    nucleusSpin: "0/0",
    isotopeMass: "4.002 u",
    radiationRate: "0.000 Bq",
    narrative:
      "Helium atom certified as stable. Energy locked. Ready to integrate into the Laxvish substrate.",
    payload: [
      { key: "STABLE", val: "YES · He-4" },
      { key: "HALF_LIFE", val: "INFINITE" },
      { key: "GRADE", val: "INDUSTRIAL" },
    ],
  },
];

// ============================================================================
// SHELL MATH :: Quantum Probability Density Surfaces
// ============================================================================
const shellPoints = (rx: number, ry: number, count: number, phase = 0) => {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2 + phase;
    pts.push({ x: rx * Math.cos(t), y: ry * Math.sin(t) });
  }
  return pts;
};

// ============================================================================
// COMPONENT
// ============================================================================
export function GenesisPrologue() {
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeStep = GENESIS_STEPS[step];

  // Auto-reel pause-on-interaction
  useEffect(() => {
    if (!isPlaying) return;
    const next = (step + 1) % GENESIS_STEPS.length;
    const id = setTimeout(() => setStep(next), 4200);
    return () => clearTimeout(id);
  }, [step, isPlaying]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }, []);

  // Dynamic probability orbitals for K / L shells
  const orbitalRings = useMemo(() => {
    return [
      { rx: 110, ry: 38, count: 60, phase: 0, ringId: "K" },
      { rx: 92, ry: 110, count: 60, phase: Math.PI / 3, ringId: "L1" },
      { rx: 110, ry: 92, count: 60, phase: Math.PI / 2 + 0.4, ringId: "L2" },
    ];
  }, []);

  // Nucleon positions (4 hard points inside nucleus)
  const nucleons = useMemo(
    () => [
      { x: -22, y: -8, p: true },
      { x: 22, y: -10, p: true },
      { x: -14, y: 22, p: false },
      { x: 18, y: 24, p: false },
    ],
    []
  );

  // Electron swarm positions for K shell
  const electronSwarm = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return {
        x: 160 * Math.cos(a),
        y: 60 * Math.sin(a),
        delay: i * 0.12,
      };
    });
  }, []);

  return (
    <section
      aria-label="Atomic Helium Core Inception Engine"
      onMouseMove={handleMouseMove}
      className="relative mx-auto w-full max-w-5xl overflow-hidden border border-[#1A1820]/15 bg-[#F2EAE0] p-4 text-[#1A1820] sm:p-8 lg:p-10"
      style={{ perspective: "1200px" }}
    >
      {/* Cold Plasma Substrate */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="plasmaStipple" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="9" cy="9" r="0.4" fill="#1A1820" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plasmaStipple)" />
      </svg>

      {/* Cold Corner Calibration Stamps */}
      <div className="pointer-events-none absolute top-2 left-3 font-mono text-[9px] uppercase tracking-widest text-[#1A1820]/35">
        CRYOSTAT // 0.024 K
      </div>
      <div className="pointer-events-none absolute top-2 right-3 font-mono text-[9px] uppercase tracking-widest text-[#1A1820]/35">
        ISOTOPE // He-4
      </div>

      {/* Top Status Strip */}
      <header className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-[#1A1820]/15 pb-3 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span
            className="h-2 w-2 block"
            style={{
              background: isPlaying ? BRAND.mark : BRAND.deepink,
            }}
          />
          <span className="font-semibold tracking-[0.16em] uppercase text-[#1A1820]">
            ATOMIC HELIUM CORE // NUCLEAR INCEPTION
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px]">
          <span className="border border-[#9B8EC7] bg-[#EDE3D2] px-2 py-1 font-bold text-[#1A1820]">
            {activeStep.code}
          </span>
          <span className="border border-[#1A1820]/15 bg-[#F2EAE0] px-2 py-1 text-[#1A1820]/80">
            e⁻ = <strong>{activeStep.electronCount}</strong>
          </span>
          <span className="border border-[#1A1820]/15 bg-[#F2EAE0] px-2 py-1 text-[#1A1820]/80">
            spin = <strong>{activeStep.nucleusSpin}</strong>
          </span>
          <span className="border border-[#1A1820]/15 bg-[#F2EAE0] px-2 py-1 text-[#1A1820]/80">
            Bq = <strong>{activeStep.radiationRate}</strong>
          </span>
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="cursor-pointer border border-[#1A1820]/30 bg-[#EDE3D2] px-3 py-1 font-mono text-[10px] font-semibold text-[#1A1820] hover:bg-[#B4D3D9]"
          >
            {isPlaying ? "[ PAUSE ]" : "[ PLAY ]"}
          </button>
        </div>
      </header>

      {/* MAIN ATOMIC CORE CANVAS */}
      <motion.div
        animate={{
          rotateX: -mousePos.y * 2.5,
          rotateY: mousePos.x * 2.5,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        className="relative z-10 my-5 flex w-full flex-col items-center justify-center"
      >
        {/* Chapter Heading */}
        <div className="mb-4 text-center">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#9B8EC7] font-semibold">
            ATOMIC PHASE {String(step + 1).padStart(2, "0")} // NUCLEAR STATE
          </p>
          <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#1A1820]">
            {activeStep.label}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-[#1A1820]/75 max-w-md mx-auto">
            {activeStep.descriptor}
          </p>
        </div>

        {/* SVG ATOMIC CANVAS */}
        <div className="relative w-full max-w-3xl border border-[#1A1820]/15 bg-[#F2EAE0]">
          {/* Inner Corner Stamps */}
          <div className="pointer-events-none absolute top-2 left-2 font-mono text-[9px] text-[#1A1820]/40">
            [ELEMENT // He]
          </div>
          <div className="pointer-events-none absolute bottom-2 left-2 font-mono text-[9px] text-[#1A1820]/40">
            [MASS {activeStep.isotopeMass}]
          </div>
          <div className="pointer-events-none absolute bottom-2 right-2 font-mono text-[9px] text-[#1A1820]/40">
            [Bq {activeStep.radiationRate}]
          </div>

          <svg
            viewBox="0 0 800 480"
            className="w-full h-auto max-h-[480px]"
            role="img"
            aria-label={`Helium atomic inception at step ${activeStep.code}`}
          >
            <defs>
              <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={BRAND.mark} stopOpacity="0.9" />
                <stop offset="60%" stopColor={BRAND.mark} stopOpacity="0.4" />
                <stop offset="100%" stopColor={BRAND.cream} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Probability Orbital Shells */}
            {step >= 3 &&
              orbitalRings.map((ring) => {
                const pts = shellPoints(ring.rx, ring.ry, ring.count, ring.phase);
                const d = pts.reduce(
                  (acc, p, idx) => acc + (idx === 0 ? `M ${400 + p.x} ${240 + p.y}` : ` L ${400 + p.x} ${240 + p.y}`) + "",
                  ""
                );
                return (
                  <path
                    key={ring.ringId}
                    d={d}
                    fill="none"
                    stroke={ring.ringId === "K" ? BRAND.mark : BRAND.ink}
                    strokeOpacity={0.5}
                    strokeWidth={ring.ringId === "K" ? 1.25 : 0.75}
                    strokeDasharray={ring.ringId === "K" ? "none" : "3 4"}
                  />
                );
              })}

            {/* Off-axis iso-probability cloud */}
            {step >= 3 && (
              <ellipse
                cx="400"
                cy="240"
                rx="120"
                ry="46"
                fill="none"
                stroke={BRAND.deepink}
                strokeOpacity="0.18"
                strokeWidth="0.5"
                strokeDasharray="2 4"
              />
            )}

            {/* Nucleus Cluster (4 nucleons) */}
            {step >= 2 && (
              <g>
                <circle
                  cx="400"
                  cy="240"
                  r="44"
                  fill="url(#nucleusGlow)"
                  style={{ filter: "none" }}
                />
                {nucleons.map((n, idx) => (
                  <g key={idx} transform={`translate(${400 + n.x}, ${240 + n.y})`}>
                    <circle
                      cx="0"
                      cy="0"
                      r="9"
                      fill={n.p ? BRAND.deepink : BRAND.ink}
                      stroke={BRAND.cream}
                      strokeWidth="1.5"
                      opacity="0.95"
                    />
                    {n.p ? (
                      <>
                        <line x1="-4" y1="0" x2="4" y2="0" stroke={BRAND.cream} strokeWidth="1" />
                        <line x1="0" y1="-4" x2="0" y2="4" stroke={BRAND.cream} strokeWidth="1" />
                      </>
                    ) : (
                      <line x1="-4" y1="-4" x2="4" y2="4" stroke={BRAND.cream} strokeWidth="1" />
                    )}
                  </g>
                ))}
                {/* Strong Force Bonds (8 connectors) */}
                {nucleons.map((n, i) =>
                  nucleons
                    .slice(i + 1)
                    .map((m, j) => (
                      <line
                        key={`sf_${i}_${j}`}
                        x1={400 + n.x}
                        y1={240 + n.y}
                        x2={400 + m.x}
                        y2={240 + m.y}
                        stroke={BRAND.mark}
                        strokeOpacity={step >= 3 ? 0.7 : 0.2}
                        strokeWidth={step >= 3 ? 1.25 : 0.6}
                        strokeDasharray={step >= 5 ? "none" : "2 3"}
                      />
                    ))
                )}
              </g>
            )}

            {/* Field ignition rays (only steps 1-2) */}
            {step >= 1 && step < 3 && (
              <g>
                {[0, 60, 120, 180, 240, 300].map((deg) => {
                  const r = (deg * Math.PI) / 180;
                  return (
                    <line
                      key={`field_${deg}`}
                      x1={400 + 70 * Math.cos(r)}
                      y1={240 + 70 * Math.sin(r)}
                      x2={400 + 200 * Math.cos(r)}
                      y2={240 + 200 * Math.sin(r)}
                      stroke={BRAND.mark}
                      strokeOpacity="0.55"
                      strokeWidth="0.75"
                      strokeDasharray="3 3"
                    />
                  );
                })}
              </g>
            )}

            {/* Electron cloud */}
            {step >= 3 &&
              electronSwarm.map((e, idx) => {
                const orbit = 90;
                const orbitX = 1;
                const orbitY = 0.42;
                const phaseX = idx * 0.5;
                const phaseY = idx * 0.5 + Math.PI / 2;
                return (
                  <motion.circle
                    key={`e_${idx}`}
                    cx={400 + orbitX * orbit * Math.cos(phaseX)}
                    cy={240 + orbitY * orbit * Math.sin(phaseY)}
                    r="2.5"
                    fill={BRAND.deepink}
                    animate={{
                      cx: [
                        400 + orbitX * orbit * Math.cos(phaseX),
                        400 + orbitX * orbit * Math.cos(phaseX + Math.PI),
                      ],
                      cy: [
                        240 + orbitY * orbit * Math.sin(phaseY),
                        240 + orbitY * orbit * Math.sin(phaseY + Math.PI),
                      ],
                    }}
                    transition={{
                      duration: 4.5 + idx * 0.3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: e.delay,
                    }}
                  />
                );
              })}

            {/* Entanglement bridge (step 4) */}
            {step >= 4 && (
              <g>
                <line
                  x1="60"
                  y1="380"
                  x2="400"
                  y2="240"
                  stroke={BRAND.mark}
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <line
                  x1="740"
                  y1="380"
                  x2="400"
                  y2="240"
                  stroke={BRAND.mark}
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                {/* Remote nucleus icons */}
                {[60, 740].map((x, i) => (
                  <g key={`remote_${i}`} transform={`translate(${x}, 380)`}>
                    <circle cx="0" cy="0" r="10" fill={BRAND.cream} stroke={BRAND.deepink} strokeWidth="1.25" />
                    <circle cx="0" cy="0" r="3" fill={BRAND.mark} />
                  </g>
                ))}
                {/* Bell State Marker */}
                <text
                  x="400"
                  y="120"
                  textAnchor="middle"
                  fill={BRAND.deepink}
                  fontFamily="monospace"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="2"
                >
                  |Φ+⟩ = (|00⟩ + |11⟩)/√2
                </text>
              </g>
            )}

            {/* Sealed lock (step 5) */}
            {step >= 5 && (
              <g>
                <polygon
                  points="400,160 460,200 460,280 400,320 340,280 340,200"
                  fill="none"
                  stroke={BRAND.deepink}
                  strokeWidth="2"
                />
                <text
                  x="400"
                  y="430"
                  textAnchor="middle"
                  fill={BRAND.deepink}
                  fontFamily="monospace"
                  fontSize="11"
                  fontWeight="bold"
                  letterSpacing="3"
                >
                  He-4 // IMMUTABLE
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Telemetry Side-by-side */}
        <div className="mt-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-3 font-mono text-xs">
          <div className="border border-[#1A1820]/15 bg-[#EDE3D2] p-3">
            <div className="flex items-center justify-between border-b border-[#1A1820]/10 pb-1 text-[10px] text-[#1A1820]/60 uppercase">
              <span>ELECTRONS K SHELL</span>
              <span className="text-[#9B8EC7] font-bold">NUCLEAR</span>
            </div>
            <div className="mt-2 text-lg font-bold tracking-tight text-[#1A1820]">
              e⁻ = {activeStep.electronCount}
            </div>
            <p className="mt-1 text-[11px] text-[#1A1820]/75 leading-relaxed">
              Quantum probability density at K (1s²)
            </p>
          </div>

          <div className="border border-[#1A1820]/15 bg-[#EDE3D2] p-3">
            <div className="flex items-center justify-between border-b border-[#1A1820]/10 pb-1 text-[10px] text-[#1A1820]/60 uppercase">
              <span>ISOTOPE SPIN</span>
              <span className="font-bold text-[#1A1820]">HALF-LIFE ∞</span>
            </div>
            <div className="mt-2 text-lg font-bold tracking-tight text-[#1A1820]">
              spin = {activeStep.nucleusSpin}
            </div>
            <p className="mt-1 text-[11px] text-[#1A1820]/75 leading-relaxed">
              Strong force binding: 2p + 2n
            </p>
          </div>

          <div className="border border-[#1A1820]/15 bg-[#EDE3D2] p-3">
            <div className="flex items-center justify-between border-b border-[#1A1820]/10 pb-1 text-[10px] text-[#1A1820]/60 uppercase">
              <span>RADIATION</span>
              <span className="font-bold text-[#9B8EC7]">{activeStep.code}</span>
            </div>
            <div className="mt-1.5 space-y-0.5 text-[10.5px]">
              {activeStep.payload.map((p) => (
                <div key={p.key} className="flex justify-between">
                  <span className="text-[#1A1820]/60">{p.key}:</span>
                  <strong className="text-[#1A1820]">{p.val}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-3 font-mono text-[11.5px] text-[#1A1820]/85 text-center max-w-2xl leading-relaxed">
          {activeStep.narrative}
        </p>
      </motion.div>

      {/* Step selector: 6 phase bar */}
      <footer className="relative z-20 mt-4 border-t border-[#1A1820]/15 pt-4 font-mono text-xs">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
          {GENESIS_STEPS.map((s, idx) => (
            <button
              key={s.code}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setStep(idx);
              }}
              className={`cursor-pointer border p-2 text-left transition-all duration-150 ${
                step === idx
                  ? "border-2 border-[#9B8EC7] bg-[#B4D3D9] font-bold"
                  : "border-[#1A1820]/15 bg-[#EDE3D2] hover:border-[#1A1820]/40"
              }`}
            >
              <div className="flex items-center justify-between text-[9px]">
                <span>PHASE 0{idx + 1}</span>
                <span className="h-1.5 w-1.5 bg-[#9B8EC7]" />
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase truncate">{s.code}</div>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#1A1820]/10 pt-3 text-[10px] text-[#1A1820]/55 uppercase">
          <span>HALF-LIFE · INFINITE · He-4 STABLE ISOTOPE</span>
          <span>HALF-LIFE SUPPORT · He-4 PROTOCOL · NUCLEAR LOCK</span>
        </div>
      </footer>
    </section>
  );
}
