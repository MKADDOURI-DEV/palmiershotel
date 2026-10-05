'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { HOTEL_CONFIG } from '@/lib/config';
import BookingModal from '@/components/BookingModal';

export default function HeroSection() {
  const { t } = useLanguage();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-end pb-20 pt-0 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <AppImage
            src="https://images.unsplash.com/photo-1715125176619-7f31842f0e74"
            alt="Piscine extérieure entourée de palmiers avec eau turquoise sous ciel bleu marocain clair"
            fill
            priority
            sizes="100vw"
            className="object-cover" />
          
          {/* Gradient scrim — dark at bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
          {/* Atmospheric blob */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 blob-green pointer-events-none" />
        </div>

        {/* Floating Amenity Pills */}
        <div className="absolute top-32 right-6 sm:right-16 hidden sm:flex flex-col gap-3 z-10">
          <div className="glass-card px-4 py-2.5 rounded-full flex items-center gap-2.5 animate-float shadow-card">
            <div className="size-7 bg-primary rounded-full flex items-center justify-center shrink-0">
              <Icon name="StarIcon" size={13} className="text-white fill-current" />
            </div>
            <div>
              <span className="text-xs font-black text-foreground">{HOTEL_CONFIG?.rating?.score}/10</span>
              <span className="text-[10px] text-muted-foreground ml-1">{HOTEL_CONFIG?.rating?.count} {t('hero', 'reviews')}</span>
            </div>
          </div>
          <div className="glass-card px-4 py-2.5 rounded-full flex items-center gap-2.5 animate-float-delayed shadow-card">
            <div className="size-7 bg-accent rounded-full flex items-center justify-center shrink-0">
              <Icon name="SparklesIcon" size={13} className="text-white" />
            </div>
            <span className="text-xs font-bold text-foreground">Piscine & Jardin</span>
          </div>
          <div className="glass-card px-4 py-2.5 rounded-full flex items-center gap-2.5 animate-float shadow-card" style={{ animationDelay: '0.8s' }}>
            <div className="size-7 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
              <Icon name="CheckIcon" size={13} className="text-white" />
            </div>
            <span className="text-xs font-bold text-foreground">Réception 24h/24</span>
          </div>
        </div>

        {/* Star rating badge top-left */}
        <div className="absolute top-24 left-6 sm:left-16 z-10">
          <div className="glass-card px-4 py-2 rounded-full flex items-center gap-1.5">
            {Array.from({ length: HOTEL_CONFIG?.stars })?.map((_, i) =>
            <Icon key={i} name="StarIcon" size={12} className="text-amber-400 fill-current" />
            )}
            <span className="text-xs font-bold text-foreground ml-1">{HOTEL_CONFIG?.stars} {t('common', 'stars')}</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-3xl space-y-6">
            {/* Label */}
            <div className="inline-flex items-center gap-2">
              <span className="pill-accent">{HOTEL_CONFIG?.address?.city}, {HOTEL_CONFIG?.address?.country}</span>
            </div>

            {/* Headline */}
            <h1 className="text-hero-xl font-extrabold tracking-tight text-white leading-tight">
              {t('hero', 'tagline')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/80 font-medium leading-relaxed max-w-xl">
              {t('hero', 'subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setBookingOpen(true)}
                className="btn-accent text-sm sm:text-base !px-6 !py-3.5">
                
                <Icon name="CalendarIcon" size={18} />
                {t('hero', 'bookBtn')}
              </button>
              <Link href="/chambres" className="btn-outline-white text-sm sm:text-base !px-6 !py-3.5">
                <Icon name="HomeIcon" size={18} />
                {t('hero', 'discoverBtn')}
              </Link>
              <a
                href={`https://wa.me/${HOTEL_CONFIG?.whatsapp}?text=${encodeURIComponent(t('hero', 'whatsappBtn'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn text-sm sm:text-base !px-6 !py-3.5">
                
                <Icon name="ChatBubbleLeftEllipsisIcon" size={18} />
                {t('hero', 'whatsappBtn')}
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60">
          <div className="w-px h-10 bg-white/50 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white animate-bounce" />
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>);

}