"use client";

import dynamic from "next/dynamic";
import { useTheme } from "@/lib/theme-context";
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
      <div className={className}>
        <p className="text-text-subtle">GitHub username is required</p>
      </div>
    );
  }

  // Only render calendar if we have valid props
  // The dynamic import handles client-side rendering automatically
  if (!calendarProps) {
    return null; // Don't show anything while loading
  }

  const CalendarContent = (
    <div
      className={`w-full github-calendar-wrapper flex justify-center items-center ${githubUrl ? 'cursor-pointer' : ''}`}
      style={{ minHeight: compact ? '100px' : '200px' }}
    >
      <div className="w-full max-w-full overflow-hidden">
        <GitHubCalendar
          key={`${finalUsername}-${year || 'current'}-${themeName}`}
          {...calendarProps}
        />
      </div>
    </div>
  );

  return (
    <div className={className}>
      {githubUrl ? (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View GitHub profile"
          className="block"
        >
          {CalendarContent}
        </a>
      ) : (
        CalendarContent
      )}
      {showSeeMore && (
        <div className={`mt-2 flex items-center justify-center ${compact ? 'px-2 sm:px-0' : 'px-2'}`}>
          <a
            href={seeMoreHref}
            className="text-primary hover:text-primary/80 font-medium transition-colors text-sm"
          >
            {seeMoreText}
          </a>
        </div>
      )}
    </div>
  );
}
