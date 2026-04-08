import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from '@/lib/i18n';
import { ArrowUpRight } from 'lucide-react';
import { products as catalog } from './productsData';
import { productRelativePath } from '@/lib/productPaths';

/** About spotlight: biomaterials (local images + catalog pricing). Featured above = handpieces. */
const ABOUT_PRODUCT_ID = 'OS-SEAL-SYR';

const bioSpecs = [
  { label: 'Graft type', value: 'Cortico-cancellous' },
  { label: 'Particle size', value: '250–800 µm' },
  { label: 'Form', value: 'Prefilled syringe' },
  { label: 'Volumes', value: '0.3 – 1.0 cc' },
];

export default function AboutSection() {
  const { addItem, openCart } = useCartStore();
  const { t, dynamicT } = useTranslation();

  const product = catalog.find((p) => p.id === ABOUT_PRODUCT_ID);
  if (!product) return null;

  const defaultVariant = product.variants?.[0];
  const handleAdd = () => {
    if (defaultVariant) {
      addItem(
        {
          ...product,
          id: defaultVariant.id,
          name: `${product.name} — ${defaultVariant.name}`,
          price: defaultVariant.price,
          image: defaultVariant.image || product.image,
        },
        1
      );
    } else {
      addItem(product, 1);
    }
    openCart();
  };

  const addLabelPrice =
    defaultVariant != null
      ? `$${Number(defaultVariant.price).toFixed(2)}`
      : typeof product.price === 'number'
        ? `$${product.price.toFixed(2)}`
        : product.price;

  return (
    <section id="about" className="py-24 lg:py-28 bg-[#FDFDFD] border-b border-[#111]/10 scroll-mt-[100px]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="mb-12 lg:mb-14 max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#111]/35 font-semibold mb-3 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-[#111]/30" />
            Biomaterials
          </p>
          <p className="text-sm text-[#111]/40 font-body leading-relaxed">
            OsseoSeal mineralized allograft and membranes — same line as our site promos, priced for clinical volume.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 border border-[#111]/10 rounded-card overflow-hidden shadow-card bg-white">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-b from-[#F5F5F5] to-[#EBEBEB] flex items-center justify-center p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-[#111]/10 min-h-[400px]"
          >
            <img
              src={product.image}
              alt={dynamicT(product.name)}
              className="w-full max-w-sm object-contain mix-blend-multiply"
            />
            <div className="absolute top-6 left-6">
              <span className="text-[10px] font-bold uppercase tracking-widest border border-[#111]/20 rounded-sm px-3 py-1.5 bg-white/95 text-[#111] shadow-card">
                OsseoSeal™
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 lg:p-16 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter uppercase text-[#111] leading-[1.08] mb-4">
                {dynamicT(product.name)}
              </h2>
              <p className="text-sm uppercase tracking-widest text-[#111]/40 mb-8 font-medium">
                Mineralized allograft — syringe delivery
              </p>

              <p className="text-lg text-[#111]/70 font-body leading-relaxed mb-10 max-w-md">
                {dynamicT(product.description)}
              </p>

              <div className="grid grid-cols-2 border-t border-l border-[#111]/10 mb-10">
                {bioSpecs.map((spec, i) => (
                  <div key={i} className="border-b border-r border-[#111]/10 p-5">
                    <p className="text-xs uppercase tracking-widest text-[#111]/40 mb-1 font-medium">{spec.label}</p>
                    <p className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111] leading-tight">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="group flex-1 flex items-center justify-between gap-3 border border-[#111] rounded-sm bg-[#111] text-white px-6 py-4 text-sm font-medium uppercase tracking-widest shadow-card hover:bg-accent hover:border-accent hover:shadow-card-hover active:scale-[0.99] transition-all"
              >
                <span className="text-left">
                  {t('add_to_requisition')} — {addLabelPrice}
                  {defaultVariant ? (
                    <span className="block text-[10px] font-normal normal-case tracking-normal text-white/75 mt-1.5">
                      Starts at {defaultVariant.name}; all sizes on product page
                    </span>
                  ) : null}
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <Link
                to={productRelativePath(product)}
                className="flex flex-1 sm:flex-none items-center justify-center border border-[#111]/20 rounded-sm text-[#111] px-6 py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#111]/5 hover:border-[#111]/35 transition-colors text-center"
              >
                {t('view_details')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
