'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Search, TrendingUp, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { products as defaultProducts, formatPrice, Product } from '@/lib/data';
import { useStore } from '@/lib/store';

const quickTerms = ['iPhone 15', 'MacBook Pro', 'OLED TV', 'PS5 Slim', 'Headphones', 'Samsung'];

interface SearchModalProps {
  products?: Product[];
}

export default function SearchModal({ products: propsProducts }: SearchModalProps = {}) {
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const products = propsProducts || defaultProducts;

  const results = query.length > 1
    ? products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 7)
    : products.filter(product => product.badge === 'Hot' || product.badge === 'Best Seller').slice(0, 5);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      if (event.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const id = window.setTimeout(() => setQuery(''), 0);
      return () => window.clearTimeout(id);
    }
  }, [isSearchOpen]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/40 p-4 backdrop-blur-sm sm:p-8" onClick={() => setIsSearchOpen(false)}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-12 max-h-[calc(100vh-120px)] max-w-5xl overflow-hidden rounded-[16px] border border-[var(--line)] bg-white shadow-[var(--shadow-lift)]"
            onClick={event => event.stopPropagation()}
          >
            <div className="border-b border-[var(--line)] p-5">
              <div className="flex items-center gap-4">
                <Search size={20} className="text-[var(--primary-hover)]" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search phones, laptops, TVs, gaming..."
                  className="min-w-0 flex-1 bg-transparent text-xl font-extrabold text-[var(--ink)] outline-none placeholder:text-[var(--faint)] sm:text-2xl"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />
                <button onClick={() => setIsSearchOpen(false)} className="btn-icon">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="grid max-h-[72vh] overflow-y-auto lg:grid-cols-[1fr_300px]">
              <div className="p-5 sm:p-6">
                <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--faint)]">
                  {query.length > 1 ? `${results.length} result${results.length !== 1 ? 's' : ''}` : 'Recommended'}
                </p>
                <div className="space-y-3">
                  {results.map(product => (
                    <Link key={product.id} href={`/product/${product.id}`} onClick={() => setIsSearchOpen(false)} className="group flex items-center gap-4 rounded-[12px] border border-[var(--line)] bg-white p-3 transition hover:border-[var(--line-strong)] hover:bg-[var(--primary-soft)]">
                      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md bg-[var(--surface-alt)]">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="72px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--faint)]">{product.brand}</p>
                        <h4 className="mt-1 line-clamp-1 font-bold text-[var(--ink)] transition group-hover:text-[var(--primary-hover)]">{product.name}</h4>
                        <p className="mt-2 text-base font-extrabold text-[var(--primary-hover)]">{formatPrice(product.price)}</p>
                      </div>
                      <ArrowRight size={16} className="shrink-0 text-[var(--faint)] transition group-hover:translate-x-1 group-hover:text-[var(--primary-hover)]" />
                    </Link>
                  ))}
                  {query.length > 1 && results.length === 0 && (
                    <div className="rounded-[12px] border border-[var(--line)] bg-[var(--paper)] p-8 text-center">
                      <p className="font-extrabold text-[var(--ink)]">No products found</p>
                      <p className="mt-2 text-sm text-[var(--muted)]">Try different keywords or browse categories.</p>
                    </div>
                  )}
                </div>
              </div>

              <aside className="border-t border-[var(--line)] bg-[var(--paper)] p-5 lg:border-l lg:border-t-0">
                <div className="mb-5 flex items-center gap-2 font-extrabold text-[var(--ink)]">
                  <TrendingUp size={18} className="text-[var(--primary-hover)]" /> Quick search
                </div>
                <div className="mb-8 flex flex-wrap gap-2">
                  {quickTerms.map(term => (
                    <button key={term} onClick={() => setQuery(term)} className="rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-bold text-[var(--muted)] transition hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
                      {term}
                    </button>
                  ))}
                </div>
                <div className="rounded-[12px] bg-[var(--dark)] p-5 text-white">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--primary)]">Expert help</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">Need product guidance? Chat with our support team.</p>
                  <a href="https://wa.me/250781277413" target="_blank" rel="noopener noreferrer" className="btn-base mt-5 w-full bg-emerald-600 text-white hover:bg-emerald-700">
                    Chat via WhatsApp
                  </a>
                </div>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
