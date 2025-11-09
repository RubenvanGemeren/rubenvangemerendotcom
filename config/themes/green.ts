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
    primary: "#2d7a4f",      // Darker green
    secondary: "#4a90e2",    // Blue (complementary)
    accent: "#f97316",       // Orange (complementary)
    background: "#f0fdf4",   // Green-50 (light green tint)
    surface: "#ffffff",
    text: {
      primary: "#1f2937",    // Gray tint
      secondary: "#6b7280",  // Gray-500
      subtle: "#9ca3af",     // Gray-400
    },
    border: {
      default: "rgba(45, 122, 79, 0.2)", // Darker green with opacity
      strong: "rgba(45, 122, 79, 0.4)",
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
      background: "rgba(240, 253, 244, 0.8)", // background with opacity (light green)
      borderColor: "rgba(45, 122, 79, 0.2)",
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
      background: "rgba(45, 122, 79, 0.1)", // primary/10
      textColor: "#2d7a4f", // primary
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
        background: "rgba(45, 122, 79, 0.1)", // primary/10
        textColor: "#2d7a4f", // primary
      },
      inactive: {
        textColor: "#6b7280", // text.secondary
        hoverBackground: "#ffffff", // surface
        hoverTextColor: "#1f2937", // text.primary
      },
    },

    chart: {
      colors: ["#2d7a4f", "#4a90e2", "#f97316", "#7c3aed", "#10b981"], // Darker green, blue, orange, purple, emerald
      axisColor: "#6b7280", // text.secondary
      axisFontSize: "0.75rem",
      tooltip: {
        background: "#ffffff", // surface
        borderColor: "#f0fdf4", // background (light green)
        borderRadius: "0.5rem",
        fontSize: "0.75rem",
      },
      barRadius: [4, 4, 0, 0],
    },

    footer: {
      borderColor: "rgba(45, 122, 79, 0.2)",
      textColor: "#6b7280", // text.secondary
      linkHoverColor: "#2d7a4f", // primary
    },

    themeSelector: {
      background: "#ffffff", // surface
      textColor: "#1f2937", // text.primary
      borderColor: "rgba(45, 122, 79, 0.2)", // border.default
      borderRadius: "0.5rem", // button
      padding: {
        x: "0.75rem", // 12px
        y: "0.375rem", // 6px
      },
      fontSize: "0.875rem", // sm
      fontWeight: 500, // medium
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      arrowColor: "#6b7280", // text.secondary
      hover: {
        borderColor: "#2d7a4f", // primary
      },
      focus: {
        borderColor: "#2d7a4f", // primary
        ringColor: "rgba(45, 122, 79, 0.2)", // primary/20
      },
      option: {
        background: "#ffffff", // surface
        textColor: "#1f2937", // text.primary
        hoverBackground: "rgba(45, 122, 79, 0.1)", // primary/10
      },
    },

    typography: {
      h1: {
        fontSize: "2.25rem",
        fontWeight: 700,
        lineHeight: 1.2,
        color: "#1f2937", // text.primary (same as default)
      },
      h2: {
        fontSize: "1.875rem",
        fontWeight: 600,
        lineHeight: 1.3,
        color: "#1f2937", // text.primary (same as default)
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
        color: "#1f2937", // text.primary (same as default)
      },
      body: {
        fontSize: "1rem",
        lineHeight: 1.6,
        color: "#1f2937", // text.primary (same as default)
      },
      bodySecondary: {
        fontSize: "0.875rem",
        lineHeight: 1.5,
        color: "#6b7280", // text.secondary (same as default)
      },
    },
  },
} as const;

