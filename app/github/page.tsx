import Layout from "@/components/Layout";
import Section from "@/components/Section";
import GitHubPageContent from "@/components/GitHubPageContent";
import { getProfile } from "@/lib/content";

export default function GitHubPage() {
  const profile = getProfile();

  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <GitHubPageContent profile={profile} />
      </Section>
    </Layout>
  );
}

