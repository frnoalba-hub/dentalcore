import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContentStore } from '../components/store/contentStore';
import Header from '../components/dentalcore/Header';
import CatalogSection from '../components/dentalcore/CatalogSection';
import FeaturedProductSection from '../components/dentalcore/FeaturedProductSection';
import TestimonialsSection from '../components/dentalcore/TestimonialsSection';
import AboutSection from '../components/dentalcore/AboutSection';
import ContactSection from '../components/dentalcore/ContactSection';
import CartDrawer from '../components/cart/CartDrawer';
import JsonLdSchema from '../components/seo/JsonLdSchema';
import FaqJsonLd from '../components/seo/FaqJsonLd';

export default function Home() {
  const { refreshContent } = useContentStore();
  const location = useLocation();

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
      <CatalogSection />
      <FeaturedProductSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <CartDrawer />
    </div>
  );
}