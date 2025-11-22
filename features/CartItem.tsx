export interface CartItemProps {
  id: string;
  name: string;
  price: number;

  quantity: number;
  itemTotal: number;

  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveProduct: (productId: string) => void;
}

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
    <li className="flex justify-between items-center py-2 border-b border-dashed border-[#C19673]">
      <div className="flex flex-col">
        <span className="font-medium text-[#261C1A]">{name}</span>
        <span className="text-sm text-[#7C5840]">
          ${price.toFixed(2)} × {quantity}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(id, quantity - 1)}
          className="bg-red-500 p-1 cursor-pointer"
        >
          -
        </button>
        <button
          onClick={() => onUpdateQuantity(id, quantity + 1)}
          className="bg-green-500 p-1 cursor-pointer"
        >
          +
        </button>
        <button
          className="bg-red-500 p-1 cursor-pointer"
          onClick={() => onRemoveProduct(id)}
        >
          del
        </button>
      </div>
      <span className="font-semibold text-lg text-[#261C1A]">
        ${itemTotal.toFixed(2)}
      </span>
    </li>
  );
};

export default CartItem;
