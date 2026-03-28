import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    text: "The vibration feature is a game-changer. It cuts through gutta-percha cleanly without ever pulling the cone out of the canal. Significantly faster than my old heat carrier.",
    author: "Endodontic Specialist",
    location: "California"
  },
  {
    text: "I use the Bovie tip for gingivectomies almost daily. It heats up instantly and offers incredible control for soft tissue management. A true 3-in-1 device.",
    author: "General Dentist",
    location: "New York"
  },
  {
    text: "Finally, a cordless unit that maintains consistent temperature. The battery life is excellent for a full day of cases, and the tips are durable and easy to autoclave.",
    author: "Dr. R. Chen",
    location: "Clinical Review"
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">Trusted by Clinicians</h2>
          <div className="section-divider mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="h-full bg-[#fafaf8] p-8 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 relative group">
                <Quote className="w-7 h-7 text-slate-200 absolute top-7 right-7 group-hover:text-blue-200 transition-colors" />
                <div className="mb-5 flex items-center gap-0.5">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-light">"{item.text}"</p>
                <div className="pt-5 border-t border-slate-200/50">
                  <p className="text-sm font-semibold text-slate-900">{item.author}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}