import { motion } from 'framer-motion';
import { companyInfo } from './productsData';
import { useTranslation } from '@/lib/i18n';
import NewsletterSignup from './NewsletterSignup';

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 bg-[#111] text-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <h2 className="text-4xl lg:text-6xl font-medium tracking-tighter uppercase mb-16 text-white/50">
          {t('operate_with')} <span className="text-white">{t('precision')}</span>
        </h2>

        <div className="grid md:grid-cols-3 border-t border-white/10">
          <div className="py-8 pr-8 border-b md:border-b-0 md:border-r border-white/10">
            <span className="text-xs text-white/40 uppercase tracking-widest block mb-4">{t('direct_line')}</span>
            <a href={`tel:${companyInfo.phone}`} className="text-2xl font-medium hover:text-accent transition-colors">
              {companyInfo.phone}
            </a>
          </div>
          <div className="py-8 px-0 md:px-8 border-b md:border-b-0 md:border-r border-white/10">
            <span className="text-xs text-white/40 uppercase tracking-widest block mb-4">{t('digital_support')}</span>
            <a href={`mailto:${companyInfo.email}`} className="text-xl font-medium hover:text-accent transition-colors">
              {companyInfo.email}
            </a>
          </div>
          <div className="py-8 pl-0 md:pl-8 border-b md:border-b-0 border-white/10">
            <span className="text-xs text-white/40 uppercase tracking-widest block mb-4">{t('headquarters')}</span>
            <p className="text-lg font-medium text-white/80">{companyInfo.address}</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 max-w-lg">
          <NewsletterSignup />
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 uppercase tracking-widest font-medium">
          <p>© {new Date().getFullYear()} {companyInfo.companyName}</p>
          <p>{t('all_rights_reserved')}</p>
        </div>
      </div>
    </section>
  );
}