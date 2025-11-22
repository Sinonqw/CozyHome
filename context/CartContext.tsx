"use client";
import { useContext, createContext, useState } from "react";
import { ReactNode } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

interface CartContextType {
  productsInCart: Product[];
  setProductsInCart: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  onRemoveProduct: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const cartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);

  function addProduct(product: Product) {
    setProductsInCart((prev) => {
      const existingProduct = prev.findIndex((item) => item.id === product.id);
      if (existingProduct !== -1) {
        const updatedProducts = [...prev];
        updatedProducts[existingProduct].quantity =
          (updatedProducts[existingProduct].quantity || 1) + 1;
        return updatedProducts;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function onRemoveProduct(productId: string) {
    setProductsInCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      onRemoveProduct(productId);
      return;
    }

    setProductsInCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  }

  return (
    <cartContext.Provider
      value={{
        productsInCart,
        setProductsInCart,
        addProduct,
        onRemoveProduct,
        updateQuantity,
        showCart,
        setShowCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
