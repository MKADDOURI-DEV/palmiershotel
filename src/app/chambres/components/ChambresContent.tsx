'use client';
import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { ROOMS_CONFIG } from '@/lib/config';
import BookingModal from '@/components/BookingModal';

export default function ChambresContent() {
  const { t, lang } = useLanguage();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [activeImages, setActiveImages] = useState<Record<string, number>>({});
  const [lightbox, setLightbox] = useState<{roomId: string;index: number;} | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init: Record<string, number> = {};
    ROOMS_CONFIG.forEach((r) => {init[r.id] = 0;});
    setActiveImages(init);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('visible');}),
      { threshold: 0.08 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      const room = ROOMS_CONFIG.find((r) => r.id === lightbox.roomId);
      if (!room) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((l) => l ? { ...l, index: (l.index + 1) % room.images.length } : null);
      if (e.key === 'ArrowLeft') setLightbox((l) => l ? { ...l, index: (l.index - 1 + room.images.length) % room.images.length } : null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  const handleBook = (roomId: string) => {
    setSelectedRoom(roomId);
    setBookingOpen(true);
  };

  return (
    <>
      {/* Page Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1c7f9a767-1776068206562.png"
          alt="Chambre élégante avec literie blanche, décoration marocaine chaleureuse et lumière naturelle douce"
          fill
          priority
          sizes="100vw"
          className="object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto w-full">
            <span className="section-label text-accent/80">Palmiers Hôtel Club</span>
            <h1 className="text-display font-extrabold tracking-tight text-white mt-1">
              {t('rooms', 'title')}
            </h1>
            <p className="text-white/70 mt-2 text-sm sm:text-base font-medium">{t('rooms', 'subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Rooms List */}
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-20">
        {ROOMS_CONFIG.map((room, roomIndex) =>
        <div
          key={room.id}
          id={room.id}
          className={`reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${roomIndex % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
          
            {/* Image Gallery */}
            <div className={`space-y-3 ${roomIndex % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
              {/* Main Image */}
              <button
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group"
              onClick={() => setLightbox({ roomId: room.id, index: activeImages[room.id] ?? 0 })}
              aria-label={`Voir en grand: ${room.nameFr}`}>
              
                <AppImage
                src={room.images[activeImages[room.id] ?? 0]}
                alt={room.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-103" />
              
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <Icon name="MagnifyingGlassPlusIcon" size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-3 right-3 glass-card px-2.5 py-1.5 rounded-full">
                  <span className="text-xs font-bold text-foreground">{(activeImages[room.id] ?? 0) + 1}/{room.images.length}</span>
                </div>
              </button>
              {/* Thumbnails */}
              <div className="flex gap-2">
                {room.images.map((img, imgIdx) =>
              <button
                key={imgIdx}
                onClick={() => setActiveImages((prev) => ({ ...prev, [room.id]: imgIdx }))}
                className={`relative flex-1 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${(activeImages[room.id] ?? 0) === imgIdx ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
                aria-label={`Photo ${imgIdx + 1}`}>
                
                    <AppImage
                  src={img}
                  alt={`${room.nameFr} photo ${imgIdx + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover" />
                
                  </button>
              )}
              </div>
            </div>

            {/* Room Details */}
            <div className={`space-y-6 ${roomIndex % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="pill-primary text-[10px]">
                    {room.capacity} {t('rooms', 'capacity')} · {room.size} {t('rooms', 'size')}
                  </span>
                </div>
                <h2 className="text-section font-extrabold tracking-tight text-foreground">
                  {lang === 'fr' ? room.nameFr : lang === 'en' ? room.nameEn : room.nameAr}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mt-3 font-medium">
                  {lang === 'fr' ? room.descFr : lang === 'en' ? room.descEn : room.descAr}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">{t('rooms', 'amenities')}</p>
                <div className="grid grid-cols-2 gap-2">
                  {room.amenities.map((amenity) =>
                <div key={amenity} className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon name="CheckIcon" size={11} className="text-primary" />
                      </div>
                      {amenity}
                    </div>
                )}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                onClick={() => handleBook(room.id)}
                className="btn-accent flex-1 justify-center text-sm">
                
                  <Icon name="CalendarIcon" size={16} />
                  {t('rooms', 'book')}
                </button>
                <button
                onClick={() => handleBook(room.id)}
                className="btn-outline flex-1 justify-center text-sm">
                
                  <Icon name="PaperAirplaneIcon" size={16} />
                  {t('rooms', 'request')}
                </button>
              </div>

              {/* Quick contact */}
              <div className="flex gap-2 pt-1">
                <a
                href={`tel:${'+212782633078'}`}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
                
                  <Icon name="PhoneIcon" size={13} />
                  +212 782 633 078
                </a>
                <span className="text-muted-foreground">·</span>
                <a
                href="https://wa.me/212782633078"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-[#25D366] transition-colors">
                
                  <Icon name="ChatBubbleLeftEllipsisIcon" size={13} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (() => {
        const room = ROOMS_CONFIG.find((r) => r.id === lightbox.roomId);
        if (!room) return null;
        return (
          <div
            className="lightbox-overlay"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true">
            
            <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <AppImage
                  src={room.images[lightbox.index]}
                  alt={room.alt}
                  fill
                  priority
                  sizes="90vw"
                  className="object-cover" />
                
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-white hover:text-white/70 p-2"
                aria-label="Fermer">
                
                <Icon name="XMarkIcon" size={28} />
              </button>
              <button
                onClick={() => setLightbox((l) => l ? { ...l, index: (l.index - 1 + room.images.length) % room.images.length } : null)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2"
                aria-label="Précédent">
                
                <Icon name="ChevronLeftIcon" size={24} />
              </button>
              <button
                onClick={() => setLightbox((l) => l ? { ...l, index: (l.index + 1) % room.images.length } : null)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2"
                aria-label="Suivant">
                
                <Icon name="ChevronRightIcon" size={24} />
              </button>
              <p className="text-center text-white/60 text-sm mt-3">{lightbox.index + 1} / {room.images.length}</p>
            </div>
          </div>);

      })()}

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedRoom={selectedRoom} />
      
    </>);

}