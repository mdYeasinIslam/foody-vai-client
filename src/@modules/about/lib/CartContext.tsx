"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface CartContextType {
  cartCount: number;
  notify: string;
  addToCart: (name: string, price: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [notify, setNotify] = useState("");

  const addToCart = useCallback((name: string, price: string) => {
    setCartCount((c) => c + 1);
    setNotify(`✦ ${name} added — ${price}`);
    setTimeout(() => setNotify(""), 2600);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, notify, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    console.warn("useCart must be used within CartProvider. Returning default values.");
    return { cartCount: 0, notify: "", addToCart: () => {} };
  }
  return ctx;
}
