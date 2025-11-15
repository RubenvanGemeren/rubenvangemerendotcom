"use client";

import { useTheme } from "@/lib/theme-context";
import { useGlassMode } from "@/lib/glass-mode-context";
import { useI18n } from "@/lib/i18n-context";
import type { DateRange } from "@/types/github";

interface GitHubDateRangeSelectorProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const dateRangeValues: DateRange[] = ['24h', 'week', 'month', 'year', 'all'];

export default function GitHubDateRangeSelector({
  value,
  onChange,
  className = "",
}: GitHubDateRangeSelectorProps) {
  const { theme } = useTheme();
  const { isGlassModeEnabled } = useGlassMode();
  const { t } = useI18n();
  const selector = theme.components.themeSelector;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as DateRange)}
      className={`appearance-none cursor-pointer transition-all focus:outline-none ${
        isGlassModeEnabled ? "liquid-glass" : ""
      } ${className}`}
      style={
        isGlassModeEnabled
          ? {
              color: selector.textColor,
              borderRadius: selector.borderRadius,
              paddingLeft: selector.padding.x,
              paddingRight: selector.padding.x,
              paddingTop: selector.padding.y,
              paddingBottom: selector.padding.y,
              fontSize: selector.fontSize,
              fontWeight: selector.fontWeight,
              fontFamily: selector.fontFamily,
            }
          : {
              backgroundColor: selector.background,
              color: selector.textColor,
              borderColor: selector.borderColor,
              borderRadius: selector.borderRadius,
              paddingLeft: selector.padding.x,
              paddingRight: selector.padding.x,
              paddingTop: selector.padding.y,
              paddingBottom: selector.padding.y,
              fontSize: selector.fontSize,
              fontWeight: selector.fontWeight,
              fontFamily: selector.fontFamily,
              borderWidth: "1px",
              borderStyle: "solid",
            }
      }
      aria-label={t('common.ariaLabels.selectDateRange')}
    >
      {dateRangeValues.map((range) => (
        <option
          key={range}
          value={range}
          style={{
            backgroundColor: selector.option.background,
            color: selector.option.textColor,
          }}
        >
          {t(`pages.github.dateRanges.${range}`)}
        </option>
      ))}
    </select>
  );
}

