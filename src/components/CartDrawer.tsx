"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Truck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function CartDrawer() {
  const { lang, t, dir } = useLanguage();
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    generateWhatsAppOrderUrl,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("Alger");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  if (!isCartOpen) return null;

  const deliveryFee = subtotal > 1500 ? 0 : 50;
  const total = subtotal + (items.length > 0 ? deliveryFee : 0);

  const handleOnlineCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerCity,
          customerAddress,
          items,
          subtotal,
          deliveryFee,
          totalAmount: total,
          paymentMethod: "cash_on_delivery",
          notes: customerNotes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrderNumber(data.data.orderNumber);
        setCheckoutStep("success");
        clearCart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const url = generateWhatsAppOrderUrl({
      name: customerName || "Client TechNova",
      phone: customerPhone || "Non spécifié",
      city: customerCity || "Alger",
      address: customerAddress || "Standard",
      notes: customerNotes,
    });
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsCartOpen(false);
          setCheckoutStep("cart");
        }}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
              <ShoppingBag className="w-5 h-5 text-[#0F5A47]" />
              <span>{t("cart")}</span>
              <span className="text-xs bg-[#EAF5F0] text-[#0F5A47] font-semibold px-2 py-0.5 rounded-full">
                {items.length} {lang === "ar" ? "منتج" : "articles"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsCartOpen(false);
                setCheckoutStep("cart");
              }}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 overflow-y-auto flex-grow space-y-4">
            {checkoutStep === "cart" && (
              <>
                {items.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#0F5A47] flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <p className="text-base font-semibold text-gray-800">
                      {t("emptyCart")}
                    </p>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                      {lang === "ar"
                        ? "تصفح هواتفنا الذكية والإكسسوارات وأضف ما يعجبك إلى السلة"
                        : "Parcourez nos smartphones neufs, occasions et accessoires pour commencer votre commande."}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-2 px-5 py-2.5 rounded-full bg-[#0F5A47] text-white text-xs font-semibold hover:bg-[#0A4133]"
                    >
                      {t("allCategories")}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#F8FAF9] rounded-xl p-3 border border-gray-100 flex items-center gap-3 relative"
                      >
                        <div className="relative w-16 h-16 bg-white rounded-lg p-1.5 flex items-center justify-center flex-shrink-0 border border-gray-100">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="object-contain max-h-12 w-auto"
                          />
                        </div>

                        <div className="flex-grow min-w-0 pr-6 rtl:pr-0 rtl:pl-6">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                item.condition.startsWith("occasion")
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {item.condition.startsWith("occasion")
                                ? "Occasion"
                                : "Neuf"}
                            </span>
                            {item.storage && (
                              <span className="text-[10px] text-gray-500">
                                {item.storage}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate mt-0.5">
                            {lang === "ar" && item.nameAr ? item.nameAr : item.name}
                          </h4>
                          <div className="text-xs font-bold text-[#0F5A47] mt-0.5">
                            {(item.price * item.quantity).toFixed(2)} {t("currency")}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="absolute top-2 right-2 rtl:right-auto rtl:left-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {checkoutStep === "form" && (
              <form onSubmit={handleOnlineCheckout} className="space-y-4">
                <div className="bg-emerald-50 text-[#0F5A47] text-xs p-3 rounded-xl border border-emerald-200">
                  📦 {lang === "ar" ? "الدفع عند الاستلام بعد معاينة الهاتف" : "Paiement à la livraison après inspection de votre colis."}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === "ar" ? "الاسم الكامل *" : "Nom complet *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="ex. Mohamed Benali"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0F5A47]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === "ar" ? "رقم الهاتف *" : "Numéro de téléphone *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="05 50 XX XX XX"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0F5A47]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === "ar" ? "الولاية / المدينة *" : "Wilaya / Ville *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="Alger, Oran, Constantine..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0F5A47]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === "ar" ? "العنوان بالتفصيل *" : "Adresse de livraison *"}
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Rue, bâtiment, commune..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#0F5A47]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === "ar" ? "ملاحظات إضافية" : "Remarques (optionnel)"}
                  </label>
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Heure de livraison souhaitée..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#0F5A47]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("cart")}
                    className="w-1/3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 py-2.5 rounded-xl bg-[#0F5A47] hover:bg-[#0A4133] text-white text-xs font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? "Validation..." : "Confirmer la commande"}
                  </button>
                </div>
              </form>
            )}

            {checkoutStep === "success" && (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0F5A47] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  {lang === "ar" ? "تم تسجيل طلبك بنجاح !" : "Commande confirmée avec succès !"}
                </h3>
                <p className="text-xs text-gray-600 max-w-xs mx-auto">
                  Numéro de commande : <span className="font-bold text-[#0F5A47]">{orderNumber}</span>.
                  Notre équipe va vous appeler pour valider l'expédition.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setCheckoutStep("cart");
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#0F5A47] text-white text-xs font-semibold"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </div>

          {/* Footer Totals & Action Buttons (when in 'cart' step) */}
          {checkoutStep === "cart" && items.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-[#FAFBFB] space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Sous-total :</span>
                  <span className="font-semibold text-gray-900">
                    {subtotal.toFixed(2)} {t("currency")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison express :</span>
                  <span className="font-semibold text-emerald-700">
                    {deliveryFee === 0 ? "Gratuite" : `${deliveryFee.toFixed(2)} ${t("currency")}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-950 pt-1 border-t border-gray-200">
                  <span>Total :</span>
                  <span className="text-[#0F5A47]">
                    {total.toFixed(2)} {t("currency")}
                  </span>
                </div>
              </div>

              {/* Two CTA Buttons */}
              <div className="space-y-2 pt-1">
                {/* 1. Direct WhatsApp Order Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t("orderWhatsApp")}</span>
                </button>

                {/* 2. Standard Cash-on-Delivery Checkout Form */}
                <button
                  type="button"
                  onClick={() => setCheckoutStep("form")}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0F5A47] hover:bg-[#0A4133] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Truck className="w-4 h-4" />
                  <span>{lang === "ar" ? "طلب الدفع عند الاستلام" : "Commander (Paiement à la livraison)"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
