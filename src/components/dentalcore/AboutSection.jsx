import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Award } from 'lucide-react';
import { useContentStore } from '../store/contentStore';

export default function AboutSection() {
  const { aboutContent } = useContentStore();
  const iconMap = { 'Doctor-Focused': Heart, 'Personal Support': MessageCircle, 'Curated Excellence': Award };

  return (
    <section id="about" className="relative py-28 px-6 lg:px-12 bg-[#0c1117] overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">{aboutContent.tagline}</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white/90 tracking-tight mb-4">{aboutContent.title}</h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-amber-500 to-amber-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mb-16">
          <div className="p-8 lg:p-12 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
            <div className="space-y-5 text-center max-w-2xl mx-auto">
              {aboutContent.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-lg text-white/45 leading-relaxed font-light" : "text-base text-white/30 leading-relaxed"}>{p}</p>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {aboutContent.values.map((item, i) => {
            const Icon = iconMap[item.title] || Heart;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }} className="group bg-white/[0.02] p-7 rounded-2xl border border-white/[0.05] hover:border-amber-500/15 transition-all duration-300">
                <div className="inline-flex p-3.5 bg-amber-500/[0.06] rounded-xl mb-5 border border-amber-500/10 group-hover:border-amber-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-amber-400/70" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-white/85">{item.title}</h3>
                <p className="text-sm text-white/30 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}