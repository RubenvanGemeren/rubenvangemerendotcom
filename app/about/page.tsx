import Layout from "@/components/Layout";
import Section from "@/components/Section";
import AboutPageContent from "@/components/AboutPageContent";
import { getProfile, getEducation } from "@/lib/content";
import HeaderV2 from "@/components/Headerv2";

export default function AboutPage() {
  const profile = getProfile();
  const education = getEducation();

  return (
    <Layout>
      <HeaderV2 />
      <Section>
        <AboutPageContent profile={profile} education={education} />
      </Section>
    </Layout>
  );
}

