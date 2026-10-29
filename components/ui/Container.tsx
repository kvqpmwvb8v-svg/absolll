"use client";

import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-full",
};

export function Container({
  children,
  className = "",
  size = "md",
}: ContainerProps) {
  return (
    <div className={`mx-auto px-6 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}