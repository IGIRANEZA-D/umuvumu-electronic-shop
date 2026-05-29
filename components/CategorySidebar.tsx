'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/lib/data';
import CategoryIcon from './CategoryIcon';
import { ChevronRight } from 'lucide-react';

export default function CategorySidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 px-2">
        <h2 className="text-lg font-bold text-slate-900">Categories</h2>
        <p className="text-xs text-slate-500">Find what you need</p>
      </div>
      
      <nav className="space-y-1">
        {categories.map((category) => {
          const isActive = pathname === `/category/${category.id}`;
          
          return (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className={`group flex items-center justify-between rounded-xl px-3 py-2.5 transition-all hover:bg-slate-50 ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${category.gradient} text-white shadow-sm transition-transform group-hover:scale-110`}>
                  <CategoryIcon name={category.icon} size={16} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold tracking-tight">
                  {category.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-500">{category.count}</span>
                <ChevronRight size={14} className={`transition-transform group-hover:translate-x-0.5 ${isActive ? 'text-blue-400' : 'text-slate-300'}`} />
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}