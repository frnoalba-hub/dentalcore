import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Scissors, Activity } from 'lucide-react';
import { featuresContent } from './contentConfig';

const iconMap = {
  Flame,
  Scissors,
  Activity
};

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
          <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-2 block">{featuresContent.badge}</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
            {featuresContent.sectionTitle}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            {featuresContent.sectionSubtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {featuresContent.features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="relative h-full bg-gray-900 rounded-[2rem] p-8 lg:p-10 border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-[2rem] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-cyan-500/20">
                    <Icon className="w-7 h-7 text-cyan-400" strokeWidth={2} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-cyan-400 font-medium mb-4">{feature.subtitle}</p>

                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="relative h-full bg-gray-900 rounded-[2rem] p-8 lg:p-10 border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-[2rem] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-cyan-500/20">
                    <feature.icon className="w-7 h-7 text-cyan-400" strokeWidth={2} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-cyan-400 font-medium mb-4">{feature.subtitle}</p>

                  <p className="text-gray-400 leading-relaxed">
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