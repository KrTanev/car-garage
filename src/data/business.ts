// Mock, language-independent business facts. Replace with real values once
// available — display strings (day labels, service names, etc.) live in
// src/i18n/translations.ts instead, keyed by the ids below.

export const BUSINESS_INFO = {
  name: 'Solid Auto',
  foundedYear: 2015,
  phone: 'N/A',
  email: 'info@solidauto.example',
  // Street name only — city/country vary by language and live in
  // translations.ts (t.common.cityCountry). See Footer.tsx / About.tsx.
  addressStreet: 'Карлово',
};

export type HoursId = 'weekdays' | 'saturday' | 'sunday';

export const HOURS: { id: HoursId; time: string }[] = [
  { id: 'weekdays', time: '08:00 – 18:00' },
  { id: 'saturday', time: '09:00 – 14:00' },
  { id: 'sunday', time: '—' },
];

export type ServiceId =
  // Routine maintenance
  | 'oilChange'
  | 'fluids'
  | 'bulbs'
  // Repairs
  | 'diagnostics'
  | 'engine'
  | 'timingBelt'
  | 'transmission'
  | 'clutch'
  | 'suspension'
  | 'brakes'
  | 'cooling'
  | 'fuelSystem';

export const MAINTENANCE_SERVICE_IDS: ServiceId[] = [
  'oilChange',
  'fluids',
  'bulbs',
];

export const REPAIR_SERVICE_IDS: ServiceId[] = [
  'diagnostics',
  'engine',
  'timingBelt',
  'transmission',
  'clutch',
  'suspension',
  'brakes',
  'cooling',
  'fuelSystem',
];

export type GalleryId = 'workshop' | 'diagnosticsBay' | 'team' | 'pickup';

export const GALLERY_IDS: GalleryId[] = [
  'workshop',
  'diagnosticsBay',
  'team',
  'pickup',
];
