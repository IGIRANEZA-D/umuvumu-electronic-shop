'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BadgePercent, Flame, Trophy, Zap } from 'lucide-react';
import { products } from '@/lib/data';
import ProductCard from '@/components/shop/ProductCard';

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        className="flex h-16 w-16 items-center justify-center rounded-[14px] text-2xl font-black text-white border border-white/10"
        style={{ background: 'rgba(255,102,1,0.1)', fontFamily: 'Poppins' }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="mt-3 text-xs font-bold text-slate-400 uppercase tracking-[0.1em]" style={{ fontFamily: 'Poppins' }}>{label}</span>
    </div>
  );
}

export default function DealsPage() {
  const [time, setTime] = useState({ h: 11, m: 47, s: 22 });

  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const dealProducts = products.filter(p => p.badge === 'Sale' || p.originalPrice);
  const hotProducts = products.filter(p => p.badge === 'Hot');
  const bestSellers = products.filter(p => p.badge === 'Best Seller');
  const sections = [
    { title: 'Flash Sales', sub: 'Big savings on selected products', items: dealProducts, icon: BadgePercent },
    { title: 'Hot Right Now', sub: 'Most popular picks this week', items: hotProducts, icon: Flame },
    { title: 'Best Sellers', sub: 'Customer favourites', items: bestSellers, icon: Trophy },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-950 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_center,rgba(255,103,1,0.14),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03] soft-grid-bg" />
        <div className="luxury-container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{ background: 'rgba(255,103,1,0.15)', color: 'rgb(255,120,40)', border: '1px solid rgba(255,103,1,0.25)' }}>
              <Zap size={14} /> Limited time deals
            </div>
            <h1 className="text-[clamp(40px,6vw,72px)] mb-6 font-black text-white tracking-[-0.02em]" style={{ fontFamily: 'Poppins' }}>
              Today&apos;s best <span className="text-orange-500">deals</span>
            </h1>
            <p className="mb-12 text-lg text-slate-300 font-medium max-w-2xl mx-auto" style={{ fontFamily: 'Inter' }}>
              Exclusive discounts on Rwanda&apos;s top electronics. Don&apos;t miss out.
            </p>
            <div className="flex items-center justify-center gap-4">
              <CountdownBox value={time.h} label="Hours" />
              <span className="mb-8 text-3xl font-black text-orange-500">:</span>
              <CountdownBox value={time.m} label="Minutes" />
              <span className="mb-8 text-3xl font-black text-orange-500">:</span>
              <CountdownBox value={time.s} label="Seconds" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="luxury-container space-y-20 py-20">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <div key={section.title}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-orange-100 text-orange-600">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <h2 className="text-[clamp(28px,3.5vw,44px)] font-black tracking-[-0.02em]" style={{ fontFamily: 'Poppins' }}>{section.title}</h2>
                </div>
                <p className="text-slate-600 font-medium" style={{ fontFamily: 'Inter' }}>{section.sub}</p>
              </motion.div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {section.items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
