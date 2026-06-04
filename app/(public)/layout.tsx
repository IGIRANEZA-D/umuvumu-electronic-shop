import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchModal from "@/components/layout/SearchModal";
import { WhatsAppFloat, MobileBottomNav } from "@/components/layout/FloatingElements";
import { getCategories, getProducts } from "@/app/actions/product";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <>
      <Navbar categories={categories} />
      <main className="min-h-screen" style={{ paddingBottom: "80px" }}>
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <SearchModal products={products} />
      <WhatsAppFloat />
      <MobileBottomNav />
    </>
  );
}
