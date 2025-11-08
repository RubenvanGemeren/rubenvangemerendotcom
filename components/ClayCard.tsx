"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ClayCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function ClayCard({ children, className = "", hover = true }: ClayCardProps) {
  return (
    <motion.div
      className={`
        bg-surface rounded-card shadow-clay
        ${hover ? "hover:shadow-clay-hover transition-shadow duration-300" : ""}
        ${className}
      `}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

