import React from 'react';
import type { Components } from 'react-markdown';

/**
 * Custom component map for react-markdown.
 * This is the "translation layer" that converts markdown elements
 * into themed React components using the site's CSS variables.
 *
 * Each component maps to a markdown element and applies theme-aware styling.
 * You can extend this by adding new entries or overriding existing ones.
 */
export const markdownComponents: Components = {
  // Headings
  h1: ({ children, ...props }) => (
    <h1
      className="text-3xl sm:text-4xl font-bold text-text mt-8 mb-4 leading-tight"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="text-2xl sm:text-3xl font-semibold text-text mt-8 mb-3 leading-tight border-b border-border/30 pb-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="text-xl sm:text-2xl font-semibold text-text mt-6 mb-2 leading-snug"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="text-lg sm:text-xl font-medium text-text mt-5 mb-2"
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5
      className="text-base sm:text-lg font-medium text-text mt-4 mb-1"
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6
      className="text-sm sm:text-base font-medium text-text-subtle mt-4 mb-1"
      {...props}
    >
      {children}
    </h6>
  ),

  // Paragraphs
  p: ({ children, ...props }) => (
    <p className="text-text leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),

  // Links
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),

  // Bold and italic
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-text" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-text" {...props}>
      {children}
    </em>
  ),

  // Blockquote
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-primary/50 pl-4 py-1 my-4 bg-primary/5 rounded-r-button italic text-text-subtle"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded bg-surface text-primary text-sm font-mono border border-border/50"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={`${className || ''} text-sm`} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="bg-surface border border-border rounded-card p-4 overflow-x-auto my-4 text-sm leading-relaxed font-mono"
      {...props}
    >
      {children}
    </pre>
  ),

  // Lists
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside mb-4 space-y-1 text-text" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-text" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-text leading-relaxed" {...props}>
      {children}
    </li>
  ),

  // Images
  img: ({ src, alt, ...props }) => (
    <figure className="my-6">
      <img
        src={src}
        alt={alt || ''}
        className="rounded-card w-full max-w-full h-auto shadow-clay"
        loading="lazy"
        {...props}
      />
      {alt && (
        <figcaption className="text-center text-sm text-text-subtle mt-2 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Horizontal rule
  hr: ({ ...props }) => (
    <hr className="border-border my-8" {...props} />
  ),

  // Table
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse border border-border rounded-card" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-surface" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="border border-border px-4 py-2 text-left text-sm font-semibold text-text" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-border px-4 py-2 text-sm text-text" {...props}>
      {children}
    </td>
  ),
};

/**
 * Custom directive handlers for extended markdown syntax.
 * These process custom blocks like :::info, :::warning, :::tip, :::styled
 */
export interface CustomDirective {
  name: string;
  className: string;
  icon?: string;
  label?: string;
}

export const defaultDirectives: CustomDirective[] = [
  {
    name: 'info',
    className: 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100',
    icon: 'ℹ️',
    label: 'Info',
  },
  {
    name: 'warning',
    className: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100',
    icon: '⚠️',
    label: 'Warning',
  },
  {
    name: 'tip',
    className: 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-700 text-green-900 dark:text-green-100',
    icon: '💡',
    label: 'Tip',
  },
  {
    name: 'danger',
    className: 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100',
    icon: '🚨',
    label: 'Danger',
  },
  {
    name: 'note',
    className: 'bg-surface border-primary/30 text-text',
    icon: '📝',
    label: 'Note',
  },
];

/**
 * Pre-processes markdown content to convert custom directives into HTML
 * that react-markdown can render via rehype-raw.
 *
 * Supported syntax:
 *   :::info
 *   Content here
 *   :::
 *
 *   :::styled{class="custom-class"}
 *   Content here
 *   :::
 */
export function preprocessCustomDirectives(
  content: string,
  directives: CustomDirective[] = defaultDirectives
): string {
  let processed = content;

  // Process named directives: :::name\n...\n:::
  for (const directive of directives) {
    const regex = new RegExp(
      `:::${directive.name}\\s*\\n([\\s\\S]*?)\\n:::`,
      'g'
    );
    processed = processed.replace(regex, (_match, innerContent: string) => {
      const label = directive.label ? `<div class="font-semibold mb-1">${directive.icon || ''} ${directive.label}</div>` : '';
      return `<div class="border-l-4 rounded-r-lg p-4 my-4 ${directive.className}">${label}<div>${innerContent.trim()}</div></div>`;
    });
  }

  // Process generic styled directive: :::styled{class="..."}
  const styledRegex = /:::styled\{class="([^"]+)"\}\s*\n([\s\S]*?)\n:::/g;
  processed = processed.replace(styledRegex, (_match, className: string, innerContent: string) => {
    return `<div class="${className}">${innerContent.trim()}</div>`;
  });

  return processed;
}
