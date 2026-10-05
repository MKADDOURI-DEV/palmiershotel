'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations, type Language } from '@/lib/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (section: string, key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  t: () => '',
  dir: 'ltr',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('fr');

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  const t = useCallback((section: string, key: string): string => {
    const sectionData = (translations[lang] as Record<string, Record<string, string>>)[section];
    if (!sectionData) return key;
    return sectionData[key] || key;
  }, [lang]);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      <div dir={dir} lang={lang}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);