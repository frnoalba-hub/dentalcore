import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ArrowUpRight, ChevronRight, Package } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { companyInfo, products as localProducts } from './productsData';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from '@/lib/i18n';
import { toast } from 'sonner';
import { trackEngagementEvent } from '@/lib/trackEvent';

const promos = [
  { text: 'AirPeak™ — 3 + 1 Coupler for $1,000', productId: 'A1004-V2', qty: 3 },
  { text: 'iTesla G600-S — Buy 2, Get 1 Free', productId: 'A1003', qty: 2 },
  { text: 'ModuLite X — Buy 2, Get 1 Free', productId: 'M1042X', qty: 2 },
  { text: 'OsseoSeal Bone Graft — Now Available', productId: 'OS-SEAL-SYR', qty: 1 },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const { openCart, getItemCount, addItem } = useCartStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const primaryNav = [
    { label: t('catalog'), id: 'catalog' },
    { label: t('featured'), id: 'featured' },
    { label: t('about'), id: 'about' },
    { label: t('contact'), id: 'contact' },
  ];

  const secondaryNav = [
    { label: 'Reviews', id: 'testimonials' },
    { label: 'Guides', to: '/guides/air-driven-vs-electric-handpieces' },
    { label: 'Handpieces', to: '/c/handpieces' },
    { label: 'DSOs & groups', to: '/group-practices' },
    { label: 'Track Order', to: '/track-order' },
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
      <header
        className={`fixed top-0 w-full z-50 bg-[#111] transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.25)]' : ''
        }`}
      >
        {/* Promo ticker — thin line at very top */}
        <div className="border-b border-white/[0.06] flex items-center justify-center h-7 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={promoIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-white/50 flex items-center gap-2"
            >
              <span className="text-accent text-[8px]">&#9679;</span>
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
                className="underline underline-offset-4 text-white/40 hover:text-accent transition-colors flex items-center gap-0.5"
              >
                Shop <ChevronRight className="w-2.5 h-2.5" />
              </button>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Main nav row */}
        <div className="w-full px-5 lg:px-10">
          <div className="h-14 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-baseline gap-0 group shrink-0" onClick={() => setMobileOpen(false)}>
              <span className="text-[22px] font-bold tracking-tight text-white group-hover:text-accent transition-colors duration-200" style={{ fontFamily: 'var(--font-sans)' }}>
                CORETIX
              </span>
              <span className="text-accent text-[22px] font-bold group-hover:text-white transition-colors duration-200">.</span>
            </Link>

            {/* Desktop nav — right aligned */}
            <nav className="hidden lg:flex items-center gap-7">
              {primaryNav.map((link) =>
                link.to ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-[12px] font-semibold tracking-[0.14em] uppercase text-white/45 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    type="button"
                    className="text-[12px] font-semibold tracking-[0.14em] uppercase text-white/45 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                ),
              )}

              <span className="w-px h-4 bg-white/15" aria-hidden />

              <a
                href={`mailto:${companyInfo.email}`}
                onClick={() =>
                  trackEngagementEvent('contact_click', {
                    method: 'email',
                    location: 'header_desktop',
                  })
                }
                className="text-[12px] font-semibold tracking-[0.14em] uppercase text-white/35 hover:text-white transition-colors flex items-center gap-1"
              >
                Email <ArrowUpRight className="w-3 h-3" />
              </a>

              <button
                type="button"
                onClick={openCart}
                className="relative flex items-center gap-2 text-white/60 hover:text-white transition-colors px-2 py-1.5 -mr-1"
              >
                <div className="relative">
                  <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
              </button>
            </nav>

            {/* Mobile: cart + hamburger */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={openCart}
                className="relative text-white/60 hover:text-white transition-colors p-1"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-[15px] h-[15px] bg-accent text-white text-[9px] font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="text-white/60 hover:text-white p-2 -mr-2 transition-colors"
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
              className="fixed inset-x-0 top-[84px] bottom-0 z-[55] bg-black/40 backdrop-blur-[2px] lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              className="fixed inset-x-0 top-[84px] bottom-0 z-[56] bg-[#111] lg:hidden overflow-y-auto"
            >
              <nav className="flex flex-col p-8 gap-7 min-h-full">
                {[...primaryNav, ...secondaryNav].map((link) =>
                  link.to ? (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl sm:text-3xl font-semibold tracking-tight uppercase text-white/80 text-left hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.id}
                      onClick={() => scrollTo(link.id)}
                      className="text-2xl sm:text-3xl font-semibold tracking-tight uppercase text-white/80 text-left hover:text-accent transition-colors"
                    >
                      {link.label}
                    </button>
                  ),
                )}
                <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
                  <a
                    href={`tel:${companyInfo.phone}`}
                    onClick={() =>
                      trackEngagementEvent('phone_click', {
                        event_category: 'engagement',
                        location: 'header_mobile_menu',
                      })
                    }
                    className="text-base text-white/40 hover:text-accent transition-colors"
                  >
                    {companyInfo.phone}
                  </a>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    onClick={() =>
                      trackEngagementEvent('contact_click', {
                        method: 'email',
                        location: 'header_mobile_menu',
                      })
                    }
                    className="text-base text-white/40 hover:text-accent transition-colors"
                  >
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
