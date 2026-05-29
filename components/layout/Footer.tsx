'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Headphones, Mail, MapPin, Phone, RotateCcw, Shield, Truck } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Deals', href: '/deals' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const categories = [
  { label: 'Smartphones', href: '/shop?cat=smartphones' },
  { label: 'Laptops & Computers', href: '/shop?cat=laptops' },
  { label: 'Televisions', href: '/shop?cat=tvs' },
  { label: 'Audio & Sound', href: '/shop?cat=audio' },
  { label: 'Gaming', href: '/shop?cat=gaming' },
  { label: 'Smart Devices', href: '/shop?cat=smart' },
];

const policies = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Return Policy', href: '/contact' },
  { label: 'FAQ', href: '/contact' },
];

const features = [
  { icon: Shield, label: '100% Genuine', sub: 'Verified electronics' },
  { icon: Truck, label: 'Fast Delivery', sub: 'Same day in Musanze' },
  { icon: RotateCcw, label: '7-Day Returns', sub: 'Hassle-free policy' },
  { icon: Headphones, label: 'Support', sub: 'WhatsApp anytime' },
];

const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/gatetedavid12/' },
  { label: 'Facebook', href: 'https://www.facebook.com/devason001' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gatete-david-7586a8102' },
  { label: 'WhatsApp', href: 'https://wa.me/250781277413' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-white">
      <div className="container py-14">
        <div className="grid border-l border-t border-white/10 sm:grid-cols-2 xl:grid-cols-4">
          {features.map(feature => (
            <div key={feature.label} className="flex gap-4 border-b border-r border-white/10 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/8 text-[var(--primary)]">
                <feature.icon size={19} strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-sm font-extrabold">{feature.label}</p>
                <p className="mt-1 text-xs text-white/52">{feature.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container border-t border-white/10 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1.15fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[12px] border border-white/10 bg-white">
                <Image src="/logo.png" alt="UMUVUMU Electronic Shop" fill priority className="object-contain p-1" sizes="56px" />
              </div>
              <div>
                <div className="text-lg font-extrabold">UMUVUMU</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/45">Electronic Shop</div>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
              Rwanda&apos;s premium destination for authentic electronics with expert guidance and exceptional service.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {social.map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/12 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white/56 transition hover:border-[var(--primary)] hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <FooterLinks title="Quick Links" links={quickLinks} />
          <FooterLinks title="Categories" links={categories} />

          <div>
            <h3 className="mb-6 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/45">Contact</h3>
            <div className="space-y-4 text-sm text-white/65">
              <a href="https://maps.google.com/?q=Goico+Plaza,Musanze" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition hover:text-white">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--primary)]" />
                <span>Goico Plaza, Musanze City</span>
              </a>
              <a href="tel:+250781277413" className="flex items-center gap-3 transition hover:text-white">
                <Phone size={16} className="text-[var(--primary)]" /> +250 781 277 413
              </a>
              <a href="mailto:info@umuvumu.rw" className="flex items-center gap-3 transition hover:text-white">
                <Mail size={16} className="text-[var(--primary)]" /> info@umuvumu.rw
              </a>
              <p className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> 8:00 AM - 9:00 PM Daily
              </p>
            </div>

            <div className="mt-8 border border-white/10 p-4">
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/45">Newsletter</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="min-w-0 flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-[var(--primary)]" />
                <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-[var(--ink)] transition hover:bg-[var(--primary)] hover:text-white">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container border-t border-white/10 py-6">
        <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 UMUVUMU. Built in Rwanda.</p>
          <div className="flex flex-wrap gap-5">
            {policies.map(policy => (
              <Link key={`${policy.href}-${policy.label}`} href={policy.href} className="transition hover:text-white">
                {policy.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-6 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/45">{title}</h3>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={`${link.href}-${link.label}`}>
            <Link href={link.href} className="group flex items-center gap-2 text-sm text-white/65 transition hover:text-white">
              <ChevronRight size={12} className="text-[var(--primary)] transition group-hover:translate-x-0.5" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
