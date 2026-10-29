"use client";

import Link from "next/link";
import { Container } from "./Container";
import { Text } from "./Text";

interface BreadcrumbsProps {
  items: Array<{ label: string; href?: string }>;
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <Container size="md">
      <nav aria-label="Хлебные крошки" className={`py-4 ${className}`}>
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={item.href || item.label} className="flex items-center gap-2">
              {index > 0 && (
                <svg className="w-4 h-4 text-text-subtle flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <Text as="span" color="subtle" size="sm" className="truncate max-w-[200px]">
                  {item.label}
                </Text>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </Container>
  );
}