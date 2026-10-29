import { AnchorHTMLAttributes, forwardRef } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "default" | "muted" | "accent";
  underline?: "always" | "hover" | "never";
  size?: "sm" | "base" | "lg";
}

const variantClasses = {
  default: "text-text-primary hover:text-accent",
  muted: "text-text-muted hover:text-text-primary",
  accent: "text-accent hover:text-text-primary",
};

const underlineClasses = {
  always: "underline",
  hover: "underline-offset-2 hover:underline",
  never: "no-underline",
};

const sizeClasses = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, variant = "default", underline = "hover", size = "base", className = "", ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`
          inline-flex items-center gap-1 font-medium transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
          ${variantClasses[variant]}
          ${underlineClasses[underline]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";