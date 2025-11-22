import CTAButton from "@/components/ui/CTAButton";

const CartFooter = ({ totalCost }: { totalCost: number }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#C19673] shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold text-[#261C1A]">Итого:</span>
        <span className="text-2xl font-extrabold text-[#7C5840]">
          ${totalCost.toFixed(2)}
        </span>
      </div>
      {/* Кнопка Оформить заказ */}
      <CTAButton />
    </div>
  );
};

export default CartFooter;
