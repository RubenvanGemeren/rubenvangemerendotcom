"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`
        px-3 py-2 rounded-button text-sm font-medium transition-colors
        ${
          isActive
            ? "text-primary bg-primary/10"
            : "text-text-subtle hover:text-text hover:bg-surface"
        }
      `}
    >
      {children}
    </Link>
  );
}

