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
    <section id="use-cases" className="relative py-28 px-6 lg:px-12 bg-[#0e1319]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">Applications</span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-5 text-white/90 tracking-tight">
              One Device, <br />
              <span className="text-amber-400/80">Many Uses.</span>
            </h2>
            <p className="text-base text-white/35 mb-8 leading-relaxed">
              From everyday tissue management to precise endodontic procedures, the UC CUT is the versatile workhorse your practice needs.
            </p>
            <div className="p-5 bg-amber-500/[0.04] rounded-xl border border-amber-500/10">
              <p className="text-amber-300/50 font-medium italic text-sm leading-relaxed">
                "It's the tool I reach for when I need quick hemostasis or a clean gutta-percha cut without setting up the big unit."
              </p>
            </div>
          </motion.div>

          <div className="grid gap-2.5">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/15 hover:bg-white/[0.03] transition-all duration-300"
              >
                <CheckCircle2 className="w-4.5 h-4.5 text-amber-400/60 flex-shrink-0" />
                <p className="text-white/45 font-medium text-sm">{useCase}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}