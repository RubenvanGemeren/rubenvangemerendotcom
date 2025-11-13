"use client";

import { useGlassMode } from "@/lib/glass-mode-context";
import { useTheme } from "@/lib/theme-context";

export default function GlassModeToggle() {
  const { isGlassModeEnabled, toggleGlassMode } = useGlassMode();
  const { theme } = useTheme();
  const selector = theme.components.themeSelector;

  return (
    <button
      onClick={toggleGlassMode}
      className={`glass-mode-toggle appearance-none cursor-pointer transition-all focus:outline-none flex items-center gap-2 px-3 py-2 rounded-button ${
        isGlassModeEnabled ? "liquid-glass" : ""
      }`}
      style={
        isGlassModeEnabled
          ? {
              color: selector.textColor,
              borderRadius: selector.borderRadius,
              fontSize: selector.fontSize,
              fontWeight: selector.fontWeight,
              fontFamily: selector.fontFamily,
            }
          : {
              backgroundColor: selector.background,
              color: selector.textColor,
              borderColor: selector.borderColor,
              borderRadius: selector.borderRadius,
              borderWidth: "1px",
              borderStyle: "solid",
              fontSize: selector.fontSize,
              fontWeight: selector.fontWeight,
              fontFamily: selector.fontFamily,
            }
      }
      aria-label={isGlassModeEnabled ? "Disable glass mode" : "Enable glass mode"}
      title={isGlassModeEnabled ? "Disable glass mode" : "Enable glass mode"}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={{ color: selector.arrowColor }}
      >
        {isGlassModeEnabled ? (
          <>
            {/* Square */}
            <rect
              x="6"
              y="6"
              width="12"
              height="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
            {/* Sparks */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 6h2M19 6h2M3 18h2M19 18h2M6 3v2M6 19v2M18 3v2M18 19v2"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M1 12h2M21 12h2M12 1v2M12 21v2"
            />
          </>
        ) : (
          <rect
            x="6"
            y="6"
            width="12"
            height="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        )}
      </svg>
      <span className="text-xs">{isGlassModeEnabled ? "Glass" : "Regular"}</span>
    </button>
  );
}

