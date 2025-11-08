import Layout from "@/components/Layout";
import Section from "@/components/Section";
import AboutPageContent from "@/components/AboutPageContent";
import { getProfile, getEducation } from "@/lib/content";

export default function AboutPage() {
  const profile = getProfile();
  const education = getEducation();

  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <AboutPageContent profile={profile} education={education} />
      </Section>
    </Layout>
  );
}

