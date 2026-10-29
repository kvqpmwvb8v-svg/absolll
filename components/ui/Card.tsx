import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const variantClasses = {
  default: "bg-bg-secondary",
  bordered: "bg-bg-secondary border border-border",
  elevated: "bg-bg-secondary",
};

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-12",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "bordered", padding = "md", hover = false, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-md transition-all duration-200
          ${variantClasses[variant]}
          ${paddingClasses[padding]}
          ${hover ? "hover:border-accent hover:bg-bg-tertiary hover:shadow-soft" : ""}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";