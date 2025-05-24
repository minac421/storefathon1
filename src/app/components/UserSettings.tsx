import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AVAILABLE_AVATARS, saveUserSettings, getUserSettings } from '@/utils/userSettings';

interface UserSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (settings: { nickname: string; avatarId: number }) => void;
}

const UserSettings: React.FC<UserSettingsProps> = ({ isOpen, onClose, onSave }) => {
  const [nickname, setNickname] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState<number>(8);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // تحميل الإعدادات المحفوظة إن وجدت
  useEffect(() => {
    const savedSettings = getUserSettings();
    if (savedSettings) {
      setNickname(savedSettings.nickname || '');
      setSelectedAvatarId(savedSettings.avatarId || 1);
    }
  }, [isOpen]); // إعادة تحميل الإعدادات عند فتح النافذة
  
  // إغلاق النافذة عند الضغط على Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  const handleSave = async () => {
    if (!nickname.trim()) {
      setMessage({ type: 'error', text: 'الرجاء إدخال اسم مستعار' });
      return;
    }
    
    try {
      // حفظ في localStorage للعمل في وضع عدم الاتصال
      saveUserSettings(nickname, selectedAvatarId);
      
      // حفظ على الخادم باستخدام API
      const response = await fetch('/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, avatarId: selectedAvatarId })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'فشل حفظ الإعدادات');
      }
      
      // استدعاء دالة الحفظ الخارجية إن وجدت
      if (onSave) {
        onSave({ nickname, avatarId: selectedAvatarId });
      }
      
      setMessage({ type: 'success', text: 'تم حفظ الإعدادات بنجاح!' });
      
      // إغلاق النافذة بعد فترة قصيرة
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'حدث خطأ أثناء حفظ الإعدادات' });
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-start" 
      onClick={onClose}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(5px)',
        animation: isOpen ? 'fadeIn 0.3s ease-out forwards' : 'none'
      }}
    >
      <div 
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 mr-auto ml-4 mt-20 p-4 overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isOpen ? 'slideInLeft 0.4s ease-out forwards' : 'none',
          transformOrigin: 'top left'
        }}
      >
        {/* شريط مزخرف في الأعلى */}
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
        
        {/* زر الإغلاق */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-amber-500 dark:hover:text-amber-500 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* إضافة CSS للتأثيرات الحركية */}
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideInLeft {
            from { 
              transform: translateX(-100px); 
              opacity: 0;
            }
            to { 
              transform: translateX(0); 
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}</style>
        
        <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-white pl-6">إعدادات الملف الشخصي</h2>
        
        {message && (
          <div className={`mb-3 p-2 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}
        
        <div className="mb-3">
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            الاسم المستعار
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="أدخل اسمك المستعار"
          />
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            اختر صورة شخصية
          </label>
          
          <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
            {AVAILABLE_AVATARS.map((avatar) => (
              <div 
                key={avatar.id}
                onClick={() => setSelectedAvatarId(avatar.id)}
                className={`relative cursor-pointer p-1 rounded-lg border-2 ${selectedAvatarId === avatar.id ? 'border-amber-500 bg-amber-50 dark:bg-amber-900' : 'border-gray-200 dark:border-gray-700'}`}
              >
                <div className="relative w-full h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded overflow-hidden">
                  {/* صورة الأفاتار من لعبة الفاتحون */}
                  <img 
                    src={avatar.src} 
                    alt={avatar.alt}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          className="w-full py-2 px-4 rounded-md text-white font-medium bg-amber-500 hover:bg-amber-600 transition-colors"
        >
          حفظ الإعدادات
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
