"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "fr" | "ar";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    home: "Accueil",
    shop: "Boutique",
    categories: "Catégories",
    repairs: "Réparations",
    about: "À propos",
    contact: "Contact",
    searchPlaceholder: "Rechercher un smartphone, accessoire, réparation...",
    allCategories: "Voir toutes les catégories",
    cart: "Panier",
    emptyCart: "Votre panier est vide",
    checkout: "Commander",
    orderWhatsApp: "Commander via WhatsApp",

    // Hero
    newBadge: "✦ Nouveauté",
    heroTitlePart1: "La technologie",
    heroTitlePart2: "à portée de main",
    heroDesc: "Découvrez les derniers smartphones neufs et occasions reconditionnées, accessoires certifiés et notre atelier de réparation express avec pièces d'origine.",
    heroCta: "Découvrir la collection",
    delivery24h: "Livraison rapide en 24/48h",
    paymentSecure: "Paiement sécurisé 100% fiable",
    supportDedicated: "Service client dédié 7j/7",

    // Categories
    categoriesTag: "NOS CATÉGORIES",
    categoriesTitle: "Parcourir par catégorie",
    catSmartphones: "Smartphones Neufs",
    catUsed: "Smartphones Occasion",
    catAudio: "Audio & Écouteurs",
    catWatches: "Montres connectées",
    catAccessories: "Accessoires & Charge",
    catRepairs: "Service Réparation",

    // Featured Products
    featuredTag: "PRODUITS PHARES",
    featuredTitle: "Les meilleures ventes",
    addToCart: "Ajouter au panier",
    addedToCart: "Ajouté !",
    viewProduct: "Voir détails",
    currency: "DA",
    stockAvailable: "En stock",
    outOfStock: "Rupture de stock",
    conditionNew: "Neuf scellé",
    conditionUsedA: "Occasion Grade A+",
    conditionUsedB: "Occasion Grade A",

    // Promo Banner
    promoBadge: "Offre spéciale",
    promoTitlePart1: "Jusqu'à -20%",
    promoTitlePart2: "sur une sélection de smartphones & réparations",
    promoDesc: "Équipez-vous avec les meilleures marques et profitez de notre service express !",
    promoCta: "Voir l'offre",

    // Repair Service
    repairTag: "ATELIER DE RÉPARATION EXPRESS",
    repairTitle: "Estimez & réservez votre réparation",
    repairDesc: "Écran brisé, batterie à plat ou problème de charge ? Nos techniciens réparent votre smartphone en moins de 45 minutes avec garantie 6 mois.",
    selectBrand: "1. Marque",
    selectModel: "2. Modèle",
    selectIssue: "3. Problème rencontré",
    screenRepair: "Écran cassé / Vitre tactile",
    batteryRepair: "Batterie faible / Remplacement",
    connectorRepair: "Connecteur de charge / USB",
    backGlassRepair: "Vitre arrière fissurée",
    cameraRepair: "Caméra / Lentille rayée",
    instantEstimate: "Estimation immédiate :",
    turnaroundTime: "Délai moyen : 30 à 45 minutes",
    bookRepairBtn: "Prendre Rendez-vous",
    whatsappRepairBtn: "Réserver par WhatsApp",

    // Trust
    trustOriginal: "Produits originaux",
    trustOriginalSub: "Garantie constructeur & boutique",
    trustFastDelivery: "Livraison rapide",
    trustFastDeliverySub: "Partout avec suivi de colis",
    trustSecurePay: "Paiement sécurisé",
    trustSecurePaySub: "100% fiable / À la livraison",
    trustCustomerSupport: "Support client & Atelier",
    trustCustomerSupportSub: "Techniciens à votre écoute",

    // Footer
    footerTagline: "Votre univers smartphone, accessoires et réparation express.",
    usefulLinks: "Liens utiles",
    followUs: "Suivez-nous",
    newsletterTitle: "Newsletter",
    newsletterDesc: "Recevez nos nouveautés et offres spéciales",
    newsletterPlaceholder: "Votre adresse e-mail",
    rightsReserved: "Tous droits réservés.",
    terms: "Conditions générales",
    privacy: "Politique de confidentialité",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    shop: "المتجر",
    categories: "الفئات",
    repairs: "خدمات الصيانة",
    about: "من نحن",
    contact: "اتصل بنا",
    searchPlaceholder: "ابحث عن هاتف، إكسسوار، أو خدمة تصليح...",
    allCategories: "عرض جميع الفئات",
    cart: "سلة المشتريات",
    emptyCart: "سلة المشتريات فارغة",
    checkout: "إتمام الطلب",
    orderWhatsApp: "الطلب عبر واتساب",

    // Hero
    newBadge: "✦ وصل حديثاً",
    heroTitlePart1: "التكنولوجيا المتطورة",
    heroTitlePart2: "في متناول يدك",
    heroDesc: "اكتشف أحدث الهواتف الذكية الجديدة والمستعملة المضمونة، الإكسسوارات الأصلية مع خدمة التصليح الفوري بقطع غيار أصلية.",
    heroCta: "استكشف التشكيلة",
    delivery24h: "توصيل سريع خلال 24/48 ساعة",
    paymentSecure: "دفع آمن 100% عند الاستلام",
    supportDedicated: "خدمة عملاء مخصصة 7/7 أيام",

    // Categories
    categoriesTag: "فئات منتجاتنا",
    categoriesTitle: "تصفح حسب الفئة",
    catSmartphones: "هواتف ذكية جديدة",
    catUsed: "هواتف مستعملة مضمونة",
    catAudio: "صوتيات وسماعات",
    catWatches: "ساعات ذكية",
    catAccessories: "إكسسوارات وشواحن",
    catRepairs: "ورشة الصيانة والتصليح",

    // Featured Products
    featuredTag: "المنتجات المميزة",
    featuredTitle: "الأكثر مبيعاً",
    addToCart: "أضف إلى السلة",
    addedToCart: "تمت الإضافة !",
    viewProduct: "تفاصيل المنتج",
    currency: "د.ج",
    stockAvailable: "متوفر بالمخزون",
    outOfStock: "نفذ من المخزون",
    conditionNew: "جديد بالعلبة",
    conditionUsedA: "مستعمل ممتاز Grade A+",
    conditionUsedB: "مستعمل بحالة جيدة",

    // Promo Banner
    promoBadge: "عرض خاص ومحدود",
    promoTitlePart1: "خصم يصل إلى 20%",
    promoTitlePart2: "على تشكيلة من الهواتف والإكسسوارات",
    promoDesc: "احصل على أفضل الأجهزة بأقوى الأسعار واستفد من خدمات الصيانة الفورية !",
    promoCta: "اكتشف العرض",

    // Repair Service
    repairTag: "ورشة الصيانة الفورية",
    repairTitle: "احسب تكلفة تصليح هاتفك واحجز موعدك",
    repairDesc: "شاشة مكسورة، بطارية ضعيفة أو مشكل في منفذ الشحن؟ فنيونا المعتمدون يصلحون هاتفك خلال 45 دقيقة بقطع أصلية وضمان 6 أشهر.",
    selectBrand: "1. نوع الهاتف",
    selectModel: "2. الموديل",
    selectIssue: "3. نوع العطل",
    screenRepair: "شاشة مكسورة / زجاج اللمس",
    batteryRepair: "تغيير بطارية أصلية",
    connectorRepair: "منفذ الشحن والميكروفون",
    backGlassRepair: "استبدال الزجاج الخلفي",
    cameraRepair: "إصلاح الكاميرا والعدسة",
    instantEstimate: "السعر التقديري الفوري:",
    turnaroundTime: "مدة التصليح: 30 إلى 45 دقيقة",
    bookRepairBtn: "حجز موعد في المحل",
    whatsappRepairBtn: "حجز فوري عبر واتساب",

    // Trust
    trustOriginal: "منتجات أصلية 100%",
    trustOriginalSub: "ضمان رسمي من الشركة والمتجر",
    trustFastDelivery: "توصيل سريع وموثوق",
    trustFastDeliverySub: "لجميع الولايات مع تتبع الطرد",
    trustSecurePay: "دفع آمن عند الاستلام",
    trustSecurePaySub: "عاين طلبك قبل الدفع",
    trustCustomerSupport: "دعم فني واستشارة مجانية",
    trustCustomerSupportSub: "خبراء تقنيون في خدمتكم دائماً",

    // Footer
    footerTagline: "عالمك الموثوق للهواتف الذكية، الإكسسوارات وخدمات الصيانة السريعة.",
    usefulLinks: "روابط سريعة",
    followUs: "تابعنا على",
    newsletterTitle: "النشرة البريدية",
    newsletterDesc: "اشترك لتصلك أحدث العروض والأسعار الحصرية",
    newsletterPlaceholder: "أدخل بريدك الإلكتروني",
    rightsReserved: "جميع الحقوق محفوظة.",
    terms: "الشروط والأحكام",
    privacy: "سياسة الخصوصية",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  dir: "ltr",
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("technova_lang") as Language;
    if (saved && (saved === "fr" || saved === "ar")) {
      setLangState(saved);
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("technova_lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["fr"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
