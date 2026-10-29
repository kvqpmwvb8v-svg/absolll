import { HTMLAttributes, forwardRef } from "react";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "muted" | "success" | "warning" | "error";
  size?: "sm" | "md";
}

const variantClasses = {
  default: "bg-bg-tertiary text-text-primary",
  accent: "bg-accent/10 text-accent border border-accent/20",
  muted: "bg-border text-text-muted",
  success: "bg-green-900/30 text-green-300 border border-green-800",
  warning: "bg-yellow-900/30 text-yellow-300 border border-yellow-800",
  error: "bg-red-900/30 text-red-300 border border-red-800",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ children, variant = "default", size = "md", className = "", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center font-medium rounded-none
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = "Tag";