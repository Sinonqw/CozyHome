"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

import Overlay from "@/components/ui/Overlay";
import CartHeader from "@/components/client/cart/CartHeader";
import CartFooter from "@/components/client/cart/CartFooter";
import CartList, {
  ProductInCart,
} from "@/components/client/cart/CartList";
import { IOrder, OrderStatus } from "@/types/orders";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: ProductInCart[];
  onRemoveProduct: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: (orderData: Omit<IOrder, "_id" | "createdAt">) => Promise<void>;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  onClose,
  items,
  onRemoveProduct,
  onUpdateQuantity,
  onCheckout,
}) => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const totalCost = items.reduce((sum, item) => {
    const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
    return sum + item.price * quantity;
  }, 0);

  const createOrderData = () => {
    const userId = session?.user?.id;
    const clientName =
      session?.user?.name ||
      (isAuthenticated
        ? "Авторизованный пользователь"
        : "Гость (Не авторизован)");

    if (!userId) {
      throw new Error(
        "User ID is missing. Order cannot be placed without authentication."
      );
    }

    const orderItems = items.map((item) => ({
      productId: item.id,
      productName: item.name,
      quantity: item.quantity && item.quantity > 0 ? item.quantity : 1,
    }));

    return {
      userId: userId,
      clientName: clientName,
      totalAmount: totalCost,
      status: "pending" as OrderStatus,
      products: orderItems,
    };
  };

  const handleCheckoutClick = async () => {
    if (!isAuthenticated) {
      console.warn("Пользователь не авторизован. Невозможно оформить заказ.");

      return;
    }

    try {
      const orderPayload = createOrderData();
      await onCheckout(orderPayload);
      onClose();
    } catch (e) {
      console.error("Ошибка при подготовке заказа:", (e as Error).message);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 z-40"
      >
        <Overlay onClose={onClose} />
      </motion.div>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
          duration: 0.5,
          ease: "easeOut",
        }}
        className="fixed top-0 right-0 z-50 w-full max-w-md h-full bg-[#E5C8AA] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Хедер корзины */}
        <CartHeader onClose={onClose} />

        {/* Основное содержимое (Список товаров) */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-14rem)]">
          {items.length === 0 ? (
            <p className="text-[#7C5840] text-center mt-10">Корзина пуста.</p>
          ) : (
            <CartList
              items={items}
              onRemoveProduct={onRemoveProduct}
              onUpdateQuantity={onUpdateQuantity}
            />
          )}
        </div>

        {/* Футер корзины (Сумма и кнопка оформления) */}
        <CartFooter
          totalCost={totalCost}
          onCheckout={handleCheckoutClick}
          // Отключаем кнопку, если пользователь не аутентифицирован
          isDisabled={!isAuthenticated}
          authStatus={status}
        />
      </motion.div>
    </>
  );
};

export default CartSidebar;
