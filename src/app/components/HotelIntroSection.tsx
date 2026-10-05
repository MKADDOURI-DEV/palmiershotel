'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { HOTEL_CONFIG } from '@/lib/config';

const STATS = [
{ icon: 'StarIcon', value: '8.1/10', labelFr: 'Note moyenne', labelEn: 'Average rating', labelAr: 'التقييم المتوسط' },
{ icon: 'UserGroupIcon', value: '49+', labelFr: 'Avis clients', labelEn: 'Guest reviews', labelAr: 'تقييمات الضيوف' },
{ icon: 'HomeIcon', value: '3★', labelFr: 'Hôtel classé', labelEn: 'Classified hotel', labelAr: 'فندق مصنف' },
{ icon: 'ClockIcon', value: '24/7', labelFr: 'Réception ouverte', labelEn: 'Reception open', labelAr: 'الاستقبال مفتوح' }];


export default function HotelIntroSection() {
  const { t, lang } = useLanguage();
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

  return (
    <section id="hotel" ref={sectionRef} className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image with overlay card */}
          <div className="relative reveal">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-hero">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_15af5a251-1766773680634.png"
                alt="Hall d'accueil chaleureux de l'hôtel avec décoration marocaine traditionnelle et lumière dorée tamisée"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating rating card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 glass-card px-5 py-4 rounded-2xl shadow-hero border border-white/60">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="StarIcon" size={22} className="text-white fill-current" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-foreground">{HOTEL_CONFIG.rating.score}</p>
                  <p className="text-xs text-muted-foreground font-medium">{HOTEL_CONFIG.rating.label} — {HOTEL_CONFIG.rating.count} {t('hero', 'reviews')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-7">
            <div className="reveal">
              <span className="section-label">{HOTEL_CONFIG.address.city}, {HOTEL_CONFIG.address.country}</span>
              <h2 className="text-display font-extrabold tracking-tight text-foreground mt-2">
                {t('hotel', 'welcome')}
              </h2>
            </div>

            <div className="reveal stagger-1 space-y-4">
              <p className="text-base text-muted-foreground leading-relaxed font-medium">
                {t('hotel', 'desc')}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed font-medium">
                {t('hotel', 'desc2')}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 reveal stagger-2">
              {STATS.map((stat) =>
              <div key={stat.icon} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 hover:border-primary/30 transition-colors">
                  <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon name={stat.icon as "StarIcon"} size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {lang === 'fr' ? stat.labelFr : lang === 'en' ? stat.labelEn : stat.labelAr}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="reveal stagger-3 flex items-start gap-2 text-sm text-muted-foreground">
              <Icon name="MapPinIcon" size={16} className="text-accent mt-0.5 shrink-0" />
              <span>{HOTEL_CONFIG.address.street}, {HOTEL_CONFIG.address.postal} {HOTEL_CONFIG.address.city}</span>
            </div>

            {/* CTAs */}
            <div className="reveal stagger-4 flex flex-wrap gap-3">
              <Link href="/chambres" className="btn-primary text-sm">
                <Icon name="HomeIcon" size={16} />
                {t('hotel', 'discover')}
              </Link>
              <a
                href={HOTEL_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm">
                
                <Icon name="MapPinIcon" size={16} />
                Itinéraire
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);

}