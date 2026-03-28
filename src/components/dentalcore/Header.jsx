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
      <div className="bg-slate-900 text-white/70 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center h-9">
          <div className="flex items-center gap-5">
            <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Mail className="w-3 h-3" />
              {companyInfo.email}
            </a>
            <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Phone className="w-3 h-3" />
              {companyInfo.phone}
            </a>
          </div>
          <span className="text-white/40">California-Based Dental Supplier</span>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100'
            : 'bg-white border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg shadow-amber-500/20">
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
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-all"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/AdminProducts"
                className="px-4 py-2 text-sm font-bold text-amber-600 hover:text-amber-700 bg-amber-50 rounded-lg transition-all ml-4"
              >
                Admin Panel
              </a>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <button
                onClick={openCart}
                className="relative p-2.5 rounded-xl hover:bg-slate-50 transition-all"
              >
                <ShoppingBag className="w-5 h-5 text-slate-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
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
            className="fixed inset-x-0 top-[64px] z-40 bg-white/98 backdrop-blur-xl border-b border-gray-200 lg:hidden shadow-lg"
          >
            <nav className="max-w-7xl mx-auto px-6 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl font-medium text-sm transition-all"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/AdminProducts"
                className="text-left px-4 py-3 text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl font-bold text-sm transition-all"
              >
                Admin Panel
              </a>
              <a href={`tel:${companyInfo.phone}`} className="mt-2 flex items-center gap-2 px-4 py-3 text-amber-600 font-semibold text-sm">
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