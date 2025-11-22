import React from "react";
import { Instagram, Mail, MapPin } from "lucide-react";
import FooterLinkGroup from "./FooterLinkGroup";
import FooterBranding from "./FooterBranding";

const Footer: React.FC = () => {
  const shopLinks = [
    { name: "Каталог", href: "#products" },
    { name: "Поширені питання", href: "/faq" },
    { name: "Повернення", href: "/returns" },
  ];

  const contactLinks = [
    { name: "info@cozyhome.com", href: "mailto:info@cozyhome.com", icon: Mail },
    { name: "м. Київ, пр. Миру, 14", href: "#", icon: MapPin },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: Instagram,
      target: "_blank",
    },
  ];

  return (
    <footer className="bg-[#261C1A] text-[#FBF0E6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-[#7C5840]/50 pb-8 mb-8">
          <FooterBranding />

          <FooterLinkGroup title="Магазин" links={shopLinks} />

          <FooterLinkGroup title="Зв'язок" links={contactLinks} />

          <FooterLinkGroup title="Соцмережі" links={socialLinks} />
        </div>

        {/* Копірайт */}
        <div className="text-center text-sm pt-4 opacity-50">
          &copy; {new Date().getFullYear()} Cozy Home. Усі права захищені
        </div>
      </div>
    </footer>
  );
};

export default Footer;
