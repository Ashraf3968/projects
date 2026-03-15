import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0f1a",
        obsidian: "#0f1424",
        gold: "#d4b45a",
        platinum: "#eef2ff",
        muted: "#a9b0c7",
        glass: "rgba(255, 255, 255, 0.08)",
        "glass-strong": "rgba(255, 255, 255, 0.14)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(0, 0, 0, 0.45)",
        gold: "0 20px 60px rgba(212, 180, 90, 0.35)",
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at 10% 20%, rgba(103, 86, 203, 0.15), transparent 45%), radial-gradient(circle at 90% 0%, rgba(212, 180, 90, 0.18), transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
