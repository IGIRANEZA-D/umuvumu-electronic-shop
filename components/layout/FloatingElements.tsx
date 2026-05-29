'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ShoppingCart, Home, Search, Heart, Tag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';

/* ─── WHATSAPP FLOAT ─── */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;

  return (
    <div className="fixed z-40 flex flex-col items-end gap-3 bottom-[88px] right-5 md:bottom-8 md:right-8">
      <AnimatePresence>
        {tooltipOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            className="w-80 rounded-[20px] border border-slate-200 bg-white p-6 shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-[12px] bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                <MessageCircle size={18} className="text-emerald-600" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-950">UMUVUMU Support</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span className="text-[11px] text-slate-500 font-medium">Online now</span>
                </div>
              </div>
              <button 
                onClick={() => setTooltipOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-6 mb-5">
              Need help finding a product? Chat with us for instant availability and recommendations.
            </p>
            <a 
              href="https://wa.me/250781277413?text=Hello! I need help with a product."
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full h-11 text-sm rounded-[12px]"
            >
              <MessageCircle size={16} /> Message us
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setTooltipOpen(prev => !prev)}
        className="relative flex h-14 w-14 items-center justify-center rounded-[18px] bg-emerald-600 text-white shadow-lg hover:shadow-xl transition-shadow"
      >
        <MessageCircle size={24} strokeWidth={1.8} />
        {/* Ping indicator */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white">
          <span className="absolute inset-0 rounded-full bg-white animate-ping" />
        </span>
      </motion.button>
    </div>
  );
}

/* ─── MOBILE BOTTOM NAV ─── */
const navItems = [
  { icon: Home,         label: 'Home',     href: '/' },
  { icon: Search,       label: 'Search',   href: null,   isSearch: true },
  { icon: Tag,          label: 'Deals',    href: '/deals' },
  { icon: Heart,        label: 'Wishlist', href: '/wishlist' },
  { icon: ShoppingCart, label: 'Cart',     href: null,   isCart: true },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      {navItems.map(item => {
        const active = !item.isCart && !item.isSearch && pathname === item.href;
        const handleClick = item.isSearch ? () => setIsSearchOpen(true)
          : item.isCart ? () => setIsCartOpen(true)
          : undefined;

        const inner = (
          <div className="flex flex-col items-center justify-center gap-1 relative flex-1 py-2">
            {active && (
              <motion.div 
                layoutId="nav-pill"
                className="absolute inset-0 rounded-[12px] bg-orange-50 top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2" 
              />
            )}
            <div className="relative">
              <item.icon 
                size={22} 
                className={`transition-colors duration-200 ${active ? 'text-orange-600' : 'text-slate-500'}`} 
                strokeWidth={active ? 2 : 1.8} 
              />
              {item.isCart && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-600 text-white text-[9px] font-bold flex items-center justify-center" style={{ fontFamily: 'Poppins' }}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] transition-colors duration-200 font-medium ${active ? 'text-orange-600' : 'text-slate-500'}`}>
              {item.label}
            </span>
          </div>
        );

        return handleClick ? (
          <button key={item.label} onClick={handleClick} className="flex-1 cursor-pointer border-none bg-transparent p-0">
            {inner}
          </button>
        ) : (
          <Link key={item.label} href={item.href!} className="flex-1">
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
