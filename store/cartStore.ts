import { create } from "zustand";
import { api } from "@/lib/fetcher";
import { IOrder } from "@/types/orders";
import { Product } from "@/types/product";


interface CartState {
  productsInCart: Product[];
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  addProduct: (product: Omit<Product, "quantity">) => void;
  onRemoveProduct: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  checkoutCart: (
    orderPayload: Omit<IOrder, "_id" | "createdAt">
  ) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  productsInCart: [],
  showCart: false,

  // 1. Управління UI (показ/приховування)
  setShowCart: (show) => set({ showCart: show }),

  // 2. Додавання продукту
  addProduct: (product) =>
    set((state) => {
      const existingProductIndex = state.productsInCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Якщо продукт вже є, збільшуємо кількість
        const updatedProducts = [...state.productsInCart];
        updatedProducts[existingProductIndex].quantity += 1;
        return { productsInCart: updatedProducts };
      }
      // Якщо продукту немає, додаємо новий з кількістю 1
      return {
        productsInCart: [...state.productsInCart, { ...product, quantity: 1 }],
      };
    }),

  // 3. Видалення продукту
  onRemoveProduct: (productId) =>
    set((state) => ({
      productsInCart: state.productsInCart.filter(
        (item) => item.id !== productId
      ),
    })),

  // 4. Оновлення кількості
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      // Якщо кількість менше або дорівнює 0, видаляємо продукт
      get().onRemoveProduct(productId);
      return;
    }

    set((state) => ({
      productsInCart: state.productsInCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  // 5. Оформлення замовлення
  checkoutCart: async (orderPayload) => {
    if (get().productsInCart.length === 0) return; // Нічого не робити, якщо кошик порожній

    try {
      // 1. Надсилаємо замовлення
      await api.post("/api/orders", orderPayload);

      // 2. Очищаємо кошик
      set({ productsInCart: [] });

      // 3. Закриваємо бічну панель
      get().setShowCart(false);
    } catch (e) {
      console.error("Помилка при оформленні замовлення:", e);
      // Прокидаємо помилку далі, щоб її міг обробити компонент
      throw e; 
    }
  },
}));