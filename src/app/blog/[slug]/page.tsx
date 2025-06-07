"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ProfileButton from '@/app/components/ProfileButton';
import { getUserSettings, getUserAvatarSrc, getUserDisplayName } from '@/utils/userSettings';
import ReactionsBar from '@/components/blog/ReactionsBar';

// نموذج معلومات الكاتب
interface AuthorInfo {
  userId?: string;
  name: string;
  avatar?: string;
  isVerified?: boolean;
}

// نموذج التعليقات
interface Comment {
  _id?: string;
  content: string;
  author: AuthorInfo;
  createdAt: string;
  likes: string[];
  replies?: {
    _id?: string;
    content: string;
    author: AuthorInfo;
    createdAt: string;
    likes: string[];
  }[];
}

// نموذج المقال
interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  cover: string;
  author: AuthorInfo;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  comments: Comment[];
  interaction: {
    likes: string[];
    shares: number;
    views: number;
    reactions: {
      sword: string[];
      fire: string[];
      shield: string[];
      crown: string[];
      castle: string[];
      laugh: string[];
    };
  };
  featuredImage?: string;
}

export default function BlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug ? 
    (typeof params.slug === 'string' ? params.slug : String(params.slug)) : '';
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReactions, setShowReactions] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthorInfo | null>(null);
  const [commentText, setCommentText] = useState('');
  const [userProfile, setUserProfile] = useState<{name: string, avatar: string} | null>(null);
  
  // للتحقق من موضع التمرير
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // مراجع لأقسام المقال
  const articleRef = useRef<HTMLElement | null>(null);
  const commentsRef = useRef<HTMLDivElement | null>(null);
  
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  
  // تتبع موضع التمرير
  useEffect(() => {
    const handleScroll = () => {
      // حساب نسبة التمرير للمقال
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / totalHeight) * 100;
      setScrollProgress(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // التحقق من حالة تسجيل دخول المستخدم
  useEffect(() => {
    // هنا يمكن إضافة التحقق الفعلي من API لمعرفة حالة تسجيل الدخول
    const checkAuthStatus = async () => {
      try {
        // التحقق من وجود ملف شخصي عبر النظام الموحد
        const settings = getUserSettings();
        if (settings && settings.nickname) {
          setIsLoggedIn(true);
          setCurrentUser({
            name: settings.nickname,
            avatar: getUserAvatarSrc(settings.avatarId),
            isVerified: false
          });
        }
      } catch (err) {
        console.error('خطأ في التحقق من حالة تسجيل الدخول:', err);
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // استرجاع بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    // محاولة استرجاع بيانات المستخدم من النظام الموحد
    const settings = getUserSettings();
    if (settings) {
      setUserProfile({
        name: settings.nickname,
        avatar: getUserAvatarSrc(settings.avatarId)
      });
    }
  }, []);
  
  // التحقق من التفاعلات السابقة للمستخدم
  useEffect(() => {
    if (post && userProfile) {
      const username = userProfile.name;
      
      // التحقق من جميع أنواع التفاعلات
      if (post.interaction.reactions?.sword?.includes(username)) {
        setSelectedReaction('sword');
      } else if (post.interaction.reactions?.fire?.includes(username)) {
        setSelectedReaction('fire');
      } else if (post.interaction.reactions?.shield?.includes(username)) {
        setSelectedReaction('shield');
      } else if (post.interaction.reactions?.crown?.includes(username)) {
        setSelectedReaction('crown');
      } else if (post.interaction.reactions?.castle?.includes(username)) {
        setSelectedReaction('castle');
      } else if (post.interaction.reactions?.laugh?.includes(username)) {
        setSelectedReaction('laugh');
      }
    }
  }, [post, userProfile]);
  
  // استرجاع بيانات المقال عند تحميل الصفحة
  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`/api/blog?slug=${encodeURIComponent(String(slug))}`);
        
        if (!response.ok) {
          throw new Error('حدث خطأ أثناء تحميل المقال');
        }
        
        const data = await response.json();
        let postData;
        if (data && data.post) {
          postData = data.post;
        } else if (data && data.posts && data.posts.length > 0) {
          postData = data.posts[0];
        } else {
          throw new Error('المقال غير موجود');
        }
        
        // التأكد من وجود كائن التفاعلات
        if (!postData.interaction.reactions) {
          postData.interaction.reactions = {
            sword: [],
            fire: [],
            shield: [],
            crown: [],
            castle: [],
            laugh: []
          };
        }
        
        setPost(postData);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('حدث خطأ في تحميل المقال');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPost();
  }, [slug]);
  
  // التمرير لقسم التعليقات
  const scrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    try {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
    } catch (e) {
      return dateString;
    }
  };
  
  // معالجة المحتوى
  const renderContent = (content: string) => {
    return { __html: content };
  };
  
  // عرض رسالة التحميل
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mb-4"></div>
          <h2 className="text-xl font-bold text-gray-700">جاري تحميل المقال...</h2>
        </div>
      </div>
    );
  }
  
  // عرض رسالة خطأ
  if (error || !post) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'حدث خطأ غير متوقع'}</h2>
          <p className="text-gray-600 mb-6">يرجى المحاولة مرة أخرى لاحقًا أو العودة للصفحة الرئيسية.</p>
          <Link 
            href="/blog"
            className="inline-block px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
          >
            العودة للمدونة
          </Link>
        </div>
      </div>
    );
  }
  
  // إرسال التعليق
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      alert('يرجى كتابة تعليق');
      return;
    }
    
    // التحقق من وجود ملف شخصي
    const settings = getUserSettings();
    if (!settings || !settings.nickname) {
      // إظهار إشعار للمستخدم
      alert('الرجاء إعداد ملفك الشخصي أولاً باستخدام زر الملف الشخصي في الجانب');
      return;
    }
    
    try {
      // استخدام بيانات المستخدم من نظام الإعدادات الموحد
      const authorName = settings.nickname;
      const authorAvatar = getUserAvatarSrc(settings.avatarId);
      const userId = 'user-' + Date.now(); // استخدام معرف مؤقت بدون الاعتماد على uniqueId
      
      // إرسال التعليق إلى API
      const response = await fetch('/api/blog/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'comment',
        postId: post?._id,
          userId: userId,
          displayName: authorName,
          avatar: authorAvatar,
          content: commentText
        }),
      });
      
      if (!response.ok) {
        throw new Error('فشل في إضافة التعليق');
      }
      
      const data = await response.json();
      
      if (data.success && data.comment) {
        console.log('تم إرسال التعليق:', data.comment);
        
        // إضافة التعليق للمقال من البيانات المستلمة من الخادم
        const updatedComments = [...post.comments, data.comment as Comment];
        setPost({
          ...post,
          comments: updatedComments
        });
        
        // تفريغ حقل التعليق
      setCommentText('');
      
      // إظهار رسالة نجاح
      alert('تم إضافة التعليق بنجاح!');
      } else {
        throw new Error('لم يتم استلام بيانات التعليق من الخادم');
      }
      
    } catch (err) {
      console.error('خطأ في إرسال التعليق:', err);
      alert('حدث خطأ أثناء إرسال التعليق. يرجى المحاولة مرة أخرى.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950/90 via-amber-900/90 to-amber-800/90 text-white">
      {/* إضافة زر الملف الشخصي */}
      <ProfileButton />
      
      {/* شريط التقدم */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-amber-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      
      {/* رأس المقال */}
      <div className="relative text-white py-6 bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800 overflow-hidden">
        {/* أنماط خلفية مزخرفة */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-30"></div>
          <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-amber-500/20 via-transparent to-transparent"></div>
          <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-amber-300/20 via-transparent to-transparent"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          {post.cover && (
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover object-center opacity-15 mix-blend-overlay"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/95 to-amber-900/80"></div>
        </div>
        
        <div className="container mx-auto px-3 lg:px-0 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/blog"
              className="inline-flex items-center text-white/90 hover:text-white mb-3 transition-colors bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 hover:bg-white/15 hover:border-white/20 text-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>العودة إلى المدونة</span>
            </Link>
            
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="bg-amber-500/30 text-amber-100 px-2 py-0.5 rounded-full text-xs border border-amber-400/30 backdrop-blur-sm">
                  {post.category}
                </span>
                <span className="bg-amber-600/20 text-amber-100 px-2 py-0.5 rounded-full text-xs border border-amber-500/20 backdrop-blur-sm">
                  {formatDate(post.createdAt)}
                </span>
              </div>
              
              <h1 className="text-xl md:text-2xl font-bold mb-2 leading-tight text-amber-50 drop-shadow-sm">{post.title}</h1>
              
              <p className="text-amber-100/90 text-sm leading-relaxed">{post.summary}</p>
              
              <div className="flex items-center mt-3 bg-white/10 backdrop-blur-sm p-2 rounded-md border border-white/10 w-fit shadow-sm">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center mr-2 border border-amber-300 shadow-sm">
                  {post.author.avatar ? (
                    <Image 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      width={32} 
                      height={32} 
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-amber-800 font-bold text-xs">{post.author.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-bold text-sm text-amber-50">{post.author.name}</span>
                    {post.author.isVerified && (
                      <span className="mr-1 text-[10px] bg-blue-500/40 text-blue-50 px-1 py-0.5 rounded-full flex items-center backdrop-blur-sm border border-blue-400/30">
                        <svg className="h-2 w-2 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>موثق</span>
                      </span>
                    )}
                  </div>
                  <span className="text-amber-200/90 text-[10px]">كاتب ومحرر</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs bg-white/5 backdrop-blur-sm w-fit px-3 py-1 rounded-md border border-white/5">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 ml-0.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[10px]">{post.interaction.views}</span>
                </div>
                <div className="flex items-center cursor-pointer" onClick={scrollToComments}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 ml-0.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span className="text-[10px]">{post.comments.length}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 ml-0.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="text-[10px]">{post.interaction.shares}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* زر العودة للمدونة */}
      <div className="mt-4 text-center">
        <Link 
          href="/blog"
          className="inline-block px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg transition-colors text-sm"
        >
          العودة إلى المدونة
        </Link>
      </div>

      {/* محتوى المقال */}
      <div className="container mx-auto max-w-4xl py-4 px-3 lg:px-0">
        <div className="bg-gradient-to-b from-amber-50 to-amber-100/80 rounded-md shadow-md p-3 md:p-4 text-amber-950 border border-amber-200/50 relative overflow-hidden backdrop-blur-sm">
          {/* زخرفة الخلفية */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
          
          {/* صورة المقال المميزة - نقلل الارتفاع */}
          {post.featuredImage && (
            <div className="relative w-full h-40 md:h-48 mb-4 overflow-hidden rounded-md shadow-md group">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent opacity-70 z-10"></div>
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={800}
                height={400}
                className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
                priority={true}
              />
              <div className="absolute bottom-2 right-2 bg-amber-600 text-white px-2 py-0.5 rounded-full text-xs font-medium z-20 shadow-sm">
                {post.category}
              </div>
            </div>
          )}
          
          {/* عنوان المقال - جعله أصغر */}
          <h1 className="text-xl md:text-2xl font-bold mb-3 text-amber-900">{post.title}</h1>
          
          {/* محتوى المقال الرئيسي */}
          <article ref={articleRef} className="prose prose-sm max-w-none prose-headings:text-amber-900 prose-a:text-amber-600 prose-strong:text-amber-700">
            <div dangerouslySetInnerHTML={renderContent(post.content)} />
          </article>
          
          {/* شريط التفاعلات - نقلل المساحات الداخلية */}
          <div className="my-3 pt-2 border-t border-amber-200/50">
            <h3 className="text-sm font-bold mb-2 text-amber-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              تفاعل مع المقال
            </h3>
            
            <ReactionsBar 
              postId={post._id} 
              nickname={getUserSettings()?.nickname || 'زائر'}
              initialCounts={post.interaction?.reactions ? {
                sword: post.interaction.reactions.sword?.length || 0,
                fire: post.interaction.reactions.fire?.length || 0,
                shield: post.interaction.reactions.shield?.length || 0,
                crown: post.interaction.reactions.crown?.length || 0,
                castle: post.interaction.reactions.castle?.length || 0,
                laugh: post.interaction.reactions.laugh?.length || 0,
                total: Object.keys(post.interaction.reactions)
                  .reduce((sum, key) => sum + (post.interaction.reactions[key]?.length || 0), 0)
              } : undefined}
              onReaction={(type, added) => {
                console.log(`تفاعل ${type} ${added ? 'تمت إضافته' : 'تمت إزالته'}`);
              }}
            />
          </div>
          
          {/* أوسمة المقال - نقلل المساحات الداخلية */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-3 bg-amber-50/50 p-2 rounded-md border border-amber-100">
              <h3 className="text-sm font-bold mb-1 text-amber-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                الوسوم
              </h3>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full text-xs border border-amber-200 hover:bg-amber-200 transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
              </div>
            </div>
            
      {/* زر العودة للأعلى */}
      <ScrollToTop />
      
      {/* قسم التعليقات المبسط - تقليل المساحات الداخلية والخارجية */}
      <div ref={commentsRef} className="mt-3 relative">
        <div className="container mx-auto max-w-4xl px-3 lg:px-0">
          <div className="bg-gradient-to-br from-amber-950 to-amber-900 rounded-md shadow-md p-3 relative z-10 border border-amber-800/30 overflow-hidden">
            {/* زخرفة خلفية */}
            <div className="absolute inset-0 overflow-hidden opacity-15">
              <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-20"></div>
              <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-amber-500/20 via-transparent to-transparent"></div>
              <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-amber-300/20 via-transparent to-transparent"></div>
        </div>
        
            <h2 className="text-base font-bold mb-3 text-amber-100 flex items-center border-b border-amber-700/30 pb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              التعليقات <span className="mr-1 bg-amber-800/60 text-amber-200 px-1.5 py-0.5 rounded-full text-xs">{post.comments.length}</span>
            </h2>
            
            {/* قائمة التعليقات */}
            {post.comments.length > 0 ? (
              <div className="space-y-2">
                {post.comments.map((comment, index) => (
                  <div key={index} className="bg-amber-900/40 p-2 rounded-md border border-amber-700/30 transition-all hover:shadow-sm hover:border-amber-700/50 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <div className="w-7 h-7 rounded-full overflow-hidden bg-amber-700 flex items-center justify-center mr-2 border border-amber-600 shadow-sm">
                          {comment.author.avatar ? (
                            <Image 
                              src={comment.author.avatar} 
                              alt={comment.author.name} 
                              width={28} 
                              height={28} 
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-amber-100 font-bold text-xs">{comment.author.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-amber-100 block text-xs">{comment.author?.name || 'زائر'}</span>
                          <span className="text-amber-300/80 text-[10px]">{formatDate(comment.createdAt)}</span>
                        </div>
                      </div>
                      {comment.author.isVerified && (
                        <span className="text-[10px] bg-blue-900/50 text-blue-100 px-1 py-0 rounded-full flex items-center border border-blue-700/30">
                          <svg className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>موثق</span>
                        </span>
                      )}
                    </div>
                    <p className="text-amber-100/90 my-1 pr-1 border-r border-amber-600/50 leading-relaxed text-xs">{comment.content}</p>
                    
                    <div className="flex justify-between items-center mt-1 pt-1 border-t border-amber-700/30 text-[10px]">
                      <div className="flex items-center text-amber-400">
                        <div 
                          className={`flex items-center gap-0.5 cursor-pointer hover:text-amber-300 ${comment.likes.includes(getUserSettings()?.nickname || '') ? 'text-amber-300 font-bold' : ''} transition-colors duration-200 px-1 py-0.5 rounded-full hover:bg-amber-800/30`}
                          onClick={() => {
                            // التحقق من وجود ملف شخصي
                            const settings = getUserSettings();
                            if (!settings || !settings.nickname) {
                              // إظهار إشعار للمستخدم
                              alert('الرجاء إعداد ملفك الشخصي أولاً باستخدام زر الملف الشخصي في الجانب');
                              return;
                            }
                            
                            // تحديث لايكات التعليق
                            const currentUserName = settings.nickname;
                            const userId = 'user-' + Date.now(); // معرف مؤقت للمستخدم
                            
                            // إرسال التفاعل إلى API
                            fetch('/api/blog/interactions', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                action: 'likeComment',
                                postId: post?._id,
                                userId: userId,
                                commentId: comment._id
                              }),
                            })
                            .then(response => {
                              if (!response.ok) {
                                throw new Error('فشل في تسجيل الإعجاب');
                              }
                              return response.json();
                            })
                            .then(data => {
                              console.log('تم تحديث الإعجاب:', data);
                            })
                            .catch(err => {
                              console.error('خطأ في تحديث الإعجاب:', err);
                            });
                            
                            // تحديث واجهة المستخدم محليًا
                            const updatedComments = post.comments.map(c => {
                              if (c._id === comment._id) {
                                const isLiked = c.likes.includes(currentUserName);
                                const updatedLikes = isLiked 
                                  ? c.likes.filter(name => name !== currentUserName)
                                  : [...c.likes, currentUserName];
                                return {...c, likes: updatedLikes};
                              }
                              return c;
                            });
                            
                            setPost({
                              ...post,
                              comments: updatedComments
                            });
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" fill={comment.likes.includes(getUserSettings()?.nickname || '') ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          <span className="text-[10px]">{comment.likes.length}</span>
                        </div>
                      </div>
                      {comment.replies?.length ? (
                        <button className="text-amber-300 hover:text-amber-200 transition-colors px-1 py-0.5 rounded-full hover:bg-amber-800/30 flex items-center gap-0.5 text-[10px]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                          {comment.replies.length} ردود
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-amber-900/30 p-3 rounded-md text-center border border-amber-700/30 backdrop-blur-sm">
                <div className="text-amber-100 font-medium flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1 text-amber-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <p className="text-xs">لا توجد تعليقات حتى الآن. كن أول من يعلق!</p>
                </div>
              </div>
            )}
            
            {/* نموذج التعليق المبسط */}
            <div className="mt-3 bg-amber-800/40 p-2 rounded-md border border-amber-700/30 backdrop-blur-sm">
              <h3 className="text-sm font-bold mb-2 text-amber-100 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                أضف تعليقاً
              </h3>
              <form onSubmit={handleSubmitComment} className="space-y-2">
                {/* عرض معلومات الملف الشخصي المستخدمة للتعليق */}
                {getUserSettings() ? (
                  <div className="flex gap-1 items-center bg-amber-900/50 p-1.5 rounded-md border border-amber-700/30">
                    <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                      <img 
                        src={getUserAvatarSrc(getUserSettings()?.avatarId)} 
                        alt={getUserDisplayName(getUserSettings()?.nickname)} 
                        className="w-6 h-6 object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-amber-100 font-medium text-xs">{getUserDisplayName(getUserSettings()?.nickname)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-amber-900/50 p-1.5 rounded-md border border-amber-700/30">
                    <span className="text-amber-200 text-xs">أنت تعلق كـ زائر. الرجاء إعداد ملفك الشخصي أولاً</span>
                </div>
                )}
                
                <textarea 
                  id="comment"
                  className="w-full p-2 border border-amber-700/50 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500 bg-amber-900/30 text-xs text-amber-100 placeholder-amber-300/50"
                  placeholder="اكتب تعليقك هنا..."
                  rows={2}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                  disabled={!getUserSettings()}
                ></textarea>
                
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className={`px-3 py-1 text-white rounded-md transition-all duration-300 font-medium text-[10px] flex items-center gap-1 shadow-sm hover:shadow-md ${getUserSettings() ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95' : 'bg-gray-500 cursor-not-allowed'}`}
                    disabled={!getUserSettings()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    نشر التعليق
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}