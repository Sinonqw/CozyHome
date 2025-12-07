"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import Desc from "@/components/ui/Desc";
import useSWR from "swr";

interface Product {
  _id: string;
  name: string;
  description: string;
  priceUSD: number;
  imageUrl: string;
  isDraft: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface ProductListProps {
  limit?: number | null;
  title?: string;
  description?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  limit = 4,
  title,
  description,
}) => {
  const { data, error, isLoading } = useSWR<Product[]>("/api/products");

  let productsToDisplay = data?.filter((product) => !product.isDraft) || [];

  if (limit && productsToDisplay.length > limit) {
    let shuffled = [...productsToDisplay]
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);
    productsToDisplay = shuffled;
  }

  if (error) {
    console.error("Помилка завантаження товарів:", error);
    return (
      <section className="text-center py-16 text-[#261C1A]">
        <p className="text-xl text-red-600">
          На жаль, не вдалося завантажити товари. Перевірте API.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="text-center py-16 text-[#261C1A]">
        <p className="text-xl text-[#7C5840]">Завантаження товарів...</p>
      </section>
    );
  }

  return (
    <section className="bg-[#FBF0E6] text-[#261C1A] py-16 px-4 sm:px-6 lg:px-8">
      {(title || description) && (
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-[#261C1A] tracking-tight mb-3">
            {title}
          </h2>
          {description && <Desc>{description}</Desc>}
        </div>
      )}

      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto"
      >
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((item) => (
            <ProductCard
              key={item._id}
              itemVariants={itemVariants}
              cost={item.priceUSD}
              desc={item.description}
              title={item.name}
              id={item._id}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-lg opacity-70">
            {limit
              ? "Товарів не знайдено."
              : "Товари ще не додано до каталогу."}
          </p>
        )}
      </motion.ul>
    </section>
  );
};

export default ProductList;
