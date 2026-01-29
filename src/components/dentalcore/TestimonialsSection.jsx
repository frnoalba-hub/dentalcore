import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { testimonialsContent } from './contentConfig';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {testimonialsContent.sectionTitle}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {testimonialsContent.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsContent.testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all"
            >
              <div className="mb-6 flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-cyan-500/20 mb-4" />
              
              <p className="text-gray-300 italic mb-6 leading-relaxed">
                "{item.text}"
              </p>
              
              <div>
                <p className="font-bold text-white">{item.author}</p>
                <p className="text-sm text-cyan-400">{item.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}