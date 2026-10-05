import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RestaurantContent from '@/app/restaurant/components/RestaurantContent';

export const metadata = {
  title: 'Restaurant — Palmiers Hôtel Club Errachidia',
  description: 'Cuisine marocaine et internationale au Palmiers Hôtel Club. Petit-déjeuner, déjeuner, dîner. Options halal, végétarienne, végane.',
};

export default function RestaurantPage() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-20">
        <RestaurantContent />
      </main>
      <Footer />
    </LanguageProvider>
  );
}