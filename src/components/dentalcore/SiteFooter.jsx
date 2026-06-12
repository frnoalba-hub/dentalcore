import { Link } from 'react-router-dom';
import { companyInfo } from './productsData';
import { useTranslation } from '@/lib/i18n';

export default function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8 border-t border-white/10 flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center text-xs text-white/30 uppercase tracking-widest font-medium">
        <div className="text-center md:text-left">
          <p>© {new Date().getFullYear()} {companyInfo.companyName}</p>
          <p className="mt-1.5 text-[10px] tracking-[0.2em] text-white/25 normal-case font-body">
            {companyInfo.tagline} · US shipping
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-body normal-case tracking-normal">
          <Link to="/about" className="text-white/45 hover:text-accent transition-colors">About</Link>
          <span className="text-white/20">·</span>
          <Link to="/contact" className="text-white/45 hover:text-accent transition-colors">Contact</Link>
          <span className="text-white/20">·</span>
          <Link to="/group-practices" className="text-white/45 hover:text-accent transition-colors">DSOs &amp; Groups</Link>
          <span className="text-white/20">·</span>
          <Link to="/policies" className="text-white/45 hover:text-accent transition-colors">Policies</Link>
          <span className="text-white/20">·</span>
          <Link to="/track-order" className="text-white/45 hover:text-accent transition-colors">Track Order</Link>
        </div>
        <p>{t('all_rights_reserved')}</p>
      </div>
    </footer>
  );
}
