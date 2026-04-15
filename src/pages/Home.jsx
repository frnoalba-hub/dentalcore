import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContentStore } from '../components/store/contentStore';
import { useCartStore } from '../components/store/cartStore';
import Header from '../components/dentalcore/Header';
import HeroSection from '../components/dentalcore/HeroSection';
import CatalogSection from '../components/dentalcore/CatalogSection';
import FeaturedProductSection from '../components/dentalcore/FeaturedProductSection';
import TestimonialsSection from '../components/dentalcore/TestimonialsSection';
import AboutSection from '../components/dentalcore/AboutSection';
import ContactSection from '../components/dentalcore/ContactSection';
import CartDrawer from '../components/cart/CartDrawer';
import JsonLdSchema from '../components/seo/JsonLdSchema';
import FaqJsonLd from '../components/seo/FaqJsonLd';
import DiscoverySummary from '../components/seo/DiscoverySummary';
import { usePageSeo } from '@/hooks/usePageSeo';
import { toast } from 'sonner';
import { trackEngagementEvent } from '@/lib/trackEvent';

export default function Home() {
  const { refreshContent } = useContentStore();
  const { clearCart } = useCartStore();
  const location = useLocation();
  const navigate = useNavigate();

  usePageSeo({ variant: 'default' });

  useEffect(() => {
    refreshContent();
  }, []);

  // Handle Stripe checkout return
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const checkoutStatus = params.get('checkout');
    if (!checkoutStatus) return;

    if (checkoutStatus === 'success') {
      clearCart();
      toast.success('Order confirmed! Check your email for details.', { duration: 6000 });
      trackEngagementEvent('purchase', { event_category: 'ecommerce' });
    } else if (checkoutStatus === 'cancel') {
      toast('Checkout cancelled — your cart is still saved.', { duration: 4000 });
    }

    // Clean the query string so refreshing doesn't re-trigger
    params.delete('checkout');
    const clean = params.toString();
    navigate(`/${clean ? `?${clean}` : ''}${location.hash}`, { replace: true });
  }, [location.search]);

  // When opening /#catalog (etc.) from another route, scroll after sections mount
  useEffect(() => {
    const id = (location.hash || '').replace(/^#/, '');
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return (
    <div className="antialiased">
      <JsonLdSchema />
      <FaqJsonLd />
      <Header />
      <HeroSection />
      <div className="border-t border-[#111]/5" aria-hidden />
      <CatalogSection />
      <DiscoverySummary />
      <FeaturedProductSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <CartDrawer />
    </div>
  );
}