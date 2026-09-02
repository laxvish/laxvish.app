"use client";

import Link from "next/link";
import { motion, type MotionProps, type MotionStyle } from "framer-motion";
import type { ComponentType, ElementType, ReactNode, Ref } from "react";

/**
 * A component that accepts both DOM attributes and framer-motion props.
 */
export type MotionRenderable = ComponentType<{
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
  style?: MotionStyle;
  className?: string;
} & MotionProps & Record<string, unknown>>;

/**
 * Motion wrappers are built once, at module scope.
 *
 * Calling `motion.create(Component)` inside a render body mints a *new*
 * component type on every parent render. React sees a different type and
 * unmounts + remounts the whole subtree, discarding focus, scroll position and
 * any internal state — which is exactly what the polymorphic `as` prop used to
 * trigger here. Resolving from this map is a lookup, not a creation, so element
 * identity stays stable across renders.
 */
const motionRegistry = new Map<ElementType, MotionRenderable>([
  ["button", motion.button as unknown as MotionRenderable],
  ["a", motion.a as unknown as MotionRenderable],
  ["div", motion.div as unknown as MotionRenderable],
  ["span", motion.span as unknown as MotionRenderable],
  ["article", motion.article as unknown as MotionRenderable],
  ["section", motion.section as unknown as MotionRenderable],
  ["p", motion.p as unknown as MotionRenderable],
  [Link, motion.create(Link) as unknown as MotionRenderable],
]);

/**
 * Resolve a motion-capable wrapper for `Component`.
 *
 * Unknown types fall back to a plain `div` wrapper and warn in development, so
 * a new `as` target is surfaced immediately instead of silently losing its
 * animation. Add it to `motionRegistry` when that happens.
 */
export function resolveMotionComponent(Component: ElementType): MotionRenderable {
  const resolved = motionRegistry.get(Component);
  if (resolved) {
    return resolved;
  }

  if (process.env.NODE_ENV !== "production") {
    const label =
      typeof Component === "string" ? Component : (Component as { name?: string })?.name ?? "unknown";
    console.warn(
      `[withMotion] no motion wrapper registered for "${label}"; falling back to div. ` +
        `Add it to motionRegistry in components/ui/withMotion.ts`,
    );
  }

  return motion.div as unknown as MotionRenderable;
}
