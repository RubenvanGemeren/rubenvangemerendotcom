import { ObjectId } from 'mongodb';

export interface BlogPost {
  _id: ObjectId;
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string; // raw markdown
  tags: string[];
  coverImage?: string;
  metadata: Record<string, unknown>; // flexible sidebar metadata
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/** Shape used when creating a new blog post (no _id, dates auto-set) */
export interface CreateBlogPostInput {
  title: string;
  subtitle?: string;
  summary: string;
  content: string;
  tags: string[];
  coverImage?: string;
  metadata?: Record<string, unknown>;
}

/** Shape used when updating a blog post (all fields optional) */
export interface UpdateBlogPostInput {
  title?: string;
  subtitle?: string;
  summary?: string;
  content?: string;
  tags?: string[];
  coverImage?: string;
  metadata?: Record<string, unknown>;
}

/** Shape returned by the list API (no full content) */
export interface BlogPostSummary {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  tags: string[];
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

/** Shape returned by the detail API */
export interface BlogPostDetail {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string;
  tags: string[];
  coverImage?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
