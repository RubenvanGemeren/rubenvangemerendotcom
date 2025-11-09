import { defaultTheme } from "./default";
import { darkTheme } from "./dark";
import { greenTheme } from "./green";

export type Theme = typeof defaultTheme;

export const themes: Record<string, Theme> = {
  default: defaultTheme,
  dark: darkTheme,
  green: greenTheme,
};

export const defaultThemeName = "default";

// Helper function to convert theme to CSS variables
export function themeToCSSVariables(theme: Theme): Record<string, string> {
  return {
    "--color-primary": theme.colors.primary,
    "--color-secondary": theme.colors.secondary,
    "--color-accent": theme.colors.accent,
    "--color-background": theme.colors.background,
    "--color-surface": theme.colors.surface,
    "--color-text": theme.colors.text.primary,
    "--color-text-secondary": theme.colors.text.secondary,
    "--color-text-subtle": theme.colors.text.subtle,
    "--color-border": theme.colors.border.default,
    "--color-border-strong": theme.colors.border.strong,
    "--radius-card": theme.radius.card,
    "--radius-button": theme.radius.button,
    "--shadow-clay": theme.shadows.clay,
    "--shadow-clay-hover": theme.shadows.clayHover,
  };
}

