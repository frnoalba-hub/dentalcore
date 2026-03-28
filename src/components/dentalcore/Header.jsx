import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Phone, Mail } from 'lucide-react';
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
      <div className="bg-slate-800 text-white/70 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center h-9">
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
          <span className="text-white/40 font-medium">Authorized EPDENT Dealer — California</span>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md shadow-slate-900/[0.04] border-b border-slate-100'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-700/20 group-hover:shadow-blue-700/30 transition-shadow">
                D
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-slate-900">
                  DENTAL CORE
                </span>
                <span className="block text-[9px] tracking-[0.25em] text-slate-400 uppercase -mt-0.5 font-semibold">
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
                  className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-blue-700 rounded-lg hover:bg-blue-50/50 transition-all"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <a href={`tel:${companyInfo.phone}`} className="hidden lg:flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors mr-2">
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <button
                onClick={openCart}
                className="relative p-2.5 rounded-xl hover:bg-slate-50 transition-all group"
              >
                <ShoppingBag className="w-5 h-5 text-slate-600 group-hover:text-blue-700 transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-blue-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none animate-[bounceIn_0.3s_ease-out]">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-slate-50 transition-all"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-[64px] z-40 bg-white/98 backdrop-blur-xl border-b border-slate-200 lg:hidden shadow-xl shadow-slate-900/[0.06]"
          >
            <nav className="max-w-7xl mx-auto px-6 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left px-4 py-3 text-slate-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-xl font-medium text-sm transition-all"
                >
                  {link.label}
                </button>
              ))}
              <a href={`tel:${companyInfo.phone}`} className="mt-2 flex items-center gap-2 px-4 py-3 text-blue-700 font-semibold text-sm">
                <Phone className="w-4 h-4" />
                {companyInfo.phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}