"use client";
import React from "react";
import ContactForm from "../sections/ContactForm";
import ContactInfoBlock from "@/components/ui/ContactInfoBlock";
import Desc from "@/components/ui/Desc";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBF0E6] text-[#261C1A] pt-16">
      
      <section className="text-center py-12 px-4 bg-white shadow-md">
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-[#7C5840] mb-3">
          Зв'яжіться з Нами
        </h1>
        <Desc className="text-xl text-[#261C1A] max-w-2xl mx-auto">
          Ми завжди раді відповісти на ваші запитання та допомогти створити
          затишок у вашому домі.
        </Desc>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfoBlock />

         
          <ContactForm />
        </div>

       
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#261C1A] border-b-2 border-[#7C5840] pb-2 mb-6 text-center">
            Як нас Знайти
          </h2>
          <div className="bg-gray-300 h-96 w-full rounded-xl overflow-hidden shadow-xl flex items-center justify-center text-gray-700 text-xl font-medium">
            Місцезнаходження на Карті (Placeholder)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
