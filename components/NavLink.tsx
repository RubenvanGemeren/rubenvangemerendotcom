"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlassMode } from "@/lib/glass-mode-context";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function NavLink({ href, children, onClick, className = "" }: NavLinkProps) {
  const pathname = usePathname();
  const { isGlassModeEnabled } = useGlassMode();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        px-3 py-2 rounded-button text-sm font-medium transition-colors
        ${isGlassModeEnabled ? "liquid-glass" : ""}
        ${
          isActive
            ? isGlassModeEnabled
              ? "text-primary"
              : "text-primary bg-primary/10"
            : isGlassModeEnabled
            ? "text-text-subtle hover:text-text"
            : "text-text-subtle hover:text-text hover:bg-surface"
        }
        ${className}
      `}
    >
      {children}
    </Link>
  );
}

