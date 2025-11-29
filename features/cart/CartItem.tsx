import { Trash2, Minus, Plus } from "lucide-react";

export interface CartItemProps {
  id: string;
  name: string;
  price: number;

  quantity: number;
  itemTotal: number;

  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveProduct: (productId: string) => void;
}

const ButtonStyle =
  "p-1.5 rounded-full shadow-md transition duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2";

const CartItem = ({
  name,
  quantity,
  onUpdateQuantity,
  price,
  id,
  onRemoveProduct,
  itemTotal,
}: CartItemProps) => {
  return (
    <li className="flex justify-between items-center py-3 border-b border-dashed border-[#C19673] last:border-b-0">
      <div className="flex flex-col min-w-0 grow mr-4">
        <span className="font-medium text-[#261C1A] truncate">{name}</span>
        <span className="text-sm text-[#7C5840]">
          {price.toFixed(2)} грн × {quantity}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        {/* - */}
        <button
          onClick={() => onUpdateQuantity(id, quantity - 1)}
          disabled={quantity <= 1}
          className={`${ButtonStyle} 
            ${
              quantity <= 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#C19673] text-[#261C1A] hover:bg-[#A98463] focus:ring-[#C19673]"
            }`}
          aria-label="Уменьшить количество"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Current quantity */}
        <span className="text-md font-semibold text-[#261C1A] w-6 text-center">
          {quantity}
        </span>

        {/* + */}
        <button
          onClick={() => onUpdateQuantity(id, quantity + 1)}
          className={`${ButtonStyle} 
            bg-[#7C5840] text-white hover:bg-[#5C3D2B] focus:ring-[#7C5840]`}
          aria-label="Увеличить количество"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Delete */}
        <button
          className={`${ButtonStyle} ml-3 bg-red-600 text-white hover:bg-red-700 focus:ring-red-600`}
          onClick={() => onRemoveProduct(id)}
          aria-label="Удалить товар"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Итоговая стоимость товара */}
      <span className="font-extrabold text-xl text-[#261C1A] ml-4 min-w-[60px] text-right">
        {itemTotal.toFixed(2)} грн
      </span>
    </li>
  );
};

export default CartItem;
