"use client";
import React, { useState, useMemo } from "react";
import { ListFilter, X } from "lucide-react";
import OrderMetrics from "./OrderMetrics";
import OrderTable from "./OrderTable";
import useSWR from "swr";
import { IOrder } from "@/types/orders";
import fetcher from "@/lib/fetcher";

type OrderStatus = "all" | "pending" | "completed" | "canceled" | "processing";

const STATUS_DISPLAY_NAMES: Record<OrderStatus, string> = {
  all: "Все статусы",
  pending: "В ожидании",
  completed: "Завершен",
  canceled: "Отменен",
  processing: "В обработке",
};

const OrdersSection: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<OrderStatus>("all");

  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<IOrder[]>("/api/orders", fetcher);

  const orderData: IOrder[] = orders || [];
  const errorMessage: string | null = error ? (error as Error).message : null;

  const filteredOrders = useMemo(() => {
    if (filterStatus === "all") {
      return orderData;
    }

    return orderData.filter((order) => order.status === filterStatus);
  }, [orderData, filterStatus]);

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-[#7C5840] mb-6 border-b pb-3">
        Керування Замовленнями
      </h2>

      <OrderMetrics orders={orderData} />

      <div className="flex justify-between items-center mb-6 p-4 bg-[#FBF0E6] rounded-lg border border-[#E5C8AA]">
        <div className="flex items-center space-x-4">
          <ListFilter className="w-5 h-5 text-gray-500" />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as OrderStatus)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C5840] appearance-none cursor-pointer bg-white"
          >
            {Object.entries(STATUS_DISPLAY_NAMES).map(([status, display]) => (
              <option key={status} value={status}>
                {display}
              </option>
            ))}
          </select>

          {filterStatus !== "all" && (
            <button
              onClick={() => setFilterStatus("all")}
              className="flex items-center text-sm text-red-600 hover:text-red-800 transition duration-200"
              title="Скинути фільтр"
            >
              Скинути <X className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-[#261C1A] mb-4">
        {filterStatus === "all"
          ? "Всі замовлення"
          : STATUS_DISPLAY_NAMES[filterStatus]}{" "}
        ({filteredOrders.length})
      </h3>

      <OrderTable
        error={errorMessage}
        isLoading={isLoading}
        orders={filteredOrders}
      />
    </div>
  );
};

export default OrdersSection;
