import { HTMLAttributes, forwardRef } from "react";

interface ProseProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Prose = forwardRef<HTMLDivElement, ProseProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          prose prose-invert max-w-none
          prose-headings:text-text-primary prose-headings:font-display prose-headings:font-bold
          prose-p:text-text-muted prose-p:leading-relaxed
          prose-a:text-accent prose-a:no-underline prose-a:hover:underline prose-a:hover:text-text-primary
          prose-strong:text-text-primary prose-strong:font-medium
          prose-em:text-text-muted prose-em:italic
          prose-blockquote:text-text-muted prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-8
          prose-code:text-accent prose-code:bg-bg-tertiary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:text-sm
          prose-pre:bg-bg-primary prose-pre:border prose-pre:border-border prose-pre:rounded-md prose-pre:p-6 prose-pre:overflow-x-auto
          prose-pre_code:bg-transparent prose-pre_code:p-0 prose-pre_code:text-text-primary
          prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
          prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
          prose-li:text-text-muted prose-li:leading-relaxed
          prose-img:rounded-md prose-img:border prose-img:border-border
          prose-hr:border-border prose-hr:my-12
          prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-display-3
          prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-xl
          prose-figcaption:text-text-subtle prose-figcaption:text-sm prose-figcaption:text-center prose-figcaption:mt-2
          prose-table:w-full prose-table:border-collapse
          prose-th:text-text-primary prose-th:font-medium prose-th:border-b prose-th:border-border prose-th:pb-2 prose-th:text-left
          prose-td:text-text-muted prose-td:border-b prose-td:border-border/50 prose-td:py-2 prose-td:px-4
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Prose.displayName = "Prose";