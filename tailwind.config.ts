import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#000000", // pure cinematic void black
        neonCyan: "#F2F2F2", // lunar titanium silver / starlight
        vaultAmber: "#B6B09F", // warm champagne / brushed brass / golden thread
        charcoal: "#EAE4D5", // warm alabaster / parchment typography
        voidDark: "#070709", // monolithic machine surface
        voidSurface: "#0E0F14", // elevated titanium chamber
        voidBorder: "rgba(182, 176, 159, 0.18)", // precision micro-machined seam
        goldThread: "#C5A880", // the living protagonist thread
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
