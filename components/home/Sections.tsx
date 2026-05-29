'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Clock, Package, Star, Users } from 'lucide-react';
import { stats, testimonials } from '@/lib/data';
import Image from 'next/image';

const statIcons: Record<string, React.ElementType> = { Users, Package, Award, Clock };
const brandLogos = ['Apple', 'Samsung', 'Sony', 'LG', 'Xiaomi', 'Dell', 'HP', 'ASUS', 'JBL', 'Bose', 'DJI', 'Microsoft', 'Google', 'Nikon', 'Canon', 'Huawei'];

export function BrandsMarquee() {
  return (
    <section className="overflow-hidden border-y border-[var(--line)] bg-white py-9">
      <div className="luxury-container mb-5 flex items-center justify-between gap-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--faint)]">Authorized dealer for global brands</p>
        <p className="hidden text-xs font-extrabold text-[var(--primary-hover)] sm:block">100+ brands</p>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
        <div className="marquee flex items-center gap-4 whitespace-nowrap">
          {[...brandLogos, ...brandLogos].map((brand, index) => (
            <span key={`${brand}-${index}`} className="flex h-16 min-w-[132px] select-none items-center justify-center rounded-[14px] border border-[var(--line)] bg-[var(--paper)] px-6 transition hover:border-[rgba(240,90,36,0.3)] hover:bg-white">
              <BrandMark name={brand} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandMark({ name }: { name: string }) {
  if (name === 'Microsoft') {
    return (
      <span className="grid grid-cols-2 gap-1">
        <span className="h-3.5 w-3.5 bg-[#f25022]" />
        <span className="h-3.5 w-3.5 bg-[#7fba00]" />
        <span className="h-3.5 w-3.5 bg-[#00a4ef]" />
        <span className="h-3.5 w-3.5 bg-[#ffb900]" />
      </span>
    );
  }

  const styles: Record<string, string> = {
    Apple: 'text-black text-4xl leading-none',
    Samsung: 'text-[#1428a0] text-[13px] tracking-[0.18em]',
    Sony: 'text-black text-xl tracking-[0.08em]',
    LG: 'text-[#a50034] text-xl',
    Xiaomi: 'text-[#ff6900] text-xl',
    Dell: 'text-[#0076ce] text-xl',
    HP: 'text-[#0096d6] text-xl',
    ASUS: 'text-black text-xl tracking-[0.08em]',
    JBL: 'text-[#ff4f1f] text-2xl',
    Bose: 'text-black text-xl italic',
    DJI: 'text-black text-2xl',
    Google: 'text-[#4285f4] text-4xl',
    Nikon: 'text-[#ffd400] text-lg italic',
    Canon: 'text-[#cc0000] text-2xl',
    Huawei: 'text-[#e60012] text-xl',
  };

  const label = name === 'Apple' ? 'Apple' : name;

  return (
    <span className={`font-black ${styles[name] ?? 'text-[var(--ink)] text-xl'}`} aria-label={`${name} logo`}>
      {label}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden border-t border-orange-100 bg-[#151515] py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-0 opacity-[0.09] soft-grid-bg" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#2a1a14] to-transparent" />
      <div className="luxury-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-lg border border-orange-400/25 bg-orange-500/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#FF6701]">Impact</span>
          <h2 className="mt-7 text-[clamp(32px,5vw,58px)] font-[900] leading-[1.05] tracking-[0] text-white" style={{ fontFamily: 'Poppins' }}>Trust you can see before checkout.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-7 text-white/58 sm:text-lg">
            UMUVUMU is built on product authenticity, responsive service, and a dependable shopping experience.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = statIcons[stat.icon] ?? Award;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] p-6 text-left shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:border-[#FF6701]/45 hover:bg-white/[0.075] sm:p-7"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FF6701]/12 transition group-hover:bg-[#FF6701]/20" />
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg bg-[#FF6701] text-white shadow-[0_16px_32px_rgba(255,103,1,0.24)] transition-all group-hover:scale-105">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <p className="text-[clamp(38px,5vw,60px)] font-black leading-none text-white" style={{ fontFamily: 'Poppins' }}>
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-orange-200/80">{stat.label}</p>
                <div className="mt-6 h-1 w-14 rounded-full bg-[#FF6701]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);
  const number = Number(value.replace(/[^\d]/g, ''));
  const suffix = value.replace(/[\d,]/g, '');

  useEffect(() => {
    if (!inView || !number) return;

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / 1400, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(number * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, number]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-t border-orange-100 bg-[#fff7f1] py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-0 opacity-[0.05] soft-grid-bg" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent" />
      <div className="luxury-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6701] shadow-[0_12px_30px_rgba(255,103,1,0.08)]">
              <Star size={12} fill="#FF6701" /> Reviews
            </span>
            <h2 className="mt-6 text-[clamp(32px,5vw,58px)] font-[900] leading-[1.05] tracking-[0] text-slate-950" style={{ fontFamily: 'Poppins' }}>
              Confidence that reads like real service.
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end">
            <div className="flex items-center gap-3">
              {[...Array(5)].map((_, index) => <Star key={index} size={22} fill="#FF6701" stroke="#FF6701" />)}
              <span className="ml-2 text-3xl font-black text-slate-950" style={{ fontFamily: 'Poppins' }}>4.9</span>
            </div>
            <p className="mt-4 text-sm font-bold text-slate-400 uppercase tracking-widest">1,200+ Verified Reviews</p>
          </div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative overflow-hidden rounded-lg border border-orange-100 bg-white/92 p-5 shadow-[0_18px_48px_rgba(23,23,23,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6701]/35 hover:shadow-[0_28px_64px_-30px_rgba(255,103,1,0.35)] sm:p-7"
            >
              <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-[#FF6701]/10" />
              <div className="relative mb-4 flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, star) => <Star key={star} size={15} fill="#FF6701" stroke="#FF6701" />)}
              </div>
              <p className="relative mb-7 text-base font-medium leading-7 text-slate-600 sm:text-lg">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="relative flex items-center justify-between gap-4 border-t border-orange-100 pt-5">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-[#FF6701] text-sm font-black text-white" style={{ fontFamily: 'Poppins' }}>
                    {testimonial.avatar.startsWith('/') ? (
                      <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                    ) : (
                      testimonial.avatar
                    )}
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-950" style={{ fontFamily: 'Poppins' }}>{testimonial.name}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{testimonial.location}</p>
                  </div>
                </div>
                <span className="hidden rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#FF6701] sm:block">
                  {testimonial.product}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
