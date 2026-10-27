import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "TechNova — Smartphones Neufs, Occasions & Réparation Express",
  description:
    "Boutique spécialisée en smartphones neufs et occasions certifiées Grade A+, accessoires d'origine et atelier de réparation express.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" dir="ltr" className="scroll-smooth">
      <body className="bg-white text-gray-900 antialiased selection:bg-[#0F5A47] selection:text-white min-h-screen flex flex-col">
        <LanguageProvider>
          <CartProvider>{children}</CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
