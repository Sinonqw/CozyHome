import Button from "../ui/Button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartBTN = () => {
  const { productsInCart, setShowCart } = useCart();
  return (
    <Button
      onClick={() => setShowCart(true)}
      intent="primary"
      className="
              flex items-center gap-2 
              shadow-lg shadow-[#7C5840]/30 
              hover:shadow-xl hover:shadow-[#261C1A]/30
            "
    >
      <ShoppingBag className="w-5 h-5" />
      КОШИК
      {productsInCart.length > 0 && (
        <span
          className="
                    bg-[#261C1A] text-[#FBF0E6] 
                    rounded-full w-6 h-6 flex items-center justify-center 
                    text-xs font-black
                "
        >
          {productsInCart.length}
        </span>
      )}
    </Button>
  );
};

export default CartBTN;
