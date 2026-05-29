'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, List, ChevronDown, X, Search } from 'lucide-react';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/shop/ProductCard';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
];

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under RWF 100K', min: 0, max: 100000 },
  { label: 'RWF 100K – 500K', min: 100000, max: 500000 },
  { label: 'RWF 500K – 1M', min: 500000, max: 1000000 },
  { label: 'Over RWF 1M', min: 1000000, max: Infinity },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat') || '';
  const qParam = searchParams.get('q') || '';

  const [selectedCat, setSelectedCat] = useState(catParam);
  const [searchQ, setSearchQ] = useState(qParam);
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [gridView, setGridView] = useState<'grid' | 'list'>('grid');

  let filtered = [...products];

  if (selectedCat) {
    filtered = filtered.filter(p => p.category === selectedCat);
  }
  if (searchQ) {
    const q = searchQ.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
  const range = priceRanges[priceRange];
  filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  const activeCat = categories.find(c => c.id === selectedCat);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero bar */}
      <div className="bg-slate-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-[clamp(32px,5vw,56px)] font-black text-white mb-3 tracking-[-0.02em]" style={{ fontFamily: 'Poppins' }}>
              {activeCat ? activeCat.name : searchQ ? `Results for "${searchQ}"` : 'All Products'}
            </h1>
            <p className="text-slate-400 font-medium" style={{ fontFamily: 'Inter' }}>
              {filtered.length} products available • Authentic • Best prices
            </p>
          </motion.div>
        </div>
      </div>

      <div className="luxury-container py-12">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search products..."
                className="pl-10 pr-4 py-2.5 rounded-[12px] text-sm outline-none border border-slate-200 bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
              />
              {searchQ && (
                <button onClick={() => setSearchQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(p => !p)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-sm font-bold transition-all border"
              style={{
                background: showFilters ? 'rgb(255,102,1)' : 'white',
                color: showFilters ? 'white' : 'rgb(51,51,51)',
                borderColor: showFilters ? 'rgb(255,102,1)' : 'rgb(226,232,240)',
                fontFamily: 'Poppins'
              }}>
              <SlidersHorizontal size={16} />
              Filters
            </button>

            {/* Active cat chip */}
            {selectedCat && (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold border border-orange-200 bg-orange-50 text-orange-600" style={{ fontFamily: 'Poppins' }}>
                {activeCat?.name}
                <button onClick={() => setSelectedCat('')} className="hover:text-orange-700"><X size={14} /></button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-[12px] text-sm font-medium outline-none cursor-pointer border border-slate-200 bg-white focus:border-orange-500 transition-all"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Grid/List toggle */}
            <div className="flex items-center rounded-[10px] overflow-hidden border border-slate-200 bg-white">
              <button
                onClick={() => setGridView('grid')}
                className="p-2.5 transition-colors"
                style={{ background: gridView === 'grid' ? 'rgb(255,102,1)' : 'transparent', color: gridView === 'grid' ? 'white' : 'rgb(148,163,184)' }}>
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setGridView('list')}
                className="p-2.5 transition-colors border-l border-slate-200"
                style={{ background: gridView === 'list' ? 'rgb(255,102,1)' : 'transparent', color: gridView === 'list' ? 'white' : 'rgb(148,163,184)' }}>
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-slate-50 rounded-[18px] p-8 border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Categories */}
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: 'Poppins' }}>Category</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCat('')}
                        className="px-4 py-2 rounded-full text-xs font-bold transition-all border"
                        style={{
                          background: !selectedCat ? 'rgb(255,102,1)' : 'white',
                          color: !selectedCat ? 'white' : 'rgb(100,116,139)',
                          borderColor: !selectedCat ? 'rgb(255,102,1)' : 'rgb(226,232,240)',
                          fontFamily: 'Poppins'
                        }}>
                        All
                      </button>
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCat(cat.id)}
                          className="px-4 py-2 rounded-full text-xs font-bold transition-all border"
                          style={{
                            background: selectedCat === cat.id ? 'rgb(255,102,1)' : 'white',
                            color: selectedCat === cat.id ? 'white' : 'rgb(100,116,139)',
                            borderColor: selectedCat === cat.id ? 'rgb(255,102,1)' : 'rgb(226,232,240)',
                            fontFamily: 'Poppins'
                          }}>
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price range */}
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: 'Poppins' }}>Price Range</p>
                    <div className="flex flex-wrap gap-2">
                      {priceRanges.map((range, i) => (
                        <button
                          key={range.label}
                          onClick={() => setPriceRange(i)}
                          className="px-4 py-2 rounded-full text-xs font-bold transition-all border"
                          style={{
                            background: priceRange === i ? 'rgb(255,102,1)' : 'white',
                            color: priceRange === i ? 'white' : 'rgb(100,116,139)',
                            borderColor: priceRange === i ? 'rgb(255,102,1)' : 'rgb(226,232,240)',
                            fontFamily: 'Poppins'
                          }}>
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-black text-slate-900 mb-3" style={{ fontFamily: 'Poppins' }}>No products found</h3>
            <p className="text-slate-600 mb-8 font-medium" style={{ fontFamily: 'Inter' }}>Try adjusting your filters or search</p>
            <button onClick={() => { setSelectedCat(''); setSearchQ(''); setPriceRange(0); }}
              className="btn btn-primary rounded-[14px] px-6 py-3 text-sm font-bold">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${gridView === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1'}`}>
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
    </div>}>
      <ShopContent />
    </Suspense>
  );
}
