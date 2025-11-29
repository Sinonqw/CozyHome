"use client";
import Button from "../ui/Button";
import { motion, steps, Variants } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

export interface IProductCard {
  title: string;
  desc: string;
  cost: number;
  id: string;
  itemVariants?: Variants;
}

const ProductCard = ({ title, desc, cost, id, itemVariants }: IProductCard) => {
  const addProduct = useCartStore((state) => state.addProduct);

  const price = cost || 0;

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (isAdding) return;

    addProduct({ id: id, name: title, price: price });

    setIsAdding(true);

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  const baseClasses =
    "w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl uppercase tracking-wider transition-all duration-300 ease-in-out";

  const activeClasses = isAdding
    ? "bg-[#261C1A] text-[#FBF0E6] shadow-xl shadow-[#261C1A]/50 pointer-events-none"
    : "bg-[#7C5840] text-[#FBF0E6] shadow-lg shadow-[#7C5840]/50 hover:bg-[#261C1A] hover:shadow-xl hover:shadow-[#261C1A]/50 active:translate-y-0.5 active:shadow-md"; // Вихідний стиль

  return (
    <motion.li
      variants={itemVariants}
      className="bg-[#FBF0E6] rounded-3xl shadow-2xl shadow-[#261C1A]/10 p-8 flex flex-col transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-[#7C5840]/30 hover:scale-[1.03] border border-[#C19673]/30 overflow-hidden min-w-[280px]"
    >
      <h4 className="text-3xl font-serif font-extrabold mb-3 text-[#261C1A] leading-snug">
        {title}
      </h4>
      <p className="text-sm text-[#261C1A] opacity-80 grow mb-4 border-b border-dashed border-[#C19673]/20 pb-4 min-h-[60px]">
        {desc}
      </p>
      <div className="flex justify-between items-end mt-auto mb-6 pt-3 border-t border-[#E5C8AA]">
        <span className="text-sm font-medium text-[#7C5840] uppercase">
          Ціна
        </span>
        <span className="text-4xl font-sans font-black text-[#7C5840] tracking-tighter">
          {cost} грн
        </span>
      </div>

      {/* Кнопка зі зворотним зв'язком */}
      <Button
        className={`${baseClasses} ${activeClasses}`}
        onClick={handleAddToCart}
      >
        {isAdding ? (
          <>
            <Check className="w-5 h-5 animate-pulse" />
            ДОДАНО!
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Додати до кошика
          </>
        )}
      </Button>
    </motion.li>
  );
};

export default ProductCard;
