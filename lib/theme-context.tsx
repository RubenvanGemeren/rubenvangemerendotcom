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

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeNameState] = useState<string>(defaultThemeName);

  useEffect(() => {
    // Load theme from localStorage on mount
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme && savedTheme in themes) {
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

  // Apply CSS variables to document
  useEffect(() => {
    if (typeof window !== "undefined") {
      Object.entries(cssVariables).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });

      // Apply font family
      document.documentElement.style.setProperty(
        "--font-primary",
        `${theme.font.family.primary}, ${theme.font.family.fallback}`
      );
    }
  }, [theme, cssVariables]);

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

