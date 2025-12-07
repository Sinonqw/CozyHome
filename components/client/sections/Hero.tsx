import Image from "next/image";
import Desc from "@/components/ui/Desc";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-[600px] md:h-[700px] bg-[#FBF0E6] overflow-hidden shadow-inner shadow-[#261C1A]/5">
      <div className="container mx-auto px-6 h-full flex items-center justify-start relative z-10">
        <div className="max-w-xl text-[#261C1A] py-12">
          <h3 className="text-lg md:text-xl font-medium uppercase tracking-widest mb-3 text-[#7C5840]">
            Ваш Дім. Ваш Аромат.
          </h3>

          <h1 className="text-5xl md:text-7xl font-serif font-extrabold leading-tight mb-6">
            Мистецтво Затишку та Комфорту
          </h1>

          <Desc className="mb-8 max-w-md">
            Відкрийте для себе колекції, створені для тихих моментів та
            справжнього розслаблення. Натуральні матеріали та преміальна якість.
          </Desc>

          <Link
            href={"/shop"}
            className="bg-[#7C5840] text-[#FBF0E6] shadow-lg shadow-[#7C5840]/50 hover:bg-[#261C1A] hover:shadow-xl hover:shadow-[#261C1A]/50 active:translate-y-0.5 active:shadow-md font-bold py-3 px-8 rounded-xl uppercase tracking-wider transition-all duration-300 ease-in-out"
          >
            Дивитись каталог
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Image
          alt="Велике зображення інтер'єру із затишним пледом та свічкою"
          src={"/hero.avif"}
          layout="fill"
          objectFit="cover"
          quality={85}
          className="md:opacity-100 md:w-1/2 md:left-auto md:right-0 md:object-right"
        />

        {/* Градієнт  */}
        <div className="absolute inset-0 bg-linear-to-r from-[#FBF0E6] via-[#FBF0E6]/90 to-transparent w-full md:w-3/5"></div>
      </div>
    </section>
  );
};

export default Hero;
