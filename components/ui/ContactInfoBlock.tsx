import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactInfoItem from "@/components/ui/ContactInfoItem";

const ContactInfoBlock: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#261C1A] border-b-2 border-[#7C5840] pb-2 mb-6">
        Наші Контакти
      </h2>

      <div className="space-y-6">
        <ContactInfoItem
          icon={<Mail className="w-6 h-6" />}
          title="Електронна Пошта"
          value="hello@cozyaroma.com"
        />
        <ContactInfoItem
          icon={<Phone className="w-6 h-6" />}
          title="Телефон"
          value="+380 (99) 123-4567"
        />
        <ContactInfoItem
          icon={<MapPin className="w-6 h-6" />}
          title="Адреса Магазину"
          value="вул. Затишку, 5, Київ, Україна"
        />
        <ContactInfoItem
          icon={<Clock className="w-6 h-6" />}
          title="Години Роботи"
          value="Пн-Пт: 10:00 – 19:00, Сб: 11:00 – 17:00"
        />
      </div>
    </div>
  );
};

export default ContactInfoBlock;
