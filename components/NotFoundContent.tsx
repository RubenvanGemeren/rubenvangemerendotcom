"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

export default function NotFoundContent() {
  const { t } = useI18n();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-text mb-4">{t("common.notFound.title")}</h1>
      <p className="text-lg text-text-subtle mb-8">{t("common.notFound.message")}</p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-primary text-white rounded-button hover:opacity-90 transition-opacity"
      >
        {t("common.notFound.goHome")}
      </Link>
    </div>
  );
}

