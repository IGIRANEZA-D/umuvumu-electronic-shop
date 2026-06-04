'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Timer, TrendingUp, Trophy } from 'lucide-react';
import { products } from '@/lib/data';
import ProductCard from '@/components/shop/ProductCard';

function SectionHeader({
  icon: Icon, label, title, copy, href = '/shop', dark = false, rightContent,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  title: string;
  copy?: string;
  href?: string;
  dark?: boolean;
  rightContent?: React.ReactNode;
}) {
  return (
    <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,760px)_auto] lg:items-end lg:justify-between">
      <div>
        <span className={dark ? 'section-eyebrow border-white/10 bg-white/8 text-white' : 'section-eyebrow'}>
          <Icon size={13} /> {label}
        </span>
        <h2 className={`section-title mt-5 ${dark ? 'text-white' : 'text-[var(--ink)]'}`}>{title}</h2>
        {copy && <p className={`section-copy mt-5 ${dark ? 'text-white/68' : ''}`}>{copy}</p>}
      </div>
      <div className="flex items-center justify-between gap-6 lg:justify-end">
        {rightContent}
        <Link href={href} className={`group inline-flex items-center gap-2 text-sm font-extrabold ${dark ? 'text-white' : 'text-[var(--primary-hover)]'}`}>
          View all <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function Countdown() {
  const [time, setTime] = useState({ h: 8, m: 31, s: 12 });

  useEffect(() => {
    const id = setInterval(() => setTime(prev => {
      let { h, m, s } = prev;
      s -= 1;
      if (s < 0) { s = 59; m -= 1; }
      if (m < 0) { m = 59; h -= 1; }
      if (h < 0) h = 23;
      return { h, m, s };
    }), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden items-center gap-2 sm:flex">
      {[
        [time.h, 'HRS'],
        [time.m, 'MIN'],
        [time.s, 'SEC'],
      ].map(([value, label]) => (
        <div key={label} className="text-center">
          <motion.div
            key={value}
            initial={{ y: -2 }}
            animate={{ y: 0 }}
            className="flex h-11 w-12 items-center justify-center rounded-md border border-white/10 bg-white/8 text-base font-extrabold text-white"
          >
            {String(value).padStart(2, '0')}
          </motion.div>
          <span className="mt-1 block text-[9px] font-bold tracking-[0.1em] text-white/42">{label}</span>
        </div>
      ))}
    </div>
  );
}

function ProductGrid({ items, dark = false }: { items: typeof products; dark?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((product, index) => <ProductCard key={product.id} product={product} index={index} dark={dark} />)}
    </div>
  );
}

const dealProds = products.filter(p => p.badge === 'Sale' || p.originalPrice).slice(0, 4);
const featProds = products.filter(p => p.badge === 'Best Seller' || p.badge === 'Hot').slice(0, 8);
const newProds = products.filter(p => p.badge === 'New').slice(0, 4);

interface ProductSectionProps {
  products?: typeof products;
}

export function FeaturedProducts({ products: propsProducts }: ProductSectionProps = {}) {
  const productsToUse = propsProducts || products;
  const featProds = productsToUse.filter(p => p.rating >= 4.5).slice(0, 4);
  return (
    <section className="bg-[var(--paper)] py-24">
      <div className="luxury-container">
        <SectionHeader
          icon={Trophy}
          label="Featured"
          title="Best sellers with real buying confidence."
          copy="Flagship devices and customer favourites arranged with clear pricing, stock signals and fast product actions."
        />
        <ProductGrid items={featProds} />
      </div>
    </section>
  );
}

export function FlashDeals({ products: propsProducts }: ProductSectionProps = {}) {
  const productsToUse = propsProducts || products;
  const dealProds = productsToUse.filter(p => p.badge === 'Sale').slice(0, 4);
  return (
    <section className="relative overflow-hidden bg-[var(--dark)] py-24">
      <div className="luxury-container relative">
        <SectionHeader
          icon={Timer}
          label="Limited time"
          title="Flash deals, presented with restraint."
          copy="A sharper discount area that feels premium instead of noisy."
          dark
          href="/deals"
          rightContent={<Countdown />}
        />
        <ProductGrid items={dealProds} dark />
      </div>
    </section>
  );
}

export function NewArrivals({ products: propsProducts }: ProductSectionProps = {}) {
  const productsToUse = propsProducts || products;
  const newProds = productsToUse.filter(p => p.badge === 'New').slice(0, 4);
  return (
    <section className="bg-white py-24">
      <div className="luxury-container">
        <SectionHeader
          icon={Star}
          label="New arrivals"
          title="Fresh technology for sharper setups."
          copy="Recently added products across phones, smart devices, cameras and professional equipment."
        />
        <ProductGrid items={newProds} />
      </div>
    </section>
  );
}

export function TrendingProducts({ products: propsProducts }: ProductSectionProps = {}) {
  const productsToUse = propsProducts || products;
  return (
    <section className="bg-[var(--paper)] py-24">
      <div className="luxury-container">
        <SectionHeader
          icon={TrendingUp}
          label="Trending"
          title="What serious buyers are viewing now."
          copy="A focused selection of high-interest products from the UMUVUMU catalog."
        />
        <ProductGrid items={productsToUse.slice(0, 8)} />
      </div>
    </section>
  );
}
