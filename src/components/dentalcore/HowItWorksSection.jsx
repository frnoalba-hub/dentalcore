import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Waves, Target, Gauge, Scale } from 'lucide-react';

export default function HowItWorksSection() {
  const cards = [
    { icon: Zap, title: "Heat + Sonic", desc: "Instantaneous heat combined with sonic vibration for effortless cutting and cautery." },
    { icon: Target, title: "Precision Tip", desc: "Heat concentrated at the tip (180°C) for localized control without collateral damage." },
    { icon: Waves, title: "Anti-Pull Tech", desc: "Vibration prevents gutta-percha from sticking or pulling out during cutting." },
  ];

  return (
    <section id="how-it-works" className="relative py-28 px-6 lg:px-12 bg-[#0c1117] overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">Technology</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white/90 tracking-tight mb-3">How It Works</h2>
          <p className="text-base text-white/30 max-w-2xl mx-auto">Advanced engineering meets chairside simplicity.</p>
        </motion.div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mb-16 max-w-4xl mx-auto"
        >
          <div className="absolute -inset-3 bg-amber-500/[0.03] rounded-3xl blur-2xl" />
          <div className="relative aspect-video bg-[#0e1319] rounded-2xl shadow-2xl overflow-hidden border border-white/[0.06]">
            <iframe
              src="https://www.youtube.com/embed/ZwmWPHiCP8o?mute=1&autoplay=0&controls=1"
              title="UC CUT Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid lg:grid-cols-3 gap-5">
          {cards.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/[0.02] rounded-2xl p-7 border border-white/[0.05] hover:border-amber-500/15 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-amber-500/[0.08] rounded-xl flex items-center justify-center mb-5 border border-amber-500/15 text-amber-400/80">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white/85 mb-2">{item.title}</h3>
              <p className="text-sm text-white/30 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick benefits */}
        <div className="grid md:grid-cols-2 gap-4 mt-8 max-w-3xl mx-auto">
          {[
            { icon: Gauge, title: "Zero Learning Curve", desc: "Intuitive plug and play operation." },
            { icon: Scale, title: "Ultra Lightweight", desc: "Only 1.7 oz for fatigue-free use." },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.015] rounded-xl border border-white/[0.04]">
              <div className="p-2.5 bg-amber-500/[0.06] rounded-lg border border-amber-500/10 flex-shrink-0">
                <item.icon className="w-4 h-4 text-amber-400/70" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white/80">{item.title}</h4>
                <p className="text-xs text-white/25">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}