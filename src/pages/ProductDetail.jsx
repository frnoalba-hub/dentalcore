import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useCartStore } from '../components/store/cartStore';
import { useTranslation } from '@/lib/i18n';
import { products as localProducts } from '../components/dentalcore/productsData';

export default function ProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCartStore();
  const { t, dynamicT } = useTranslation();

  const { data: apiProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  // Merge local + API products (local takes priority for promo pricing)
  const allProducts = useMemo(() => {
    const localIds = new Set(localProducts.map(p => p.id));
    const apiOnly = apiProducts.filter(p => !localIds.has(p.id));
    return [...localProducts, ...apiOnly];
  }, [apiProducts]);

  const product = allProducts.find(p => p.id === productId);
  const allImages = product ? [product.image, ...(product.images || [])].filter(Boolean) : [];

  const isProductLoading = isLoading && !localProducts.find(p => p.id === productId);
  if (isProductLoading) return <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center text-sm uppercase tracking-widest">{t('loading')}</div>;
  if (!product) return <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center">Not Found</div>;

  const priceDisplay = product.originalPrice
    ? `$${Number(product.price).toFixed(2)}`
    : typeof product.price === 'number'
    ? `$${product.price.toFixed(2)}`
    : product.price;

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#111]/50 hover:text-[#111] mb-12">
          <ArrowLeft className="w-4 h-4" /> {t('back_to_index')}
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 border-t border-[#111]/10 pt-12">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square border border-[#111]/10 p-12 flex items-center justify-center bg-white mix-blend-multiply">
              <img src={allImages[selectedImage]} alt={dynamicT(product.name)} className="w-full h-full object-contain" />
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((img, idx) => (
                  <button key={idx} onClick={() => setSelectedImage(idx)} className={`aspect-square border p-4 ${selectedImage === idx ? 'border-[#111]' : 'border-[#111]/10'} bg-white`}>
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent block mb-4">{dynamicT(product.category)}</span>
            <h1 className="text-4xl lg:text-5xl font-medium tracking-tighter uppercase text-[#111] mb-6">{dynamicT(product.name)}</h1>
            <p className="text-3xl font-medium text-[#111] mb-8">{priceDisplay}</p>
            
            <p className="text-base text-[#111]/70 font-body leading-relaxed mb-12">{dynamicT(product.description)}</p>

            <div className="flex items-stretch gap-4 mb-16">
              <div className="flex items-center border border-[#111]">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-[#111] hover:text-white transition-colors">-</button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-[#111] hover:text-white transition-colors">+</button>
              </div>
              <button 
                onClick={() => { addItem(product, quantity); openCart(); }}
                className="flex-1 bg-[#111] text-white flex items-center justify-between px-6 hover:bg-accent transition-colors"
              >
                <span className="text-sm uppercase tracking-widest font-medium">{t('add_to_requisition')}</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>

            {/* Specs Grid */}
            <div className="border-t border-[#111]/10">
              {product.features?.length > 0 && (
                <div className="py-6 border-b border-[#111]/10">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">{t('core_specifications')}</h3>
                  <ul className="space-y-2 font-body text-sm text-[#111]/70">
                    {product.features.map((f, i) => <li key={i}>— {dynamicT(f)}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}