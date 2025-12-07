// OrderMetrics.tsx

import React from "react";
import { ShoppingCart, CheckCircle, Clock, XCircle } from "lucide-react";
import { IOrder, OrderStatus } from "@/types/orders";

interface OrderMetricsProps {
  orders: IOrder[];
}

const OrderMetrics: React.FC<OrderMetricsProps> = ({ orders }) => {
  const countByStatus = (status: OrderStatus) => {
    return orders.filter((order) => order.status === status).length;
  };

  const pendingCount = countByStatus("pending");
  const processingCount = countByStatus("processing");
  const completedCount = countByStatus("completed");
  const canceledCount = countByStatus("canceled");

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* 1. В ожидании (pending) */}
      <div className="bg-blue-50 p-5 rounded-lg shadow border border-blue-200">
        <Clock className="w-6 h-6 text-blue-600 mb-2" />
        <p className="text-sm font-medium text-gray-500">В ожидании</p>
        <p className="text-2xl font-bold text-blue-800">{pendingCount}</p>{" "}
        {/* 👈 Динамическое значение */}
      </div>

      {/* 2. Обрабатываются (processing) */}
      <div className="bg-yellow-50 p-5 rounded-lg shadow border border-yellow-200">
        <ShoppingCart className="w-6 h-6 text-yellow-600 mb-2" />
        <p className="text-sm font-medium text-gray-500">Обрабатываются</p>
        <p className="text-2xl font-bold text-yellow-800">
          {processingCount}
        </p>{" "}
        {/* 👈 Динамическое значение */}
      </div>

      {/* 3. Завершенные (completed) */}
      <div className="bg-green-50 p-5 rounded-lg shadow border border-green-200">
        <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
        <p className="text-sm font-medium text-gray-500">Завершенные</p>
        <p className="text-2xl font-bold text-green-800">
          {completedCount}
        </p>{" "}
        {/* 👈 Динамическое значение */}
      </div>

      {/* 4. Отмененные (canceled) */}
      <div className="bg-red-50 p-5 rounded-lg shadow border border-red-200">
        <XCircle className="w-6 h-6 text-red-600 mb-2" />
        <p className="text-sm font-medium text-gray-500">Отмененные</p>
        <p className="text-2xl font-bold text-red-800">{canceledCount}</p>{" "}
        {/* 👈 Динамическое значение */}
      </div>
    </div>
  );
};

export default OrderMetrics;
