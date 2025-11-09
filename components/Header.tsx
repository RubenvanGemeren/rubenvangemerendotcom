"use client";

import Link from "next/link";
import NavLink from "./NavLink";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import { useI18n } from "@/lib/i18n-context";

export default function Header() {
  const { t } = useI18n();

  return (
    <header className="border-b border-surface/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-semibold text-text hover:text-primary transition-colors">
            {t("common.name")}
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex items-center space-x-1">
              <NavLink href="/">{t("common.nav.home")}</NavLink>
              <NavLink href="/projects">{t("common.nav.projects")}</NavLink>
              <NavLink href="/experience">{t("common.nav.experience")}</NavLink>
              <NavLink href="/about">{t("common.nav.about")}</NavLink>
            </nav>
            <LanguageSelector />
            <ThemeSelector />
          </div>
        </div>
      </div>
    </header>
  );
}

