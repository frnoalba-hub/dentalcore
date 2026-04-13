import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContentStore } from '../components/store/contentStore';
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

export default function Home() {
  const { refreshContent } = useContentStore();
  const location = useLocation();

  usePageSeo({ variant: 'default' });

  useEffect(() => {
    refreshContent();
  }, []);

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