import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Award } from 'lucide-react';
import { useContentStore } from '../store/contentStore';

export default function AboutSection() {
  const { aboutContent } = useContentStore();

  const iconMap = {
    'Doctor-Focused': Heart,
    'Personal Support': MessageCircle,
    'Curated Excellence': Award,
  };

  return (
    <section id="about" className="relative py-32 px-6 lg:px-12 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-500/3 -skew-x-12 opacity-50 z-0" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3 block">{aboutContent.tagline}</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
            {aboutContent.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="relative mb-20"
        >
          <div className="p-10 lg:p-14 bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-800/60">
            <div className="relative z-10 space-y-6 text-center max-w-3xl mx-auto">
              {aboutContent.paragraphs.map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? "text-xl lg:text-2xl text-gray-300 leading-relaxed font-light" : "text-lg text-gray-400 leading-relaxed"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {aboutContent.values.map((item, i) => {
            const Icon = iconMap[item.title] || Heart;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800/60 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="inline-flex p-4 bg-cyan-500/10 rounded-2xl mb-6 transition-colors duration-300 border border-cyan-500/20 group-hover:bg-cyan-500/15">
                  <Icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}