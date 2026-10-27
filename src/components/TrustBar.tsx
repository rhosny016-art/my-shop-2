"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Truck, ShieldCheck, Headphones } from "lucide-react";

export default function TrustBar() {
  const { lang, t } = useLanguage();

  const trustItems = [
    {
      icon: Award,
      title: t("trustOriginal"),
      sub: t("trustOriginalSub"),
    },
    {
      icon: Truck,
      title: t("trustFastDelivery"),
      sub: t("trustFastDeliverySub"),
    },
    {
      icon: ShieldCheck,
      title: t("trustSecurePay"),
      sub: t("trustSecurePaySub"),
    },
    {
      icon: Headphones,
      title: t("trustCustomerSupport"),
      sub: t("trustCustomerSupportSub"),
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#F4F8F5] rounded-2xl p-5 flex items-center gap-4 border border-[#E3EFE8] hover:border-[#BEDCCD] hover:shadow-2xs transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0F5A47] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
