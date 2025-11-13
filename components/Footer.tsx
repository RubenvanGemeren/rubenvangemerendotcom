"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import type { Profile } from "@/types/content";

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const { t } = useI18n();

  return (
    <footer className="border-t border-surface/50 mt-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-subtle">
            © {new Date().getFullYear()} {t("common.name")}
          </p>
          <div className="flex items-center space-x-6">
            {profile.links.github && (
              <Link
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-subtle hover:text-primary transition-colors"
              >
                {t("common.links.github")}
              </Link>
            )}
            {profile.links.linkedin && (
              <Link
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-subtle hover:text-primary transition-colors"
              >
                {t("common.links.linkedin")}
              </Link>
            )}
            {profile.links.email && (
              <Link
                href={`mailto:${profile.links.email}`}
                className="text-sm text-text-subtle hover:text-primary transition-colors"
              >
                {t("common.links.email")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

