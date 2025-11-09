"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, defaultLocale, type Locale, type TranslationKeys } from "@/locales";

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  availableLocales: Locale[];
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Helper function to get nested value from object by dot-notation key
function getNestedValue(obj: any, path: string): string {
  const keys = path.split(".");
  let value = obj;
  for (const key of keys) {
    if (value === undefined || value === null) {
      return path; // Return key if not found
    }
    value = value[key];
  }
  return typeof value === "string" ? value : path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Load locale from localStorage on mount
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("locale") as Locale;
      if (savedLocale && savedLocale in translations) {
        setLocaleState(savedLocale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    if (newLocale in translations) {
      setLocaleState(newLocale);
      localStorage.setItem("locale", newLocale);
    }
  };

  const t = (key: string): string => {
    const translation = translations[locale];
    return getNestedValue(translation, key);
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t,
        availableLocales: Object.keys(translations) as Locale[],
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

