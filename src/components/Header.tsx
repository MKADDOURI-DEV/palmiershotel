'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { HOTEL_CONFIG } from '@/lib/config';

const LANGUAGES = [
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ar', label: 'AR', flag: '🇲🇦' },
] as const;

export default function Header() {
  const { t, lang, setLang, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { href: '/', label: t('nav', 'home') },
    { href: '/#hotel', label: t('nav', 'hotel') },
    { href: '/chambres', label: t('nav', 'rooms') },
    { href: '/restaurant', label: t('nav', 'restaurant') },
    { href: '/services', label: t('nav', 'services') },
    { href: '/galerie', label: t('nav', 'gallery') },
    { href: '/contact', label: t('nav', 'contact') },
  ];

  const handleNav = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Palmiers Hôtel Club — Accueil">
            <AppLogo size={36} />
            <div className="hidden sm:block">
              <div className={`text-sm font-extrabold tracking-tight leading-none ${scrolled ? 'text-foreground' : 'text-white'}`}>
                PALMIERS
              </div>
              <div className={`text-xs font-semibold tracking-widest uppercase ${scrolled ? 'text-muted-foreground' : 'text-white/80'}`}>
                HÔTEL CLUB
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors hover:bg-primary/10 hover:text-primary ${
                  scrolled ? 'text-foreground' : 'text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  scrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/20'
                }`}
                aria-label="Changer de langue"
              >
                <span>{LANGUAGES.find(l => l.code === lang)?.flag}</span>
                <span>{LANGUAGES.find(l => l.code === lang)?.label}</span>
                <Icon name="ChevronDownIcon" size={12} className={langOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>
              {langOpen && (
                <div className="absolute top-full mt-1 right-0 bg-white rounded-xl shadow-card border border-border overflow-hidden z-50 min-w-[100px]">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-muted transition-colors ${lang === l.code ? 'text-primary bg-primary/5' : 'text-foreground'}`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Call button */}
            <a
              href={`tel:${HOTEL_CONFIG.phone}`}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold border transition-all hover:scale-105 ${
                scrolled
                  ? 'border-border text-foreground hover:border-primary hover:text-primary'
                  : 'border-white/40 text-white hover:bg-white/20'
              }`}
              aria-label={`Appeler ${HOTEL_CONFIG.phoneDisplay}`}
            >
              <Icon name="PhoneIcon" size={14} />
              <span className="hidden md:inline">{t('nav', 'call')}</span>
            </a>

            {/* Book button */}
            <Link
              href="/chambres"
              className="btn-accent text-xs sm:text-sm !px-4 !py-2 sm:!px-5 sm:!py-2.5"
            >
              <Icon name="CalendarIcon" size={14} />
              <span>{t('nav', 'book')}</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/20'
              }`}
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Icon name="Bars3Icon" size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-72 h-full bg-white shadow-2xl flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <AppLogo size={32} />
                <div>
                  <div className="text-sm font-extrabold tracking-tight text-foreground leading-none">PALMIERS</div>
                  <div className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">HÔTEL CLUB</div>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Fermer le menu"
              >
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNav}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-primary/8 hover:text-primary transition-colors"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Bottom Actions */}
            <div className="p-4 border-t border-border space-y-3">
              <a
                href={`tel:${HOTEL_CONFIG.phone}`}
                onClick={handleNav}
                className="btn-primary w-full justify-center text-sm"
              >
                <Icon name="PhoneIcon" size={16} />
                {HOTEL_CONFIG.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${HOTEL_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNav}
                className="whatsapp-btn w-full justify-center text-sm"
              >
                <Icon name="ChatBubbleLeftEllipsisIcon" size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}