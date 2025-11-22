// components/dashboard/content/UsersSection.tsx

import React from 'react';
import { Users, UserPlus, Search, ShieldCheck } from 'lucide-react';

const UsersSection: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-[#7C5840] mb-6 border-b pb-3">Управление Пользователями</h2>
      
      {/* Панель управления пользователями */}
      <div className="flex justify-between items-center mb-6 p-4 bg-[#FBF0E6] rounded-lg border border-[#E5C8AA]">
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Поиск по имени или Email..." 
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C5840]"
          />
        </div>
        <button className="bg-gray-700 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg flex items-center transition duration-200">
          <UserPlus className="w-5 h-5 mr-2" /> Добавить пользователя
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Заголовок таблицы */}
        <div className="bg-[#E5C8AA] text-[#261C1A] font-bold p-3 grid grid-cols-6 gap-4">
          <span>ID</span>
          <span>Имя</span>
          <span>Email</span>
          <span>Роль</span>
          <span>Заказов</span>
          <span>Действия</span>
        </div>
        
        {/* Строки пользователей */}
        <UserRow id={1} name="Анна Смирнова" email="anna@example.com" role="Клиент" orders={15} />
        <UserRow id={2} name="Дмитрий Петров" email="dmitry@admin.com" role="Админ" orders={3} isAdmin={true} />
        <UserRow id={3} name="Елена Кравцова" email="elena@example.com" role="Клиент" orders={0} />
      </div>
      
    </div>
  );
};

// Вспомогательный компонент для строки пользователя
const UserRow = ({ id, name, email, role, orders, isAdmin = false }) => (
  <div className="p-3 border-b text-gray-700 grid grid-cols-6 gap-4 items-center hover:bg-gray-50">
    <span className="text-sm text-gray-500">{id}</span>
    <span className="font-medium">{name}</span>
    <span>{email}</span>
    <span className={`text-sm font-semibold flex items-center ${isAdmin ? 'text-red-700' : 'text-gray-600'}`}>
        {isAdmin && <ShieldCheck className="w-4 h-4 mr-1" />}
        {role}
    </span>
    <span>{orders}</span>
    <div className="flex space-x-2">
      <button className="text-blue-600 hover:text-blue-800 text-sm">Редактировать</button>
      <button className="text-red-600 hover:text-red-800 text-sm">Удалить</button>
    </div>
  </div>
);

export default UsersSection;