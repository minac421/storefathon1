"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import getTranslation from '@/lib/i18n';
import { CartWidget } from './cart';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = getTranslation(locale);
  const isRTL = locale === 'ar';
  const pathname = usePathname();
  
  // إضافة مراقبة للتمرير
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // تعريف اللغة العربية كلغة افتراضية ووحيدة
  const currentPath = pathname;
  
  // Navigation items
  const navItems = [
    { key: 'home', label: t?.header?.home || 'الرئيسية', href: '/' },
    { key: 'services', label: t?.header?.services || 'الخدمات', href: '/services' },
    { key: 'castles', label: t?.header?.castles || 'القلاع', href: '/castles' },
    { key: 'blog', label: 'المدونة', href: '/blog' },
    { key: 'bots', label: t?.header?.bots || 'الروبوتات', href: '/bots' },
    { key: 'events', label: t?.header?.events || 'الأحداث', href: '/events' },
    { key: 'custom-order', label: t?.header?.customOrder || 'طلب مخصص', href: '/custom-order' },
    { key: 'admin', label: 'لوحة التحكم', href: '/admin' },
  ];
  
  // اسم الموقع والشعار الفرعي باللغة العربية فقط
  const siteName = 'Store Fathon';
  const siteTagline = 'خدمات متميزة للاعبين';
  
  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur-sm shadow-md' : 'bg-gradient-to-b from-black/70 to-transparent'} relative overflow-hidden`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/store-fathon-logo.svg" 
                alt="Store Fathon Logo" 
                width={50} 
                height={50} 
                className={`${isRTL ? 'ml-2' : 'mr-2'}`}
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  {siteName}
                </span>
                <span className="text-xs text-white text-opacity-80">
                  {siteTagline}
                </span>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex items-center space-x-6 ${isRTL ? 'space-x-reverse' : ''}`}>
          <ul className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-6`}>
            {navItems.map((item) => (
              <li key={item.key}>
                <Link 
                  href={`${item.href}`}
                  className={`text-white hover:text-blue-100 transition-colors py-2 ${
                    pathname === item.href ? 'font-bold text-white' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* أدوات المستخدم */}
        <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
          {/* تعطيل مؤقت لمكون CartWidget حتى يتم إصلاح السياق */}
          {/* <CartWidget locale={locale} /> */}
          
          {/* تم إلغاء أزرار اللغة للتبسيط والاكتفاء باللغة العربية */}
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-orange-500 shadow-lg">
          <nav className="px-6 pt-2 pb-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link 
                    href={`${item.href}`}
                    className={`block py-2 text-white hover:text-blue-100 transition-colors ${
                      pathname === item.href ? 'font-bold text-white' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
