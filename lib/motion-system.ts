// Motion System: Execution, Decision, Validation
import type { Easing } from "framer-motion";

// 1. Execution Phase (Workers)
// Fast, precise, directional motion. Used for task initiation, entry animations, user-triggered actions.
// Motion style: quick slide or transform, minimal easing, high clarity.
export const ExecutionPhase = {
  duration: {
    micro: 0.15, // 150ms
    standard: 0.3, // 300ms
  },
  ease: [0.25, 1, 0.5, 1] as Easing, // Quick snap, precise
};

// 2. Decision Phase (Brain)
// Slight delay before movement. Used for transitions between states or sections.
// Motion style: smooth easing, small pauses (100–200ms), layered movement.
export const DecisionPhase = {
  duration: {
    standard: 0.4, // 400ms
    system: 0.7, // 700ms
  },
  delay: 0.15, // 150ms pause before action
  ease: [0.4, 0, 0.2, 1] as Easing, // Smooth, contemplative easing
};

// 3. Validation Phase (Brakes)
// Introduce resistance and control. Used for confirmations, CTA responses, final states.
// Motion style: slower easing, "halt before complete", slight compression/tension before release.
export const ValidationPhase = {
  duration: {
    standard: 0.5, // 500ms
    system: 0.8, // 800ms
  },
  // Custom spring to simulate tension, resistance, and a halt before complete.
  // Anticipation curve: slightly back away before proceeding, or resist moving.
  ease: [0.68, -0.15, 0.265, 1.3] as Easing, // Bouncy, tense easing
};
