'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, Camera, Gamepad2, Grid3X3, Headphones, Home, Laptop, Router, Smartphone, Tv, Utensils, Watch
} from 'lucide-react';

const cats = [
  { id: 'smartphones', name: 'Smartphones', icon: Smartphone, count: '124', tone: 'from-orange-50 to-white' },
  { id: 'laptops', name: 'Laptops', icon: Laptop, count: '87', tone: 'from-slate-100 to-white' },
  { id: 'tvs', name: 'Televisions', icon: Tv, count: '56', tone: 'from-orange-100 to-white' },
  { id: 'audio', name: 'Audio & Sound', icon: Headphones, count: '93', tone: 'from-amber-50 to-white' },
  { id: 'gaming', name: 'Gaming', icon: Gamepad2, count: '142', tone: 'from-orange-50 to-white' },
  { id: 'accessories', name: 'Accessories', icon: Watch, count: '215', tone: 'from-slate-100 to-white' },
  { id: 'cameras', name: 'Cameras', icon: Camera, count: '48', tone: 'from-orange-50 to-white' },
  { id: 'smart', name: 'Smart Home', icon: Home, count: '76', tone: 'from-amber-50 to-white' },
  { id: 'networking', name: 'Networking', icon: Router, count: '34', tone: 'from-orange-100 to-white' },
  { id: 'kitchen', name: 'Kitchen Tech', icon: Utensils, count: '65', tone: 'from-slate-100 to-white' },
];

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-[#fff7f1] py-16 sm:py-20 lg:py-28">
      <div className="absolute inset-0 opacity-[0.06] soft-grid-bg" />
      <div className="absolute left-0 top-0 h-64 w-full bg-gradient-to-b from-white to-transparent" />
      
      <div className="luxury-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 grid gap-8 lg:mb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#FF6701] shadow-[0_12px_30px_rgba(255,103,1,0.08)]">
              <Grid3X3 size={14} /> Catalog
            </span>
            <h2 className="mt-6 max-w-4xl text-[clamp(30px,4.8vw,62px)] font-[900] leading-[1.05] tracking-[0] text-slate-950" style={{ fontFamily: 'Poppins' }}>
              Browse by the way you use technology.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Clean product paths for phones, televisions, gaming, audio, smart home gear, and daily accessories.
            </p>
          </div>
          <Link href="/shop" className="group flex w-full items-center justify-center gap-3 rounded-lg bg-slate-950 px-6 py-4 text-sm font-bold shadow-xl shadow-slate-950/15 transition-all hover:bg-[#FF6701] sm:w-fit lg:px-8 lg:py-5 lg:text-base" style={{ color: '#ffffff' }}>
            <span className="text-white">Explore Shop</span>
            <ArrowRight size={20} className="text-[#FF6701] transition-transform group-hover:translate-x-1 group-hover:text-white" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {cats.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.5 }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            >
              <Link href={`/shop?cat=${cat.id}`} className="group block">
                <div className={`relative flex min-h-[148px] flex-col overflow-hidden rounded-lg border border-orange-100/80 bg-gradient-to-br ${cat.tone} p-4 shadow-[0_16px_40px_rgba(23,23,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6701]/45 hover:shadow-[0_24px_56px_-24px_rgba(255,103,1,0.30)] sm:min-h-[160px] sm:p-5 lg:min-h-[182px]`}>
                  <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-[#FF6701]/10 transition group-hover:bg-[#FF6701]/18" />
                  <div className="relative mb-6 flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FF6701] text-white shadow-[0_14px_28px_rgba(255,103,1,0.24)] transition-all duration-300 group-hover:scale-105 sm:h-13 sm:w-13">
                      <cat.icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <span className="rounded-full border border-orange-200 bg-white/80 px-2.5 py-1 text-[10px] font-black text-[#FF6701]">
                      {cat.count}
                    </span>
                  </div>

                  <div className="relative mt-auto">
                    <div>
                      <h3 className="text-base font-black leading-tight text-slate-950 transition-colors sm:text-lg" style={{ fontFamily: 'Poppins' }}>
                        {cat.name}
                      </h3>
                      <p className="mt-2 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.16em] text-slate-500 transition-colors group-hover:text-[#FF6701] sm:text-[10px]">
                        Browse Items <ArrowRight size={12} className="transition group-hover:translate-x-0.5" />
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
