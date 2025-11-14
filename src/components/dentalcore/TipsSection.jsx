import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

const tips = [
  {
    id: 'bovie',
    name: 'Bovie Tip',
    description: 'Gum cautery & gingivectomy',
    details: 'Specialized for precise soft-tissue cauterization and controlled gingivectomy procedures. Ideal for hemostasis and tissue management.',
  },
  {
    id: 'endo',
    name: 'Endo Tip',
    description: 'Gutta-percha cutting with heat + vibration',
    details: 'Combines localized heat and sonic vibration to cut gutta-percha cleanly and efficiently without pulling the cone from the canal.',
  },
  {
    id: 'f-tip',
    name: 'F Tip',
    description: 'Vertical condensation / down-packing',
    details: 'Designed for effective vertical condensation during obturation. Provides controlled compaction of gutta-percha in the canal.',
  },
  {
    id: 'fm-tip',
    name: 'FM Tip',
    description: 'Vertical condensation / down-packing',
    details: 'Alternative geometry for down-packing procedures, offering versatility in obturation technique based on canal anatomy.',
  },
];

export default function TipsSection() {
  const [selectedTip, setSelectedTip] = useState(null);

  return (
    <section className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Tips & Versatility
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Multiple specialized tips for different clinical applications — hover or tap to see details
          </p>
        </motion.div>

        {/* Tips grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onHoverStart={() => setSelectedTip(tip)}
              onHoverEnd={() => setSelectedTip(null)}
              onClick={() => setSelectedTip(selectedTip?.id === tip.id ? null : tip)}
              className="group cursor-pointer"
            >
              <div className="relative h-full p-8 bg-gradient-to-br from-gray-900/80 to-gray-900/40 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-transparent rounded-2xl transition-all duration-300" />
                
                <div className="relative z-10 space-y-4">
                  {/* Image placeholder */}
                  <div className="aspect-square bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center mb-4 group-hover:border-cyan-500/30 transition-colors duration-300">
                    <div className="text-center">
                      <ZoomIn className="w-8 h-8 text-gray-600 group-hover:text-cyan-400 mx-auto mb-2 transition-colors duration-300" />
                      <p className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
                        Upload {tip.name.toLowerCase()}<br />image here
                      </p>
                    </div>
                  </div>

                  {/* Tip name */}
                  <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition-colors duration-300">
                    {tip.name}
                  </h3>

                  {/* Short description */}
                  <p className="text-sm text-gray-400">
                    {tip.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="flex items-center gap-2 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-3 h-3" />
                    <span>View details</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected tip details panel */}
        <AnimatePresence>
          {selectedTip && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-8 lg:p-12 bg-gradient-to-br from-cyan-500/10 via-gray-900/90 to-gray-900/50 rounded-3xl border border-cyan-500/30 shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Large image placeholder */}
                  <div className="aspect-square bg-gray-800/50 rounded-2xl border border-gray-700 flex items-center justify-center">
                    <div className="text-center p-8">
                      <ZoomIn className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Enlarged {selectedTip.name.toLowerCase()} image<br />
                        <span className="text-xs">(Upload high-resolution detail shot)</span>
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2 text-cyan-400">
                        {selectedTip.name}
                      </h3>
                      <p className="text-lg text-gray-400">
                        {selectedTip.description}
                      </p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {selectedTip.details}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          Hover over or tap each tip to see enlarged details and specifications
        </motion.p>
      </div>
    </section>
  );
}