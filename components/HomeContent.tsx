"use client";

import { motion } from "framer-motion";
import ClayCard from "./ClayCard";
import ProjectCard from "./ProjectCard";
import GitHubActivity from "./GitHubActivity";
import type { Profile, Project } from "@/types/content";
import { useI18n } from "@/lib/i18n-context";

interface HomeContentProps {
  profile: Profile;
  featuredProjects: Project[];
}

export default function HomeContent({ profile, featuredProjects }: HomeContentProps) {
  const { t } = useI18n();

  const highlights = [
    {
      title: t("pages.home.highlights.highlight1.title"),
      description: t("pages.home.highlights.highlight1.description"),
    },
    {
      title: t("pages.home.highlights.highlight2.title"),
      description: t("pages.home.highlights.highlight2.description"),
    },
    {
      title: t("pages.home.highlights.highlight3.title"),
      description: t("pages.home.highlights.highlight3.description"),
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-text mb-4">{t("common.name")}</h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-primary mb-6">{t("common.title")}</h2>
            <p className="text-lg text-text-subtle max-w-3xl leading-relaxed">{t("common.summary")}</p>
          </div>
          {profile.links?.github && (
            <div className="flex justify-center lg:justify-end">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-[1.02]"
              >
                <GitHubActivity
                  githubUrl={profile.links.github}
                  compact
                  rounded
                  lastMonths={6}
                  showLabels={false}
                  showTotalContributions={false}
                  className="max-w-full cursor-pointer"
                />
              </a>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {highlights.map((highlight, index) => (
          <ClayCard key={index} className="p-6">
            <h3 className="text-lg font-semibold text-text mb-3">{highlight.title}</h3>
            <p className="text-sm text-text-subtle leading-relaxed">{highlight.description}</p>
          </ClayCard>
        ))}
      </motion.div>

      {featuredProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold text-text mb-6">{t("pages.home.featuredProjects")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} compact />
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}

