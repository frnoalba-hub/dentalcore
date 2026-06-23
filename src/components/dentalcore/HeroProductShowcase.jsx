import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products as catalog } from './productsData';
import { trackEngagementEvent } from '@/lib/trackEvent';

/** Flagship SKUs for the homepage hero carousel (order = first slide). */
const HERO_PRODUCT_IDS = [
  'A1004-V2',
  '1002-1',
  '1006-1',
  'A1003',
  '1007-1',
  'OS-SEAL-SYR',
];

const ROTATE_MS = 5000;

function formatUsd(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default function HeroProductShowcase() {
  const slides = useMemo(
    () =>
      HERO_PRODUCT_IDS.map((id) => catalog.find((p) => p.id === id)).filter(Boolean),
    [],
  );

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

  if (!slides.length) return null;

  const product = slides[index];
  const image = product.image || product.images?.[0];

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
          Featured products
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous product"
            className="p-2 text-[#111]/35 hover:text-[#111] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next product"
            className="p-2 text-[#111]/35 hover:text-[#111] transition-colors"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <Link
        to={`/p/${product.slug}`}
        onClick={() =>
          trackEngagementEvent('hero_product_click', {
            sku: product.id,
            slide_index: index,
          })
        }
        className="group block border border-[#111]/10 bg-white hover:border-accent/40 transition-colors duration-300"
      >
        <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] overflow-hidden bg-[#f6f6f6]">
          <AnimatePresence mode="wait">
            <motion.img
              key={product.id}
              src={image}
              alt={product.name}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-contain p-6 sm:p-8 lg:p-10"
            />
          </AnimatePresence>
          {product.promo && (
            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-accent text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1">
              Promo
            </span>
          )}
        </div>

        <div className="border-t border-[#111]/10 px-4 sm:px-5 py-4 sm:py-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#111]/40 font-semibold mb-1.5">
              {product.category}
            </p>
            <p className="text-sm sm:text-base font-semibold text-[#111] truncate group-hover:text-accent transition-colors">
              {product.name}
            </p>
            <div className="mt-2 flex items-baseline gap-2 flex-wrap">
              <span className="text-lg sm:text-xl font-semibold text-[#111] tabular-nums">
                {formatUsd(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-[#111]/35 line-through tabular-nums">
                  {formatUsd(product.originalPrice)}
                </span>
              )}
            </div>
            {product.promo && (
              <p className="mt-1.5 text-[10px] sm:text-[11px] text-accent font-semibold uppercase tracking-[0.1em]">
                {product.promo}
              </p>
            )}
          </div>
          <span className="shrink-0 flex items-center gap-1 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-semibold text-[#111]/45 group-hover:text-accent transition-colors pb-0.5">
            View
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>

      <div className="mt-4 flex items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.name}`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => setIndex(i)}
            className={`h-1 flex-1 transition-colors duration-300 ${
              i === index ? 'bg-accent' : 'bg-[#111]/10 hover:bg-[#111]/20'
            }`}
          />
        ))}
      </div>

      <div className="mt-3 hidden sm:flex gap-2 overflow-x-auto pb-1">
        {slides.map((slide, i) => {
          const thumb = slide.image || slide.images?.[0];
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${slide.name}`}
              className={`shrink-0 w-14 h-14 border transition-colors ${
                i === index
                  ? 'border-accent bg-white'
                  : 'border-[#111]/10 bg-[#f8f8f8] hover:border-[#111]/25'
              }`}
            >
              <img src={thumb} alt="" className="w-full h-full object-contain p-1.5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
