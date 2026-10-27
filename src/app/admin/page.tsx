"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Unlock,
  Package,
  Wrench,
  ShoppingBag,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Phone,
  Clock,
  ArrowLeft,
  RefreshCw,
  MessageCircle,
} from "lucide-react";

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "repairs" | "orders" | "settings">("products");

  const [products, setProducts] = useState<any[]>([]);
  const [repairs, setRepairs] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // New product form modal state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    nameAr: "",
    brand: "Apple",
    condition: "neuf",
    categorySlug: "smartphones-neufs",
    storage: "128 Go",
    color: "Noir",
    price: "850.00",
    originalPrice: "990.00",
    discountPercent: 14,
    batteryHealth: "100%",
    warranty: "12 mois garantie",
    stock: 10,
    imageUrl: "/images/category-smartphones.png",
    description: "Nouveau smartphone haute performance.",
    isBestSeller: true,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234 or technova2025
    if (pin === "1234" || pin === "technova2025" || pin === "0000") {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Code PIN incorrect. Utilisez '1234' pour accéder.");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProd, resRep, resOrd] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/repairs/book"),
        fetch("/api/orders"),
      ]);

      const [dataProd, dataRep, dataOrd] = await Promise.all([
        resProd.json(),
        resRep.json(),
        resOrd.json(),
      ]);

      if (dataProd.success) setProducts(dataProd.data);
      if (dataRep.success) setRepairs(dataRep.data);
      if (dataOrd.success) setOrders(dataOrd.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => [data.data, ...prev]);
        setShowAddProductModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSeedReset = async () => {
    if (!confirm("Réinitialiser et re-charger les données catalogue initiales ?")) return;
    setLoading(true);
    try {
      await fetch("/api/seed");
      await fetchData();
      alert("Données initialisées avec succès !");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F0F5F2] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-gray-100 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0F5A47]/10 text-[#0F5A47] flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              TechNova Admin
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Portail sécurisé de gestion de la boutique et de l'atelier
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Entrez le code PIN (par défaut : 1234)
              </label>
              <input
                type="password"
                maxLength={8}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full text-center tracking-widest text-2xl font-bold bg-gray-50 border border-gray-200 rounded-xl py-3 focus:outline-none focus:border-[#0F5A47]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0F5A47] hover:bg-[#0A4133] text-white font-semibold text-sm transition shadow-sm"
            >
              Déverrouiller
            </button>
          </form>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0F5A47]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour à la boutique</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-gray-900">
      {/* Admin Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-semibold text-[#0F5A47] hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Boutique</span>
            </Link>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-extrabold text-gray-900 text-lg">
                Tech<span className="text-[#0F5A47]">Nova</span> Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchData}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-xs font-semibold flex items-center gap-1.5 text-gray-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Actualiser</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">
                Produits en stock
              </p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
                {products.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0F5A47] flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">
                Réparations réservées
              </p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
                {repairs.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Wrench className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">
                Commandes clients
              </p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
                {orders.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">
                Statut Atelier
              </p>
              <h3 className="text-base font-extrabold text-emerald-700 mt-1">
                Opérationnel (7j/7)
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#0F5A47] flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-gray-200 space-x-6">
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`pb-3 text-sm font-semibold transition border-b-2 ${
              activeTab === "products"
                ? "border-[#0F5A47] text-[#0F5A47]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Smartphones & Accessoires ({products.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("repairs")}
            className={`pb-3 text-sm font-semibold transition border-b-2 ${
              activeTab === "repairs"
                ? "border-[#0F5A47] text-[#0F5A47]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Rendez-vous Réparation ({repairs.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-sm font-semibold transition border-b-2 ${
              activeTab === "orders"
                ? "border-[#0F5A47] text-[#0F5A47]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Commandes ({orders.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`pb-3 text-sm font-semibold transition border-b-2 ${
              activeTab === "settings"
                ? "border-[#0F5A47] text-[#0F5A47]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Maintenance & Données
          </button>
        </div>

        {/* Tab 1: Products */}
        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                Inventaire des Produits
              </h3>
              <button
                type="button"
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2 rounded-xl bg-[#0F5A47] hover:bg-[#0A4133] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un smartphone / accessoire</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAF9] text-gray-500 uppercase tracking-wider font-bold border-b border-gray-100">
                    <tr>
                      <th className="p-3.5">Produit</th>
                      <th className="p-3.5">État</th>
                      <th className="p-3.5">Catégorie</th>
                      <th className="p-3.5">Prix</th>
                      <th className="p-3.5">Stock</th>
                      <th className="p-3.5">Bestseller</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="p-3.5 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-50 p-1 border border-gray-100 flex items-center justify-center">
                            <Image
                              src={p.imageUrl}
                              alt={p.name}
                              width={32}
                              height={32}
                              className="object-contain max-h-8"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-gray-500">
                              {p.brand} {p.storage ? `• ${p.storage}` : ""}
                            </span>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.condition.startsWith("occasion")
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {p.condition.startsWith("occasion") ? "Occasion Grade A+" : "Neuf"}
                          </span>
                        </td>
                        <td className="p-3.5 text-gray-600 font-medium">
                          {p.categorySlug}
                        </td>
                        <td className="p-3.5 font-bold text-[#0F5A47]">
                          {parseFloat(p.price).toFixed(2)} DA
                        </td>
                        <td className="p-3.5 text-gray-700">
                          {p.stock} unités
                        </td>
                        <td className="p-3.5">
                          {p.isBestSeller ? (
                            <span className="text-emerald-700 font-semibold">Oui ★</span>
                          ) : (
                            <span className="text-gray-400">Non</span>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Repair Appointments */}
        {activeTab === "repairs" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              Réservations d'Atelier ({repairs.length})
            </h3>

            {repairs.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-100">
                Aucune réservation pour le moment.
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAF9] text-gray-500 uppercase tracking-wider font-bold border-b border-gray-100">
                    <tr>
                      <th className="p-3.5">N° Dossier</th>
                      <th className="p-3.5">Client</th>
                      <th className="p-3.5">Téléphone</th>
                      <th className="p-3.5">Appareil</th>
                      <th className="p-3.5">Panne</th>
                      <th className="p-3.5">Date / Heure</th>
                      <th className="p-3.5">Devis</th>
                      <th className="p-3.5 text-right">WhatsApp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {repairs.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="p-3.5 font-bold text-[#0F5A47]">
                          {r.bookingNumber}
                        </td>
                        <td className="p-3.5 font-semibold text-gray-900">
                          {r.customerName}
                          <span className="block text-[10px] text-gray-500">
                            {r.customerCity}
                          </span>
                        </td>
                        <td className="p-3.5 text-gray-700 font-medium">
                          {r.customerPhone}
                        </td>
                        <td className="p-3.5 font-medium text-gray-800">
                          {r.deviceBrand} {r.deviceModel}
                        </td>
                        <td className="p-3.5 text-gray-600">
                          {r.issueType}
                        </td>
                        <td className="p-3.5 text-gray-600">
                          {r.preferredDate || "Immédiat"} à {r.preferredTime}
                        </td>
                        <td className="p-3.5 font-bold text-[#0F5A47]">
                          {r.estimatedPrice ? `${parseFloat(r.estimatedPrice).toFixed(2)} DA` : "Devis atelier"}
                        </td>
                        <td className="p-3.5 text-right">
                          <a
                            href={`https://wa.me/${r.customerPhone.replace(/[^0-9]/g, "")}?text=Bonjour%20${encodeURIComponent(r.customerName)},%20TechNova%20vous%20confirme%20la%20prise%20en%20charge%20de%20votre%20${encodeURIComponent(r.deviceModel)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg inline-flex"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              Commandes enregistrées ({orders.length})
            </h3>

            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-100">
                Aucune commande enregistrée pour le moment.
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAF9] text-gray-500 uppercase tracking-wider font-bold border-b border-gray-100">
                    <tr>
                      <th className="p-3.5">N° Commande</th>
                      <th className="p-3.5">Client</th>
                      <th className="p-3.5">Téléphone</th>
                      <th className="p-3.5">Adresse / Ville</th>
                      <th className="p-3.5">Articles</th>
                      <th className="p-3.5">Montant Total</th>
                      <th className="p-3.5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50">
                        <td className="p-3.5 font-bold text-[#0F5A47]">
                          {o.orderNumber}
                        </td>
                        <td className="p-3.5 font-semibold text-gray-900">
                          {o.customerName}
                        </td>
                        <td className="p-3.5 text-gray-700">
                          {o.customerPhone}
                        </td>
                        <td className="p-3.5 text-gray-600">
                          {o.customerAddress}, {o.customerCity}
                        </td>
                        <td className="p-3.5 text-gray-600">
                          {Array.isArray(o.items)
                            ? o.items.map((i: any) => `${i.name} (x${i.quantity})`).join(", ")
                            : "Articles"}
                        </td>
                        <td className="p-3.5 font-extrabold text-[#0F5A47]">
                          {parseFloat(o.totalAmount).toFixed(2)} DA
                        </td>
                        <td className="p-3.5 text-gray-500">
                          {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Settings & Data Reset */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-6">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Gestion des Données & Démonstration
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Rétablir les données initiales du catalogue TechNova (smartphones neufs, reconditionnés, réparations).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              ⚠️ Attention : La réinitialisation rechargera tous les smartphones de test et services d'origine.
            </div>

            <button
              type="button"
              onClick={handleSeedReset}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-[#0F5A47] text-white text-xs font-semibold hover:bg-[#0A4133] transition"
            >
              Réinitialiser le catalogue (Seed Database)
            </button>
          </div>
        )}
      </main>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900">
              Ajouter un nouveau smartphone ou accessoire
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Nom du produit
                </label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="ex. iPhone 15 Pro Max 256Go"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Marque
                  </label>
                  <select
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                  >
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Sony">Sony</option>
                    <option value="TechNova Pro">TechNova Pro</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    État
                  </label>
                  <select
                    value={newProduct.condition}
                    onChange={(e) => setNewProduct({ ...newProduct, condition: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                  >
                    <option value="neuf">Neuf sous blister</option>
                    <option value="occasion_grade_a">Occasion Grade A+</option>
                    <option value="occasion_grade_b">Occasion Grade A</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Prix de vente (DA)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Prix barré (optionnel)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Santé Batterie
                  </label>
                  <input
                    type="text"
                    value={newProduct.batteryHealth}
                    onChange={(e) => setNewProduct({ ...newProduct, batteryHealth: e.target.value })}
                    placeholder="100% ou 94%"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Stock disponible
                  </label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value, 10) })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#0F5A47] text-white font-semibold"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
