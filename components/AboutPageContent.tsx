"use client";

import { motion } from "framer-motion";
import ClayCard from "./ClayCard";
import type { Profile, Education } from "@/types/content";
import { useI18n } from "@/lib/i18n-context";
import { useTranslatedEducation } from "@/lib/use-translated-data";

interface AboutPageContentProps {
  profile: Profile;
  education: Education[];
}

export default function AboutPageContent({ profile, education }: AboutPageContentProps) {
  const { t } = useI18n();
  const translatedEducation = useTranslatedEducation(education);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl"
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-6 md:mb-8">{t("pages.about.title")}</h1>

      <div className="space-y-6 md:space-y-8">
        <ClayCard className="p-4 md:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-text mb-3 md:mb-4">{t("pages.about.background.title")}</h2>
          {/* <p className="text-text-subtle leading-relaxed mb-4">{profile.summary}</p> */}
          <p className="text-sm md:text-base text-text-subtle leading-relaxed">
            {t("pages.about.background.description")}
          </p>
        </ClayCard>

        <ClayCard className="p-4 md:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-text mb-3 md:mb-4">{t("pages.about.values.title")}</h2>
          <ul className="space-y-2 md:space-y-3 text-text-subtle">
            <li className="flex items-start">
              <span className="text-primary mr-2 flex-shrink-0">•</span>
              <span className="text-sm md:text-base">
                <strong className="text-text">{t("pages.about.values.handsOn.label")}</strong> {t("pages.about.values.handsOn.text")}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2 flex-shrink-0">•</span>
              <span className="text-sm md:text-base">
                <strong className="text-text">{t("pages.about.values.functionOverForm.label")}</strong> {t("pages.about.values.functionOverForm.text")}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2 flex-shrink-0">•</span>
              <span className="text-sm md:text-base">
                <strong className="text-text">{t("pages.about.values.fullStack.label")}</strong> {t("pages.about.values.fullStack.text")}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2 flex-shrink-0">•</span>
              <span className="text-sm md:text-base">
                <strong className="text-text">{t("pages.about.values.practicalInnovation.label")}</strong> {t("pages.about.values.practicalInnovation.text")}
              </span>
            </li>
          </ul>
        </ClayCard>

        {translatedEducation.length > 0 && (
          <ClayCard className="p-4 md:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-text mb-3 md:mb-4">{t("pages.about.education.title")}</h2>
            <div className="space-y-3 md:space-y-4">
              {translatedEducation.map((edu, index) => (
                <div key={index} className="pb-3 md:pb-4 border-b border-surface/50 last:border-0 last:pb-0">
                  <h3 className="text-base md:text-lg font-semibold text-text mb-1">{edu.degree}</h3>
                  <p className="text-primary mb-2 text-sm md:text-base">{edu.institution}</p>
                  <p className="text-sm text-text-subtle mb-2">
                    {new Date(edu.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    –{" "}
                    {new Date(edu.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  {edu.details && (
                    <p className="text-sm text-text-subtle">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </ClayCard>
        )}
      </div>
    </motion.div>
  );
}

