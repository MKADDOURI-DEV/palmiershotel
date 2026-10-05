import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalerieContent from '@/app/galerie/components/GalerieContent';

export const metadata = {
  title: 'Galerie Photos — Palmiers Hôtel Club Errachidia',
  description: 'Découvrez en images le Palmiers Hôtel Club : chambres, piscine, restaurant, jardin et espaces extérieurs à Errachidia.',
};

export default function GaleriePage() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-20">
        <GalerieContent />
      </main>
      <Footer />
    </LanguageProvider>
  );
}