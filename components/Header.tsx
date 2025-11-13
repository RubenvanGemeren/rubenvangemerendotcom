"use client";

import { useState } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import { useI18n } from "@/lib/i18n-context";

export default function Header() {
  const { t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-surface/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-lg font-semibold text-text hover:text-primary transition-colors"
            onClick={closeMobileMenu}
          >
            {t("common.name")}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center space-x-1">
              <NavLink href="/">{t("common.nav.home")}</NavLink>
              <NavLink href="/projects">{t("common.nav.projects")}</NavLink>
              <NavLink href="/experience">{t("common.nav.experience")}</NavLink>
              <NavLink href="/about">{t("common.nav.about")}</NavLink>
            </nav>
            <LanguageSelector />
            <ThemeSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-text hover:text-primary hover:bg-surface/50 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-2 py-4 border-t border-surface/50">
            <NavLink href="/" onClick={closeMobileMenu} className="py-2">
              {t("common.nav.home")}
            </NavLink>
            <NavLink href="/projects" onClick={closeMobileMenu} className="py-2">
              {t("common.nav.projects")}
            </NavLink>
            <NavLink href="/experience" onClick={closeMobileMenu} className="py-2">
              {t("common.nav.experience")}
            </NavLink>
            <NavLink href="/about" onClick={closeMobileMenu} className="py-2">
              {t("common.nav.about")}
            </NavLink>
            <div className="flex items-center gap-4 pt-2">
              <LanguageSelector />
              <ThemeSelector />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

