"use client";

import { motion } from "framer-motion";
import ClayCard from "./ClayCard";
import { useI18n } from "@/lib/i18n-context";
import type { ComparisonData } from "@/types/github";

interface GitHubStatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  className?: string;
  comparison?: ComparisonData | null;
}

function formatComparison(comparison: ComparisonData | null | undefined, t: (key: string) => string): { text: string; color: string } | null {
  if (!comparison) return null;

  const diff = comparison.value;
  if (diff === 0) {
    return { text: t('pages.github.stats.noChange'), color: "text-text-subtle" };
  }

  const sign = diff > 0 ? "+" : "";
  const color = comparison.isPositive ? "text-green-500" : "text-red-500";
  return { text: `${sign}${diff}`, color };
}

export default function GitHubStatsCard({
  title,
  value,
  subtitle,
  className = "",
  comparison,
}: GitHubStatsCardProps) {
  const { t } = useI18n();
  const comparisonData = formatComparison(comparison, t);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <ClayCard className="p-6 h-full">
        <div className="flex flex-col h-full">
          <h3 className="text-sm font-medium text-text-subtle mb-2">{title}</h3>
          <div className="flex-1 flex items-end">
            <p className="text-3xl font-bold text-text">{value}</p>
          </div>
          <div className="mt-2 space-y-1">
            {subtitle && (
              <p className="text-xs text-text-subtle">{subtitle}</p>
            )}
            {comparisonData && (
              <p className={`text-xs font-medium ${comparisonData.color}`}>
                {comparisonData.text} {t('pages.github.stats.vsPreviousPeriod')}
              </p>
            )}
          </div>
        </div>
      </ClayCard>
    </motion.div>
  );
}

