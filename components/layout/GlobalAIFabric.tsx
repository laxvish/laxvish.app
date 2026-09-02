"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AIFabric } from "@/components/ui/AIFabric";

export function GlobalAIFabric() {
  const pathname = usePathname();
  const [transitionPhase, setTransitionPhase] = useState<"idle" | "pre" | "warp" | "morph" | "release">("idle");

  useEffect(() => {
    // Trigger Field Continuity Warp on route change
    setTransitionPhase("pre");
    
    const t1 = setTimeout(() => setTransitionPhase("warp"), 200);   // Pre-transition (200ms)
    const t2 = setTimeout(() => setTransitionPhase("morph"), 600);  // Warp phase (400ms)
    const t3 = setTimeout(() => setTransitionPhase("release"), 1000); // Morph phase (400ms)
    const t4 = setTimeout(() => setTransitionPhase("idle"), 1300);  // Release phase (300ms)
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
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
