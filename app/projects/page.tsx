import Layout from "@/components/Layout";
import Section from "@/components/Section";
import ProjectsPageContent from "@/components/ProjectsPageContent";
import { getAllProjects } from "@/lib/content";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <ProjectsPageContent projects={projects} />
      </Section>
    </Layout>
  );
}

