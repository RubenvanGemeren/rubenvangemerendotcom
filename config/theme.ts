export const theme = {
  colors: {
    primary: "#6366f1", // Indigo
    secondary: "#8b5cf6", // Purple
    accent: "#06b6d4", // Cyan
    background: "#f8fafc", // Slate-50
    surface: "#ffffff",
    text: "#1e293b", // Slate-800
    subtle: "#64748b", // Slate-500
  },
  radius: {
    card: "1rem",
    button: "0.5rem",
  },
  shadows: {
    clay: "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    clayHover: "0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
  },
  chart: {
    colors: ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"],
  },
} as const;

