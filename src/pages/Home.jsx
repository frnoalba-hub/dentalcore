import React from 'react';
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
  return (
    <div className="bg-[#050505] text-white">
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