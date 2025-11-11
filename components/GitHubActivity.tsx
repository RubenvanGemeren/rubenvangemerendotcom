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

      // Get theme colors for both light and dark themes
      // react-activity-calendar expects a theme object with light and dark arrays
      const lightColors = getThemeColors("light") || getThemeColors("standard") || [];
      const darkColors = getThemeColors("dark") || getThemeColors("standard") || [];

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
    <ClayCard className={`${compact ? 'p-4' : 'p-6'} ${className}`}>
      <div
        className="w-full github-calendar-wrapper"
        style={{ minHeight: compact ? '120px' : '200px' }}
      >
        <GitHubCalendar
          key={`${finalUsername}-${year || 'current'}-${themeName}`}
          {...calendarProps}
        />
      </div>
    </ClayCard>
  );
}
