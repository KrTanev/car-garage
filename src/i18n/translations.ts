import type { ServiceId, GalleryId, HoursId } from '../data/business';

export type Language = 'bg' | 'en';

interface ServiceCopy {
  title: string;
  description: string;
}

export interface Translations {
  common: {
    cityCountry: string;
  };
  nav: {
    home: string;
    about: string;
    documents: string;
    login: string;
    logout: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    establishedBadge: (year: number) => string;
    callCta: string;
    aboutCta: string;
    findUs: string;
    loginTitle: string;
    emailLabel: string;
    passwordLabel: string;
    loginButton: string;
    loggingIn: string;
    loginError: string;
  };
  about: {
    title: (name: string) => string;
    intro: (foundedYear: number, years: number) => string;
    servicesTitle: string;
    galleryTitle: string;
    services: Record<ServiceId, ServiceCopy>;
    gallery: Record<GalleryId, string>;
  };
  documents: {
    newInvoiceTitle: string;
    invoiceSection: string;
    invoiceNumber: string;
    date: string;
    customerSection: string;
    name: string;
    phone: string;
    email: string;
    vehicleSection: string;
    make: string;
    model: string;
    selectMakePlaceholder: string;
    selectModelPlaceholder: string;
    otherOption: string;
    otherMakePlaceholder: string;
    otherModelPlaceholder: string;
    plate: string;
    vin: string;
    odometer: string;
    workSection: string;
    descriptionPlaceholder: string;
    qty: string;
    unitPrice: string;
    removeItem: string;
    addItem: string;
    laborCost: string;
    notes: string;
    partsTotal: (amount: string) => string;
    laborTotal: (amount: string) => string;
    total: (amount: string) => string;
    downloadButton: string;
    preparingPdf: string;
    historyTitle: string;
    historyEmpty: string;
  };
  footer: {
    hoursTitle: string;
    hours: Record<HoursId, string>;
    contactTitle: string;
    rightsReserved: (year: number, name: string) => string;
  };
  pdf: {
    documentTitle: string;
    invoiceNumberLabel: string;
    customerLabel: string;
    nameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    vehicleLabel: string;
    makeModelLabel: string;
    plateLabel: string;
    vinLabel: string;
    odometerLabel: string;
    workLabel: string;
    descriptionCol: string;
    qtyCol: string;
    unitPriceCol: string;
    totalCol: string;
    partsLabel: string;
    laborLabel: string;
    totalLabel: string;
    notesLabel: string;
  };
}

