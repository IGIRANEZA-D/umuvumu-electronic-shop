'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0A0A0A' }}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="text-9xl font-black mb-4" style={{
            fontFamily: 'Poppins',
            background: 'linear-gradient(135deg, #FF6701, #FF8C42)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            404
          </div>
          <h1 className="text-3xl font-black text-white mb-3" style={{ fontFamily: 'Poppins' }}>
            Page Not Found
          </h1>
          <p className="text-gray-400 mb-10 max-w-sm mx-auto" style={{ fontFamily: 'Inter' }}>
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-sm transition-all hover:scale-105"
              style={{ background: '#FF6701', fontFamily: 'Poppins', boxShadow: '0 6px 24px rgba(255,103,1,0.3)' }}>
              <Home size={16} /> Go Home
            </Link>
            <Link href="/shop"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-sm transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Poppins' }}>
              <ShoppingBag size={16} /> Browse Shop
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
