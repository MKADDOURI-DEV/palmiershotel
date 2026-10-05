'use client';
import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';

const POOL_IMAGES = [
{ src: "https://images.unsplash.com/photo-1615829317087-274bfc639e80", alt: 'Piscine extérieure turquoise entourée de transats blancs et palmiers tropicaux sous ciel bleu' },
{ src: "https://images.unsplash.com/photo-1594516912818-093febcbc6e5", alt: 'Zone de détente piscine avec transats et parasols au bord de l\'eau bleue cristalline' },
{ src: "https://images.unsplash.com/photo-1604145195376-e2c8195adf29", alt: 'Terrasse extérieure avec vue panoramique sur les montagnes marocaines au coucher du soleil' },
{ src: "https://images.unsplash.com/photo-1708332753447-f25529f3fc72", alt: 'Jardin luxuriant avec palmiers et allées ombragées sous ciel bleu marocain' }];


export default function PoolSection() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('visible');}),
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => i === null ? null : (i + 1) % POOL_IMAGES.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => i === null ? null : (i - 1 + POOL_IMAGES.length) % POOL_IMAGES.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  return (
    <>
      <section ref={sectionRef} className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-6 reveal">
              <span className="section-label">Piscine & Espaces Extérieurs</span>
              <h2 className="text-display font-extrabold tracking-tight text-foreground">
                {t('pool', 'title')}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed font-medium">
                {t('pool', 'desc')}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                { icon: 'SunIcon', label: 'Transats & parasols' },
                { icon: 'SparklesIcon', label: 'Jardin verdoyant' },
                { icon: 'HomeIcon', label: 'Terrasse ombragée' },
                { icon: 'StarIcon', label: 'Ambiance détente' }].
                map((item) =>
                <div key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon name={item.icon as "SunIcon"} size={16} className="text-primary" />
                    </div>
                    {item.label}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Photo Grid with Lightbox */}
            <div className="grid grid-cols-2 gap-3 reveal stagger-1">
              {POOL_IMAGES.map((img, i) =>
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group hover:opacity-95 transition-opacity ${i === 0 ? 'aspect-[4/3]' : i === 1 ? 'aspect-square' : i === 2 ? 'aspect-square' : 'aspect-[4/3]'}`}
                aria-label={`Voir photo ${i + 1}`}>
                
                  <AppImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105" />
                
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Icon name="MagnifyingGlassPlusIcon" size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null &&
      <div
        className="lightbox-overlay"
        onClick={() => setLightboxIndex(null)}
        role="dialog"
        aria-modal="true"
        aria-label="Galerie photos piscine">
        
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <AppImage
              src={POOL_IMAGES[lightboxIndex].src}
              alt={POOL_IMAGES[lightboxIndex].alt}
              fill
              priority
              sizes="90vw"
              className="object-cover" />
            
            </div>
            {/* Controls */}
            <button
            onClick={() => setLightboxIndex(null)}
            className="absolute -top-12 right-0 text-white hover:text-white/70 transition-colors p-2"
            aria-label="Fermer">
            
              <Icon name="XMarkIcon" size={28} />
            </button>
            <button
            onClick={() => setLightboxIndex((i) => i === null ? null : (i - 1 + POOL_IMAGES.length) % POOL_IMAGES.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
            aria-label="Photo précédente">
            
              <Icon name="ChevronLeftIcon" size={24} />
            </button>
            <button
            onClick={() => setLightboxIndex((i) => i === null ? null : (i + 1) % POOL_IMAGES.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
            aria-label="Photo suivante">
            
              <Icon name="ChevronRightIcon" size={24} />
            </button>
            <p className="text-center text-white/60 text-sm mt-3">{lightboxIndex + 1} / {POOL_IMAGES.length}</p>
          </div>
        </div>
      }
    </>);

}