"use client";

import React from 'react';

interface CastleVideoButtonProps {
  videoUrl?: string;
  castleName: string;
  onShowVideo: (url: string, title: string) => void;
}

/**
 * زر لفتح رابط فيديو القلعة مباشرة
 */
const CastleVideoButton: React.FC<CastleVideoButtonProps> = ({ 
  videoUrl, 
  castleName
}) => {
  
  const handleClick = () => {
    // فتح الرابط المدخل مباشرة بدون أي منطق إضافي
    if (videoUrl && videoUrl.trim() !== '') {
      console.log('فتح رابط فيديو:', videoUrl);
      window.open(videoUrl, '_blank');
      return;
    }
    
    // إذا لم يكن هناك رابط، أظهر رسالة تنبيه
    alert('لم يتم تحديد رابط فيديو لهذه القلعة');
  };

  return (
    <button 
      onClick={handleClick}
      className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:scale-110"
      aria-label="عرض فيديو القلعة"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
  );
};

export default CastleVideoButton;
