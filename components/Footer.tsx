import { getProfile } from "@/lib/content";
import Link from "next/link";

export default function Footer() {
  const profile = getProfile();

  return (
    <footer className="border-t border-surface/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-subtle">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <div className="flex items-center space-x-6">
            {profile.links.github && (
              <Link
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-subtle hover:text-primary transition-colors"
              >
                GitHub
              </Link>
            )}
            {profile.links.linkedin && (
              <Link
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-subtle hover:text-primary transition-colors"
              >
                LinkedIn
              </Link>
            )}
            {profile.links.email && (
              <Link
                href={`mailto:${profile.links.email}`}
                className="text-sm text-text-subtle hover:text-primary transition-colors"
              >
                Email
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

