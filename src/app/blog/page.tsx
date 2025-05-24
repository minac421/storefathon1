"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogCategory } from '@/types/blog';
import PostCard from './components/PostCard';
import { getUserSettings } from '@/utils/userSettings';
import ScrollToTop from '@/components/ui/ScrollToTop';

// ترجمة فئات المقالات لعرضها بالعربية
export const categoryTranslations: Record<string, string> = {
  [BlogCategory.GUIDE]: 'دليل اللاعبين',
  [BlogCategory.NEWS]: 'أخبار اللعبة',
  [BlogCategory.TIPS]: 'نصائح وحيل',
  [BlogCategory.ANALYSIS]: 'تحليلات وتقييمات',
  [BlogCategory.MARKET]: 'أخبار السوق',
  [BlogCategory.MEMES]: 'ميمز وطرائف',
  [BlogCategory.EXPERIENCE]: 'تجارب اللاعبين',
};

// ألوان فئات المقالات
export const categoryColors: Record<string, string> = {
  [BlogCategory.GUIDE]: 'bg-blue-600',
  [BlogCategory.NEWS]: 'bg-amber-600',
  [BlogCategory.TIPS]: 'bg-green-600',
  [BlogCategory.ANALYSIS]: 'bg-purple-600',
  [BlogCategory.MARKET]: 'bg-teal-600',
  [BlogCategory.MEMES]: 'bg-pink-600',
  [BlogCategory.EXPERIENCE]: 'bg-cyan-700',
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
}

