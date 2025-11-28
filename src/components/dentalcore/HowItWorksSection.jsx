import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Waves, Target, Gauge } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 px-6 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Simple technology, powerful results — designed for ease of use with minimal learning curve.
          </p>
        </motion.div>

        {/* Demo Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="relative mb-16"
        >
          <div className="aspect-video bg-gradient-to-br from-gray-900/90 to-gray-900/50 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/ZwmWPHiCP8o?mute=1&autoplay=1&loop=1&playlist=ZwmWPHiCP8o&controls=1"
              title="UC CUT Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </motion.div>

        {/* Main explanation card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="relative mb-16"
        >
          <div className="p-10 lg:p-14 bg-gradient-to-br from-gray-900/90 to-gray-900/50 rounded-3xl border border-gray-800 shadow-2xl">
            {/* Glow accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent rounded-3xl" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/30">
                  <Zap className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Electric Heat + Sonic Vibration</h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    UC CUT uses electric power to generate <span className="text-white font-medium">instantaneous heat</span> at 
                    the tip, combined with <span className="text-white font-medium">sonic vibration</span>. This dual-action approach 
                    allows for precise cutting of gutta-percha and effective cauterization of soft tissue.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/30">
                  <Target className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Focused Heat Concentration</h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    The heat is concentrated near the end of the tip — reaching approximately <span className="text-white font-medium">180°C 
                    at the last few millimeters</span> — ensuring efficient cutting and cauterization while maintaining control 
                    and precision in localized areas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/30">
                  <Waves className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Vibration Prevents Cone Pull-Out</h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    The sonic vibration isn't just for show — it <span className="text-white font-medium">helps prevent the 
                    gutta-percha cone from being pulled out</span> of the canal during cutting, giving you cleaner, more 
                    controlled results during endodontic procedures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ease of use highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="p-8 bg-gradient-to-br from-gray-900/60 to-gray-900/20 rounded-2xl border border-gray-800/50">
            <Gauge className="w-10 h-10 text-cyan-400 mb-4" />
            <h4 className="text-xl font-semibold mb-3">Low Learning Curve</h4>
            <p className="text-gray-400 leading-relaxed">
              Designed for quick adoption by both doctors and staff. Intuitive operation means you can start using 
              UC CUT effectively right away.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-gray-900/60 to-gray-900/20 rounded-2xl border border-gray-800/50">
            <div className="w-10 h-10 flex items-center justify-center text-3xl mb-4">⚖️</div>
            <h4 className="text-xl font-semibold mb-3">Lightweight & Ergonomic</h4>
            <p className="text-gray-400 leading-relaxed">
              At just 1.7 oz, UC CUT is comfortable to hold and maneuver during procedures. Simple, chairside convenience 
              without the bulk.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}