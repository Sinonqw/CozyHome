"use client";
import React from "react";
import CTAButton from "@/components/ui/CTAButton";

// Интерфейс для пропсов компонента CartFooter
interface CartFooterProps {
  totalCost: number;
  onCheckout: () => void | Promise<void>;
  isDisabled: boolean; // Добавлен для отключения кнопки, если пользователь не аутентифицирован или корзина пуста
  authStatus: 'authenticated' | 'loading' | 'unauthenticated'; // Добавлен для отображения статуса
}

const CartFooter: React.FC<CartFooterProps> = ({
  totalCost,
  onCheckout,
  isDisabled,
  authStatus,
}) => {
  let buttonText = "Оформить заказ";
  let buttonDisabled = isDisabled; // Начинаем с переданного isDisabled
  
  // Добавляем логику отображения текста и отключения кнопки
  if (authStatus === 'loading') {
    buttonText = "Загрузка сессии...";
    buttonDisabled = true;
  } else if (authStatus === 'unauthenticated') {
    buttonText = "Войдите, чтобы оформить заказ";
    buttonDisabled = true;
  } else if (totalCost === 0) {
    buttonText = "Корзина пуста";
    buttonDisabled = true;
  }
  
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#C19673] shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold text-[#261C1A]">Итого:</span>
        <span className="text-2xl font-extrabold text-[#7C5840]">
            {/* Используем ₽ или вашу валюту, основываясь на предыдущих данных, я оставлю грн, как было ранее */}
            {totalCost.toFixed(2)} грн
        </span>
      </div>
      {/* Кнопка Оформить заказ, использующая buttonDisabled */}
      <CTAButton 
        onClick={onCheckout}
        disabled={buttonDisabled}
      >
        {buttonText}
      </CTAButton>
    </div>
  );
};

export default CartFooter;