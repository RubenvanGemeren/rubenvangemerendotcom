"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ClayCard from "@/components/ClayCard";
import Tag from "@/components/Tag";
import { useI18n } from "@/lib/i18n-context";
import type { BlogPostSummary } from "@/types/blog";

export default function BlogListContent() {
  const { t } = useI18n();
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-8">
          {t("pages.blog.title")}
        </h1>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <ClayCard key={i} hover={false}>
              <div className="p-6 animate-pulse">
                <div className="h-6 bg-surface rounded w-2/3 mb-3" />
                <div className="h-4 bg-surface rounded w-full mb-2" />
                <div className="h-4 bg-surface rounded w-4/5" />
              </div>
            </ClayCard>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-8">
          {t("pages.blog.title")}
        </h1>
        <ClayCard hover={false}>
          <div className="p-6 text-center text-text-subtle">
            <p>{t("pages.blog.error")}</p>
          </div>
        </ClayCard>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-2">
          {t("pages.blog.title")}
        </h1>
        <p className="text-text-subtle mb-8">
          {t("pages.blog.description")}
        </p>
      </motion.div>

      {posts.length === 0 ? (
        <ClayCard hover={false}>
          <div className="p-8 text-center text-text-subtle">
            <p>{t("pages.blog.noPosts")}</p>
          </div>
        </ClayCard>
      ) : (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <ClayCard className="p-6 cursor-pointer">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl font-semibold text-text group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        {post.subtitle && (
                          <p className="text-text-subtle text-sm mt-1">
                            {post.subtitle}
                          </p>
                        )}
                      </div>
                      <time className="text-xs text-text-subtle whitespace-nowrap mt-1">
                        {formatDate(post.createdAt)}
                      </time>
                    </div>

                    <p className="text-text-subtle leading-relaxed line-clamp-2">
                      {post.summary}
                    </p>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </ClayCard>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
