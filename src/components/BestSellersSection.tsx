"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard, { Product } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BestSellersSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export default function BestSellersSection({
  products,
  onQuickView,
}: BestSellersSectionProps) {
  const { t, dir } = useLanguage();
  const [startIndex, setStartIndex] = useState(0);

  // Filter bestsellers or use all products
  const bestSellers = products.filter((p) => p.isBestSeller).length > 0
    ? products.filter((p) => p.isBestSeller)
    : products;

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, bestSellers.length - itemsPerPage);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 < 0 ? maxIndex : prev - 1));
  };

  const displayedProducts = bestSellers.slice(startIndex, startIndex + itemsPerPage);
  // If fewer than itemsPerPage, wrap around
  if (displayedProducts.length < itemsPerPage && bestSellers.length >= itemsPerPage) {
    const remainder = itemsPerPage - displayedProducts.length;
    displayedProducts.push(...bestSellers.slice(0, remainder));
  }

  return (
    <section id="produits" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 pb-2">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-4 h-0.5 bg-[#0F5A47]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#0F5A47] uppercase">
                {t("featuredTag")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              {t("featuredTitle")}
            </h2>
          </div>

          {/* Navigation Arrows matching reference */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={dir === "rtl" ? handleNext : handlePrev}
              aria-label="Précédent"
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#0F5A47] bg-white text-gray-700 hover:text-[#0F5A47] flex items-center justify-center transition-colors shadow-2xs hover:bg-[#F2F8F5]"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={dir === "rtl" ? handlePrev : handleNext}
              aria-label="Suivant"
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#0F5A47] bg-white text-gray-700 hover:text-[#0F5A47] flex items-center justify-center transition-colors shadow-2xs hover:bg-[#F2F8F5]"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* 4-Column Grid of Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
