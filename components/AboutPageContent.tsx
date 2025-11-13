"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 md:mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-text">{t("pages.about.title")}</h1>
      </motion.div>

      <div className="space-y-6 md:space-y-8">
        <ClayCard className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-semibold text-text mb-3 md:mb-4">{t("pages.about.background.title")}</h2>
              {/* <p className="text-text-subtle leading-relaxed mb-4">{profile.summary}</p> */}
              <p className="text-sm md:text-base text-text-subtle leading-relaxed">
                {t("pages.about.background.description")}
              </p>
            </div>
            <div className="flex-shrink-0 md:w-[25%] w-full">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/data/resources/images/me-on-cliff.jpeg"
                  alt={t("pages.about.imageCaption")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <p className="text-xs md:text-sm text-text-subtle text-center italic mt-2">
                {t("pages.about.imageCaption")}
              </p>
            </div>
          </div>
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
    </>
  );
}

