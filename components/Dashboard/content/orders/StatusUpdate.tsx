"use client";
import React, { useState } from "react";
import { mutate } from "swr";
import { api } from "@/lib/fetcher";
import { OrderStatus } from "@/types/orders";

const statusOptions: OrderStatus[] = [
  "pending",
  "processing",
  "completed",
  "canceled",
];

const getStatusClasses = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return {
        text: "В ожидании",
        color: "bg-blue-100 text-blue-800 border-blue-300",
      };
    case "processing":
      return {
        text: "Обрабатывается",
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
      };
    case "completed":
      return {
        text: "Завершен",
        color: "bg-green-100 text-green-800 border-green-300",
      };
    case "canceled":
      return {
        text: "Отменен",
        color: "bg-red-100 text-red-800 border-red-300",
      };
    default:
      return {
        text: "Неизвестно",
        color: "bg-gray-100 text-gray-500 border-gray-300",
      };
  }
};

interface StatusUpdateProps {
  orderId: string;
  currentStatus: OrderStatus;
}

const StatusUpdate: React.FC<StatusUpdateProps> = ({
  orderId,
  currentStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (newStatus === currentStatus) return;

    setIsLoading(true);
    setSelectedStatus(newStatus);

    try {
      await api.patch("/api/orders", {
        id: orderId,
        status: newStatus,
      });

      mutate("/api/orders");
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);

      setSelectedStatus(currentStatus);
    } finally {
      setIsLoading(false);
    }
  };

  const currentStatusClasses = getStatusClasses(currentStatus);

  return (
    <div className="relative inline-block w-full">
      <select
        value={selectedStatus}
        onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
        disabled={isLoading}
        className={`
          appearance-none 
          block w-full py-2 px-3 pr-8 
          text-sm font-medium 
          rounded-lg border-2 
          cursor-pointer transition duration-150 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-opacity-50 
          ${currentStatusClasses.color}
          ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        {statusOptions.map((status) => {
          const info = getStatusClasses(status);
          return (
            <option
              key={status}
              value={status}
              className={`bg-white text-black`}
            >
              {info.text}
            </option>
          );
        })}
      </select>
      {/* Стрелка для селекта */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
          <svg
            className="animate-spin h-5 w-5 text-[#7C5840]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default StatusUpdate;
