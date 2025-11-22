"use client"
import { useContext, createContext, useState } from "react";

const MobileMenuContext = createContext<{
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const MobileMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <MobileMenuContext.Provider
      value={{ isMobileMenuOpen, setIsMobileMenuOpen }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error("useMobileMenu must be used within a MobileMenuProvider");
  }
  return context;
};
