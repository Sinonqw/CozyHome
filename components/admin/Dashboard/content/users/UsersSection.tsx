"use client";
import React, { useState, useMemo } from 'react';
import { Users, UserPlus, Search } from 'lucide-react';
import useSWR from 'swr';
import UserTable from './UserTable';
import { IUser } from '@/types/users';

const UsersSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State для пошукового запиту
  
  const { data: users, error, isLoading } = useSWR<IUser[]>('/api/users');

  const errorMessage: string | null = error ? (error as Error).message : null;
  const userData: IUser[] = users || [];

 
  const filteredUsers = useMemo(() => {
    if (!searchQuery) {
      return userData;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    return userData.filter((user) => {
      return (
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }, [userData, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const totalUsers = userData.length;

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-[#7C5840] mb-6 border-b pb-3 flex items-center">
        <Users className="w-8 h-8 mr-3 text-[#7C5840]" />
        Керування Користувачами
      </h2>
      
      {/* Панель керування користувачами */}
      <div className="flex justify-between items-center mb-6 p-4 bg-[#FBF0E6] rounded-lg border border-[#E5C8AA]">
        <div className="flex items-center space-x-4 w-full md:w-1/2">
          <Search className="w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Пошук за іменем або Email..."
            className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C5840]"
              value={searchQuery} 
              onChange={handleSearchChange} 
          />
        </div>
        <button className="bg-[#261C1A] hover:bg-[#4a3530] text-white font-medium py-2 px-4 rounded-lg flex items-center transition duration-200 shadow-md">
          <UserPlus className="w-5 h-5 mr-2" /> Додати користувача
        </button>
      </div>

      {/* Таблиця користувачів */}
      <UserTable 
        users={filteredUsers} 
        isLoading={isLoading}
        error={errorMessage}
      />
      
      {/* Додаткова інформація */}
      {!isLoading && !errorMessage && (
        <p className="text-center mt-6 text-sm text-gray-500">
          Усього зареєстровано: {totalUsers} користувачів. 
          {searchQuery && ` (Показано: ${filteredUsers.length})`} 
        </p>
      )}
      
    </div>
  );
};

export default UsersSection;