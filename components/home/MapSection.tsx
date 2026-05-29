'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';

const info = [
  { icon: MapPin, title: 'Store location', content: 'Goico Plaza, Musanze City\nRuhengeri, Rwanda\nPlus Code: FJRV+63H' },
  { icon: Phone, title: 'Direct contact', content: '+250 781 277 413\ninfo@umuvumu.rw' },
  { icon: Clock, title: 'Business hours', content: 'Monday - Sunday\n8:00 AM - 9:00 PM\nOpen every day' },
];

export default function MapSection() {
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=FJRV%2B63H,+RN4,+Musanze,+Ruhengeri,+Rwanda';
  const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=FJRV%2B63H,+RN4,+Musanze,+Ruhengeri,+Rwanda';

  return (
    <section className="bg-white py-24">
      <div className="luxury-container">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,680px)_minmax(280px,520px)] lg:items-end lg:justify-between">
          <div>
            <span className="section-eyebrow">
              <MapPin size={13} /> Visit us
            </span>
            <h2 className="section-title mt-5">Find us in Musanze.</h2>
          </div>
          <p className="section-copy lg:ml-auto">
            Visit our store, check availability on WhatsApp, or order online for nationwide delivery.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[0.36fr_0.64fr]">
          <div className="space-y-4">
            {info.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="ui-card p-5">
                <div className="mb-4 flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--primary-soft)] text-[var(--primary-hover)]">
                    <item.icon size={19} strokeWidth={1.8} />
                  </span>
                  <p className="pt-0.5 font-extrabold text-[var(--ink)]">{item.title}</p>
                </div>
                <p className="whitespace-pre-line text-sm leading-7 text-[var(--muted)]">{item.content}</p>
              </motion.div>
            ))}

            <div className="grid grid-cols-2 gap-3 pt-1">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-base btn-primary">
                <Navigation size={16} /> Directions
              </a>
              <a href="https://wa.me/250781277413" target="_blank" rel="noopener noreferrer" className="btn-base btn-whatsapp">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative min-h-[480px] overflow-hidden rounded-[14px] border border-[var(--line)] bg-[var(--surface-alt)] shadow-[var(--shadow-soft)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.3947!2d29.6334!3d-1.4999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd0782c64f71a5%3A0x1!2sGoico+Plaza%2C+Musanze%2C+Rwanda!5e0!3m2!1sen!2srw!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="UMUVUMU Electronic Shop Location"
            />
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-base absolute bottom-5 right-5 bg-white text-[var(--ink)] shadow-[var(--shadow-soft)] hover:bg-[var(--primary)] hover:text-white">
              <MapPin size={16} /> View maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
