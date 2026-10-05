'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { GALLERY_IMAGES } from '@/lib/config';

type Category = 'all' | 'hotel' | 'chambres' | 'piscine' | 'restaurant' | 'jardin' | 'exterieurs';

export default function GalerieContent() {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const CATEGORIES: {key: Category;labelFr: string;labelEn: string;labelAr: string;}[] = [
  { key: 'all', labelFr: 'Tout', labelEn: 'All', labelAr: 'الكل' },
  { key: 'hotel', labelFr: 'Hôtel', labelEn: 'Hotel', labelAr: 'الفندق' },
  { key: 'chambres', labelFr: 'Chambres', labelEn: 'Rooms', labelAr: 'الغرف' },
  { key: 'piscine', labelFr: 'Piscine', labelEn: 'Pool', labelAr: 'المسبح' },
  { key: 'restaurant', labelFr: 'Restaurant', labelEn: 'Restaurant', labelAr: 'المطعم' },
  { key: 'jardin', labelFr: 'Jardin', labelEn: 'Garden', labelAr: 'الحديقة' },
  { key: 'exterieurs', labelFr: 'Extérieurs', labelEn: 'Exterior', labelAr: 'الخارج' }];


  const filtered = useMemo(() =>
  activeCategory === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === activeCategory),
  [activeCategory]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => i === null ? null : (i + 1) % filtered.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => i === null ? null : (i - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

  return (
    <>
      {/* Page Hero */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <AppImage
          src="https://images.unsplash.com/photo-1612454882572-213cae7a2284"
          alt="Vue extérieure de l'hôtel palmiers avec architecture marocaine, végétation luxuriante et ciel bleu"
          fill
          priority
          sizes="100vw"
          className="object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-display font-extrabold tracking-tight text-white">{t('gallery', 'title')}</h1>
          </div>
        </div>
      </div>

      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) =>
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            activeCategory === cat.key ?
            'bg-primary text-primary-foreground' :
            'bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary'}`
            }>
            
              {lang === 'fr' ? cat.labelFr : lang === 'en' ? cat.labelEn : cat.labelAr}
              <span className="ml-2 text-xs opacity-60">
                {cat.key === 'all' ? GALLERY_IMAGES.length : GALLERY_IMAGES.filter((i) => i.category === cat.key).length}
              </span>
            </button>
          )}
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((img, i) =>
          <button
            key={img.id}
            onClick={() => setLightboxIndex(i)}
            className="relative break-inside-avoid w-full overflow-hidden rounded-2xl cursor-pointer group block"
            aria-label={`Voir: ${lang === 'fr' ? img.labelFr : lang === 'en' ? img.labelEn : img.labelAr}`}
            style={{ transitionDelay: `${i % 8 * 50}ms` }}>
            
              <AppImage
              src={img.src}
              alt={img.alt}
              width={600}
              height={i % 3 === 0 ? 500 : i % 3 === 1 ? 350 : 420}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy" />
            
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-3">
                <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded-full">
                  {lang === 'fr' ? img.labelFr : lang === 'en' ? img.labelEn : img.labelAr}
                </span>
              </div>
            </button>
          )}
        </div>

        {filtered.length === 0 &&
        <div className="text-center py-20 text-muted-foreground">
            <Icon name="PhotoIcon" size={40} className="mx-auto mb-4 opacity-40" />
            <p className="font-medium">Aucune photo dans cette catégorie.</p>
          </div>
        }
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] &&
      <div
        className="lightbox-overlay"
        onClick={() => setLightboxIndex(null)}
        role="dialog"
        aria-modal="true"
        aria-label="Galerie photos">
        
          <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <AppImage
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              fill
              priority
              sizes="90vw"
              className="object-cover" />
            
            </div>
            {/* Caption */}
            <p className="text-white/80 text-sm text-center mt-3 font-medium">
              {lang === 'fr' ? filtered[lightboxIndex].labelFr : lang === 'en' ? filtered[lightboxIndex].labelEn : filtered[lightboxIndex].labelAr}
              <span className="text-white/40 ml-2">{lightboxIndex + 1}/{filtered.length}</span>
            </p>
            <button
            onClick={() => setLightboxIndex(null)}
            className="absolute -top-12 right-0 text-white hover:text-white/70 p-2"
            aria-label="Fermer">
            
              <Icon name="XMarkIcon" size={28} />
            </button>
            <button
            onClick={() => setLightboxIndex((i) => i === null ? null : (i - 1 + filtered.length) % filtered.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-colors"
            aria-label="Photo précédente">
            
              <Icon name="ChevronLeftIcon" size={24} />
            </button>
            <button
            onClick={() => setLightboxIndex((i) => i === null ? null : (i + 1) % filtered.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-colors"
            aria-label="Photo suivante">
            
              <Icon name="ChevronRightIcon" size={24} />
            </button>
          </div>
        </div>
      }
    </>);

}