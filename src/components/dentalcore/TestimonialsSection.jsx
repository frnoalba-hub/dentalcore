import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { text: "The vibration feature is a game-changer. It cuts through gutta-percha cleanly without ever pulling the cone out of the canal. Significantly faster than my old heat carrier.", author: "Endodontic Specialist", location: "California" },
  { text: "I use the Bovie tip for gingivectomies almost daily. It heats up instantly and offers incredible control for soft tissue management. A true 3-in-1 device.", author: "General Dentist", location: "New York" },
  { text: "Finally, a cordless unit that maintains consistent temperature. The battery life is excellent for a full day of cases, and the tips are durable and easy to autoclave.", author: "Dr. R. Chen", location: "Clinical Review" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-28 bg-[#0c1117] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/[0.02] rounded-full blur-[120px]" />
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">Testimonials</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white/90 tracking-tight">Trusted by Clinicians</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="h-full bg-white/[0.02] p-7 rounded-2xl border border-white/[0.05] hover:border-amber-500/15 transition-all duration-300">
                <div className="mb-5 flex items-center gap-0.5">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-[14px] text-white/40 leading-relaxed mb-6">"{item.text}"</p>
                <div className="pt-5 border-t border-white/[0.04]">
                  <p className="text-sm font-semibold text-white/75">{item.author}</p>
                  <p className="text-xs text-amber-400/40">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}