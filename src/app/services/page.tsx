import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesContent from '@/app/services/components/ServicesContent';

export const metadata = {
  title: 'Services & Équipements — Palmiers Hôtel Club Errachidia',
  description: 'Piscine, restaurant, Wi-Fi, parking, navette aéroport et plus encore. Découvrez tous les services du Palmiers Hôtel Club à Errachidia.',
};

export default function ServicesPage() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-20">
        <ServicesContent />
      </main>
      <Footer />
    </LanguageProvider>
  );
}