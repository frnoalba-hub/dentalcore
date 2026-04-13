import { useState, useMemo, useEffect } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useTranslation } from '@/lib/i18n';
import { products as localProducts, getCatalogProductImage, isDuplicateApiCatalogRow } from '../components/dentalcore/productsData';
import Header from '../components/dentalcore/Header';
import CartDrawer from '../components/cart/CartDrawer';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductPurchasePanel from '../components/product/ProductPurchasePanel';
import ProductSpecsTabs from '../components/product/ProductSpecsTabs';
import ProductGeoAeoSummary from '../components/product/ProductGeoAeoSummary';
import RelatedProducts from '../components/product/RelatedProducts';
import ProductJsonLd from '../components/seo/ProductJsonLd';
import BreadcrumbJsonLd from '../components/seo/BreadcrumbJsonLd';
import ProductFaqJsonLd from '../components/seo/ProductFaqJsonLd';
import { usePageSeo } from '@/hooks/usePageSeo';
import { SITE_URL, productPageUrl } from '@/lib/siteUrl';
import { getProductSlug } from '@/lib/productPaths';

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
  const { productSlug } = useParams();
  const [searchParams] = useSearchParams();
  const idFromQuery = searchParams.get('id');
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
      const skuLower = (p.sku || '').toLowerCase();
      const haystack = `${nameLower} ${descLower} ${skuLower}`;
      return (
        !localIds.has(p.id) &&
        !consolidatedVariantIds.has(p.id) &&
        !SUPPRESSED_API_CATEGORIES.has(p.category) &&
        !localNames.has(nameLower) &&
        !SUPPRESSED_KEYWORDS.some((kw) => haystack.includes(kw)) &&
        !isDuplicateApiCatalogRow(p)
      );
    });
    return [...localProducts, ...apiOnly];
  }, [apiProducts]);

  const resolvedLocally = useMemo(() => {
    if (productSlug) {
      const decoded = decodeURIComponent(productSlug);
      return localProducts.find((p) => getProductSlug(p) === decoded) ?? null;
    }
    if (idFromQuery) return localProducts.find((p) => p.id === idFromQuery) ?? null;
    return null;
  }, [productSlug, idFromQuery]);

  const product = useMemo(() => {
    if (!allProducts.length) return null;
    if (productSlug) {
      const decoded = decodeURIComponent(productSlug);
      return allProducts.find((p) => getProductSlug(p) === decoded) ?? null;
    }
    if (idFromQuery) {
      return allProducts.find((p) => p.id === idFromQuery) ?? null;
    }
    return null;
  }, [allProducts, productSlug, idFromQuery]);

  const displayProduct = useMemo(() => {
    if (!product) return null;
    const image = getCatalogProductImage(product);
    if (image === product.image) return product;
    return { ...product, image };
  }, [product]);

  useEffect(() => {
    if (product?.variants?.length > 0) setSelectedVariant(product.variants[0]);
    else setSelectedVariant(null);
  }, [product?.id, product?.variants]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productSlug, idFromQuery]);

  const allImages = displayProduct
    ? [displayProduct.image, ...(displayProduct.images || [])].filter((img, i, arr) => img && arr.indexOf(img) === i)
    : [];

  const related = allProducts.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  const isLoading_ =
    isLoading &&
    !resolvedLocally &&
    ((productSlug != null && productSlug !== '') || (idFromQuery != null && idFromQuery !== ''));

  const seoVariant = useMemo(() => {
    if (isLoading_) return 'default';
    if (!product) return 'notFound';
    return 'product';
  }, [isLoading_, product]);

  const canonicalForProductRoute = product
    ? productPageUrl(product)
    : `${SITE_URL}/`;

  usePageSeo({
    variant: seoVariant,
    productName: product ? dynamicT(product.name) : undefined,
    productSku: product ? (product.sku || product.id) : undefined,
    productDescription: product
      ? [dynamicT(product.description), product.longDescription ? dynamicT(product.longDescription) : '']
          .filter(Boolean)
          .join(' ')
      : undefined,
    canonicalUrl: canonicalForProductRoute,
    ogImagePathOrUrl: allImages[0],
  });

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

  const canonicalSlug = getProductSlug(product);
  if (idFromQuery && !productSlug && canonicalSlug) {
    return <Navigate to={`/p/${encodeURIComponent(canonicalSlug)}`} replace />;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <ProductJsonLd product={displayProduct} allImages={allImages} />
      {displayProduct?.faqs?.length > 0 && (
        <ProductFaqJsonLd faqs={displayProduct.faqs} pageUrl={productPageUrl(displayProduct)} />
      )}
      <BreadcrumbJsonLd
        categoryLabel={dynamicT(product.category)}
        productName={dynamicT(product.name)}
        product={product}
      />
      <Header />
      <CartDrawer />

      {/* Breadcrumb */}
      <div className="pt-[84px] border-b border-[#111]/10 px-6 lg:px-12 bg-white/60 shadow-card backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm uppercase tracking-widest text-[#111]/45 py-4 sm:py-5">
          <Link to="/#catalog" className="hover:text-[#111] text-[#111]/55 font-semibold transition-colors flex items-center gap-1 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2">
            <ArrowLeft className="w-3 h-3 shrink-0" /> Catalog
          </Link>
          <span className="text-[#111]/20 hidden sm:inline" aria-hidden>/</span>
          <span className="text-accent font-semibold">{dynamicT(product.category)}</span>
          <span className="text-[#111]/20 hidden sm:inline" aria-hidden>/</span>
          <span className="text-[#111] font-medium truncate max-w-[min(100%,220px)] sm:max-w-[320px]">{dynamicT(product.name)}</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <ProductImageGallery
            images={allImages}
            productName={dynamicT(displayProduct.name)}
            selectedVariant={selectedVariant}
          />

          <ProductPurchasePanel
            product={displayProduct}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        </div>

        <ProductGeoAeoSummary product={displayProduct} />

        <ProductSpecsTabs product={displayProduct} />

        <RelatedProducts products={related} currentCategory={product.category} />
      </div>
    </div>
  );
}
