import { ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
}

const CTAButton = ({ children, onClick, disabled = false }: CTAButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 font-bold rounded-lg transition duration-300 
        ${
          disabled
            ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
            : "bg-[#7C5840] text-[#FBF0E6] hover:bg-[#261C1A]" 
        }`}
    >
      {children}
    </button>
  );
};

export default CTAButton;
