import React from "react";
import { Plus, RefreshCw } from "lucide-react";

interface ProductTableControlsProps {
  productCount: number;
  onRefresh: () => void;
  onAddProduct: () => void;
  isLoading: boolean;
}

const ProductTableControls: React.FC<ProductTableControlsProps> = ({
  productCount,
  onRefresh,
  onAddProduct,
  isLoading,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold text-[#261C1A]">
        Список товаров ({productCount})
      </h3>
      <div className="flex space-x-3">
        {/* Кнопка ручного обновления */}
        <button
          onClick={onRefresh}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition duration-200"
          disabled={isLoading}
          title="Обновить список товаров"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
        </button>
        {/* Кнопка открывает модальное окно */}
        <button
          onClick={onAddProduct}
          className="bg-[#7C5840] hover:bg-[#A0886F] text-white font-medium py-2 px-4 rounded-lg flex items-center transition duration-200"
        >
          <Plus className="w-5 h-5 mr-2" /> Добавить товар
        </button>
      </div>
    </div>
  );
};

export default ProductTableControls;
