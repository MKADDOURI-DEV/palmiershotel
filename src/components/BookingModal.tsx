'use client';
import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { HOTEL_CONFIG, ROOMS_CONFIG } from '@/lib/config';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: string;
  initialDates?: { arrival: string; departure: string };
  initialGuests?: { adults: number; children: number; rooms: number };
}

export default function BookingModal({ isOpen, onClose, preselectedRoom, initialDates, initialGuests }: BookingModalProps) {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    arrival: initialDates?.arrival || '',
    departure: initialDates?.departure || '',
    adults: initialGuests?.adults?.toString() || '2',
    children: initialGuests?.children?.toString() || '0',
    rooms: initialGuests?.rooms?.toString() || '1',
    roomType: preselectedRoom || '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (initialDates) setForm(f => ({ ...f, arrival: initialDates.arrival, departure: initialDates.departure }));
    if (initialGuests) setForm(f => ({ ...f, adults: initialGuests.adults.toString(), children: initialGuests.children.toString(), rooms: initialGuests.rooms.toString() }));
    if (preselectedRoom) setForm(f => ({ ...f, roomType: preselectedRoom }));
  }, [initialDates, initialGuests, preselectedRoom]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = t('booking', 'required');
    if (!form.email.trim()) newErrors.email = t('booking', 'required');
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = t('booking', 'invalidEmail');
    if (!form.phone.trim()) newErrors.phone = t('booking', 'required');
    if (!form.arrival) newErrors.arrival = t('booking', 'required');
    if (!form.departure) newErrors.departure = t('booking', 'required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    // BOOKING ENGINE INTEGRATION POINT
    // Replace this timeout with actual API call to:
    // - Your PMS / Channel Manager
    // - Booking Engine API
    // - Email service (e.g., POST to /api/booking)
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  if (!isOpen) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-hero w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 className="text-lg font-extrabold text-foreground">{t('booking', 'modalTitle')}</h2>
            <p className="text-xs text-muted-foreground">{HOTEL_CONFIG.name}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label={t('common', 'close')}>
            <Icon name="XMarkIcon" size={20} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-8 text-center space-y-4">
            <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="CheckIcon" size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">{t('booking', 'success')}</h3>
            <p className="text-muted-foreground text-sm">{HOTEL_CONFIG.phoneDisplay}</p>
            <button onClick={onClose} className="btn-primary mx-auto mt-4">
              {t('common', 'close')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
            {/* Date Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">{t('booking', 'arrival')} *</label>
                <input
                  type="date"
                  name="arrival"
                  value={form.arrival}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${errors.arrival ? 'border-red-400' : 'border-border'}`}
                />
                {errors.arrival && <p className="text-red-500 text-xs mt-1">{errors.arrival}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">{t('booking', 'departure')} *</label>
                <input
                  type="date"
                  name="departure"
                  value={form.departure}
                  onChange={handleChange}
                  min={form.arrival || new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${errors.departure ? 'border-red-400' : 'border-border'}`}
                />
                {errors.departure && <p className="text-red-500 text-xs mt-1">{errors.departure}</p>}
              </div>
            </div>

            {/* Guests Row */}
            <div className="grid grid-cols-3 gap-4">
              {(['adults', 'children', 'rooms'] as const).map((field) => (
                <div key={field}>
                  <label className="block text-xs font-bold text-foreground mb-1.5 capitalize">{t('booking', field)}</label>
                  <select
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {Array.from({ length: field === 'rooms' ? 5 : field === 'adults' ? 6 : 5 }, (_, i) => (
                      <option key={i + (field === 'adults' ? 1 : 0)} value={i + (field === 'adults' ? 1 : 0)}>
                        {i + (field === 'adults' ? 1 : 0)}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">{t('booking', 'roomType')}</label>
              <select
                name="roomType"
                value={form.roomType}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">— {lang === 'fr' ? 'Choisir' : lang === 'en' ? 'Choose' : 'اختر'} —</option>
                {ROOMS_CONFIG.map(r => (
                  <option key={r.id} value={r.id}>
                    {lang === 'fr' ? r.nameFr : lang === 'en' ? r.nameEn : r.nameAr}
                  </option>
                ))}
              </select>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">{t('booking', 'name')} *</label>
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
                <label className="block text-xs font-bold text-foreground mb-1.5">{t('booking', 'phone')} *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${errors.phone ? 'border-red-400' : 'border-border'}`}
                  placeholder="+212 ..."
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">{t('booking', 'email')} *</label>
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
              <label className="block text-xs font-bold text-foreground mb-1.5">{t('booking', 'message')}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder={lang === 'fr' ? 'Demandes spéciales...' : lang === 'en' ? 'Special requests...' : 'طلبات خاصة...'}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-full justify-center text-sm py-3.5"
            >
              {status === 'sending' ? (
                <>
                  <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
                  {t('booking', 'sending')}
                </>
              ) : (
                <>
                  <Icon name="PaperAirplaneIcon" size={16} />
                  {t('booking', 'send')}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}