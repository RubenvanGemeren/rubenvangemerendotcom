"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useTheme } from "@/lib/theme-context";
import ClayCard from "./ClayCard";
import type { DateRange } from "@/types/github";

interface TrendDataPoint {
  date: string;
  [key: string]: string | number;
}

interface GitHubTrendChartProps {
  title: string;
  data: TrendDataPoint[];
  type?: "line" | "bar";
  dataKeys: Array<{ key: string; name: string; color?: string }>;
  height?: number;
  className?: string;
  dateRange?: DateRange;
}

export default function GitHubTrendChart({
  title,
  data,
  type = "line",
  dataKeys,
  height = 300,
  className = "",
  dateRange = "week",
}: GitHubTrendChartProps) {
  const { theme } = useTheme();

  const formatDate = (dateStr: string) => {
    // Handle different date string formats based on range
    if (dateRange === 'all') {
      // Format: "2024" -> "2024"
      if (/^\d{4}$/.test(dateStr)) {
        return dateStr;
      }
      // Try to parse as year
      const year = parseInt(dateStr, 10);
      if (!isNaN(year) && year >= 2000 && year <= 2100) {
        return year.toString();
      }
    } else if (dateRange === 'year') {
      // Format: "2024-12" -> "Dec 2024"
      if (/^\d{4}-\d{2}$/.test(dateStr)) {
        const [year, month] = dateStr.split('-');
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        if (!isNaN(monthNum) && !isNaN(yearNum) && monthNum >= 1 && monthNum <= 12) {
          const date = new Date(yearNum, monthNum - 1, 1);
          return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
        }
      }
    } else if (dateRange === '24h') {
      // Format: "2024-12-01 14:00" -> "Dec 1, 2:00 PM"
      if (dateStr.includes(' ')) {
        const [datePart, timePart] = dateStr.split(' ');
        if (timePart && /^\d{2}:\d{2}$/.test(timePart)) {
          try {
            const [hours, minutes] = timePart.split(':');
            const date = new Date(datePart + 'T' + hours + ':' + minutes + ':00');
            if (!isNaN(date.getTime())) {
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit"
              });
            }
          } catch (e) {
            // Fall through to default parsing
          }
        }
      }
    }

    // Default: Try to parse as ISO date or YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const date = new Date(dateStr + 'T00:00:00');
      if (!isNaN(date.getTime())) {
        if (dateRange === 'week' || dateRange === 'month') {
          return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        }
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      }
    }

    // Fallback: return as-is if can't parse
    return dateStr;
  };

  return (
    <ClayCard className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-text mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        {type === "line" ? (
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border.default} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: theme.components.chart.axisFontSize, fill: theme.components.chart.axisColor }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: theme.components.chart.axisFontSize, fill: theme.components.chart.axisColor }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.components.chart.tooltip.background,
                border: `1px solid ${theme.components.chart.tooltip.borderColor}`,
                borderRadius: theme.components.chart.tooltip.borderRadius,
                fontSize: theme.components.chart.tooltip.fontSize,
              }}
              labelFormatter={(label) => formatDate(label)}
            />
            <Legend />
            {dataKeys.map(({ key, name, color }, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                name={name}
                stroke={color || theme.components.chart.colors[index % theme.components.chart.colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        ) : (
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border.default} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: theme.components.chart.axisFontSize, fill: theme.components.chart.axisColor }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: theme.components.chart.axisFontSize, fill: theme.components.chart.axisColor }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.components.chart.tooltip.background,
                border: `1px solid ${theme.components.chart.tooltip.borderColor}`,
                borderRadius: theme.components.chart.tooltip.borderRadius,
                fontSize: theme.components.chart.tooltip.fontSize,
              }}
              labelFormatter={(label) => formatDate(label)}
            />
            <Legend />
            {dataKeys.map(({ key, name, color }, index) => (
              <Bar
                key={key}
                dataKey={key}
                name={name}
                fill={color || theme.components.chart.colors[index % theme.components.chart.colors.length]}
                radius={[...theme.components.chart.barRadius]}
              />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </ClayCard>
  );
}

