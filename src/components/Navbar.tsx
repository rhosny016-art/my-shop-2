"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Wrench,
  Globe,
  Smartphone,
  Shield,
  Headphones,
  SlidersHorizontal,
} from "lucide-react";

interface NavbarProps {
  onSearch?: (query: string) => void;
  onSelectCategory?: (slug: string | null) => void;
}

export default function Navbar({ onSearch, onSelectCategory }: NavbarProps) {
  const { lang, setLang, dir, t } = useLanguage();
  const { itemCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const categories = [
    { name: lang === "ar" ? "جميع الهواتف الذكية" : "Tous les smartphones", slug: "smartphones" },
    { name: lang === "ar" ? "هواتف ذكية جديدة" : "Smartphones Neufs (Scellés)", slug: "smartphones-neufs" },
    { name: lang === "ar" ? "هواتف مستعملة ومجددة" : "Smartphones Occasion (Grade A+)", slug: "smartphones-occasion" },
    { name: lang === "ar" ? "صوتيات وسماعات" : "Audio & Écouteurs", slug: "audio" },
    { name: lang === "ar" ? "ساعات ذكية" : "Montres connectées", slug: "montres-connectees" },
    { name: lang === "ar" ? "إكسسوارات وشواحن" : "Accessoires & Charge", slug: "accessoires" },
    { name: lang === "ar" ? "خدمات الصيانة السريعة" : "Service Réparation Express", slug: "service-reparation" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => onSelectCategory && onSelectCategory(null)}
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0F5A47]/10 group-hover:bg-[#0F5A47] flex items-center justify-center text-[#0F5A47] group-hover:text-white transition-all duration-200">
              {/* Shopping bag with dot icon matching reference */}
              <div className="relative">
                <ShoppingBag className="w-6 h-6 stroke-[2.2]" />
                <span className="absolute -top-0.5 right-1 w-1.5 h-1.5 bg-[#10B981] rounded-full group-hover:bg-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-gray-900 leading-none">
                Tech<span className="text-[#0F5A47]">Nova</span>
              </span>
              <span className="text-[10px] text-gray-600 font-medium tracking-wider uppercase mt-0.5">
                {lang === "ar" ? "هواتف & صيانة" : "Smartphones & Services"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse font-medium text-sm text-gray-600">
            <Link
              href="/"
              onClick={() => onSelectCategory && onSelectCategory(null)}
              className="text-[#0F5A47] font-semibold border-b-2 border-[#0F5A47] pb-1 hover:text-[#0b4234] transition"
            >
              {t("home")}
            </Link>

            <Link
              href="/#produits"
              onClick={() => onSelectCategory && onSelectCategory(null)}
              className="hover:text-[#0F5A47] transition pb-1 hover:border-b-2 hover:border-[#0F5A47]"
            >
              {t("shop")}
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                onMouseEnter={() => setCategoryDropdownOpen(true)}
                className="flex items-center gap-1 hover:text-[#0F5A47] transition pb-1"
              >
                <span>{t("categories")}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {categoryDropdownOpen && (
                <div
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                  className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => {
                        if (onSelectCategory) {
                          onSelectCategory(cat.slug === "smartphones" ? null : cat.slug);
                        }
                        setCategoryDropdownOpen(false);
                      }}
                      className="w-full text-left rtl:text-right px-4 py-2 text-sm text-gray-700 hover:bg-[#F0F7F4] hover:text-[#0F5A47] flex items-center justify-between transition"
                    >
                      <span>{cat.name}</span>
                      {cat.slug === "smartphones-occasion" && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                          Grade A+
                        </span>
                      )}
                      {cat.slug === "service-reparation" && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                          Express
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#reparation"
              className="hover:text-[#0F5A47] transition pb-1 flex items-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5 text-[#0F5A47]" />
              <span>{t("repairs")}</span>
            </Link>

            <Link
              href="/#a-propos"
              className="hover:text-[#0F5A47] transition pb-1"
            >
              {t("about")}
            </Link>

            <Link
              href="/#contact"
              className="hover:text-[#0F5A47] transition pb-1"
            >
              {t("contact")}
            </Link>
          </nav>

          {/* Search Bar + Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden md:flex items-center"
            >
              <div className="absolute left-3.5 rtl:left-auto rtl:right-3.5 pointer-events-none text-gray-600">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                placeholder={t("searchPlaceholder")}
                className="w-64 lg:w-72 pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-full text-xs lg:text-sm bg-[#F5F8F7] border border-transparent focus:border-[#0F5A47] focus:bg-white focus:outline-none transition-all placeholder:text-gray-600 text-gray-800"
              />
            </form>

            {/* Language Switch Button */}
            <button
              type="button"
              onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
              className="px-2.5 py-1.5 rounded-full text-xs font-semibold bg-gray-100 hover:bg-[#E8F5F0] hover:text-[#0F5A47] text-gray-700 transition flex items-center gap-1"
              title="Changer de langue / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-[#0F5A47]" />
              <span>{lang === "fr" ? "عربي" : "FR"}</span>
            </button>

            {/* Admin / Profile Link */}
            <Link
              href="/admin"
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-[#0F5A47] transition"
              title="Espace Gestion / Admin"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700 hover:text-[#0F5A47] transition"
              aria-label="Panier"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#0F5A47] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3 text-gray-600 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-full text-xs bg-[#F5F8F7] border border-transparent focus:border-[#0F5A47] focus:bg-white text-gray-800 focus:outline-none"
            />
          </form>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in">
          <div className="flex flex-col space-y-3 font-medium text-sm text-gray-700">
            <Link
              href="/"
              onClick={() => {
                if (onSelectCategory) onSelectCategory(null);
                setMobileMenuOpen(false);
              }}
              className="py-2 text-[#0F5A47] font-semibold border-b border-gray-50"
            >
              {t("home")}
            </Link>
            <Link
              href="/#produits"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-50"
            >
              {t("shop")}
            </Link>
            <Link
              href="/#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-50"
            >
              {t("categories")}
            </Link>
            <Link
              href="/#reparation"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#0F5A47] font-semibold border-b border-gray-50 flex items-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              <span>{t("repairs")}</span>
            </Link>
            <Link
              href="/#a-propos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-50"
            >
              {t("about")}
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-50"
            >
              {t("contact")}
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-gray-600 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Dashboard Admin</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
