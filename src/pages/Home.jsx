import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/dentalcore/Header';
import HeroSection from '../components/dentalcore/HeroSection';
import FeaturesSection from '../components/dentalcore/FeaturesSection';
import UseCasesSection from '../components/dentalcore/UseCasesSection';
import HowItWorksSection from '../components/dentalcore/HowItWorksSection';
import ProductShowcase from '../components/dentalcore/ProductShowcase';
import TipsSection from '../components/dentalcore/TipsSection';
import ComparisonSection from '../components/dentalcore/ComparisonSection';
import TechSpecsSection from '../components/dentalcore/TechSpecsSection';
import TestimonialsSection from '../components/dentalcore/TestimonialsSection';
import FAQSection from '../components/dentalcore/FAQSection';
import AboutSection from '../components/dentalcore/AboutSection';
import ContactSection from '../components/dentalcore/ContactSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      <Header />
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <UseCasesSection />
        <HowItWorksSection />
        <ProductShowcase />
        <TipsSection />
        <ComparisonSection />
        <TechSpecsSection />
        <TestimonialsSection />
        <FAQSection />
        <AboutSection />
        <ContactSection />
      </div>
    </div>
  );
}