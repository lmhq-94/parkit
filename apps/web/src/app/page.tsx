'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { HeroSection } from '@/components/hero/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

export default function HomePage() {
  const handleStartNow = () => {
    // Handle start now action
    console.log('Start now clicked');
  };

  const handleViewDemo = () => {
    // Handle view demo action
    console.log('View demo clicked');
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
      <HeroSection onStartNow={handleStartNow} onViewDemo={handleViewDemo} />
      <FeaturesSection />
      <StatsSection />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection onStartNow={handleStartNow} />
      <Footer />
    </Box>
  );
}
