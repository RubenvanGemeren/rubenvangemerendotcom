import type { Metadata, Viewport } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { I18nProvider } from "@/lib/i18n-context";
import LangAttribute from "@/components/LangAttribute";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
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
      <body className={`${inter.className} ${roboto.variable}`}>
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

