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
    <section className="relative py-32 px-6 lg:px-12 bg-[#050505]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3 block">Why UC CUT</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
            Why UC CUT Instead of<br />Bigger Electrosurgery Units?
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Designed for the procedures you actually perform every day — without the complexity, cost, or space requirements of large systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group"
            >
              <div className="h-full p-8 bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-cyan-500/25 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 group-hover:bg-cyan-500/15 transition-all duration-300">
                    <benefit.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-[15px]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="p-8 lg:p-10 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl border border-cyan-500/15 text-center">
            <p className="text-lg text-gray-300 leading-relaxed">
              <span className="text-cyan-400 font-semibold">UC CUT isn't trying to replace everything</span> —
              it's designed to handle the <span className="text-white font-medium">specific soft-tissue and gutta-percha tasks</span> you
              encounter daily, with simplicity and precision.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}