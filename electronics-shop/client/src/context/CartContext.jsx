import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("electronics_cart") || "[]"));

  useEffect(() => {
    localStorage.setItem("electronics_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };

  const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id));
  const clear = () => setItems([]);

  return <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clear }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
