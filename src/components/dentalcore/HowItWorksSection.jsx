import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Waves, Target, Gauge, Scale } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 px-6 lg:px-12 bg-[#050505] overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3 block">Technology</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Advanced engineering meets chairside simplicity.
          </p>
        </motion.div>

        {/* Demo Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-20 max-w-4xl mx-auto"
        >
          <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/8 to-transparent rounded-3xl blur-xl" />
          <div className="relative aspect-video bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800/60">
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
        <div className="grid lg:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Heat + Sonic", desc: "Instantaneous heat combined with sonic vibration for effortless cutting and cautery." },
            { icon: Target, title: "Precision Tip", desc: "Heat concentrated at the tip (180°C) for localized control without collateral damage." },
            { icon: Waves, title: "Anti-Pull Tech", desc: "Vibration prevents the gutta-percha cone from sticking or pulling out during cutting." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 hover:border-cyan-500/25 transition-all duration-300 border border-gray-800/50"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 border border-cyan-500/20 text-cyan-400">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-[15px]">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-5 mt-10 max-w-4xl mx-auto"
        >
          {[
            { icon: Gauge, title: "Zero Learning Curve", desc: "Intuitive plug and play operation." },
            { icon: Scale, title: "Ultra Lightweight", desc: "Only 1.7 oz for fatigue-free use." },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-5 p-5 bg-gray-900/30 rounded-2xl border border-gray-800/40">
              <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 flex-shrink-0">
                <item.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}