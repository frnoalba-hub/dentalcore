import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products as catalog } from './productsData';
import { trackEngagementEvent } from '@/lib/trackEvent';

/** ~6s per slide — common retail carousel timing (5–8s range). */
const ROTATE_MS = 6000;

const HERO_PRODUCT_IDS = [
  '1006-1',
  '1002-1',
  'MTA-1',
  'A1004-V2',
  'M1001',
  'M1002',
  'A1003',
  'M1042X',
  'A1030',
  'OS-SEAL-SYR',
  'OSTEO-PLUG',
  '1008-1',
];

const HERO_PROMOS = [
  {
    id: 'promo-airpeak',
    headline: 'AirPeak 3 + 1 Coupler',
    detail: 'Bundle three handpieces plus a coupler for $1,000',
    productId: 'A1004-V2',
    linkLabel: 'Shop AirPeak',
  },
  {
    id: 'promo-suretact',
    headline: 'SureTact G3 Matrix Kit',
    detail: 'Buy 2 complete kits for $400. Strong value on sectional matrix systems.',
    productId: 'M1001',
    linkLabel: 'Shop SureTact',
  },
  {
    id: 'promo-b2g1-itesla',
    headline: 'iTesla G600-S',
    detail: 'Buy 2, Get 1 Free on the 1:5 red-band attachment.',
    productId: 'A1003',
    linkLabel: 'View iTesla',
  },
  {
    id: 'promo-b2g1-modulite',
    headline: 'ModuLite X Curing Light',
    detail: 'Buy 2, Get 1 Free. Stack lights across operatories.',
    productId: 'M1042X',
    linkLabel: 'View ModuLite',
  },
  {
    id: 'promo-b2g1-rings',
    headline: 'SureTact G3 Rings',
    detail: 'Buy 2 packs, Get 1 Free on replacement NiTi rings.',
    productId: 'M1002',
    linkLabel: 'Shop rings',
  },
  {
    id: 'promo-osseo',
    headline: 'OsseoSeal Bone Graft',
    detail: 'Prefilled syringes, powder, and collagen membranes in stock.',
    productId: 'OS-SEAL-SYR',
    linkLabel: 'Shop OsseoSeal',
  },
];

function buildHeroSlides() {
  const slides = [];
  let promoIdx = 0;
  HERO_PRODUCT_IDS.forEach((id, i) => {
    const product = catalog.find((p) => p.id === id);
    if (product) slides.push({ type: 'product', id: product.id, product });
    if ((i + 1) % 2 === 0 && promoIdx < HERO_PROMOS.length) {
      slides.push({ type: 'promo', ...HERO_PROMOS[promoIdx++] });
    }
  });
  while (promoIdx < HERO_PROMOS.length) {
    slides.push({ type: 'promo', ...HERO_PROMOS[promoIdx++] });
  }
  return slides;
}

