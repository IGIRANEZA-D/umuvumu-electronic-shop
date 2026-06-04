import { products } from '@/lib/data';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return products.map(p => ({ id: String(p.id) }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find(p => p.id === parseInt(id));
  if (!product) return <div>Product not found</div>;
  return <ProductDetailClient product={product} />;
}
