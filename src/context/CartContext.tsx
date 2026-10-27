"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number;
  name: string;
  nameAr?: string;
  brand: string;
  condition: string;
  storage?: string;
  color?: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppOrderUrl: (customerInfo?: { name: string; phone: string; address: string; city: string; notes?: string }) => string;
  generateSingleProductWhatsAppUrl: (product: any) => string;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("technova_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("technova_cart", JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const addToCart = (product: any, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          nameAr: product.nameAr,
          brand: product.brand,
          condition: product.condition || "neuf",
          storage: product.storage,
          color: product.color,
          price: parseFloat(product.price) || 0,
          imageUrl: product.imageUrl || "/images/category-smartphones.png",
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const whatsappPhone = "213550123456"; // configurable store WhatsApp phone

  const generateWhatsAppOrderUrl = (customerInfo?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  }) => {
    let text = `*NOUVELLE COMMANDE TECHNOVA*\n\n`;
    text += `*Articles commandés:*\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} (${item.condition === "neuf" ? "Neuf" : "Occasion"}) x${item.quantity} - ${(item.price * item.quantity).toFixed(2)} DA\n`;
    });
    text += `\n*Total Articles:* ${subtotal.toFixed(2)} DA\n`;

    if (customerInfo) {
      text += `\n*Informations Client:*\n`;
      text += `• Nom: ${customerInfo.name}\n`;
      text += `• Téléphone: ${customerInfo.phone}\n`;
      text += `• Ville: ${customerInfo.city}\n`;
      text += `• Adresse: ${customerInfo.address}\n`;
      if (customerInfo.notes) {
        text += `• Remarques: ${customerInfo.notes}\n`;
      }
    }

    text += `\nMerci de confirmer la disponibilité et le délai de livraison !`;

    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  const generateSingleProductWhatsAppUrl = (product: any) => {
    const text = `Bonjour TechNova,\n\nJe souhaite commander le produit suivant :\n\n*${product.name}*\n• État : ${product.condition === "neuf" ? "Neuf sous blister" : "Occasion certifiée"}\n• Prix : ${parseFloat(product.price).toFixed(2)} DA\n${product.storage ? `• Stockage : ${product.storage}\n` : ""}${product.color ? `• Couleur : ${product.color}\n` : ""}\nEst-il toujours disponible en stock ? Merci !`;
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        generateWhatsAppOrderUrl,
        generateSingleProductWhatsAppUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
