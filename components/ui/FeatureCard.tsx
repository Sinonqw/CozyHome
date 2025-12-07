import React from "react";
import { LucideIcon } from "lucide-react";
import Desc from "@/components/ui/Desc";

type FeatureCardVariant = "primary" | "secondary";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColorClass?: string;
  variant: FeatureCardVariant;
}

const getCardClasses = (variant: FeatureCardVariant) => {
  switch (variant) {
    case "primary":
      return "bg-white shadow-lg hover:shadow-xl hover:bg-[#FBF0E6] border border-gray-100";
    case "secondary":
      return "bg-transparent transition-all duration-300 ease-in-out hover:bg-[#E5C8AA]/30 border-none";
    default:
      return "bg-white";
  }
};

const getIconContainerClasses = (
  variant: FeatureCardVariant,
  iconColorClass?: string
) => {
  switch (variant) {
    case "primary":
      return `mb-4 p-3 rounded-full text-[#FBF0E6] shadow-lg shadow-black/10 transition-colors duration-300 ${iconColorClass}`;
    case "secondary":
      return "mb-4 p-3 rounded-full bg-[#7C5840] text-[#FBF0E6] shadow-lg shadow-[#7C5840]/30";
    default:
      return "mb-4";
  }
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  iconColorClass,
  variant,
}) => {
  const cardClasses = getCardClasses(variant);
  const iconContainerClasses = getIconContainerClasses(variant, iconColorClass);

  const iconSize = "w-6 h-6";

  const descClasses =
    variant === "secondary"
      ? "text-sm text-center text-[#261C1A] opacity-80"
      : "text-sm text-center";

  return (
    <div
      className={`flex flex-col items-center text-center p-6 rounded-xl ${cardClasses}`}
    >
      <div className={iconContainerClasses}>
        <Icon className={iconSize} />
      </div>

      <h3 className="text-xl font-bold font-sans mb-2 text-[#261C1A]">
        {title}
      </h3>

      <Desc className={descClasses}>{description}</Desc>
    </div>
  );
};

export default FeatureCard;
