"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import CartBTN from "./CartBTN";
import DesktopMenu from "./DesktopMenu";
import { useMobileMenu } from "@/context/MobileMenuContext";
import MobileSidebar from "./MobileMenu";

export interface NavLink {
  text: string;
  link: string;
}

const NAV_LINKS: NavLink[] = [
  { text: "Магазин", link: "#shop" },
  { text: "Про нас", link: "/about" },
  { text: "Контакти", link: "/contacts" },
];

const Header = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu();

  return (
    <header
      className="
      bg-[#FBF0E6]               
      sticky top-0 z-50         
      shadow-md shadow-[#261C1A]/5 
      py-4 sm:py-5
      border-b border-[#E5C8AA]   
    "
    >
      <nav
        className="
        flex items-center 
        max-w-[1440px] mx-auto 
        justify-between 
        px-5 lg:px-8
      "
      >
        {/* Логотип */}
        <Link
          href={"/"}
          className="
          text-3xl font-serif 
          font-black text-[#7C5840] 
          hover:text-[#261C1A] transition-colors
        "
        >
          Cozy Home
        </Link>

        {/* Навігація та Кошик */}
        <div className="flex gap-8 items-center">
          {/* Навігаційні посилання  */}

          {!isMobileMenuOpen && <DesktopMenu NAV_LINKS={NAV_LINKS} />}

          <AnimatePresence>
            {isMobileMenuOpen && (
              <MobileSidebar NAV_LINKS={NAV_LINKS} key="mobile-sidebar" />
            )}
          </AnimatePresence>

          {/* Кнопка Кошика */}
          <CartBTN />

          <button
            className="md:hidden text-[#261C1A] p-2 hover:text-[#7C5840] transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
