'use client';
import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { HOTEL_CONFIG } from '@/lib/config';

export default function ContactContent() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = t('contact', 'required');
    if (!form.email.trim()) newErrors.email = t('contact', 'required');
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = t('contact', 'invalidEmail');
    if (!form.subject.trim()) newErrors.subject = t('contact', 'required');
    if (!form.message.trim()) newErrors.message = t('contact', 'required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    // CONTACT FORM INTEGRATION POINT
    // Replace with actual email service (e.g., POST to /api/contact)
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const CONTACT_ACTIONS = [
    {
      icon: 'PhoneIcon',
      label: t('contact', 'call'),
      value: HOTEL_CONFIG.phoneDisplay,
      href: `tel:${HOTEL_CONFIG.phone}`,
      color: 'primary',
    },
    {
      icon: 'ChatBubbleLeftEllipsisIcon',
      label: 'WhatsApp',
      value: HOTEL_CONFIG.phoneDisplay,
      href: `https://wa.me/${HOTEL_CONFIG.whatsapp}`,
      color: 'whatsapp',
      external: true,
    },
    {
      icon: 'MapPinIcon',
      label: t('contact', 'directions'),
      value: `${HOTEL_CONFIG.address.street}, ${HOTEL_CONFIG.address.city}`,
      href: HOTEL_CONFIG.googleMapsUrl,
      color: 'accent',
      external: true,
    },
  ];

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      {/* Page Title */}
      <div className="text-center space-y-3 mb-16 reveal">
        <span className="section-label">Palmiers Hôtel Club</span>
        <h1 className="text-display font-extrabold tracking-tight text-foreground">{t('contact', 'title')}</h1>
        <p className="text-muted-foreground text-base font-medium">{t('contact', 'subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Info + Map */}
        <div className="space-y-8">
          {/* Contact Actions */}
          <div className="space-y-3 reveal">
            {CONTACT_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-4 p-4 rounded-2xl border border-border hover:shadow-card-hover transition-all group ${
                  action.color === 'whatsapp' ? 'hover:border-[#25D366]' :
                  action.color === 'accent' ? 'hover:border-accent' : 'hover:border-primary'
                }`}
              >
                <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                  action.color === 'whatsapp' ? 'bg-[#25D366]/10 group-hover:bg-[#25D366]' :
                  action.color === 'accent' ? 'bg-accent/10 group-hover:bg-accent' : 'bg-primary/10 group-hover:bg-primary'
                }`}>
                  <Icon
                    name={action.icon as "PhoneIcon"}
                    size={20}
                    className={`transition-colors ${
                      action.color === 'whatsapp' ? 'text-[#25D366] group-hover:text-white' :
                      action.color === 'accent' ? 'text-accent group-hover:text-white' : 'text-primary group-hover:text-white'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{action.label}</p>
                  <p className="text-sm font-bold text-foreground truncate">{action.value}</p>
                </div>
                <Icon name="ArrowRightIcon" size={16} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              </a>
            ))}
          </div>

          {/* Address */}
          <div className="reveal bg-muted/40 rounded-2xl p-5 space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('contact', 'address')}</p>
            <div className="flex items-start gap-3">
              <Icon name="MapPinIcon" size={18} className="text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-foreground">{HOTEL_CONFIG.name}</p>
                <p className="text-sm text-muted-foreground font-medium mt-0.5">
                  {HOTEL_CONFIG.address.street}<br />
                  {HOTEL_CONFIG.address.postal} {HOTEL_CONFIG.address.city}<br />
                  {HOTEL_CONFIG.address.country}
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="reveal rounded-2xl overflow-hidden border border-border h-64 sm:h-80">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26000!2d-4.4200!3d31.9300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(HOTEL_CONFIG.name + ' ' + HOTEL_CONFIG.address.city)}!5e0!3m2!1sfr!2sma!4v1`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Carte ${HOTEL_CONFIG.name}`}
            />
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="reveal stagger-1">
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card">
            <h2 className="text-xl font-extrabold text-foreground mb-6">{t('contact', 'formTitle')}</h2>

            {status === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="CheckIcon" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{t('contact', 'success')}</h3>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-outline text-sm mx-auto"
                >
                  {lang === 'fr' ? 'Envoyer un autre message' : lang === 'en' ? 'Send another message' : 'إرسال رسالة أخرى'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1.5">{t('contact', 'name')} *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${errors.name ? 'border-red-400' : 'border-border'}`}
                      placeholder={lang === 'fr' ? 'Votre nom' : lang === 'en' ? 'Your name' : 'اسمك'}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1.5">{t('contact', 'phone2')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+212 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">{t('contact', 'email')} *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${errors.email ? 'border-red-400' : 'border-border'}`}
                    placeholder="email@exemple.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">{t('contact', 'subject')} *</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${errors.subject ? 'border-red-400' : 'border-border'}`}
                  >
                    <option value="">— {lang === 'fr' ? 'Choisir un sujet' : lang === 'en' ? 'Choose a subject' : 'اختر موضوعاً'} —</option>
                    <option value="reservation">{lang === 'fr' ? 'Réservation' : lang === 'en' ? 'Reservation' : 'حجز'}</option>
                    <option value="info">{lang === 'fr' ? 'Informations générales' : lang === 'en' ? 'General information' : 'معلومات عامة'}</option>
                    <option value="restaurant">{lang === 'fr' ? 'Restaurant' : lang === 'en' ? 'Restaurant' : 'المطعم'}</option>
                    <option value="services">{lang === 'fr' ? 'Services' : lang === 'en' ? 'Services' : 'الخدمات'}</option>
                    <option value="other">{lang === 'fr' ? 'Autre' : lang === 'en' ? 'Other' : 'أخرى'}</option>
                  </select>
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">{t('contact', 'message')} *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-colors ${errors.message ? 'border-red-400' : 'border-border'}`}
                    placeholder={lang === 'fr' ? 'Votre message...' : lang === 'en' ? 'Your message...' : 'رسالتك...'}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center text-sm py-3.5"
                >
                  {status === 'sending' ? (
                    <>
                      <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
                      {t('contact', 'sending')}
                    </>
                  ) : (
                    <>
                      <Icon name="PaperAirplaneIcon" size={16} />
                      {t('contact', 'send')}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}