"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogCategory } from '@/types/blog';
import { getUserSettings, getUserInitial, AVAILABLE_AVATARS, getUserAvatarSrc } from '@/utils/userSettings';

interface PostCardProps {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: BlogCategory;
  featuredImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  commentsCount: number;
  likesCount: number;
  isLiked?: boolean;
  [key: string]: any; // للسماح بخصائص إضافية
}

export default function PostCard({
  id,
  slug,
  title,
  summary,
  category,
  featuredImage,
  author,
  createdAt,
  commentsCount,
  likesCount,
  isLiked = false,
  ...otherProps
}: PostCardProps) {
  // استخدام معرف المنشور الفعلي (مع معالجة القيم الفارغة)
  const postId = id || "";
  // قم بإنشاء ID ثابت للمنشور في حالة عدم وجوده، لتجنب مشاكل التولد العشوائي مع Date.now()
  const stablePostId = React.useMemo(() => {
    // محاولة استخدام id أولاً ثم _id إذا كان متاحًا
    let idToUse = postId;

    // البحث عن _id في حالة كان هناك (في بعض الأحيان تصل البيانات من الخادم بتنسيق مختلف)
    if ((!idToUse || idToUse.length === 0) && (otherProps as any)._id) {
      console.info('استخدام _id بدلاً من id الفارغ');
      idToUse = (otherProps as any)._id;
    }
    
    // يجب أن يكون idToUse معرفًا صالحًا من MongoDB أو نقوم بإرجاع قيمة فارغة
    // معرفات MongoDB تتكون من 24 حرفًا سداسي عشري أو تكون رقمًا أو سلسلة أحرف معينة
    if (idToUse && (idToUse.length === 24 || /^[0-9a-fA-F]{24}$/.test(idToUse))) {
      return idToUse;
    }
    
    // لا ننشئ معرفًا عشوائيًا بل نعيد قيمة فارغة لتجنب أخطاء التحقق في الخادم
    return "";
  }, [postId, otherProps]);
  
  // التأكد من أن معرف المنشور متوفر دائمًا
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likesCount);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Array<{id: string; text: string; author: string; authorAvatarId?: number; createdAt: string}>>([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [userProfile, setUserProfile] = useState<{nickname: string; avatarId: number} | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);

  // ملاحظة: نستخدم معرف المنشور الفعلي مباشرة
  
  // تحميل بيانات المستخدم من التخزين المحلي
  useEffect(() => {
    setUserProfile(getUserSettings());
  }, []);
  
  // عرض صورة المستخدم اعتمادًا على الإعدادات
  const getUserAvatar = () => {
    const userSettings = userProfile;
    
    if (userSettings && userSettings.avatarId) {
      const avatar = AVAILABLE_AVATARS.find(a => a.id === userSettings.avatarId);
      if (avatar) {
        // إذا كانت الصور موجودة فعليًا، استخدم مكون Image
        // return (
        //   <Image
        //     src={avatar.src}
        //     alt={avatar.alt}
        //     width={32}
        //     height={32}
        //     className="w-full h-full object-cover"
        //   />
        // );
        
        // بديل مؤقت حتى تتوفر الصور
        return (
          <div className="w-full h-full flex items-center justify-center bg-amber-100 text-amber-800">
            <span>{getUserInitial(userSettings.nickname)}</span>
          </div>
        );
      }
    }
    
    // صورة افتراضية إذا لم تكن هناك إعدادات
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
        </svg>
      </div>
    );
  };

  // تحويل التصنيف إلى نص عربي
  const getCategoryName = (category: BlogCategory) => {
    switch (category) {
      case BlogCategory.NEWS:
        return 'أخبار';
      case BlogCategory.GUIDE:
        return 'دليل';
      case BlogCategory.TIPS:
        return 'نصائح';
      default:
        return 'عام';
    }
  };

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // تحويل رمز التفاعل إلى اسمه بالعربية
  const getReactionName = (reaction: string) => {
    switch (reaction) {
      case '⚔️':
        return 'سيف';
      case '👑':
        return 'تاج';
      case '🏰':
        return 'قلعة';
      case '🔥':
        return 'نار';
      case '🛡️':
        return 'درع';
      case '🏹':
        return 'قوس';
      case '❤️':
        return 'قلب';
      case '😂':
        return 'ضحك';
      default:
        return 'تفاعل';
    }
  };

  // وظيفة لتحميل التعليقات
  const loadComments = async () => {
    // إذا لم يكن هناك معرف منشور صالح، لا تحاول تحميل التعليقات
    if (!stablePostId) {
      console.info('تخطي تحميل التعليقات: لا يوجد معرف منشور صالح');
      return;
    }

    setIsLoadingComments(true);
    setCommentError(null); // مسح أي أخطاء سابقة
    
    try {
      // محاولة واحدة فقط لجلب التعليقات مع معالجة الأخطاء
      console.log('جاري تحميل تعليقات المنشور:', stablePostId);
      
      // معالجة وتصحيح معرف المنشور
      // 1. يمكننا استخدام slug بدلاً من id إذا كان موجودًا
      // 2. تصحيح معرف المنشور إذا كان بصيغة غير صالحة
      const postIdentifier = slug && slug.length > 0 ? slug : stablePostId;
      console.log('سيتم استخدام معرف:', { postIdentifier, originalId: stablePostId, slug });
      
      // استخدام AbortController للتحكم في طلب الشبكة
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // زيادة المهلة إلى 15 ثانية
      
      // إضافة محاولات متعددة للحصول على التعليقات بأساليب مختلفة
      let fetchSuccess = false;
      let responseData = null;
      let fetchError = null;
      
      try {
        // محاولة 1: استخدام postIdentifier (slug أو id)
        console.log('جاري محاولة الحصول على التعليقات باستخدام:', postIdentifier);
        
        // تنفيذ استدعاء API للحصول على التعليقات
        const response = await fetch(`/api/blog/comments?postId=${encodeURIComponent(postIdentifier)}`, {
          signal: controller.signal,
          cache: 'no-store', // تجنب التخزين المؤقت
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          responseData = await response.json();
          fetchSuccess = true;
          console.log('تم استلام التعليقات بنجاح باستخدام:', postIdentifier);
        } else {
          // حفظ رسالة الخطأ للمحاولة التالية
          fetchError = `${response.status} ${response.statusText}`;
          console.warn(`فشل الحصول على التعليقات باستخدام ${postIdentifier}، الخطأ:`, fetchError);
          
          // محاولة 2: استخدام معرف المنشور مباشرة إذا كان مختلفًا عن postIdentifier
          if (stablePostId !== postIdentifier) {
            console.log('محاولة ثانية باستخدام معرف المنشور الأصلي:', stablePostId);
            
            const response2 = await fetch(`/api/blog/comments?postId=${encodeURIComponent(stablePostId)}`, {
              cache: 'no-store',
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            
            if (response2.ok) {
              responseData = await response2.json();
              fetchSuccess = true;
              console.log('تم استلام التعليقات بنجاح في المحاولة الثانية');
            } else {
              fetchError = `${response2.status} ${response2.statusText}`;
              console.warn('فشل الحصول على التعليقات في المحاولة الثانية، الخطأ:', fetchError);
              
              // محاولة 3: استخدام واجهة API تفاعلات المنشور إذا كانت متاحة
              try {
                console.log('محاولة ثالثة باستخدام API التفاعلات:', stablePostId);
                
                const response3 = await fetch(`/api/blog/interactions?postId=${encodeURIComponent(stablePostId)}&type=comments`, {
                  cache: 'no-store',
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });
                
                if (response3.ok) {
                  const interactionsData = await response3.json();
                  if (interactionsData.success && interactionsData.comments) {
                    responseData = {
                      success: true,
                      comments: interactionsData.comments
                    };
                    fetchSuccess = true;
                    console.log('تم استلام التعليقات بنجاح من API التفاعلات');
                  }
                }
              } catch (interactionsError) {
                console.warn('فشل الحصول على التعليقات من API التفاعلات:', interactionsError);
              }
            }
          }
        }
        
        if (!fetchSuccess) {
          throw new Error(`فشل في جلب التعليقات: ${fetchError}`);
        }
        
        // معالجة البيانات المستلمة
        if (responseData && responseData.success) {
          console.log('تم استلام بيانات التعليقات بنجاح:', { 
            success: responseData.success, 
            commentCount: responseData.comments?.length || 0 
          });
          
          // تحويل التعليقات من الصيغة الجديدة إلى الصيغة المستخدمة في المكون
          const transformedComments = (responseData.comments || []).map(comment => ({
            id: comment.id || comment._id || `local-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            text: comment.text || comment.content,
            author: typeof comment.author === 'object' ? comment.author.name : comment.author,
            authorAvatarId: comment.authorAvatarId || 
                            (comment.author && typeof comment.author === 'object' && comment.author.avatar ? 
                            parseInt(comment.author.avatar.replace(/[^\d]/g, '')) || 1 : 1),
            createdAt: comment.createdAt || new Date().toISOString(),
            postId: comment.postId || stablePostId
          }));
          
          // ترتيب التعليقات من الأحدث إلى الأقدم
          transformedComments.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          
          setComments(transformedComments);
          console.log('تم تعيين التعليقات بنجاح:', { count: transformedComments.length });
        } else {
          throw new Error('فشل في تحميل التعليقات: استجابة غير متوقعة');
        }
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          console.warn('تم إلغاء طلب التعليقات بسبب تجاوز المهلة', { postId: stablePostId });
          throw new Error('تم تجاوز مهلة تحميل التعليقات');
        }
        throw fetchError;
      }
    } catch (error) {
      console.error('خطأ في تحميل التعليقات:', error, { postId: stablePostId });
      
      // التعامل مع أنواع مختلفة من الأخطاء
      if (error.message.includes('500')) {
        setCommentError('حدث خطأ في الخادم. سنحاول مرة أخرى لاحقًا.');
      } else if (error.message.includes('404')) {
        // لا داعي لعرض خطأ 404 للمستخدم، فقط استخدم قائمة فارغة
        setComments([]);
        return;
      } else if (error.message.includes('timeout') || error.message.includes('مهلة')) {
        setCommentError('استغرق تحميل التعليقات وقتاً طويلاً. حاول مرة أخرى لاحقاً.');
      } else {
        // عرض رسالة خطأ للمستخدم إذا كانت مفيدة
        setCommentError(error.message || 'تعذر تحميل التعليقات. حاول مرة أخرى لاحقًا.');
      }
      
      // رجوع قائمة فارغة
      setComments([]);
    } finally {
      setIsLoadingComments(false);
    }
  };

  // وظيفة لإضافة تعليق عبر API التعليقات المباشرة
  const addCommentViaCommentsAPI = async (content: string, author: string, authorAvatarId: number, postId: string) => {
    try {
      const response = await fetch(`/api/blog/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: content,
          author: author,
          authorAvatarId: authorAvatarId,
          postId: postId
        }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('خطأ في استخدام API التعليقات:', error);
      throw error;
    }
  };
  
  // وظيفة لإضافة تعليق عبر API التفاعلات
  const addCommentViaInteractionsAPI = async (content: string, userId: string, displayName: string, postId: string) => {
    try {
      const response = await fetch(`/api/blog/interactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'comment',
          postId: postId,
          userId: userId,
          content: content,
          displayName: displayName
        }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('خطأ في استخدام API التفاعلات:', error);
      throw error;
    }
  };

  // وظيفة لإضافة تعليق جديد
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim() || isSubmittingComment) return;
    
    // التحقق من وجود معرف المنشور
    if (!stablePostId) {
      setCommentError('عذراً، لا يمكن إضافة تعليق لهذا المنشور بسبب عدم توفر معرف المنشور');
      console.error('خطأ: محاولة إضافة تعليق بدون معرف منشور صالح', { providedId: id, stableId: stablePostId });
      return;
    }
    
    // التحقق من وجود ملف شخصي للمستخدم
    if (!userProfile || !userProfile.nickname) {
      alert('يجب إنشاء ملف شخصي قبل التعليق. سيتم توجيهك إلى صفحة الملف الشخصي.');
      window.location.href = '/blog/profile';
      return;
    }
    
    setIsSubmittingComment(true);
    setCommentError(null); // مسح أي أخطاء سابقة
    
    // طباعة معلومات التشخيص
    console.log('إرسال تعليق للمنشور:', {
      postId: stablePostId,
      commentText: comment,
      author: userProfile.nickname
    });
    
    try {
      // محاولة استخدام API التفاعلات أولا
      let data;
      let success = false;
      
      try {
        // محاولة استخدام API التفاعلات
        data = await addCommentViaInteractionsAPI(
          comment, 
          userProfile.nickname, 
          userProfile.nickname, 
          stablePostId
        );
        success = data.success;
        console.log("نجاح في إضافة التعليق عبر API التفاعلات:", success);
      } catch (interactionsError) {
        console.warn("فشل استخدام API التفاعلات، محاولة استخدام API التعليقات بدلاً من ذلك");
        
        // إذا فشلت محاولة واجهة التفاعلات، نحاول استخدام واجهة التعليقات
        try {
          data = await addCommentViaCommentsAPI(
            comment, 
            userProfile.nickname, 
            userProfile.avatarId || 1, 
            stablePostId
          );
          success = data.success;
          console.log("نجاح في إضافة التعليق عبر API التعليقات:", success);
        } catch (commentsError) {
          console.error("فشلت جميع محاولات إضافة التعليق");
          throw new Error("فشلت جميع المحاولات لإضافة التعليق");
        }
      }
      
      // تحقق من نجاح العملية
      if (!success) {
        throw new Error(data.error || 'فشل في إضافة التعليق لسبب غير معروف');
      }
      
      // نجاح عملية إضافة التعليق
      console.log("استجابة إضافة التعليق:", data);
      
      // إذا كان هناك تعليق في البيانات المستلمة، نستخدمه
      if (data.comment) {
        const newComment = {
          id: data.comment._id || data.comment.id || `local-${Date.now()}`,
          text: data.comment.content || data.comment.text || comment,
          author: typeof data.comment.author === 'object' ? 
                 data.comment.author.name || userProfile.nickname : 
                 data.comment.author || userProfile.nickname,
          authorAvatarId: userProfile.avatarId,
          createdAt: data.comment.createdAt || new Date().toISOString(),
          postId: stablePostId
        };
        
        setComments(prev => [...prev, newComment]);
      } else {
        // إضافة تعليق محلي في حالة عدم وجود تعليق في البيانات المستلمة
        const newComment = {
          id: `local-${Date.now()}`,
          text: comment,
          author: userProfile.nickname,
          authorAvatarId: userProfile.avatarId,
          createdAt: new Date().toISOString(),
          postId: stablePostId
        };
        
        setComments(prev => [...prev, newComment]);
      }
      
      // مسح حقل التعليق
      setComment('');
    } catch (error) {
      console.error('خطأ في إضافة التعليق:', error);
      
      // تحليل نوع الخطأ وعرض رسالة مناسبة
      if (error instanceof Error) {
        if (error.message.includes('fetch') || error.message.includes('network')) {
          setCommentError('حدث خطأ في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
        } else if (error.message.includes('JSON')) {
          setCommentError('حدث خطأ في معالجة البيانات. يرجى المحاولة مرة أخرى.');
        } else {
          setCommentError(error.message || 'حدث خطأ أثناء إضافة التعليق');
        }
      } else {
        setCommentError('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا.');
      }
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // دالة لتحويل الإيموجي إلى نوع التفاعل المقابل
  const getReactionType = (emoji: string): string => {
    switch (emoji) {
      case '⚔️': return 'sword';
      case '🔥': return 'fire';
      case '🛡️': return 'shield';
      case '👑': return 'crown';
      case '🏰': return 'castle';
      case '😂': return 'laugh';
      default: return 'sword'; // استخدام قيمة افتراضية مقبولة في API
    }
  };

  // وظيفة التفاعل مع البوست
  const handleReaction = async (reactionEmoji: string) => {
    console.log('handleReaction called with post ID:', stablePostId);
    
    if (!stablePostId) {
      console.error('خطأ: لم يتم توفير معرف المنشور');
      return;
    }
    
    try {      
      // استخدام معرف المنشور الثابت
      console.log('استخدام معرف المنشور للتفاعل:', stablePostId);

      // التحقق من وجود ملف شخصي للمستخدم
      if (!userProfile || !userProfile.nickname) {
        alert('الرجاء إنشاء ملف شخصي قبل التفاعل مع المنشورات');
        window.location.href = '/blog/profile';
        return;
      }

      // إنشاء معرف جلسة فريد إذا لم يكن موجودًا
      let sessionId = localStorage.getItem('userSessionId');
      if (!sessionId) {
        sessionId = 'session-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userSessionId', sessionId);
      }

      // تحويل الإيموجي إلى نوع التفاعل
      const reactionType = getReactionType(reactionEmoji);
      
      // إعداد بيانات الطلب - استخدام المعرف الثابت
      console.log('Using post ID for API call:', stablePostId);
      
      const requestData = {
        postId: stablePostId,
        type: reactionType,
        sessionId,
        nickname: userProfile.nickname.trim()
      };
      
      console.log('Sending reaction request:', requestData);
      
      // إرسال طلب API للتفاعل - استخدام نقطة النهاية الصحيحة
      const apiUrl = `/api/blog/reactions`;
      const response = await fetch(apiUrl, { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'فشل في تحديث التفاعل');
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      // تحديث حالة التفاعل محليًا
      if (data.added) {
        setSelectedReaction(reactionEmoji);
        setLikes(prevLikes => prevLikes + 1);
      } else {
        setSelectedReaction(null);
        setLikes(prevLikes => Math.max(0, prevLikes - 1));
      }
      
      // إخفاء قائمة التفاعلات
      setShowReactions(false);
    } catch (error) {
      console.error('Error reacting to post:', error);
      alert(error instanceof Error ? error.message : 'حدث خطأ أثناء التفاعل مع المنشور');
    }
  };
  
  // وظيفة الإعجاب بالبوست
  const handleLike = async () => {
    if (selectedReaction) {
      // إذا كان هناك تفاعل سابق، نزيله
      handleReaction(selectedReaction);
    } else {
      // إظهار أو إخفاء قائمة التفاعلات
      setShowReactions(!showReactions);
    }
  };

  // وظيفة المشاركة
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: summary,
        url: `/blog/${slug}`
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // نسخ الرابط إلى الحافظة إذا كانت واجهة المشاركة غير متوفرة
      navigator.clipboard.writeText(`${window.location.origin}/blog/${slug}`)
        .then(() => alert('تم نسخ الرابط!'))
        .catch(err => console.error('Error copying link:', err));
    }
  };

  // هذه الدالة ستتحقق من صحة رابط الصورة
  const getImageUrl = (url: string | undefined) => {
    if (!url) return '';
    // تحقق مما إذا كان الرابط data URL (base64)
    if (url.startsWith('data:')) {
      return url;
    }
    // إذا كان الرابط مطلقاً (يبدأ بـ http أو https)
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // إذا كان رابطاً نسبياً
    if (url.startsWith('/')) {
      return url;
    }
    // افتراضي: إضافة '/' إذا لم يكن موجوداً
    return `/${url}`;
  };
  
  // طباعة معلومات التشخيص
  React.useEffect(() => {
    if (featuredImage) {
      console.log(`PostCard: صورة المقال "${title}"`, featuredImage);
    } else {
      console.log(`PostCard: المقال "${title}" ليس له صورة`);
    }
  }, [title, featuredImage]);

  return (
    <div className="relative bg-[#f8f0d8] rounded-lg shadow-lg overflow-hidden border-4 border-[#d9b77e] mb-6 transition-all duration-300 hover:-translate-y-1 transform rotate-[0.3deg] hover:shadow-xl">
      {/* تأثير الحواف المتموجة للورقة القديمة */}
      <div className="absolute -top-2 -right-2 -left-2 h-6 bg-[#f8f0d8] rounded-b-3xl shadow-inner"></div>
      <div className="absolute -bottom-2 -right-2 -left-2 h-6 bg-[#f8f0d8] rounded-t-3xl shadow-inner"></div>
      <div className="absolute -left-2 -top-2 -bottom-2 w-6 bg-[#f8f0d8] rounded-r-3xl shadow-inner"></div>
      <div className="absolute -right-2 -top-2 -bottom-2 w-6 bg-[#f8f0d8] rounded-l-3xl shadow-inner"></div>
      
      {/* صورة المقال المميزة */}
      {featuredImage && featuredImage.length > 0 && (
        <div className="relative h-44 max-h-44 w-full overflow-hidden border-b-2 border-amber-800/30">
          <Image
            src={getImageUrl(featuredImage)}
            alt={title}
            width={600}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain md:object-contain object-center w-full h-full hover:scale-105 transition-all duration-500 opacity-90"
            priority={true}
            onError={() => console.error(`خطأ في تحميل الصورة: ${featuredImage}`)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f0d8]/80 to-transparent"></div>
        </div>
      )}
      
      <Link href={`/blog/${slug}`} className="block p-5 py-6 relative z-10">
        {/* فئة المقال */}
        <div className="mb-2">
          <span className="text-xs font-medium bg-amber-800/10 text-amber-800 rounded-full px-3 py-1 border border-amber-800/20 font-serif">
            {getCategoryName(category)}
          </span>
        </div>
      
        {/* عنوان ونص البوست - مع خط برتقالي على اليمين */}
        <div className="relative mb-4">
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-800"></div>
          <h2 className="text-xl font-bold mb-3 text-amber-900 dark:text-amber-700 pr-4 font-serif">
            {title}
          </h2>
        </div>
        
        <p className="text-amber-950 dark:text-amber-800 text-sm mb-4 font-serif">
          {summary}
        </p>
        
        {/* معلومات المشاهدات والمشاركة */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="inline-block ml-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
              <span className="text-xs text-amber-700 font-serif">{commentsCount * 5 + likesCount}</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block ml-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </span>
              <span className="text-xs text-amber-700 font-serif">{commentsCount}</span>
            </div>
            <div className="flex items-center ml-1">
              <span className="inline-block ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </span>
              <span className="text-xs text-amber-700 font-serif">{likesCount}</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-amber-700 ml-2 font-serif">{formatDate(createdAt)}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        {/* زر قراءة المزيد */}
        <div className="flex justify-between items-center">
          <span className="inline-flex items-center text-amber-800 hover:text-amber-900 font-semibold transition-colors font-serif text-sm">
            قراءة المزيد
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
              </span>
          
          {/* أزرار التفاعل */}
          <div className="flex gap-2 relative">
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowReactions(!showReactions);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border shadow-sm transition-all ${
                  selectedReaction 
                    ? 'bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300 text-amber-700 font-semibold' 
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-base">{selectedReaction || '⚔️'}</span>
                <span className="font-medium text-xs">{selectedReaction ? 'تفاعلت' : 'تفاعل'}</span>
              </button>
              
              {/* شريط التفاعلات */}
              {showReactions && (
                <div className="absolute bottom-full right-0 mb-2 p-2 bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 rounded-xl border border-amber-200 shadow-lg z-50">
                  <div className="flex flex-wrap justify-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleReaction('⚔️');
                        setShowReactions(false);
                      }}
                      className="reaction-btn flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-blue-100/80 border border-blue-300 text-blue-700 hover:bg-blue-200 transition-all hover:scale-110 hover:shadow-md"
                    >
                      <span className="text-lg">⚔️</span>
                      <span className="font-medium">سيف</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleReaction('🔥');
                        setShowReactions(false);
                      }}
                      className="reaction-btn flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-red-100/80 border border-red-300 text-red-700 hover:bg-red-200 transition-all hover:scale-110 hover:shadow-md"
                    >
                      <span className="text-lg">🔥</span>
                      <span className="font-medium">نار</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleReaction('🛡️');
                        setShowReactions(false);
                      }}
                      className="reaction-btn flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-green-100/80 border border-green-300 text-green-700 hover:bg-green-200 transition-all hover:scale-110 hover:shadow-md"
                    >
                      <span className="text-lg">🛡️</span>
                      <span className="font-medium">درع</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleReaction('👑');
                        setShowReactions(false);
                      }}
                      className="reaction-btn flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-yellow-100/80 border border-yellow-300 text-yellow-700 hover:bg-yellow-200 transition-all hover:scale-110 hover:shadow-md"
                    >
                      <span className="text-lg">👑</span>
                      <span className="font-medium">تاج</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleReaction('🏰');
                        setShowReactions(false);
                      }}
                      className="reaction-btn flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-purple-100/80 border border-purple-300 text-purple-700 hover:bg-purple-200 transition-all hover:scale-110 hover:shadow-md"
                    >
                      <span className="text-lg">🏰</span>
                      <span className="font-medium">قلعة</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleReaction('😂');
                        setShowReactions(false);
                      }}
                      className="reaction-btn flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-orange-100/80 border border-orange-300 text-orange-700 hover:bg-orange-200 transition-all hover:scale-110 hover:shadow-md"
                    >
                      <span className="text-lg">😂</span>
                      <span className="font-medium">ضحك</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* زر المشاركة */}
        <div className="flex justify-between items-center">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleShare();
            }}
            className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-100 px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="font-medium text-xs">مشاركة</span>
          </button>
        </div>
      </Link>
      
      {/* قسم التعليقات المصغر */}
      <div className="px-5 pt-0 pb-4 -mt-2 relative z-10" onClick={e => e.stopPropagation()}>
        <div className="border-t border-amber-800/20 pt-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-bold text-amber-800 font-serif flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              التعليقات
              <span className="inline-block mr-1 text-[10px] bg-amber-100 text-amber-800 rounded-full px-1.5 py-0 border border-amber-800/20">
                {commentsCount}
              </span>
            </h4>
            <Link href={`/blog/${slug}`} className="text-[10px] text-amber-600 hover:text-amber-800 transition-colors font-serif">
              عرض الكل
            </Link>
          </div>
          
          {/* عرض آخر تعليقين */}
          {isLoadingComments ? (
            <div className="text-center py-2">
              <div className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-t-2 border-b-2 border-amber-600 mb-1"></div>
              <p className="text-[10px] text-amber-700">جاري تحميل التعليقات...</p>
            </div>
          ) : commentError ? (
            <div className="text-center py-2">
              <p className="text-[10px] text-red-600">{commentError}</p>
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-1.5 mb-2">
              {comments.slice(-2).map((comment, index) => (
                <div key={comment.id || index} className="bg-amber-50 rounded-md p-1.5 border border-amber-200">
                  <div className="flex items-center mb-0.5">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-amber-200 flex items-center justify-center mr-1 text-[8px] text-amber-800 font-bold border border-amber-300">
                      {comment.authorAvatarId ? (
                        <Image
                          src={getUserAvatarSrc(comment.authorAvatarId)}
                          alt={comment.author}
                          width={20}
                          height={20}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // في حالة فشل تحميل الصورة، نعرض الحرف الأول من الاسم
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerText = comment.author ? comment.author.charAt(0).toUpperCase() : "؟";
                          }}
                        />
                      ) : (
                        comment.author ? comment.author.charAt(0).toUpperCase() : "؟"
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-amber-800">{comment.author}</span>
                    <span className="mr-auto text-[8px] text-amber-600">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-[10px] text-amber-900 leading-relaxed pr-1.5 border-r border-amber-300">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-1.5 mb-2">
              <p className="text-[10px] text-amber-700">لا توجد تعليقات. كن أول من يعلق!</p>
            </div>
          )}
          
          {/* نموذج إضافة تعليق سريع */}
          <form onSubmit={handleAddComment} className="relative flex gap-1.5">
            {userProfile && (
              <div className="w-6 h-6 rounded-full overflow-hidden bg-amber-200 flex-shrink-0 border border-amber-300">
                {userProfile.avatarId ? (
                  <Image
                    src={getUserAvatarSrc(userProfile.avatarId)}
                    alt={userProfile.nickname}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-amber-800 text-[10px] font-bold">${userProfile.nickname.charAt(0).toUpperCase()}</div>`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-amber-800 text-[10px] font-bold">
                    {userProfile.nickname.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            )}
            <div className="w-full">
              <input
                type="text"
                placeholder={userProfile ? "اكتب تعليقك السريع هنا..." : "قم بإنشاء ملف شخصي للتعليق"}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-md border border-amber-300 bg-amber-50 text-amber-900 px-2 py-1 text-[10px] placeholder-amber-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                disabled={isSubmittingComment || !userProfile}
              />
              {!userProfile && (
                <p className="absolute text-[8px] text-amber-600 mt-0.5 right-1">
                  <Link href="/blog/profile" className="underline hover:text-amber-800">قم بإنشاء ملف شخصي</Link> للتعليق
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmittingComment || !comment.trim() || !userProfile}
              className={`rounded-md px-2 py-1 text-[10px] flex items-center justify-center min-w-[40px] ${
                isSubmittingComment
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : comment.trim() && userProfile
                  ? "bg-amber-600 text-white hover:bg-amber-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmittingComment ? (
                <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                "تعليق"
              )}
            </button>
          </form>
        </div>
      </div>
      
      {/* زخرفة تاريخية في أسفل البطاقة */}
      <div className="w-full flex justify-center mt-2 mb-6 opacity-60 relative z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="20" viewBox="0 0 200 30" fill="#8B4513">
          <path d="M0,15 C50,5 150,25 200,15 L200,20 C150,30 50,10 0,20 L0,15 Z" />
        </svg>
      </div>
    </div>
  );
}
