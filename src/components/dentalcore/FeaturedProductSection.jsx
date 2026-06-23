import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from '@/lib/i18n';
import { products as catalog } from './productsData';

/** Rotates weekly — endo heroes, SureTact, and AirPeak (no Stronic spotlight). */
const FEATURED_SLOTS = [
  {
    id: '1006-1',
    badge: 'UC-CUT',
    blurb:
      'Cordless sonic GP cutting for obturation and retreatment. Choose the handpiece unit or the Full Kit with everything bundled.',
    highlights: [
      'Rapid heat-up with sonic vibration for clean GP separation',
      'Cordless mobility across all operatories',
      'Handpiece unit or Full Kit options on one product page',
      'Interchangeable tip profiles for posterior and anterior cases',
    ],
  },
  {
    id: '1002-1',
    badge: 'UC-ONE',
    blurb:
      'Cordless ultrasonic irrigation that drives irrigant into canal anatomy. Unit or Full Kit with tips and stand.',
    highlights: [
      'Ultrasonic activation for debris and biofilm disruption',
      'Handpiece + stand, or Full Kit with tip set included',
      'Cordless design for posterior and anterior access',
      'Direct pricing with clinical support from Coretix',
    ],
  },
  {
    id: 'M1001',
    badge: 'SureTact',
    blurb:
      'Complete sectional matrix system for Class II composites. Buy 2 kits for $400 — strong value for restorative teams.',
    highlights: [
      '100 matrices in four heights plus wedges and NiTi rings',
      'Smart-Loop design with ELAMAX ring technology',
      'Buy 2 Kits for $400 promotion at checkout',
      'Replacement rings available with Buy 2, Get 1 Free',
    ],
  },
  {
    id: 'A1004-V2',
    badge: 'AirPeak™',
    blurb:
      'KaVo-style titanium high-speed handpieces with fiber optics. Bundle 3 handpieces + 1 coupler for $1,000.',
    highlights: [
      'Titanium body with quad-port spray and fiber optics',
      'KaVo MULTIflex compatible for direct chairside fit',
      'List price $399 with MSRP $599 strike-through',
      '3 + 1 coupler bundle for multi-op standardization',
    ],
  },
];

function featuredSlotIndex() {
  const anchor = Date.UTC(2026, 0, 5);
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const w = Math.floor((Date.now() - anchor) / weekMs);
  return ((w % FEATURED_SLOTS.length) + FEATURED_SLOTS.length) % FEATURED_SLOTS.length;
}

export default function FeaturedProductSection() {
  const { addItem, openCart } = useCartStore();
  const { t, dynamicT } = useTranslation();

  const slot = useMemo(() => FEATURED_SLOTS[featuredSlotIndex()], []);
  const product = catalog.find((p) => p.id === slot.id);
  if (!product) return null;

  const hasVariants = product.variants?.length > 0;
  const displayPrice = hasVariants
    ? Math.min(...product.variants.map((v) => v.price))
    : product.price;

  return (
    <section id="featured" className="py-24 lg:py-28 bg-[#111] text-white scroll-mt-[var(--site-header-height)] border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="mb-12 lg:mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/35 font-semibold mb-3 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-white/25" />
            {t('featured') || 'Featured'}
          </p>
          <p className="text-sm text-white/45 font-body leading-relaxed">{slot.blurb}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-0 border border-white/10 rounded-card overflow-hidden shadow-modal bg-[#141414]">
          <div className="relative lg:col-span-5 flex min-h-[300px] sm:min-h-[380px] lg:min-h-[560px] items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-10 sm:p-14 lg:p-12 xl:p-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,71,255,0.12), transparent 65%)',
              }}
            />
            <motion.img
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              src={product.image}
              alt={dynamicT(product.name)}
              className="relative z-[1] w-full max-w-[280px] sm:max-w-sm lg:max-w-md object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            />
            <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-[1] border border-white/25 rounded-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#0a0a0a]/70 backdrop-blur-md text-white/95">
              {slot.badge}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center p-8 sm:p-10 lg:pl-14 lg:pr-16 lg:py-16 xl:pl-16 xl:pr-20">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col max-w-xl lg:max-w-none"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-medium tracking-tighter uppercase mb-8 leading-[1.08] text-balance">
                {dynamicT(product.name)}
              </h2>

              <div className="mb-8 rounded-sm border border-white/15 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-sm">
                <div className="flex flex-wrap items-end gap-x-4 gap-y-1 mb-3">
                  {hasVariants && (
                    <span className="text-sm uppercase tracking-widest text-white/40 pb-0.5">From</span>
                  )}
                  <span className="text-3xl sm:text-4xl font-medium tracking-tight tabular-nums">
                    ${typeof displayPrice === 'number' ? displayPrice.toFixed(2) : displayPrice}
                  </span>
                  {product.originalPrice != null && (
                    <span className="text-lg sm:text-xl text-white/35 line-through tabular-nums pb-0.5">
                      ${Number(product.originalPrice).toFixed(2)}
                    </span>
                  )}
                </div>
                {product.promo && (
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-accent leading-snug">
                    {product.promo}
                  </p>
                )}
                {hasVariants && (
                  <p className="mt-2 text-[11px] text-white/40 uppercase tracking-[0.12em]">
                    Unit and Full Kit options on the product page
                  </p>
                )}
              </div>

              <p className="text-base sm:text-lg text-white/55 font-body leading-relaxed mb-10 max-w-prose">
                {dynamicT(product.description)}
              </p>

              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold mb-4">
                Highlights
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 mb-10 lg:mb-12">
                {slot.highlights.map((feature, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm font-body text-white/75 leading-snug border border-white/10 rounded-sm bg-white/[0.02] p-4"
                  >
                    <span className="text-accent font-bold tabular-nums shrink-0 w-6">0{i + 1}</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {hasVariants ? (
                <Link
                  to={`/p/${product.slug}`}
                  className="group w-full sm:w-auto sm:min-w-[min(100%,320px)] flex items-center justify-between gap-4 border border-white/90 rounded-sm px-6 py-4 sm:py-5 shadow-card hover:bg-white hover:text-[#111] hover:shadow-card-hover active:scale-[0.99] transition-all"
                >
                  <span className="text-sm uppercase tracking-[0.2em] font-medium">Choose options</span>
                  <ArrowUpRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    addItem(product, 1);
                    openCart();
                  }}
                  className="group w-full sm:w-auto sm:min-w-[min(100%,320px)] flex items-center justify-between gap-4 border border-white/90 rounded-sm px-6 py-4 sm:py-5 shadow-card hover:bg-white hover:text-[#111] hover:shadow-card-hover active:scale-[0.99] transition-all"
                >
                  <span className="text-sm uppercase tracking-[0.2em] font-medium">{t('acquire_unit') || 'Add to Cart'}</span>
                  <ArrowUpRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
