"use client";
import React from "react";
import Link from "next/link";

const AboutCTA: React.FC = () => {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-semibold text-[#261C1A] mb-4">
        Готові розпочати подорож до затишку?
      </h2>
      <p className="text-xl mb-8 text-gray-700">
        Відкрийте для себе наші колекції та знайдіть свій ідеальний аромат.
      </p>

      <Link href={"/shop"}
        className="px-8 py-3 bg-[#7C5840] text-white font-bold rounded-full shadow-lg hover:bg-[#A0886F] transform transition duration-300 hover:scale-[1.03]"
        
      >
        Перейти до Каталогу
      </Link>
    </section>
  );
};

export default AboutCTA;
