import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}

