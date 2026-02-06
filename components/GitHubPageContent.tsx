"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useMemo, useEffect } from "react";
import GitHubActivity from "./GitHubActivity";
import GitHubStatsCard from "./GitHubStatsCard";
import GitHubTrendChart from "./GitHubTrendChart";
import GitHubDateRangeSelector from "./GitHubDateRangeSelector";
import SyncPasswordModal from "./SyncPasswordModal";
import { useI18n } from "@/lib/i18n-context";
import { useGlassMode } from "@/lib/glass-mode-context";
import { useTheme } from "@/lib/theme-context";
import type { Profile } from "@/types/content";
import type { GitHubStats, DateRange } from "@/types/github";
import ClayCard from "./ClayCard";
import { triggerSync } from "@/lib/github/actions";

interface GitHubPageContentProps {
  profile: Profile;
  initialStats: GitHubStats;
}

function getRangeLabel(range: DateRange, t: (key: string) => string): string {
  return t(`pages.github.dateRanges.${range}`);
}

function getTrendTitle(baseTitle: string, range: DateRange, t: (key: string) => string): string {
  const rangeLabel = getRangeLabel(range, t);
  let periodLabel = '';
  switch (range) {
    case '24h':
      periodLabel = t('pages.github.trends.hourly');
      break;
    case 'week':
    case 'month':
      periodLabel = t('pages.github.trends.daily');
      break;
    case 'year':
      periodLabel = t('pages.github.trends.monthly');
      break;
    case 'all':
      periodLabel = t('pages.github.trends.yearly');
      break;
  }
  return `${baseTitle} (${periodLabel})`;
}