const bg: Translations = {
  common: {
    cityCountry: 'Карлово, България',
  },
  nav: {
    home: 'Начало',
    about: 'За нас',
    documents: 'Документи',
    login: 'Вход за персонал',
    logout: 'Изход',
  },
  home: {
    heroTitle: 'Сервизът, на който можете да разчитате',
    heroSubtitle: 'Професионален ремонт и поддръжка на автомобили в Карлово.',
    establishedBadge: (year) => `От ${year} г. на пазара`,
    callCta: 'Обадете се',
    aboutCta: 'Научете повече',
    findUs: 'Намерете ни',
    loginTitle: 'Вход за персонал',
    emailLabel: 'Имейл',
    passwordLabel: 'Парола',
    loginButton: 'Вход',
    loggingIn: 'Проверка…',
    loginError: 'Невалиден имейл или парола.',
  },
  about: {
    title: (name) => `За ${name}`,
    intro: (foundedYear, years) =>
      `Поправяме автомобили в Карлово от ${foundedYear} г. — това са ${years} години грижа за автомобилите на нашите клиенти. От рутинна поддръжка до пълни ремонти, се отнасяме към всяка кола като към своя.`,
    servicesTitle: 'Услуги',
    galleryTitle: 'Галерия',
    services: {
      diagnostics: {
        title: 'Диагностика',
        description: 'Пълна компютърна диагностика за бързо откриване на проблема, преди да стане скъп.',
      },
      brakes: {
        title: 'Спирачки',
        description: 'Преглед и ремонт на накладки, дискове и цялата спирачна система.',
      },
      oilChange: {
        title: 'Смяна на масло',
        description: 'Смяна на масло и филтър за всички марки и модели, докато чакате.',
      },
      tires: {
        title: 'Гуми',
        description: 'Монтаж, баланс и сезонна смяна на гуми.',
      },
      suspension: {
        title: 'Окачване',
        description: 'Амортисьори, стойки и пълен ремонт на окачването.',
      },
      engine: {
        title: 'Ремонт на двигател',
        description: 'От малки поправки до пълно основно ремонтиране на двигателя.',
      },
    },
    gallery: {
      workshop: 'Работилницата',
      diagnosticsBay: 'Диагностичен бокс',
      team: 'Екипът в действие',
      pickup: 'Зона за получаване',
    },
  },
  documents: {
    newInvoiceTitle: 'Нова фактура за ремонт',
    invoiceSection: 'Фактура',
    invoiceNumber: 'Фактура №',
    date: 'Дата',
    customerSection: 'Клиент',
    name: 'Име',
    phone: 'Телефон',
    email: 'Имейл',
    vehicleSection: 'Автомобил',
    make: 'Марка',
    model: 'Модел',
    selectMakePlaceholder: '— Изберете марка —',
    selectModelPlaceholder: '— Изберете модел —',
    otherOption: 'Друго',
    otherMakePlaceholder: 'Въведете марка',
    otherModelPlaceholder: 'Въведете модел',
    plate: 'Рег. номер',
    vin: 'VIN номер',
    odometer: 'Пробег',
    workSection: 'Извършена работа',
    descriptionPlaceholder: 'напр. Спирачни накладки, предни',
    qty: 'Бр.',
    unitPrice: 'Ед. цена',
    removeItem: 'Премахни артикул',
    addItem: '+ Добави артикул',
    laborCost: 'Труд',
    notes: 'Бележки',
    partsTotal: (amount) => `Части: ${amount}`,
    laborTotal: (amount) => `Труд: ${amount}`,
    total: (amount) => `Общо: ${amount}`,
    downloadButton: 'Изтегли фактура PDF',
    preparingPdf: 'Подготовка на PDF…',
    historyTitle: 'Последни фактури',
    historyEmpty: 'Все още няма генерирани фактури.',
  },
  footer: {
    hoursTitle: 'Работно време',
    hours: {
      weekdays: 'Пон – Пет',
      saturday: 'Събота',
      sunday: 'Неделя',
    },
    contactTitle: 'Контакти',
    rightsReserved: (year, name) => `© ${year} ${name}. Всички права запазени.`,
  },
  pdf: {
    documentTitle: 'Фактура за ремонт и обслужване',
    invoiceNumberLabel: 'Фактура №',
    customerLabel: 'Клиент',
    nameLabel: 'Име',
    phoneLabel: 'Телефон',
    emailLabel: 'Имейл',
    vehicleLabel: 'Автомобил',
    makeModelLabel: 'Марка / Модел',
    plateLabel: 'Рег. номер',
    vinLabel: 'VIN',
    odometerLabel: 'Пробег',
    workLabel: 'Извършена работа',
    descriptionCol: 'Описание',
    qtyCol: 'Бр.',
    unitPriceCol: 'Ед. цена',
    totalCol: 'Общо',
    partsLabel: 'Части',
    laborLabel: 'Труд',
    totalLabel: 'Общо',
    notesLabel: 'Бележки',
  },
};

