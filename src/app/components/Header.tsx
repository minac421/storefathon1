"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserSettings from './UserSettings';
import { getUserSettings, getUserInitial } from '@/utils/userSettings';

interface HeaderProps {
  locale?: string;
}

const Header: React.FC<HeaderProps> = ({ locale = 'ar' }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();
  const [userSettings, setUserSettings] = useState<{ nickname: string; avatarId: number } | null>(null);
  
  // استرجاع بيانات المستخدم من التخزين المحلي عند تحميل المكون
  useEffect(() => {
    const settings = getUserSettings();
    if (settings) {
      setUserSettings(settings);
    }
  }, [isSettingsOpen]); // إعادة التحقق بعد إغلاق نافذة الإعدادات
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-amber-600 dark:text-amber-500">فاتحون</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link 
              href="/" 
              className={`text-sm font-medium ${pathname === '/' ? 'text-amber-600 dark:text-amber-500' : 'text-gray-700 dark:text-gray-300'}`}
            >
              الرئيسية
            </Link>
            <Link 
              href="/services" 
              className={`text-sm font-medium ${pathname === '/services' ? 'text-amber-600 dark:text-amber-500' : 'text-gray-700 dark:text-gray-300'}`}
            >
              الخدمات
            </Link>
            <Link 
              href="/blog" 
              className={`text-sm font-medium ${pathname === '/blog' ? 'text-amber-600 dark:text-amber-500' : 'text-gray-700 dark:text-gray-300'}`}
            >
              المدونة
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium ${pathname === '/about' ? 'text-amber-600 dark:text-amber-500' : 'text-gray-700 dark:text-gray-300'}`}
            >
              عن الموقع
            </Link>
          </nav>
          
          {/* User actions */}
          <div className="flex items-center gap-2">
            {/* زر إعدادات المستخدم */}
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center justify-center ml-2 h-8 w-8 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
              title="إعدادات الملف الشخصي"
            >
              {userSettings?.nickname ? (
                <span className="text-amber-800 font-medium">
                  {getUserInitial(userSettings.nickname)}
                </span>
              ) : (
                <svg className="w-4 h-4 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </button>
            
            <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-sm font-medium">
              طلب خدمة
            </button>
            
            {/* Mobile menu button - shown only on mobile */}
            <button className="md:hidden text-gray-700 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* مكون إعدادات المستخدم */}
      <UserSettings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </header>
  );
};

export default Header;
