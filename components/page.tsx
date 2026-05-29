'use client';

import { Package, Truck, CheckCircle2, Clock, MapPin, Box } from 'lucide-react';
import { formatPrice } from '@/lib/data';

const statusSteps = [
  { id: 1, label: 'Order Placed', date: 'Oct 24, 2023', icon: Clock, color: 'text-blue-500', completed: true },
  { id: 2, label: 'Processing', date: 'Oct 24, 2023', icon: Box, color: 'text-orange-500', completed: true },
  { id: 3, label: 'Shipped', date: 'Oct 25, 2023', icon: Truck, color: 'text-purple-500', completed: true },
  { id: 4, label: 'Out for Delivery', date: 'Expected Today', icon: Package, color: 'text-blue-600', completed: false, current: true },
  { id: 5, label: 'Delivered', date: '--', icon: CheckCircle2, color: 'text-emerald-500', completed: false },
];

export default function OrderTrackingPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Order #UMV-88291</h1>
          <p className="text-slate-500 font-medium">Placed on October 24, 2023 • 4 Items</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800">
          Download Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tracking Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="mb-8 text-xl font-bold text-slate-900">Delivery Status</h2>
            <div className="relative space-y-8">
              {statusSteps.map((step, idx) => (
                <div key={step.id} className="relative flex items-start gap-4">
                  {/* Line connector */}
                  {idx !== statusSteps.length - 1 && (
                    <div className={`absolute left-5 top-10 h-full w-0.5 ${step.completed ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                  )}
                  
                  <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white shadow-sm ${
                    step.completed ? 'bg-emerald-500 text-white' : step.current ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <step.icon size={18} />
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-bold ${step.current ? 'text-blue-600' : 'text-slate-900'}`}>{step.label}</p>
                      <span className="text-xs font-bold text-slate-400 uppercase">{step.date}</span>
                    </div>
                    {step.current && (
                      <p className="mt-1 text-sm text-slate-500">Your courier is currently 2.4km away from your location.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping Address Card */}
          <section className="rounded-3xl border border-slate-100 bg-slate-50 p-8">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-slate-400" />
              <h3 className="font-bold text-slate-900">Shipping Address</h3>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Jean-Pierre Habimana<br />
              Goico Plaza, 2nd Floor, Room 4<br />
              Musanze City, Northern Province<br />
              Rwanda, +250 781 277 413
            </p>
          </section>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Order Summary</h3>
            <div className="space-y-3 border-b border-slate-100 pb-4 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="text-slate-900 font-bold">{formatPrice(1299000)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Shipping</span>
                <span className="text-emerald-600 font-bold uppercase text-xs">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Taxes (VAT)</span>
                <span className="text-slate-900 font-bold">{formatPrice(233820)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-900 font-black">Total Amount</span>
              <span className="text-2xl font-black text-blue-600">{formatPrice(1532820)}</span>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4 border border-blue-100">
              <p className="text-xs font-bold text-blue-700 uppercase mb-1">Payment Method</p>
              <p className="text-sm font-bold text-blue-900 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                MTN Mobile Money
              </p>
            </div>
          </section>

          <div className="rounded-3xl bg-slate-900 p-6 text-white overflow-hidden relative group">
            <div className="relative z-10">
              <p className="text-sm font-bold opacity-80 mb-1">Need help with this order?</p>
              <h4 className="text-lg font-black mb-4">Contact Support</h4>
              <button className="w-full rounded-xl bg-white py-3 text-sm font-black text-slate-900 transition-transform active:scale-95">
                Chat with us
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </main>
  );
}
