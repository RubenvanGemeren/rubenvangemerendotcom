import { Button } from "@/components/ui/button"
import Link from "next/link";

interface SimpleButtonLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "outline" | "default" | "ghost" | "link" | "destructive" | "secondary" | null;
  size?: "icon" | "sm" | "lg" | null;
  ariaLabel?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function SimpleButtonLink({
  href,
  children,
  onClick,
  className,
  variant,
  size,
  ariaLabel,
  icon,
  iconPosition,
}: SimpleButtonLinkProps): JSX.Element {
  return (
    <Button variant={variant as "outline" | "default" | "ghost" | "link" | "destructive" | "secondary" | null} size={size as "icon" | "sm" | "lg" | null} aria-label={ariaLabel} className={className} onClick={onClick}>
      <Link href={href}>
        {iconPosition === "left" && icon}
        {children}
        {iconPosition === "right" && icon}
      </Link>
    </Button>
  );
}
