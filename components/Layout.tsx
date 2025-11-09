import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getProfile } from "@/lib/content";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const profile = getProfile();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer profile={profile} />
    </div>
  );
}

