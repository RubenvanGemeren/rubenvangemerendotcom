"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { ChartDataPoint } from "@/types/content";
import { theme } from "@/config/theme";

interface MetricChartProps {
  data: ChartDataPoint[];
  height?: number;
}

export default function MetricChart({ data, height = 200 }: MetricChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: theme.colors.subtle }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: theme.colors.subtle }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.background}`,
            borderRadius: theme.radius.button,
            fontSize: "12px",
          }}
        />
        <Bar
          dataKey="value"
          fill={theme.colors.primary}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

