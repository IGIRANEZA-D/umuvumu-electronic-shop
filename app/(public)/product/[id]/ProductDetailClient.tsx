'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Star, Heart, ShoppingCart, MessageCircle, ChevronRight,
  Shield, Truck, RotateCcw, Zap, Check, Plus, Minus, Share2
} from 'lucide-react';
import { Product, products, formatPrice, formatPriceRange } from '@/lib/data';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/shop/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'shipping'>('specs');
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const waMessage = encodeURIComponent(
    `Hello UMUVUMU! I'd like to order:\n\n${product.name}\nQty: ${quantity}\nPrice: ${formatPrice(product.price * quantity)}\n\nPlease confirm availability.`
  );

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({ title: product.name, text: `Check out ${product.name} at UMUVUMU!`, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      toast.success('Link copied!', { icon: 'Copied', style: { borderRadius: '12px' } });
    }
  };

  const badgeColor = product.badge === 'New' ? '#059669' : product.badge === 'Hot' ? '#DC2626' : product.badge === 'Sale' ? '#FF6701' : '#7C3AED';

  return (
    <div style={{ background: '#F8F9FB', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'white', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-sm flex-wrap" style={{ fontFamily: 'Inter' }}>
            <Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors">Home</Link>
            <ChevronRight size={13} className="text-gray-300" />
            <Link href="/shop" className="text-gray-400 hover:text-orange-500 transition-colors">Shop</Link>
            <ChevronRight size={13} className="text-gray-300" />
            <Link href={`/shop?cat=${product.category}`} className="text-gray-400 hover:text-orange-500 transition-colors capitalize">
              {product.category}
            </Link>
            <ChevronRight size={13} className="text-gray-300" />
            <span className="text-gray-700 truncate max-w-48">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="luxury-container py-8 sm:py-12">
        <div className="mb-12 grid grid-cols-1 gap-8 lg:mb-16 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative overflow-hidden rounded-lg bg-white sm:rounded-3xl"
              style={{ aspectRatio: '1/1', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: badgeColor, fontFamily: 'Poppins' }}>{product.badge}</span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#FF6701', fontFamily: 'Poppins' }}>-{discount}%</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2" style={{ fontFamily: 'Inter' }}>
                  {product.brand} / <span className="capitalize">{product.category}</span>
                </p>
                <h1 className="text-2xl font-black leading-tight text-gray-900 sm:text-3xl" style={{ fontFamily: 'Poppins' }}>{product.name}</h1>
              </div>
              <button onClick={handleShare} className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0 ml-3">
                <Share2 size={18} className="text-gray-500" />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill={i < Math.floor(product.rating) ? '#FF6701' : 'none'} stroke={i < Math.floor(product.rating) ? '#FF6701' : '#D1D5DB'} />
                ))}
              </div>
              <span className="font-bold text-gray-700 text-sm" style={{ fontFamily: 'Poppins' }}>{product.rating}</span>
              <span className="text-gray-400 text-sm" style={{ fontFamily: 'Inter' }}>({product.reviews} reviews)</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: product.inStock ? '#059669' : '#EF4444' }} />
                <span className="text-sm font-medium" style={{ color: product.inStock ? '#059669' : '#EF4444', fontFamily: 'Inter' }}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 flex flex-col gap-3 rounded-lg p-4 sm:flex-row sm:items-end sm:gap-4 sm:rounded-2xl sm:p-5" style={{ background: 'rgba(255,103,1,0.04)', border: '1px solid rgba(255,103,1,0.1)' }}>
              <div>
                <span className="break-words text-3xl font-black sm:text-4xl" style={{ color: '#FF6701', fontFamily: 'Poppins' }}>{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="ml-0 block text-base text-gray-400 line-through sm:ml-3 sm:inline sm:text-xl" style={{ fontFamily: 'Inter' }}>{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              {discount > 0 && (
                <span className="px-3 py-1 rounded-full text-sm font-bold text-white mb-1" style={{ background: '#059669', fontFamily: 'Poppins' }}>
                  Save {formatPrice(product.originalPrice! - product.price)}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-7 text-sm" style={{ fontFamily: 'Inter' }}>{product.description}</p>

            {/* Quantity */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Poppins' }}>Quantity:</span>
              <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '1.5px solid rgba(0,0,0,0.1)' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-orange-50 transition-colors"><Minus size={14} /></button>
                <span className="w-12 text-center font-bold text-sm" style={{ fontFamily: 'Poppins' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-orange-50 transition-colors"><Plus size={14} /></button>
              </div>
              <span className="text-sm text-gray-400" style={{ fontFamily: 'Inter' }}>
                Total: <strong style={{ color: '#FF6701' }}>{formatPrice(product.price * quantity)}</strong>
              </span>
            </div>

            {/* Actions */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); }}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-sm transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #FF6701, #E55A00)', boxShadow: '0 6px 24px rgba(255,103,1,0.35)', fontFamily: 'Poppins' }}>
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <a href={`https://wa.me/250781277413?text=${waMessage}`} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-sm transition-all hover:scale-[1.02]"
                style={{ background: '#25D366', boxShadow: '0 6px 24px rgba(37,211,102,0.35)', fontFamily: 'Poppins' }}>
                <MessageCircle size={18} /> Buy via WhatsApp
              </a>
              <button onClick={() => toggleWishlist(product)}
                className="flex h-14 w-full flex-shrink-0 items-center justify-center rounded-2xl transition-all hover:scale-105 sm:w-14"
                style={{ background: inWishlist ? 'rgba(255,103,1,0.1)' : 'rgba(0,0,0,0.04)', border: `1.5px solid ${inWishlist ? 'rgba(255,103,1,0.3)' : 'rgba(0,0,0,0.08)'}` }}>
                <Heart size={20} fill={inWishlist ? '#FF6701' : 'none'} stroke={inWishlist ? '#FF6701' : '#9CA3AF'} />
              </button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[{ icon: Shield, text: '100% Genuine' }, { icon: Truck, text: 'Fast Delivery' }, { icon: RotateCcw, text: '7-Day Returns' }].map(item => (
                <div key={item.text} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: '#F8F9FB' }}>
                  <item.icon size={14} style={{ color: '#FF6701' }} />
                  <span className="text-xs font-medium text-gray-600" style={{ fontFamily: 'Inter' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-12 rounded-lg bg-white sm:mb-16 sm:rounded-3xl" style={{ border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div className="flex border-b overflow-x-auto" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
            {(['specs', 'reviews', 'shipping'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-6 py-4 text-sm font-semibold capitalize transition-colors relative whitespace-nowrap"
                style={{ color: activeTab === tab ? '#FF6701' : '#6B7280', fontFamily: 'Poppins', borderBottom: activeTab === tab ? '2px solid #FF6701' : '2px solid transparent' }}>
                {tab === 'specs' ? 'Specifications' : tab === 'reviews' ? 'Reviews' : 'Shipping & Returns'}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-8">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.specs?.map((spec, idx) => (
                  <div key={idx} className="flex flex-col gap-2 rounded-xl p-4 sm:flex-row sm:items-center sm:gap-4" style={{ background: '#F8F9FB' }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#FF6701' }} />
                    <span className="text-sm text-gray-500 font-medium w-28 flex-shrink-0" style={{ fontFamily: 'Inter' }}>{spec.label}</span>
                    <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'Poppins' }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {['JK', 'AM', 'RN', 'GU', 'DM'].map((av, i) => (
                  <div key={i} className="p-5 rounded-2xl" style={{ background: '#F8F9FB' }}>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: '#FF6701', fontFamily: 'Poppins' }}>{av}</div>
                        <div>
                          <p className="font-semibold text-sm text-gray-800" style={{ fontFamily: 'Poppins' }}>
                            {['Jean Kayiranga', 'Alice Mutesi', 'Richard Nshuti', 'Grace Uwase', 'David Mugisha'][i]}
                          </p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, j) => <Star key={j} size={11} fill="#FF6701" stroke="#FF6701" />)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <Check size={11} /> Verified Purchase
                      </div>
                    </div>
                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      {['Absolutely love this product! Works perfectly and arrived quickly.',
                        'Great quality and exactly as described. Very happy with my purchase!',
                        'UMUVUMU delivered on time and the product is 100% original.',
                        'Best price in Rwanda and excellent after-sales support.',
                        'Outstanding product quality. Will definitely buy again from UMUVUMU!'][i]}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Truck, title: 'Same-Day Delivery', desc: 'Orders placed before 2PM in Musanze City are delivered same day. RWF 2,000 delivery fee.' },
                  { icon: Zap, title: 'Express Nationwide', desc: 'Delivery across Rwanda within 1-3 business days via trusted courier partners.' },
                  { icon: RotateCcw, title: '7-Day Returns', desc: 'Unopened products in original packaging can be returned within 7 days for a full refund.' },
                  { icon: Shield, title: 'Warranty', desc: 'All products come with official manufacturer warranty. Defective items replaced within 30 days.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4 p-5 rounded-2xl" style={{ background: '#F8F9FB' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,103,1,0.1)' }}>
                      <item.icon size={18} style={{ color: '#FF6701' }} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800 mb-1" style={{ fontFamily: 'Poppins' }}>{item.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'Inter' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-black mb-6" style={{ fontFamily: 'Poppins' }}>Related Products</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
