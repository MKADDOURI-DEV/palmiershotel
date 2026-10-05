'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { HOTEL_CONFIG } from '@/lib/config';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-border pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3" aria-label="Palmiers Hôtel Club">
              <AppLogo size={40} />
              <div>
                <div className="font-extrabold tracking-tight text-foreground text-base leading-tight">PALMIERS</div>
                <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">HÔTEL CLUB</div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              {t('footer', 'tagline')}
            </p>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Icon name="MapPinIcon" size={16} className="text-accent mt-0.5 shrink-0" />
              <span>
                {HOTEL_CONFIG?.address?.street}<br />
                {HOTEL_CONFIG?.address?.postal} {HOTEL_CONFIG?.address?.city}, {HOTEL_CONFIG?.address?.country}
              </span>
            </div>
            <a
              href={`tel:${HOTEL_CONFIG?.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              <Icon name="PhoneIcon" size={15} className="text-primary" />
              {HOTEL_CONFIG?.phoneDisplay}
            </a>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Link href="/chambres" className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1">
                {t('footer', 'rooms')}
              </Link>
              <Link href="/restaurant" className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1">
                {t('footer', 'restaurant')}
              </Link>
              <Link href="/services" className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1">
                {t('footer', 'services')}
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="/galerie" className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1">
                {t('footer', 'gallery')}
              </Link>
              <Link href="/contact" className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1">
                {t('footer', 'contact')}
              </Link>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Contact Direct</p>
            <a
              href={`tel:${HOTEL_CONFIG?.phone}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Icon name="PhoneIcon" size={15} className="text-primary group-hover:text-white" />
              </div>
              <span className="text-sm font-semibold text-foreground">{HOTEL_CONFIG?.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${HOTEL_CONFIG?.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all group"
            >
              <div className="size-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                <Icon name="ChatBubbleLeftEllipsisIcon" size={15} className="text-[#25D366] group-hover:text-white" />
              </div>
              <span className="text-sm font-semibold text-foreground">WhatsApp</span>
            </a>
            <a
              href={HOTEL_CONFIG?.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:border-accent hover:bg-accent/5 transition-all group"
            >
              <div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                <Icon name="MapPinIcon" size={15} className="text-accent group-hover:text-white" />
              </div>
              <span className="text-sm font-semibold text-foreground">Google Maps</span>
            </a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-medium">{t('footer', 'copyright')}</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
              {t('footer', 'privacy')}
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
              {t('footer', 'legal')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}