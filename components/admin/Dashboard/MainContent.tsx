import React from "react";
import ProductsSection from "./content/products/ProductsSection";
import OrdersSection from "./content/orders/OrdersSection";
import AnalyticsSection from "./content/analytics/AnalyticsSection";
import UsersSection from "./content/users/UsersSection";

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
           Виберіть розділ у меню зліва
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
          Адміністративна панель
        </h1>
      </header>

      {renderContent(activeTab)}
    </main>
  );
};

export default MainContent;
