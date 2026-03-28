import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { companyInfo } from './productsData';
import { useCartStore } from '../store/cartStore';

const navLinks = [
  { label: 'Products', id: 'catalog' },
  { label: 'Featured', id: 'featured' },
  { label: 'Reviews', id: 'testimonials' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block border-b border-white/10 bg-slate-950 text-white/70 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center h-10">
          <div className="flex items-center gap-5">
            <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3 h-3" />
              {companyInfo.email}
            </a>
            <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3 h-3" />
              {companyInfo.phone}
            </a>
          </div>
          <span className="text-white/40 font-medium tracking-[0.18em] uppercase">Authorized EPDENT Dealer</span>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/88 backdrop-blur-2xl shadow-lg shadow-slate-900/[0.05] border-b border-slate-200/80'
            : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-18 min-h-[72px] flex items-center justify-between gap-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 flex items-center justify-center font-black text-white text-lg shadow-[0_16px_40px_rgba(30,64,175,0.18)] ring-1 ring-blue-200/40 transition-transform duration-300 group-hover:scale-[1.03]">
                D
              </div>
              <div className="leading-none">
                <span className="block text-sm sm:text-base font-bold tracking-[0.08em] text-slate-900">
                  DENTAL CORE
                </span>
                <span className="block text-[9px] sm:text-[10px] tracking-[0.28em] text-slate-400 uppercase mt-1 font-semibold">
                  Instruments LLC
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/90 p-1.5 shadow-sm shadow-slate-200/60">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-50 transition-all"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a href={`tel:${companyInfo.phone}`} className="hidden xl:flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100 transition-colors">
                <Phone className="w-4 h-4" />
                Call Us
                <ChevronRight className="w-4 h-4" />
              </a>
              <button
                onClick={openCart}
                className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2.5 hover:border-blue-200 hover:bg-blue-50/50 transition-all group shadow-sm"
              >
                <ShoppingBag className="w-4.5 h-4.5 text-slate-600 group-hover:text-blue-700 transition-colors" />
                <span className="hidden sm:block text-sm font-semibold text-slate-700 group-hover:text-blue-700">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-blue-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none px-1.5">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-sm"
              >
                {mobileOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[72px] z-40 px-4 sm:px-6 lg:hidden"
          >
            <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/95 backdrop-blur-2xl shadow-2xl shadow-slate-900/[0.08]">
              <nav className="px-4 py-4 flex flex-col gap-1.5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="flex items-center justify-between text-left px-4 py-3.5 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-2xl font-semibold text-sm transition-all"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                ))}
                <div className="mt-2 grid gap-2 border-t border-slate-100 pt-3">
                  <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 text-blue-800 font-semibold text-sm">
                    <Phone className="w-4 h-4" />
                    {companyInfo.phone}
                  </a>
                  <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-slate-600 font-medium text-sm">
                    <Mail className="w-4 h-4" />
                    {companyInfo.email}
                  </a>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}