import React from "react";
import { IOrder, OrderStatus } from "@/types/orders";
import StatusUpdate from "./StatusUpdate";

interface OrderTableProps {
  orders: IOrder[];
  isLoading: boolean;
  error: string | null;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <p>Загрузка заказов...</p>;
  }
  if (error) {
    return <p className="text-red-500">Ошибка загрузки заказов: {error}</p>;
  }
  if (orders.length === 0) {
    return <p>Заказы не найдены.</p>;
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-[#E5C8AA] text-[#261C1A] font-bold p-3 grid grid-cols-5 gap-4">
        <span>ID</span>
        <span>Клиент</span>
        <span>Сумма</span>
        <span>Дата</span>
        <span>Текущий статус</span>
      </div>

      {orders.map((order) => {
        return (
          <div
            key={order._id}
            className="p-3 border-b text-gray-700 grid grid-cols-5 gap-4 hover:bg-gray-50"
          >
            <span>#{order._id.slice(-4)}</span>
            <span>{order.clientName}</span>
            <span>{order.totalAmount.toFixed(2)} грн</span>

            <span>{new Date(order.createdAt).toLocaleDateString()}</span>

            <StatusUpdate currentStatus={order.status} orderId={order._id} />
          </div>
        );
      })}
    </div>
  );
};

export default OrderTable;
