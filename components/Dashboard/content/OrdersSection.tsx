// components/dashboard/content/OrdersSection.tsx

import React from 'react';
import { ShoppingCart, CheckCircle, Clock, XCircle } from 'lucide-react';

const OrdersSection: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-[#7C5840] mb-6 border-b pb-3">Управление Заказами</h2>
      
      {/* Статусы заказов (карточки) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-5 rounded-lg shadow border border-blue-200">
          <Clock className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-sm font-medium text-gray-500">В ожидании</p>
          <p className="text-2xl font-bold text-blue-800">25</p>
        </div>
        <div className="bg-yellow-50 p-5 rounded-lg shadow border border-yellow-200">
          <ShoppingCart className="w-6 h-6 text-yellow-600 mb-2" />
          <p className="text-sm font-medium text-gray-500">Обрабатываются</p>
          <p className="text-2xl font-bold text-yellow-800">12</p>
        </div>
        <div className="bg-green-50 p-5 rounded-lg shadow border border-green-200">
          <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-sm font-medium text-gray-500">Завершенные</p>
          <p className="text-2xl font-bold text-green-800">189</p>
        </div>
        <div className="bg-red-50 p-5 rounded-lg shadow border border-red-200">
          <XCircle className="w-6 h-6 text-red-600 mb-2" />
          <p className="text-sm font-medium text-gray-500">Отмененные</p>
          <p className="text-2xl font-bold text-red-800">4</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-[#261C1A] mb-4">Последние заказы</h3>
      
      {/* Список/Таблица последних заказов */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-[#E5C8AA] text-[#261C1A] font-bold p-3 grid grid-cols-5 gap-4">
          <span>ID</span>
          <span>Клиент</span>
          <span>Сумма</span>
          <span>Статус</span>
          <span>Дата</span>
        </div>
        <div className="p-3 border-b text-gray-700 grid grid-cols-5 gap-4 hover:bg-gray-50">
          <span>#1001</span>
          <span>Иванов И.</span>
          <span>12,500 ₽</span>
          <span className="text-blue-600 font-medium">В ожидании</span>
          <span>2025-11-17</span>
        </div>
        <div className="p-3 border-b text-gray-700 grid grid-cols-5 gap-4 hover:bg-gray-50">
          <span>#1000</span>
          <span>Петров А.</span>
          <span>5,800 ₽</span>
          <span className="text-green-600 font-medium">Завершен</span>
          <span>2025-11-17</span>
        </div>
        <div className="p-3 text-gray-700 grid grid-cols-5 gap-4 hover:bg-gray-50">
          <span>#999</span>
          <span>Сидоров В.</span>
          <span>2,200 ₽</span>
          <span className="text-yellow-600 font-medium">Обрабатывается</span>
          <span>2025-11-16</span>
        </div>
      </div>
      
      <p className="text-center mt-6 text-sm text-gray-500 cursor-pointer hover:text-[#7C5840]">
        Показать все 189 завершенных заказов →
      </p>
    </div>
  );
};

export default OrdersSection;