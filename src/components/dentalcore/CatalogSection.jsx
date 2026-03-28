import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '../../utils';
import { useCartStore } from '../store/cartStore';

export default function CatalogSection() {
  const [filter, setFilter] = useState('All');
  const { addItem, openCart } = useCartStore();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (filter !== 'All') filtered = filtered.filter(p => p.category === filter);
    return [...filtered].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  }, [products, filter]);

  return (
    <section id="catalog" className="py-24 bg-[#FDFDFD]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="section-title mb-0">Index</h2>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 text-xs font-medium uppercase tracking-widest transition-colors border ${
                  filter === cat
                    ? 'border-[#111] bg-[#111] text-white'
                    : 'border-[#111]/10 text-[#111]/60 hover:border-[#111] hover:text-[#111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-32 border border-[#111]/10">
            <Loader2 className="w-8 h-8 animate-spin text-[#111]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-[#111]/10">
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}>
                <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
                  <article className="group relative h-full flex flex-col bg-[#FDFDFD] border-r border-b border-[#111]/10 hover:bg-[#F5F5F5] transition-colors">
                    <div className="relative aspect-square px-8 pb-8 pt-16 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain object-bottom mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#111]/50 border border-[#111]/10 px-2 py-1 bg-white/80">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 border-t border-[#111]/10 flex flex-col flex-1 justify-between bg-white">
                      <div>
                        <h3 className="text-base font-semibold text-[#111] tracking-tight uppercase mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-[#111]/60 font-body line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center justify-between">
                        <p className="text-xl font-medium tracking-tight text-[#111]">{product.price}</p>
                        <span className="text-xs font-medium uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}