import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    text: "The vibration feature is a game-changer. It cuts through gutta-percha cleanly without ever pulling the cone out of the canal. It’s significantly faster than my old heat carrier.",
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
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Clinicians
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            See why dental professionals are upgrading to the UC CUT for their endodontic and soft tissue procedures.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-6 flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-cyan-100 mb-4" />
              
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "{item.text}"
              </p>
              
              <div>
                <p className="font-bold text-gray-900">{item.author}</p>
                <p className="text-sm text-cyan-600">{item.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}