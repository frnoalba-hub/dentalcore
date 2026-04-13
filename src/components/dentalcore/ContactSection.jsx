import { Link } from 'react-router-dom';
import { companyInfo } from './productsData';
import { useTranslation } from '@/lib/i18n';
import { trackEngagementEvent } from '@/lib/trackEvent';

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 lg:py-28 bg-[#111] text-white border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/35 font-semibold mb-3 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-white/25" />
            {t('contact') || 'Contact'}
          </p>
          <h2 className="text-4xl lg:text-6xl font-medium tracking-tighter uppercase leading-[1.05] text-white/50">
            {t('operate_with')} <span className="text-white">{t('precision')}</span>
          </h2>
          <p className="text-sm text-white/40 font-body mt-4 max-w-xl leading-relaxed">
            Sales, warranty, and clinical support — direct from Sacramento.
          </p>
        </div>

        <div
          id="shipping-returns"
          className="mb-12 max-w-3xl rounded-card border border-white/10 bg-[#141414] px-6 py-8 shadow-modal md:px-10"
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-semibold mb-4">
            Shipping &amp; returns
          </p>
          <p className="text-sm text-white/55 font-body leading-relaxed mb-4">
            <span className="text-white/80 font-medium">Shipping:</span> Orders are typically processed within{' '}
            <span className="text-white/80">1–2 business days</span>. US delivery usually takes{' '}
            <span className="text-white/80">3–7 business days</span> after shipment depending on destination and carrier.
            Shipping cost is shown at checkout when available, or quoted by our sales team.
          </p>
          <p className="text-sm text-white/55 font-body leading-relaxed">
            <span className="text-white/80 font-medium">Returns:</span> Return eligibility is evaluated case by case for
            dental professionals. Contact{' '}
            <a
              href={`mailto:${companyInfo.email}`}
              onClick={() =>
                trackEngagementEvent('contact_click', {
                  method: 'email',
                  location: 'contact_returns',
                })
              }
              className="text-accent hover:underline"
            >
              {companyInfo.email}
            </a>{' '}
            before returning merchandise. Opened or sterile items may not be eligible for return.
          </p>
        </div>

        <div className="grid md:grid-cols-3 border border-white/10 rounded-card overflow-hidden bg-[#141414] shadow-modal">
          <div className="py-8 pr-8 pl-6 md:pl-8 border-b md:border-b-0 md:border-r border-white/10">
            <span className="text-xs text-white/40 uppercase tracking-widest block mb-4">{t('direct_line')}</span>
            <a
              href={`tel:${companyInfo.phone}`}
              onClick={() =>
                trackEngagementEvent('phone_click', {
                  event_category: 'engagement',
                  location: 'contact_section',
                })
              }
              className="text-2xl font-medium hover:text-accent transition-colors rounded-sm"
            >
              {companyInfo.phone}
            </a>
          </div>
          <div className="py-8 px-6 md:px-8 border-b md:border-b-0 md:border-r border-white/10">
            <span className="text-xs text-white/40 uppercase tracking-widest block mb-4">{t('digital_support')}</span>
            <a
              href={`mailto:${companyInfo.email}`}
              onClick={() =>
                trackEngagementEvent('contact_click', {
                  method: 'email',
                  location: 'contact_section',
                })
              }
              className="text-xl font-medium hover:text-accent transition-colors"
            >
              {companyInfo.email}
            </a>
          </div>
          <div className="py-8 px-6 md:pl-8 md:pr-8 border-b md:border-b-0 border-white/10">
            <span className="text-xs text-white/40 uppercase tracking-widest block mb-4">{t('headquarters')}</span>
            <p className="text-lg font-medium text-white/80">{companyInfo.address}</p>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center text-xs text-white/30 uppercase tracking-widest font-medium">
          <p>© {new Date().getFullYear()} {companyInfo.companyName}</p>
          <Link
            to="/group-practices"
            className="text-white/45 hover:text-accent transition-colors normal-case tracking-normal text-sm font-body"
          >
            DSOs &amp; multi-location practices
          </Link>
          <p>{t('all_rights_reserved')}</p>
        </div>
      </div>
    </section>
  );
}