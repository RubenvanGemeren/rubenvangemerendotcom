"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  animateOnHover?: boolean;
}

export function GradientText({
  children,
  className,
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 3,
  showBorder = false,
  animateOnHover = false,
}: GradientTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = animateOnHover ? isHovered : true;

  const gradientStyle = isActive
    ? {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
      }
    : undefined;

  return (
    <span
      className={cn(
        "relative inline-flex items-center",
        showBorder && "rounded-full border border-transparent px-3 py-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showBorder && (
        <span
          className={cn(
            "absolute inset-0 rounded-full blur-sm transition-opacity",
            isActive ? "opacity-20" : "opacity-0"
          )}
          style={gradientStyle}
        />
      )}
      <span
        className={cn(
          "bg-[length:300%_auto]",
          isActive && "animate-gradient bg-clip-text text-transparent"
        )}
        style={gradientStyle}
      >
        {children}
      </span>
    </span>
  );
}
