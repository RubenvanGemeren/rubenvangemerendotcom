"use client";

import { motion } from "framer-motion";
import GitHubActivity from "./GitHubActivity";
import { useI18n } from "@/lib/i18n-context";
import type { Profile } from "@/types/content";

interface GitHubPageContentProps {
  profile: Profile;
}

export default function GitHubPageContent({ profile }: GitHubPageContentProps) {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl w-full"
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-6 md:mb-8">GitHub Activity</h1>

      <div className="space-y-6 md:space-y-8">
        <div className="overflow-x-auto">
          <GitHubActivity
            githubUrl={profile.links.github}
            showLabels={true}
            showTotalContributions={true}
            className="min-w-0"
          />
        </div>
      </div>
    </motion.div>
  );
}

