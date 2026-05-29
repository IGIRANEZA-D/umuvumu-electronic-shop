import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import { FlashDeals, FeaturedProducts, NewArrivals, TrendingProducts } from "@/components/home/ProductSections";
import { StatsSection, TestimonialsSection, BrandsMarquee } from "@/components/home/Sections";
import PromoSection from "@/components/home/PromoSection";
import MapSection from "@/components/home/MapSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <BrandsMarquee />
      <FeaturedProducts />
      <FlashDeals />
      <PromoSection />
      <NewArrivals />
      <StatsSection />
      <TrendingProducts />
      <TestimonialsSection />
      <MapSection />
    </>
  );
}
