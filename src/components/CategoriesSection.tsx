"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface CategoriesSectionProps {
  selectedCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export default function CategoriesSection({
  selectedCategory,
  onSelectCategory,
}: CategoriesSectionProps) {
  const { lang, t, dir } = useLanguage();

  const categories = [
    {
      title: lang === "ar" ? "هواتف جديدة" : "Smartphones",
      slug: "smartphones-neufs",
      subtitle: "iPhone & Galaxy",
      image: "/images/category-smartphones.png",
      badge: "Neuf",
    },
    {
      title: lang === "ar" ? "هواتف مستعملة" : "Occasions Grade A+",
      slug: "smartphones-occasion",
      subtitle: "Garantis 6 mois",
      image: "/images/category-used.png",
      badge: "Garanti",
    },
    {
      title: lang === "ar" ? "صوتيات وسماعات" : "Audio",
      slug: "audio",
      subtitle: "AirPods & Casques",
      image: "/images/category-audio.png",
      badge: "Sans-fil",
    },
    {
      title: lang === "ar" ? "ساعات ذكية" : "Montres connectées",
      slug: "montres-connectees",
      subtitle: "Apple & Samsung",
      image: "/images/category-watch.png",
      badge: "Smart",
    },
    {
      title: lang === "ar" ? "إكسسوارات وشواحن" : "Accessoires",
      slug: "accessoires",
      subtitle: "Chargeurs GaN, Coques",
      image: "/images/category-accessories.png",
      badge: "Fast Charge",
    },
    {
      title: lang === "ar" ? "خدمة الصيانة" : "Service Réparation",
      slug: "service-reparation",
      subtitle: "Écran & Batterie 30min",
      image: "/images/category-repair.png",
      badge: "Express",
    },
  ];

  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section id="categories" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-4 h-0.5 bg-[#0F5A47]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#0F5A47] uppercase">
                {t("categoriesTag")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              {t("categoriesTitle")}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory(null)}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F5A47] hover:text-[#0b4234] transition self-start sm:self-auto"
          >
            <span>{t("allCategories")}</span>
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid (6 Cards Matching Reference) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <div
                key={cat.slug}
                onClick={() => {
                  if (cat.slug === "service-reparation") {
                    const el = document.getElementById("reparation");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                      return;
                    }
                  }
                  onSelectCategory(isSelected ? null : cat.slug);
                }}
                className={`group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between transition-all duration-200 border text-center ${
                  isSelected
                    ? "bg-[#E6F4EE] border-[#0F5A47] shadow-md ring-2 ring-[#0F5A47]/20"
                    : "bg-[#F3F6F4] hover:bg-[#E9F2EE] border-transparent hover:border-[#D5E6DE] hover:shadow-sm"
                }`}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square max-h-28 sm:max-h-32 mb-3 flex items-center justify-center">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    width={140}
                    height={140}
                    className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                  />
                </div>

                {/* Text Title */}
                <div className="w-full">
                  <span className="block text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#0F5A47] transition">
                    {cat.title}
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-gray-600 font-medium mt-0.5">
                    {cat.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
