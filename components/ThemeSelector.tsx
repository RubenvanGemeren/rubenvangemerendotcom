"use client";

import { useTheme } from "@/lib/theme-context";
import { themes } from "@/config/themes";

export default function ThemeSelector() {
  const { themeName, setTheme, availableThemes, theme } = useTheme();
  const selector = theme.components.themeSelector;

  return (
    <div className="relative">
      <select
        value={themeName}
        onChange={(e) => setTheme(e.target.value)}
        className="theme-selector appearance-none cursor-pointer transition-colors focus:outline-none"
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
        aria-label="Select theme"
      >
        {availableThemes.map((name) => (
          <option
            key={name}
            value={name}
            style={{
              backgroundColor: selector.option.background,
              color: selector.option.textColor,
            }}
          >
            {themes[name as keyof typeof themes].displayName}
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
          .theme-selector {
            background-color: ${selector.background} !important;
            color: ${selector.textColor} !important;
            border-color: ${selector.borderColor} !important;
          }
          .theme-selector:hover {
            border-color: ${selector.hover.borderColor} !important;
          }
          .theme-selector:focus {
            border-color: ${selector.focus.borderColor} !important;
            box-shadow: 0 0 0 2px ${selector.focus.ringColor} !important;
          }
          .theme-selector option {
            background-color: ${selector.option.background} !important;
            color: ${selector.option.textColor} !important;
            font-family: ${selector.fontFamily} !important;
          }
          .theme-selector option:hover,
          .theme-selector option:checked {
            background-color: ${selector.option.hoverBackground} !important;
          }
        `
      }} />
    </div>
  );
}

