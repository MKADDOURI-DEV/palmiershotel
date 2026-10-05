'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { ROOMS_CONFIG } from '@/lib/config';
import BookingModal from '@/components/BookingModal';

export default function RoomsPreviewSection() {
  const { t, lang } = useLanguage();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleBook = (roomId: string) => {
    setSelectedRoom(roomId);
    setBookingOpen(true);
  };

  return (
    <>
      <section ref={sectionRef} className="py-20 sm:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 reveal">
            <span className="section-label">{t('rooms', 'subtitle')}</span>
            <h2 className="text-display font-extrabold tracking-tight text-foreground">
              {t('rooms', 'title')}
            </h2>
          </div>

          {/* Rooms Grid — 3 cards, grid-cols-3 desktop */}
          {/* BENTO AUDIT: 3 cards, grid-cols-3, all cs-1 rs-1 */}
          {/* Row 1: [col-1: double-twin] [col-2: triple-vue-piscine] [col-3: double-familiale] */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROOMS_CONFIG.map((room, i) => (
              <div key={room.id} className={`card-room reveal stagger-${i + 1} flex flex-col`}>
                {/* Room Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <AppImage
                    src={room.images[0]}
                    alt={room.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Capacity badge */}
                  <div className="absolute bottom-3 left-3 glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Icon name="UserGroupIcon" size={13} className="text-foreground" />
                    <span className="text-xs font-bold text-foreground">{room.capacity} {t('rooms', 'capacity')}</span>
                    <span className="text-xs text-muted-foreground mx-1">·</span>
                    <span className="text-xs font-bold text-foreground">{room.size} {t('rooms', 'size')}</span>
                  </div>
                </div>

                {/* Room Content */}
                <div className="flex flex-col flex-1 p-5 space-y-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-foreground tracking-tight">
                      {lang === 'fr' ? room.nameFr : lang === 'en' ? room.nameEn : room.nameAr}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                      {lang === 'fr' ? room.descFr : lang === 'en' ? room.descEn : room.descAr}
                    </p>
                  </div>

                  {/* Top amenities */}
                  <div className="flex flex-wrap gap-1.5">
                    {room.amenities.slice(0, 4).map((amenity) => (
                      <span key={amenity} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/8 text-primary text-[11px] font-semibold rounded-full">
                        <Icon name="CheckIcon" size={10} />
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="inline-flex items-center px-2.5 py-1 bg-muted text-muted-foreground text-[11px] font-semibold rounded-full">
                        +{room.amenities.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto pt-2">
                    <button
                      onClick={() => handleBook(room.id)}
                      className="btn-primary flex-1 justify-center text-xs !py-2.5"
                    >
                      <Icon name="CalendarIcon" size={14} />
                      {t('rooms', 'book')}
                    </button>
                    <Link
                      href="/chambres"
                      className="btn-outline text-xs !py-2.5 !px-3"
                      aria-label={`Voir les photos de la chambre ${room.nameFr}`}
                    >
                      <Icon name="PhotoIcon" size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-10 reveal">
            <Link href="/chambres" className="btn-outline text-sm">
              <Icon name="ArrowRightIcon" size={16} />
              {t('common', 'viewAll')}
            </Link>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedRoom={selectedRoom}
      />
    </>
  );
}