import { create } from "zustand";

interface MobileMenuState {
  isMobileMenuOpen: boolean;

  setIsMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
}

export const useMobileMenuStore = create<MobileMenuState>((set) => ({
  isMobileMenuOpen: false,

  setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),

  toggleMobileMenu: () =>
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
    })),
}));
