import { HTMLAttributes, forwardRef } from "react";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div" | "blockquote" | "figcaption";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  weight?: "normal" | "medium" | "bold";
  color?: "primary" | "muted" | "subtle" | "accent" | "error";
  align?: "left" | "center" | "right" | "justify";
  leading?: "tight" | "normal" | "relaxed";
}

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base md:text-lg",
  lg: "text-lg md:text-xl",
  xl: "text-xl md:text-2xl",
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

const colorClasses = {
  primary: "text-text-primary",
  muted: "text-text-muted",
  subtle: "text-text-subtle",
  accent: "text-accent",
  error: "text-red-400",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const leadingClasses = {
  tight: "leading-tight",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ children, as: Component = "p", size = "base", weight = "normal", color = "primary", align = "left", leading = "relaxed", className = "", ...props }, ref) => {
    return (
      <Component
        ref={ref as React.Ref<HTMLParagraphElement>}
        className={`${sizeClasses[size]} ${weightClasses[weight]} ${colorClasses[color]} ${alignClasses[align]} ${leadingClasses[leading]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";