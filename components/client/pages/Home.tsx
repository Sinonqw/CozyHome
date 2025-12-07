import ProductList from "@/components/client/sections/ProductList";
import Hero from "@/components/client/sections/Hero";
import FeatureList from "@/components/client/sections/FeatureList";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureList />
      <ProductList />
    </>
  );
}
