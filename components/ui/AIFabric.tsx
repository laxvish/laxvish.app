"use client";

/**
 * PaperGrain — the editorial page texture.
 *
 * Replaces the banned AIFabric cluster (floating gradient blobs, perpetual
 * motion, blur glow, dark obsidian mesh). See AGENTS.md §1, §4, §5.
 *
 * What this is: a static, almost-invisible paper grain that lets the binding
 * palette do the work. The page is paper; the type is the protagonist.
 *
 * The original AIFabric had a complex prop signature (intensity / variant /
 * transitionPhase) that fed the parallax + glow mesh. With that component
 * removed, those props become no-ops. We keep them as optional inputs so
 * existing call sites still type-check.
 */
interface PaperGrainProps {
  intensity?: 1 | 2 | 3;
  variant?: "default" | "workers" | "brain" | "brakes" | "solutions";
  transitionPhase?: "idle" | "pre" | "warp" | "morph" | "release";
  theme?: "dark" | "light";
}

export function PaperGrain({ intensity = 2 }: PaperGrainProps) {
  const opacity = intensity === 1 ? 0.06 : intensity === 2 ? 0.045 : 0.025;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage:
          "radial-gradient(rgba(26, 24, 32, 0.6) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        opacity,
      }}
    />
  );
}

/**
 * Backward-compatible alias. Old code importing AIFabric still gets a paper
 * page instead of the banned blob field.
 */
export function AIFabric(props: PaperGrainProps) {
  return <PaperGrain {...props} />;
}
