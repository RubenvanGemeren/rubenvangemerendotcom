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
    primary: "#5ba3a3",      // Lighter teal for dark mode
    secondary: "#6ba3e2",    // Lighter blue
    accent: "#fb923c",       // Lighter orange
    background: "#1f2937",   // Gray tint
    surface: "#374151",      // Gray-700 (lighter than background)
    text: {
      primary: "#f9fafb",    // Gray-50
      secondary: "#d1d5db",  // Gray-300
      subtle: "#9ca3af",     // Gray-400
    },
    border: {
      default: "rgba(64, 128, 128, 0.3)",
      strong: "rgba(64, 128, 128, 0.5)",
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
      background: "rgba(31, 41, 55, 0.8)", // background with opacity
      borderColor: "rgba(64, 128, 128, 0.3)",
      backdropBlur: true,
      sticky: true,
      height: "4rem",
    },

    card: {
      background: "#374151", // surface
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
      background: "rgba(91, 163, 163, 0.2)", // primary/20 for better contrast
      textColor: "#5ba3a3", // primary
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
        background: "rgba(91, 163, 163, 0.2)", // primary/20
        textColor: "#5ba3a3", // primary
      },
      inactive: {
        textColor: "#d1d5db", // text.secondary
        hoverBackground: "#374151", // surface
        hoverTextColor: "#f9fafb", // text.primary
      },
    },

    chart: {
      colors: ["#5ba3a3", "#6ba3e2", "#fb923c", "#7c3aed", "#10b981"],
      axisColor: "#d1d5db", // text.secondary
      axisFontSize: "0.75rem",
      tooltip: {
        background: "#374151", // surface
        borderColor: "#1f2937", // background
        borderRadius: "0.5rem",
        fontSize: "0.75rem",
      },
      barRadius: [4, 4, 0, 0],
    },

    footer: {
      borderColor: "rgba(64, 128, 128, 0.3)",
      textColor: "#d1d5db", // text.secondary
      linkHoverColor: "#5ba3a3", // primary
    },

    themeSelector: {
      background: "#374151", // surface
      textColor: "#f9fafb", // text.primary
      borderColor: "rgba(64, 128, 128, 0.3)", // border.default
      borderRadius: "0.5rem", // button
      padding: {
        x: "0.75rem", // 12px
        y: "0.375rem", // 6px
      },
      fontSize: "0.875rem", // sm
      fontWeight: 500, // medium
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      arrowColor: "#d1d5db", // text.secondary
      hover: {
        borderColor: "#5ba3a3", // primary
      },
      focus: {
        borderColor: "#5ba3a3", // primary
        ringColor: "rgba(91, 163, 163, 0.2)", // primary/20
      },
      option: {
        background: "#374151", // surface
        textColor: "#f9fafb", // text.primary
        hoverBackground: "rgba(91, 163, 163, 0.2)", // primary/20
      },
    },

    typography: {
      h1: {
        fontSize: "2.25rem",
        fontWeight: 700,
        lineHeight: 1.2,
        color: "#f9fafb", // text.primary
      },
      h2: {
        fontSize: "1.875rem",
        fontWeight: 600,
        lineHeight: 1.3,
        color: "#f9fafb", // text.primary
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
        color: "#f9fafb", // text.primary
      },
      body: {
        fontSize: "1rem",
        lineHeight: 1.6,
        color: "#f9fafb", // text.primary
      },
      bodySecondary: {
        fontSize: "0.875rem",
        lineHeight: 1.5,
        color: "#d1d5db", // text.secondary
      },
    },
  },
} as const;

