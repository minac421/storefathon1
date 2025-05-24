"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BlogCategory } from '@/types/blog';
import PostCard from '../components/PostCard';

// تصنيفات المحتوى الأكثر تفاعلاً
enum TrendingType {
  POPULAR = 'popular',
  COMMENTS = 'comments',
  RECENT = 'recent',
  FEATURED = 'featured',
}

// ترجمة تصنيفات المحتوى
const trendingTranslations: Record<string, string> = {
  [TrendingType.POPULAR]: 'الأكثر شعبية',
  [TrendingType.COMMENTS]: 'الأكثر تعليقات',
  [TrendingType.RECENT]: 'أحدث المنشورات',
  [TrendingType.FEATURED]: 'منشورات مميزة',
};

// واجهة البيانات للمقال
interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  featuredImage?: string;
  author: {
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  comments: any[];
  interaction: {
    likes: string[];
    shares: number;
    views: number;
  };
  createdAt: string;
  isPublished: boolean;
  isFeatured?: boolean;
}

// مكون المحتوى الرئيسي
function TrendingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') || TrendingType.POPULAR;
  
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string>(typeParam);
  const [timeRange, setTimeRange] = useState<string>('week');

  // تحميل المقالات المتفاعل معها
  useEffect(() => {
    if (typeParam !== activeType) {
      setActiveType(typeParam);
    }
    
    const loadTrendingPosts = async () => {
      try {
        setIsLoading(true);
        
        let url = `/api/blog?sort=${activeType}&timeRange=${timeRange}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`خطأ في الاتصال: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error('خطأ في تحميل المقالات الأكثر تفاعلاً:', err);
        setError('حدث خطأ أثناء تحميل المقالات. يرجى المحاولة مرة أخرى.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTrendingPosts();
  }, [activeType, timeRange, typeParam]);
  
  // تغيير نوع العرض (الأكثر شعبية، الأكثر تعليقات، إلخ)
  const handleTypeChange = (type: string) => {
    setActiveType(type);
    
    // تحديث عنوان URL
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', type);
    router.push(`/blog/trending?${params.toString()}`);
  };
  
  // تغيير الإطار الزمني (يومي، أسبوعي، شهري، إلخ)
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };
  
  return (
    <main className="min-h-screen">
      {/* رأس الصفحة */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">المحتوى الأكثر تفاعلاً</h1>
          <p className="text-lg text-center mb-8">اكتشف أفضل المحتوى وأكثره تفاعلاً من مجتمع الفاتحون</p>
          
          {/* تصفية حسب نوع التفاعل */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mt-8">
            {Object.entries(TrendingType).map(([key, value]) => (
              <button
                key={value}
                onClick={() => handleTypeChange(value)}
                className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                  activeType === value 
                    ? 'bg-white text-blue-700 shadow-md' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {trendingTranslations[value]}
              </button>
            ))}
          </div>
          
          {/* اختيار الإطار الزمني */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex rounded-md shadow-sm bg-white/10 p-1">
              <button
                onClick={() => handleTimeRangeChange('day')}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  timeRange === 'day' ? 'bg-white text-blue-700' : 'text-white hover:bg-white/10'
                }`}
              >
                اليوم
              </button>
              <button
                onClick={() => handleTimeRangeChange('week')}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  timeRange === 'week' ? 'bg-white text-blue-700' : 'text-white hover:bg-white/10'
                }`}
              >
                هذا الأسبوع
              </button>
              <button
                onClick={() => handleTimeRangeChange('month')}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  timeRange === 'month' ? 'bg-white text-blue-700' : 'text-white hover:bg-white/10'
                }`}
              >
                هذا الشهر
              </button>
              <button
                onClick={() => handleTimeRangeChange('all')}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  timeRange === 'all' ? 'bg-white text-blue-700' : 'text-white hover:bg-white/10'
                }`}
              >
                كل الوقت
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* محتوى الصفحة */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          // حالة التحميل
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75"></div>
          </div>
        ) : error ? (
          // عرض رسالة خطأ
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <p>{error}</p>
          </div>
        ) : posts.length === 0 ? (
          // عرض رسالة لا توجد مقالات
          <div className="text-center py-12 max-w-2xl mx-auto">
            <div className="bg-blue-50 rounded-lg p-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-900">لا توجد منشورات متاحة</h3>
              <p className="text-gray-600 mt-2">لم نجد أي محتوى في هذه الفئة للإطار الزمني المحدد</p>
              <div className="mt-6">
                <Link href="/blog/submit" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  إضافة منشور جديد
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* ترويسة القسم النشط */}
            <div className="mb-8">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {trendingTranslations[activeType]}
                  {timeRange === 'day' && ' اليوم'}
                  {timeRange === 'week' && ' هذا الأسبوع'}
                  {timeRange === 'month' && ' هذا الشهر'}
                </h2>
              </div>
              
              {/* قائمة المنشورات الأكثر تفاعلاً */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div key={post.id} className="flex flex-col h-full">
                    <PostCard
                      id={post.id}
                      slug={post.slug}
                      title={post.title}
                      summary={post.summary}
                      category={post.category as BlogCategory}
                      featuredImage={post.featuredImage}
                      author={{
                        name: post.author?.name || 'فريق الفاتحون',
                        avatar: post.author?.avatar
                      }}
                      createdAt={post.createdAt}
                      commentsCount={post.comments?.length || 0}
                      likesCount={post.interaction?.likes?.length || 0}
                      isLiked={post.interaction?.likes?.includes('currentUserId') || false}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* رابط العودة للمدونة الرئيسية */}
            <div className="text-center mt-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                العودة للمدونة
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// مكون الصفحة الرئيسي
export default function TrendingPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-8 text-center">جاري التحميل...</div>}>
      <TrendingContent />
    </Suspense>
  );
}
