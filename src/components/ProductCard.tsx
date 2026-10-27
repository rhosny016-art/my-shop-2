"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import {
  Heart,
  ShoppingCart,
  Check,
  Star,
  MessageCircle,
  Eye,
  ShieldCheck,
} from "lucide-react";

export interface Product {
  id: number;
  name: string;
  nameAr?: string | null;
  slug: string;
  categorySlug: string;
  brand: string;
  condition: string;
  storage?: string | null;
  color?: string | null;
  price: string;
  originalPrice?: string | null;
  discountPercent?: number | null;
  rating?: string | null;
  reviewCount?: number | null;
  stock?: number | null;
  imageUrl: string;
  description?: string | null;
  descriptionAr?: string | null;
  specs?: Record<string, string> | null;
  batteryHealth?: string | null;
  warranty?: string | null;
  isBestSeller?: boolean | null;
}

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const { addToCart, generateSingleProductWhatsAppUrl } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const isOccasion = product.condition.startsWith("occasion");
  const conditionLabel = isOccasion
    ? product.condition === "occasion_grade_a"
      ? lang === "ar"
        ? "مستعمل Grade A+"
        : "Occasion Grade A+"
      : lang === "ar"
      ? "مستعمل مضمون"
      : "Occasion Certifiée"
    : lang === "ar"
    ? "جديد بالعلبة"
    : "Neuf Scellé";

  const numRating = parseFloat(product.rating || "5.0");
  const reviews = product.reviewCount || 100;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-[#CFE4D9] p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg relative">
      {/* Top Header Row in Card */}
      <div className="flex items-center justify-between w-full mb-2">
        {/* Discount Badge */}
        {product.discountPercent ? (
          <span className="bg-[#0F5A47] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md tracking-tight">
            -{product.discountPercent}%
          </span>
        ) : (
          <span />
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isWishlisted
              ? "text-red-500 bg-red-50"
              : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Ajouter aux favoris"
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? "fill-red-500 stroke-red-500" : ""}`}
          />
        </button>
      </div>

      {/* Centered Image Container with clean background */}
      <div
        onClick={() => onQuickView && onQuickView(product)}
        className="relative w-full aspect-square bg-[#F8FAF9] rounded-xl p-4 mb-3 flex items-center justify-center cursor-pointer overflow-hidden group-hover:bg-[#F2F7F4] transition-colors"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={220}
          height={220}
          className="object-contain max-h-40 w-auto group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        />

        {/* Quick View Button on hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onQuickView) onQuickView(product);
          }}
          className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
        >
          <span className="bg-white/90 backdrop-blur-xs text-gray-900 text-xs font-semibold py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-sm">
            <Eye className="w-3.5 h-3.5" />
            <span>{lang === "ar" ? "معاينة سريعة" : "Aperçu rapide"}</span>
          </span>
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow justify-between space-y-2">
        {/* Condition & Storage Tag */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              isOccasion
                ? "bg-amber-50 text-amber-800 border border-amber-200"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200"
            }`}
          >
            {conditionLabel}
          </span>
          {product.storage && (
            <span className="text-[10px] text-gray-500 font-medium">
              {product.storage}
            </span>
          )}
          {product.batteryHealth && (
            <span className="text-[10px] text-gray-500 font-medium flex items-center gap-0.5">
              🔋 {product.batteryHealth}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onQuickView && onQuickView(product)}
          className="text-sm sm:text-[15px] font-semibold text-gray-950 hover:text-[#0F5A47] transition line-clamp-1 cursor-pointer"
        >
          {lang === "ar" && product.nameAr ? product.nameAr : product.name}
        </h3>

        {/* Star Rating Row */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-emerald-600">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-[#0F5A47] text-[#0F5A47]"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">({reviews})</span>
        </div>

        {/* Price Row matching the reference */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-base sm:text-lg font-bold text-[#0F5A47]">
            {parseFloat(product.price).toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            {t("currency")}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {parseFloat(product.originalPrice).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {t("currency")}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-1.5">
          {/* Main Full-Width Add To Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs ${
              added
                ? "bg-emerald-700 text-white"
                : "bg-[#0F5A47] hover:bg-[#0A4133] text-white"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>{t("addedToCart")}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>{t("addToCart")}</span>
              </>
            )}
          </button>

          {/* Quick WhatsApp Order Button */}
          <a
            href={generateSingleProductWhatsAppUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 px-3 rounded-lg border border-[#CDE5D9] bg-[#F4F9F6] hover:bg-[#E7F3ED] text-[#0F5A47] flex items-center justify-center gap-1.5 text-xs font-semibold transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>{lang === "ar" ? "طلب سريع عبر واتساب" : "Commander sur WhatsApp"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
