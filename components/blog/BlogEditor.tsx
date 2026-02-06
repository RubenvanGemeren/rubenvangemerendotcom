"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import { useI18n } from "@/lib/i18n-context";
import type { BlogPostDetail, CreateBlogPostInput, UpdateBlogPostInput } from "@/types/blog";

interface BlogEditorProps {
  post?: BlogPostDetail | null;
  adminKey: string;
  onSave: () => void;
  onCancel: () => void;
}

export default function BlogEditor({
  post,
  adminKey,
  onSave,
  onCancel,
}: BlogEditorProps) {
  const { t } = useI18n();
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title || "");
  const [subtitle, setSubtitle] = useState(post?.subtitle || "");
  const [summary, setSummary] = useState(post?.summary || "");
  const [content, setContent] = useState(post?.content || "");
  const [tagsInput, setTagsInput] = useState(post?.tags?.join(", ") || "");
  const [coverImage, setCoverImage] = useState(post?.coverImage || "");
  const [metadataInput, setMetadataInput] = useState(
    post?.metadata ? JSON.stringify(post.metadata, null, 2) : "{}"
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = useCallback(async () => {
    if (!title.trim() || !summary.trim() || !content.trim()) {
      setError(t("pages.blog.admin.editor.requiredFields"));
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      let metadata: Record<string, unknown> = {};
      try {
        metadata = JSON.parse(metadataInput);
      } catch {
        setError(t("pages.blog.admin.editor.invalidMetadata"));
        setSaving(false);
        return;
      }

      if (isEditing && post) {
        // Update existing post
        const body: UpdateBlogPostInput = {
          title,
          subtitle: subtitle || undefined,
          summary,
          content,
          tags,
          coverImage: coverImage || undefined,
          metadata,
        };

        const response = await fetch(`/api/blog/${post.slug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update post");
        }
      } else {
        // Create new post
        const body: CreateBlogPostInput = {
          title,
          subtitle: subtitle || undefined,
          summary,
          content,
          tags,
          coverImage: coverImage || undefined,
          metadata,
        };

        const response = await fetch("/api/blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to create post");
        }
      }

      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }, [title, subtitle, summary, content, tagsInput, coverImage, metadataInput, isEditing, post, adminKey, onSave, t]);

  const inputClass =
    "w-full px-4 py-2 rounded-button border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text">
          {isEditing
            ? t("pages.blog.admin.editor.editTitle")
            : t("pages.blog.admin.editor.createTitle")}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 rounded-button bg-surface text-text border border-border hover:opacity-80 disabled:opacity-50 transition-opacity"
          >
            {t("pages.blog.admin.editor.cancel")}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-button bg-primary text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {saving
              ? t("pages.blog.admin.editor.saving")
              : t("pages.blog.admin.editor.save")}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-button bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Post metadata fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">
            {t("pages.blog.admin.editor.titleLabel")} *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder={t("pages.blog.admin.editor.titlePlaceholder")}
            disabled={saving}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1">
            {t("pages.blog.admin.editor.subtitleLabel")}
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className={inputClass}
            placeholder={t("pages.blog.admin.editor.subtitlePlaceholder")}
            disabled={saving}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1">
          {t("pages.blog.admin.editor.summaryLabel")} *
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className={`${inputClass} resize-none`}
          rows={2}
          placeholder={t("pages.blog.admin.editor.summaryPlaceholder")}
          disabled={saving}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">
            {t("pages.blog.admin.editor.tagsLabel")}
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className={inputClass}
            placeholder={t("pages.blog.admin.editor.tagsPlaceholder")}
            disabled={saving}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1">
            {t("pages.blog.admin.editor.coverImageLabel")}
          </label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className={inputClass}
            placeholder={t("pages.blog.admin.editor.coverImagePlaceholder")}
            disabled={saving}
          />
        </div>
      </div>

      {/* Metadata JSON editor */}
      <div>
        <label className="block text-sm font-medium text-text mb-1">
          {t("pages.blog.admin.editor.metadataLabel")}
        </label>
        <textarea
          value={metadataInput}
          onChange={(e) => setMetadataInput(e.target.value)}
          className={`${inputClass} font-mono text-sm resize-none`}
          rows={3}
          placeholder='{"author": "John", "readTime": "5 min"}'
          disabled={saving}
        />
      </div>

      {/* Content editor with preview */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          {t("pages.blog.admin.editor.contentLabel")} *
        </label>
        <Tabs defaultValue="write" className="w-full">
          <TabsList>
            <TabsTrigger value="write">
              {t("pages.blog.admin.editor.write")}
            </TabsTrigger>
            <TabsTrigger value="preview">
              {t("pages.blog.admin.editor.preview")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="write">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`${inputClass} font-mono text-sm resize-vertical min-h-[400px]`}
              placeholder={t("pages.blog.admin.editor.contentPlaceholder")}
              disabled={saving}
            />
          </TabsContent>
          <TabsContent value="preview">
            <div className="min-h-[400px] p-4 border border-border rounded-button bg-surface overflow-auto">
              {content ? (
                <MarkdownRenderer content={content} />
              ) : (
                <p className="text-text-subtle italic">
                  {t("pages.blog.admin.editor.noContent")}
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
