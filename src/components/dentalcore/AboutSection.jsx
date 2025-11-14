import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Award } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent">
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About DentalCore
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8" />
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="relative mb-12"
        >
          <div className="p-10 lg:p-14 bg-gradient-to-br from-gray-900/90 to-gray-900/50 rounded-3xl border border-gray-800 shadow-2xl">
            {/* Decorative accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent rounded-3xl" />
            
            <div className="relative z-10 space-y-6">
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                DentalCore is a <span className="text-white font-medium">small, dentist-focused startup</span> led by 
                Cisco in California. We're dedicated to bringing practical, high-value products like the 
                <span className="text-cyan-400 font-medium"> UC CUT by EPDENT</span> directly to local dental practices.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                Unlike large distributors, we prioritize <span className="text-white font-medium">personal support</span> and 
                <span className="text-white font-medium"> quick responses</span>. Our approach is simple: start with local practices, 
                build relationships, and expand thoughtfully as we grow.
              </p>

              <p className="text-lg text-gray-400 leading-relaxed">
                When you work with DentalCore, you're not just getting a product — you're getting a partner who 
                understands the day-to-day challenges of running a practice and is committed to your success.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core values */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center p-6"
          >
            <div className="inline-flex p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/30 mb-4">
              <Heart className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Doctor-Focused</h3>
            <p className="text-sm text-gray-400">
              Built for dentists, by people who care about dentistry
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center p-6"
          >
            <div className="inline-flex p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/30 mb-4">
              <MessageCircle className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Personal Support</h3>
            <p className="text-sm text-gray-400">
              Direct access to our team, fast responses when you need help
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center p-6"
          >
            <div className="inline-flex p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/30 mb-4">
              <Award className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">High-Value Products</h3>
            <p className="text-sm text-gray-400">
              Carefully selected equipment that delivers real clinical value
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}