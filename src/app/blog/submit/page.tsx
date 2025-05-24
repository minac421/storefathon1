"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUserSettings, getUserAvatarSrc } from '@/utils/userSettings';

// تعريف فئات المنشور المتاحة
enum PostCategory {
  GUIDE = 'guide', // أدلة اللاعبين
  NEWS = 'news', // أخبار اللعبة
  TIPS = 'tips', // نصائح وحيل
  ANALYSIS = 'analysis', // تحليلات وتقييمات
  MARKET = 'market', // أخبار السوق
  MEMES = 'memes', // ميمز وطرائف
  EXPERIENCE = 'experience', // تجارب اللاعبين
}

// ترجمة الفئات للعربية
const categoryTranslations: Record<string, string> = {
  [PostCategory.GUIDE]: 'دليل اللاعبين',
  [PostCategory.NEWS]: 'أخبار اللعبة',
  [PostCategory.TIPS]: 'نصائح وحيل',
  [PostCategory.ANALYSIS]: 'تحليلات وتقييمات',
  [PostCategory.MARKET]: 'أخبار السوق',
  [PostCategory.MEMES]: 'ميمز وطرائف',
  [PostCategory.EXPERIENCE]: 'تجارب اللاعبين',
};

// أيقونات للفئات
const categoryIcons: Record<string, React.ReactNode> = {
  [PostCategory.GUIDE]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  [PostCategory.NEWS]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  ),
  [PostCategory.TIPS]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  [PostCategory.ANALYSIS]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  [PostCategory.MARKET]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  [PostCategory.MEMES]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  [PostCategory.EXPERIENCE]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