function formatUsd(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function productThumb(product) {
  if (!product) return '';
  return product.image || product.images?.[0] || '';
}

function promoThumb(promo) {
  const linked = catalog.find((p) => p.id === promo.productId);
  return productThumb(linked);
}

export default function HeroProductShowcase() {
  const slides = useMemo(() => buildHeroSlides(), []);
  const thumbStripRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (paused || slides.length < 2) return undefined;
    const timer = setInterval(() => go(1), ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, go, slides.length]);

  // Scroll only the thumbnail strip horizontally — never scrollIntoView (jumps the page).
  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const active = strip.querySelector('[data-active="true"]');
    if (!active) return;

    const targetLeft =
      active.offsetLeft - strip.clientWidth / 2 + active.offsetWidth / 2;
    strip.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
  }, [index]);

  if (!slides.length) return null;

  const slide = slides[index];
  const isProduct = slide.type === 'product';
  const product = isProduct ? slide.product : catalog.find((p) => p.id === slide.productId);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#111]/40">
          Featured products &amp; promos
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="p-2 text-[#111]/35 hover:text-[#111] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="p-2 text-[#111]/35 hover:text-[#111] transition-colors"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isProduct ? (
          <motion.div
            key={`product-${slide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Link
              to={`/p/${slide.product.slug}`}
              onClick={() =>
                trackEngagementEvent('hero_product_click', {
                  sku: slide.product.id,
                  slide_index: index,
                })
              }
              className="group block border border-[#111]/10 bg-white hover:border-accent/40 transition-colors duration-300"
            >
              <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] overflow-hidden bg-[#f6f6f6]">
                <img
                  src={productThumb(slide.product)}
                  alt={slide.product.name}
                  className="absolute inset-0 w-full h-full object-contain p-6 sm:p-8 lg:p-10"
                />
                {slide.product.promo && (
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-accent text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1">
                    Promo
                  </span>
                )}
                {slide.product.variants?.length > 0 && (
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#111] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1">
                    Kit options
                  </span>
                )}
              </div>

              <div className="border-t border-[#111]/10 px-4 sm:px-5 py-4 sm:py-5 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#111]/40 font-semibold mb-1.5">
                    {slide.product.category}
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-[#111] truncate group-hover:text-accent transition-colors">
                    {slide.product.name}
                  </p>
                  <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                    {slide.product.variants?.length > 0 && (
                      <span className="text-xs text-[#111]/45 uppercase tracking-widest font-semibold mr-1">From</span>
                    )}
                    <span className="text-lg sm:text-xl font-semibold text-[#111] tabular-nums">
                      {formatUsd(slide.product.price)}
                    </span>
                    {slide.product.originalPrice > slide.product.price && (
                      <span className="text-sm text-[#111]/35 line-through tabular-nums">
                        {formatUsd(slide.product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {slide.product.promo && (
                    <p className="mt-1.5 text-[10px] sm:text-[11px] text-accent font-semibold uppercase tracking-[0.1em]">
                      {slide.product.promo}
                    </p>
                  )}
                </div>
                <span className="shrink-0 flex items-center gap-1 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-semibold text-[#111]/45 group-hover:text-accent transition-colors pb-0.5">
                  View
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key={`promo-${slide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Link
              to={product?.slug ? `/p/${product.slug}` : '/#catalog'}
              onClick={() =>
                trackEngagementEvent('hero_promo_click', {
                  promo_id: slide.id,
                  product_id: slide.productId,
                  slide_index: index,
                })
              }
              className="group block border border-[#111]/10 bg-white hover:border-accent/40 transition-colors duration-300"
            >
              <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] overflow-hidden bg-[#f6f6f6]">
                {promoThumb(slide) ? (
                  <img
                    src={promoThumb(slide)}
                    alt={product?.name || slide.headline}
                    className="absolute inset-0 w-full h-full object-contain p-6 sm:p-8 lg:p-10"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[#111]/25 text-sm uppercase tracking-widest">
                    {slide.headline}
                  </div>
                )}
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 inline-flex items-center gap-1.5 bg-accent text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1">
                  <Tag className="w-3 h-3" />
                  Active promotion
                </span>
              </div>

              <div className="border-t border-[#111]/10 px-4 sm:px-5 py-4 sm:py-5 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-semibold mb-1.5">
                    Promotion
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-[#111] group-hover:text-accent transition-colors leading-snug">
                    {slide.headline}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-[#111]/55 font-body leading-relaxed">
                    {slide.detail}
                  </p>
                  {product?.promo && (
                    <p className="mt-2 text-[10px] sm:text-[11px] text-accent font-semibold uppercase tracking-[0.1em]">
                      {product.promo}
                    </p>
                  )}
                </div>
                <span className="shrink-0 flex items-center gap-1 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-semibold text-[#111]/45 group-hover:text-accent transition-colors pb-0.5">
                  {slide.linkLabel}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex items-center gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.type === 'product' ? s.id : s.id}
            type="button"
            aria-label={s.type === 'product' ? `Show ${s.product.name}` : `Show promo: ${s.headline}`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => setIndex(i)}
            className={`h-1 flex-1 transition-colors duration-300 ${
              i === index ? 'bg-accent' : 'bg-[#111]/10 hover:bg-[#111]/20'
            }`}
          />
        ))}
      </div>

      <div
        ref={thumbStripRef}
        className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory"
      >
        {slides.map((s, i) => {
          const thumb =
            s.type === 'product' ? productThumb(s.product) : promoThumb(s);
          const label = s.type === 'product' ? s.product.name : s.headline;
          return (
            <button
              key={s.type === 'product' ? `t-${s.id}` : `t-${s.id}`}
              type="button"
              data-active={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
              aria-label={`Show ${label}`}
              className={`shrink-0 snap-start w-14 h-14 sm:w-16 sm:h-16 border transition-all ${
                i === index
                  ? 'border-accent bg-white ring-1 ring-accent/30'
                  : 'border-[#111]/10 bg-[#f8f8f8] hover:border-[#111]/25'
              }`}
            >
              {thumb ? (
                <img src={thumb} alt="" className="w-full h-full object-contain p-1.5" />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-[9px] text-white/60 uppercase tracking-widest px-1">
                  Deal
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
