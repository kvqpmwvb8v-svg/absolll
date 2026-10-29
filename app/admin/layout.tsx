"use client";

import Link from "next/link";
import { useState } from "react";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
      iat: number;
    };
    temp?: {
      step: "password" | "totp";
      attempts?: number;
    };
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="fixed inset-0 z-50 flex flex-col md:flex-row h-full w-full md:w-full bg-bg-secondary border-r bg-opacity-80 backdrop-blur-sm">
        <div className="w-full md:w-64 flex-shrink-0 border-y md:border-y-0 md:border-l bg-bg-primary">
          <div className="p-6 pt-8">
            <h2 className="text-xl font-bold text-text-primary mb-6 tracking-tight">
              ABSOLUTI
            </h2>
            <nav className="space-y-3">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m-3-3v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-4a1 1 0 011-1h3m-3 6a2 2 0 11-4 0 2 2 0 014 0M9 7h.5a2 2 0 010 4h.4a2 2 0 010 4H12a2 2 0 010 2h.4a2 2 0 010 4H15a2 2 0 110 4h.4a2 2 0 010 4H18a2 2 0 110 4h.4a2 2 0 010 4H21M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Home
              </Link>
              <Link
                href="/admin/posts"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 6v6l4 2-4 2v6H5v-6H3v6l-2 2v-6H0v-6l2-2v6H2v-6l2-2z"/>
                </svg>
                Posts
              </Link>
              <Link
                href="/admin/events"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 6v6l4 2-4 2v6H5v-6H3v6l-2 2v-6H0v-6l2-2v6H2v-6l2-2zM5 10v10a1 1 0 001 1h3m-3-3v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-4a1 1 0 011-1h3M9 7h.5a2 2 0 010 4h.4a2 2 0 010 4H12a2 2 0 010 2h.4a2 2 0 010 4H15a2 2 0 110 4h.4a2 2 0 010 4H18a2 2 0 110 4h.4a2 2 0 010 4H21M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Events
              </Link>
              <Link
                href="/admin/news"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 6v6l4 2-4 2v6H5v-6H3v6l-2 2v-6H0v-6l2-2v6H2v-6l2-2z"/>
                </svg>
                News
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b bg-bg-primary px-6 flex items-center justify-between">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-bg-secondary transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18M3 12h18M3 18h18"/>
              </svg>
            </button>
            <div className="flex items-center gap-4">
              <span className="text-text-muted text-sm">
                Admin
              </span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-bg-primary">
                A
              </div>
              <button
                className="hidden md:block rounded-lg px-3 py-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
                onClick={() => window.location.href = "/admin/settings"}
              >
                Settings
              </button>
              <button
                className="hidden md:block rounded-lg px-3 py-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
                onClick={() => window.location.href = "/admin/login?step=logout"}
              >
                Logout
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6 md:p-12">
            {children}
          </main>
        </div>
      </nav>
    </>
  );
}