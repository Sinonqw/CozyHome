import CartItem from "@/features/cart/CartItem";

export interface ProductInCart {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  cartItemId?: string;
}

interface CartListProps {
  items: ProductInCart[];
  onRemoveProduct: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export interface CartItemRenderProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  itemTotal: number;

  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveProduct: (productId: string) => void;
}

const CartList = ({
  items,
  onUpdateQuantity,
  onRemoveProduct,
}: CartListProps) => {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => {
        const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
        const itemTotal = item.price * quantity;

        const uniqueKey = item.cartItemId || `${item.id}-${index}`;

        return (
          <CartItem
            key={uniqueKey}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={quantity}
            itemTotal={itemTotal}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveProduct={onRemoveProduct}
          />
        );
      })}
    </ul>
  );
};

export default CartList;
