import Layout from "@/components/Layout";
import Section from "@/components/Section";
import ProjectsPageContent from "@/components/ProjectsPageContent";
import { getAllProjects } from "@/lib/content";
import HeaderV2 from "@/components/Headerv2"

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Layout>
      <HeaderV2 />
      <Section>
        <ProjectsPageContent projects={projects} />
      </Section>
    </Layout>
  );
}

