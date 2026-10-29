import "./tailwind.css";
import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

const baseMetadata: Metadata = {
  title: "ABSOLUTI — Исторический клуб",
  description: "Исторический клуб ABSOLUTI — современное цифровое пространство культурного сообщества",
  keywords: ["история", "культура", "клуб", "абсолютно"],
  authors: [{ name: "ABSOLUTI Historical Club" }],
};

export const metadata: Metadata = {
  ...baseMetadata,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-bg-primary text-text-primary antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}