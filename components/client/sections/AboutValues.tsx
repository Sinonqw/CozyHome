import React from "react";
import { Leaf, Heart, Home, LucideIcon } from "lucide-react";

import FeatureCard from "@/components/ui/FeatureCard";

interface ValueItem {
  icon: LucideIcon;
  iconColorClass: string;
  title: string;
  description: string;
}

const valuesData: ValueItem[] = [
  {
    icon: Leaf,
    iconColorClass: "bg-green-700",
    title: "Натуральні Матеріали",
    description:
      "Ми використовуємо лише екологічно чисту сировину, щоб забезпечити безпеку та гіпоалергенність. Ніякої хімії, лише природна сила.",
  },
  {
    icon: Heart,
    iconColorClass: "bg-red-500",
    title: "Ручна Робота та Преміум Якість",
    description:
      "Кожен товар проходить ретельний контроль. Це мистецтво, створене з любов'ю та увагою до найменших деталей, що гарантує його довговічність.",
  },
  {
    icon: Home,
    iconColorClass: "bg-[#7C5840]",
    title: "Створення Атмосфери",
    description:
      "Наші продукти розроблені, щоб перетворити простір, наповнюючи його елегантними ароматами та відчуттям глибокого, безтурботного спокою.",
  },
];

const AboutValues: React.FC = () => {
  return (
    <section className="bg-[#FBF0E6] py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-center mb-16 text-[#7C5840]">
          Чому обирають нас? Три Стовпи Нашої Якості
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {valuesData.map((item) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              iconColorClass={item.iconColorClass}
              variant="primary"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
