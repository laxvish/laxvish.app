import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Binding brand palette — see AGENTS.md §1
        cream: "#F2EAE0",          // Surface (base) — Cream Ash, paper
        mist: "#B4D3D9",           // Surface (elevated) — Mist Teal, panels
        ink: "#BDA6CE",            // Ink (body) — Lavender Mist, body text
        mark: "#9B8EC7",           // Mark (brand accent) — Lavender Indigo, action only
        // Editorial neutrals derived from the palette
        deepink: "#1A1820",        // High-contrast display ink (warm near-black)
        deepVoid: "#0E0D12",       // The Thread on cream (a near-black violet)
        parchment: "#EDE3D2",     // Slightly cooler cream for separators
        ruleHair: "rgba(157, 142, 199, 0.22)", // Hairline rules — mark at low alpha
        ruleHairInk: "rgba(189, 166, 206, 0.28)", // Hairline rules — ink at low alpha
        // Legacy aliases retained so internal references do not break; do not introduce
        // new usage outside the binding palette.
        obsidian: "#F2EAE0",       // alias → cream
        neonCyan: "#BDA6CE",       // alias → ink
        vaultAmber: "#9B8EC7",     // alias → mark
        charcoal: "#1A1820",       // alias → deepink
        voidDark: "#F2EAE0",       // alias → cream
        voidSurface: "#EDE3D2",    // alias → parchment
        goldThread: "#9B8EC7",     // alias → mark
        voidBorder: "rgba(157, 142, 199, 0.22)",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "0.85" },
        },
        threadDraw: {
          "0%": { strokeDashoffset: "1200" },
          "100%": { strokeDashoffset: "0" },
        },
        slowFade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "thread-draw": "threadDraw 2.4s ease-out forwards",
        "slow-fade": "slowFade 900ms ease-out forwards",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "Times New Roman", "serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
