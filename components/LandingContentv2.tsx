"use client";

import { motion } from "framer-motion";
import GitHubActivity from "./GitHubActivity";
import type { Profile, Project } from "@/types/content";
import { useI18n } from "@/lib/i18n-context";
import { TypeWriter } from "./TypeWriter";
import { useState } from "react";
import { SimpleButtonLink } from "./SimpleButtonLink";
import { create } from "@/app/actions/cookies";
import {
  DownloadIcon
} from "lucide-react";

interface LandingContentv2Props {
  profile: Profile;
  featuredProjects: Project[];
  hasSeenIntro?: boolean;
}

export default function LandingContentv2({ profile, hasSeenIntro }: LandingContentv2Props) {
  const { t } = useI18n();
  const [showSecondTypeWriter, startSecondTypeWriter] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showIntro, setShowIntro] = useState(!hasSeenIntro);

  return (
    <div className="flex-1 w-full flex flex-col overflow-hidden">
      {/* Top section: TypeWriter content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 md:mt-8 mx-6 md:mx-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 items-start">
          <div>
            {/* FIRST INTRO ANTIMATION*/}
            {showIntro && (
              <TypeWriter
                sequence={[
                  `Hi, ${t("common.intro.hi")} ${t("common.nickname")}...\n${t("common.intro.and")} ${t("common.title")}\n`,
                  1000,
                  () => {
                    // Callback executed when first TypeWriter finishes
                    startSecondTypeWriter(true);
                  }
                ]}
                keyStrokeDelay={30}
                cursor={true}
                repeat={0}
                style={{ whiteSpace: 'pre-line', fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--color-primary)'}}
              />
            )}
            {showSecondTypeWriter && showIntro && (
              <TypeWriter
                sequence={[
                  `${t("common.summary")}`,
                  1000,
                  () => {
                    // Callback executed when second TypeWriter finishes
                    setShowButtons(true);
                    create('hasSeenIntro', 'true', {
                      path: '/',
                      maxAge: 60 * 5, // 5 minutes
                    });
                  }
                ]}
                keyStrokeDelay={30}
                cursor={true}
                repeat={0}
                style={{ whiteSpace: 'pre-line', fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--color-secondary)'}}
              />
            )}


            {/* SECOND INTRO ANTIMATION*/}
            {!showIntro && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 md:mt-8"
              >
                <div>
                  <TypeWriter
                    sequence={[
                      `Hi, ${t("common.intro.hi")} ${t("common.nickname")}...\n${t("common.intro.and")} ${t("common.title")}\n`,
                      50,
                      () => {
                        // Callback executed when first TypeWriter finishes
                        startSecondTypeWriter(true);
                      }
                    ]}
                    keyStrokeDelay={2}
                    cursor={false}
                    repeat={0}
                    style={{ whiteSpace: 'pre-line', fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--color-primary)'}}
                  />
                  {showSecondTypeWriter && !showIntro && (
                    <TypeWriter
                      sequence={[
                        `${t("common.summary")}`,
                        200,
                        () => {
                          // Callback executed when second TypeWriter finishes
                          setShowButtons(true);
                        }
                      ]}
                      keyStrokeDelay={1}
                      cursor={true}
                      repeat={0}
                      style={{ whiteSpace: 'pre-line', fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--color-secondary)'}}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Middle section: Menu */}
      {showButtons && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="px-6 md:px-8 mt-4 mb-3"
        >
          <div className="flex gap-4 items-center">
            <SimpleButtonLink variant="outline" href="/projects">{t("common.nav.projects")}</SimpleButtonLink>
            <SimpleButtonLink variant="outline" href="/experience">{t("common.nav.experience")}</SimpleButtonLink>
            <SimpleButtonLink variant="outline" href="/about">{t("common.nav.about")}</SimpleButtonLink>
            <SimpleButtonLink variant="outline" href="data/cv_ruben_van_gemeren_feb_26.pdf" download="cv_ruben_van_gemeren_feb_26.pdf">
              {t("common.nav.cv")}
              <DownloadIcon className="w-2 h-2 ml-2 inline-block" />
            </SimpleButtonLink>
          </div>
        </motion.div>
      )}

      {/* Bottom section: GitHub calendar - pushed to bottom */}
      {showButtons && (
        <div className="flex-1 flex items-end justify-center pb-6 px-6 md:px-8 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full flex items-end"
          >
            {profile.links?.github && (
              <GitHubActivity
                githubUrl={profile.links.github}
                compact
                rounded
                lastMonths={13}
                showLabels={false}
                showTotalContributions={false}
                showSeeMore={true}
                seeMoreHref="/github"
                seeMoreText={t("pages.home.github.seeMore")}
                className="w-full"
              />
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

