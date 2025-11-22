"use client";
import { ReactNode } from "react";
import { MobileMenuProvider } from "@/context/MobileMenuContext";
import { CartProvider } from "@/context/CartContext";
import SWRProvider from "@/components/SWRProvider";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <SWRProvider>
      <SessionProvider>
        <CartProvider>
          <MobileMenuProvider>
            <Header />

            <main>{children}</main>

            {!isAdminRoute && <Footer />}
          </MobileMenuProvider>
        </CartProvider>
      </SessionProvider>
    </SWRProvider>
  );
}
