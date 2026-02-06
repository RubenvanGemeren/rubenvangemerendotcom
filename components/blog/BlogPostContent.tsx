"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ClayCard from "@/components/ClayCard";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import MetadataSidebar from "@/components/blog/MetadataSidebar";
import { useI18n } from "@/lib/i18n-context";
import type { BlogPostDetail } from "@/types/blog";

interface BlogPostContentProps {
  slug: string;
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const { t } = useI18n();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (response.status === 404) {
          setError("not_found");
          return;
        }
        if (!response.ok) throw new Error("Failed to fetch post");
        const data = await response.json();
        setPost(data.post);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-10 bg-surface rounded w-2/3 mb-4" />
          <div className="h-5 bg-surface rounded w-1/3 mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-surface rounded w-full" />
            <div className="h-4 bg-surface rounded w-5/6" />
            <div className="h-4 bg-surface rounded w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error === "not_found" || !post) {
    return (
      <div className="max-w-6xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold text-text mb-4">
          {t("pages.blog.postNotFound")}
        </h1>
        <Link
          href="/blog"
          className="text-primary hover:opacity-80 transition-opacity"
        >
          {t("pages.blog.backToList")}
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-text mb-4">
          {t("pages.blog.error")}
        </h1>
        <Link
          href="/blog"
          className="text-primary hover:opacity-80 transition-opacity"
        >
          {t("pages.blog.backToList")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-text-subtle hover:text-primary transition-colors mb-6"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("pages.blog.backToList")}
        </Link>

        {/* Title section */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-2">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-lg sm:text-xl text-text-subtle">
              {post.subtitle}
            </p>
          )}
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full rounded-card shadow-clay max-h-96 object-cover"
            />
          </div>
        )}

        {/* Two-column layout: content + sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            <ClayCard hover={false} className="p-6 sm:p-8">
              <MarkdownRenderer content={post.content} />
            </ClayCard>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <MetadataSidebar post={post} />
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