export default function GitHubPageContent({ profile, initialStats }: GitHubPageContentProps) {
  const { t } = useI18n();
  const { isGlassModeEnabled } = useGlassMode();
  const { theme } = useTheme();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<GitHubStats>(initialStats);
  const [dateRange, setDateRange] = useState<DateRange>(initialStats.dateRange || 'all');
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const fetchStats = useCallback(async (range: DateRange) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/github/stats?dateRange=${range}`);
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const newStats = await response.json();
      setStats(newStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Keep existing stats on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch fresh stats on mount — the page is statically generated with empty
  // stats at build time (DB not available), so we always need a client-side fetch.
  useEffect(() => {
    fetchStats(dateRange);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDateRangeChange = useCallback((range: DateRange) => {
    setDateRange(range);
    fetchStats(range);
  }, [fetchStats]);

  // Note: With SSR, initialStats should already be populated
  // Only fetch if we detect empty stats (fallback for build-time)
  useEffect(() => {
    const isEmpty =
      initialStats.commits === 0 &&
      initialStats.issuesOpened === 0 &&
      initialStats.prsOpened === 0 &&
      initialStats.commitsTrend.length === 0;

    if (isEmpty) {
      fetchStats(dateRange);
    }
  }, [dateRange, fetchStats, initialStats]);

  const handleSyncButtonClick = () => {
    setSyncError(null);
    setShowPasswordModal(true);
  };

  const handleSyncConfirm = async (password: string) => {
    setIsSyncing(true);
    setSyncMessage(null);
    setSyncError(null);

    try {
      const result = await triggerSync(password);

      if (result.success && result.result) {
        setSyncMessage(
          t('pages.github.sync.success')
            .replace('{commits}', result.result.commitsAdded.toString())
            .replace('{issues}', result.result.issuesAdded.toString())
            .replace('{prs}', result.result.prsAdded.toString())
        );
        setShowPasswordModal(false);
        // Refresh stats after sync
        await fetchStats(dateRange);
        setTimeout(() => {
          setSyncMessage(null);
        }, 5000);
      } else {
        setSyncError(
          t('pages.github.sync.error').replace('{error}', result.error || t('pages.github.sync.unknownError'))
        );
        // Don't close modal on error, let user try again
      }
    } catch (error) {
      setSyncError(
        t('pages.github.sync.syncError').replace(
          '{error}',
          error instanceof Error ? error.message : t('pages.github.sync.unknownError')
        )
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCloseModal = () => {
    if (!isSyncing) {
      setShowPasswordModal(false);
      setSyncError(null);
    }
  };

  const rangeLabel = useMemo(() => getRangeLabel(dateRange, t), [dateRange, t]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">{t('pages.github.title')}</h1>
        <div className="flex items-center gap-4">
          <GitHubDateRangeSelector
            value={dateRange}
            onChange={handleDateRangeChange}
            className="min-w-[180px]"
          />
          <button
            onClick={handleSyncButtonClick}
            disabled={isSyncing || isLoading}
            className={`px-4 py-2 rounded-button transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isGlassModeEnabled
                ? "liquid-glass text-text"
                : "bg-primary text-white hover:opacity-90"
            }`}
            style={
              isGlassModeEnabled
                ? {
                    fontSize: theme.components.themeSelector.fontSize,
                    fontWeight: theme.components.themeSelector.fontWeight,
                    fontFamily: theme.components.themeSelector.fontFamily,
                  }
                : {}
            }
          >
            {t('pages.github.syncNow')}
          </button>
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GitHubStatsCard
            title={`${t('pages.github.stats.commits')} (${rangeLabel})`}
            value={stats.commits}
            subtitle={rangeLabel}
            comparison={stats.commitsComparison}
          />
          <GitHubStatsCard
            title={`${t('pages.github.stats.issues')} (${rangeLabel})`}
            value={`${stats.issuesOpened} / ${stats.issuesClosed}`}
            subtitle={`${t('pages.github.stats.opened')} / ${t('pages.github.stats.closed')}`}
            comparison={
              stats.issuesOpenedComparison && stats.issuesClosedComparison
                ? {
                    value: stats.issuesOpenedComparison.value + stats.issuesClosedComparison.value,
                    isPositive: (stats.issuesOpenedComparison.value + stats.issuesClosedComparison.value) > 0,
                  }
                : null
            }
          />
          <GitHubStatsCard
            title={`${t('pages.github.stats.pullRequests')} (${rangeLabel})`}
            value={`${stats.prsOpened} / ${stats.prsClosed} / ${stats.prsMerged}`}
            subtitle={`${t('pages.github.stats.opened')} / ${t('pages.github.stats.closed')} / ${t('pages.github.stats.merged')}`}
            comparison={
              stats.prsOpenedComparison && stats.prsClosedComparison && stats.prsMergedComparison
                ? {
                    value: stats.prsOpenedComparison.value + stats.prsClosedComparison.value + stats.prsMergedComparison.value,
                    isPositive: (stats.prsOpenedComparison.value + stats.prsClosedComparison.value + stats.prsMergedComparison.value) > 0,
                  }
                : null
            }
          />
          <GitHubStatsCard
            title={t('pages.github.stats.repositories')}
            value={stats.totalRepos}
            subtitle={t('pages.github.stats.totalReposWorkedOn')}
          />
        </div>

        {/* Trend Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GitHubTrendChart
            title={getTrendTitle(t('pages.github.trends.commitsTrend'), dateRange, t)}
            data={stats.commitsTrend}
            type="line"
            dataKeys={[{ key: "count", name: t('pages.github.stats.commits'), color: "#408080" }]}
            dateRange={dateRange}
          />
          <GitHubTrendChart
            title={getTrendTitle(t('pages.github.trends.issuesTrend'), dateRange, t)}
            data={stats.issuesTrend}
            type="line"
            dataKeys={[
              { key: "opened", name: t('pages.github.stats.opened'), color: "#4a90e2" },
              { key: "closed", name: t('pages.github.stats.closed'), color: "#f97316" },
            ]}
            dateRange={dateRange}
          />
          <GitHubTrendChart
            title={getTrendTitle(t('pages.github.trends.pullRequestsTrend'), dateRange, t)}
            data={stats.prsTrend}
            type="line"
            dataKeys={[
              { key: "opened", name: t('pages.github.stats.opened'), color: "#4a90e2" },
              { key: "closed", name: t('pages.github.stats.closed'), color: "#f97316" },
              { key: "merged", name: t('pages.github.stats.merged'), color: "#10b981" },
            ]}
            dateRange={dateRange}
          />
        </div>

        {syncMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-button text-center ${
              isGlassModeEnabled
                ? "liquid-glass"
                : "bg-primary/10 border border-primary/20"
            }`}
          >
            <p className="text-sm text-text">{syncMessage}</p>
          </motion.div>
        )}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-button text-center ${
              isGlassModeEnabled
                ? "liquid-glass"
                : "bg-primary/10 border border-primary/20"
            }`}
          >
            <p className="text-sm text-text">{t('pages.github.loadingStats')}</p>
          </motion.div>
        )}

        {/* GitHub Calendar */}
        <div className="overflow-x-auto">
          <GitHubActivity
            githubUrl={profile.links.github}
            showLabels={true}
            showTotalContributions={true}
            className="min-w-0"
          />
        </div>
      </div>

      {/* Password Modal */}
      <SyncPasswordModal
        isOpen={showPasswordModal}
        onClose={handleCloseModal}
        onConfirm={handleSyncConfirm}
        isSubmitting={isSyncing}
        error={syncError}
      />
    </motion.div>
  );
}
