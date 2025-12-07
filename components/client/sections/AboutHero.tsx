"use client";
import React from "react";
import Desc from "@/components/ui/Desc";

const placeholderImageUrl =
  "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const AboutHero: React.FC = () => {
  return (
    <header className="relative h-[40vh] md:h-[60vh] overflow-hidden">
      <img
        src={placeholderImageUrl}
        alt="Затишна кімната з ароматами"
        className="absolute inset-0 w-full h-full object-bottom opacity-70"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://placehold.co/1200x600/7C5840/FFFFFF?text=Ваш+Дім.+Ваш+Аромат.";
        }}
      />

      <div className="absolute inset-0 bg-[#261C1A]/40 flex items-center justify-center">
        <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#7C5840] mb-4 tracking-tight">
            Ваш Дім. Ваш Аромат.
          </h1>
          <Desc className="font-medium">Мистецтво Затишку та Комфорту</Desc>
        </div>
      </div>
    </header>
  );
};

export default AboutHero;
