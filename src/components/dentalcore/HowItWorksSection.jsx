import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Waves, Target, Gauge } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 px-6 lg:px-12 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            How It Works
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
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
          <div className="aspect-video bg-gray-100 rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
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
          <div className="p-10 lg:p-14 bg-white rounded-3xl border border-gray-200 shadow-xl">
            {/* Glow accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-transparent to-transparent rounded-3xl" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-4 bg-cyan-50 rounded-2xl border border-cyan-200">
                  <Zap className="w-8 h-8 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Electric Heat + Sonic Vibration</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    UC CUT uses electric power to generate <span className="text-gray-900 font-medium">instantaneous heat</span> at 
                    the tip, combined with <span className="text-gray-900 font-medium">sonic vibration</span>. This dual-action approach 
                    allows for precise cutting of gutta-percha and effective cauterization of soft tissue.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-4 bg-cyan-50 rounded-2xl border border-cyan-200">
                  <Target className="w-8 h-8 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Focused Heat Concentration</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The heat is concentrated near the end of the tip — reaching approximately <span className="text-gray-900 font-medium">180°C 
                    at the last few millimeters</span> — ensuring efficient cutting and cauterization while maintaining control 
                    and precision in localized areas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-4 bg-cyan-50 rounded-2xl border border-cyan-200">
                  <Waves className="w-8 h-8 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Vibration Prevents Cone Pull-Out</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The sonic vibration isn't just for show — it <span className="text-gray-900 font-medium">helps prevent the 
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
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
            <Gauge className="w-10 h-10 text-cyan-600 mb-4" />
            <h4 className="text-xl font-semibold mb-3 text-gray-900">Low Learning Curve</h4>
            <p className="text-gray-500 leading-relaxed">
              Designed for quick adoption by both doctors and staff. Intuitive operation means you can start using 
              UC CUT effectively right away.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="w-10 h-10 flex items-center justify-center text-3xl mb-4">⚖️</div>
            <h4 className="text-xl font-semibold mb-3 text-gray-900">Lightweight & Ergonomic</h4>
            <p className="text-gray-500 leading-relaxed">
              At just 1.7 oz, UC CUT is comfortable to hold and maneuver during procedures. Simple, chairside convenience 
              without the bulk.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}