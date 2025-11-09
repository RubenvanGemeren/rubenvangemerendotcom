"use client";

import { motion } from "framer-motion";
import ClayCard from "./ClayCard";
import Tag from "./Tag";
import MetricChart from "./MetricChart";
import type { Project } from "@/types/content";
import { useI18n } from "@/lib/i18n-context";
import { useTranslatedProject } from "@/lib/use-translated-data";

interface ProjectDetailContentProps {
  project: Project;
}

export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const { t } = useI18n();
  const translatedProject = useTranslatedProject(project);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text mb-3">{translatedProject.title}</h1>
        <p className="text-xl text-text-subtle mb-6">{translatedProject.subtitle}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {translatedProject.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ClayCard className="p-6">
            <h2 className="text-xl font-semibold text-text mb-4">{t("components.projectDetail.challenge")}</h2>
            <p className="text-text-subtle leading-relaxed">{translatedProject.challenge}</p>
          </ClayCard>

          <ClayCard className="p-6">
            <h2 className="text-xl font-semibold text-text mb-4">{t("components.projectDetail.approach")}</h2>
            <p className="text-text-subtle leading-relaxed">{translatedProject.approach}</p>
          </ClayCard>

          <ClayCard className="p-6">
            <h2 className="text-xl font-semibold text-text mb-4">{t("components.projectDetail.impact")}</h2>
            <p className="text-text-subtle leading-relaxed">{translatedProject.impact}</p>
          </ClayCard>
        </div>

        <div className="space-y-6">
          <ClayCard className="p-6">
            <h2 className="text-xl font-semibold text-text mb-4">{t("components.projectDetail.techStack")}</h2>
            <div className="flex flex-wrap gap-2">
              {translatedProject.techStack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </ClayCard>

          {translatedProject.metrics && (
            <ClayCard className="p-6">
              <h2 className="text-xl font-semibold text-text mb-4">{t("components.projectDetail.metrics")}</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-subtle">{t("components.projectDetail.before")}:</span>
                  <span className="text-sm font-semibold text-text">
                    {translatedProject.metrics.before.toLocaleString()}
                    {translatedProject.metrics.unit && ` ${translatedProject.metrics.unit}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-subtle">{t("components.projectDetail.after")}:</span>
                  <span className="text-sm font-semibold text-primary">
                    {translatedProject.metrics.after.toLocaleString()}
                    {translatedProject.metrics.unit && ` ${translatedProject.metrics.unit}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-surface/50">
                  <span className="text-xs text-text-subtle">
                    {t("components.projectDetail.improvement")}:{" "}
                    {(
                      ((translatedProject.metrics.before - translatedProject.metrics.after) /
                        translatedProject.metrics.before) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            </ClayCard>
          )}

          {translatedProject.chartData && translatedProject.chartData.length > 0 && (
            <ClayCard className="p-6">
              <h2 className="text-xl font-semibold text-text mb-4">{t("components.projectDetail.visualization")}</h2>
              <MetricChart data={translatedProject.chartData} height={200} />
            </ClayCard>
          )}
        </div>
      </div>
    </motion.div>
  );
}

