"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  ChevronRight,
  ChevronLeft,
  Truck,
  ShieldCheck,
  Headphones,
  Sparkles,
  MessageCircle,
} from "lucide-react";

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const { lang, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: lang === "ar" ? "✦ وصل حديثاً" : "✦ Nouveauté",
      title1: lang === "ar" ? "التكنولوجيا" : "La technologie",
      title2: lang === "ar" ? "في متناول يدك" : "à portée de main",
      desc:
        lang === "ar"
          ? "اكتشف أحدث الهواتف الذكية الجديدة والمستعملة المضمونة، الإكسسوارات الأصلية مع خدمة التصليح الفوري بقطع غيار أصلية."
          : "Découvrez les derniers smartphones, ordinateurs et accessoires avec une qualité exceptionnelle et des prix imbattables.",
      cta: lang === "ar" ? "Découvrir la collection" : "Découvrir la collection",
      image: "/images/hero-devices.png",
      tag: "iPhone 15 Pro & S24 Ultra",
    },
    {
      badge: lang === "ar" ? "✦ هواتف مستعملة معتمدة" : "✦ Occasions Certifiées",
      title1: lang === "ar" ? "أجهزة كالجديدة" : "Smartphones Grade A+",
      title2: lang === "ar" ? "بضمان 6 أشهر" : "au meilleur prix",
      desc:
        lang === "ar"
          ? "هواتف ذكية مفحوصة ومجربة بدقة عبر 45 نقطة فحص فنية، ببطاريات أصلية وضمان رسمي من المتجر."
          : "Smartphones d'occasion testés sur 45 points de contrôle. Batteries d'origine certifiées et garantie 6 mois incluse.",
      cta: lang === "ar" ? "Voir les occasions" : "Voir les occasions",
      image: "/images/category-used.png",
      tag: "Reconditionné Grade A+",
    },
    {
      badge: lang === "ar" ? "✦ صيانة سريعة" : "✦ Réparation Express",
      title1: lang === "ar" ? "تصليح فوري" : "Réparation express",
      title2: lang === "ar" ? "خلال 30 دقيقة" : "en 30 minutes",
      desc:
        lang === "ar"
          ? "تغيير الشاشات والبطاريات التالفة بقطع غيار أصلية وضمان يصل إلى 6 أشهر مع فحص مجاني."
          : "Changement d'écran OLED et remplacement batterie d'origine en boutique avec garantie atelier 6 mois.",
      cta: lang === "ar" ? "Estimer ma réparation" : "Estimer ma réparation",
      image: "/images/repair-workshop.png",
      tag: "Atelier Certifié",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <section className="relative pt-4 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Card Container */}
        <div className="relative rounded-[2.2rem] sm:rounded-[2.75rem] overflow-hidden bg-gradient-to-br from-[#EDF5F1] via-[#F4F9F6] to-[#E3EFE9] border border-[#DEEBE3] shadow-sm">
          {/* Subtle decorative radial glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left / Right Carousel Arrow Buttons */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Slide précédent"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-[#0F5A47] shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 border border-gray-100"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Slide suivant"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-[#0F5A47] shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 border border-gray-100"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Main Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[500px] lg:min-h-[560px] px-8 sm:px-14 lg:px-20 py-12 lg:py-16 gap-8">
            {/* Left Content (Text & CTA) */}
            <div className="lg:col-span-6 z-10 flex flex-col items-start space-y-6">
              {/* Badge: Nouveauté */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D7EFE3] text-[#0F5A47] text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 fill-[#0F5A47]" />
                <span>{current.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-gray-950 leading-[1.12]">
                <span className="block text-gray-900">{current.title1}</span>
                <span className="block text-[#0F5A47] font-extrabold mt-1">
                  {current.title2}
                </span>
              </h1>

              {/* Subheading Description */}
              <p className="text-gray-600 text-sm sm:text-base lg:text-[1.05rem] leading-relaxed max-w-xl">
                {current.desc}
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#produits"
                  onClick={onExploreClick}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0F5A47] hover:bg-[#0A4133] text-white font-medium text-sm sm:text-base shadow-sm hover:shadow transition-all duration-200 group"
                >
                  <span>{current.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://wa.me/213550123456?text=Bonjour%20TechNova,%20je%20souhaite%20des%20renseignements%20sur%20vos%20smartphones%20et%20r%C3%A9parations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-[#0F5A47] border border-[#C5DFD2] font-medium text-sm transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>{lang === "ar" ? "طلب عبر واتساب" : "WhatsApp Express"}</span>
                </a>
              </div>

              {/* Trust Indicators Row below CTA matching the reference */}
              <div className="pt-6 border-t border-[#D9E9DF] w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5 text-gray-800">
                  <div className="w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center flex-shrink-0 text-[#0F5A47] shadow-2xs">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold leading-tight text-gray-800">
                    {lang === "ar" ? "توصيل سريع 24/48س" : "Livraison rapide en 24/48h"}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-gray-800">
                  <div className="w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center flex-shrink-0 text-[#0F5A47] shadow-2xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold leading-tight text-gray-800">
                    {lang === "ar" ? "دفع آمن 100% مضمون" : "Paiement sécurisé 100% fiable"}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-gray-800">
                  <div className="w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center flex-shrink-0 text-[#0F5A47] shadow-2xs">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold leading-tight text-gray-800">
                    {lang === "ar" ? "خدمة عملاء 7/7 أيام" : "Service client dédié 7j/7"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Showcase Image */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg lg:max-w-xl aspect-square sm:aspect-[4/3] flex items-center justify-center">
                {/* Subtle soft backdrop circle */}
                <div className="absolute inset-0 bg-white/40 rounded-full blur-2xl transform scale-90" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={current.image}
                    alt={current.title1}
                    width={640}
                    height={480}
                    priority
                    className="object-contain max-h-[420px] drop-shadow-2xl transition-all duration-500 transform hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Slider Pagination Dots at bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Aller au slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx
                    ? "w-7 h-2 bg-[#0F5A47]"
                    : "w-2 h-2 bg-[#A8C7B8] hover:bg-[#0F5A47]/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
