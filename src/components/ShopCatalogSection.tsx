"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard, { Product } from "./ProductCard";
import { Filter, SlidersHorizontal, Check, RefreshCw } from "lucide-react";

interface ShopCatalogSectionProps {
  products: Product[];
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
  searchQuery: string;
  onQuickView: (product: Product) => void;
}

export default function ShopCatalogSection({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onQuickView,
}: ShopCatalogSectionProps) {
  const { lang, t } = useLanguage();
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  const categories = [
    { id: null, label: lang === "ar" ? "الكل" : "Tous les produits" },
    { id: "smartphones-neufs", label: lang === "ar" ? "هواتف جديدة" : "Smartphones Neufs" },
    { id: "smartphones-occasion", label: lang === "ar" ? "هواتف مستعملة (Grade A+)" : "Occasion & Reconditionnés" },
    { id: "audio", label: lang === "ar" ? "صوتيات" : "Audio" },
    { id: "montres-connectees", label: lang === "ar" ? "ساعات ذكية" : "Montres connectées" },
    { id: "accessoires", label: lang === "ar" ? "إكسسوارات" : "Accessoires" },
  ];

  const brands = ["all", "Apple", "Samsung", "Sony", "TechNova Pro"];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory && p.categorySlug !== selectedCategory) {
        return false;
      }
      // Condition filter
      if (selectedCondition !== "all") {
        if (selectedCondition === "neuf" && p.condition !== "neuf") return false;
        if (selectedCondition === "occasion" && !p.condition.startsWith("occasion")) return false;
      }
      // Brand filter
      if (selectedBrand !== "all" && p.brand !== selectedBrand) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchAr = p.nameAr?.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        if (!matchName && !matchAr && !matchBrand) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === "price_desc") return parseFloat(b.price) - parseFloat(a.price);
      if (sortBy === "discount") return (b.discountPercent || 0) - (a.discountPercent || 0);
      return 0;
    });
  }, [products, selectedCategory, selectedCondition, selectedBrand, searchQuery, sortBy]);

  return (
    <section id="catalogue" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-gray-100 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-4 h-0.5 bg-[#0F5A47]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#0F5A47] uppercase">
                {lang === "ar" ? "المتجر والكتالوج" : "Catalogue & Sélections"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              {lang === "ar" ? "استكشف جميع الأجهزة" : "Tous nos smartphones & accessoires"}
            </h2>
          </div>

          {/* Quick pill filters for Category */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id ?? "all"}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#0F5A47] text-white shadow-xs"
                    : "bg-[#F3F6F4] text-gray-700 hover:bg-[#E8F2EC] hover:text-[#0F5A47]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="bg-[#F8FAF9] rounded-2xl p-4 mb-8 border border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
          {/* Condition toggle (Neuf / Occasion) */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-semibold">État :</span>
            <button
              type="button"
              onClick={() => setSelectedCondition("all")}
              className={`px-2.5 py-1 rounded-lg ${
                selectedCondition === "all"
                  ? "bg-white font-bold text-[#0F5A47] shadow-2xs border border-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Tous
            </button>
            <button
              type="button"
              onClick={() => setSelectedCondition("neuf")}
              className={`px-2.5 py-1 rounded-lg ${
                selectedCondition === "neuf"
                  ? "bg-white font-bold text-[#0F5A47] shadow-2xs border border-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Neufs (Scellés)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCondition("occasion")}
              className={`px-2.5 py-1 rounded-lg ${
                selectedCondition === "occasion"
                  ? "bg-white font-bold text-[#0F5A47] shadow-2xs border border-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Occasions (Grade A+)
            </button>
          </div>

          {/* Brand & Sort */}
          <div className="flex items-center gap-3">
            {/* Brand select */}
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500">Marque :</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:border-[#0F5A47]"
              >
                <option value="all">Toutes</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Sony">Sony</option>
                <option value="TechNova Pro">TechNova Pro</option>
              </select>
            </div>

            {/* Sort select */}
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:border-[#0F5A47]"
              >
                <option value="default">Recommandés</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="discount">Meilleures réductions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-[#F9FAF9] rounded-2xl border border-gray-100">
            <p className="text-base font-semibold text-gray-800">
              Aucun produit ne correspond à vos filtres.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory(null);
                setSelectedCondition("all");
                setSelectedBrand("all");
              }}
              className="px-4 py-2 bg-[#0F5A47] text-white text-xs font-semibold rounded-full hover:bg-[#0A4133]"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
