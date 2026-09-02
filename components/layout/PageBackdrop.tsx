"use client";

import { usePathname } from "next/navigation";

/**
 * PageBackdrop — the deep-page layer of the Control Surface.
 *
 * A static, monochrome machine-field: the same 24px radial dot grain as the
 * base surface plus a single hairline ruled horizon. No rotating blobs, no
 * blur, no mix-blend, no perpetual motion — the movement budget belongs to
 * the hero machine alone (AGENTS.md §3/§4).
 *
 * Replaces GlobalAIFabric/AIFabric as the page-level background.
 */
export function PageBackdrop() {
  const pathname = usePathname();

  // The home page composes its own surface (hero machine + bands).
  if (pathname === "/") return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-1]">
      <div className="hero-void-mesh absolute inset-0" />
      {/* Ruled horizon: one static hairline, the quietest possible instrument mark */}
      <div className="absolute inset-x-0 top-28 hidden border-t border-charcoal/10 lg:block" />
    </div>
  );
}
