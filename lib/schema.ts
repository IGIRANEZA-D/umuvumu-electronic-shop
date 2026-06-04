export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  badge?: 'New' | 'Hot' | 'Sale' | 'Best Seller';
  inStock: boolean;
  brand: string;
  specs: {
    label: string;
    value: string;
  }[];
  createdAt: string;
};