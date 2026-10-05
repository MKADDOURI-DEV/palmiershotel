import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactContent from '@/app/contact/components/ContactContent';

export const metadata = {
  title: 'Contact — Palmiers Hôtel Club Errachidia',
  description: 'Contactez le Palmiers Hôtel Club à Errachidia. Téléphone, WhatsApp, formulaire de contact et itinéraire Google Maps.',
};

export default function ContactPage() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-20">
        <ContactContent />
      </main>
      <Footer />
    </LanguageProvider>
  );
}