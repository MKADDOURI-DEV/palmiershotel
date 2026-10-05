import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChambresContent from '@/app/chambres/components/ChambresContent';

export const metadata = {
  title: 'Chambres — Palmiers Hôtel Club Errachidia',
  description: 'Découvrez nos chambres Double, Triple Vue Piscine et Familiale. Confort moderne et authenticité marocaine à Errachidia.',
};

export default function ChambresPage() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-20">
        <ChambresContent />
      </main>
      <Footer />
    </LanguageProvider>
  );
}