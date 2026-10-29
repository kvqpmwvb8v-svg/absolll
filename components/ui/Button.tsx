"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-accent text-bg-primary hover:bg-bg-secondary hover:text-text-primary",
  secondary: "bg-bg-tertiary text-text-primary hover:bg-border-light",
  ghost: "bg-transparent text-text-primary hover:bg-bg-secondary",
  outline: "border border-border text-text-primary hover:bg-bg-secondary",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", fullWidth = false, loading = false, disabled, className = "", ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center font-medium transition-colors duration-200
          rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" />
            <path className="opacity-75" d="M12 2a10 10 0 0 1 10 10" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";