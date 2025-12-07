import React from "react";
import FeatureCard from "../../ui/FeatureCard";
import { Leaf, HandMetal, Package, Recycle } from "lucide-react";
import Desc from "@/components/ui/Desc";

const features = [
  {
    icon: Leaf,
    title: "Натуральні Склади",
    description:
      "Ми використовуємо лише органічні інгредієнти, олії та воски, безпечні для вас і вашого дому.",
  },
  {
    icon: HandMetal,
    title: "Ручна Робота",
    description:
      "Кожен предмет колекції створений майстрами з особливою увагою до деталей та унікальності.",
  },
  {
    icon: Recycle,
    title: "Екологічність",
    description:
      "Наша упаковка підлягає вторинній переробці. Ми дбаємо про природу так само, як і про якість.",
  },
  {
    icon: Package,
    title: "Безпечна Доставка",
    description:
      "Ретельне пакування гарантує, що ваше замовлення прибуде в ідеальному стані, у будь-яку точку.",
  },
];

const FeatureList: React.FC = () => {
  return (
    <section className="bg-[#E5C8AA]/10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#7C5840] tracking-wider uppercase mb-2">
            Довіра та Якість
          </h2>
          <Desc className="text-4xl md:text-5xl font-serif font-extrabold text-[#261C1A]">
            Наші Принципи
          </Desc>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant="secondary"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureList;
