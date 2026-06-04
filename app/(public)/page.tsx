import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import { FlashDeals, FeaturedProducts, NewArrivals, TrendingProducts } from "@/components/home/ProductSections";
import { StatsSection, TestimonialsSection, BrandsMarquee } from "@/components/home/Sections";
import PromoSection from "@/components/home/PromoSection";
import MapSection from "@/components/home/MapSection";
import { getCategories, getProducts } from "@/app/actions/product";

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <>
      <Hero />
      <Categories categories={categories} />
      <BrandsMarquee />
      <FeaturedProducts products={products} />
      <FlashDeals products={products} />
      <PromoSection />
      <NewArrivals products={products} />
      <StatsSection />
      <TrendingProducts products={products} />
      <TestimonialsSection />
      <MapSection />
    </>
  );
}