// واجهة ترقيم الصفحات
interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort') || 'recent';
  
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [activeSort, setActiveSort] = useState<string>(sortParam);
  const [visible, setVisible] = useState(6); // عدد المقالات المعروضة مبدئياً
  const [userSettings, setUserSettings] = useState(null);
  
  // للتحقق من الرؤية عند التمرير
  const [scrollY, setScrollY] = useState(0);
  
  // تأثير لرصد موضع التمرير
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // إضافة مستمع للتمرير
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // إزالة المستمع عند فك المكون
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // جلب بيانات المستخدم المحلية
  useEffect(() => {
    setUserSettings(getUserSettings());
  }, []);
  
  // تحميل المقالات من API
  useEffect(() => {
    if (categoryParam && categoryParam !== activeCategory) {
      setActiveCategory(categoryParam);
    }
    
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        setError(null); // مسح الأخطاء السابقة
        
        let url = `/api/blog?page=${pagination.page}&limit=${pagination.limit}&sort=${activeSort}`;
        if (activeCategory) {
          url += `&category=${activeCategory}`;
        }
        
        console.log('Fetching posts from:', url);
        
        // استخدام AbortController للتحكم في طلب الشبكة
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // إلغاء الطلب بعد 15 ثانية
        
        const response = await fetch(url, {
          signal: controller.signal,
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
          },
        }).catch(error => {
          if (error.name === 'AbortError') {
            console.warn('تم إلغاء طلب تحميل المنشورات بسبب تجاوز المهلة');
            throw new Error('تم تجاوز مهلة تحميل المنشورات');
          }
          throw error;
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorText = await response.text().catch(() => 'خطأ غير معروف');
          console.error('API Error Response:', response.status, errorText);
          
          // تحليل رسالة الخطأ حسب رمز الحالة
          if (response.status === 404) {
            throw new Error('المنشورات غير موجودة');
          } else if (response.status === 500) {
            throw new Error('خطأ في خادم قاعدة البيانات. الرجاء المحاولة مرة أخرى لاحقًا.');
          } else {
            throw new Error(`خطأ في الاتصال: ${response.status} - ${errorText}`);
          }
        }
        
        const data = await response.json().catch(err => {
          console.error('Error parsing JSON response:', err);
          throw new Error('تعذر تحليل استجابة الخادم. الرجاء المحاولة مرة أخرى.');
        });
        
        if (!data || !data.posts) {
          console.error('Invalid API response format:', data);
          throw new Error('تنسيق استجابة API غير صالح');
        }
        
        setPosts(data.posts || []);
        setPagination(data.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 });
      } catch (err) {
        console.error('خطأ في تحميل المقالات:', err);
        
        // رسالة خطأ صديقة للمستخدم
        const errorMessage = err instanceof Error ? err.message : 'حدث خطأ أثناء تحميل المقالات';
        setError(`${errorMessage}. يمكنك تحديث الصفحة للمحاولة مرة أخرى.`);
        
        // عرض محتوى سابق (إن وجد) بدلاً من التحميل
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPosts();
  }, [pagination.page, pagination.limit, activeCategory, activeSort, categoryParam]);
  
  // تغيير الصفحة الحالية
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };
  
  // تصفية المقالات حسب الفئة
  const filterByCategory = (category: string | null) => {
    setActiveCategory(category);
    setPagination(prev => ({ ...prev, page: 1 }));
    
    // تحديث عنوان URL
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    router.push(`/blog?${params.toString()}`);
  };
  
  // تغيير ترتيب المقالات
  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
    
    // تحديث عنوان URL
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    router.push(`/blog?${params.toString()}`);
  };

  // الإعجاب بمقال
  const handleLike = async (postId: string) => {
    try {
      // هنا يمكن إضافة طلب API للإعجاب
      console.log('Liked post:', postId);
      
      // تحديث حالة الإعجاب محليًا (في تطبيق حقيقي، هذا سيكون استجابة للطلب)
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            const userLiked = post.interaction.likes.includes('currentUserId');
            
            return {
              ...post,
              interaction: {
                ...post.interaction,
                likes: userLiked
                  ? post.interaction.likes.filter(id => id !== 'currentUserId')
                  : [...post.interaction.likes, 'currentUserId']
              }
            };
          }
          return post;
        })
      );
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };
  
  // مشاركة المقال
  const handleShare = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: `/blog/${post.slug}`
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // نسخ الرابط إلى الحافظة
      navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`)
        .then(() => alert('تم نسخ الرابط!'))
        .catch(err => console.error('Error copying link:', err));
    }
  };

  // تحميل المزيد من المقالات
  const loadMore = () => {
    setVisible(prevVisible => prevVisible + 6);
  };

  // تصفية المقالات حسب الفئة
  const filteredPosts = activeCategory === null
    ? posts
    : posts.filter(post => post.category === activeCategory);

  // عرض رسالة التحميل
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mb-4"></div>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">جاري تحميل المقالات...</h2>
        </div>
      </div>
    );
  }

  // عرض رسالة الخطأ
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">حدث خطأ في تحميل المقالات</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-block px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* رأس المدونة */}
      <div className="relative text-white py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/bg243.jpg" 
            alt="خلفية الفاتحون" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 lg:px-0 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fadeIn">
              مدونة الفاتحون
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 animate-fadeUp" style={{ animationDelay: '0.2s' }}>
              نافذتك للتاريخ والبطولات، قصص البطولات والفتوحات، والعبر المستفادة
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-4 animate-fadeUp" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={() => filterByCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === null 
                    ? 'bg-amber-600 text-white shadow-md' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                جميع المقالات
              </button>
              {Object.entries(BlogCategory).map(([key, value]) => (
                <button
                  key={`category-${value}`}
                  onClick={() => filterByCategory(value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === value 
                      ? 'bg-amber-600 text-white shadow-md' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {categoryTranslations[value as string] || value}
                </button>
              ))}
            </div>
            <div className="relative max-w-lg mx-auto animate-fadeUp" style={{ animationDelay: '0.6s' }}>
              <Link 
                href="/blog/submit" 
                className="w-full px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">انشر مقالاً جديداً</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,170.7C672,160,768,160,864,170.7C960,181,1056,203,1152,202.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* قسم المقالات */}
      <div id="posts-section" className="container mx-auto px-4 lg:px-0 py-8 mb-12">
        {/* عنوان القسم */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
            {activeCategory === null ? 'أحدث المقالات' : 
              activeCategory === BlogCategory.NEWS ? 'أخبار الفاتحون' :
              activeCategory === BlogCategory.GUIDE ? 'أدلة وإرشادات' : 'نصائح وتلميحات'
            }
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-2"></div>
        </div>
        
        {/* عرض المقالات في شبكة */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
            {filteredPosts.slice(0, visible).map((post, index) => (
              <div 
                key={post.id || `post-${index}`} 
                className={`scroll-reveal ${scrollY > 100 ? 'active' : ''}`} 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PostCard 
                  id={post.id}
                  slug={post.slug}
                  title={post.title}
                  summary={post.summary}
                  category={post.category as BlogCategory}
                  featuredImage={post.featuredImage}
                  author={{
                    name: post.author?.name || 'مجهول',
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
        ) : (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-700 mb-2">لا توجد مقالات متاحة حالياً</h3>
            <p className="text-gray-500">لم نتمكن من العثور على مقالات تطابق هذا التصفية. جرب تصفية أخرى.</p>
            {activeCategory !== null && (
              <button 
                onClick={() => filterByCategory(null)}
                className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                عرض جميع المقالات
              </button>
            )}
          </div>
        )}
        
        {/* زر تحميل المزيد */}
        {visible < filteredPosts.length && (
          <div className="text-center mt-10">
            <button 
              onClick={loadMore}
              className="px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors shadow-md inline-flex items-center gap-2"
            >
              <span>تحميل المزيد</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* قسم الاشتراك في النشرة البريدية */}
      <div className="bg-amber-500 text-white py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-2xl mx-auto text-center scroll-reveal" style={{ transitionDelay: '0.2s' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">اشترك في نشرتنا البريدية</h2>
            <p className="text-white/90 mb-6">احصل على أحدث المقالات والأخبار مباشرة إلى بريدك الإلكتروني</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="أدخل بريدك الإلكتروني" 
                className="flex-grow px-4 py-3 rounded-lg text-gray-800 border-0 focus:ring-2 focus:ring-amber-300"
              />
              <button className="px-6 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors whitespace-nowrap">
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* زر العودة للأعلى */}
      <ScrollToTop />
      
      {/* أنماط CSS لتأثيرات التمرير */}
      <style jsx>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        
        .scroll-reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fadeUp {
          animation: fadeUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
