"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/content";
import { useI18n } from "@/lib/i18n-context";

interface ProjectsPageContentProps {
  projects: Project[];
}

export default function ProjectsPageContent({ projects }: ProjectsPageContentProps) {
  const { t } = useI18n();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 md:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-3 md:mb-4">{t("pages.projects.title")}</h1>
        <p className="text-base sm:text-lg text-text-subtle max-w-3xl">
          {t("pages.projects.description")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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

