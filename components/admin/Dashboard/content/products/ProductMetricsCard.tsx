import { AlertTriangle, EyeOff, Package } from "lucide-react";
import type { IProduct } from "./ProductsSection";

const ProductMetricsCard = ({ products }: { products: IProduct[] }) => {
  const lowStockCount = products.filter((i) => i.count <= 5).length;
  const draftCount = products.filter((i) => i.isDraft).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-[#FBF0E6] p-5 rounded-lg shadow flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Усього товарів</p>
          <p className="text-3xl font-bold text-[#261C1A]">{products.length}</p>
        </div>
        <Package className="w-8 h-8 text-[#7C5840]" />
      </div>
      <div className="bg-[#FBF0E6] p-5 rounded-lg shadow flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Закінчуються</p>
          <p className="text-3xl font-bold text-red-600">{lowStockCount}</p>
        </div>
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      <div className="bg-[#FBF0E6] p-5 rounded-lg shadow flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Приховані (Чернетки)
          </p>
          <p className="text-3xl font-bold text-gray-700">{draftCount}</p>
        </div>
        <EyeOff className="w-8 h-8 text-gray-700" />
      </div>
    </div>
  );
};

export default ProductMetricsCard;
