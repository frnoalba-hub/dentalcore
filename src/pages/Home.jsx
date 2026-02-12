import React, { useEffect } from 'react';
import { useContentStore } from '../components/store/contentStore';
import Header from '../components/dentalcore/Header';
import HeroSection from '../components/dentalcore/HeroSection';
import CatalogSection from '../components/dentalcore/CatalogSection';
import FeaturedProductSection from '../components/dentalcore/FeaturedProductSection';
import FeaturesSection from '../components/dentalcore/FeaturesSection';
import UseCasesSection from '../components/dentalcore/UseCasesSection';
import HowItWorksSection from '../components/dentalcore/HowItWorksSection';
import ProductShowcase from '../components/dentalcore/ProductShowcase';
import TipsSection from '../components/dentalcore/TipsSection';
import TechSpecsSection from '../components/dentalcore/TechSpecsSection';
import TestimonialsSection from '../components/dentalcore/TestimonialsSection';
import FAQSection from '../components/dentalcore/FAQSection';
import AboutSection from '../components/dentalcore/AboutSection';
import ContactSection from '../components/dentalcore/ContactSection';
import CartDrawer from '../components/cart/CartDrawer';

export default function Home() {
  const { refreshContent } = useContentStore();

  useEffect(() => {
    refreshContent();
  }, []);

  return (
    <div className="bg-[#0c1117] text-white antialiased selection:bg-amber-500/20 selection:text-amber-200">
      <Header />
      
      {/* Store-first hero */}
      <HeroSection />
      
      {/* Full product catalog */}
      <CatalogSection />
      
      {/* Featured product: UC CUT spotlight */}
      <FeaturedProductSection />
      <FeaturesSection />
      <UseCasesSection />
      <HowItWorksSection />
      <ProductShowcase />
      <TipsSection />
      
      {/* Specs, social proof, company info */}
      <TechSpecsSection />
      <TestimonialsSection />
      <FAQSection />
      <AboutSection />
      <ContactSection />
      
      <CartDrawer />
    </div>
  );
}