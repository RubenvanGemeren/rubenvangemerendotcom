export const darkTheme = {
  name: "dark",
  displayName: "Dark",

  font: {
    family: {
      primary: "Inter",
      fallback: "system-ui, -apple-system, sans-serif",
    },
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  colors: {
    primary: "#818cf8",      // Lighter Indigo for dark mode
    secondary: "#a78bfa",    // Lighter Purple
    accent: "#22d3ee",       // Lighter Cyan
    background: "#0f172a",   // Slate-900
    surface: "#1e293b",      // Slate-800
    text: {
      primary: "#f1f5f9",    // Slate-100
      secondary: "#cbd5e1",  // Slate-300
      subtle: "#94a3b8",     // Slate-400
    },
    border: {
      default: "rgba(148, 163, 184, 0.2)",
      strong: "rgba(148, 163, 184, 0.4)",
    },
  },

  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
    card: "1rem",
    button: "0.5rem",
  },

  shadows: {
    none: "none",
    sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
    md: "0 4px 6px rgba(0, 0, 0, 0.4)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.5)",
    clay: "0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    clayHover: "0 4px 16px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  },

  components: {
    header: {
      background: "rgba(15, 23, 42, 0.8)", // background with opacity
      borderColor: "rgba(148, 163, 184, 0.2)",
      backdropBlur: true,
      sticky: true,
      height: "4rem",
    },

    card: {
      background: "#1e293b", // surface
      borderRadius: "1rem",
      padding: {
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
      },
      shadow: "clay",
      shadowHover: "clayHover",
    },

    tag: {
      background: "rgba(129, 140, 248, 0.2)", // primary/20 for better contrast
      textColor: "#818cf8", // primary
      borderRadius: "9999px",
      padding: {
        x: "0.625rem",
        y: "0.125rem",
      },
      fontSize: "0.75rem",
      fontWeight: 500,
    },

    navLink: {
      borderRadius: "0.5rem",
      padding: {
        x: "0.75rem",
        y: "0.5rem",
      },
      fontSize: "0.875rem",
      fontWeight: 500,
      active: {
        background: "rgba(129, 140, 248, 0.2)", // primary/20
        textColor: "#818cf8", // primary
      },
      inactive: {
        textColor: "#cbd5e1", // text.secondary
        hoverBackground: "#1e293b", // surface
        hoverTextColor: "#f1f5f9", // text.primary
      },
    },

    chart: {
      colors: ["#818cf8", "#a78bfa", "#22d3ee", "#34d399", "#fbbf24"],
      axisColor: "#cbd5e1", // text.secondary
      axisFontSize: "0.75rem",
      tooltip: {
        background: "#1e293b", // surface
        borderColor: "#0f172a", // background
        borderRadius: "0.5rem",
        fontSize: "0.75rem",
      },
      barRadius: [4, 4, 0, 0],
    },

    footer: {
      borderColor: "rgba(148, 163, 184, 0.2)",
      textColor: "#cbd5e1", // text.secondary
      linkHoverColor: "#818cf8", // primary
    },

    themeSelector: {
      background: "#1e293b", // surface
      textColor: "#f1f5f9", // text.primary
      borderColor: "rgba(148, 163, 184, 0.2)", // border.default
      borderRadius: "0.5rem", // button
      padding: {
        x: "0.75rem", // 12px
        y: "0.375rem", // 6px
      },
      fontSize: "0.875rem", // sm
      fontWeight: 500, // medium
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      arrowColor: "#cbd5e1", // text.secondary
      hover: {
        borderColor: "#818cf8", // primary
      },
      focus: {
        borderColor: "#818cf8", // primary
        ringColor: "rgba(129, 140, 248, 0.2)", // primary/20
      },
      option: {
        background: "#1e293b", // surface
        textColor: "#f1f5f9", // text.primary
        hoverBackground: "rgba(129, 140, 248, 0.2)", // primary/20
      },
    },

    typography: {
      h1: {
        fontSize: "2.25rem",
        fontWeight: 700,
        lineHeight: 1.2,
        color: "#f1f5f9", // text.primary
      },
      h2: {
        fontSize: "1.875rem",
        fontWeight: 600,
        lineHeight: 1.3,
        color: "#f1f5f9", // text.primary
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
        color: "#f1f5f9", // text.primary
      },
      body: {
        fontSize: "1rem",
        lineHeight: 1.6,
        color: "#f1f5f9", // text.primary
      },
      bodySecondary: {
        fontSize: "0.875rem",
        lineHeight: 1.5,
        color: "#cbd5e1", // text.secondary
      },
    },
  },
} as const;

