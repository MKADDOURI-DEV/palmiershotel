'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICES_CONFIG, HOTEL_CONFIG } from '@/lib/config';

export default function ServicesContent() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('visible');}),
      { threshold: 0.08 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <AppImage
          src="https://images.unsplash.com/photo-1604145195376-e2c8195adf29"
          alt="Terrasse extérieure avec vue panoramique sur les montagnes marocaines et atmosphère détendue"
          fill
          priority
          sizes="100vw"
          className="object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto w-full">
            <span className="section-label text-accent/80">Palmiers Hôtel Club</span>
            <h1 className="text-display font-extrabold tracking-tight text-white mt-1">
              {t('services', 'title')}
            </h1>
            <p className="text-white/70 mt-2 text-sm font-medium">{t('services', 'subtitle')}</p>
          </div>
        </div>
      </div>

      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        {/* BENTO GRID AUDIT — 14 services */}
        {/* Desktop grid-cols-4: */}
        {/* Row 1: [col-1-2: piscine FEATURED cs-2] [col-3: wifi cs-1] [col-4: parking cs-1] */}
        {/* Row 2: [col-1: piscine CONT] [col-2: sport cs-1] [col-3: restaurant cs-1] [col-4: roomservice cs-1] */}
        {/* Row 3: [col-1: reception cs-1] [col-2: navette cs-1] [col-3-4: jardin cs-2] */}
        {/* Row 4: [col-1: terrasse cs-1] [col-2: jeux cs-1] [col-3: enfants cs-1] [col-4: familiales cs-1] */}
        {/* Row 5: [col-1-4: pmr cs-4 FULL] */}
        {/* Placed 14/14 ✓ */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal">

          {/* Featured: Piscine — spans 2 cols, 2 rows on desktop */}
          <div className="lg:col-span-2 lg:row-span-2 relative rounded-3xl overflow-hidden min-h-[320px] group">
            <AppImage
              src="https://images.unsplash.com/photo-1615829317087-274bfc639e80"
              alt="Piscine extérieure turquoise entourée de transats et palmiers sous ciel bleu clair"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
              <div className="size-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                <Icon name="BeakerIcon" size={24} className="text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {lang === 'fr' ? 'Piscine extérieure' : lang === 'en' ? 'Outdoor Pool' : 'مسبح خارجي'}
              </h2>
              <p className="text-white/70 text-sm mt-1 font-medium">
                {lang === 'fr' ? 'Ouverte été et toute saison · Transats · Terrasse' : lang === 'en' ? 'Open all season · Sun loungers · Terrace' : 'مفتوح طوال الموسم · كراسي استلقاء · تراس'}
              </p>
            </div>
          </div>

          {/* Services 2-14: Regular cards */}
          {SERVICES_CONFIG.filter((s) => s.id !== 'piscine').map((service, i) => {
            const isPMR = service.id === 'pmr';
            return (
              <div
                key={service.id}
                className={`service-card flex items-center gap-4 reveal ${isPMR ? 'lg:col-span-4 sm:col-span-2' : ''}`}
                style={{ transitionDelay: `${i % 6 * 60}ms` }}>
                
                <div className={`shrink-0 rounded-2xl flex items-center justify-center ${isPMR ? 'size-14 bg-accent/10' : 'size-12 bg-primary/10'}`}>
                  <Icon
                    name={service.icon as "BeakerIcon"}
                    size={isPMR ? 24 : 20}
                    className={isPMR ? 'text-accent' : 'text-primary'} />
                  
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-foreground ${isPMR ? 'text-base' : 'text-sm'}`}>
                    {lang === 'fr' ? service.nameFr : lang === 'en' ? service.nameEn : service.nameAr}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium truncate">{service.descFr}</p>
                </div>
                <Icon name="CheckCircleIcon" size={18} className="text-primary/40 shrink-0" />
              </div>);

          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 reveal bg-foreground rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-extrabold text-white">
              {lang === 'fr' ? 'Une question sur nos services ?' : lang === 'en' ? 'A question about our services?' : 'سؤال حول خدماتنا؟'}
            </h3>
            <p className="text-white/60 text-sm mt-1">
              {lang === 'fr' ? 'Notre équipe est disponible 24h/24.' : lang === 'en' ? 'Our team is available 24/7.' : 'فريقنا متاح على مدار الساعة.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${HOTEL_CONFIG.phone}`} className="btn-accent text-sm">
              <Icon name="PhoneIcon" size={16} />
              {HOTEL_CONFIG.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${HOTEL_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn text-sm">
              
              <Icon name="ChatBubbleLeftEllipsisIcon" size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>);

}