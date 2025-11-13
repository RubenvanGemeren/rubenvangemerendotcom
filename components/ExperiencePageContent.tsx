"use client";

import { motion } from "framer-motion";
import ClayCard from "./ClayCard";
import Tag from "./Tag";
import type { Experience } from "@/types/content";
import { useI18n } from "@/lib/i18n-context";
import { useTranslatedExperience } from "@/lib/use-translated-data";

interface ExperiencePageContentProps {
  experience: Experience[];
}

export default function ExperiencePageContent({ experience }: ExperiencePageContentProps) {
  const { t } = useI18n();
  const translatedExperience = useTranslatedExperience(experience);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 md:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-3 md:mb-4">{t("pages.experience.title")}</h1>
        <p className="text-base sm:text-lg text-text-subtle max-w-3xl">
          {t("pages.experience.description")}
        </p>
      </motion.div>

      <div className="space-y-4 md:space-y-6">
        {translatedExperience.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.startDate}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ClayCard className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 md:mb-4">
                <div className="mb-3 md:mb-0">
                  <h2 className="text-xl sm:text-2xl font-semibold text-text mb-1">{exp.role}</h2>
                  <h3 className="text-lg sm:text-xl font-medium text-primary mb-2">{exp.company}</h3>
                  <p className="text-sm text-text-subtle">{exp.location}</p>
                </div>
                <div className="text-sm text-text-subtle mt-2 md:mt-0">
                  <span>
                    {new Date(exp.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="mx-2">–</span>
                  <span>
                    {exp.current
                      ? t("common.present")
                      : exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        : t("common.present")}
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mb-3 md:mb-4">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-sm text-text-subtle flex items-start">
                    <span className="text-primary mr-2 flex-shrink-0">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-3 md:pt-4 border-t border-surface/50">
                {exp.tech.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </ClayCard>
          </motion.div>
        ))}
      </div>
    </>
  );
}

