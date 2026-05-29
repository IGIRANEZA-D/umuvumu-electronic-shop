'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, MessageCircle, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';

const slides = [
  {
    id: 1,
    label: 'The Premium Standard',
    headline: 'Curated technology for a sharper lifestyle.',
    sub: "Rwanda's destination for authentic electronics. We bridge the gap between global innovation and local reliability.",
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1400&q=90',
    badge: 'iPhone 15 Series',
    tag: 'Official Stock',
  },
  {
    id: 2,
    label: 'Professional Power',
    headline: 'Engineered for your highest productivity.',
    sub: 'From MacBook Pro to high-performance workstations. Tools chosen for creators who demand zero compromise.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1400&q=90',
    badge: 'MacBook Pro M3',
    tag: 'Certified Dealer',
  },
  {
    id: 3,
    label: 'Immersive Living',
    headline: 'Entertainment that transforms your space.',
    sub: "Explore next-gen gaming and cinematic sound. Verified hardware backed by Musanze's most trusted support team.",
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=1400&q=90',
    badge: 'PlayStation 5 Slim',
    tag: 'Ready to Ship',
  },
];

const proof = [
  { icon: ShieldCheck, title: '100% Genuine', text: 'Global Warranty' },
  { icon: Truck, title: 'Priority Dispatch', text: 'Musanze Same-Day' },
  { icon: BadgeCheck, title: 'Expert Support', text: 'Verified Guidance' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % slides.length), 5600);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--line)] bg-[#f8f6f1]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(23,23,23,0.038)_1px,transparent_1px),linear-gradient(rgba(23,23,23,0.03)_1px,transparent_1px)] bg-[size:88px_88px] opacity-50" />
      <div className="absolute left-0 top-0 -z-10 h-full w-[58%] bg-white" />
      <div className="luxury-container relative grid min-h-[calc(100svh-132px)] gap-8 py-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-7">
        <div className="relative z-10 max-w-[620px] self-center lg:-mt-2">
          <div className="absolute -left-5 top-2 hidden h-[72%] w-px bg-gradient-to-b from-[var(--primary)] via-[rgba(240,90,36,0.22)] to-transparent lg:block" />
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-[rgba(240,90,36,0.18)] bg-white px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--primary-hover)] shadow-[0_10px_28px_rgba(240,90,36,0.08)]">
                <ShoppingBag size={13} /> Premium electronics, locally supported
              </div>

              <h1 className="max-w-[640px] text-[clamp(32px,4.5vw,52px)] font-black leading-[1.05] tracking-[0] text-[var(--ink)]">
                {slide.headline}
              </h1>
              <p className="mt-4 max-w-[540px] text-[14px] leading-7 text-[var(--muted)] sm:text-[15px]">
                {slide.sub}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/shop" className="btn-base btn-primary min-h-11 px-6">
                  Explore Collection <ArrowRight size={18} />
                </Link>
                <a href="https://wa.me/250781277413" target="_blank" rel="noopener noreferrer" className="btn-base btn-secondary min-h-11 px-6">
                  <MessageCircle size={18} className="text-emerald-600" /> Ask Expert
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
            {proof.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.04 }}
                className="flex items-center gap-3 rounded-[12px] border border-[var(--line)] bg-white/88 p-3 shadow-[0_10px_28px_rgba(23,23,23,0.04)] backdrop-blur"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-[var(--primary-hover)]">
                  <item.icon size={17} strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-[13px] font-extrabold leading-tight text-[var(--ink)]">{item.title}</span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--faint)]">{item.text}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[320px] self-center sm:min-h-[390px] lg:min-h-[485px] xl:min-h-[520px]">
          <div className="absolute -right-5 top-7 hidden h-[82%] w-[78%] rounded-[22px] border border-[var(--line)] bg-white/52 lg:block" />
          <AnimatePresence mode="wait">
            <motion.div
              key={`${slide.id}-visual`}
              initial={{ opacity: 0, x: 18, scale: 0.99 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -14, scale: 1.01 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <div className="relative h-full overflow-hidden rounded-[20px] border border-[var(--line)] bg-white p-2.5 shadow-[0_26px_80px_rgba(23,23,23,0.13)]">
                <div className="relative h-full overflow-hidden rounded-[15px] bg-[var(--surface-alt)]">
                  <Image src={slide.image} alt={slide.badge} fill priority className="object-cover" sizes="(max-width: 1024px) 94vw, 54vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.38))]" />
                </div>

                <div className="absolute left-5 top-5 rounded-[12px] border border-white/50 bg-white/90 px-4 py-3 backdrop-blur-md">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--faint)]">Now featuring</p>
                  <p className="mt-1 text-sm font-black text-[var(--ink)]">{slide.badge}</p>
                </div>

                <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div className="rounded-[14px] border border-white/45 bg-white/90 p-4 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--primary-hover)]">{slide.tag}</span>
                    </div>
                    <p className="mt-2 max-w-sm text-[18px] font-black leading-tight text-[var(--ink)]">Verified stock with local guidance.</p>
                  </div>
                  <div className="hidden rounded-[14px] border border-[rgba(240,90,36,0.26)] bg-white p-4 text-[var(--ink)] shadow-[0_18px_44px_rgba(0,0,0,0.14)] sm:block">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--faint)]">Catalog</p>
                    <p className="mt-1 text-2xl font-black text-[var(--primary-hover)]">500+</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">curated products</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="luxury-container absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center justify-between">
        <div className="hidden text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--faint)] sm:block">Premium electronics / authentic service</div>
        <div className="ml-auto flex items-center gap-2">
          {slides.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setCurrent(i)}
              className="group flex items-center gap-2 rounded-full px-1 py-2"
              aria-label={`Show hero slide ${i + 1}`}
            >
              <span className="h-1.5 rounded-full transition-all duration-300" style={{ width: current === i ? 36 : 8, background: current === i ? 'var(--ink)' : 'rgba(23,23,23,0.2)' }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
