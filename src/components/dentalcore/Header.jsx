import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cartStore';
import { companyInfo, navigation } from './contentConfig';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#050505]/95 backdrop-blur-lg border-b border-gray-800' 
            : 'bg-[#050505]/80 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                <span className="text-cyan-400">{companyInfo.logoText.split(' ')[0]}</span> {companyInfo.logoText.split(' ').slice(1).join(' ')}
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-4 pl-4 border-l border-gray-800">
              <a href={`tel:${companyInfo.phone.replace(/\D/g, '')}`} className="text-sm font-semibold text-gray-300 hover:text-cyan-400 transition-colors">
                {companyInfo.phone}
              </a>
              
              <button
                onClick={openCart}
                className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-300" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </button>

              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 rounded-lg"
              >
                Get Started
              </Button>
            </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0a0a] border-t border-gray-800"
          >
            <nav className="container mx-auto px-6 py-6 space-y-4">
              {navigation.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left text-gray-400 hover:text-cyan-400 transition-colors py-2 text-lg"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-lg mt-4"
              >
                Get Started
              </Button>
            </nav>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}