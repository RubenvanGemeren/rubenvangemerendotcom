/**
 * Calendar Configuration
 *
 * Comprehensive configuration for react-github-calendar component.
 * Based on react-activity-calendar documentation: https://grubersjoe.github.io/react-activity-calendar/
 */

/**
 * Theme color structure for contribution levels
 * level0: No contributions (lightest)
 * level1: Low contributions
 * level2: Moderate contributions
 * level3: High contributions
 * level4: Very high contributions (darkest)
 */
export interface CalendarTheme {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
}

/**
 * Calendar settings/props configuration
 * Based on react-activity-calendar props
 */
export interface CalendarSettings {
  // Block appearance
  blockSize?: number;
  blockMargin?: number;
  blockRadius?: number;

  // Typography
  fontSize?: number;

  // Week configuration
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday, etc.

  // Labels visibility
  showWeekdayLabels?: boolean;
  showMonthLabels?: boolean;
  hideTotalCount?: boolean;
  hideColorLegend?: boolean;
  hideMonthLabels?: boolean;
  hideYearLabels?: boolean;
  hideDayLabels?: boolean;
  hideWeekdayLabels?: boolean;

  // Data display
  hideOutOfRangeDays?: boolean;
  hideEmptyDays?: boolean;

  // Tooltip
  hideTooltip?: boolean;

  // Event handlers (optional, typically functions)
  onClick?: (event: React.MouseEvent<SVGElement>, data: any) => void;
  onMouseOver?: (event: React.MouseEvent<SVGElement>, data: any) => void;
  onMouseOut?: (event: React.MouseEvent<SVGElement>, data: any) => void;
}

/**
 * Complete calendar configuration structure
 */
export interface CalendarConfig {
  themes: Record<string, CalendarTheme>;
  defaultSettings: CalendarSettings;
}

/**
 * Predefined themes from react-activity-calendar
 */
export const calendarThemes: Record<string, CalendarTheme> = {
  /**
   * Standard theme - Default GitHub-style colors
   */
  standard: {
    level0: '#ebedf0', // No contributions
    level1: '#c6e48b', // Low
    level2: '#7bc96f', // Moderate
    level3: '#239a3b', // High
    level4: '#196127', // Very high
  },

  /**
   * Light theme - Bright, light colors
   */
  light: {
    level0: '#ebedf0',
    level1: '#c6e48b',
    level2: '#7bc96f',
    level3: '#239a3b',
    level4: '#196127',
  },

  /**
   * Dark theme - Gray to white gradient
   */
  dark: {
    level0: '#1a1a1a', // Dark gray (no contributions)
    level1: '#404040', // Dark gray
    level2: '#737373', // Medium gray
    level3: '#a3a3a3', // Light gray
    level4: '#e5e5e5', // Near white (highest contributions)
  },

  /**
   * Minimal theme - Subtle, minimal color scheme
   */
  minimal: {
    level0: '#ebedf0',
    level1: '#9be9a8', // Light green
    level2: '#40c463', // Medium green
    level3: '#30a14e', // Dark green
    level4: '#216e39', // Very dark green
  },

  /**
   * GitHub theme - Official GitHub contribution colors
   */
  github: {
    level0: '#ebedf0',
    level1: '#9be9a8', // Light green
    level2: '#40c463', // Medium green
    level3: '#30a14e', // Dark green
    level4: '#216e39', // Very dark green
  },

  /**
   * Android theme - Pastel orange gradient matching Material Design 3 Android theme
   * Based on pastel orange base color #FFB74D
   */
  android: {
    level0: '#FFF1DB', // Tone 95 - Very light peach (no contributions)
    level1: '#FFDDAF', // Tone 90 - Pale orange (low contributions)
    level2: '#FFB74D', // Tone 80 - Pastel orange base (moderate contributions)
    level3: '#E1822C', // Tone 70 - Bright orange (high contributions)
    level4: '#8E4800', // Tone 40 - Primary dark orange (very high contributions)
  },
};

/**
 * Default calendar settings
 * These match the current component behavior and react-activity-calendar defaults
 */
export const defaultCalendarSettings: CalendarSettings = {
  // Block appearance
  blockSize: 12,
  blockMargin: 2,
  blockRadius: 4,

  // Typography
  fontSize: 14,

  // Week configuration
  weekStart: 0, // Sunday

  // Labels visibility
  showWeekdayLabels: true,
  showMonthLabels: true,
  hideTotalCount: false,
  hideColorLegend: false,
  hideMonthLabels: false,
  hideYearLabels: false,
  hideDayLabels: false,
  hideWeekdayLabels: false,

  // Data display
  hideOutOfRangeDays: false,
  hideEmptyDays: false,

  // Tooltip
  hideTooltip: false,
};

export const roundedCalendarSettings: CalendarSettings = {
  ...defaultCalendarSettings,
  blockRadius: 5,
};

/**
 * Complete calendar configuration
 */
export const calendarConfig: CalendarConfig = {
  themes: calendarThemes,
  defaultSettings: defaultCalendarSettings,
};

/**
 * Get a theme by name
 * @param themeName - Name of the theme to retrieve
 * @returns CalendarTheme object or undefined if not found
 */
export function getTheme(themeName: string): CalendarTheme | undefined {
  return calendarThemes[themeName];
}

/**
 * Get theme colors as an array (for react-github-calendar colors prop)
 * @param themeName - Name of the theme to retrieve
 * @returns Array of 5 colors [level0, level1, level2, level3, level4] or undefined
 */
export function getThemeColors(themeName: string): string[] | undefined {
  const theme = getTheme(themeName);
  if (!theme) {
    return undefined;
  }

  return [
    theme.level0,
    theme.level1,
    theme.level2,
    theme.level3,
    theme.level4,
  ];
}

/**
 * Merge custom settings with default settings
 * @param customSettings - Custom settings to override defaults
 * @returns Merged settings object
 */
export function mergeSettings(
  customSettings?: Partial<CalendarSettings>
): CalendarSettings {
  return {
    ...defaultCalendarSettings,
    ...customSettings,
  };
}

/**
 * Get complete configuration for a specific theme and settings
 * @param themeName - Name of the theme
 * @param customSettings - Optional custom settings to override defaults
 * @returns Object with theme colors array and merged settings
 */
export function getCalendarConfig(
  themeName: string,
  customSettings?: Partial<CalendarSettings>
) {
  const colors = getThemeColors(themeName);
  const settings = mergeSettings(customSettings);

  return {
    colors: colors || getThemeColors('standard') || [],
    settings,
  };
}

// Export default configuration
export default calendarConfig;
