'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product, formatPrice } from '@/lib/data';
import { useStore } from '@/lib/store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const isFavorite = isInWishlist(product.id);

  const badgeColors: Record<string, string> = {
    'New': 'bg-blue-500',
    'Hot': 'bg-[var(--primary)]',
    'Sale': 'bg-red-500',
    'Best Seller': 'bg-emerald-600'
  };

  return (
    <div 
      className="group relative flex flex-col h-full overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--surface)] transition-all duration-400 hover:border-[var(--primary)]/30 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[var(--bg-secondary)]">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <Image
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </Link>

        {/* Badges */}
        {(product.badge || product.discountPercentage) && (
          <div className="absolute left-3 top-3 flex flex-col gap-2 z-10">
            {product.badge && (
              <span className={`${badgeColors[product.badge]} rounded-full px-2.5 py-1 text-8px font-700 uppercase tracking-wider text-white`}>
                {product.badge}
              </span>
            )}
            {product.discountPercentage && (
              <span className="rounded-full bg-[var(--primary)] px-2.5 py-1 text-8px font-700 text-white">
                -{product.discountPercentage}%
              </span>
            )}
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute right-2.5 top-2.5 flex flex-col gap-1.5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-10">
          <button 
            onClick={() => toggleWishlist(product)}
            className={`btn-icon-sm transition-all duration-200 ${isFavorite ? 'bg-red-500/20 text-red-500' : 'bg-white/90 text-[var(--text-primary)] hover:bg-red-500/10 hover:text-red-500'}`}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button className="btn-icon-sm bg-white/90 text-[var(--text-primary)] hover:bg-blue-500/10 hover:text-blue-600">
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-8px font-700 uppercase tracking-wide text-[var(--text-quaternary)]">
            {product.brand}
          </span>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-10px font-600 text-[var(--text-primary)]">{product.rating}</span>
          </div>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="mb-3 line-clamp-2 text-13px font-600 leading-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--primary)]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-4 flex flex-col gap-3 border-t border-[var(--border-subtle)]">
          <div className="flex items-baseline gap-2">
            <span className="price-sm">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-10px font-500 text-[var(--text-quaternary)] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button 
            disabled={!product.inStock}
            onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--text-primary)] py-2.5 text-9px font-700 uppercase tracking-wider text-white transition-all duration-200 hover:bg-[var(--primary)] active:scale-95 disabled:cursor-not-allowed disabled:bg-[var(--bg-secondary)] disabled:text-[var(--text-quaternary)]"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}