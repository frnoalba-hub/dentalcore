import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Waves, Target, Gauge, Scale } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 px-6 lg:px-12 bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-600 font-semibold tracking-wider text-sm uppercase mb-2 block">Technology</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
            Advanced engineering meets chairside simplicity.
          </p>
        </motion.div>

        {/* Demo Video Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-24 max-w-4xl mx-auto"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-100 to-purple-100 rounded-[2.5rem] blur-xl opacity-50" />
          <div className="relative aspect-video bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
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
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Heat + Sonic",
              desc: "Instantaneous heat combined with sonic vibration for effortless cutting and cautery."
            },
            {
              icon: Target,
              title: "Precision Tip",
              desc: "Heat is concentrated at the very tip (180°C) for localized control without collateral damage."
            },
            {
              icon: Waves,
              title: "Anti-Pull Tech",
              desc: "Vibration prevents the gutta-percha cone from sticking or pulling out during cutting."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-gray-50 rounded-[2rem] p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-cyan-600">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Ease of use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-3 bg-cyan-50 rounded-xl">
              <Gauge className="w-6 h-6 text-cyan-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">Zero Learning Curve</h4>
              <p className="text-sm text-gray-500">Intuitive "plug and play" operation.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-3 bg-cyan-50 rounded-xl">
              <Scale className="w-6 h-6 text-cyan-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">Ultra Lightweight</h4>
              <p className="text-sm text-gray-500">Only 1.7 oz for fatigue-free use.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}