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
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-amber-600 font-semibold tracking-[0.15em] text-xs uppercase mb-3 block">Testimonials</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">Trusted by Clinicians</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="h-full bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg hover:border-amber-200 transition-all duration-300 relative">
                <Quote className="w-8 h-8 text-amber-400/20 absolute top-6 right-6" />
                <div className="mb-5 flex items-center gap-0.5">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 text-amber-500 fill-amber-500" />)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">"{item.text}"</p>
                <div className="pt-5 border-t border-gray-200">
                  <p className="text-sm font-semibold text-slate-900">{item.author}</p>
                  <p className="text-xs text-amber-600/70">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}