import { create } from "zustand";
import { api } from "@/lib/fetcher";
import { IOrder } from "@/types/orders";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

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

  // 1. Управление UI
  setShowCart: (show) => set({ showCart: show }),

  // 2. Добавление продукта
  addProduct: (product) =>
    set((state) => {
      const existingProductIndex = state.productsInCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...state.productsInCart];
        updatedProducts[existingProductIndex].quantity += 1;
        return { productsInCart: updatedProducts };
      }
      return {
        productsInCart: [...state.productsInCart, { ...product, quantity: 1 }],
      };
    }),

  // 3. Удаление продукта
  onRemoveProduct: (productId) =>
    set((state) => ({
      productsInCart: state.productsInCart.filter(
        (item) => item.id !== productId
      ),
    })),

  // 4. Обновление количества
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().onRemoveProduct(productId);
      return;
    }

    set((state) => ({
      productsInCart: state.productsInCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  // 5. Оформление заказа
  checkoutCart: async (orderPayload) => {
    if (get().productsInCart.length === 0) return;

    try {
      // 1. Отправляем заказ
      await api.post("/api/orders", orderPayload);

      // 2. Очищаем корзину
      set({ productsInCart: [] });

      // 3. Закрываем сайдбар
      get().setShowCart(false);
    } catch (e) {
      console.error("Ошибка при оформлении заказа:", e);
      throw e;
    }
  },
}));