export default function PostPage() {
  const router = useRouter();
  
  // حالة النموذج
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // مراجع للمدخلات
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  // إضافة حالة لإعدادات المستخدم
  const [userSettings, setUserSettings] = useState<{nickname: string, avatarId: number} | null>(null);
  
  // استدعاء إعدادات المستخدم عند تحميل الصفحة
  useEffect(() => {
    const settings = getUserSettings();
    if (settings) {
      setUserSettings(settings);
    }
  }, []);
  
  // معالجة تحميل الصور
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // معالجة تحميل الفيديو
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setVideoPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // حذف الصورة
  const removeImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };
  
  // حذف الفيديو
  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreviewUrl(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };
  
  // تبديل قائمة الفئات
  const toggleCategoryMenu = () => {
    setCategoryMenuOpen(!categoryMenuOpen);
  };
  
  // اختيار فئة
  const selectCategory = (selectedCategory: PostCategory) => {
    setCategory(selectedCategory.toString());
    setCategoryMenuOpen(false);
  };
  
  // إرسال المنشور
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('يرجى كتابة محتوى للمنشور');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // تحضير البيانات للإرسال
      let response;
      
      // في حالة وجود ملفات، نستخدم FormData
      if (imageFile || videoFile) {
        const formData = new FormData();
        formData.append('content', content);
        if (title) formData.append('title', title);
        if (category) formData.append('category', category);
        if (imageFile) formData.append('image', imageFile);
        if (videoFile) formData.append('video', videoFile);
        
        // إضافة بيانات المؤلف من إعدادات المستخدم
        formData.append('authorName', userSettings?.nickname || 'مستخدم جديد');
        formData.append('authorAvatar', userSettings ? getUserAvatarSrc(userSettings.avatarId) : '/images/avatars/default.png');
        
        // إرسال البيانات إلى الخادم
        response = await fetch('/api/blog', {
          method: 'POST',
          body: formData,
        });
      } else {
        // إذا لم يكن هناك ملفات، نرسل البيانات كـ JSON
        const postData = {
          content,
          title: title || '',
          category: category || null,
          summary: content.substring(0, 150) + (content.length > 150 ? '...' : ''),
          author: {
            name: userSettings?.nickname || 'مستخدم جديد',
            avatar: userSettings ? getUserAvatarSrc(userSettings.avatarId) : '/images/avatars/default.png',
            isVerified: false
          }
        };
        
        // إرسال البيانات إلى الخادم
        response = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
      }
      
      if (!response.ok) {
        throw new Error('فشل في نشر المنشور');
      }
      
      // التعامل مع الاستجابة الناجحة
      setSuccess(true);
      setTimeout(() => {
        router.push('/blog');
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-cover bg-center" style={{
      backgroundImage: `url('/images/bg238.jpg')`,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backgroundBlendMode: 'overlay',
    }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        {/* رأس الصفحة */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">إنشاء منشور جديد</h1>
          <p className="mt-2 text-sm text-gray-200">
            شارك منشوراً أو مقالاً جديداً مع مجتمع كونكيرورز
          </p>
        </div>
        
        {success ? (
          // رسالة نجاح
          <div className="rounded-md bg-green-50 p-4 text-center">
            <div className="flex justify-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mr-3">
                <p className="text-sm font-medium text-green-800">
                  تم نشر المنشور بنجاح! جارٍ تحويلك...
                </p>
              </div>
            </div>
          </div>
        ) : (
          // نموذج المنشور
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* رسالة الخطأ */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* عنوان المنشور (اختياري) */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  عنوان المنشور (اختياري)
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 text-right shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
                  placeholder="أدخل عنواناً لمنشورك (اختياري)"
                />
              </div>
              
              {/* اختيار الفئة */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  فئة المنشور (اختياري)
                </label>
                <div className="mt-1 relative">
                  <button
                    type="button"
                    onClick={toggleCategoryMenu}
                    className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-3 text-right cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <span className="flex items-center">
                      {category && (
                        <>
                          <span className="ml-2 block truncate">
                            {categoryIcons[category as PostCategory]}
                          </span>
                          <span>{categoryTranslations[category as PostCategory]}</span>
                        </>
                      )}
                    </span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                  
                  {categoryMenuOpen && (
                    <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
                      <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {Object.values(PostCategory).map((catValue) => (
                          <li
                            key={catValue}
                            onClick={() => selectCategory(catValue as PostCategory)}
                            className="flex items-center text-gray-900 cursor-pointer select-none relative py-2 px-3 hover:bg-amber-50"
                          >
                            <span className="ml-3 block font-normal truncate">
                              {categoryIcons[catValue as PostCategory]}
                            </span>
                            <span>{categoryTranslations[catValue as PostCategory]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              {/* محتوى المنشور */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  محتوى المنشور
                </label>
                <textarea
                  id="content"
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="اكتب منشورك هنا..."
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 text-right shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
                  required
                ></textarea>
              </div>
              
              {/* قسم الوسائط */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* تحميل الصورة */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    صورة للمنشور (اختياري)
                  </label>
                  <div className="border-2 border-gray-300 border-dashed rounded-md p-4">
                    {!imagePreviewUrl ? (
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <label htmlFor="image-upload" className="mt-2 cursor-pointer text-amber-600 hover:text-amber-500 block">
                          <span className="mt-2 text-sm">اضغط لتحميل صورة</span>
                          <input
                            id="image-upload"
                            ref={imageInputRef}
                            onChange={handleImageUpload}
                            type="file"
                            accept="image/*"
                            className="sr-only"
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <img 
                          src={imagePreviewUrl} 
                          alt="معاينة الصورة" 
                          className="h-48 w-full object-contain rounded-md" 
                        />
                        <button 
                          type="button" 
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none shadow-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* تحميل الفيديو */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    فيديو للمنشور (اختياري)
                  </label>
                  <div className="border-2 border-gray-300 border-dashed rounded-md p-4">
                    {!videoPreviewUrl ? (
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <label htmlFor="video-upload" className="mt-2 cursor-pointer text-amber-600 hover:text-amber-500 block">
                          <span className="mt-2 text-sm">اضغط لتحميل فيديو</span>
                          <input
                            id="video-upload"
                            ref={videoInputRef}
                            onChange={handleVideoUpload}
                            type="file"
                            accept="video/*"
                            className="sr-only"
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <video 
                          src={videoPreviewUrl} 
                          controls 
                          className="max-h-48 w-full rounded-md" 
                        />
                        <button 
                          type="button" 
                          onClick={removeVideo}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none shadow-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* زر النشر */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2.5 bg-amber-600 text-white rounded-md font-bold shadow-md transition-all ${
                    isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-amber-700 hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري النشر...
                    </span>
                  ) : (
                    'نشر'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
