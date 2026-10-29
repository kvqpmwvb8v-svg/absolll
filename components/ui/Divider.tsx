import { HTMLAttributes, forwardRef } from "react";

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "subtle" | "accent";
  size?: "sm" | "md" | "lg";
}

const orientationClasses = {
  horizontal: "w-full",
  vertical: "h-full",
};

const variantClasses = {
  default: "border-border",
  subtle: "border-border/50",
  accent: "border-accent",
};

const sizeClasses = {
  sm: "border-t",
  md: "border-t-2",
  lg: "border-t-4",
};

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = "horizontal", variant = "default", size = "md", className = "", ...props }, ref) => {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          className={`${orientationClasses[orientation]} ${variantClasses[variant]} ${sizeClasses[size].replace("border-t", "border-l")} ${className}`}
          {...props}
        />
      );
    }

    return (
      <hr
        ref={ref}
        className={`${orientationClasses[orientation]} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";