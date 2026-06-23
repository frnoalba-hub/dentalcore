import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/lib/i18n';
import HeroProductShowcase from './HeroProductShowcase';

export default function HeroSection() {
  const { t } = useTranslation();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-[calc(var(--site-header-height)+1.25rem)] pb-10 lg:pb-14 bg-[#FDFDFD] border-b border-[#111]/10 overflow-hidden">
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

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">
          {/* Copy */}
          <div className="lg:col-span-5 xl:col-span-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11vw] sm:text-[8vw] lg:text-[3.75rem] xl:text-[4.25rem] leading-[0.9] tracking-[-0.03em] font-semibold text-[#111]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Better
              <br />
              Tools<span className="text-accent">.</span>
              <br />
              Better
              <br />
              Care<span className="text-accent">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-6 lg:mt-8 text-base lg:text-[1.05rem] text-[#111]/60 leading-relaxed max-w-md font-body"
            >
              Professional-grade dental instruments, handpieces, and biomaterials. Shipped directly to your practice.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-8 lg:mt-10 flex flex-col gap-6"
            >
              <button
                type="button"
                onClick={scrollToCatalog}
                className="group flex items-center justify-between border-b-2 border-[#111]/20 pb-4 text-[#111] hover:text-accent hover:border-accent transition-all duration-300 w-full sm:w-auto sm:min-w-[220px]"
              >
                <span className="text-sm uppercase tracking-[0.18em] font-semibold">Shop Products</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <p className="text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[#111]/40 font-semibold max-w-sm leading-relaxed">
                {t('clinical_support')}.{' '}
                <Link to="/contact" className="text-[#111]/55 hover:text-accent transition-colors underline underline-offset-4">
                  Talk to our team
                </Link>
              </p>
            </motion.div>
          </div>

          {/* Product carousel fills the right column on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7 w-full"
          >
            <HeroProductShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
