"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShoppingBag,
  Send,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {
  const { lang, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-[#071B15] text-white pt-16 pb-8 overflow-hidden">
      {/* Wave top transition curve */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-transparent overflow-hidden">
        <svg
          className="w-full h-4 text-white fill-current"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C300,90 900,90 1200,0 L1200,0 L0,0 Z" />
        </svg>
      </div>

      {/* Decorative leaf watermark in bottom right corner */}
      <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="currentColor">
          <path d="M100,0 C120,40 180,80 180,120 C180,160 140,200 100,200 C60,200 20,160 20,120 C20,80 80,40 100,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/40">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#0F5A47] flex items-center justify-center text-white shadow-xs">
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 stroke-[2.2]" />
                  <span className="absolute -top-0.5 right-1 w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Tech<span className="text-[#34D399]">Nova</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-gray-300 max-w-sm leading-relaxed">
              {t("footerTagline")}
            </p>

            <div className="pt-2 text-xs text-gray-400 space-y-1">
              <p>📍 Showroom & Atelier: Alger Centre / Bab Ezzouar</p>
              <p>📞 WhatsApp Service: +213 (0) 550 12 34 56</p>
              <p>⏰ Ouvert du Samedi au Jeudi de 09h00 à 20h00</p>
            </div>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              {t("usefulLinks")}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/#produits" className="hover:text-emerald-400 transition">
                  {t("shop")}
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-emerald-400 transition">
                  {t("categories")}
                </Link>
              </li>
              <li>
                <Link href="/#reparation" className="hover:text-emerald-400 transition">
                  {t("repairs")}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              {t("followUs")}
            </h4>
            <div className="flex items-center gap-3 pt-1">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-950 hover:bg-[#0F5A47] flex items-center justify-center text-gray-300 hover:text-white transition"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-950 hover:bg-[#0F5A47] flex items-center justify-center text-gray-300 hover:text-white transition"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-950 hover:bg-[#0F5A47] flex items-center justify-center text-gray-300 hover:text-white transition"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/213550123456"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-950 hover:bg-[#0F5A47] flex items-center justify-center text-gray-300 hover:text-white transition"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter Box matching reference */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              {t("newsletterTitle")}
            </h4>
            <p className="text-xs text-gray-300">
              {t("newsletterDesc")}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletterPlaceholder")}
                className="w-full bg-white text-gray-900 rounded-full py-3 pl-4 pr-12 rtl:pr-4 rtl:pl-12 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#34D399]"
              />
              <button
                type="submit"
                disabled={loading}
                aria-label="S'inscrire"
                className="absolute right-1.5 rtl:right-auto rtl:left-1.5 top-2.5 w-8 h-8 rounded-full bg-[#0F5A47] hover:bg-[#0b4234] text-white flex items-center justify-center transition disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </form>

            {submitted && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Merci pour votre inscription !</span>
              </p>
            )}
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© 2025 TechNova. {t("rightsReserved")}</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-emerald-400 transition">
              {t("terms")}
            </Link>
            <span>|</span>
            <Link href="/" className="hover:text-emerald-400 transition">
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
