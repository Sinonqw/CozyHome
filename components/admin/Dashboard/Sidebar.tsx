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
    <aside className="w-64 bg-[#261C1A] text-white shadow-2xl flex flex-col fixed h-full z-30 transition-all duration-300">
      {/* Заголовок Панелі */}
      <div className="p-6 border-b border-gray-700/50">
        <h1 className="text-2xl font-black text-amber-400 tracking-wider">
          Адмін Панель
        </h1>
      </div>

      {/* Інформація про Адміністратора */}
      <div className="p-6 text-sm border-b border-gray-700/50">
        <p className="text-gray-400 mb-1">Ви увійшли як:</p>
        <p
          className="font-semibold text-lg truncate"
          title={session?.user?.email ?? undefined}
        >
          {session?.user?.name || session?.user?.email}
        </p>
        <p className="text-amber-400 text-xs mt-1 font-medium">
          Роль: Адміністратор
        </p>
      </div>

      {/* Навігація */}
      <nav className="grow p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                  w-full text-left flex items-center p-3 rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-[#7C5840] text-white font-bold shadow-lg shadow-[#7C5840]/30"
                      : "text-gray-300 hover:bg-[#332927] hover:text-white"
                  }
                `}
            >
              <item.icon
                className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-amber-400"
                }`}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Футер */}
      <div className="p-4 border-t border-gray-700/50">
        <button
          className="w-full text-left flex items-center p-3 rounded-xl text-red-400 hover:bg-gray-700/50 transition-colors duration-200 font-semibold"
          onClick={() => console.log("Спроба виходу...")}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Вийти
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
