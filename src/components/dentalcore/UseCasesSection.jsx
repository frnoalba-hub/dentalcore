import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const useCases = [
  'Controlling minor bleeding and cauterizing gingival tissue in localized areas',
  'Small gingivectomy and soft-tissue trimming around crown margins or restorative areas',
  'Cutting and cleaning gutta-percha during root canal treatments using heated, vibrating tips',
  'Vertical condensation and down-packing with F / FM tips for precise obturation',
  'Quick tissue management during crown and bridge preparations',
  'Efficient hemostasis during minor surgical procedures without bulky electrosurgical equipment',
];

export default function UseCasesSection() {
  return (
    <section className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            When You'd Use It
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real clinical situations where UC CUT delivers practical value
          </p>
        </motion.div>

        {/* Use cases grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-gray-900/60 to-gray-900/20 border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-300 hover:bg-gray-900/80">
                {/* Check icon */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                    <Check className="w-4 h-4 text-cyan-400" strokeWidth={3} />
                  </div>
                </div>

                {/* Text */}
                <p className="text-gray-300 leading-relaxed flex-1">
                  {useCase}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 italic">
            Practical, everyday applications — no hype, just clinical efficiency.
          </p>
        </motion.div>
      </div>
    </section>
  );
}