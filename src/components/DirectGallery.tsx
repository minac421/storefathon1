"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const DirectGallery = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagesError, setImagesError] = useState<Record<string, boolean>>({});
  
  // قائمة الصور الفعلية المتوفرة في المجلد
  const galleryImages = [
    // استخدام أسماء الملفات الفعلية من مجلد المعرض
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.50.01 PM (4).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.50.01 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.50.01 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.50.01 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.50.01 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.50.00 PM (5).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.50.00 PM (4).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.50.00 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.50.00 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.50.00 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.50.00 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.59 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.59 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.59 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.59 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.58 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.58 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.58 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.58 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.57 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.57 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.57 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.57 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.56 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.56 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.56 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.55 PM (4).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.55 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.55 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.55 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.55 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.54 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.54 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.54 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.54 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.53 PM (5).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.53 PM (4).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.53 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.53 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.53 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.53 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.52 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.52 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.52 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.51 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.51 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.51 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.50 PM (4).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.50 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.50 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.50 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.50 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.49 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.49 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.49 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.49 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.48 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.48 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.47 PM (4).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.47 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.47 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.47 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.47 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.46 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.46 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.46 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.46 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.45 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.45 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.44 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.44 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.43 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.43 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.42 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.41 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.41 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.40 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.40 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.40 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.39 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.38 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.37 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.36 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.36 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.36 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.36 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.35 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.35 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.35 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.33 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.33 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.33 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.32 PM (3).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.32 PM (2).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.32 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.32 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.31 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.30 PM (1).jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.30 PM.jpeg',
    '/images/gallery/WhatsApp Image 2025-05-29 at 5.49.29 PM.jpeg'
  ];
  
  // صورة خطأ افتراضية
  const errorImage = '/images/image-error.svg';
  
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

  const renderGalleryRow = (images: string[], rowIndex: number, reverse: boolean = false, speed: 'fast' | 'medium' | 'slow' | 'very-slow' = 'medium') => {
    const animationClass = reverse 
      ? `animate-scroll-x-reverse-${speed}` 
      : `animate-scroll-x-${speed}`;
    
    return (
      <div className="overflow-hidden mb-1">
        <div className={`flex gap-1 hover:pause-animation ${loaded ? animationClass : 'opacity-0'}`}>
          {images.map((src, index) => (
            <div 
              key={`grid${rowIndex}-${index}`} 
              className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
              onClick={() => !imagesError[src] && openFullImage(src)}
            >
              <Image
                src={imagesError[src] ? errorImage : src}
                alt={`صورة ${index + 1}`}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority={rowIndex === 1 && index < 5}
                onError={() => handleImageError(src)}
                unoptimized
              />
            </div>
          ))}
          {/* تكرار الصور للتمرير المستمر */}
          {images.map((src, index) => (
            <div 
              key={`grid${rowIndex}-dup-${index}`} 
              className="flex-shrink-0 w-32 h-32 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:z-10 relative cursor-pointer"
              onClick={() => !imagesError[src] && openFullImage(src)}
            >
              <Image
                src={imagesError[src] ? errorImage : src}
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
    );
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
        {/* صفوف المعرض */}
        {renderGalleryRow(galleryImages.slice(0, 15), 1, false, 'fast')}
        {renderGalleryRow(galleryImages.slice(15, 30), 2, true, 'fast')}
        {renderGalleryRow(galleryImages.slice(30, 45), 3, false, 'medium')}
        {renderGalleryRow(galleryImages.slice(45, 60), 4, true, 'medium')}
        {renderGalleryRow(galleryImages.slice(60, 75), 5, false, 'slow')}
        {renderGalleryRow(galleryImages.slice(75, galleryImages.length), 6, true, 'slow')}
      </div>
    </div>
  );
};

export default DirectGallery; 