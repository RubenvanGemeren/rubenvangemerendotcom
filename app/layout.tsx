import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { theme } from "@/config/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Senior Software Engineer - Distributed Systems & Data Platforms",
  description: "Portfolio of a senior software engineer specializing in distributed systems, large-scale data processing, and cloud infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          // @ts-expect-error CSS variables
          "--color-primary": theme.colors.primary,
          "--color-secondary": theme.colors.secondary,
          "--color-accent": theme.colors.accent,
          "--color-background": theme.colors.background,
          "--color-surface": theme.colors.surface,
          "--color-text": theme.colors.text,
          "--color-text-subtle": theme.colors.subtle,
          "--radius-card": theme.radius.card,
          "--radius-button": theme.radius.button,
          "--shadow-clay": theme.shadows.clay,
          "--shadow-clay-hover": theme.shadows.clayHover,
        }}
      >
        {children}
      </body>
    </html>
  );
}

