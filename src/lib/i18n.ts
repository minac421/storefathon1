// Import translation files
import arTranslations from './translations/ar.json';
import enTranslations from './translations/en.json';
import trTranslations from './translations/tr.json';

// Define Translation type
export type LocaleTranslation = {
  common?: {
    siteName?: string;
    slogan?: string;
    orderNow?: string;
    learnMore?: string;
    contactUs?: string;
  };
  header?: {
    home?: string;
    services?: string;
    castles?: string;
    bots?: string;
    events?: string;
    distributor?: string;
    customOrder?: string;
    support?: string;
    title?: string;
    language?: string;
  };
  footer?: {
    copyright?: string;
    privacyPolicy?: string;
    termsOfService?: string;
    aboutUs?: string;
    followUs?: string;
    companyName?: string;
    companyDescription?: string;
    services?: string;
    company?: string;
    support?: string;
    terms?: string;
    privacy?: string;
    cookies?: string;
    links?: {
      resources?: string;
      military?: string;
      logistics?: string;
      accounts?: string;
      vip?: string;
      about?: string;
      contact?: string;
      faq?: string;
      terms?: string;
      privacy?: string;
      help?: string;
      customOrder?: string;
      delivery?: string;
      payment?: string;
    };
  };
  home?: {
    heroBanner?: {
      title?: string;
      subtitle?: string;
      cta?: string;
    };
    stats?: {
      orders?: string;
      distributors?: string;
      satisfaction?: string;
      title?: string;
      subtitle?: string;
      items?: {
        clients?: string;
        orders?: string;
        satisfaction?: string;
      };
    };
    testimonials?: {
      title?: string;
      subtitle?: string;
    };
    featured?: {
      title?: string;
      subtitle?: string;
    };
    services?: {
      title?: string;
      subtitle?: string;
      viewAll?: string;
    };
    cta?: {
      title?: string;
      subtitle?: string;
      button?: string;
    };
  };
  services?: {
    title?: string;
    subtitle?: string;
    categories?: {
      resources?: string;
      military?: string;
      logistics?: string;
      accounts?: string;
      vip?: string;
    };
    orderNow?: string;
    viewDetails?: string;
    resources?: {
      title?: string;
      description?: string;
      items?: {
        wheat?: string;
        wood?: string;
        iron?: string;
        silver?: string;
        gold?: string;
      };
    };
    militarySupport?: {
      title?: string;
      description?: string;
      items?: {
        armyBoost?: string;
        buildingDevelopment?: string;
        battleSupport?: string;
      };
    };
    logistics?: {
      title?: string;
      description?: string;
      items?: {
        autoCollect?: string;
        supplyLines?: string;
      };
    };
    accounts?: {
      title?: string;
      description?: string;
      items?: {
        standardAccounts?: string;
        vipAccounts?: string;
      };
    };
    vipServices?: {
      title?: string;
      description?: string;
      items?: {
        personalSupport?: string;
        priorityExecution?: string;
        strategicAnalysis?: string;
      };
    };
  };
  castles?: {
    title?: string;
    subtitle?: string;
    filters?: {
      category?: string;
      price?: string;
      all?: string;
      searchPlaceholder?: string;
      clear?: string;
      power?: string;
      type?: string;
    };
    categories?: {
      starter?: string;
      advanced?: string;
      premium?: string;
    };
    level?: string;
    currency?: string;
    features?: string;
    stats?: {
      strength?: string;
      defense?: string;
      capacity?: string;
      buildTime?: string;
      hours?: string;
      instant?: string;
    };
    orderNow?: string;
    outOfStock?: string;
    previewVideo?: string;
    videoPreview?: string;
    realVideoNote?: string;
    back?: string;
    backToDetails?: string;
    noResults?: string;
    orderSimilar?: string;
    viewDetails?: string;
  };
  bots?: {
    title?: string;
    subtitle?: string;
    filters?: {
      category?: string;
      compatibility?: string;
      price?: string;
      all?: string;
      free?: string;
      paid?: string;
      searchPlaceholder?: string;
      clear?: string;
    };
    categories?: {
      farming?: string;
      battle?: string;
      utility?: string;
    };
    compatibility?: {
      windows?: string;
      mac?: string;
      android?: string;
      ios?: string;
    };
    currency?: string;
    free?: string;
    features?: {
      resourceCollection?: string;
      building?: string;
      warfare?: string;
    };
    description?: string;
    viewDetails?: string;
    downloadNow?: string;
    buyNow?: string;
    previewVideo?: string;
    videoPreview?: string;
    realVideoNote?: string;
    back?: string;
    backToDetails?: string;
    noResults?: string;
  };
  events?: {
    title?: string;
    subtitle?: string;
    register?: string;
    eventDetails?: {
      startDate?: string;
      endDate?: string;
      requirements?: string;
      rewards?: string;
    };
    upcoming?: string;
    active?: string;
    past?: string;
    all?: string;
    filters?: {
      type?: string;
      timeframe?: string;
      all?: string;
      alliance?: string;
      kingdom?: string;
      global?: string;
      upcoming?: string;
      active?: string;
      past?: string;
      searchPlaceholder?: string;
      clear?: string;
    };
    days?: string[];
    hours?: string[];
    minutes?: string[];
    seconds?: string[];
    startTime?: string;
    endTime?: string;
    rewards?: string;
    requirements?: string;
    participants?: string;
    registered?: string;
    viewDetails?: string;
    back?: string;
    noResults?: string;
    months?: string[];
  };
  customOrder?: {
    title?: string;
    subtitle?: string;
    form?: {
      orderType?: string;
      quantity?: string;
      notes?: string;
      paymentMethod?: string;
      contactMethod?: string;
      name?: string;
      email?: string;
      phone?: string;
      submit?: string;
    };
    orderTypes?: {
      resources?: string;
      military?: string;
      logistics?: string;
      accounts?: string;
      vip?: string;
      other?: string;
    };
    paymentMethods?: {
      creditCard?: string;
      paypal?: string;
      bankTransfer?: string;
      crypto?: string;
    };
    contactMethods?: {
      email?: string;
      phone?: string;
      whatsapp?: string;
      telegram?: string;
    };
    success?: string;
    error?: string;
    placeholders?: {
      orderType?: string;
      quantity?: string;
      notes?: string;
      paymentMethod?: string;
      contactMethod?: string;
      name?: string;
      email?: string;
      phone?: string;
    };
  };
  support?: {
    title?: string;
    subtitle?: string;
    form?: {
      subject?: string;
      message?: string;
      name?: string;
      email?: string;
      phone?: string;
      submit?: string;
    };
    subjects?: {
      general?: string;
      technical?: string;
      billing?: string;
      other?: string;
    };
    success?: string;
    error?: string;
    placeholders?: {
      subject?: string;
      message?: string;
      name?: string;
      email?: string;
      phone?: string;
    };
    faq?: {
      title?: string;
      subtitle?: string;
      searchPlaceholder?: string;
    };
  };
};

// Define Translations type
export type Translations = {
  ar: LocaleTranslation;
  en: LocaleTranslation;
  tr: LocaleTranslation;
};

// All available translations
const translations: Translations = {
  ar: arTranslations,
  en: enTranslations,
  tr: trTranslations,
};

/**
 * Get translations based on locale
 * @param locale - The locale code (ar, en, tr)
 * @returns Translation object for the specified locale
 */
export default function getTranslation(locale: string = 'ar'): LocaleTranslation {
  return translations[locale as keyof Translations] || translations.ar;
}
