"use client";

import { useI18n } from "@/lib/i18n-context";
import type { Project, Education, Experience } from "@/types/content";

export function useTranslatedProject(project: Project): Project {
  const { t } = useI18n();
  const translationKey = `data.projects.${project.slug}`;

  // Get translated tags - they're stored as an array in translations
  const translatedTags = project.tags.map((tag, index) => {
    const translatedTag = t(`${translationKey}.tags.${index}`);
    // If translation key is returned (not found), use original tag
    return translatedTag.startsWith(`${translationKey}.tags.`) ? tag : translatedTag;
  });

  return {
    ...project,
    title: t(`${translationKey}.title`),
    subtitle: t(`${translationKey}.subtitle`),
    tags: translatedTags,
    challenge: t(`${translationKey}.challenge`),
    approach: t(`${translationKey}.approach`),
    impact: t(`${translationKey}.impact`),
    metrics: project.metrics
      ? {
          ...project.metrics,
          label: t(`${translationKey}.metrics.label`),
        }
      : undefined,
  };
}

export function useTranslatedProjects(projects: Project[]): Project[] {
  return projects.map((project) => useTranslatedProject(project));
}

export function useTranslatedEducation(education: Education[]): Education[] {
  const { t } = useI18n();

  return education.map((edu, index) => {
    const translationKey = `data.education.${index}`;
    return {
      ...edu,
      institution: t(`${translationKey}.institution`),
      degree: t(`${translationKey}.degree`),
      details: edu.details ? t(`${translationKey}.details`) : undefined,
    };
  });
}

export function useTranslatedExperience(experience: Experience[]): Experience[] {
  const { t } = useI18n();

  return experience.map((exp, index) => {
    const translationKey = `data.experience.${index}`;

    // Get translated highlights
    const translatedHighlights = exp.highlights.map((highlight, highlightIndex) => {
      const translatedHighlight = t(`${translationKey}.highlights.${highlightIndex}`);
      // If translation key is returned (not found), use original
      return translatedHighlight.startsWith(`${translationKey}.highlights.`) ? highlight : translatedHighlight;
    });

    return {
      ...exp,
      company: t(`${translationKey}.company`),
      role: t(`${translationKey}.role`),
      location: t(`${translationKey}.location`),
      highlights: translatedHighlights,
    };
  });
}

