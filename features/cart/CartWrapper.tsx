"use client";

import { AnimatePresence } from "framer-motion";
import CartSidebar from "@/components/CartSidebar";
import { useCartStore } from "@/store/cartStore";

const CartWrapper = () => {
  const {
    productsInCart,
    showCart,
    setShowCart,
    onRemoveProduct,
    updateQuantity,
    checkoutCart,
    addProduct,
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
