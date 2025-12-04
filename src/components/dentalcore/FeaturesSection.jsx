import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Scissors, Activity } from 'lucide-react';

const features = [
  {
    icon: Flame,
    title: 'Gum Cauterization & Gingivectomy',
    description: 'Cauterize gum tissue and perform small gingivectomies with precision using a Bovie-style tip. Control minor bleeding and trim soft tissue around crown margins or restorative areas.',
  },
  {
    icon: Scissors,
    title: 'Gutta-Percha Cutting',
    description: 'Cut gutta-percha quickly and cleanly with heat + vibration. The sonic vibration prevents the cone from being pulled out of the canal while the localized heat provides efficient cutting.',
  },
  {
    icon: Activity,
    title: 'Vertical Condensation / Down-Packing',
    description: 'Perform vertical condensation and down-packing during root canal treatments using F / FM tips. Achieve precise, controlled obturation with ease.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6 lg:px-12 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            What UC CUT Does
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Three essential functions in one compact, chairside device — built for speed, precision, and convenience.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="group relative h-full p-8 bg-white rounded-2xl border border-gray-200 hover:border-cyan-300 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-100/50">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-cyan-50/0 group-hover:from-cyan-50 group-hover:to-transparent rounded-2xl transition-all duration-500" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 inline-flex">
                    <div className="p-4 bg-gray-50 group-hover:bg-cyan-50 rounded-xl border border-gray-200 group-hover:border-cyan-200 transition-all duration-500">
                      <feature.icon className="w-8 h-8 text-cyan-600 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom emphasis */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-500">
            Chairside <span className="text-gray-900 font-medium">convenience</span>, 
            {' '}<span className="text-gray-900 font-medium">speed</span>, and 
            {' '}<span className="text-gray-900 font-medium">control</span> — all in a lightweight, ergonomic design.
          </p>
        </motion.div>
      </div>
    </section>
  );
}