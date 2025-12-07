"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Box, Package, Users, TrendingUp } from "lucide-react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useRouter } from "next/navigation";

const navItems = [
  { id: "products", icon: Package, label: "Товари та асортимент" },
  { id: "orders", icon: Box, label: "Замовлення" },
  { id: "analytics", icon: TrendingUp, label: "Аналітика" },
  { id: "users", icon: Users, label: "Користувачі" },
];

const AdminDashboardPage = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("products");
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated" || session?.user?.role !== "Admin") {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Загрузка...</div>;
  }
  return (
    <div className="min-h-screen bg-[#FBF0E6] flex">
      <Sidebar
        session={session}
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <MainContent activeTab={activeTab} />
    </div>
  );
};

export default AdminDashboardPage;
