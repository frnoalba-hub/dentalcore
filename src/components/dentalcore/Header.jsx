import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { companyInfo } from './productsData';
import { useCartStore } from '../store/cartStore';
<<<<<<< HEAD
import { useTranslation } from '@/lib/i18n';
=======

const navLinks = [
  { label: 'Catalog', id: 'catalog' },
  { label: 'Featured', id: 'featured' },
  { label: 'Reviews', id: 'testimonials' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];
>>>>>>> 17e24df (chore: pivot master brand to Coretix for clean brand architecture)

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();
  const { t, lang, setLang } = useTranslation();

  const navLinks = [
    { label: t('catalog'), id: 'catalog' },
    { label: t('featured'), id: 'featured' },
    { label: t('about'), id: 'about' },
  ];
  const itemCount = getItemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[#FDFDFD] border-b border-[#111]/10' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
<<<<<<< HEAD
            <span className="text-xl font-bold tracking-tighter uppercase text-[#111]">
              Dental Core Supply<span className="text-accent">.</span>
=======
            <span className="text-xl font-bold tracking-widest uppercase text-[#111]">
              CORETIX<span className="text-accent">.</span>
>>>>>>> 17e24df (chore: pivot master brand to Coretix for clean brand architecture)
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium tracking-wide uppercase text-[#111]/60 hover:text-[#111] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="hidden xl:flex text-sm font-bold tracking-widest uppercase text-[#111] hover:text-accent transition-colors border border-[#111]/10 px-3 py-1.5"
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>

            <a href={`mailto:${companyInfo.email}`} className="hidden xl:flex items-center gap-1 text-sm font-medium tracking-wide uppercase text-[#111]/60 hover:text-[#111] transition-colors">
              {t('contact')} <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={openCart}
              className="relative flex items-center gap-2 text-[#111] hover:text-accent transition-colors group"
            >
              <span className="text-sm font-medium tracking-wide uppercase hidden sm:block">{t('cart')}</span>
              <div className="relative">
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] bg-accent text-white text-[10px] font-bold flex items-center justify-center rounded-none">
                    {itemCount}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-[#111]"
            >
              {mobileOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-20 bottom-0 z-40 bg-[#FDFDFD] lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col p-6 gap-6 min-h-full">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-2xl font-medium tracking-tighter uppercase text-[#111] text-left"
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-auto pt-8 border-t border-[#111]/10 flex flex-col gap-4">
                <button
                  onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                  className="text-left text-2xl font-medium tracking-tighter uppercase text-[#111] flex gap-2"
                >
                  <span className={lang === 'en' ? 'text-accent' : 'text-[#111]/40'}>EN</span> / <span className={lang === 'es' ? 'text-accent' : 'text-[#111]/40'}>ES</span>
                </button>
                <a href={`tel:${companyInfo.phone}`} className="text-sm uppercase tracking-wide text-[#111]/60 mt-4">
                  {companyInfo.phone}
                </a>
                <a href={`mailto:${companyInfo.email}`} className="text-sm uppercase tracking-wide text-[#111]/60">
                  {companyInfo.email}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}