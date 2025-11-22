import React from "react";
import ButtonClose from "../components/ui/ButtonClose";

interface CartHeaderProps {
  onClose: () => void;
}

const CartHeader = ({ onClose }: CartHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-[#C19673]">
      <h3 id="cart-title" className="text-2xl font-bold text-[#261C1A]">
        🛒 Ваша Корзина
      </h3>
      {/* Кнопка закрытия */}
      <ButtonClose onClose={onClose} />
    </div>
  );
};

export default CartHeader;
