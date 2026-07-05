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
    services: string;
    about: string;
    documents: string;
    login: string;
    logout: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
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
    intro: string;
    galleryTitle: string;
    gallery: Record<GalleryId, string>;
  };
  services: {
    maintenanceTitle: string;
    repairsTitle: string;
    items: Record<ServiceId, ServiceCopy>;
  };
  documents: {
    title: string;
    newInvoiceButton: string;
    newInvoiceTitle: string;
    editInvoiceTitle: (number: string) => string;
    cancelButton: string;
    saveChangesButton: string;
    saving: string;
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
    tableEmpty: string;
    colNumber: string;
    colDate: string;
    colCustomer: string;
    colVehicle: string;
    colTotal: string;
    colActions: string;
    editAction: string;
    downloadAction: string;
    deleteAction: string;
    deleteDialogTitle: string;
    deleteConfirm: (number: string) => string;
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
    services: 'Услуги',
    about: 'За нас',
    documents: 'Документи',
    login: 'Вход за персонал',
    logout: 'Изход',
  },
  home: {
    heroTitle: 'Сервизът, на който можете да разчитате',
    heroSubtitle: 'Професионален ремонт и поддръжка на автомобили в Карлово.',
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
    intro:
      'От рутинна поддръжка до пълни ремонти, се отнасяме към всяка кола като към своя. Разполагаме със съвременна диагностика и главен механик, за да получите бърз и надежден сервиз.',
    galleryTitle: 'Галерия',
    gallery: {
      workshop: 'Работилницата',
      diagnosticsBay: 'Диагностичен бокс',
      team: 'Екипът в действие',
      pickup: 'Зона за получаване',
    },
  },
  services: {
    maintenanceTitle: 'Поддръжка',
    repairsTitle: 'Ремонти',
    items: {
      oilChange: {
        title: 'Смяна на масло',
        description:
          'Смяна на масло и филтър за всички марки и модели, докато чакате.',
      },
      fluids: {
        title: 'Смяна на течности',
        description:
          'Доливане и смяна на антифриз, спирачна течност и други работни течности по график.',
      },
      bulbs: {
        title: 'Крушки и осветление',
        description: 'Смяна на крушки за фарове, стопове и мигачи.',
      },
      diagnostics: {
        title: 'Диагностика',
        description:
          'Пълна компютърна диагностика за бързо откриване на проблема, преди да стане скъп.',
      },
      engine: {
        title: 'Ремонт на двигател',
        description:
          'От малки поправки до пълно основно ремонтиране на двигателя.',
      },
      timingBelt: {
        title: 'Смяна на ангренажен ремък',
        description:
          'Смяна на ангренажен комплект навреме, преди да доведе до по-сериозна повреда.',
      },
      transmission: {
        title: 'Ремонт на скоростна кутия',
        description:
          'Диагностика и ремонт на ръчни и автоматични скоростни кутии.',
      },
      clutch: {
        title: 'Смяна на съединител',
        description:
          'Смяна на съединител при пробуксуване, вибрации или трудно превключване.',
      },
      suspension: {
        title: 'Окачване',
        description: 'Амортисьори, стойки и пълен ремонт на окачването.',
      },
      brakes: {
        title: 'Спирачки',
        description:
          'Преглед и ремонт на накладки, дискове и цялата спирачна система.',
      },
      cooling: {
        title: 'Охладителна система',
        description:
          'Ремонт на радиатор, термостат и водна помпа, за да не прегрява двигателят.',
      },
      fuelSystem: {
        title: 'Горивна система',
        description: 'Проверка и ремонт на инжектори, горивна помпа и филтри.',
      },
    },
  },
  documents: {
    title: 'Фактури',
    newInvoiceButton: '+ Нова фактура',
    newInvoiceTitle: 'Нова фактура за ремонт',
    editInvoiceTitle: (number) => `Редакция на фактура ${number}`,
    cancelButton: 'Отказ',
    saveChangesButton: 'Запази промените',
    saving: 'Запазване…',
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
    tableEmpty: 'Все още няма генерирани фактури.',
    colNumber: 'Фактура №',
    colDate: 'Дата',
    colCustomer: 'Клиент',
    colVehicle: 'Автомобил',
    colTotal: 'Общо',
    colActions: 'Действия',
    editAction: 'Редактирай',
    downloadAction: 'Изтегли',
    deleteAction: 'Изтрий',
    deleteDialogTitle: 'Изтриване на фактура',
    deleteConfirm: (number) =>
      `Сигурни ли сте, че искате да изтриете фактура ${number}? Ще изчезне от този списък.`,
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
    services: 'Services',
    about: 'About',
    documents: 'Documents',
    login: 'Staff login',
    logout: 'Log out',
  },
  home: {
    heroTitle: 'The garage you can rely on',
    heroSubtitle: 'Professional car repair and maintenance in Karlovo.',
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
    intro:
      "From routine maintenance to full repairs, we treat every car like it's our own. Our team of experienced head mechanic uses modern diagnostic equipment to get you back on the road quickly and reliably.",
    galleryTitle: 'Gallery',
    gallery: {
      workshop: 'Workshop floor',
      diagnosticsBay: 'Diagnostics bay',
      team: 'The team at work',
      pickup: 'Customer pickup area',
    },
  },
  services: {
    maintenanceTitle: 'Maintenance',
    repairsTitle: 'Repairs',
    items: {
      oilChange: {
        title: 'Oil change',
        description:
          'Oil and filter changes for all makes and models, done while you wait.',
      },
      fluids: {
        title: 'Fluid top-offs & changes',
        description:
          'Coolant, brake fluid, and other fluids topped up or changed on schedule.',
      },
      bulbs: {
        title: 'Bulbs & lighting',
        description:
          'Headlight, brake light, and indicator bulb replacement.',
      },
      diagnostics: {
        title: 'Diagnostics',
        description:
          'Full computer diagnostics to pinpoint issues fast, before they become expensive ones.',
      },
      engine: {
        title: 'Engine repair',
        description: 'From minor fixes to full engine overhauls.',
      },
      timingBelt: {
        title: 'Timing belt replacement',
        description:
          'Timely timing belt kit replacement, before it causes serious engine damage.',
      },
      transmission: {
        title: 'Transmission repair',
        description:
          'Diagnosis and repair for both manual and automatic transmissions.',
      },
      clutch: {
        title: 'Clutch replacement',
        description: 'Clutch replacement for slipping, vibration, or hard shifting.',
      },
      suspension: {
        title: 'Suspension',
        description: 'Shocks, struts, and full suspension repair.',
      },
      brakes: {
        title: 'Brakes',
        description: 'Pad, disc, and full brake system inspection and repair.',
      },
      cooling: {
        title: 'Cooling system',
        description:
          'Radiator, thermostat, and water pump repair to keep the engine from overheating.',
      },
      fuelSystem: {
        title: 'Fuel system',
        description: 'Injector, fuel pump, and filter inspection and repair.',
      },
    },
  },
  documents: {
    title: 'Invoices',
    newInvoiceButton: '+ New invoice',
    newInvoiceTitle: 'New repair invoice',
    editInvoiceTitle: (number) => `Edit invoice ${number}`,
    cancelButton: 'Cancel',
    saveChangesButton: 'Save changes',
    saving: 'Saving…',
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
    tableEmpty: 'No invoices generated yet.',
    colNumber: 'Invoice #',
    colDate: 'Date',
    colCustomer: 'Customer',
    colVehicle: 'Vehicle',
    colTotal: 'Total',
    colActions: 'Actions',
    editAction: 'Edit',
    downloadAction: 'Download',
    deleteAction: 'Delete',
    deleteDialogTitle: 'Delete invoice',
    deleteConfirm: (number) =>
      `Are you sure you want to delete invoice ${number}? It will be removed from this list.`,
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
