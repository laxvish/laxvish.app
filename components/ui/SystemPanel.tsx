import { type ReactNode } from "react";

/**
 * PaperPanel — the binding surface primitive.
 *
 * Replaces the LLM SystemPanel (3D tilt on hover, scale 1.02 hover, scale
 * 0.96 tap, mouse-tracked radial gradient). A panel is a panel: a flat
 * parchment surface with a hairline rule. No 3D tilt. No scale hover.
 * No mouse-tracked glow. The forbidden cluster was B5/B8/B11/B14/F3/F4.
 */
interface PaperPanelProps {
  children: ReactNode;
  className?: string;
  as?: any;
}

export function PaperPanel({
  children,
  className = "",
  as: Component = "div",
}: PaperPanelProps) {
  return <Component className={className}>{children}</Component>;
}

// Backward-compatible alias.
export const SystemPanel = PaperPanel;
