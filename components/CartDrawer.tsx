'use client';

import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function CartDrawer() {
  const { cart, cartTotal, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useStore();

  const FREE_SHIPPING_THRESHOLD = 200000;
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220, mass: 1 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md overflow-hidden bg-white shadow-[0 -24px 80px rgba(0,0,0,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>Shopping Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-[10px] p-2 text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex h-[calc(100%-180px)] flex-col items-center justify-center p-8 text-center">
                <ShoppingCart size={56} className="mb-6 text-slate-300" />
                <p className="mb-2 text-lg font-bold text-slate-900">Your cart is empty</p>
                <p className="mb-8 text-sm text-slate-600">Start exploring our premium electronics collection.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center justify-center rounded-[14px] bg-orange-600 px-8 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-orange-700"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Free Shipping Progress */}
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Free delivery</span>
                    <span className="text-xs font-bold text-orange-600">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="h-full bg-orange-600"
                    />
                  </div>
                  {remaining > 0 && (
                    <p className="mt-3 text-xs font-medium text-slate-600">
                      Add <span className="font-bold text-orange-600">{formatPrice(remaining)}</span> more for free delivery
                    </p>
                  )}
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="space-y-5">
                    {cart.map((item) => (
                      <li key={item.id} className="flex gap-4 pb-5 border-b border-slate-200 last:border-b-0 last:pb-0">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-[12px] border border-slate-200 bg-slate-50">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <Link href={`/product/${item.slug}`} className="line-clamp-2 text-sm font-semibold text-slate-900 transition-colors hover:text-orange-600">
                              {item.name}
                            </Link>
                            <span className="mt-1 text-sm font-bold text-orange-600">{formatPrice(item.price)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center rounded-[8px] border border-slate-300 bg-slate-50">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
                                className="flex h-7 w-7 items-center justify-center text-slate-600 transition-colors hover:text-slate-900 hover:bg-white"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-7 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="flex h-7 w-7 items-center justify-center text-slate-600 transition-colors hover:text-slate-900 hover:bg-white"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="rounded-[8px] p-1.5 text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Checkout Section */}
                <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-6 shadow-[0 -8px 24px rgba(0,0,0,0.06)]">
                  <div className="mb-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Subtotal</span>
                      <span className="text-lg font-bold text-slate-900">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Delivery</span>
                      <span className="text-sm font-bold text-emerald-600">{remaining === 0 ? 'FREE' : 'TBD'}</span>
                    </div>
                  </div>
                  <div className="mb-6 border-t border-slate-200 pt-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">Total</span>
                    <span className="text-2xl font-black text-slate-950" style={{ fontFamily: 'Poppins' }}>{formatPrice(cartTotal)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="flex w-full items-center justify-center rounded-[14px] bg-orange-600 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-orange-700 active:scale-95"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-3 w-full rounded-[12px] py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
