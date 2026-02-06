"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  markdownComponents,
  preprocessCustomDirectives,
  type CustomDirective,
} from '@/lib/blog/markdown-components';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  /** Override or extend default component mappings */
  componentOverrides?: Partial<Components>;
  /** Additional custom directives beyond the defaults */
  customDirectives?: CustomDirective[];
  className?: string;
}

/**
 * Custom markdown rendering component.
 * This is the "translation layer" that converts stored markdown to themed UI.
 *
 * Features:
 * - GitHub Flavored Markdown (tables, strikethrough, task lists)
 * - Custom directives (:::info, :::warning, :::tip, :::styled)
 * - Theme-aware styling via CSS variables
 * - Extensible component map for custom tags
 * - Raw HTML support for advanced formatting
 */
export default function MarkdownRenderer({
  content,
  componentOverrides,
  customDirectives,
  className = '',
}: MarkdownRendererProps) {
  // Pre-process custom directives into HTML
  const processedContent = preprocessCustomDirectives(content, customDirectives);

  // Merge default components with any overrides
  const components: Components = {
    ...markdownComponents,
    ...componentOverrides,
  };

  return (
    <div className={`markdown-content prose-custom ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
