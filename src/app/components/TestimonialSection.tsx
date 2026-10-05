'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { HOTEL_CONFIG } from '@/lib/config';

const TESTIMONIALS = [
{
  quote: { fr: 'Un séjour magnifique, accueil chaleureux, disponibilité des propriétaires, propreté des chambres impeccable.', en: 'A magnificent stay, warm welcome, attentive owners, impeccably clean rooms.', ar: 'إقامة رائعة، استقبال دافئ، غرف نظيفة للغاية.' },
  name: 'Karim Benali',
  origin: { fr: 'Casablanca, Maroc', en: 'Casablanca, Morocco', ar: 'الدار البيضاء، المغرب' },
  avatar: "https://images.unsplash.com/photo-1707631588428-554c4d822796",
  alt: 'Portrait homme souriant fond neutre',
  rating: 5
},
{
  quote: { fr: 'Excellent séjour ! La piscine est superbe, le personnel très professionnel. Je recommande vivement.', en: 'Excellent stay! The pool is superb, the staff very professional. Highly recommended.', ar: 'إقامة ممتازة! المسبح رائع والموظفون محترفون جداً.' },
  name: 'Sophie Martínez',
  origin: { fr: 'Paris, France', en: 'Paris, France', ar: 'باريس، فرنسا' },
  avatar: "https://images.unsplash.com/photo-1542883836-68d9e7fc2f75",
  alt: 'Portrait femme souriante fond clair',
  rating: 5
},
{
  quote: { fr: 'Prix intéressants pour un hôtel de cette qualité. Le jardin et la terrasse sont magnifiques.', en: 'Great value for a hotel of this quality. The garden and terrace are magnificent.', ar: 'أسعار مناسبة لفندق بهذا المستوى. الحديقة والتراس رائعان.' },
  name: 'Ahmed Tazi',
  origin: { fr: 'Marrakech, Maroc', en: 'Marrakech, Morocco', ar: 'مراكش، المغرب' },
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17c0becbe-1769196162783.png",
  alt: 'Portrait homme décontracté souriant',
  rating: 4
}];


export default function TestimonialSection() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('visible');}),
      { threshold: 0.1 }
    );
    const els = sectionRef?.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Dark card — full bleed testimonial block */}
        <div className="bg-foreground rounded-4xl sm:rounded-5xl p-8 sm:p-16 reveal">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-accent">
              {lang === 'fr' ? 'Avis clients' : lang === 'en' ? 'Guest Reviews' : 'تقييمات الضيوف'}
            </span>
            <h2 className="text-display font-extrabold tracking-tight text-white">
              {lang === 'fr' ? 'Ce que disent nos hôtes' : lang === 'en' ? 'What our guests say' : 'ما يقوله ضيوفنا'}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 })?.map((_, i) =>
                <Icon key={i} name="StarIcon" size={16} className="text-amber-400 fill-current" />
                )}
              </div>
              <span className="text-white/60 text-sm font-medium">{HOTEL_CONFIG?.rating?.score}/10 · {HOTEL_CONFIG?.rating?.count} {t('hero', 'reviews')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS?.map((review, i) =>
            <div
              key={review?.name}
              className="bg-white/8 border border-white/10 rounded-3xl p-6 space-y-4 hover:bg-white/12 transition-colors reveal"
              style={{ transitionDelay: `${i * 100}ms` }}>
              
                <div className="flex">
                  {Array.from({ length: review?.rating })?.map((_, j) =>
                <Icon key={j} name="StarIcon" size={14} className="text-amber-400 fill-current" />
                )}
                </div>
                <p className="text-white/80 text-sm leading-relaxed font-medium italic">
                  &ldquo;{lang === 'fr' ? review?.quote?.fr : lang === 'en' ? review?.quote?.en : review?.quote?.ar}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="size-10 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
                    <AppImage
                    src={review?.avatar}
                    alt={review?.alt}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full" />
                  
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{review?.name}</p>
                    <p className="text-white/40 text-xs font-medium">
                      {lang === 'fr' ? review?.origin?.fr : lang === 'en' ? review?.origin?.en : review?.origin?.ar}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}