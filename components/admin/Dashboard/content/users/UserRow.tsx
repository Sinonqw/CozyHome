import React from "react";
import { ShieldCheck } from "lucide-react";
import { IUser } from "@/types/users";

interface UserRowProps {
  user: IUser;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const isAdmin = user.role === "Admin";
    console.log(user)
  const displayRole = isAdmin ? "Адміністратор" : "Клієнт";

  const ordersCount = user.totalOrders || 0;

  return (
    <div className="p-3 border-b text-gray-700 grid grid-cols-5 gap-4 items-center hover:bg-gray-50 transition duration-150">
      <span className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
        #{user._id.slice(-6)}
      </span>
      <span className="font-medium">{user.name}</span>
      <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
        {user.email}
      </span>

      <span
        className={`text-sm font-semibold flex items-center ${
          isAdmin ? "text-red-700" : "text-gray-600"
        }`}
      >
        {isAdmin && <ShieldCheck className="w-4 h-4 mr-1 text-red-500" />}
        {displayRole}
      </span>

      <span>{ordersCount}</span>
    </div>
  );
};

export default UserRow;
