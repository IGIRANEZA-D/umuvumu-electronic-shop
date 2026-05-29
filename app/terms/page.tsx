'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  const sections = [
    { title: "Acceptance of Terms", content: "By accessing and using UMUVUMU Electronic Shop, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our platform." },
    { title: "Products and Pricing", content: "All products listed on our platform are subject to availability. Prices are displayed in Rwandan Francs (RWF) and may change without notice. We reserve the right to cancel orders if pricing errors occur." },
    { title: "Orders and Payment", content: "Orders can be placed through our website or via WhatsApp. We accept MTN MoMo, Airtel Money, Bank Transfer, and cash payments. Orders are confirmed upon payment receipt." },
    { title: "Delivery Policy", content: "Delivery times are estimates and not guaranteed. UMUVUMU is not responsible for delays caused by courier services, weather, or circumstances beyond our control. Risk of loss passes to the customer upon delivery." },
    { title: "Returns and Refunds", content: "Products may be returned within 7 days of purchase in original, unopened condition. Defective products are covered under the manufacturer's warranty. Custom orders and opened software are non-refundable." },
    { title: "Intellectual Property", content: "All content on this platform including logos, images, and text is the property of UMUVUMU Electronic Shop. Unauthorized reproduction or distribution is prohibited." },
    { title: "Limitation of Liability", content: "UMUVUMU shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform or products purchased from us." },
    { title: "Contact", content: "For questions about these terms, contact us at info@umuvumu.rw or via WhatsApp at +250 781 277 413. We're available every day, 8AM to 9PM." },
  ];

  return (
    <div style={{ background: '#F8F9FB', minHeight: '100vh' }}>
      <div style={{ background: '#0A0A0A' }} className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-5xl font-black text-white" style={{ fontFamily: 'Poppins', letterSpacing: 0 }}>Terms of Service</h1>
          <p className="text-gray-400 mt-3" style={{ fontFamily: 'Inter' }}>Last updated: January 2025</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-6">
        {sections.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="bg-white p-8 rounded-2xl" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0 mt-0.5"
                style={{ background: '#FF6701', fontFamily: 'Poppins' }}>{i + 1}</span>
              <div>
                <h2 className="text-xl font-black mb-2" style={{ fontFamily: 'Poppins' }}>{s.title}</h2>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter' }}>{s.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
