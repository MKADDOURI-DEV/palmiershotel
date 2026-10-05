import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import BookingBar from '@/app/components/BookingBar';
import HotelIntroSection from '@/app/components/HotelIntroSection';
import RoomsPreviewSection from '@/app/components/RoomsPreviewSection';
import PoolSection from '@/app/components/PoolSection';
import ServicesHighlightSection from '@/app/components/ServicesHighlightSection';
import TestimonialSection from '@/app/components/TestimonialSection';
import CTASection from '@/app/components/CTASection';

export default function HomePage() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <HeroSection />
        <BookingBar />
        <HotelIntroSection />
        <RoomsPreviewSection />
        <PoolSection />
        <ServicesHighlightSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </LanguageProvider>
  );
}