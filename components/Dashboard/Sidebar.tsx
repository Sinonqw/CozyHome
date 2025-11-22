import React from "react";
import { LogOut } from "lucide-react";
import type { Session } from "next-auth";

interface NavItem {
  id: string;
  icon: React.ComponentType<{ className: string }>;
  label: string;
}

interface SidebarProps {
  session: Session | null | undefined;
  navItems: NavItem[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const Sidebar = ({
  session,
  navItems,
  activeTab,
  setActiveTab,
}: SidebarProps) => {
  return (
    <aside className="w-64 bg-[#261C1A] text-white shadow-xl flex flex-col fixed h-full">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-black text-yellow-500">Admin Panel</h1>
      </div>

      {/* Информация об Администраторе */}
      <div className="p-6 text-sm border-b border-gray-700">
        <p className="text-gray-400">Вы вошли как:</p>
        <p className="font-semibold text-lg">
          {session?.user?.name || session?.user?.email}
        </p>
        <p className="text-yellow-500 text-xs mt-1">Роль: Администратор</p>
      </div>

      {/* Навигация */}
      <nav className="grow p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                  w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#7C5840] text-white font-bold shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Футер/Выход */}
      <div className="p-4 border-t border-gray-700">
        <button
          className="w-full text-left flex items-center p-3 rounded-lg text-red-400 hover:bg-gray-700 transition-colors duration-200"
          onClick={() => alert("Функция выхода не реализована!")}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Выйти
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
