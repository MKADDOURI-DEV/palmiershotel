'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import BookingModal from '@/components/BookingModal';

export default function BookingBar() {
  const { t } = useLanguage();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [dates, setDates] = useState({ arrival: '', departure: '' });
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });

  const today = new Date()?.toISOString()?.split('T')?.[0];

  const handleCheck = () => {
    setBookingOpen(true);
  };

  return (
    <>
      <div className="relative z-20 bg-white shadow-card-hover border border-border rounded-none sm:rounded-2xl mx-0 sm:mx-6 sm:-mt-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-end">
            {/* Arrival */}
            <div className="flex-1 min-w-0">
              <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
                <Icon name="CalendarIcon" size={11} className="inline mr-1" />
                {t('booking', 'arrival')}
              </label>
              <input
                type="date"
                value={dates?.arrival}
                min={today}
                onChange={e => setDates(d => ({ ...d, arrival: e?.target?.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Departure */}
            <div className="flex-1 min-w-0">
              <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
                <Icon name="CalendarDaysIcon" size={11} className="inline mr-1" />
                {t('booking', 'departure')}
              </label>
              <input
                type="date"
                value={dates?.departure}
                min={dates?.arrival || today}
                onChange={e => setDates(d => ({ ...d, departure: e?.target?.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Adults */}
            <div className="w-full sm:w-28">
              <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
                <Icon name="UserIcon" size={11} className="inline mr-1" />
                {t('booking', 'adults')}
              </label>
              <select
                value={guests?.adults}
                onChange={e => setGuests(g => ({ ...g, adults: +e?.target?.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[1,2,3,4,5,6]?.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            {/* Children */}
            <div className="w-full sm:w-28">
              <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
                <Icon name="HeartIcon" size={11} className="inline mr-1" />
                {t('booking', 'children')}
              </label>
              <select
                value={guests?.children}
                onChange={e => setGuests(g => ({ ...g, children: +e?.target?.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[0,1,2,3,4]?.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            {/* Rooms */}
            <div className="w-full sm:w-28">
              <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
                <Icon name="HomeIcon" size={11} className="inline mr-1" />
                {t('booking', 'rooms')}
              </label>
              <select
                value={guests?.rooms}
                onChange={e => setGuests(g => ({ ...g, rooms: +e?.target?.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[1,2,3,4,5]?.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            {/* CTA */}
            <button
              onClick={handleCheck}
              className="btn-primary text-sm whitespace-nowrap !py-3 !px-6 sm:self-end"
            >
              <Icon name="MagnifyingGlassIcon" size={16} />
              {t('booking', 'check')}
            </button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialDates={dates}
        initialGuests={guests}
      />
    </>
  );
}