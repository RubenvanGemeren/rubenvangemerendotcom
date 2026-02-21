import Layout from "@/components/Layout";
import Section from "@/components/Section";
import HomeContent from "@/components/HomeContent";
import { getProfile, getFeaturedProjects } from "@/lib/content";
import LandingContentv2 from "@/components/LandingContentv2";
import { read } from "@/app/actions/cookies";

export default async function Home() {
  const profile = getProfile();
  const featuredProjects = getFeaturedProjects();
  const hasSeenIntro = await read('hasSeenIntro') === 'true';

  return (
    <Layout>
      <Section className="flex-1 flex flex-col">
        <LandingContentv2
          profile={profile}
          featuredProjects={featuredProjects}
          hasSeenIntro={hasSeenIntro}
        />
        {/* <HomeContent profile={profile} featuredProjects={featuredProjects} /> */}
      </Section>
    </Layout>
  );
}

