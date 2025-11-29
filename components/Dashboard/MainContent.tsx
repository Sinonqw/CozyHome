import React from "react";
import ProductsSection from "./content/products/ProductsSection";
import OrdersSection from "./content/orders/OrdersSection";
import AnalyticsSection from "./content/analytics/AnalyticsSection";
import UsersSection from "./content/UsersSection";

interface MainContentProps {
  activeTab: string;
}

const renderContent = (activeTab: string) => {
  switch (activeTab) {
    case "products":
      return <ProductsSection />;
    case "orders":
      return <OrdersSection />;
    case "analytics":
      return <AnalyticsSection />;
    case "users":
      return <UsersSection />;
    default:
      return (
        <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-500">
            Выберите раздел в меню слева.
          </h2>
        </div>
      );
  }
};

const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  return (
    <main className="flex-1 p-10 ml-64">
      <header className="mb-8 pb-4 border-b border-[#E5C8AA]">
        <h1 className="text-4xl font-black text-[#261C1A]">
          Административная Панель
        </h1>
        <p className="text-sm text-red-600 mt-2 font-semibold">
          ⚠️ Напоминание: Этот маршрут должен быть защищен на
          сервере/middleware. Клиентская проверка не гарантирует безопасность!
        </p>
      </header>

      {renderContent(activeTab)}
    </main>
  );
};

export default MainContent;
