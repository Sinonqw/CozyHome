import ProductList from "@/components/Products/ProductList";
import CartWrapper from "@/features/cart/CartWrapper";
import Hero from "@/components/Hero/Hero";
import FeatureList from "@/components/Features/FeatureList";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureList />
      <ProductList />
    </>
  );
}
