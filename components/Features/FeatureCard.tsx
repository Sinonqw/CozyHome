// components/FeatureCard.tsx (ПРИКЛАД для перекладу)

import React from "react";
import { Icon as LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: typeof LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 transition-all duration-300 ease-in-out hover:bg-[#E5C8AA]/30 rounded-xl">
      {/* Іконка */}
      <div className="mb-4 p-3 rounded-full bg-[#7C5840] text-[#FBF0E6] shadow-lg shadow-[#7C5840]/30">
        <Icon className="w-6 h-6" iconNode={[]} />
      </div>

      {/* Заголовок */}
      <h3 className="text-xl font-bold font-sans mb-2 text-[#261C1A]">
        {title}
      </h3>

      {/* Опис */}
      <p className="text-sm text-[#261C1A] opacity-80">{description}</p>
    </div>
  );
};

export default FeatureCard;
