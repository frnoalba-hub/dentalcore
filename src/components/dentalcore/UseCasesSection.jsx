import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const useCases = [
  'Controlling minor bleeding & cauterizing gingival tissue',
  'Gingivectomy & soft-tissue trimming around crown margins',
  'Cutting & cleaning gutta-percha during root canals',
  'Vertical condensation & down-packing for obturation',
  'Quick tissue management for crown/bridge preparations',
  'Hemostasis during minor surgical procedures',
];

export default function UseCasesSection() {
  return (
    <section className="relative py-32 px-6 lg:px-12 bg-[#0a0a0a]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-2 block">Applications</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
              One Device, <br />
              <span className="text-cyan-400">Many Uses.</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              From everyday tissue management to precise endodontic procedures, the UC CUT is the versatile workhorse your practice needs.
            </p>
            
            <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/20">
              <p className="text-cyan-300 font-medium italic">
                "It's the tool I reach for when I need quick hemostasis or a clean gutta-percha cut without setting up the big unit."
              </p>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-gray-300 font-medium">
                  {useCase}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}