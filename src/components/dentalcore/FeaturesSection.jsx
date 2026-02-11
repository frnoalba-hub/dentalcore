import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Scissors, Activity } from 'lucide-react';

const features = [
  {
    icon: Flame,
    title: 'Gum Cauterization',
    subtitle: '& Gingivectomy',
    description: 'Cauterize gum tissue and perform small gingivectomies with precision using a Bovie-style tip. Control minor bleeding and trim soft tissue around crown margins.',
  },
  {
    icon: Scissors,
    title: 'Gutta-Percha Cutting',
    subtitle: 'with Sonic Vibration',
    description: 'Cut gutta-percha quickly and cleanly. The sonic vibration prevents the cone from being pulled out of the canal while localized heat ensures efficient cutting.',
  },
  {
    icon: Activity,
    title: 'Vertical Condensation',
    subtitle: '/ Down-Packing',
    description: 'Perform vertical condensation during root canal treatments using F / FM tips. Achieve precise, controlled obturation with ease.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 px-6 lg:px-12 bg-[#0c1117]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">Capabilities</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white/90 tracking-tight">
            3-in-1 Versatility
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.08 }}
              className="group"
            >
              <div className="relative h-full bg-white/[0.02] rounded-2xl p-8 border border-white/[0.05] hover:border-amber-500/20 hover:bg-white/[0.035] transition-all duration-500">
                <div className="w-11 h-11 bg-amber-500/[0.08] rounded-xl flex items-center justify-center mb-6 border border-amber-500/15 group-hover:border-amber-500/25 transition-colors">
                  <feature.icon className="w-5 h-5 text-amber-400/80" strokeWidth={2} />
                </div>

                <h3 className="text-lg font-semibold text-white/90 mb-0.5 group-hover:text-amber-300/90 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-amber-400/50 font-medium mb-4">{feature.subtitle}</p>
                <p className="text-[14px] text-white/35 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}