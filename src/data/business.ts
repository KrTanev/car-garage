// Mock, language-independent business facts. Replace with real values once
// available — display strings (day labels, service names, etc.) live in
// src/i18n/translations.ts instead, keyed by the ids below.

export const BUSINESS_INFO = {
  name: 'Solid Cars',
  foundedYear: 2015,
  phone: '+359 88 123 4567',
  email: 'info@solidcars.example',
  // Street name only — city/country vary by language and live in
  // translations.ts (t.common.cityCountry). See Footer.tsx / About.tsx.
  addressStreet: 'ul. Iskra 12',
};

export type HoursId = 'weekdays' | 'saturday' | 'sunday';

export const HOURS: { id: HoursId; time: string }[] = [
  { id: 'weekdays', time: '08:00 – 18:00' },
  { id: 'saturday', time: '09:00 – 14:00' },
  { id: 'sunday', time: '—' },
];

export type ServiceId = 'diagnostics' | 'brakes' | 'oilChange' | 'tires' | 'suspension' | 'engine';

// 'tires' intentionally excluded from display — kept in the ServiceId type
// and translations in case it's added back later.
export const SERVICE_IDS: ServiceId[] = [
  'diagnostics',
  'brakes',
  'oilChange',
  'suspension',
  'engine',
];

export type GalleryId = 'workshop' | 'diagnosticsBay' | 'team' | 'pickup';

export const GALLERY_IDS: GalleryId[] = ['workshop', 'diagnosticsBay', 'team', 'pickup'];
