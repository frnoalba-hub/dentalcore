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
    <section id="features" className="relative py-32 px-6 lg:px-12 bg-[#050505]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3 block">Capabilities</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white tracking-tight">
            3-in-1 Versatility
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            One compact device replacing multiple bulky instruments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="relative h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-gray-800/60 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-[2rem] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500 border border-cyan-500/20">
                    <feature.icon className="w-7 h-7 text-cyan-400" strokeWidth={2} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-base text-cyan-400/70 font-medium mb-4">{feature.subtitle}</p>

                  <p className="text-gray-400 leading-relaxed text-[15px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}