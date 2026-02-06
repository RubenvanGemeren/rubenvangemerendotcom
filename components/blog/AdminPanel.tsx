"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClayCard from "@/components/ClayCard";
import Tag from "@/components/Tag";
import BlogEditor from "@/components/blog/BlogEditor";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useI18n } from "@/lib/i18n-context";
import { useGlassMode } from "@/lib/glass-mode-context";
import type { BlogPostSummary, BlogPostDetail } from "@/types/blog";

type AdminView = "list" | "create" | "edit";

interface AdminPanelProps {
  adminKey: string;
  onLogout: () => void;
}

export default function AdminPanel({ adminKey, onLogout }: AdminPanelProps) {
  const { t } = useI18n();
  const { isGlassModeEnabled } = useGlassMode();

  const [view, setView] = useState<AdminView>("list");
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPostDetail | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/blog?includeDeleted=true");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleEdit = async (slug: string) => {
    try {
      // Fetch full post for editing (bypass deletedAt filter via admin)
      const response = await fetch(`/api/blog/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch post");
      const data = await response.json();
      setEditingPost(data.post);
      setView("edit");
    } catch (err) {
      console.error("Failed to fetch post for editing:", err);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      if (!response.ok) throw new Error("Failed to delete post");
      setDeletingSlug(null);
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const handleSave = () => {
    setView("list");
    setEditingPost(null);
    fetchPosts();
  };

  const handleCancel = () => {
    setView("list");
    setEditingPost(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (view === "create") {
    return (
      <BlogEditor
        adminKey={adminKey}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  if (view === "edit" && editingPost) {
    return (
      <BlogEditor
        post={editingPost}
        adminKey={adminKey}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-text">
          {t("pages.blog.admin.title")}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setView("create")}
            className="px-4 py-2 rounded-button bg-primary text-white hover:opacity-90 transition-opacity"
          >
            {t("pages.blog.admin.createPost")}
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-button bg-surface text-text border border-border hover:opacity-80 transition-opacity"
          >
            {t("pages.blog.admin.logout")}
          </button>
        </div>
      </div>

      {/* Posts list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <ClayCard key={i} hover={false}>
              <div className="p-4 animate-pulse">
                <div className="h-5 bg-surface rounded w-1/2 mb-2" />
                <div className="h-4 bg-surface rounded w-3/4" />
              </div>
            </ClayCard>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <ClayCard hover={false}>
          <div className="p-8 text-center text-text-subtle">
            <p>{t("pages.blog.admin.noPosts")}</p>
          </div>
        </ClayCard>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {posts.map((post, index) => {
              const isDeleted = !!post.deletedAt;
              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <ClayCard
                    hover={!isDeleted}
                    className={`p-4 ${isDeleted ? "opacity-60" : ""}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`font-semibold text-text truncate ${
                              isDeleted ? "line-through" : ""
                            }`}
                          >
                            {post.title}
                          </h3>
                          {isDeleted && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                              {t("pages.blog.admin.deleted")}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-text-subtle truncate">
                          {post.summary}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-text-subtle">
                            {formatDate(post.createdAt)}
                          </span>
                          {post.tags.length > 0 && (
                            <div className="flex gap-1">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Tag key={tag} className="text-xs">
                                  {tag}
                                </Tag>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="text-xs text-text-subtle">
                                  +{post.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      {!isDeleted && (
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handleEdit(post.slug)}
                            className={`px-3 py-1.5 text-sm rounded-button border border-border text-text hover:opacity-80 transition-opacity ${
                              isGlassModeEnabled
                                ? "liquid-glass"
                                : "bg-surface"
                            }`}
                          >
                            {t("pages.blog.admin.edit")}
                          </button>

                          <AlertDialog
                            open={deletingSlug === post.slug}
                            onOpenChange={(open) =>
                              setDeletingSlug(open ? post.slug : null)
                            }
                          >
                            <AlertDialogTrigger asChild>
                              <button className="px-3 py-1.5 text-sm rounded-button border border-red-300 text-red-600 hover:bg-red-50 transition-colors">
                                {t("pages.blog.admin.delete")}
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {t("pages.blog.admin.deleteConfirm.title")}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {t(
                                    "pages.blog.admin.deleteConfirm.description"
                                  )}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  {t(
                                    "pages.blog.admin.deleteConfirm.cancel"
                                  )}
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(post.slug)}
                                >
                                  {t(
                                    "pages.blog.admin.deleteConfirm.confirm"
                                  )}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>
                  </ClayCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
