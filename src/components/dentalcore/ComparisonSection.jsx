import React from 'react';
import { motion } from 'framer-motion';
import { Package, Zap, Users, Clock } from 'lucide-react';

const benefits = [
  {
    icon: Package,
    title: 'Compact & Lightweight',
    description: 'At just 1.7 oz, UC CUT is easy to move chairside — no bulky equipment or dedicated space required.',
  },
  {
    icon: Zap,
    title: 'Focused on Everyday Tasks',
    description: 'Built specifically for soft-tissue control and gutta-percha work, not an overbuilt multi-station system.',
  },
  {
    icon: Clock,
    title: 'Faster Setup',
    description: 'Get started in seconds. Simple plug-and-use design means less time configuring, more time treating.',
  },
  {
    icon: Users,
    title: 'Easier for Staff',
    description: 'Intuitive operation with minimal training required. Your entire team can use it confidently.',
  },
];

export default function ComparisonSection() {
  return (
    <section className="relative py-32 px-6 lg:px-12 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Why UC CUT Instead of<br />Bigger Electrosurgery Units?
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Designed for the procedures you actually perform every day — without the complexity, cost, or space requirements of large systems.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="h-full p-8 bg-white rounded-2xl border border-gray-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 p-3 bg-cyan-50 rounded-xl border border-cyan-200 group-hover:bg-cyan-100 group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="w-6 h-6 text-cyan-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom emphasis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative"
        >
          <div className="p-8 lg:p-10 bg-gradient-to-br from-cyan-50 to-white rounded-2xl border border-cyan-200 text-center shadow-sm">
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              <span className="text-cyan-600 font-semibold">UC CUT isn't trying to replace everything</span> — 
              it's designed to handle the <span className="text-gray-900 font-medium">specific soft-tissue and gutta-percha tasks</span> you 
              encounter daily, with simplicity and precision.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}