"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, Sparkles } from "lucide-react";

interface SpecialOfferBannerProps {
  onCtaClick?: () => void;
}

export default function SpecialOfferBanner({ onCtaClick }: SpecialOfferBannerProps) {
  const { lang, t } = useLanguage();

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#EBF5EF] via-[#F3F9F5] to-[#DFEEE5] border border-[#D5E8DD] shadow-xs">
          {/* Subtle leaves decoration blur */}
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 px-6 sm:px-12 lg:px-16 py-10 lg:py-12">
            {/* Left Content */}
            <div className="lg:col-span-6 z-10 flex flex-col items-start space-y-4 sm:space-y-5">
              {/* Pill badge: Offre spéciale */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-[#BCE1CE] text-[#0F5A47] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 fill-[#0F5A47]" />
                <span>{t("promoBadge")}</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-gray-950 tracking-tight leading-[1.15]">
                <span className="block text-[#0F5A47]">{t("promoTitlePart1")}</span>
                <span className="block text-gray-900 mt-1">
                  {lang === "ar"
                    ? "على تشكيلة من الهواتف والإكسسوارات"
                    : "sur une sélection de produits"}
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md">
                {t("promoDesc")}
              </p>

              {/* Pill CTA button: Voir l'offre > */}
              <div className="pt-2">
                <a
                  href="#produits"
                  onClick={onCtaClick}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-emerald-50 text-[#0F5A47] border border-[#BCDDCB] text-sm font-semibold transition-all shadow-2xs hover:shadow group"
                >
                  <span>{t("promoCta")}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
                <Image
                  src="/images/promo-devices.png"
                  alt="Offre spéciale tech"
                  width={600}
                  height={360}
                  className="object-contain max-h-[320px] w-auto drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
