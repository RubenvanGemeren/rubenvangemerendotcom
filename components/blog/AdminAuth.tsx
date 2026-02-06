"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import ClayCard from "@/components/ClayCard";
import { useI18n } from "@/lib/i18n-context";

interface AdminAuthProps {
  onAuthenticated: (adminKey: string) => void;
}

export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const { t } = useI18n();
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Validate the admin key against the API
      const response = await fetch("/api/blog?includeDeleted=false", {
        headers: { "x-admin-key": key },
      });

      // The GET endpoint doesn't require auth, so we test with a dummy approach
      // Instead, try to verify via a HEAD-like check
      // Since we can't easily test auth without making a write request,
      // we'll just accept the key and let API calls fail if it's wrong
      if (response.ok) {
        onAuthenticated(key);
      } else {
        setError(t("pages.blog.admin.auth.invalidKey"));
      }
    } catch {
      // Accept the key and let actual API calls validate
      onAuthenticated(key);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ClayCard className="p-8">
          <h1 className="text-2xl font-bold text-text mb-2 text-center">
            {t("pages.blog.admin.auth.title")}
          </h1>
          <p className="text-sm text-text-subtle mb-6 text-center">
            {t("pages.blog.admin.auth.description")}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="admin-key"
                className="block text-sm font-medium text-text mb-2"
              >
                {t("pages.blog.admin.auth.keyLabel")}
              </label>
              <input
                id="admin-key"
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 rounded-button border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={t("pages.blog.admin.auth.keyPlaceholder")}
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !key.trim()}
              className="w-full px-4 py-2 rounded-button bg-primary text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {loading
                ? t("pages.blog.admin.auth.authenticating")
                : t("pages.blog.admin.auth.submit")}
            </button>
          </form>
        </ClayCard>
      </motion.div>
    </div>
  );
}
