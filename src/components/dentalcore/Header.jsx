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
      <div className="hidden md:block border-b border-slate-100 bg-white text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center h-10">
          <div className="flex items-center gap-6">
            <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
              <Mail className="w-3 h-3" />
              {companyInfo.email}
            </a>
            <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
              <Phone className="w-3 h-3" />
              {companyInfo.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100'
            : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[72px] flex items-center justify-between gap-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-white text-base transition-transform duration-300 group-hover:scale-[1.03]">
                D
              </div>
              <div className="leading-none">
                <span className="block text-sm font-bold tracking-[0.06em] text-slate-900">
                  DENTAL CORE
                </span>
                <span className="block text-[9px] tracking-[0.2em] text-slate-400 uppercase mt-0.5 font-medium">
                  Instruments LLC
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-4 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-all"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <a href={`tel:${companyInfo.phone}`} className="hidden xl:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                <Phone className="w-3.5 h-3.5" />
                Call Us
              </a>

              <div className="hidden xl:block w-px h-5 bg-slate-200" />

              <button
                onClick={openCart}
                className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 hover:border-slate-300 hover:shadow-sm transition-all group"
              >
                <ShoppingBag className="w-4 h-4 text-slate-500 group-hover:text-slate-700 transition-colors" />
                <span className="hidden sm:block text-sm font-medium text-slate-600 group-hover:text-slate-800">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none px-1">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all"
              >
                {mobileOpen ? <X className="w-5 h-5 text-slate-600" /> : <Menu className="w-5 h-5 text-slate-600" />}
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
            <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white/98 backdrop-blur-xl shadow-xl">
              <nav className="px-3 py-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="flex items-center justify-between text-left px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl font-medium text-sm transition-all"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                ))}
                <div className="mt-2 grid gap-2 border-t border-slate-100 pt-3">
                  <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-slate-700 font-medium text-sm">
                    <Phone className="w-4 h-4" />
                    {companyInfo.phone}
                  </a>
                  <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-slate-500 font-medium text-sm">
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