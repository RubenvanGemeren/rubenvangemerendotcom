import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { I18nProvider } from "@/lib/i18n-context";
import LangAttribute from "@/components/LangAttribute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ruben van Gemeren - Software Engineer",
  description: "Portfolio of a software engineer specializing in distributed systems, large-scale data processing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <ThemeProvider>
            <LangAttribute />
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

