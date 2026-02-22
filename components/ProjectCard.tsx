"use client";

import Link from "next/link";
import ClayCard from "./ClayCard";
import Tag from "./Tag";
import MetricChart from "./MetricChart";
import type { Project } from "@/types/content";
import { useI18n } from "@/lib/i18n-context";
import { useTranslatedProject } from "@/lib/use-translated-data";
import { BasicTooltip } from "./BasicTooltip";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const { t } = useI18n();
  const translatedProject = useTranslatedProject(project);

  return (
    <Link href={`/projects/${project.slug}`}>
      <ClayCard className="p-4 md:p-6 h-full cursor-pointer">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-2 md:mb-3">
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold text-text mb-1">
                {translatedProject.title}
                <BasicTooltip content={t("components.projectCard.highlighted")}>
                  <span style={{ color: project.highlight_color }} className="text-xl">{translatedProject.highlight ? " * " : ""}</span>
                </BasicTooltip>

              </h3>
              <p className="text-sm text-text-subtle">{translatedProject.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
            {translatedProject.tags.slice(0, 3).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {!compact && (
            <>
              <ul className="space-y-2 mb-3 md:mb-4 flex-1">
                <li className="text-sm text-text-subtle">
                  <span className="font-medium text-text">{t("components.projectCard.challenge")}: </span>
                  {translatedProject.challenge}
                </li>
                <li className="text-sm text-text-subtle">
                  <span className="font-medium text-text">{t("components.projectCard.impact")}: </span>
                  {translatedProject.impact}
                </li>
              </ul>

              {translatedProject.chartData && translatedProject.chartData.length > 0 && (
                <div className="mt-3 md:mt-4">
                  <MetricChart data={translatedProject.chartData} height={150} />
                </div>
              )}
            </>
          )}

          {compact && (
            <div className="mt-auto pt-3 md:pt-4">
              <p className="text-sm text-text-subtle line-clamp-2">{translatedProject.impact}</p>
            </div>
          )}
        </div>
      </ClayCard>
    </Link>
  );
}

