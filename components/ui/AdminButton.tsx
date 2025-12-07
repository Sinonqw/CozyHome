"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const AdminButton = ({ className = "" }) => {
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "Admin";

  if (!isAdmin) {
    return null;
  }

  return (
    <Link
      href="/admin/dashboard"
      className={`
        px-5 py-2.5 rounded-lg 
        bg-orange-600 hover:bg-orange-700 
        text-white font-semibold 
        shadow-lg shadow-orange-900/25
        transition-all duration-200 
        hover:shadow-xl hover:shadow-orange-900/30
        whitespace-nowrap 
        ${className}
      `}
      title="Перейти в панель администратора"
    >
      Адмін-панель
    </Link>
  );
};

export default AdminButton;