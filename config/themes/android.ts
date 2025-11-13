export const androidTheme = {
  name: "android",
  displayName: "Android",

  font: {
    family: {
      primary: "Roboto",
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

  // Material Design 3 Pastel Orange Color Palette
  // Base seed color: #FFB74D (Pastel Orange)
  colors: {
    primary: "#8E4800",      // Primary (tone 40) - Main accent
    secondary: "#765847",    // Secondary - Muted brown-orange
    accent: "#675940",       // Tertiary - Earthy brown tertiary tone
    background: "#FFF8F3",   // Background - Subtle warm background
    surface: "#FFF8F3",      // Surface - Neutral surface
    text: {
      primary: "#1C1B18",    // On Background / On Surface
      secondary: "#51453B",  // On Surface Variant
      subtle: "rgba(28, 27, 24, 0.38)", // Disabled text (38% opacity)
    },
    border: {
      default: "#837468",    // Outline - Border & divider tone
      strong: "#51453B",     // Stronger outline (On Surface Variant)
    },
  },

  // Material Design 3 Shape Tokens
  radius: {
    none: "0",
    sm: "0.25rem",      // 4px - Extra Small
    md: "0.5rem",       // 8px - Small
    lg: "0.75rem",      // 12px - Medium
    xl: "1rem",         // 16px - Large
    full: "9999px",
    card: "0.75rem",    // 12px - Medium (Material Design 3 standard for cards)
    button: "0.5rem",   // 8px - Small (Material Design 3 for filled buttons)
  },

  // Material Design 3 Elevation System
  // Using warm-toned shadows that complement the pastel orange theme
  shadows: {
    none: "none",
    // Elevation 0: No shadow
    // Elevation 1: Cards at rest
    elevation1: "0px 1px 2px rgba(28, 14, 0, 0.2), 0px 1px 3px 1px rgba(28, 14, 0, 0.12)",
    // Elevation 2: Cards hover
    elevation2: "0px 1px 2px rgba(28, 14, 0, 0.2), 0px 2px 6px 2px rgba(28, 14, 0, 0.12)",
    // Elevation 3: Raised buttons, dropdowns
    elevation3: "0px 1px 3px rgba(28, 14, 0, 0.2), 0px 4px 8px 3px rgba(28, 14, 0, 0.12)",
    // Elevation 4: Modals, dialogs
    elevation4: "0px 2px 3px rgba(28, 14, 0, 0.2), 0px 6px 10px 4px rgba(28, 14, 0, 0.12)",
    // Elevation 5: Highest elevation
    elevation5: "0px 4px 4px rgba(28, 14, 0, 0.2), 0px 8px 12px 6px rgba(28, 14, 0, 0.12)",
    // Legacy support - map to Material Design 3 elevations
    sm: "0px 1px 2px rgba(28, 14, 0, 0.2), 0px 1px 3px 1px rgba(28, 14, 0, 0.12)",
    md: "0px 1px 2px rgba(28, 14, 0, 0.2), 0px 2px 6px 2px rgba(28, 14, 0, 0.12)",
    lg: "0px 1px 3px rgba(28, 14, 0, 0.2), 0px 4px 8px 3px rgba(28, 14, 0, 0.12)",
    // Material Design 3 card shadows (replacing clay)
    clay: "0px 1px 2px rgba(28, 14, 0, 0.2), 0px 1px 3px 1px rgba(28, 14, 0, 0.12)", // Elevation 1
    clayHover: "0px 1px 2px rgba(28, 14, 0, 0.2), 0px 2px 6px 2px rgba(28, 14, 0, 0.12)", // Elevation 2
  },

  // Component-specific styling following Material Design 3
  components: {
    // Material Design 3 App Bar
    header: {
      background: "rgba(255, 248, 243, 0.8)", // Surface with opacity (#FFF8F3)
      borderColor: "#837468",                   // Outline
      backdropBlur: true,
      sticky: true,
      height: "4rem", // 64px
    },

    // Material Design 3 Card
    card: {
      background: "#FFF8F3",                    // Surface (cards use bg-surface CSS variable)
      borderRadius: "0.75rem",                 // 12px - Medium shape token
      padding: {
        sm: "1rem",    // 16px
        md: "1.5rem",  // 24px
        lg: "2rem",    // 32px
      },
      shadow: "clay",                          // Elevation 1
      shadowHover: "clayHover",                // Elevation 2
    },

    // Material Design 3 Chip (Tag)
    tag: {
      background: "#FFDDAF",                   // Primary Container - Soft orange background
      textColor: "#341900",                    // On Primary Container
      borderRadius: "1.75rem",                 // 28px - Extra Large shape token (pill shape)
      padding: {
        x: "0.75rem",  // 12px
        y: "0.25rem",  // 4px
      },
      fontSize: "0.875rem",                    // 14px - Material Design 3 label size
      fontWeight: 500,                         // Medium
    },

    // Material Design 3 Navigation
    navLink: {
      borderRadius: "0.75rem",                 // 12px - Medium shape token
      padding: {
        x: "0.75rem",  // 12px
        y: "0.5rem",   // 8px
      },
      fontSize: "0.875rem",                    // 14px
      fontWeight: 500,                         // Medium
      active: {
        background: "#FFDDAF",                 // Primary Container
        textColor: "#341900",                  // On Primary Container
      },
      inactive: {
        textColor: "#51453B",                  // On Surface Variant
        hoverBackground: "rgba(142, 72, 0, 0.08)", // Primary with 8% opacity (hover state layer)
        hoverTextColor: "#1C1B18",              // On Background
      },
    },

    // Chart styling
    chart: {
      colors: ["#8E4800", "#765847", "#675940", "#FFB74D", "#FFDDAF"], // Primary, Secondary, Tertiary, Base, Primary Container
      axisColor: "#51453B",                     // On Surface Variant
      axisFontSize: "0.75rem",                  // 12px
      tooltip: {
        background: "#FFF8F3",                 // Surface
        borderColor: "#837468",                 // Outline
        borderRadius: "0.5rem",                // 8px - Small shape token
        fontSize: "0.75rem",                   // 12px
      },
      barRadius: [4, 4, 0, 0],                 // Top corners rounded
    },

    // Footer styling
    footer: {
      borderColor: "#837468",                  // Outline
      textColor: "#51453B",                     // On Surface Variant
      linkHoverColor: "#8E4800",                // Primary
    },

    // Material Design 3 Selector/Dropdown
    themeSelector: {
      background: "#FFF8F3",                   // Surface
      textColor: "#1C1B18",                    // On Background
      borderColor: "#837468",                  // Outline
      borderRadius: "0.5rem",                  // 8px - Small shape token
      padding: {
        x: "0.75rem",  // 12px
        y: "0.375rem", // 6px
      },
      fontSize: "0.875rem",                    // 14px
      fontWeight: 500,                         // Medium
      fontFamily: "Roboto, system-ui, -apple-system, sans-serif",
      arrowColor: "#51453B",                   // On Surface Variant
      hover: {
        borderColor: "#8E4800",                // Primary
      },
      focus: {
        borderColor: "#8E4800",                // Primary
        ringColor: "rgba(142, 72, 0, 0.2)",    // Primary with 20% opacity
      },
      option: {
        background: "#FFF8F3",                // Surface
        textColor: "#1C1B18",                  // On Background
        hoverBackground: "#FFDDAF",            // Primary Container
      },
    },

    // Material Design 3 Typography
    typography: {
      h1: {
        fontSize: "2.25rem",                    // 36px - Display Large
        fontWeight: 400,                       // Regular (Material Design 3)
        lineHeight: 1.2,
        color: "#1C1B18",                      // On Background
      },
      h2: {
        fontSize: "1.875rem",                  // 30px - Headline Large
        fontWeight: 400,                       // Regular
        lineHeight: 1.3,
        color: "#1C1B18",                      // On Background
      },
      h3: {
        fontSize: "1.5rem",                    // 24px - Title Large
        fontWeight: 500,                       // Medium
        lineHeight: 1.4,
        color: "#1C1B18",                      // On Background
      },
      body: {
        fontSize: "1rem",                      // 16px - Body Large
        lineHeight: 1.5,                       // Material Design 3 line height
        color: "#1C1B18",                      // On Background
      },
      bodySecondary: {
        fontSize: "0.875rem",                  // 14px - Body Medium
        lineHeight: 1.43,                      // Material Design 3 line height
        color: "#51453B",                      // On Surface Variant
      },
    },
  },
} as const;

