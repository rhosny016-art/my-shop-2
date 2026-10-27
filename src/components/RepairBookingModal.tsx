"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  X,
  Calendar,
  Clock,
  Wrench,
  CheckCircle,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

interface RepairBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillData: {
    brand: string;
    model: string;
    issue: string;
    price: string;
  } | null;
}

export default function RepairBookingModal({
  isOpen,
  onClose,
  prefillData,
}: RepairBookingModalProps) {
  const { lang, t } = useLanguage();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("Alger");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("14:00");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<any>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/repairs/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerCity,
          deviceBrand: prefillData?.brand || "Apple",
          deviceModel: prefillData?.model || "iPhone 15 Pro",
          issueType: prefillData?.issue || "Écran cassé",
          preferredDate,
          preferredTime,
          notes,
          estimatedPrice: prefillData?.price,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBookingConfirmed(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSync = () => {
    if (!bookingConfirmed && !prefillData) return;
    const bookingNum = bookingConfirmed?.bookingNumber || "NOUVEAU";
    const text = `*RÉSERVATION RÉPARATION ATELIER TECHNOVA*\n\n• N° Réservation : ${bookingNum}\n• Client : ${customerName}\n• Téléphone : ${customerPhone}\n• Ville : ${customerCity}\n• Appareil : ${prefillData?.brand} ${prefillData?.model}\n• Panne : ${prefillData?.issue}\n• Devis estimé : ${prefillData?.price} DA\n• Date souhaitée : ${preferredDate || "Dès que possible"} à ${preferredTime}\n${notes ? `• Remarques : ${notes}\n` : ""}\nMerci de me confirmer la prise en charge à votre atelier !`;
    window.open(
      `https://wa.me/213550123456?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative w-full max-w-lg transform overflow-hidden rounded-3xl bg-white text-left rtl:text-right shadow-2xl transition-all border border-gray-100 p-6 sm:p-8">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition"
          >
            <X className="w-4 h-4" />
          </button>

          {!bookingConfirmed ? (
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F5A47] flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {lang === "ar" ? "حجز موعد صيانة" : "Prendre Rendez-vous en Atelier"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Intervention en 30-45 min avec garantie 6 mois
                  </p>
                </div>
              </div>

              {/* Selected device summary box */}
              {prefillData && (
                <div className="bg-[#F0F7F4] rounded-2xl p-4 border border-[#CEE5DA] mb-5">
                  <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
                    <span className="font-semibold text-gray-800">
                      {prefillData.brand} - {prefillData.model}
                    </span>
                    <span className="font-extrabold text-[#0F5A47] text-sm">
                      {parseFloat(prefillData.price).toFixed(2)} DA
                    </span>
                  </div>
                  <div className="text-xs text-gray-700 font-medium">
                    Panne : <span className="font-semibold">{prefillData.issue}</span>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === "ar" ? "الاسم الكامل *" : "Nom et Prénom *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Votre nom"
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === "ar" ? "المدينة *" : "Ville / Wilaya *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      placeholder="Alger"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0F5A47]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === "ar" ? "الوقت المفضل" : "Heure souhaitée"}
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#0F5A47]"
                    >
                      <option value="10:00">10:00 - Matin</option>
                      <option value="12:00">12:00 - Midi</option>
                      <option value="14:00">14:00 - Après-midi</option>
                      <option value="16:00">16:00 - Fin d'après-midi</option>
                      <option value="18:00">18:00 - Soir</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === "ar" ? "ملاحظات إضافية" : "Détails supplémentaires (facultatif)"}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="ex. Le tactile répond mal, caméra avant intacte..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#0F5A47]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#0F5A47] hover:bg-[#0A4133] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition disabled:opacity-50 mt-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? "Enregistrement..."
                      : "Confirmer le Rendez-vous"}
                  </span>
                </button>
              </form>
            </div>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0F5A47] flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {lang === "ar"
                  ? "تم حجز موعد الصيانة بنجاح !"
                  : "Rendez-vous confirmé avec succès !"}
              </h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                Votre dossier porte le numéro :{" "}
                <span className="font-bold text-[#0F5A47]">
                  {bookingConfirmed.bookingNumber}
                </span>
                . Notre technicien vous accueillera à l'atelier avec la pièce préparée.
              </p>

              {/* Action buttons on success */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleWhatsAppSync}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Envoyer la confirmation sur WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
