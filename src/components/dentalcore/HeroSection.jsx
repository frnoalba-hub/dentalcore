import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end pt-32 pb-12 bg-[#FDFDFD] border-b border-[#111]/10">
      {/* Structural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center opacity-10">
        <div className="w-full max-w-[1600px] h-full border-x border-[#111] grid grid-cols-2 md:grid-cols-4">
          <div className="border-r border-[#111]" />
          <div className="border-r border-[#111] hidden md:block" />
          <div className="border-r border-[#111] hidden md:block" />
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 flex-1 flex flex-col justify-end">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] xl:text-[140px] leading-[0.85] tracking-tighter font-semibold text-[#111] uppercase"
            >
              Clinical
              <br />
              Precision<span className="text-accent">.</span>
            </motion.h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end pb-2 lg:pb-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base lg:text-lg text-[#111]/70 leading-relaxed mb-10 max-w-sm font-body"
            >
              Engineered for modern endodontics. Uncompromising quality for professionals who demand the absolute best in structural integrity.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={scrollToCatalog}
              className="group flex items-center justify-between border-b border-[#111] pb-4 text-[#111] hover:text-accent hover:border-accent transition-colors w-full sm:w-[80%]"
            >
              <span className="text-sm uppercase tracking-[0.15em] font-medium">Explore Collection</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Ticker / Specs Bar */}
      <div className="w-full border-t border-[#111]/10 bg-[#FDFDFD] relative z-10">
        <div className="max-w-[1600px] mx-auto flex flex-wrap divide-x divide-[#111]/10 border-x border-[#111]/10 opacity-60">
          {['ISO Certified', '1-Year Warranty', 'Next-Day Dispatch', 'Direct Clinical Support'].map((spec, i) => (
            <div key={i} className="px-6 py-4 flex-1 whitespace-nowrap">
              <span className="text-xs uppercase tracking-widest font-medium text-[#111]">{spec}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}