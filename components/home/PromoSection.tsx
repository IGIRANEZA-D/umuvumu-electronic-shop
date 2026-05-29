'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Gamepad2, Headphones, ShieldCheck, Smartphone, Truck, Zap } from 'lucide-react';

const promos = [
  { icon: Gamepad2, badge: 'Gaming week', title: 'Console, laptop and accessory upgrades.', sub: 'A premium gaming selection for sharper performance and cleaner setups.', cta: 'Shop gaming', href: '/shop?cat=gaming' },
  { icon: Smartphone, badge: 'Flagship phones', title: 'New smartphones from brands people trust.', sub: 'Latest devices with original warranty guidance and fast availability checks.', cta: 'View phones', href: '/shop?cat=smartphones' },
  { icon: Headphones, badge: 'Audio room', title: 'Better sound for work, travel and home.', sub: 'Premium headphones, speakers and soundbars with clean browsing paths.', cta: 'Shop audio', href: '/shop?cat=audio' },
];

const trust = [
  { icon: ShieldCheck, title: 'Verified products', sub: 'Authentic electronics with warranty guidance.' },
  { icon: Truck, title: 'Rwanda delivery', sub: 'Same-day Musanze and nationwide dispatch.' },
  { icon: Zap, title: 'Fast support', sub: 'Availability, recommendations and orders via WhatsApp.' },
];

export default function PromoSection() {
  return (
    <section className="bg-white py-24">
      <div className="luxury-container">
        <div className="mb-12 max-w-3xl">
          <span className="section-eyebrow">Curated for you</span>
          <h2 className="section-title mt-5">Shopping moments designed like products.</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {promos.map((promo, index) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <Link href={promo.href} className="group block h-full">
                <div className="flex min-h-[300px] flex-col rounded-[14px] border border-[var(--line)] bg-[var(--dark)] p-7 text-white transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className="mb-12 flex items-center justify-between">
                    <span className="rounded-md border border-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/62">{promo.badge}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-[var(--ink)]">
                      <promo.icon size={19} strokeWidth={1.7} />
                    </span>
                  </div>
                  <h3 className="max-w-sm text-[22px] font-extrabold leading-tight">{promo.title}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-white/62">{promo.sub}</p>
                  <div className="mt-auto flex items-center gap-2 pt-8 text-sm font-extrabold text-[var(--primary)]">
                    {promo.cta} <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {trust.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="ui-card flex items-start gap-4 p-5"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--primary-soft)] text-[var(--primary-hover)]">
                <item.icon size={19} strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-extrabold text-[var(--ink)]">{item.title}</p>
                <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
