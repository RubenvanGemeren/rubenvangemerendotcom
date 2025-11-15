"use client";

import dynamic from "next/dynamic";
import { useTheme } from "@/lib/theme-context";
import ClayCard from "./ClayCard";
import { useMemo } from "react";
import { getThemeColors, mergeSettings, roundedCalendarSettings, defaultCalendarSettings, type CalendarSettings } from "@/config/calendar.config";

// Dynamically import GitHubCalendar to avoid SSR issues with browser globals
// Loading state is handled by the component itself
const GitHubCalendar = dynamic(
  () => import("react-github-calendar"),
  {
    ssr: false,
    loading: () => null, // No loading state to avoid size mismatch
  }
);

interface GitHubActivityProps {
  username?: string;
  githubUrl?: string;
  className?: string;
  year?: number;
  cellSize?: number | string;
  showLabels?: boolean;
  showTotalContributions?: boolean;
  compact?: boolean; // Compact mode for smaller displays
  lastMonths?: number; // Show only the last N months
  rounded?: boolean; // Use rounded calendar style
  showSeeMore?: boolean; // Show "see more" link
  seeMoreHref?: string; // URL for "see more" link
  seeMoreText?: string; // Text for "see more" link
}

/**
 * Extracts GitHub username from a GitHub URL
 */
function extractUsernameFromUrl(url: string): string | null {
  try {
    const match = url.match(/github\.com\/([^\/]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}


export default function GitHubActivity({
  username,
  githubUrl,
  className = "",
  year,
  cellSize,
  showLabels = true,
  showTotalContributions = true,
  compact = false,
  lastMonths,
  rounded = false,
  showSeeMore = false,
  seeMoreHref = "/github",
  seeMoreText = "See more",
}: GitHubActivityProps) {
  // All hooks must be called at the top, before any conditional returns
  const { themeName } = useTheme();

  // Determine username from props
  const finalUsername = username || (githubUrl ? extractUsernameFromUrl(githubUrl) : null);

  // Memoize calendar props to prevent unnecessary re-renders
  // Must be called before any conditional returns to follow Rules of Hooks
  const calendarProps = useMemo(
    () => {
      if (!finalUsername) {
        return null;
      }

      // Get theme colors based on the current app theme
      // react-activity-calendar expects a theme object with light and dark arrays
      let lightColors: string[] = [];
      let darkColors: string[] = [];

      if (themeName === "android") {
        // Use Android theme for both light and dark (Android theme is light)
        const androidColors = getThemeColors("android") || getThemeColors("standard") || [];
        lightColors = Array.from(androidColors);
        darkColors = Array.from(androidColors); // Android theme works for both
      } else if (themeName === "dark") {
        lightColors = getThemeColors("light") || getThemeColors("standard") || [];
        darkColors = getThemeColors("dark") || getThemeColors("standard") || [];
      } else {
        // Default/light themes
        lightColors = getThemeColors("light") || getThemeColors("standard") || [];
        darkColors = getThemeColors("dark") || getThemeColors("standard") || [];
      }

      // Create theme object in the format expected by react-activity-calendar
      const calendarTheme = {
        light: Array.from(lightColors),
        dark: Array.from(darkColors),
      };

      // Get default settings and merge with custom settings
      // Use smaller values for compact mode
      const defaultCellSize = compact ? 14 : 16;
      const defaultBlockMargin = compact ? 2 : 4;
      const defaultFontSize = compact ? 13 : 14;

      // Start with rounded settings if rounded prop is true, otherwise use defaults
      const baseSettings = rounded ? roundedCalendarSettings : defaultCalendarSettings;

      const customSettings: Partial<CalendarSettings> = {
        blockSize: typeof cellSize === 'number'
          ? cellSize
          : cellSize
            ? parseInt(String(cellSize), 10)
            : defaultCellSize,
        blockMargin: defaultBlockMargin,
        fontSize: defaultFontSize,
        hideTotalCount: !showTotalContributions,
        showWeekdayLabels: compact ? false : showLabels, // Hide labels in compact mode
        hideMonthLabels: compact ? true : false, // Hide month labels in compact mode
        // Ensure blockRadius is set from rounded settings if rounded is true
        blockRadius: rounded ? roundedCalendarSettings.blockRadius : baseSettings.blockRadius,
      };

      // Merge base settings with custom settings
      const settings: CalendarSettings = {
        ...baseSettings,
        ...customSettings,
      };

      // Determine colorScheme based on app theme
      const colorScheme = themeName === "dark" ? "dark" : "light";

      // react-github-calendar props
      // The component uses react-activity-calendar internally which supports:
      // username, blockSize, blockMargin, blockRadius, fontSize, theme (with light/dark), colorScheme, hideTotalCount, showWeekdayLabels, etc.
      const props: any = {
        username: finalUsername,
        blockSize: settings.blockSize,
        blockMargin: settings.blockMargin,
        blockRadius: settings.blockRadius,
        fontSize: settings.fontSize,
        theme: calendarTheme,
        colorScheme: colorScheme,
        hideTotalCount: settings.hideTotalCount,
        showWeekdayLabels: settings.showWeekdayLabels,
        loading: false, // Disable loading state in react-github-calendar
      };

      // Filter data based on year or lastMonths
      if (year) {
        props.transformData = (contributions: any[]) => {
          return contributions.filter((day: any) => {
            const dayYear = new Date(day.date).getFullYear();
            return dayYear === year;
          });
        };
      } else if (lastMonths) {
        props.transformData = (contributions: any[]) => {
          const currentDate = new Date();
          const monthsAgo = new Date();
          monthsAgo.setMonth(currentDate.getMonth() - lastMonths);

          return contributions.filter((day: any) => {
            const dayDate = new Date(day.date);
            return dayDate >= monthsAgo;
          });
        };
      }

      return props;
    },
    [finalUsername, year, cellSize, themeName, showLabels, showTotalContributions, compact, lastMonths, rounded]
  );

  // Now we can do conditional returns after all hooks are called
  if (!finalUsername) {
    return (
      <ClayCard className={`p-6 ${className}`}>
        <p className="text-text-subtle">GitHub username is required</p>
      </ClayCard>
    );
  }

  // Only render calendar if we have valid props
  // The dynamic import handles client-side rendering automatically
  if (!calendarProps) {
    return null; // Don't show anything while loading
  }

  return (
    <ClayCard className={`${compact ? 'py-4 sm:px-3' : 'p-6'} ${className}`}>
      <div
        className="w-full github-calendar-wrapper flex justify-center items-center"
        style={{ minHeight: compact ? '120px' : '200px' }}
      >
        <div className="w-full max-w-full overflow-hidden">
          <GitHubCalendar
            key={`${finalUsername}-${year || 'current'}-${themeName}`}
            {...calendarProps}
          />
        </div>
      </div>
      {(showSeeMore || githubUrl) && (
        <div className={`mt-4 flex items-center justify-between ${compact ? 'px-2 sm:px-0' : 'px-2'}`}>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text hover:text-primary transition-colors"
              aria-label="View GitHub profile"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {showSeeMore && (
            <a
              href={seeMoreHref}
              className="text-primary hover:text-primary/80 font-medium transition-colors text-sm"
            >
              {seeMoreText}
            </a>
          )}
        </div>
      )}
    </ClayCard>
  );
}
