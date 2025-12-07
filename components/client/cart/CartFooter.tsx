"use client";
import React from "react";
import CTAButton from "@/components/ui/CTAButton";

interface CartFooterProps {
  totalCost: number;
  onCheckout: () => void | Promise<void>;
  isDisabled: boolean;
  authStatus: "authenticated" | "loading" | "unauthenticated";
}

const CartFooter: React.FC<CartFooterProps> = ({
  totalCost,
  onCheckout,
  isDisabled,
  authStatus,
}) => {
  let buttonText = "Оформити замовлення";
  let buttonDisabled = isDisabled;

  if (authStatus === "loading") {
    buttonText = "Завантаження сесії...";
    buttonDisabled = true;
  } else if (authStatus === "unauthenticated") {
    buttonText = "Увійдіть, щоб оформити замовлення";
    buttonDisabled = true;
  } else if (totalCost === 0) {
    buttonText = "Кошик порожній";
    buttonDisabled = true;
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#C19673] shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold text-[#261C1A]">Всього:</span>
        <span className="text-2xl font-extrabold text-[#7C5840]">
          {totalCost.toFixed(2)} грн
        </span>
      </div>

      <CTAButton onClick={onCheckout} disabled={buttonDisabled}>
        {buttonText}
      </CTAButton>
    </div>
  );
};

export default CartFooter;
