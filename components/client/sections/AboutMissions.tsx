import React from "react";
import Desc from "@/components/ui/Desc";

const AboutMission: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 border-b-2 border-[#7C5840] pb-2 text-[#7C5840]">
        Наша Історія та Філософія
      </h2>
      <Desc className="font-medium leading-relaxed mb-6">
        Наш магазин — це не просто місце для покупок, це простір, де
        народжується справжній затишок. Ми віримо, що гармонія починається з
        дому, а найпростіший і найглибший спосіб її досягти — через відчуття,
        зокрема, через аромат та комфорт дотику.
      </Desc>
      <Desc className="font-medium leading-relaxed italic border-l-4 border-[#7C5840] pl-4">
        Наша місія — надати вам колекції, створені для тихих моментів, глибокого
        відновлення та справжнього розслаблення. Кожен продукт — від натуральних
        матеріалів до преміальної якості — покликаний наповнити ваш простір
        теплом і спокоєм.
      </Desc>
    </section>
  );
};

export default AboutMission;
