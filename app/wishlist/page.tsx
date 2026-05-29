'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/shop/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-950 py-14">
        <div className="luxury-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-3">
              <Heart size={32} className="text-orange-600" fill="currentColor" strokeWidth={1.5} />
              <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white tracking-[-0.02em]" style={{ fontFamily: 'Poppins' }}>My wishlist</h1>
            </div>
            <p className="text-slate-400 font-medium" style={{ fontFamily: 'Inter' }}>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
          </motion.div>
        </div>
      </div>

      <div className="luxury-container py-16">
        {wishlist.length === 0 ? (
          <div className="text-center py-32">
            <Heart size={80} className="text-slate-200 mx-auto mb-8" />
            <h2 className="text-2xl font-black text-slate-900 mb-4" style={{ fontFamily: 'Poppins' }}>Your wishlist is empty</h2>
            <p className="text-slate-600 mb-10 font-medium max-w-md mx-auto" style={{ fontFamily: 'Inter' }}>Save your favourite products to come back to them later.</p>
            <Link href="/shop"
              className="btn btn-primary rounded-[14px] px-8 py-4 text-sm font-bold inline-flex items-center gap-2">
              <ShoppingBag size={18} /> Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wishlist.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
