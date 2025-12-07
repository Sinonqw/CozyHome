"use client";
import { ReactNode } from "react";
import SWRProvider from "@/components/SWRProvider";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/client/sections/Header/Header";
import Footer from "@/components/client/sections/Footer/Footer";
import { usePathname } from "next/navigation";
import CartWrapper from "@/components/client/cart/CartWrapper";

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <SWRProvider>
      <SessionProvider>
        <Header />

        <main>{children}</main>
        <CartWrapper />

        {!isAdminRoute && <Footer />}
      </SessionProvider>
    </SWRProvider>
  );
}
