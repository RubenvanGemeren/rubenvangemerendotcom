import Layout from "@/components/Layout";
import Section from "@/components/Section";
import ExperiencePageContent from "@/components/ExperiencePageContent";
import { getExperience } from "@/lib/content";
import HeaderV2 from "@/components/Headerv2";

export default function ExperiencePage() {
  const experience = getExperience();

  return (
    <Layout>
      <HeaderV2 />
      <Section>
        <ExperiencePageContent experience={experience} />
      </Section>
    </Layout>
  );
}

