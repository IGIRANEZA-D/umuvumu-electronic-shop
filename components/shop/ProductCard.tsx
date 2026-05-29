'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BadgeCheck, Check, Heart, Package, ShoppingCart, Star } from 'lucide-react';
import { Product, formatPrice } from '@/lib/data';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  index?: number;
  dark?: boolean;
}

const badgeStyles: Record<string, string> = {
  New: 'bg-emerald-600 text-white',
  Hot: 'bg-[var(--primary)] text-white',
  Sale: 'bg-rose-600 text-white',
  'Best Seller': 'bg-[var(--ink)] text-white',
};

export default function ProductCard({ product, index = 0, dark = false }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useStore();
  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : product.discountPercentage ?? 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: Math.min(index * 0.03, 0.16), duration: 0.36 }}
      className={`group flex h-full min-h-[430px] flex-col overflow-hidden rounded-[14px] border transition duration-300 hover:-translate-y-1 ${
        dark
          ? 'border-white/10 bg-white/[0.055] hover:border-white/20'
          : 'border-[var(--line)] bg-white hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lift)]'
      }`}
    >
      <div className="relative border-b border-[var(--line)] bg-[#f2f0ea]" style={{ aspectRatio: '1 / 0.82' }}>
        <Link href={`/product/${product.id}`} className="absolute inset-0 overflow-hidden">
        {!imgError ? (
          <Image
            src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 25vw"
            />
        ) : (
            <div className={`flex h-full w-full flex-col items-center justify-center p-6 text-center ${dark ? 'bg-[#25211d]' : 'bg-[var(--paper)]'}`}>
              <div className="flex h-16 w-16 items-center justify-center rounded-[12px] border border-[rgba(240,90,36,0.2)] bg-white text-[var(--primary)] shadow-[0_14px_34px_rgba(240,90,36,0.12)]">
                <Package size={30} strokeWidth={1.7} />
              </div>
              <p className={`mt-4 text-[11px] font-extrabold uppercase tracking-[0.12em] ${dark ? 'text-white/45' : 'text-[var(--faint)]'}`}>{product.brand}</p>
              <p className={`mt-1 max-w-[220px] text-sm font-extrabold leading-snug ${dark ? 'text-white' : 'text-[var(--ink)]'}`}>{product.name}</p>
            </div>
        )}
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.badge && (
            <span className={`w-fit rounded-md px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.06em] ${badgeStyles[product.badge]}`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="w-fit rounded-md border border-white/70 bg-white/90 px-2.5 py-1 text-[10px] font-extrabold text-[var(--primary-hover)]">
              Save {discount}%
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-md border border-white/70 bg-white/90 text-[var(--muted)] backdrop-blur transition hover:bg-white hover:text-[var(--primary)]"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={17} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className={`truncate text-[11px] font-extrabold uppercase tracking-[0.12em] ${dark ? 'text-white/45' : 'text-[var(--faint)]'}`}>
            {product.brand}
          </p>
          <div className="flex items-center gap-1 rounded-md bg-[var(--primary-soft)] px-2 py-1 text-[11px] font-extrabold text-[var(--primary-hover)]">
            <Star size={12} fill="currentColor" stroke="currentColor" /> {product.rating}
          </div>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className={`line-clamp-2 min-h-[46px] text-[16px] font-extrabold leading-snug transition group-hover:text-[var(--primary-hover)] ${dark ? 'text-white' : 'text-[var(--ink)]'}`}>
            {product.name}
          </h3>
        </Link>

        <div className="mt-4 flex flex-wrap items-end gap-2">
          <span className="text-[21px] font-extrabold text-[var(--primary-hover)]">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className={`pb-1 text-sm line-through ${dark ? 'text-white/35' : 'text-[var(--faint)]'}`}>{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className={`flex items-center gap-1.5 text-xs font-bold ${product.inStock ? 'text-emerald-600' : 'text-rose-500'}`}>
              <BadgeCheck size={14} /> {product.inStock ? 'Ready to ship' : 'Out of stock'}
            </span>
            <span className={`text-xs ${dark ? 'text-white/38' : 'text-[var(--faint)]'}`}>{product.reviews} reviews</span>
          </div>

          <div className="grid grid-cols-[0.9fr_1.1fr] gap-2">
            <Link
              href={`/product/${product.id}`}
              className={`btn-base min-h-10 px-3 text-sm ${dark ? 'border border-white/12 text-white hover:bg-white/10' : 'btn-secondary'}`}
              style={dark ? { color: '#fff' } : undefined}
            >
              Details
            </Link>
            <button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className="btn-base min-h-10 bg-[var(--ink)] px-3 text-sm text-white hover:bg-[var(--primary)] disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              {inCart ? <Check size={15} /> : <ShoppingCart size={15} />}
              {inCart ? 'Added' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
