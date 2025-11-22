import Link from "next/link";
import type { NavLink } from "./Header";
import AuthButtons from "./AuthButtons";
import AdminButton from "./AdminButton";

interface DesktopMenuProps {
  NAV_LINKS: NavLink[];
}

const DesktopMenu = ({ NAV_LINKS }: DesktopMenuProps) => {
  return (
   <div className="hidden md:flex gap-4 items-center">
     <ul className="hidden md:flex gap-6 lg:gap-8">
       {NAV_LINKS.map((item) => (
         <li key={item.text}>
           <Link
             href={item.link}
             className="
                     text-[#261C1A] font-semibold 
                     text-base 
                     tracking-wide
                     hover:text-[#7C5840] transition-colors
                     relative 
                     group
                   "
           >
             {item.text}
    
             <span
               className="
                     absolute bottom-[-5px] left-0 
                     w-0 h-0.5 
                     bg-[#7C5840] 
                     transition-all duration-300 
                     group-hover:w-full
                   "
             />
           </Link>
         </li>
       ))}
     </ul>
     <div className="flex gap-2">
      <AdminButton className="ml-4 md:ml-6"/>
      <AuthButtons/>
     </div>
   </div>
  );
};

export default DesktopMenu;
