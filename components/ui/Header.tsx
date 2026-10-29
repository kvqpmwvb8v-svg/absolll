"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Container } from "./Container";
import { Link as LinkComponent } from "./Link";

interface HeaderProps {
  className?: string;
}

const navLinks = [
  { href: "/", label: "Главное" },
  { href: "/about", label: "О клубе" },
  { href: "/events", label: "Расписание" },
  { href: "/news", label: "Новости" },
  { href: "/photos", label: "Фото" },
];

export function Header({ className = "" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        border-b border-border bg-bg-primary/80 backdrop-blur-sm
        transition-all duration-200
        ${scrolled ? "bg-bg-primary/95 shadow-soft" : ""}
        ${className}
      `}
    >
      <Container size="md">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-xl md:text-2xl font-display font-bold tracking-tight text-text-primary">
            ABSOLUTI
          </Link>

          <nav className="hidden md:flex items-center gap-10" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <LinkComponent
                key={link.href}
                href={link.href}
                variant="muted"
                size="sm"
                underline="hover"
                className="tracking-wide"
              >
                {link.label}
              </LinkComponent>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M6 18L18 6" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <nav id="mobile-menu" className="md:hidden border-t border-border bg-bg-primary/95 backdrop-blur-sm py-6 animate-slide-down" aria-label="Мобильная навигация">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <LinkComponent
                  key={link.href}
                  href={link.href}
                  variant="default"
                  size="lg"
                  underline="never"
                  className="py-2 border-b border-border/50"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </LinkComponent>
              ))}
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}