'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { HOTEL_CONFIG } from '@/lib/config';
import BookingModal from '@/components/BookingModal';

export default function CTASection() {
  const { t, lang } = useLanguage();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-4xl overflow-hidden min-h-[320px] flex items-center">
            <AppImage
              src="https://images.unsplash.com/photo-1591497840334-d97a4decb711"
              alt="Palmeraie dense avec lumière dorée filtrant entre les feuilles, ambiance oasis marocaine paisible"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 px-8 sm:px-16 py-12 max-w-xl space-y-6">
              <h2 className="text-display font-extrabold tracking-tight text-white">
                {t('hero', 'tagline')}
              </h2>
              <p className="text-white/80 text-base font-medium leading-relaxed">
                {HOTEL_CONFIG?.address?.street}, {HOTEL_CONFIG?.address?.city}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setBookingOpen(true)}
                  className="btn-accent text-sm">
                  
                  <Icon name="CalendarIcon" size={16} />
                  {t('nav', 'book')}
                </button>
                <a
                  href={`https://wa.me/${HOTEL_CONFIG?.whatsapp}?text=${encodeURIComponent(lang === 'fr' ? HOTEL_CONFIG?.whatsappMessage?.fr : lang === 'en' ? HOTEL_CONFIG?.whatsappMessage?.en : HOTEL_CONFIG?.whatsappMessage?.ar)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn text-sm">
                  
                  <Icon name="ChatBubbleLeftEllipsisIcon" size={16} />
                  WhatsApp
                </a>
                <a
                  href={`tel:${HOTEL_CONFIG?.phone}`}
                  className="btn-outline-white text-sm">
                  
                  <Icon name="PhoneIcon" size={16} />
                  {HOTEL_CONFIG?.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>);

}