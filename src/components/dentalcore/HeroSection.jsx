import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function HeroSection() {
  const { t } = useTranslation();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end pt-[140px] pb-0 bg-[#FDFDFD] border-b border-[#111]/10 overflow-hidden">
      {/* Structural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center opacity-[0.06]">
        <div className="w-full max-w-[1600px] h-full border-x border-[#111] grid grid-cols-2 md:grid-cols-4">
          <div className="border-r border-[#111]" />
          <div className="border-r border-[#111] hidden md:block" />
          <div className="border-r border-[#111] hidden md:block" />
        </div>
      </div>

      {/* Subtle radial gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,71,255,0.05),transparent)]" />

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 flex-1 flex flex-col justify-end">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.25em] text-[#111]/35 font-semibold mb-8 flex items-center gap-3"
            >
              <span className="inline-block w-6 h-px bg-[#111]/30" />
              Cortex Supplies
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] sm:text-[11vw] xl:text-[130px] leading-[0.82] tracking-tighter font-semibold text-[#111] uppercase"
            >
              Better
              <br />
              Tools<span className="text-accent">.</span>
              <br />
              Better
              <br />
              Care<span className="text-accent">.</span>
            </motion.h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end pb-2 lg:pb-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base lg:text-lg text-[#111]/55 leading-relaxed mb-10 max-w-sm font-body"
            >
              Professional-grade dental instruments, handpieces, and biomaterials — shipped directly to your practice.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={scrollToCatalog}
              className="group flex items-center justify-between border-b-2 border-[#111]/20 pb-4 text-[#111] hover:text-accent hover:border-accent transition-all duration-300 w-full sm:w-[85%]"
            >
              <span className="text-sm uppercase tracking-[0.2em] font-semibold">Shop Products</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Ticker / Specs Bar */}
      <div className="w-full border-t border-[#111]/10 bg-[#111]/[0.02] relative z-10">
        <div className="max-w-[1600px] mx-auto flex overflow-x-auto divide-x divide-[#111]/10">
          {[t('iso_certified'), t('warranty'), t('next_day'), t('clinical_support')].map((spec, i) => (
            <div key={i} className="px-6 py-5 flex-1 min-w-[140px] flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#111]/50 whitespace-nowrap">{spec}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}