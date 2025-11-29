import React from "react";
import OrderMetrics from "./OrderMetrics";
import OrderTable from "./OrderTable";
import useSWR from "swr";
import { IOrder } from "@/types/orders";
import fetcher from "@/lib/fetcher";

const OrdersSection: React.FC = () => {
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<IOrder[]>("/api/orders", fetcher);

  const orderData: IOrder[] = orders || [];
  const completedOrdersCount = orderData.filter(
    (order) => order.status === "completed"
  ).length;
  const errorMessage: string | null = error ? (error as Error).message : null;

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-[#7C5840] mb-6 border-b pb-3">
        Управление Заказами
      </h2>

      {/* Статусы заказов (карточки) */}
      <OrderMetrics orders={orderData} />

      <h3 className="text-xl font-semibold text-[#261C1A] mb-4">
        Последние заказы
      </h3>

      {/* Список/Таблица последних заказов */}
      <OrderTable
        error={errorMessage}
        isLoading={isLoading}
        orders={orderData}
      />

      <p className="text-center mt-6 text-sm text-gray-500 cursor-pointer hover:text-[#7C5840]">
        Показать все {completedOrdersCount} завершенных заказов →
      </p>
    </div>
  );
};

export default OrdersSection;
