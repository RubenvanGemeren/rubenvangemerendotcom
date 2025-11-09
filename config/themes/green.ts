export const greenTheme = {
  name: "green",
  displayName: "Green",

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
    primary: "#059669",      // Emerald-600 (darker green)
    secondary: "#7c3aed",     // Purple (complementary to green)
    accent: "#f97316",       // Orange (complementary to green)
    background: "#ecfdf5",   // Emerald-50 (light green tint)
    surface: "#ffffff",
    text: {
      primary: "#022c22",    // Emerald-950 (very dark green)
      secondary: "#065f46",  // Emerald-800 (dark green)
      subtle: "#047857",     // Emerald-700
    },
    border: {
      default: "rgba(5, 150, 105, 0.2)", // Emerald-600 with opacity
      strong: "rgba(5, 150, 105, 0.4)",
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
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    clay: "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    clayHover: "0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
  },

  components: {
    header: {
      background: "rgba(236, 253, 245, 0.8)", // background with opacity
      borderColor: "rgba(5, 150, 105, 0.2)",
      backdropBlur: true,
      sticky: true,
      height: "4rem",
    },

    card: {
      background: "#ffffff",
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
      background: "rgba(5, 150, 105, 0.1)", // primary/10
      textColor: "#059669", // primary
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
        background: "rgba(5, 150, 105, 0.1)", // primary/10
        textColor: "#059669", // primary
      },
      inactive: {
        textColor: "#065f46", // text.secondary
        hoverBackground: "#ffffff", // surface
        hoverTextColor: "#022c22", // text.primary
      },
    },

    chart: {
      colors: ["#059669", "#7c3aed", "#f97316", "#a855f7", "#f59e0b"], // Darker green, purple, orange, purple variant, amber
      axisColor: "#065f46", // text.secondary
      axisFontSize: "0.75rem",
      tooltip: {
        background: "#ffffff", // surface
        borderColor: "#ecfdf5", // background
        borderRadius: "0.5rem",
        fontSize: "0.75rem",
      },
      barRadius: [4, 4, 0, 0],
    },

    footer: {
      borderColor: "rgba(5, 150, 105, 0.2)",
      textColor: "#065f46", // text.secondary
      linkHoverColor: "#059669", // primary
    },

    themeSelector: {
      background: "#ffffff", // surface
      textColor: "#022c22", // text.primary
      borderColor: "rgba(5, 150, 105, 0.2)", // border.default
      borderRadius: "0.5rem", // button
      padding: {
        x: "0.75rem", // 12px
        y: "0.375rem", // 6px
      },
      fontSize: "0.875rem", // sm
      fontWeight: 500, // medium
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      arrowColor: "#065f46", // text.secondary
      hover: {
        borderColor: "#059669", // primary
      },
      focus: {
        borderColor: "#059669", // primary
        ringColor: "rgba(5, 150, 105, 0.2)", // primary/20
      },
      option: {
        background: "#ffffff", // surface
        textColor: "#022c22", // text.primary
        hoverBackground: "rgba(5, 150, 105, 0.1)", // primary/10
      },
    },

    typography: {
      h1: {
        fontSize: "2.25rem",
        fontWeight: 700,
        lineHeight: 1.2,
        color: "#022c22", // text.primary
      },
      h2: {
        fontSize: "1.875rem",
        fontWeight: 600,
        lineHeight: 1.3,
        color: "#022c22", // text.primary
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
        color: "#022c22", // text.primary
      },
      body: {
        fontSize: "1rem",
        lineHeight: 1.6,
        color: "#022c22", // text.primary
      },
      bodySecondary: {
        fontSize: "0.875rem",
        lineHeight: 1.5,
        color: "#065f46", // text.secondary
      },
    },
  },
} as const;

