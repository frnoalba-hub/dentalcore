import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Scissors, Activity, ArrowRight } from 'lucide-react';

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
    <section id="features" className="relative py-32 px-6 lg:px-12 bg-gray-50/50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-600 font-semibold tracking-wider text-sm uppercase mb-2 block">Capabilities</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            3-in-1 Versatility
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            One compact device replacing multiple bulky instruments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-[2rem] p-8 lg:p-10 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-cyan-100/30 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-bl-[2rem] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-7 h-7 text-cyan-600" strokeWidth={2} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-cyan-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-cyan-600 font-medium mb-4">{feature.subtitle}</p>

                  <p className="text-gray-500 leading-relaxed">
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