import Link from "next/link";
import { getProfile } from "@/lib/content";
import NavLink from "./NavLink";
import ThemeSelector from "./ThemeSelector";

export default function Header() {
  const profile = getProfile();

  return (
    <header className="border-b border-surface/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-semibold text-text hover:text-primary transition-colors">
            {profile.name}
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex items-center space-x-1">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/projects">Projects</NavLink>
              <NavLink href="/experience">Experience</NavLink>
              <NavLink href="/about">About</NavLink>
            </nav>
            <ThemeSelector />
          </div>
        </div>
      </div>
    </header>
  );
}

