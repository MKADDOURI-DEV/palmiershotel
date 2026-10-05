'use client';
import React, { useState, useEffect, useRef } from 'react';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { HOTEL_CONFIG } from '@/lib/config';
import BookingModal from '@/components/BookingModal';

const CUISINES = [
{ icon: '🇲🇦', labelFr: 'Marocaine', labelEn: 'Moroccan', labelAr: 'مغربية' },
{ icon: '🌍', labelFr: 'Internationale', labelEn: 'International', labelAr: 'دولية' },
{ icon: '🇪🇺', labelFr: 'Européenne', labelEn: 'European', labelAr: 'أوروبية' }];


const MEAL_TIMES = [
{ icon: 'SunIcon', labelFr: 'Petit-déjeuner', labelEn: 'Breakfast', labelAr: 'الإفطار', timeFr: 'Dès le matin', timeEn: 'From morning', timeAr: 'من الصباح' },
{ icon: 'SparklesIcon', labelFr: 'Brunch', labelEn: 'Brunch', labelAr: 'برانش', timeFr: 'Week-end', timeEn: 'Weekends', timeAr: 'عطلة نهاية الأسبوع' },
{ icon: 'BeakerIcon', labelFr: 'Déjeuner', labelEn: 'Lunch', labelAr: 'الغداء', timeFr: 'Midi', timeEn: 'Midday', timeAr: 'الظهيرة' },
{ icon: 'MoonIcon', labelFr: 'Dîner', labelEn: 'Dinner', labelAr: 'العشاء', timeFr: 'Soir', timeEn: 'Evening', timeAr: 'المساء' },
{ icon: 'HeartIcon', labelFr: 'Tea time', labelEn: 'Tea time', labelAr: 'وقت الشاي', timeFr: 'Après-midi', timeEn: 'Afternoon', timeAr: 'بعد الظهر' },
{ icon: 'StarIcon', labelFr: 'Cocktails', labelEn: 'Cocktails', labelAr: 'كوكتيل', timeFr: 'Happy hour', timeEn: 'Happy hour', timeAr: 'ساعة سعيدة' }];


const DIET_OPTIONS = [
{ icon: '☪️', labelFr: 'Halal', labelEn: 'Halal', labelAr: 'حلال' },
{ icon: '🥗', labelFr: 'Végétarienne', labelEn: 'Vegetarian', labelAr: 'نباتي' },
{ icon: '🌱', labelFr: 'Végane', labelEn: 'Vegan', labelAr: 'نباتي صرف' }];


const RESTAURANT_IMAGES = [
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1517867ae-1774737643947.png", alt: 'Salle de restaurant élégante avec éclairage chaleureux et tables dressées pour le dîner' },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1a0f882bf-1771504620941.png", alt: 'Table dressée avec plats marocains colorés et décoration artisanale locale authentique' },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_16b2ccc96-1767313038076.png", alt: 'Terrasse restaurant extérieure avec vue sur jardin verdoyant et ambiance détendue' }];


