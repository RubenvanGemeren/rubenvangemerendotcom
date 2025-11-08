"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/content";

interface ProjectsPageContentProps {
  projects: Project[];
}

export default function ProjectsPageContent({ projects }: ProjectsPageContentProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-text mb-4">Projects</h1>
        <p className="text-lg text-text-subtle max-w-3xl">
          A selection of projects focusing on distributed systems, data platforms, and infrastructure.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </>
  );
}

