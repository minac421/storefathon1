 "use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AVAILABLE_AVATARS, saveUserSettings, getUserSettings } from '../../../utils/userSettings';

export default function ProfilePage() {
  const [nickname, setNickname] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState<number>(1);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // تحميل الإعدادات السابقة إن وجدت
  useEffect(() => {
    const savedSettings = getUserSettings();
    if (savedSettings) {
      setNickname(savedSettings.nickname || '');
      setSelectedAvatarId(savedSettings.avatarId || 1);
    }
  }, []);
  
  const handleSave = async () => {
    if (!nickname.trim()) {
      setError('الرجاء إدخال اسم مستعار');
      setSuccessMessage('');
      return;
    }
    
    try {
      // يمكن إضافة طلب API هنا لحفظ الإعدادات على الخادم
      // const response = await fetch('/api/user/settings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ nickname, avatarId: selectedAvatarId })
      // });
      
      // if (!response.ok) throw new Error('فشل حفظ الإعدادات');
      
      // حفظ البيانات محليًا
      saveUserSettings(nickname, selectedAvatarId);
      
      setError('');
      setSuccessMessage('تم حفظ الإعدادات بنجاح!');
      
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('حدث خطأ أثناء حفظ الإعدادات، يرجى المحاولة مرة أخرى');
      setSuccessMessage('');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">إعدادات الملف الشخصي</h1>
          <p className="text-gray-600 dark:text-gray-400">
            قم بتخصيص ملفك الشخصي الذي سيظهر في التعليقات والتفاعلات
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
            {successMessage}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">الاسم المستعار</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="أدخل اسمًا مستعارًا..."
          />
          <p className="text-sm text-gray-500 mt-1">
            هذا الاسم سيظهر عندما تقوم بالتعليق أو التفاعل مع المنشورات
          </p>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">اختر صورة شخصية</label>
          <div className="grid grid-cols-4 gap-3">
            {AVAILABLE_AVATARS.map(avatar => (
              <div 
                key={avatar.id}
                onClick={() => setSelectedAvatarId(avatar.id)}
                className={`relative cursor-pointer p-1 rounded-lg border-2 ${
                  selectedAvatarId === avatar.id 
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="relative w-full h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded overflow-hidden">
                  <span className="text-2xl">{avatar.alt.substring(0, 1)}</span>
                </div>
                <p className="text-xs text-center mt-1 truncate">{avatar.alt}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            هذه الصورة ستظهر بجوار اسمك في التعليقات
          </p>
        </div>
        
        <div className="flex justify-between">
          <Link 
            href="/blog" 
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
          >
            العودة إلى المدونة
          </Link>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
          >
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
}
