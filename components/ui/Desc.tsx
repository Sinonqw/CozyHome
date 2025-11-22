import React from "react";

interface DescProps {
  children: React.ReactNode;
  className?: string;
}

const Desc = ({ children, className = "" }: DescProps) => {
  const baseClasses = "text-lg text-[#261C1A] opacity-80 font-light";

  return <p className={`${baseClasses} ${className}`}>{children}</p>;
};

export default Desc;
