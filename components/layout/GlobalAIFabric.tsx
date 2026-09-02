"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AIFabric } from "@/components/ui/AIFabric";

type TransitionPhase = "idle" | "pre" | "warp" | "morph" | "release";

const TRANSITION_SCHEDULE: ReadonlyArray<{ at: number; phase: TransitionPhase }> = [
  { at: 0, phase: "pre" },
  { at: 200, phase: "warp" },
  { at: 600, phase: "morph" },
  { at: 1000, phase: "release" },
  { at: 1300, phase: "idle" },
] as const;

export function GlobalAIFabric() {
  const pathname = usePathname();
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle");

  useEffect(() => {
    // The Hero handles its own full-intensity AIFabric; nothing is mounted on
    // "/" so there is no transition to run.
    if (pathname === "/") return;

    // Every phase change is dispatched from a timer callback rather than
    // synchronously in this effect body, and all timers are cleared together on
    // unmount or on the next navigation.
    const timers = TRANSITION_SCHEDULE.map(({ at, phase }) =>
      setTimeout(() => setTransitionPhase(phase), at),
    );

    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  // The Hero handles its own full-intensity AIFabric.
  if (pathname === "/") return null;

  // Determine intensity and variant based on route
  let intensity: 1 | 2 | 3 = 2;
  let variant: "default" | "workers" | "brain" | "brakes" | "solutions" = "default";

  // Focus pages (forms, pricing, trust, contact)
  if (
    pathname.startsWith("/contact") || 
    pathname.startsWith("/security-trust") || 
    pathname.startsWith("/careers/apply") ||
    pathname.startsWith("/faq") ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms")
  ) {
    intensity = 3;
  }

  // Variant matching
  if (pathname.startsWith("/workers")) variant = "workers";
  if (pathname.startsWith("/brain")) variant = "brain";
  if (pathname.startsWith("/brakes")) variant = "brakes";
  if (pathname.startsWith("/solutions")) variant = "solutions";

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <AIFabric 
        intensity={intensity} 
        variant={variant} 
        transitionPhase={transitionPhase} 
      />
    </div>
  );
}
