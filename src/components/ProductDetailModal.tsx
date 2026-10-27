"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Product } from "./ProductCard";
import {
  X,
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
  ShoppingCart,
  Battery,
  Layers,
  Cpu,
} from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  const { lang, t } = useLanguage();
  const { addToCart, generateSingleProductWhatsAppUrl } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const isOccasion = product.condition.startsWith("occasion");
  const conditionLabel = isOccasion
    ? product.condition === "occasion_grade_a"
      ? "Occasion - Grade A+ (État comme neuf)"
      : "Occasion - Grade A (Très bon état)"
    : "Neuf (Scellé d'origine constructeur)";

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white text-left rtl:text-right shadow-2xl transition-all border border-gray-100">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
            {/* Left: Product Image */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-[#F8FAF9] rounded-2xl p-6 border border-gray-100">
              <div className="relative w-full aspect-square max-h-64 flex items-center justify-center">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-contain max-h-60 w-auto drop-shadow-md"
                />
              </div>

              {/* Warranty and Delivery highlights under image */}
              <div className="w-full mt-4 pt-4 border-t border-gray-200/80 space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0F5A47]" />
                  <span>{product.warranty || "Garantie TechNova"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#0F5A47]" />
                  <span>Livraison express sécurisée en 24/48h</span>
                </div>
                {product.batteryHealth && (
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-emerald-600" />
                    <span>Santé de batterie vérifiée: {product.batteryHealth}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Details & Purchase */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                {/* Condition pill & brand */}
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isOccasion
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    }`}
                  >
                    {conditionLabel}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {product.brand}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-950">
                  {lang === "ar" && product.nameAr ? product.nameAr : product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex text-emerald-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#0F5A47] text-[#0F5A47]" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    ({product.reviewCount || 120} avis clients)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#0F5A47]">
                    {parseFloat(product.price).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    {t("currency")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {parseFloat(product.originalPrice).toLocaleString("fr-FR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {t("currency")}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="bg-[#0F5A47] text-white text-xs font-bold px-2 py-0.5 rounded">
                      -{product.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                  {lang === "ar" && product.descriptionAr
                    ? product.descriptionAr
                    : product.description}
                </p>

                {/* Specifications list */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Fiche technique
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-gray-50 rounded-lg p-2 border border-gray-100 flex flex-col"
                        >
                          <span className="text-gray-400 font-semibold text-[10px]">
                            {key}
                          </span>
                          <span className="text-gray-800 font-medium">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 space-y-2.5">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#0F5A47] hover:bg-[#0A4133] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    {added ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Ajouté au panier !</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Ajouter au panier</span>
                      </>
                    )}
                  </button>

                  <a
                    href={generateSingleProductWhatsAppUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Commander sur WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
