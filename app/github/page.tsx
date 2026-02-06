import Layout from "@/components/Layout";
import Section from "@/components/Section";
import GitHubPageContent from "@/components/GitHubPageContent";
import { getProfile } from "@/lib/content";
import { getGitHubStats } from "@/lib/github/stats";

export default async function GitHubPage() {
  const profile = getProfile();
  // Fetch initial stats with default "all" range for SSR
  // During build time, database may not be available, so catch errors gracefully
  let stats;
  try {
    stats = await getGitHubStats('all');
  } catch (error) {
    // During build or if DB is unavailable, return empty stats
    // The page will still render and can fetch data client-side
    stats = {
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
      dateRange: 'all' as const,
      commitsComparison: null,
      issuesOpenedComparison: null,
      issuesClosedComparison: null,
      prsOpenedComparison: null,
      prsClosedComparison: null,
      prsMergedComparison: null,
    };
  }

  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <GitHubPageContent profile={profile} initialStats={stats} />
      </Section>
    </Layout>
  );
}

