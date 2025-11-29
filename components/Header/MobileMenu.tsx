"use client";
import Link from "next/link";
import { motion, steps } from "framer-motion";
import { X } from "lucide-react";
import { useMobileMenuStore } from "@/store/mobileMenuStore";
import AdminButton from "./AdminButton";

import { NavLink } from "./Header";
import AuthButtons from "./AuthButtons";

interface MobileMenuProps {
  NAV_LINKS: NavLink[];
}

const MobileSidebar = ({ NAV_LINKS }: MobileMenuProps) => {
  const isMobileMenuOpen = useMobileMenuStore(
    (state) => state.isMobileMenuOpen
  );
  const setIsMobileMenuOpen = useMobileMenuStore(
    (state) => state.setIsMobileMenuOpen
  );

  const sidebarVariants = {
    closed: { x: "100%", transition: { duration: 0.3 } },
    open: { x: "0%", transition: { duration: 0.3 } },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      pointerEvents: "none" as const,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      pointerEvents: "auto" as const,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* 1. Оверлей */}
      <motion.div
        variants={overlayVariants}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        onClick={() => setIsMobileMenuOpen(false)}
        className="fixed inset-0 z-40 bg-[#261C1A]/70 backdrop-blur-sm"
      />

      {/* 2. Само Мобільне Меню (Сайдбар) */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        exit={"closed"}
        className="
          fixed right-0 top-0 bottom-0 
          w-full max-w-xs          
          bg-[#FBF0E6] z-50         
          shadow-2xl shadow-[#261C1A]/30
          p-6 flex flex-col
        "
      >
        {/* Кнопка Закриття */}
        <div className="flex justify-end mb-10">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#261C1A] hover:text-[#7C5840] transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Навігаційні Посилання */}
        <ul className="flex flex-col space-y-6">
          {NAV_LINKS.map((item) => (
            <li key={item.text} onClick={() => setIsMobileMenuOpen(false)}>
              <Link
                href={item.link}
                className="
                  text-2xl font-serif font-bold 
                  text-[#261C1A] 
                  hover:text-[#7C5840] 
                  transition-colors block
                "
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
        <AdminButton className="mt-6" />
        <AuthButtons className="mt-4" />

        {/* Додатковий елемент */}
        <div className="mt-auto pt-6 border-t border-[#E5C8AA]">
          <Link
            href="/login"
            className="
                    text-base font-semibold text-[#7C5840] 
                    hover:text-[#261C1A] transition-colors
                "
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Увійти в акаунт
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default MobileSidebar;
