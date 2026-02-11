import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: "The vibration feature is a game-changer. It cuts through gutta-percha cleanly without ever pulling the cone out of the canal. It's significantly faster than my old heat carrier.",
    author: "Endodontic Specialist",
    location: "California",
  },
  {
    text: "I use the Bovie tip for gingivectomies almost daily. It heats up instantly and offers incredible control for soft tissue management. A true 3-in-1 device.",
    author: "General Dentist",
    location: "New York",
  },
  {
    text: "Finally, a cordless unit that maintains consistent temperature. The battery life is excellent for a full day of cases, and the tips are durable and easy to autoclave.",
    author: "Dr. R. Chen",
    location: "Clinical Review",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-[#030303] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3 block">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Trusted by Clinicians
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See why dental professionals are upgrading to the UC CUT.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="h-full bg-gray-900/50 backdrop-blur-sm p-8 lg:p-10 rounded-2xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-500">
                {/* Stars */}
                <div className="mb-8 flex items-center gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 leading-relaxed mb-8 text-[15px]">
                  "{item.text}"
                </p>

                {/* Author */}
                <div className="pt-6 border-t border-gray-800">
                  <p className="font-semibold text-white">{item.author}</p>
                  <p className="text-sm text-cyan-400/70">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}