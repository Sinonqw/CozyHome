import React from "react";

interface LinkItem {
  name: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  target?: string;
}

interface FooterLinkGroupProps {
  title: string;
  links: LinkItem[];
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, links }) => {
  return (
    <div>
      <h4 className="uppercase font-bold text-sm tracking-wider mb-4 text-[#C19673]">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.name}>
              <a
                href={link.href}
                target={link.target}
                className="flex items-center text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                {Icon && <Icon className="w-4 h-4 mr-2 text-[#7C5840]" />}
                {link.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterLinkGroup;
