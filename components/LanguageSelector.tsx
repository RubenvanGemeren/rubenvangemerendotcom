"use client";

import { useI18n } from "@/lib/i18n-context";
import { useTheme } from "@/lib/theme-context";
import { availableLocales, type Locale } from "@/locales";

const localeNames: Record<Locale, string> = {
  "en-EN": "English",
  "nl-NL": "Nederlands",
};

export default function LanguageSelector() {
  const { locale, setLocale, availableLocales: available, t } = useI18n();
  const { theme } = useTheme();
  const selector = theme.components.themeSelector;

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="language-selector appearance-none cursor-pointer transition-colors focus:outline-none"
        style={{
          backgroundColor: selector.background,
          color: selector.textColor,
          borderColor: selector.borderColor,
          borderRadius: selector.borderRadius,
          paddingLeft: selector.padding.x,
          paddingRight: `calc(${selector.padding.x} + 1.5rem)`, // Extra space for arrow
          paddingTop: selector.padding.y,
          paddingBottom: selector.padding.y,
          fontSize: selector.fontSize,
          fontWeight: selector.fontWeight,
          fontFamily: selector.fontFamily,
          borderWidth: "1px",
          borderStyle: "solid",
        }}
        aria-label={t("common.ariaLabels.selectLanguage")}
      >
        {available.map((loc) => (
          <option
            key={loc}
            value={loc}
            style={{
              backgroundColor: selector.option.background,
              color: selector.option.textColor,
            }}
          >
            {localeNames[loc]}
          </option>
        ))}
      </select>
      <div
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          right: selector.padding.x,
        }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: selector.arrowColor }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .language-selector {
            background-color: ${selector.background} !important;
            color: ${selector.textColor} !important;
            border-color: ${selector.borderColor} !important;
          }
          .language-selector:hover {
            border-color: ${selector.hover.borderColor} !important;
          }
          .language-selector:focus {
            border-color: ${selector.focus.borderColor} !important;
            box-shadow: 0 0 0 2px ${selector.focus.ringColor} !important;
          }
          .language-selector option {
            background-color: ${selector.option.background} !important;
            color: ${selector.option.textColor} !important;
            font-family: ${selector.fontFamily} !important;
          }
          .language-selector option:hover,
          .language-selector option:checked {
            background-color: ${selector.option.hoverBackground} !important;
          }
        `
      }} />
    </div>
  );
}

