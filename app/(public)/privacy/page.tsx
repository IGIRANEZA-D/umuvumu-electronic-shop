'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  const sections = [
    { title: "Information We Collect", content: "When you use UMUVUMU Electronic Shop, we may collect your name, email address, phone number, and delivery address to process your orders. We also collect information about products you view and purchase to improve your shopping experience." },
    { title: "How We Use Your Information", content: "We use your information to process orders and deliver products, send order confirmations and delivery updates via WhatsApp or email, provide customer support, and improve our platform and product recommendations." },
    { title: "Information Sharing", content: "We do not sell your personal information to third parties. We only share your information with delivery partners to fulfill your orders, and with payment processors to process transactions securely." },
    { title: "Data Security", content: "We take data security seriously. All sensitive information is encrypted and we follow industry best practices to protect your personal data from unauthorized access, alteration, or disclosure." },
    { title: "Cookies", content: "We use cookies to improve your browsing experience, remember your cart items, and analyze site traffic. You can control cookie settings in your browser preferences." },
    { title: "Contact Us", content: "If you have questions about this privacy policy or how we handle your data, please contact us at info@umuvumu.rw or via WhatsApp at +250 781 277 413." },
  ];

  return (
    <div style={{ background: '#F8F9FB', minHeight: '100vh' }}>
      <div style={{ background: '#0A0A0A' }} className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-5xl font-black text-white" style={{ fontFamily: 'Poppins', letterSpacing: 0 }}>Privacy Policy</h1>
          <p className="text-gray-400 mt-3" style={{ fontFamily: 'Inter' }}>Last updated: January 2025</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8">
        {sections.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="bg-white p-8 rounded-2xl" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <h2 className="text-xl font-black mb-3" style={{ fontFamily: 'Poppins' }}>{s.title}</h2>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter' }}>{s.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
