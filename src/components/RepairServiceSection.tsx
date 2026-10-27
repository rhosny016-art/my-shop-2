"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import {
  Wrench,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Smartphone,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface RepairServiceSectionProps {
  onOpenBookingModal: (prefill: {
    brand: string;
    model: string;
    issue: string;
    price: string;
  }) => void;
}

export default function RepairServiceSection({
  onOpenBookingModal,
}: RepairServiceSectionProps) {
  const { lang, t } = useLanguage();

  const brands = [
    { id: "Apple", name: "Apple (iPhone)" },
    { id: "Samsung", name: "Samsung Galaxy" },
    { id: "Xiaomi", name: "Xiaomi / Redmi" },
    { id: "Google", name: "Google Pixel" },
  ];

  const modelsByBrand: Record<string, string[]> = {
    Apple: [
      "iPhone 15 Pro / Max",
      "iPhone 15 / 15 Plus",
      "iPhone 14 Pro / Max",
      "iPhone 14 / 14 Plus",
      "iPhone 13 / 13 Pro",
      "iPhone 12 / 12 Pro",
      "iPhone 11",
    ],
    Samsung: [
      "Galaxy S24 / S24 Ultra",
      "Galaxy S23 / S23 Ultra",
      "Galaxy S22 Series",
      "Galaxy A54 / A53",
      "Galaxy Z Fold / Flip 5",
    ],
    Xiaomi: [
      "Xiaomi 14 / 14 Pro",
      "Xiaomi 13 / 13T",
      "Redmi Note 13 Pro+",
      "Redmi Note 12",
      "Poco F5 / X6 Pro",
    ],
    Google: ["Pixel 8 / 8 Pro", "Pixel 7 / 7 Pro", "Pixel 6a"],
  };

  const issues = [
    {
      id: "ecran",
      name: lang === "ar" ? "شاشة مكسورة / زجاج اللمس" : "Écran OLED cassé / tactile",
      priceApple: "380.00",
      priceSamsung: "360.00",
      priceXiaomi: "125.00",
      duration: "40 min",
    },
    {
      id: "batterie",
      name: lang === "ar" ? "تغيير بطارية أصلية (صحة منخفضة)" : "Changement Batterie 100% santé",
      priceApple: "120.00",
      priceSamsung: "110.00",
      priceXiaomi: "60.00",
      duration: "30 min",
    },
    {
      id: "arriere",
      name: lang === "ar" ? "زجاج الظهر الخلفي مكسور" : "Vitre arrière fissurée (Laser)",
      priceApple: "150.00",
      priceSamsung: "120.00",
      priceXiaomi: "70.00",
      duration: "60 min",
    },
    {
      id: "connecteur",
      name: lang === "ar" ? "منفذ الشحن / لا يشحن" : "Connecteur de charge USB-C / Lightning",
      priceApple: "65.00",
      priceSamsung: "60.00",
      priceXiaomi: "45.00",
      duration: "30 min",
    },
    {
      id: "camera",
      name: lang === "ar" ? "كاميرا خلفية أو عدسة مكسورة" : "Caméra arrière / Lentille rayée",
      priceApple: "140.00",
      priceSamsung: "130.00",
      priceXiaomi: "80.00",
      duration: "35 min",
    },
    {
      id: "diagnostic",
      name: lang === "ar" ? "فحص شامل وإصلاح سقوط الماء" : "Diagnostic complet & Désoxydation",
      priceApple: "45.00",
      priceSamsung: "45.00",
      priceXiaomi: "35.00",
      duration: "45 min",
    },
  ];

  const [selectedBrand, setSelectedBrand] = useState("Apple");
  const [selectedModel, setSelectedModel] = useState("iPhone 15 Pro / Max");
  const [selectedIssueId, setSelectedIssueId] = useState("ecran");

  const currentIssue = issues.find((i) => i.id === selectedIssueId) || issues[0];

  let estimatedPrice = "150.00";
  if (selectedBrand === "Apple") estimatedPrice = currentIssue.priceApple;
  else if (selectedBrand === "Samsung") estimatedPrice = currentIssue.priceSamsung;
  else estimatedPrice = currentIssue.priceXiaomi;

  const handleWhatsAppBooking = () => {
    const text = `Bonjour TechNova Réparation,\n\nJe souhaite réserver une réparation pour mon téléphone :\n• Marque : ${selectedBrand}\n• Modèle : ${selectedModel}\n• Problème : ${currentIssue.name}\n• Estimation affichée : ${estimatedPrice} DA\n\nQuand puis-je passer à votre atelier ? Merci !`;
    window.open(
      `https://wa.me/213550123456?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleOpenModal = () => {
    onOpenBookingModal({
      brand: selectedBrand,
      model: selectedModel,
      issue: currentIssue.name,
      price: estimatedPrice,
    });
  };

  return (
    <section id="reparation" className="py-16 bg-[#F8FAF9] border-y border-[#E5EFEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2E9] text-[#0F5A47] text-xs font-bold tracking-wide uppercase mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>{t("repairTag")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
            {t("repairTitle")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            {t("repairDesc")}
          </p>
        </div>

        {/* Interactive Repair Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-[#E0ECE5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Form: Selectors */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Brand */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                {t("selectBrand")}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {brands.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setSelectedBrand(b.id);
                      setSelectedModel(modelsByBrand[b.id]?.[0] || "");
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition border text-center ${
                      selectedBrand === b.id
                        ? "bg-[#0F5A47] text-white border-[#0F5A47] shadow-xs"
                        : "bg-[#F7FAF8] hover:bg-[#EDF5F1] text-gray-800 border-gray-200"
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Model */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                {t("selectModel")}
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-[#F7FAF8] border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-[#0F5A47] focus:bg-white"
              >
                {(modelsByBrand[selectedBrand] || []).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Issue */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                {t("selectIssue")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {issues.map((iss) => (
                  <button
                    key={iss.id}
                    type="button"
                    onClick={() => setSelectedIssueId(iss.id)}
                    className={`p-3 rounded-xl text-xs sm:text-sm font-medium text-left rtl:text-right transition border flex items-center justify-between ${
                      selectedIssueId === iss.id
                        ? "bg-[#EBF7F1] border-[#0F5A47] text-[#0F5A47] font-semibold"
                        : "bg-[#F7FAF8] hover:bg-gray-100 border-gray-200 text-gray-800"
                    }`}
                  >
                    <span className="line-clamp-1">{iss.name}</span>
                    {selectedIssueId === iss.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#0F5A47] flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Instant Quote & Booking */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#EEF7F2] to-[#E3EFE8] rounded-2xl p-6 sm:p-8 border border-[#CFE4D9] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D4E8DC]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F5A47] uppercase tracking-wider">
                  <Smartphone className="w-4 h-4" />
                  <span>Devis instantané</span>
                </div>
                <span className="text-[11px] bg-white px-2.5 py-0.5 rounded-full font-semibold text-[#0F5A47] border border-[#C6DFD2]">
                  {selectedBrand}
                </span>
              </div>

              <h4 className="text-lg font-bold text-gray-900 mt-3">
                {selectedModel}
              </h4>
              <p className="text-xs text-gray-600 mt-0.5">
                {currentIssue.name}
              </p>

              {/* Price display */}
              <div className="mt-5 bg-white rounded-xl p-4 border border-[#D5EADB] shadow-2xs">
                <span className="text-xs text-gray-500 block font-medium">
                  {t("instantEstimate")}
                </span>
                <div className="text-3xl font-extrabold text-[#0F5A47] mt-1">
                  {parseFloat(estimatedPrice).toLocaleString("fr-FR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {t("currency")}
                </div>
                <span className="text-[11px] text-gray-600 block mt-1">
                  Pièce d'origine + Main-d'œuvre incluse + Diagnostic offert
                </span>
              </div>

              {/* Guarantees checklist */}
              <div className="mt-4 space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#0F5A47]" />
                  <span>Intervention express en 30 à 45 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F5A47]" />
                  <span>Garantie 6 mois sur pièce et main d'œuvre</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0F5A47]" />
                  <span>Sauvegarde de vos données personnelles préservée</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleOpenModal}
                className="w-full py-3 px-4 rounded-xl bg-[#0F5A47] hover:bg-[#0A4133] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition"
              >
                <Calendar className="w-4 h-4" />
                <span>{t("bookRepairBtn")}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-emerald-50 text-[#0F5A47] border border-[#BEDBCB] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{t("whatsappRepairBtn")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
