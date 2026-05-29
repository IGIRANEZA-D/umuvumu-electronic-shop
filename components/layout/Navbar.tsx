'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Camera, ChevronDown, Gamepad2, Headphones, Heart, Home, Laptop, MapPin,
  Menu, Phone, Router, Search, ShoppingCart, Smartphone, Tv,
  Utensils, Watch, X
} from 'lucide-react';
import { useStore } from '@/lib/store';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Deals', href: '/deals' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const categoryLinks = [
  { label: 'Smartphones', href: '/shop?cat=smartphones', icon: Smartphone, count: '124' },
  { label: 'Laptops', href: '/shop?cat=laptops', icon: Laptop, count: '87' },
  { label: 'Televisions', href: '/shop?cat=tvs', icon: Tv, count: '56' },
  { label: 'Audio & Sound', href: '/shop?cat=audio', icon: Headphones, count: '93' },
  { label: 'Gaming', href: '/shop?cat=gaming', icon: Gamepad2, count: '142' },
  { label: 'Accessories', href: '/shop?cat=accessories', icon: Watch, count: '215' },
  { label: 'Cameras', href: '/shop?cat=cameras', icon: Camera, count: '48' },
  { label: 'Smart Home', href: '/shop?cat=smart', icon: Home, count: '76' },
  { label: 'Networking', href: '/shop?cat=networking', icon: Router, count: '34' },
  { label: 'Kitchen Tech', href: '/shop?cat=kitchen', icon: Utensils, count: '65' },
];

const announcements = [
  'Free delivery on orders over RWF 200,000 within Musanze',
  '100% genuine products with warranty support',
  'Open 7 days / 8:00 AM - 9:00 PM / Chat anytime',
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileCategories, setMobileCategories] = useState(false);
  const pathname = usePathname();
  const catRef = useRef<HTMLDivElement>(null);
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(event.target as Node)) setCatOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setMobileOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-[80] border-b border-[var(--line)] bg-white/92 backdrop-blur-2xl">
        <div className="hidden border-b border-[var(--line)] bg-[var(--paper)]/65 lg:block">
          <div className="container flex items-center justify-between gap-6 py-2 text-xs text-[var(--muted)]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} /> Goico Plaza, Musanze City
              </span>
              <span className="h-4 w-px bg-[var(--line)]" />
              <a href="tel:+250781277413" className="flex items-center gap-1.5 transition hover:text-[var(--primary-hover)]">
                <Phone size={13} /> +250 781 277 413
              </a>
            </div>
            <AnnouncementCycle />
          </div>
        </div>

        <motion.nav animate={{ height: scrolled ? 70 : 78 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}>
          <div className="container flex h-full items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="btn-icon xl:hidden" aria-label="Open menu">
              <Menu size={20} />
            </button>

            <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-3.5 rounded-lg pr-2">
              <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-[14px] border border-[var(--line)] bg-white shadow-[0_12px_30px_rgba(23,23,23,0.08)]">
                <Image src="/logo.png" alt="UMUVUMU Electronic Shop" fill priority className="object-contain p-1" sizes="64px" />
              </span>
              <span className="hidden lg:block">
                <span className="block text-[18px] font-black leading-tight text-[var(--ink)]">UMUVUMU</span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--faint)]">Electronic Shop</span>
              </span>
            </Link>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden h-11 min-w-0 flex-1 items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-4 text-left transition hover:border-[var(--line-strong)] hover:bg-white md:flex xl:max-w-sm"
            >
              <Search size={16} className="shrink-0 text-[var(--faint)]" />
              <span className="truncate text-sm text-[var(--muted)]">Search products...</span>
              <span className="ml-auto hidden rounded-md border border-[var(--line)] bg-white px-2 py-1 text-[10px] font-bold text-[var(--faint)] lg:block">Ctrl K</span>
            </button>

            <nav className="ml-auto hidden items-center gap-1 xl:flex">
              {navLinks.map(link => <NavLink key={link.label} link={link} active={pathname === link.href} />)}
              <div ref={catRef} className="relative">
                <button
                  onClick={() => setCatOpen(open => !open)}
                  className={`flex h-10 items-center gap-1 rounded-lg px-3 text-sm font-bold transition ${
                    catOpen ? 'bg-[var(--primary-soft)] text-[var(--primary-hover)]' : 'text-[var(--muted)] hover:bg-[var(--paper)] hover:text-[var(--ink)]'
                  }`}
                >
                  Categories <ChevronDown size={14} className={`transition ${catOpen ? 'rotate-180' : ''}`} />
                </button>
                <CategoryDropdown open={catOpen} onClose={() => setCatOpen(false)} />
              </div>
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
              <button onClick={() => setIsSearchOpen(true)} className="btn-icon md:hidden" aria-label="Search">
                <Search size={18} />
              </button>
              <IconLink href="/wishlist" count={wishlist.length} icon={<Heart size={18} />} />
              <button onClick={() => setIsCartOpen(true)} className="btn-icon relative" aria-label="Open cart">
                <ShoppingCart size={18} />
                {cartCount > 0 && <Badge count={cartCount} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </header>

      <MobileDrawer
        open={mobileOpen}
        pathname={pathname}
        mobileCategories={mobileCategories}
        setMobileCategories={setMobileCategories}
        setMobileOpen={setMobileOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
    </>
  );
}

