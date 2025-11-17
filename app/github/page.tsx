import Layout from "@/components/Layout";
import Section from "@/components/Section";
import GitHubPageContent from "@/components/GitHubPageContent";
import { getProfile } from "@/lib/content";
import type { GitHubStats } from "@/types/github";

// Server-side rendered page - works with Cloudflare Pages adapter
// During SSR/build, we return empty stats and let client-side fetch handle data loading
// This ensures the page renders even when API is unavailable during build
export default async function GitHubPage() {
  const profile = getProfile();
  // Return empty stats for SSR - client-side will fetch actual data
  // This ensures the page renders during build time when API may not be available
  const stats: GitHubStats = {
    commits: 0,
    issuesOpened: 0,
    issuesClosed: 0,
    prsOpened: 0,
    prsClosed: 0,
    prsMerged: 0,
    totalRepos: 0,
    commitsTrend: [],
    issuesTrend: [],
    prsTrend: [],
    dateRange: 'week' as const,
    commitsComparison: null,
    issuesOpenedComparison: null,
    issuesClosedComparison: null,
    prsOpenedComparison: null,
    prsClosedComparison: null,
    prsMergedComparison: null,
  };

  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <GitHubPageContent profile={profile} initialStats={stats} />
      </Section>
    </Layout>
  );
}

