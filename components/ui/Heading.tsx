import { HTMLAttributes, forwardRef } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "display-1" | "display-2" | "display-3" | "h1" | "h2" | "h3" | "h4" | "base";
  weight?: "normal" | "medium" | "bold";
  align?: "left" | "center" | "right";
}

const sizeClasses = {
  "display-1": "text-display-1 font-display tracking-tighter",
  "display-2": "text-display-2 font-display tracking-tight",
  "display-3": "text-display-3 font-display tracking-tight",
  h1: "text-4xl md:text-5xl font-display font-bold tracking-tight",
  h2: "text-3xl md:text-4xl font-display font-bold tracking-tight",
  h3: "text-2xl md:text-3xl font-display font-bold tracking-tight",
  h4: "text-xl md:text-2xl font-display font-bold tracking-tight",
  base: "text-xl md:text-2xl font-display font-medium tracking-tight",
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, as: Component = "h2", size = "h2", weight = "bold", align = "left", className = "", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`${sizeClasses[size]} ${weightClasses[weight]} ${alignClasses[align]} text-text-primary ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";