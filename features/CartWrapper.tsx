"use client";

import { AnimatePresence } from "framer-motion";
import CartSidebar from "@/components/CartSidebar";
import { useCart } from "@/context/CartContext";

const CartWrapper = () => {
  const {
    productsInCart,
    showCart,
    setShowCart,
    onRemoveProduct,
    updateQuantity,
  } = useCart();

  return (
    <AnimatePresence>
      {showCart && (
        <CartSidebar
          isOpen={showCart}
          items={productsInCart}
          onClose={() => setShowCart(false)}
          onRemoveProduct={onRemoveProduct}
          onUpdateQuantity={updateQuantity}
        />
      )}
    </AnimatePresence>
  );
};

export default CartWrapper;
