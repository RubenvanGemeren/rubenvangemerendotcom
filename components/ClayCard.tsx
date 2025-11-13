"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useGlassMode } from "@/lib/glass-mode-context";

interface ClayCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function ClayCard({ children, className = "", hover = true }: ClayCardProps) {
  const { isGlassModeEnabled } = useGlassMode();

  return (
    <motion.div
      className={`
        ${isGlassModeEnabled ? "liquid-glass" : "bg-surface shadow-clay"}
        rounded-card
        ${hover && !isGlassModeEnabled ? "hover:shadow-clay-hover transition-shadow duration-300" : ""}
        ${className}
      `}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

