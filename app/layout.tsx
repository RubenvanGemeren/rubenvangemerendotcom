import type { Metadata, Viewport } from "next";
import { Inter, Roboto } from "next/font/google";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { GlassModeProvider } from "@/lib/glass-mode-context";
import { I18nProvider } from "@/lib/i18n-context";
import LangAttribute from "@/components/LangAttribute";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Ruben van Gemeren - Software Engineer",
  description: "Portfolio of a software engineer specializing in distributed systems, large-scale data processing.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.className} ${spaceMono.variable}`}>
        <svg style={{ display: "none" }} xmlns="http://www.w3.org/2000/svg">
          <filter id="glass-blur" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.007" numOctaves={1} result="turbulence" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale={200} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <I18nProvider>
          <ThemeProvider>
            <GlassModeProvider>
              <LangAttribute />
              {children}
            </GlassModeProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

