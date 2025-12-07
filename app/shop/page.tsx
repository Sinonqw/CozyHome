import React from 'react';
import ProductList from '@/components/client/sections/ProductList';

const ShopPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Используем ProductList без пропса limit, чтобы отобразить ВСЕ товары. 
      */}
      <ProductList 
        title="Весь Каталог Товарів"
        description="Перегляньте повну колекцію ароматів, текстилю та декору для вашого дому."
        limit={null} // null или undefined означает 'без лимита'
      />
    </div>
  );
};

export default ShopPage;