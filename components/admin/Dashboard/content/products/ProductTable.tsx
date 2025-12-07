import React from "react";
import { Loader } from "lucide-react";
import { IProduct } from "./ProductsSection";
import ProductStatusBadge from "./ProductStatusBadge";

interface ProductTableProps {
  products: IProduct[];
  isLoading: boolean;
  error: string | null;
  onDeleteProduct: (id: string) => void;
  onEditProduct: (product: IProduct) => void;
  onToggleDraft: (id: string, isDraft: boolean) => Promise<void>;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  error,
  onDeleteProduct,
  onEditProduct,
  onToggleDraft,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-[#7C5840]">
        <Loader className="w-6 h-6 animate-spin mr-2" /> Загрузка товаров...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-700 bg-red-50 text-center font-medium">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-6 text-gray-500 text-center">
        Товары не найдены. Нажмите "Добавить товар", чтобы создать первый.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#E5C8AA]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#261C1A] uppercase tracking-wider">
              Название
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#261C1A] uppercase tracking-wider">
              Описание
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#261C1A] uppercase tracking-wider">
              Цена (ГРН)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#261C1A] uppercase tracking-wider">
              Количество
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-[#261C1A] uppercase tracking-wider">
              Статус
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-[#261C1A] uppercase tracking-wider">
              Действия
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#261C1A]">
                {product.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {product.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {product.priceUSD.toFixed(2)} грн
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                {product.count}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                <ProductStatusBadge
                  isDraft={product.isDraft}
                  onClick={() => onToggleDraft(product._id, product.isDraft)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEditProduct(product)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => onDeleteProduct(product._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(ProductTable);
