"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type GlassModeContextType = {
  isGlassModeEnabled: boolean;
  toggleGlassMode: () => void;
  setGlassMode: (enabled: boolean) => void;
};

const GlassModeContext = createContext<GlassModeContextType | undefined>(undefined);

export function GlassModeProvider({ children }: { children: ReactNode }) {
  const [isGlassModeEnabled, setIsGlassModeEnabled] = useState<boolean>(false);

  useEffect(() => {
    // Load glass mode preference from localStorage on mount
    if (typeof window !== "undefined") {
      const savedGlassMode = localStorage.getItem("glassMode");
      if (savedGlassMode !== null) {
        setIsGlassModeEnabled(savedGlassMode === "true");
      }
    }
  }, []);

  const setGlassMode = (enabled: boolean) => {
    setIsGlassModeEnabled(enabled);
    localStorage.setItem("glassMode", enabled.toString());
  };

  const toggleGlassMode = () => {
    setGlassMode(!isGlassModeEnabled);
  };

  // Apply glass mode class to body when enabled
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isGlassModeEnabled) {
        document.documentElement.classList.add("glass-mode");
      } else {
        document.documentElement.classList.remove("glass-mode");
      }
    }
  }, [isGlassModeEnabled]);

  return (
    <GlassModeContext.Provider
      value={{
        isGlassModeEnabled,
        toggleGlassMode,
        setGlassMode,
      }}
    >
      {children}
    </GlassModeContext.Provider>
  );
}

export function useGlassMode() {
  const context = useContext(GlassModeContext);
  if (context === undefined) {
    throw new Error("useGlassMode must be used within a GlassModeProvider");
  }
  return context;
}