function NavLink({ link, active }: { link: { label: string; href: string }; active: boolean }) {
  return (
    <Link className={`flex h-10 items-center rounded-lg px-3 text-sm font-bold transition ${active ? 'bg-[var(--primary-soft)] text-[var(--primary-hover)]' : 'text-[var(--muted)] hover:bg-[var(--paper)] hover:text-[var(--ink)]'}`} href={link.href}>
      {link.label}
    </Link>
  );
}

function CategoryDropdown({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.16 }}
          className="absolute right-0 top-full mt-3 w-[360px] rounded-[14px] border border-[var(--line)] bg-white p-2 shadow-[var(--shadow-lift)]"
        >
          <div className="grid grid-cols-2 gap-1">
            {categoryLinks.map(cat => (
              <Link key={cat.href} href={cat.href} onClick={onClose} className="group flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-[var(--primary-soft)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--paper)] text-[var(--primary-hover)]">
                  <cat.icon size={16} strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-[var(--ink)]">{cat.label}</span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--faint)]">{cat.count} items</span>
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IconLink({ href, icon, count }: { href: string; icon: React.ReactNode; count: number }) {
  return (
    <Link href={href} className="btn-icon relative" aria-label="Wishlist">
      {icon}
      {count > 0 && <Badge count={count} />}
    </Link>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-extrabold text-white">
      {count}
    </span>
  );
}

function MobileDrawer({
  open, pathname, mobileCategories, setMobileCategories, setMobileOpen, setIsSearchOpen,
}: {
  open: boolean;
  pathname: string;
  mobileCategories: boolean;
  setMobileCategories: (open: boolean) => void;
  setMobileOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[110] bg-[rgba(15,15,15,0.64)] backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setMobileOpen(false)}
          />
          <motion.aside
            initial={{ x: '-104%', opacity: 0.92 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-104%', opacity: 0.92 }}
            transition={{ type: 'spring', damping: 34, stiffness: 280 }}
            className="fixed inset-y-0 left-0 z-[120] flex w-[min(88vw,380px)] flex-col border-r border-[var(--line)] bg-white shadow-[var(--shadow-lift)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] p-5">
              <div className="flex items-center gap-3">
                <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[10px] border border-[var(--line)] bg-white">
                  <Image src="/logo.png" alt="UMUVUMU Electronic Shop" fill className="object-contain p-1.5" sizes="44px" />
                </span>
                <div>
                  <div className="text-base font-black text-[var(--ink)]">UMUVUMU</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--faint)]">Electronic Shop</div>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="btn-icon"><X size={18} /></button>
            </div>

            <div className="p-4">
              <button onClick={() => { setMobileOpen(false); setIsSearchOpen(true); }} className="flex w-full items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-left text-sm font-bold text-[var(--muted)]">
                <Search size={16} /> Search products
              </button>
            </div>

            <div className="space-y-1 px-3">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className={`flex rounded-lg px-4 py-3 text-sm font-bold transition ${pathname === link.href ? 'bg-[var(--primary-soft)] text-[var(--primary-hover)]' : 'text-[var(--muted)] hover:bg-[var(--paper)] hover:text-[var(--ink)]'}`}>
                  {link.label}
                </Link>
              ))}
              <button onClick={() => setMobileCategories(!mobileCategories)} className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-bold text-[var(--muted)] transition hover:bg-[var(--paper)]">
                Categories <ChevronDown size={14} className={`transition ${mobileCategories ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileCategories && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="grid grid-cols-2 gap-1 px-1 py-2">
                      {categoryLinks.map(cat => (
                        <Link key={cat.href} href={cat.href} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold text-[var(--muted)] hover:bg-[var(--primary-soft)]">
                          <cat.icon size={14} className="text-[var(--primary-hover)]" /> {cat.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-auto border-t border-[var(--line)] bg-[var(--paper)] p-5 text-sm text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">Goico Plaza, Musanze City</p>
              <p className="mt-1">8:00 AM - 9:00 PM</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function AnnouncementCycle() {
  const [idx, setIdx] = useState(0);
  const messages = useMemo(() => announcements, []);

  useEffect(() => {
    const timer = setInterval(() => setIdx(prev => (prev + 1) % messages.length), 4000);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="h-5 overflow-hidden text-center text-xs font-medium">
      <AnimatePresence mode="wait">
        <motion.span key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
          {messages[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
