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

const Header = () => {
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
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center font-black text-black text-lg shadow-lg shadow-cyan-500/20">
                D
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold tracking-tight text-white">
                  DENTAL CORE
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-gray-500 uppercase -mt-0.5">
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
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${companyInfo.phone}`}
                className="hidden md:flex items-center gap-2 text-xs text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {companyInfo.phone}
              </a>

              <button
                onClick={openCart}
                className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all"
              >
                <ShoppingBag className="w-5 h-5 text-gray-300" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-cyan-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
              >
                {mobileOpen ? <X className="w-5 h-5 text-gray-300" /> : <Menu className="w-5 h-5 text-gray-300" />}
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
            className="fixed inset-x-0 top-20 z-40 bg-black/95 backdrop-blur-xl border-b border-white/5 lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={`tel:${companyInfo.phone}`}
                className="mt-4 flex items-center gap-2 px-4 py-3 text-cyan-400 font-medium"
              >
                <Phone className="w-4 h-4" />
                {companyInfo.phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;