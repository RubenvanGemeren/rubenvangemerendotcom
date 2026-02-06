"use client";

import ClayCard from "@/components/ClayCard";
import Tag from "@/components/Tag";
import { useI18n } from "@/lib/i18n-context";
import type { BlogPostDetail } from "@/types/blog";

interface MetadataSidebarProps {
  post: BlogPostDetail;
}

export default function MetadataSidebar({ post }: MetadataSidebarProps) {
  const { t } = useI18n();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ClayCard hover={false} className="p-5 sticky top-24">
      <div className="space-y-5">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-text mb-2">
              {t("pages.blog.sidebar.tags")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        )}

        {/* Dates */}
        <div>
          <h3 className="text-sm font-semibold text-text mb-2">
            {t("pages.blog.sidebar.published")}
          </h3>
          <p className="text-sm text-text-subtle">
            {formatDate(post.createdAt)}
          </p>
        </div>

        {post.updatedAt !== post.createdAt && (
          <div>
            <h3 className="text-sm font-semibold text-text mb-2">
              {t("pages.blog.sidebar.lastUpdated")}
            </h3>
            <p className="text-sm text-text-subtle">
              {formatDate(post.updatedAt)}
            </p>
          </div>
        )}

        {/* Custom metadata from the post */}
        {Object.entries(post.metadata).map(([key, value]) => {
          if (!value) return null;

          // Handle array values (render as tags)
          if (Array.isArray(value)) {
            return (
              <div key={key}>
                <h3 className="text-sm font-semibold text-text mb-2 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {value.map((item, i) => (
                    <Tag key={i} className="text-xs">
                      {String(item)}
                    </Tag>
                  ))}
                </div>
              </div>
            );
          }

          // Handle string/number values
          return (
            <div key={key}>
              <h3 className="text-sm font-semibold text-text mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </h3>
              <p className="text-sm text-text-subtle">{String(value)}</p>
            </div>
          );
        })}
      </div>
    </ClayCard>
  );
}
