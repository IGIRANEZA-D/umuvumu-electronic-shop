'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import toast from 'react-hot-toast';

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="#E1306C" /></svg>;
}
function FacebookIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
}
function LinkedinIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="#0A66C2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
}

const faqs = [
  { q: "Do you sell genuine/original products?", a: "Absolutely. Every product sold at UMUVUMU Electronic Shop is 100% genuine and original. We source directly from authorized distributors and manufacturers. All products come with manufacturer warranty." },
  { q: "What is your delivery policy?", a: "We offer same-day delivery within Musanze City for orders placed before 2PM. For other parts of Rwanda, we deliver within 1-3 business days via trusted courier partners. Delivery fees vary by location." },
  { q: "Can I return a product if I'm not satisfied?", a: "Yes. We offer a 7-day return policy on all products in original, unopened condition. For defective items, we offer exchange or full refund within 30 days of purchase." },
  { q: "What payment methods do you accept?", a: "We accept Mobile Money (MTN MoMo, Airtel Money), Bank Transfer, Cash on Delivery (Musanze area), and card payments. Payment plans available for select items." },
  { q: "Do products come with warranty?", a: "All products come with manufacturer's warranty ranging from 6 months to 2 years depending on the product. We also offer extended warranty packages for peace of mind." },
  { q: "How can I contact you for support?", a: "Our team is available via WhatsApp (+250 781 277 413), Instagram, Facebook, and in-store at Goico Plaza, Musanze City. We're open every day of the week." },
];

const contactItems = [
  { icon: MessageCircle, title: "WhatsApp", content: "+250 781 277 413", link: "https://wa.me/250781277413" },
  { icon: Phone, title: "Phone", content: "+250 781 277 413", link: "tel:+250781277413" },
  { icon: MapPin, title: "Location", content: "Goico Plaza, Musanze City\nRuhengeri, Rwanda", link: "https://maps.google.com/?q=Musanze+Rwanda" },
  { icon: Mail, title: "Email", content: "info@umuvumu.rw", link: "mailto:info@umuvumu.rw" },
  { icon: Clock, title: "Hours", content: "Open every day\n8:00 AM - 9:00 PM", link: null },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-[12px] border border-[var(--line)] bg-white">
      <button onClick={() => setOpen(p => !p)} className="flex w-full items-center justify-between p-5 text-left transition hover:bg-[var(--paper)]">
        <span className="pr-4 text-sm font-extrabold text-[var(--ink)]">{q}</span>
        <ChevronDown size={19} className={`shrink-0 text-[var(--primary-hover)] transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-[var(--line)]">
            <p className="px-5 py-5 text-sm leading-7 text-[var(--muted)]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const msg = encodeURIComponent(`Hello UMUVUMU! My name is ${form.name}.\n\nMessage: ${form.message}\n\nEmail: ${form.email}\nPhone: ${form.phone}`);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll respond via WhatsApp shortly.", { duration: 4000, style: { borderRadius: '12px' } });
      setForm({ name: '', email: '', phone: '', message: '' });
      window.open(`https://wa.me/250781277413?text=${msg}`, '_blank');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <section className="bg-[var(--dark)] py-20">
        <div className="luxury-container text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-[clamp(36px,5vw,60px)] font-extrabold leading-tight text-white">Get in touch</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/62">We&apos;re here 7 days a week - reach us on WhatsApp, phone, or visit our store</p>
          </motion.div>
        </div>
      </section>

      <div className="luxury-container py-20">
        <div className="mb-24 grid gap-10 lg:grid-cols-[0.36fr_0.64fr]">
          <div>
            <h2 className="mb-7 text-2xl font-extrabold">Contact information</h2>
            <div className="space-y-3">
              {contactItems.map((item, index) => {
                const Inner = (
                  <>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--primary-soft)] text-[var(--primary-hover)]">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--faint)]">{item.title}</p>
                      <p className="whitespace-pre-line text-sm font-semibold leading-6 text-[var(--muted)]">{item.content}</p>
                    </div>
                  </>
                );
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }}>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="ui-card flex items-start gap-4 p-5 transition hover:border-[var(--line-strong)] hover:bg-white">
                        {Inner}
                      </a>
                    ) : (
                      <div className="ui-card flex items-start gap-4 p-5">{Inner}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-5 flex gap-3">
              {[
                { href: "https://www.instagram.com/gatetedavid12/", icon: <InstagramIcon /> },
                { href: "https://www.facebook.com/devason001", icon: <FacebookIcon /> },
                { href: "https://www.linkedin.com/in/gatete-david-7586a8102", icon: <LinkedinIcon /> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--line)] bg-white transition hover:-translate-y-0.5 hover:border-[var(--line-strong)]">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="ui-card p-6 sm:p-8">
            <h2 className="mb-7 text-2xl font-extrabold">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" required value={form.name} onChange={value => setForm(p => ({ ...p, name: value }))} placeholder="Jean Kayiranga" />
                <Field label="Email address" type="email" value={form.email} onChange={value => setForm(p => ({ ...p, email: value }))} placeholder="jean@example.com" />
              </div>
              <Field label="Phone number" type="tel" value={form.phone} onChange={value => setForm(p => ({ ...p, phone: value }))} placeholder="+250 7XX XXX XXX" />
              <div>
                <label className="mb-2 block text-sm font-extrabold text-[var(--ink)]">Message <span className="text-[var(--primary-hover)]">*</span></label>
                <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us how we can help..." required rows={5} className="w-full resize-none rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)]" />
              </div>
              <button type="submit" disabled={sending} className="btn-base w-full bg-emerald-600 py-4 text-white hover:bg-emerald-700 disabled:opacity-70">
                {sending ? <><div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Sending...</> : <><Send size={18} /> Send via WhatsApp</>}
              </button>
              <p className="text-center text-xs text-[var(--faint)]">This will open WhatsApp with your message pre-filled</p>
            </form>
          </div>
        </div>

        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <h2 className="section-title mx-auto">Frequently asked questions</h2>
          </motion.div>
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', required = false }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-extrabold text-[var(--ink)]">
        {label} {required && <span className="text-[var(--primary-hover)]">*</span>}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required} className="w-full rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)]" />
    </div>
  );
}
