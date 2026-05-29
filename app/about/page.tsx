'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Truck, Award, Heart, MapPin, MessageCircle } from 'lucide-react';

const values = [
  { icon: Shield, title: "100% Authentic", desc: "Every product is verified genuine. We source directly from authorized distributors and manufacturers worldwide." },
  { icon: Award, title: "Premium Quality", desc: "We only stock products from the world's most trusted electronics brands - Apple, Samsung, Sony, and more." },
  { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery within Musanze. Nationwide delivery across Rwanda within 1-3 business days." },
  { icon: Heart, title: "Customer First", desc: "Our team is available 7 days a week via WhatsApp, phone, or in-store to help you find exactly what you need." },
];

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#E1306C"/></svg>;
}
function FacebookIcon() {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="#1877F2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
}
function LinkedinIcon() {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="#0A66C2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
}

const team = [
  { name: "Gatete David", role: "Founder & CEO", avatar: "GD", social: "https://www.linkedin.com/in/gatete-david-7586a8102" },
  { name: "Sales Team", role: "Product Advisors", avatar: "ST", social: "https://wa.me/250781277413" },
  { name: "Tech Support", role: "After-Sales Service", avatar: "TS", social: "https://wa.me/250781277413" },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-950 py-28 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_30%_40%,rgba(255,103,1,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03] soft-grid-bg" />
        <div className="luxury-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] mb-8"
                style={{ background: 'rgba(255,103,1,0.15)', color: 'rgb(255,120,40)', border: '1px solid rgba(255,103,1,0.25)' }}>
                Our story
              </span>
              <h1 className="text-[clamp(40px,6vw,72px)] font-black text-white mb-8 leading-[1.08] tracking-[-0.02em]" style={{ fontFamily: 'Poppins' }}>
                Rooted in trust.<br />
                <span className="text-orange-500">Powered by technology.</span>
              </h1>
              <p className="text-slate-300 leading-7 text-lg mb-10 font-medium max-w-xl" style={{ fontFamily: 'Inter' }}>
                UMUVUMU Electronic Shop was born from a simple belief: every Rwandan deserves access to genuine, premium electronics at fair prices. Founded in Musanze, we&apos;ve grown to become Rwanda&apos;s most trusted electronics destination.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link href="/shop" className="btn btn-primary rounded-lg px-8 py-4 text-sm font-bold">
                  Shop now
                </Link>
                <a href="https://wa.me/250781277413" target="_blank" rel="noopener noreferrer"
                  className="btn btn-whatsapp rounded-lg px-8 py-4 text-sm font-bold">
                  Contact us
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex justify-center">
              <div className="relative">
                <div className="h-72 w-72 rounded-[32px] flex items-center justify-center border border-orange-600/20 bg-orange-600/5">
                  <Image src="/logo.png" alt="UMUVUMU" width={200} height={200} className="object-contain" />
                </div>
                <motion.div animate={{ y: [-8, 0, -8] }} transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 px-5 py-3 rounded-[12px] text-sm font-bold text-white bg-orange-600 shadow-lg">
                  8+ years
                </motion.div>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 px-5 py-3 rounded-[12px] text-sm font-bold text-white bg-emerald-600 shadow-lg">
                  15K+ customers
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <section className="py-32 bg-white">
        <div className="luxury-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-[clamp(36px,4.5vw,56px)] font-black tracking-[-0.02em]" style={{ fontFamily: 'Poppins' }}>Our core values</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-8 rounded-[20px] text-center group border border-slate-200 hover:-translate-y-1 transition-all duration-300 bg-white">
                <div className="h-12 w-12 rounded-[12px] flex items-center justify-center mx-auto mb-6 bg-orange-100 text-orange-600">
                  <v.icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg" style={{ fontFamily: 'Poppins' }}>{v.title}</h3>
                <p className="text-sm text-slate-600 leading-7" style={{ fontFamily: 'Inter' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-slate-50">
        <div className="luxury-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-[clamp(36px,4.5vw,56px)] font-black tracking-[-0.02em]" style={{ fontFamily: 'Poppins' }}>Meet the team</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, i) => (
              <motion.a key={member.name} href={member.social} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center p-8 rounded-[24px] bg-white text-center group hover:-translate-y-1 transition-all duration-300 w-64 border border-slate-200 shadow-sm">
                <div className="h-16 w-16 rounded-[12px] flex items-center justify-center text-xl font-bold text-white mb-5"
                  style={{ background: 'linear-gradient(135deg, rgb(255,102,1), rgb(229,90,0))' }}>
                  {member.avatar}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-base" style={{ fontFamily: 'Poppins' }}>{member.name}</h3>
                <p className="text-sm text-slate-500" style={{ fontFamily: 'Inter' }}>{member.role}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-24 bg-white">
        <div className="luxury-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-black mb-8 tracking-[-0.02em]" style={{ fontFamily: 'Poppins' }}>Follow us</h2>
            <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
              {[
                { href: "https://www.instagram.com/gatetedavid12/", icon: <InstagramIcon />, label: "Instagram", color: "rgb(225,48,108)" },
                { href: "https://www.facebook.com/devason001", icon: <FacebookIcon />, label: "Facebook", color: "rgb(24,119,242)" },
                { href: "https://www.linkedin.com/in/gatete-david-7586a8102", icon: <LinkedinIcon />, label: "LinkedIn", color: "rgb(10,102,194)" },
                { href: "https://wa.me/250781277413", icon: <MessageCircle size={24} className="text-emerald-600" />, label: "WhatsApp", color: "rgb(37,211,102)" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 rounded-[16px] transition-all hover:scale-105 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50">
                  {s.icon}
                  <span className="text-xs font-bold text-slate-600" style={{ fontFamily: 'Poppins' }}>{s.label}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-600" style={{ fontFamily: 'Inter' }}>
              <MapPin size={16} className="text-orange-600" /> Goico Plaza, Musanze City, Ruhengeri, Rwanda
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
