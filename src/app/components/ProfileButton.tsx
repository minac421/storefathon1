"use client";

import React, { useState, useEffect } from 'react';
import UserSettings from './UserSettings';
import { getUserSettings, getUserInitial, getUserAvatarSrc } from '@/utils/userSettings';

const ProfileButton: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userSettings, setUserSettings] = useState<{ nickname: string; avatarId: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // استرجاع بيانات المستخدم عند تحميل المكون
  useEffect(() => {
    const settings = getUserSettings();
    if (settings) {
      setUserSettings(settings);
    }
  }, [isSettingsOpen]); // إعادة التحقق بعد إغلاق نافذة الإعدادات
  
  return (
    <>
      {/* زر الملف الشخصي العائم بتأثيرات حركية */}
      <div className="fixed left-4 top-20 z-40 flex flex-col items-start">
        <button 
          onClick={() => setIsSettingsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            flex items-center justify-center overflow-hidden
            w-14 h-14 rounded-lg bg-white shadow-xl
            hover:bg-amber-50 transform transition-all duration-300
            ${isHovered ? 'scale-110 rotate-3' : ''}
            border-2 border-amber-500/30
          `}
          aria-label="إعدادات الملف الشخصي"
        >
          {userSettings?.nickname ? (
            <div className="w-11 h-11 rounded-md overflow-hidden flex items-center justify-center bg-amber-100 border border-amber-200">
              {/* إذا كان لديه صورة شخصية من الأفاتارات المتاحة */}
              {userSettings.avatarId ? (
                <img 
                  src={getUserAvatarSrc(userSettings.avatarId)}
                  alt={`صورة ${userSettings.nickname}`}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <span className="text-2xl font-bold text-amber-800">
                  {getUserInitial(userSettings.nickname)}
                </span>
              )}
            </div>
          ) : (
            <div className="w-11 h-11 rounded-md flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </button>
        
        {/* تلميح يظهر عند تحريك الماوس فوق الزر */}
        <div 
          className={`
            absolute left-16 top-3 px-3 py-2 bg-black/80 text-white text-sm rounded-lg
            transform transition-all duration-300 pointer-events-none
            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
          `}
        >
          {userSettings?.nickname 
            ? `مرحباً ${userSettings.nickname}` 
            : 'إعدادات الملف الشخصي'}
        </div>
      </div>
      
      {/* مكون إعدادات المستخدم */}
      <UserSettings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default ProfileButton;
