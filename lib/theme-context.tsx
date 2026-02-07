"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { themes, defaultThemeName, themeToCSSVariables, type Theme } from "@/config/themes";

type ThemeContextType = {
  theme: Theme;
  themeName: string;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to convert hex to HSL format (for Tailwind)
function hexToHsl(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  // Convert to percentages and round
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeNameState] = useState<string>(defaultThemeName);

  useEffect(() => {
    // Load theme from localStorage on mount
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme && savedTheme in themes) {
        console.log("savedTheme", themes);
        setThemeNameState(savedTheme);
      }
    }
  }, []);

  const setTheme = (name: string) => {
    if (name in themes) {
      setThemeNameState(name);
      localStorage.setItem("theme", name);
    }
  };

  const theme = (themeName in themes ? themes[themeName as keyof typeof themes] : themes[defaultThemeName]);
  const cssVariables = themeToCSSVariables(theme);

  // Apply CSS variables to document and dark class for Tailwind dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      Object.entries(cssVariables).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });

      // Convert theme background color to HSL and set --background for Tailwind
      const backgroundHsl = hexToHsl(theme.colors.background);
      document.documentElement.style.setProperty("--background", backgroundHsl);

      // Apply font family
      document.documentElement.style.setProperty(
        "--font-primary",
        `${theme.font.family.primary}, ${theme.font.family.fallback}`
      );

      // Add/remove dark class for Tailwind dark mode support
      if (themeName === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      if (themeName === "black") {
        document.documentElement.classList.add("black");
      } else {
        document.documentElement.classList.remove("black");
      }

      // Set glass mode CSS variables based on current theme
      // These adapt to the theme colors for proper glass effect
      if (themeName === "dark") {
        // Dark theme glass settings
        document.documentElement.style.setProperty("--c-glass", "#bbbbbc");
        document.documentElement.style.setProperty("--c-light", "#fff");
        document.documentElement.style.setProperty("--c-dark", "#000");
        document.documentElement.style.setProperty("--glass-reflex-dark", "2");
        document.documentElement.style.setProperty("--glass-reflex-light", "0.3");
        document.documentElement.style.setProperty("--saturation", "150%");
      } else if (themeName === "green") {
        // Green theme glass settings (light theme variant)
        document.documentElement.style.setProperty("--c-glass", "#bbbbbc");
        document.documentElement.style.setProperty("--c-light", "#fff");
        document.documentElement.style.setProperty("--c-dark", "#000");
        document.documentElement.style.setProperty("--glass-reflex-dark", "1");
        document.documentElement.style.setProperty("--glass-reflex-light", "1");
        document.documentElement.style.setProperty("--saturation", "150%");
      } else if (themeName === "android") {
        // Android theme glass settings (light theme variant)
        document.documentElement.style.setProperty("--c-glass", "#bbbbbc");
        document.documentElement.style.setProperty("--c-light", "#fff");
        document.documentElement.style.setProperty("--c-dark", "#000");
        document.documentElement.style.setProperty("--glass-reflex-dark", "1");
        document.documentElement.style.setProperty("--glass-reflex-light", "1");
        document.documentElement.style.setProperty("--saturation", "150%");
      } else {
        // Default/light theme glass settings
        document.documentElement.style.setProperty("--c-glass", "#bbbbbc");
        document.documentElement.style.setProperty("--c-light", "#fff");
        document.documentElement.style.setProperty("--c-dark", "#000");
        document.documentElement.style.setProperty("--glass-reflex-dark", "1");
        document.documentElement.style.setProperty("--glass-reflex-light", "1");
        document.documentElement.style.setProperty("--saturation", "150%");
      }

    }
  }, [theme, cssVariables, themeName]);

  // Always provide the context, even before mount (for SSR)
  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        setTheme,
        availableThemes: Object.keys(themes),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

