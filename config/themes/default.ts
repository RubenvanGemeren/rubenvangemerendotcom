export const defaultTheme = {
  name: "default",
  displayName: "Light",

  // Font configuration
  font: {
    family: {
      primary: "Inter",
      fallback: "system-ui, -apple-system, sans-serif",
    },
    sizes: {
      xs: "0.75rem",      // 12px
      sm: "0.875rem",     // 14px
      base: "1rem",       // 16px
      lg: "1.125rem",     // 18px
      xl: "1.25rem",      // 20px
      "2xl": "1.5rem",    // 24px
      "3xl": "1.875rem",  // 30px
      "4xl": "2.25rem",   // 36px
      "5xl": "3rem",      // 48px
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // Color palette
  colors: {
    primary: "#408080",      // Teal
    secondary: "#4a90e2",    // Blue (complementary to teal)
    accent: "#f97316",       // Orange (complementary to teal)
    background: "#f8fafc",   // Slate-50
    surface: "#ffffff",
    text: {
      primary: "#1f2937",    // Gray tint
      secondary: "#6b7280",  // Gray-500
      subtle: "#9ca3af",     // Gray-400
    },
    border: {
      default: "rgba(64, 128, 128, 0.2)", // Teal with opacity
      strong: "rgba(64, 128, 128, 0.4)",
    },
  },

  // Border radius
  radius: {
    none: "0",
    sm: "0.25rem",      // 4px
    md: "0.5rem",       // 8px
    lg: "0.75rem",      // 12px
    xl: "1rem",         // 16px
    full: "9999px",
    card: "1rem",
    button: "0.5rem",
  },

  // Shadows
  shadows: {
    none: "none",
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    clay: "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    clayHover: "0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
  },

  // Component-specific styling
  components: {
    // Header styling
    header: {
      background: "rgba(248, 250, 252, 0.8)", // background with opacity
      borderColor: "rgba(64, 128, 128, 0.2)",
      backdropBlur: true,
      sticky: true,
      height: "4rem", // 64px
    },

    // Card styling
    card: {
      background: "#ffffff",
      borderRadius: "1rem",
      padding: {
        sm: "1rem",    // 16px
        md: "1.5rem",  // 24px
        lg: "2rem",    // 32px
      },
      shadow: "clay",
      shadowHover: "clayHover",
    },

    // Tag/Badge styling
    tag: {
      background: "rgba(64, 128, 128, 0.1)", // primary/10
      textColor: "#408080", // primary
      borderRadius: "9999px", // full
      padding: {
        x: "0.625rem", // 10px
        y: "0.125rem", // 2px
      },
      fontSize: "0.75rem", // xs
      fontWeight: 500, // medium
    },

    // Navigation link styling
    navLink: {
      borderRadius: "0.5rem", // button
      padding: {
        x: "0.75rem", // 12px
        y: "0.5rem",  // 8px
      },
      fontSize: "0.875rem", // sm
      fontWeight: 500, // medium
      active: {
        background: "rgba(64, 128, 128, 0.1)", // primary/10
        textColor: "#408080", // primary
      },
      inactive: {
        textColor: "#6b7280", // text.secondary
        hoverBackground: "#ffffff", // surface
        hoverTextColor: "#1f2937", // text.primary
      },
    },

    // Chart styling
    chart: {
      colors: ["#408080", "#4a90e2", "#f97316", "#7c3aed", "#10b981"],
      axisColor: "#6b7280", // text.secondary
      axisFontSize: "0.75rem", // xs
      tooltip: {
        background: "#ffffff", // surface
        borderColor: "#f8fafc", // background
        borderRadius: "0.5rem", // button
        fontSize: "0.75rem", // xs
      },
      barRadius: [4, 4, 0, 0],
    },

    // Footer styling
    footer: {
      borderColor: "rgba(64, 128, 128, 0.2)",
      textColor: "#6b7280", // text.secondary
      linkHoverColor: "#408080", // primary
    },

    // Theme selector styling
    themeSelector: {
      background: "#ffffff", // surface
      textColor: "#1f2937", // text.primary
      borderColor: "rgba(64, 128, 128, 0.2)", // border.default
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
        borderColor: "#408080", // primary
      },
      focus: {
        borderColor: "#408080", // primary
        ringColor: "rgba(64, 128, 128, 0.2)", // primary/20
      },
      option: {
        background: "#ffffff", // surface
        textColor: "#1f2937", // text.primary
        hoverBackground: "rgba(64, 128, 128, 0.1)", // primary/10
      },
    },

    // Typography styling
    typography: {
      h1: {
        fontSize: "2.25rem", // 4xl
        fontWeight: 700, // bold
        lineHeight: 1.2,
        color: "#1f2937", // text.primary
      },
      h2: {
        fontSize: "1.875rem", // 3xl
        fontWeight: 600, // semibold
        lineHeight: 1.3,
        color: "#1f2937", // text.primary
      },
      h3: {
        fontSize: "1.5rem", // 2xl
        fontWeight: 600, // semibold
        lineHeight: 1.4,
        color: "#1f2937", // text.primary
      },
      body: {
        fontSize: "1rem", // base
        lineHeight: 1.6,
        color: "#1f2937", // text.primary
      },
      bodySecondary: {
        fontSize: "0.875rem", // sm
        lineHeight: 1.5,
        color: "#6b7280", // text.secondary
      },
    },
  },
} as const;

