'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/data';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, clearCart } = useStore();

  const waMessage = encodeURIComponent(
    `Hello UMUVUMU! I'd like to order:\n${cart.map(item => `- ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`).join('\n')}\n\nTotal: ${formatPrice(cartTotal)}`
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-white shadow-[var(--shadow-lift)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] p-5">
              <div>
                <h2 className="text-xl font-extrabold text-[var(--ink)]">Your Cart</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{cart.reduce((a, i) => a + i.quantity, 0)} items</p>
              </div>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button onClick={clearCart} className="rounded-md px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50">
                    Clear all
                  </button>
                )}
                <button onClick={() => setIsCartOpen(false)} className="btn-icon">
                  <X size={19} />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                  <ShoppingBag size={56} className="mb-5 text-neutral-200" />
                  <h3 className="text-lg font-extrabold text-[var(--ink)]">Your cart is empty</h3>
                  <p className="mb-7 mt-2 text-sm text-[var(--muted)]">Add products to start shopping</p>
                  <Link href="/shop" onClick={() => setIsCartOpen(false)} className="btn-base btn-primary px-6">
                    Browse Products
                  </Link>
                </div>
              ) : (
                <AnimatePresence>
                  {cart.map(item => (
                    <motion.div key={item.id} layout initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="flex gap-3 rounded-[12px] border border-[var(--line)] bg-[var(--paper)] p-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-white">
                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-bold text-[var(--ink)]">{item.name}</p>
                        <p className="mt-1 text-sm font-extrabold text-[var(--primary-hover)]">{formatPrice(item.price)}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center overflow-hidden rounded-md border border-[var(--line)] bg-white">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center hover:bg-[var(--primary-soft)]">
                              <Minus size={13} />
                            </button>
                            <span className="w-9 text-center text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center hover:bg-[var(--primary-soft)]">
                              <Plus size={13} />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="rounded-md p-2 text-[var(--faint)] transition hover:bg-rose-50 hover:text-rose-600">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {cart.length > 0 && (
              <div className="space-y-4 border-t border-[var(--line)] bg-white p-5">
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-extrabold uppercase tracking-[0.08em] text-[var(--faint)]">
                  <div className="flex flex-col items-center gap-1"><ShieldCheck size={14} className="text-emerald-600" /> Genuine</div>
                  <div className="flex flex-col items-center gap-1"><Truck size={14} className="text-sky-600" /> Fast</div>
                  <div className="flex flex-col items-center gap-1"><RotateCcw size={14} className="text-[var(--primary)]" /> 7-Days</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--muted)]">Total</span>
                  <span className="text-xl font-extrabold text-[var(--primary-hover)]">{formatPrice(cartTotal)}</span>
                </div>
                <a href={`https://wa.me/250781277413?text=${waMessage}`} target="_blank" rel="noopener noreferrer" className="btn-base w-full bg-emerald-600 py-4 text-white hover:bg-emerald-700">
                  <MessageCircle size={18} /> Order via WhatsApp
                </a>
                <p className="text-center text-xs text-[var(--faint)]">Secure ordering / Fast delivery / 100% genuine products</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
