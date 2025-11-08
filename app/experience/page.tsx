import Layout from "@/components/Layout";
import Section from "@/components/Section";
import ExperiencePageContent from "@/components/ExperiencePageContent";
import { getExperience } from "@/lib/content";

export default function ExperiencePage() {
  const experience = getExperience();

  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <ExperiencePageContent experience={experience} />
      </Section>
    </Layout>
  );
}

