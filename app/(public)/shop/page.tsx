import { Suspense } from "react";
import ShopClient from "@/components/shop/ShopClient";
import { getCategories, getProducts } from "@/app/actions/product";

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
    </div>}>
      <ShopClient products={products} categories={categories} />
    </Suspense>
  );
}
