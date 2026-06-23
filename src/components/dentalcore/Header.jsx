import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { companyInfo, products as localProducts } from './productsData';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from '@/lib/i18n';
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
  const { openCart, getItemCount } = useCartStore();
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
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Guides', to: '/guides/air-driven-vs-electric-handpieces' },
    { label: 'Handpieces', to: '/c/handpieces' },
    { label: 'Policies', to: '/policies' },
    { label: 'DSOs & groups', to: '/group-practices' },
    { label: 'Track Order', to: '/track-order' },
  ];

  // Key routes surfaced on desktop too (the rest stay in the mobile menu)
  const desktopSecondaryNav = [
    { label: 'Guides', to: '/guides/air-driven-vs-electric-handpieces' },
    { label: 'Policies', to: '/policies' },
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
        aria-label={companyInfo.companyName}
        className={`fixed top-0 w-full z-50 bg-[#111] transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.25)]' : ''
        }`}
      >
        {/* Promo ticker — promos centered on mobile; motto + promos balanced in 3-col grid from md up */}
        <div className="border-b border-white/[0.06] grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center h-7 overflow-hidden px-2 sm:px-4 gap-x-3">
          <span
            className="hidden md:block md:col-start-1 min-w-0 truncate text-[9px] font-medium tracking-[0.06em] text-white/38 italic"
            title={companyInfo.headerTickerMottoPlain}
          >
            {companyInfo.headerTickerMotto}
          </span>
          <div className="col-start-1 md:col-start-2 flex justify-center min-w-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={promoIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-white/50 flex items-center justify-center gap-2 truncate max-w-full"
              >
                <span className="text-accent text-[8px] shrink-0">&#9679;</span>
                <span className="truncate">{promos[promoIndex].text}</span>
                {(() => {
                  const row = promos[promoIndex];
                  const product = localProducts.find((p) => p.id === row.productId);
                  if (!product?.slug) return null;
                  return (
                    <Link
                      to={`/p/${product.slug}`}
                      onClick={() =>
                        trackEngagementEvent('header_promo_product_link', {
                          sku: product.id,
                          promo_index: promoIndex,
                        })
                      }
                      className="underline underline-offset-4 text-white/40 hover:text-accent transition-colors flex items-center gap-0.5 shrink-0"
                    >
                      View <ChevronRight className="w-2.5 h-2.5" />
                    </Link>
                  );
                })()}
              </motion.p>
            </AnimatePresence>
          </div>
          <span className="hidden md:block md:col-start-3" aria-hidden />
        </div>

        {/* Main nav row */}
        <div className="w-full px-5 lg:px-10">
          <div className="h-14 lg:h-[4.75rem] flex items-center justify-between">

            {/* Logo */}
            <Link
              to="/"
              className="flex flex-col gap-0 sm:gap-0.5 shrink-0 leading-none group"
              onClick={() => setMobileOpen(false)}
            >
              <span className="flex items-baseline gap-0">
                <span
                  className="text-[22px] lg:text-[1.625rem] xl:text-[1.75rem] font-bold lg:font-black tracking-tight text-white group-hover:text-accent transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {companyInfo.logoText}
                </span>
                <span className="text-accent text-[22px] lg:text-[1.625rem] xl:text-[1.75rem] font-bold lg:font-black group-hover:text-white transition-colors duration-200">
                  .
                </span>
              </span>
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-semibold tracking-[0.2em] uppercase text-white/45 group-hover:text-white/60 transition-colors">
                {companyInfo.tagline}
              </span>
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

              {desktopSecondaryNav.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[12px] font-semibold tracking-[0.14em] uppercase text-white/35 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}

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
                aria-label={`Open cart${itemCount > 0 ? ` (${itemCount} items)` : ''}`}
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
                aria-label={`Open cart${itemCount > 0 ? ` (${itemCount} items)` : ''}`}
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
              className="fixed inset-x-0 top-[var(--site-header-height)] bottom-0 z-[55] bg-black/40 backdrop-blur-[2px] lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              className="fixed inset-x-0 top-[var(--site-header-height)] bottom-0 z-[56] bg-[#111] lg:hidden overflow-y-auto"
            >
              <nav className="flex flex-col p-8 gap-7 min-h-full">
                <div className="pb-6 border-b border-white/10 -mt-1">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/55">
                    {companyInfo.companyName}
                  </p>
                  <p className="text-[10px] mt-1.5 tracking-[0.2em] uppercase text-white/35">
                    {companyInfo.tagline}
                  </p>
                </div>
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