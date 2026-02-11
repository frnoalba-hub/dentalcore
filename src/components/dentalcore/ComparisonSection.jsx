import React from 'react';
import { motion } from 'framer-motion';
import { Package, Zap, Users, Clock } from 'lucide-react';

const benefits = [
  { icon: Package, title: 'Compact & Lightweight', description: 'At just 1.7 oz, UC CUT is easy to move chairside — no bulky equipment needed.' },
  { icon: Zap, title: 'Focused on Everyday Tasks', description: 'Built specifically for soft-tissue control and gutta-percha work.' },
  { icon: Clock, title: 'Faster Setup', description: 'Get started in seconds. Simple plug-and-use design.' },
  { icon: Users, title: 'Easier for Staff', description: 'Intuitive operation with minimal training required.' },
];

export default function ComparisonSection() {
  return (
    <section className="relative py-28 px-6 lg:px-12 bg-[#0c1117]">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">Why UC CUT</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white/90 tracking-tight mb-4">
            Why UC CUT Instead of<br />Bigger Electrosurgery Units?
          </h2>
          <p className="text-base text-white/30 max-w-2xl mx-auto">
            Designed for procedures you perform every day — without the complexity of large systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex items-start gap-4 p-6 bg-white/[0.02] rounded-2xl border border-white/[0.05] hover:border-amber-500/15 transition-all duration-300"
            >
              <div className="p-2.5 bg-amber-500/[0.08] rounded-xl border border-amber-500/15 flex-shrink-0 group-hover:border-amber-500/25 transition-colors">
                <b.icon className="w-5 h-5 text-amber-400/80" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white/85 mb-1 group-hover:text-amber-300/90 transition-colors">{b.title}</h3>
                <p className="text-sm text-white/30 leading-relaxed">{b.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="p-7 bg-amber-500/[0.03] rounded-2xl border border-amber-500/10 text-center">
            <p className="text-sm text-white/40 leading-relaxed">
              <span className="text-amber-400/70 font-semibold">UC CUT isn't trying to replace everything</span> —
              it handles <span className="text-white/60 font-medium">specific daily tasks</span> with simplicity and precision.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}