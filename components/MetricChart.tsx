"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { ChartDataPoint } from "@/types/content";
import { useTheme } from "@/lib/theme-context";

interface MetricChartProps {
  data: ChartDataPoint[];
  height?: number;
}

export default function MetricChart({ data, height = 200 }: MetricChartProps) {
  const { theme } = useTheme();

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <XAxis
          dataKey="label"
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
        />
        <Bar
          dataKey="value"
          fill={theme.colors.primary}
          radius={[...theme.components.chart.barRadius]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