export default function RestaurantContent() {
  const { t, lang } = useLanguage();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => i === null ? null : (i + 1) % RESTAURANT_IMAGES.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => i === null ? null : (i - 1 + RESTAURANT_IMAGES.length) % RESTAURANT_IMAGES.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  return (
    <>
      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <AppImage
          src={RESTAURANT_IMAGES[0].src}
          alt={RESTAURANT_IMAGES[0].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto w-full">
            <span className="section-label text-accent/80">Palmiers Hôtel Club</span>
            <h1 className="text-display font-extrabold tracking-tight text-white mt-1">
              {t('restaurant', 'title')}
            </h1>
          </div>
        </div>
      </div>

      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-20">

        {/* Intro + Image Split */}
        <div className="grid lg:grid-cols-2 gap-12 items-center reveal">
          <div className="space-y-6">
            <h2 className="text-section font-extrabold tracking-tight text-foreground">
              {t('restaurant', 'desc')}
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              {lang === 'fr' ? 'Notre restaurant est ouvert aux résidents de l\'hôtel et aux visiteurs extérieurs. Chaque plat est préparé avec des produits frais et des épices soigneusement sélectionnées pour vous offrir une expérience culinaire mémorable.' :
              lang === 'en' ? 'Our restaurant is open to hotel guests and outside visitors. Every dish is prepared with fresh produce and carefully selected spices to offer you a memorable culinary experience.' : 'مطعمنا مفتوح لضيوف الفندق والزوار الخارجيين. كل طبق يُحضَّر بمكونات طازجة وتوابل مختارة بعناية.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setBookingOpen(true)}
                className="btn-primary text-sm">
                
                <Icon name="CalendarIcon" size={16} />
                {t('restaurant', 'discover')}
              </button>
              <a
                href={`tel:${HOTEL_CONFIG.phone}`}
                className="btn-outline text-sm">
                
                <Icon name="PhoneIcon" size={16} />
                {t('restaurant', 'contact')}
              </a>
            </div>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-3 reveal stagger-1">
            <button
              onClick={() => setLightboxIndex(0)}
              className="col-span-2 relative aspect-video rounded-2xl overflow-hidden group cursor-pointer"
              aria-label="Voir la salle du restaurant">
              
              <AppImage
                src={RESTAURANT_IMAGES[0].src}
                alt={RESTAURANT_IMAGES[0].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105" />
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Icon name="MagnifyingGlassPlusIcon" size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
            {RESTAURANT_IMAGES.slice(1).map((img, i) =>
            <button
              key={i}
              onClick={() => setLightboxIndex(i + 1)}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              aria-label={`Voir photo restaurant ${i + 2}`}>
              
                <AppImage
                src={img.src}
                alt={img.alt}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Icon name="MagnifyingGlassPlusIcon" size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Cuisines */}
        <div className="reveal">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">{t('restaurant', 'cuisines')}</p>
          <div className="grid grid-cols-3 gap-4">
            {CUISINES.map((c) =>
            <div key={c.labelFr} className="service-card flex flex-col items-center text-center gap-3 py-6">
                <span className="text-3xl">{c.icon}</span>
                <p className="text-sm font-bold text-foreground">
                  {lang === 'fr' ? c.labelFr : lang === 'en' ? c.labelEn : c.labelAr}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Meal Times */}
        <div className="reveal">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">{t('restaurant', 'moments')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {MEAL_TIMES.map((meal, i) =>
            <div
              key={meal.labelFr}
              className="service-card flex items-center gap-4"
              style={{ transitionDelay: `${i * 50}ms` }}>
              
                <div className="size-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon name={meal.icon as "SunIcon"} size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {lang === 'fr' ? meal.labelFr : lang === 'en' ? meal.labelEn : meal.labelAr}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {lang === 'fr' ? meal.timeFr : lang === 'en' ? meal.timeEn : meal.timeAr}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dietary Options */}
        <div className="reveal">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">{t('restaurant', 'options')}</p>
          <div className="flex flex-wrap gap-3">
            {DIET_OPTIONS.map((opt) =>
            <div key={opt.labelFr} className="flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-full hover:border-primary/40 transition-colors">
                <span className="text-xl">{opt.icon}</span>
                <span className="text-sm font-bold text-foreground">
                  {lang === 'fr' ? opt.labelFr : lang === 'en' ? opt.labelEn : opt.labelAr}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Future Menu Placeholder */}
        <div className="reveal bg-muted/40 border border-dashed border-border rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <div className="size-14 bg-muted rounded-2xl flex items-center justify-center mx-auto">
            <Icon name="DocumentTextIcon" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            {lang === 'fr' ? 'Menu disponible sur demande' : lang === 'en' ? 'Menu available on request' : 'القائمة متاحة عند الطلب'}
          </h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            {lang === 'fr' ? 'Contactez-nous directement pour découvrir nos plats du jour et notre carte complète.' :
            lang === 'en' ? 'Contact us directly to discover our daily specials and full menu.' : 'تواصل معنا مباشرة لاكتشاف أطباق اليوم وقائمتنا الكاملة.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${HOTEL_CONFIG.phone}`} className="btn-primary text-sm">
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

      {/* Lightbox */}
      {lightboxIndex !== null &&
      <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)} role="dialog" aria-modal="true">
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <AppImage
              src={RESTAURANT_IMAGES[lightboxIndex].src}
              alt={RESTAURANT_IMAGES[lightboxIndex].alt}
              fill
              priority
              sizes="90vw"
              className="object-cover" />
            
            </div>
            <button onClick={() => setLightboxIndex(null)} className="absolute -top-12 right-0 text-white p-2" aria-label="Fermer">
              <Icon name="XMarkIcon" size={28} />
            </button>
            <button
            onClick={() => setLightboxIndex((i) => i === null ? null : (i - 1 + RESTAURANT_IMAGES.length) % RESTAURANT_IMAGES.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2"
            aria-label="Précédent">
            
              <Icon name="ChevronLeftIcon" size={24} />
            </button>
            <button
            onClick={() => setLightboxIndex((i) => i === null ? null : (i + 1) % RESTAURANT_IMAGES.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2"
            aria-label="Suivant">
            
              <Icon name="ChevronRightIcon" size={24} />
            </button>
            <p className="text-center text-white/60 text-sm mt-3">{lightboxIndex + 1} / {RESTAURANT_IMAGES.length}</p>
          </div>
        </div>
      }

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>);

}