"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ImageGallery = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagesError, setImagesError] = useState<Record<string, boolean>>({});
  
  // جمع كل الصور من مجلد gallery بدون اعتماد تنسيق اسم محدد
  // استخدام قائمة ثابتة للصور المتوفرة في المجلد
  const imageFiles = Array.from({ length: 80 }, (_, i) => i + 1).map(i => `/images/gallery/WhatsApp Image 2025-05-29 at 5.49.${29 + Math.floor(i/4)%32} PM${i%4 > 0 ? ` (${i%4})` : ''}.jpeg`);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // فتح الصورة بالحجم الكامل عند النقر عليها
  const openFullImage = (src: string) => {
    setSelectedImage(src);
    // منع التمرير في الصفحة الخلفية عند فتح الصورة
    document.body.style.overflow = 'hidden';
  };
  
  // إغلاق الصورة المكبرة
  const closeFullImage = () => {
    setSelectedImage(null);
    // استعادة التمرير عند إغلاق الصورة
    document.body.style.overflow = 'auto';
  };

  // معالجة خطأ تحميل الصورة
  const handleImageError = (src: string) => {
    setImagesError(prev => ({ ...prev, [src]: true }));
  };

  return (
    <div className="min-h-screen bg-black py-6">
      {/* نافذة الصورة المكبرة */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeFullImage}
        >
          <div className="relative max-w-full max-h-full">
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
              onClick={closeFullImage}
              aria-label="إغلاق"
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="صورة مكبرة"
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto object-contain"
              onError={() => handleImageError(selectedImage)}
              unoptimized
            />
          </div>
        </div>
      )}

      <div className="max-w-[95%] mx-auto">
        {/* صف أول - شبكة مربعات صغيرة */}
        <div className="overflow-hidden mb-1">
          <div className={`flex gap-1 hover:pause-animation ${loaded ? 'animate-scroll-x-fast' : 'opacity-0'}`}>
            {imageFiles.slice(0, 25).map((src, index) => (
              <div 
                key={`grid1-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة ${index + 1}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority={index < 5}
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
            {imageFiles.slice(0, 25).map((src, index) => (
              <div 
                key={`grid1-dup-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة ${index + 1}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* صف ثاني - شبكة مربعات صغيرة */}
        <div className="overflow-hidden mb-1">
          <div className={`flex gap-1 hover:pause-animation ${loaded ? 'animate-scroll-x-reverse-fast' : 'opacity-0'}`}>
            {imageFiles.slice(25, 50).map((src, index) => (
              <div 
                key={`grid2-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة ${index + 26}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
            {imageFiles.slice(25, 50).map((src, index) => (
              <div 
                key={`grid2-dup-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة ${index + 26}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* صف ثالث - شبكة مربعات صغيرة */}
        <div className="overflow-hidden mb-1">
          <div className={`flex gap-1 hover:pause-animation ${loaded ? 'animate-scroll-x-medium' : 'opacity-0'}`}>
            {imageFiles.slice(50, 75).map((src, index) => (
              <div 
                key={`grid3-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة ${index + 51}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
            {imageFiles.slice(50, 75).map((src, index) => (
              <div 
                key={`grid3-dup-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة ${index + 51}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* صف رابع - شبكة مربعات صغيرة */}
        <div className="overflow-hidden mb-1">
          <div className={`flex gap-1 hover:pause-animation ${loaded ? 'animate-scroll-x-reverse-medium' : 'opacity-0'}`}>
            {imageFiles.slice(75, imageFiles.length).map((src, index) => (
              <div 
                key={`grid4-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة ${index + 76}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
            {imageFiles.slice(75, imageFiles.length).map((src, index) => (
              <div 
                key={`grid4-dup-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة ${index + 76}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* صفوف إضافية من الصور المربعة الصغيرة */}
        <div className="overflow-hidden mb-1">
          <div className={`flex gap-1 hover:pause-animation ${loaded ? 'animate-scroll-x-slow' : 'opacity-0'}`}>
            {imageFiles.slice(0, 25).map((src, index) => (
              <div 
                key={`grid5-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة إضافية ${index + 1}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
            {imageFiles.slice(0, 25).map((src, index) => (
              <div 
                key={`grid5-dup-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة إضافية ${index + 1}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="overflow-hidden mb-1">
          <div className={`flex gap-1 hover:pause-animation ${loaded ? 'animate-scroll-x-reverse-slow' : 'opacity-0'}`}>
            {imageFiles.slice(25, 50).map((src, index) => (
              <div 
                key={`grid6-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة إضافية ${index + 26}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
            {imageFiles.slice(25, 50).map((src, index) => (
              <div 
                key={`grid6-dup-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة إضافية ${index + 26}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="overflow-hidden">
          <div className={`flex gap-1 hover:pause-animation ${loaded ? 'animate-scroll-x-very-slow' : 'opacity-0'}`}>
            {imageFiles.slice(50, 75).map((src, index) => (
              <div 
                key={`grid7-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة إضافية ${index + 51}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
            {imageFiles.slice(50, 75).map((src, index) => (
              <div 
                key={`grid7-dup-${index}`} 
                className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
                onClick={() => !imagesError[src] && openFullImage(src)}
              >
                <Image
                  src={imagesError[src] ? '/images/image-error.png' : src}
                  alt={`صورة إضافية ${index + 51}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(src)}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;