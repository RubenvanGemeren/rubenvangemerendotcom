import Layout from "@/components/Layout";
import Section from "@/components/Section";
import GitHubPageContent from "@/components/GitHubPageContent";
import { getProfile } from "@/lib/content";
import { getGitHubStats } from "@/lib/github/stats";

export default async function GitHubPage() {
  const profile = getProfile();
  // Fetch initial stats with default "week" range for SSR
  const stats = await getGitHubStats('week');

  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <GitHubPageContent profile={profile} initialStats={stats} />
      </Section>
    </Layout>
  );
}

