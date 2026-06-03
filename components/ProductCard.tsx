'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Eye, Handshake } from 'lucide-react';
import { Product, formatPrice, formatPriceRange, generateWhatsAppLink } from '@/lib/data';
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
          {product.priceRange && (
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-bold text-[var(--primary)]">
                {formatPriceRange(product.priceRange.min, product.priceRange.max)}
              </p>
              <p className="text-[var(--primary)] font-bold text-10px flex items-center gap-1.5">
                <Handshake size={13} strokeWidth={2.5} /> NEGOTIABLE
              </p>
            </div>
          )}

          {/* Negotiate via WhatsApp Button */}
          <button 
            onClick={() => {
              if (product.priceRange) {
                const whatsappLink = generateWhatsAppLink(product.name, product.priceRange.min, product.priceRange.max);
                window.open(whatsappLink, '_blank');
              }
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 text-9px font-700 uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#1ebd57] active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.949 1.256l-.356.214-3.682-.966.984 3.595-.235.374a9.86 9.86 0 .246 4.876c.666 2.592 2.616 4.957 5.206 6.191.87.458 1.896.68 2.904.68a9.892 9.892 0 003.53-.658l.371-.214 3.746.966-.984-3.595.236-.374a9.86 9.86 0 00-.264-6.849 9.874 9.874 0 00-5.226-5.45zM23.12 0H.88C.39 0 0 .39 0 .88v22.24C0 23.61.39 24 .88 24h22.24c.49 0 .88-.39.88-.88V.88C24 .39 23.61 0 23.12 0Z"/></svg>
            Negotiate
          </button>
        </div>
      </div>
    </div>
  );
}