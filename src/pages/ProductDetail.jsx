import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useTranslation } from '@/lib/i18n';
import { products as localProducts } from '../components/dentalcore/productsData';
import Header from '../components/dentalcore/Header';
import CartDrawer from '../components/cart/CartDrawer';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductPurchasePanel from '../components/product/ProductPurchasePanel';
import ProductSpecsTabs from '../components/product/ProductSpecsTabs';
import RelatedProducts from '../components/product/RelatedProducts';
import ProductJsonLd from '../components/seo/ProductJsonLd';

const SUPPRESSED_API_CATEGORIES = new Set([
  'Allograft / Osseoseal Membrane', 'Allograft', 'Osseoseal',
  'Wound Dressing', 'Collagen Dressing', 'Osteogen Plug',
]);
const SUPPRESSED_KEYWORDS = [
  'osteogen', 'curagen', 'heliplug', 'heli-plug', 'collagen wound',
  '0.3cc', '0.5cc', '1.0cc', '2.5cc', '5cc',
  '15x20', '20x30', '30x40', '15×20', '20×30', '30×40',
  '20 x 30', '30 x 40',
];

export default function ProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const { dynamicT } = useTranslation();
  const [selectedVariant, setSelectedVariant] = useState(null);

  const { data: apiProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const allProducts = useMemo(() => {
    const localIds = new Set(localProducts.map(p => p.id));
    const localNames = new Set(localProducts.map(p => p.name.toLowerCase()));
    const consolidatedVariantIds = new Set();
    localProducts.forEach(p => {
      if (p.variants) p.variants.forEach(v => consolidatedVariantIds.add(v.id));
    });
    const apiOnly = apiProducts.filter((p) => {
      const nameLower = p.name?.toLowerCase() || '';
      const descLower = (p.description || '').toLowerCase();
      const haystack = `${nameLower} ${descLower}`;
      return (
        !localIds.has(p.id) &&
        !consolidatedVariantIds.has(p.id) &&
        !SUPPRESSED_API_CATEGORIES.has(p.category) &&
        !localNames.has(nameLower) &&
        !SUPPRESSED_KEYWORDS.some((kw) => haystack.includes(kw))
      );
    });
    return [...localProducts, ...apiOnly];
  }, [apiProducts]);

  const product = allProducts.find(p => p.id === productId);

  useEffect(() => {
    if (product?.variants?.length > 0) setSelectedVariant(product.variants[0]);
    else setSelectedVariant(null);
  }, [productId, product?.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const allImages = product
    ? [product.image, ...(product.images || [])].filter((img, i, arr) => img && arr.indexOf(img) === i)
    : [];

  const related = allProducts.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  const isLoading_ = isLoading && !localProducts.find(p => p.id === productId);

  if (isLoading_) return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#111]/20 border-t-[#111] rounded-full animate-spin" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center flex-col gap-4">
      <p className="text-sm text-[#111]/50 uppercase tracking-widest">Product not found</p>
      <Link to="/" className="text-xs uppercase tracking-widest font-semibold text-accent hover:underline">← Back to catalog</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <ProductJsonLd product={product} allImages={allImages} />
      <Header />
      <CartDrawer />

      {/* Breadcrumb */}
      <div className="pt-[100px] border-b border-[#111]/10 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto flex items-center gap-3 text-xs uppercase tracking-widest text-[#111]/40 py-4">
          <Link to="/#catalog" className="hover:text-[#111] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Catalog
          </Link>
          <span>/</span>
          <span className="text-accent">{dynamicT(product.category)}</span>
          <span>/</span>
          <span className="text-[#111] truncate max-w-[200px]">{dynamicT(product.name)}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <ProductImageGallery
            images={allImages}
            productName={dynamicT(product.name)}
            selectedVariant={selectedVariant}
          />

          {/* Right: Purchase Panel */}
          <ProductPurchasePanel
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        </div>

        {/* Specs / Features / Reviews Tabs */}
        <ProductSpecsTabs product={product} />

        {/* Related Products */}
        <RelatedProducts products={related} currentCategory={product.category} />
      </div>
    </div>
  );
}