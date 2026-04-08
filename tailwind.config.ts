import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        neonCyan: "#00F0FF",
        vaultAmber: "#FFB800",
        charcoal: "#1A1A24",
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
