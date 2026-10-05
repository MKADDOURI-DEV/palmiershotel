'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICES_CONFIG } from '@/lib/config';

const HIGHLIGHT_IDS = ['piscine', 'wifi', 'parking', 'restaurant', 'reception', 'navette', 'jardin', 'roomservice'];

export default function ServicesHighlightSection() {
  const { t, lang } = useLanguage();
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

  const highlights = SERVICES_CONFIG.filter(s => HIGHLIGHT_IDS.includes(s.id));

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12 reveal">
          <span className="section-label">{t('services', 'subtitle')}</span>
          <h2 className="text-display font-extrabold tracking-tight text-foreground">
            {t('services', 'title')}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 reveal stagger-1">
          {highlights.map((service, i) => (
            <div
              key={service.id}
              className="service-card flex flex-col items-center text-center gap-3"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Icon name={service.icon as "BeakerIcon"} size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {lang === 'fr' ? service.nameFr : lang === 'en' ? service.nameEn : service.nameAr}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{service.descFr}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 reveal">
          <Link href="/services" className="btn-outline text-sm">
            <Icon name="ArrowRightIcon" size={16} />
            {t('common', 'viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}