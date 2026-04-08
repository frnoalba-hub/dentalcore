import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ArrowUpRight, ChevronRight, Package } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { companyInfo, products as localProducts } from './productsData';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from '@/lib/i18n';
import { toast } from 'sonner';

const promos = [
  { text: 'AirPeak™ Handpieces — 3 + 1 Coupler for $1,000', productId: 'A1004-V2', qty: 3 },
  { text: 'iTesla G600-S — Buy 2, Get 1 Free', productId: 'A1003', qty: 2 },
  { text: 'ModuLite X Curing Light — Buy 2, Get 1 Free', productId: 'M1042X', qty: 2 },
  { text: 'OsseoSeal Bone Graft & Membrane — Now Available', productId: 'OS-SEAL-SYR', qty: 1 },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const { openCart, getItemCount, addItem } = useCartStore();
  const { t, lang, setLang } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: t('catalog'), id: 'catalog' },
    { label: t('featured'), id: 'featured' },
    { label: 'Reviews', id: 'testimonials' },
    { label: t('about'), id: 'about' },
    { label: 'DSOs & groups', to: '/group-practices' },
  ];
  const itemCount = getItemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPromoIndex(i => (i + 1) % promos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: `#${id}` });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Promo announcement bar */}
      <div className="fixed top-0 w-full z-50 bg-[#111] text-white h-9 flex items-center justify-center overflow-hidden border-b border-white/10 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.p
            key={promoIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-medium uppercase tracking-[0.15em] flex items-center gap-2"
          >
            <span className="text-accent">●</span>
            {promos[promoIndex].text}
            <button
              onClick={() => {
                const promo = promos[promoIndex];
                const product = localProducts.find(p => p.id === promo.productId);
                if (product) {
                  addItem(product, promo.qty);
                  openCart();
                  toast.success(`Added ${product.name} to cart`);
                }
              }}
              className="underline underline-offset-4 opacity-70 hover:opacity-100 hover:text-accent transition-all flex items-center gap-0.5 rounded-sm px-1 -mx-1"
            >
              Shop <ChevronRight className="w-3 h-3" />
            </button>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Main header — offset by promo bar height (36px) */}
      <header
        className={`fixed top-9 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FDFDFD]/95 backdrop-blur-md border-b border-[#111]/10 shadow-card'
            : 'bg-[#FDFDFD] border-b border-[#111]/10'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="h-16 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0" onClick={() => setMobileOpen(false)}>
              <span className="text-lg font-bold tracking-widest uppercase text-[#111] group-hover:text-accent transition-colors duration-300">
                CORETIX<span className="text-accent group-hover:text-[#111] transition-colors duration-300">.</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) =>
                link.to ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-xs font-semibold tracking-widest uppercase text-[#111]/55 hover:text-[#111] transition-colors relative group py-1"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out" />
                  </Link>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    type="button"
                    className="text-xs font-semibold tracking-widest uppercase text-[#111]/55 hover:text-[#111] transition-colors relative group py-1"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out" />
                  </button>
                ),
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-5">
              <Link
                to="/track-order"
                className="hidden xl:flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-[#111]/50 hover:text-[#111] transition-colors"
              >
                <Package className="w-3.5 h-3.5" /> Track Order
              </Link>

              <a
                href={`mailto:${companyInfo.email}`}
                className="hidden xl:flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-[#111]/50 hover:text-[#111] transition-colors"
              >
                Contact <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={openCart}
                className="relative flex items-center gap-2 text-[#111] hover:text-accent transition-colors rounded-sm px-2 py-1.5 -mr-1 hover:bg-[#111]/[0.04] active:bg-[#111]/[0.07]"
              >
                <span className="text-xs font-semibold tracking-widest uppercase hidden sm:block">Cart</span>
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
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="lg:hidden text-[#111] p-2 -mr-2 rounded-sm hover:bg-[#111]/[0.04] active:bg-[#111]/[0.07] transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-[100px] bottom-0 z-[55] bg-[#111]/25 backdrop-blur-[2px] lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed inset-x-0 top-[100px] bottom-0 z-[56] bg-[#FDFDFD] lg:hidden overflow-y-auto border-t border-[#111]/10 shadow-drawer"
            >
              <nav className="flex flex-col p-8 gap-8 min-h-full max-w-lg">
                {navLinks.map((link) =>
                  link.to ? (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="text-3xl font-semibold tracking-tighter uppercase text-[#111] text-left hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.id}
                      onClick={() => scrollTo(link.id)}
                      className="text-3xl font-semibold tracking-tighter uppercase text-[#111] text-left hover:text-accent transition-colors"
                    >
                      {link.label}
                    </button>
                  ),
                )}
                <Link
                  to="/track-order"
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-semibold tracking-tighter uppercase text-[#111] text-left hover:text-accent transition-colors"
                >
                  Track Order
                </Link>
                <div className="mt-auto pt-8 border-t border-[#111]/10 flex flex-col gap-4">
                  <a href={`tel:${companyInfo.phone}`} className="text-sm uppercase tracking-wide text-[#111]/60 mt-4">
                    {companyInfo.phone}
                  </a>
                  <a href={`mailto:${companyInfo.email}`} className="text-sm uppercase tracking-wide text-[#111]/60">
                    {companyInfo.email}
                  </a>
                </div>
              </nav>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}