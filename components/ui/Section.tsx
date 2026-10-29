import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

const spacingClasses = {
  none: "",
  sm: "py-8",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
};

export function Section({
  children,
  className = "",
  spacing = "md",
}: SectionProps) {
  return (
    <section className={`${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
}