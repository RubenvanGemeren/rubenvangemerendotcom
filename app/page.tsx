import Layout from "@/components/Layout";
import Section from "@/components/Section";
import HomeContent from "@/components/HomeContent";
import { getProfile, getFeaturedProjects } from "@/lib/content";

export default function Home() {
  const profile = getProfile();
  const featuredProjects = getFeaturedProjects();

  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <HomeContent profile={profile} featuredProjects={featuredProjects} />
      </Section>
    </Layout>
  );
}

