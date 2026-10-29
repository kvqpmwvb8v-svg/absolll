import { HTMLAttributes, forwardRef } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const baseClass = "animate-pulse bg-bg-tertiary rounded-sm";

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = "text", width = "100%", height, lines = 1, className = "", ...props }, ref) => {
    if (variant === "circular") {
      return (
        <div
          ref={ref}
          className={`${baseClass} rounded-full ${className}`}
          style={{ width, height: height || width }}
          {...props}
        />
      );
    }

    if (variant === "rectangular") {
      return (
        <div
          ref={ref}
          className={`${baseClass} ${className}`}
          style={{ width, height: height || "1rem" }}
          {...props}
        />
      );
    }

    if (variant === "card") {
      return (
        <div ref={ref} className={`${className}`} {...props}>
          <div className={`${baseClass} h-48 w-full mb-4`} />
          <div className={`${baseClass} h-6 w-3/4 mb-2`} />
          <div className={`${baseClass} h-4 w-1/2 mb-2`} />
          <div className={`${baseClass} h-4 w-1/3`} />
        </div>
      );
    }

    // text variant - multiple lines
    if (lines > 1) {
      return (
        <div ref={ref} className={className} {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`${baseClass} h-4 ${i === lines - 1 ? "w-2/3" : "w-full"} mb-2 last:mb-0`}
              style={{ width: i === lines - 1 ? "60%" : "100%" }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`${baseClass} h-4 ${className}`}
        style={{ width }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";