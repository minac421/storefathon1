import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LanguageSwitcherProps {
  locale: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ locale }) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  
  const changeLanguage = (newLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="flex space-x-2 rtl:space-x-reverse">
      <button 
        onClick={() => changeLanguage('ar')}
        className={`px-2 py-1 rounded ${locale === 'ar' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}
      >
        AR
      </button>
      <button 
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded ${locale === 'en' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage('tr')}
        className={`px-2 py-1 rounded ${locale === 'tr' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}
      >
        TR
      </button>
    </div>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  
  return (
    <Link href={href} className={`px-3 py-2 rounded-md text-sm font-medium ${
      isActive 
        ? 'bg-amber-600 text-white' 
        : 'text-gray-800 hover:bg-amber-500 hover:text-white'
    }`}>
      {children}
    </Link>
  );
};

interface HeaderProps {
  translations: {
    home: string;
    services: string;
    castles: string;
    bots: string;
    events: string;
    distributor: string;
    customOrder: string;
    support: string;
  };
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ translations, locale }) => {
  const isRTL = locale === 'ar';
  
  return (
    <header className={`bg-white shadow-md ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                className="h-10 w-auto"
                src="/images/logo.png"
                alt="الفاتحون: العصر الذهبي"
              />
              <span className="ml-2 rtl:mr-2 rtl:ml-0 text-xl font-bold text-amber-600">
                الفاتحون
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-4 rtl:space-x-reverse">
            <NavLink href="/">{translations.home}</NavLink>
            <NavLink href="/services">{translations.services}</NavLink>
            <NavLink href="/castles">{translations.castles}</NavLink>
            <NavLink href="/bots">{translations.bots}</NavLink>
            <NavLink href="/events">{translations.events}</NavLink>
            <NavLink href="/distributor">{translations.distributor}</NavLink>
            <NavLink href="/custom-order">{translations.customOrder}</NavLink>
            <NavLink href="/support">{translations.support}</NavLink>
          </nav>
          
          <div className="flex items-center">
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
