"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import BestSellersSection from "@/components/BestSellersSection";
import SpecialOfferBanner from "@/components/SpecialOfferBanner";
import ShopCatalogSection from "@/components/ShopCatalogSection";
import RepairServiceSection from "@/components/RepairServiceSection";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductDetailModal from "@/components/ProductDetailModal";
import RepairBookingModal from "@/components/RepairBookingModal";
import { Product } from "@/components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Repair Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    brand: string;
    model: string;
    issue: string;
    price: string;
  } | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setProducts(json.data);
        } else {
          // If database is empty, seed it automatically
          const seedRes = await fetch("/api/seed");
          const seedJson = await seedRes.json();
          if (seedJson.success) {
            const reRes = await fetch("/api/products");
            const reJson = await reRes.json();
            if (reJson.success) setProducts(reJson.data);
          }
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleOpenBookingModal = (prefill: {
    brand: string;
    model: string;
    issue: string;
    price: string;
  }) => {
    setBookingPrefill(prefill);
    setBookingModalOpen(true);
  };

  const handleExploreClick = () => {
    const el = document.getElementById("produits");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header / Navigation matching reference */}
      <Navbar
        onSearch={(q) => {
          setSearchQuery(q);
          if (q.trim()) {
            const el = document.getElementById("catalogue");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById("catalogue");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <main className="flex-grow">
        {/* 2. Hero Section matching reference */}
        <HeroSection onExploreClick={handleExploreClick} />

        {/* 3. Categories Section matching reference */}
        <CategoriesSection
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById("catalogue");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 4. Best Sellers Section matching reference */}
        <BestSellersSection
          products={products}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 5. Special Promotional Banner matching reference */}
        <SpecialOfferBanner onCtaClick={handleExploreClick} />

        {/* 6. Complete Catalog with Condition / Brand / Category Filters */}
        <ShopCatalogSection
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          searchQuery={searchQuery}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 7. Repair Service Interactive Workshop (Adapted to Business) */}
        <RepairServiceSection
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* 8. Trust & Value Proposition Bar matching reference */}
        <TrustBar />
      </main>

      {/* 9. Dark Emerald Curved Footer matching reference */}
      <Footer />

      {/* Modals & Slide-over Drawers */}
      <CartDrawer />

      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <RepairBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        prefillData={bookingPrefill}
      />
    </div>
  );
}
