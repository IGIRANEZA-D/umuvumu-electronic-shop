'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'Support', href: '/support' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:rotate-12">
            U
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">
            Umuvumu
          </span>
        </Link>

        {/* Desktop Links - "The Distance" (space-x-12) */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="relative group text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <motion.span 
                whileHover={{ y: -2 }} 
                className="inline-block"
              >
                {link.name}
              </motion.span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-6">
          {/* Search Icon */}
          <button className="text-slate-500 hover:text-indigo-600 transition-colors p-1">
            <Search size={20} />
          </button>

          {/* User Icon */}
          <button className="text-slate-500 hover:text-indigo-600 transition-colors p-1">
            <User size={20} />
          </button>

          {/* Cart Icon with badge */}
          <button className="text-slate-500 hover:text-indigo-600 transition-colors p-1 relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
