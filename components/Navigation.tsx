"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Главное" },
    { href: "/about", label: "О клубе" },
    { href: "/events", label: "Расписание" },
    { href: "/news", label: "Новости" },
    { href: "/photos", label: "Фото" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight text-text-primary">
          ABSOLUTI
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-bg-primary/95 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}