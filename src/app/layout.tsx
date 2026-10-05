import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/tailwind.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Palmiers Hôtel Club — Errachidia, Maroc',
  description: 'Hôtel 3 étoiles à Errachidia avec piscine, restaurant, jardin et hospitalité marocaine. Réservez votre séjour au cœur du sud-est marocain.',
  keywords: ['Palmiers Hôtel Club Errachidia', 'hôtel Errachidia', 'hôtel avec piscine Errachidia', 'hôtel Maroc Errachidia'],
  openGraph: {
    title: 'Palmiers Hôtel Club — Errachidia',
    description: 'Votre oasis de confort au cœur d\'Errachidia. Piscine, restaurant, jardin et hospitalité marocaine.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
    type: 'website',
    locale: 'fr_MA',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className}>
        {children}

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fpalmiersho9844back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.21" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.3" /></body>
    </html>
  );
}