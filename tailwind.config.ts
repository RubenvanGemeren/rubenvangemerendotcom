import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        "text-subtle": "var(--color-text-subtle)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        button: "var(--radius-button)",
      },
      boxShadow: {
        clay: "var(--shadow-clay)",
        "clay-hover": "var(--shadow-clay-hover)",
      },
      fontFamily: {
        primary: "var(--font-primary)",
      },
    },
  },
  plugins: [],
};
export default config;

