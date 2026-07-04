// Curated list of common makes/models — not exhaustive. Covers what a
// typical European garage sees most often. The form always falls back to a
// free-text "Other" field for anything not listed here, so this never
// blocks data entry, it just speeds up the common case.

export const CAR_MAKES = [
  'Volkswagen',
  'Škoda',
  'Opel',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Renault',
  'Peugeot',
  'Citroën',
  'Ford',
  'Toyota',
  'Hyundai',
  'Kia',
  'Nissan',
  'Honda',
  'Fiat',
  'Dacia',
  'Seat',
  'Mazda',
  'Volvo',
] as const;

export type CarMake = (typeof CAR_MAKES)[number];

export const CAR_MODELS: Record<CarMake, string[]> = {
  Volkswagen: [
    'Golf',
    'Polo',
    'Passat',
    'Tiguan',
    'Touran',
    'Jetta',
    'T-Roc',
    'Caddy',
  ],
  Škoda: ['Octavia', 'Fabia', 'Superb', 'Kodiaq', 'Karoq', 'Rapid', 'Yeti'],
  Opel: ['Astra', 'Corsa', 'Insignia', 'Mokka', 'Zafira', 'Vectra'],
  BMW: ['1 Series', '3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5'],
  'Mercedes-Benz': [
    'A-Class',
    'C-Class',
    'E-Class',
    'S-Class',
    'GLC',
    'GLE',
    'Vito',
  ],
  Audi: ['A1', 'A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7'],
  Renault: ['Clio', 'Megane', 'Captur', 'Kadjar', 'Scenic', 'Laguna'],
  Peugeot: ['206', '208', '308', '2008', '3008', '508'],
  Citroën: ['C3', 'C4', 'C5', 'Berlingo', 'C-Elysée'],
  Ford: ['Fiesta', 'Focus', 'Mondeo', 'Kuga', 'Puma', 'Transit'],
  Toyota: ['Yaris', 'Corolla', 'Auris', 'Avensis', 'RAV4', 'C-HR'],
  Hyundai: ['i10', 'i20', 'i30', 'Tucson', 'ix35', 'Santa Fe'],
  Kia: ['Picanto', 'Ceed', 'Rio', 'Sportage', 'Sorento'],
  Nissan: ['Micra', 'Note', 'Juke', 'Qashqai', 'X-Trail'],
  Honda: ['Jazz', 'Civic', 'Accord', 'CR-V'],
  Fiat: ['Panda', 'Punto', '500', 'Tipo', 'Doblo'],
  Dacia: ['Sandero', 'Logan', 'Duster', 'Dokker'],
  Seat: ['Ibiza', 'Leon', 'Arona', 'Ateca'],
  Mazda: ['2', '3', '6', 'CX-5'],
  Volvo: ['S60', 'V40', 'V60', 'XC60', 'XC90'],
};
