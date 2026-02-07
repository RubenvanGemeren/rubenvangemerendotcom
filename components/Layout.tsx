import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AnimatedBlobs from "./AnimatedBlobs";
import { getProfile } from "@/lib/content";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const profile = getProfile();

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBlobs />
      {/* <Header /> */}
      <main className="flex-1 flex flex-col relative z-10">{children}</main>
      <Footer profile={profile} />
    </div>
  );
}

