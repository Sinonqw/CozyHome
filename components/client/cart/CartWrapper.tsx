"use client";

import { AnimatePresence } from "framer-motion";
import CartSidebar from "../sections/CartSidebar";
import { useCartStore } from "@/store/cartStore";

const CartWrapper = () => {
  const {
    productsInCart,
    showCart,
    setShowCart,
    onRemoveProduct,
    updateQuantity,
    checkoutCart,
  } = useCartStore();

  return (
    <AnimatePresence>
      {showCart && (
        <CartSidebar
          isOpen={showCart}
          items={productsInCart}
          onClose={() => setShowCart(false)}
          onRemoveProduct={onRemoveProduct}
          onUpdateQuantity={updateQuantity}
          onCheckout={checkoutCart}
        />
      )}
    </AnimatePresence>
  );
};

export default CartWrapper;
