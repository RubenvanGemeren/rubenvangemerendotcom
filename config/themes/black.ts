export const blackTheme = {
  name: "black",
  displayName: "Black",

  font: {
    family: {
      primary: "Space Mono",
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
    primary: "#292f2f",      // Lighter teal for dark mode
    secondary: "#3a3b39",    // Lighter blue
    accent: "#9fa49c",       // Lighter orange
    background: "#1c1c1c",   // Gray tint
    surface: "#43494f",      // Gray-700 (lighter than background)
    text: {
      primary: "#9fa49c",    // Gray-50
      secondary: "#96a88b",  // Gray-300
      subtle: "#abbf9e",     // Gray-400
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
      background: "#43494f", // surface
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
      textColor: "#1c1c1c", // primary
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
        textColor: "#1c1c1c", // primary
      },
      inactive: {
        textColor: "#96a88b", // text.secondary
        hoverBackground: "#43494f", // surface
        hoverTextColor: "#9fa49c", // text.primary
      },
    },

    chart: {
      colors: ["#5ba3a3", "#6ba3e2", "#fb923c", "#7c3aed", "#10b981"],
      axisColor: "#96a88b", // text.secondary
      axisFontSize: "0.75rem",
      tooltip: {
        background: "#43494f", // surface
        borderColor: "#3a3b39", // background
        borderRadius: "0.5rem",
        fontSize: "0.75rem",
      },
      barRadius: [4, 4, 0, 0],
    },

    footer: {
      borderColor: "rgba(64, 128, 128, 0.3)",
      textColor: "#96a88b", // text.secondary
      linkHoverColor: "#1c1c1c", // primary
    },

    themeSelector: {
      background: "#43494f", // surface
      textColor: "#9fa49c", // text.primary
      borderColor: "rgba(1c1c1c, 0.3)", // border.default
      borderRadius: "0.5rem", // button
      padding: {
        x: "0.75rem", // 12px
        y: "0.375rem", // 6px
      },
      fontSize: "0.875rem", // sm
      fontWeight: 500, // medium
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      arrowColor: "#96a88b", // text.secondary
      hover: {
        borderColor: "#1c1c1c", // primary
      },
      focus: {
        borderColor: "#1c1c1c", // primary
        ringColor: "rgba(1c1c1c, 0.2)", // primary/20
      },
      option: {
        background: "#43494f", // surface
        textColor: "#9fa49c", // text.primary
        hoverBackground: "rgba(1c1c1c, 0.2)", // primary/20
      },
    },

    typography: {
      h1: {
        fontSize: "2.25rem",
        fontWeight: 700,
        lineHeight: 1.2,
        color: "#9fa49c", // text.primary
      },
      h2: {
        fontSize: "1.875rem",
        fontWeight: 600,
        lineHeight: 1.3,
        color: "#9fa49c", // text.primary
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
        color: "#9fa49c", // text.primary
      },
      body: {
        fontSize: "1rem",
        lineHeight: 1.6,
        color: "#9fa49c", // text.primary
      },
      bodySecondary: {
        fontSize: "0.875rem",
        lineHeight: 1.5,
        color: "#96a88b", // text.secondary
      },
    },
  },
} as const;

