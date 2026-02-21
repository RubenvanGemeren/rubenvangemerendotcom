import { notFound } from "next/navigation";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import { getProjectBySlug, getAllProjects } from "@/lib/content";
import HeaderV2 from "@/components/Headerv2";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Layout>
      <HeaderV2 />
      <Section>
        <ProjectDetailContent project={project} />
      </Section>
    </Layout>
  );
}

