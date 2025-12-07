import React from "react";
import UserRow from "./UserRow";
import { IUser } from "@/types/users";

interface UserTableProps {
  users: IUser[];
  isLoading: boolean;
  error: string | null;
}

const UserTable: React.FC<UserTableProps> = ({ users, isLoading, error }) => {
  if (isLoading) {
    return (
      <p className="p-6 text-center text-gray-500">
        Завантаження користувачів...
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-6 text-center text-red-500 font-semibold">
        Помилка доступу: {error}
      </p>
    );
  }

  if (users.length === 0) {
    return (
      <p className="p-6 text-center text-gray-500">Користувачів не знайдено.</p>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Заголовок таблиці */}
      <div className="bg-[#E5C8AA] text-[#261C1A] font-bold p-3 grid grid-cols-5 gap-4">
        <span>ID (ост. 6)</span>
        <span>Ім'я</span>
        <span>Email</span>
        <span>Роль</span>
        <span>Замовлень</span>
      </div>

      {users.map((user) => (
        <UserRow key={user._id} user={user} />
      ))}
    </div>
  );
};

export default UserTable;
