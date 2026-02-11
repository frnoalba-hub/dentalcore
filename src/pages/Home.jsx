import React, { useEffect } from 'react';
import { useContentStore } from '../components/store/contentStore';
import Header from '../components/dentalcore/Header';
import HeroSection from '../components/dentalcore/HeroSection';
import FeaturesSection from '../components/dentalcore/FeaturesSection';
import UseCasesSection from '../components/dentalcore/UseCasesSection';
import HowItWorksSection from '../components/dentalcore/HowItWorksSection';
import ProductShowcase from '../components/dentalcore/ProductShowcase';
import TipsSection from '../components/dentalcore/TipsSection';
import ComparisonSection from '../components/dentalcore/ComparisonSection';
import CatalogSection from '../components/dentalcore/CatalogSection';
import TechSpecsSection from '../components/dentalcore/TechSpecsSection';
import TestimonialsSection from '../components/dentalcore/TestimonialsSection';
import FAQSection from '../components/dentalcore/FAQSection';
import AboutSection from '../components/dentalcore/AboutSection';
import ContactSection from '../components/dentalcore/ContactSection';
import CartDrawer from '../components/cart/CartDrawer';

export default function Home() {
  const { refreshContent } = useContentStore();

  useEffect(() => {
    // Always fetch fresh content from GitHub on mount
    refreshContent();
  }, []);

  return (
    <div className="bg-[#0c1117] text-white antialiased selection:bg-amber-500/20 selection:text-amber-200">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <UseCasesSection />
      <HowItWorksSection />
      <ProductShowcase />
      <TipsSection />
      <ComparisonSection />
      <CatalogSection />
      <TechSpecsSection />
      <TestimonialsSection />
      <FAQSection />
      <AboutSection />
      <ContactSection />
      <CartDrawer />
    </div>
  );
}