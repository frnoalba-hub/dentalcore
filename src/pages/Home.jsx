import { useEffect } from 'react';
import { useContentStore } from '../components/store/contentStore';
import Header from '../components/dentalcore/Header';
import HeroSection from '../components/dentalcore/HeroSection';
import CatalogSection from '../components/dentalcore/CatalogSection';
import FeaturedProductSection from '../components/dentalcore/FeaturedProductSection';
import TestimonialsSection from '../components/dentalcore/TestimonialsSection';
import AboutSection from '../components/dentalcore/AboutSection';
import ContactSection from '../components/dentalcore/ContactSection';
import CartDrawer from '../components/cart/CartDrawer';

export default function Home() {
  const { refreshContent } = useContentStore();

  useEffect(() => {
    refreshContent();
  }, []);

  return (
    <div className="antialiased">
      <Header />
      <HeroSection />
      <CatalogSection />
      <FeaturedProductSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <CartDrawer />
    </div>
  );
}