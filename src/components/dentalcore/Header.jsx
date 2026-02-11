import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { companyInfo } from './productsData';
import { useCartStore } from '../store/cartStore';

const navLinks = [
  { label: 'Features', id: 'features' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Catalog', id: 'catalog' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0c1117]/90 backdrop-blur-2xl border-b border-amber-500/5 shadow-xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-[72px] flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center font-black text-[#0c1117] text-base shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
                D
              </div>
              <div className="hidden sm:block">
                <span className="text-[15px] font-semibold tracking-tight text-white/90">
                  DENTAL CORE
                </span>
                <span className="block text-[9px] tracking-[0.3em] text-white/30 uppercase -mt-0.5 font-medium">
                  Instruments
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-3.5 py-2 text-[13px] font-medium text-white/40 hover:text-white/90 rounded-lg hover:bg-white/[0.04] transition-all duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2.5">
              <a
                href={`tel:${companyInfo.phone}`}
                className="hidden md:flex items-center gap-1.5 text-[11px] text-white/30 hover:text-amber-400/80 transition-colors font-medium"
              >
                <Phone className="w-3 h-3" />
                {companyInfo.phone}
              </a>

              <div className="w-px h-5 bg-white/10 hidden md:block mx-1" />

              <button
                onClick={openCart}
                className="relative p-2.5 rounded-xl hover:bg-white/[0.06] transition-all"
              >
                <ShoppingBag className="w-[18px] h-[18px] text-white/50" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] bg-amber-500 text-[#0c1117] text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-white/[0.06] transition-all"
              >
                {mobileOpen ? <X className="w-5 h-5 text-white/60" /> : <Menu className="w-5 h-5 text-white/60" />}
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
            className="fixed inset-x-0 top-[72px] z-40 bg-[#0c1117]/98 backdrop-blur-2xl border-b border-white/5 lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left px-4 py-3 text-white/60 hover:text-white hover:bg-white/[0.04] rounded-xl font-medium text-sm transition-all"
                >
                  {link.label}
                </button>
              ))}
              <a href={`tel:${companyInfo.phone}`} className="mt-3 flex items-center gap-2 px-4 py-3 text-amber-400/80 font-medium text-sm">
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