const en: Translations = {
  common: {
    cityCountry: 'Karlovo, Bulgaria',
  },
  nav: {
    home: 'Home',
    about: 'About',
    documents: 'Documents',
    login: 'Staff login',
    logout: 'Log out',
  },
  home: {
    heroTitle: 'The garage you can rely on',
    heroSubtitle: 'Professional car repair and maintenance in Karlovo.',
    establishedBadge: (year) => `Serving since ${year}`,
    callCta: 'Call us',
    aboutCta: 'Learn more',
    findUs: 'Find us',
    loginTitle: 'Staff login',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    loginButton: 'Log in',
    loggingIn: 'Checking…',
    loginError: 'Invalid email or password.',
  },
  about: {
    title: (name) => `About ${name}`,
    intro: (foundedYear, years) =>
      `We've been fixing cars in Karlovo since ${foundedYear} — that's ${years} years of keeping our customers' vehicles running right. From routine maintenance to full repairs, we treat every car like it's our own.`,
    servicesTitle: 'Services',
    galleryTitle: 'Gallery',
    services: {
      diagnostics: {
        title: 'Diagnostics',
        description: 'Full computer diagnostics to pinpoint issues fast, before they become expensive ones.',
      },
      brakes: {
        title: 'Brakes',
        description: 'Pad, disc, and full brake system inspection and repair.',
      },
      oilChange: {
        title: 'Oil change',
        description: 'Oil and filter changes for all makes and models, done while you wait.',
      },
      tires: {
        title: 'Tires',
        description: 'Tire fitting, balancing, and seasonal changeovers.',
      },
      suspension: {
        title: 'Suspension',
        description: 'Shocks, struts, and full suspension repair.',
      },
      engine: {
        title: 'Engine repair',
        description: 'From minor fixes to full engine overhauls.',
      },
    },
    gallery: {
      workshop: 'Workshop floor',
      diagnosticsBay: 'Diagnostics bay',
      team: 'The team at work',
      pickup: 'Customer pickup area',
    },
  },
  documents: {
    newInvoiceTitle: 'New repair invoice',
    invoiceSection: 'Invoice',
    invoiceNumber: 'Invoice #',
    date: 'Date',
    customerSection: 'Customer',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    vehicleSection: 'Vehicle',
    make: 'Make',
    model: 'Model',
    selectMakePlaceholder: '— Select make —',
    selectModelPlaceholder: '— Select model —',
    otherOption: 'Other',
    otherMakePlaceholder: 'Enter make',
    otherModelPlaceholder: 'Enter model',
    plate: 'Plate',
    vin: 'VIN',
    odometer: 'Odometer',
    workSection: 'Work performed',
    descriptionPlaceholder: 'e.g. Brake pads, front',
    qty: 'Qty',
    unitPrice: 'Unit price',
    removeItem: 'Remove line item',
    addItem: '+ Add line item',
    laborCost: 'Labor cost',
    notes: 'Notes',
    partsTotal: (amount) => `Parts: ${amount}`,
    laborTotal: (amount) => `Labor: ${amount}`,
    total: (amount) => `Total: ${amount}`,
    downloadButton: 'Download invoice PDF',
    preparingPdf: 'Preparing PDF…',
    historyTitle: 'Recent invoices',
    historyEmpty: 'No invoices generated yet.',
  },
  footer: {
    hoursTitle: 'Working hours',
    hours: {
      weekdays: 'Mon – Fri',
      saturday: 'Saturday',
      sunday: 'Sunday',
    },
    contactTitle: 'Contact',
    rightsReserved: (year, name) => `© ${year} ${name}. All rights reserved.`,
  },
  pdf: {
    documentTitle: 'Repair & Service Invoice',
    invoiceNumberLabel: 'Invoice #',
    customerLabel: 'Customer',
    nameLabel: 'Name',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    vehicleLabel: 'Vehicle',
    makeModelLabel: 'Make / Model',
    plateLabel: 'Plate',
    vinLabel: 'VIN',
    odometerLabel: 'Odometer',
    workLabel: 'Work performed',
    descriptionCol: 'Description',
    qtyCol: 'Qty',
    unitPriceCol: 'Unit price',
    totalCol: 'Total',
    partsLabel: 'Parts',
    laborLabel: 'Labor',
    totalLabel: 'Total',
    notesLabel: 'Notes',
  },
};

export const TRANSLATIONS: Record<Language, Translations> = { bg, en };
