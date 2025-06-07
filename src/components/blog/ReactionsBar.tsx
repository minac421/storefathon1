"use client";

import { useState, useEffect } from 'react';
import { ReactionType } from '@/types/blog';

// تعيين الرموز والألوان لكل نوع تفاعل
const reactionIcons = {
  [ReactionType.SWORD]: '⚔️',
  [ReactionType.FIRE]: '🔥',
  [ReactionType.SHIELD]: '🛡️',
  [ReactionType.CROWN]: '👑',
  [ReactionType.CASTLE]: '🏰',
  [ReactionType.LAUGH]: '😂', // إيموجي ضحك
};

const reactionColors = {
  [ReactionType.SWORD]: 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200',
  [ReactionType.FIRE]: 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200',
  [ReactionType.SHIELD]: 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200',
  [ReactionType.CROWN]: 'bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200',
  [ReactionType.CASTLE]: 'bg-purple-100 border-purple-300 text-purple-700 hover:bg-purple-200',
  [ReactionType.LAUGH]: 'bg-orange-100 border-orange-300 text-orange-700 hover:bg-orange-200', // لون برتقالي للضحك
};

// تسميات التفاعلات بالعربية
const reactionLabels = {
  [ReactionType.SWORD]: 'سيف',
  [ReactionType.FIRE]: 'نار',
  [ReactionType.SHIELD]: 'درع',
  [ReactionType.CROWN]: 'تاج',
  [ReactionType.CASTLE]: 'قلعة',
  [ReactionType.LAUGH]: 'ضحك', // تسمية لتفاعل الضحك
};

// واجهة الخصائص
interface ReactionsBarProps {
  postId: string;
  initialCounts?: Record<string, number>;
  nickname?: string;
  onReaction?: (type: ReactionType, added: boolean) => void;
}

// وظيفة مساعدة لإنشاء معرف جلسة فريد
const generateSessionId = (): string => {
  // التحقق مما إذا كان هناك معرف جلسة محفوظ مسبقاً
  const existingId = localStorage.getItem('userSessionId');
  if (existingId) {
    return existingId;
  }
  
  // إنشاء معرف جديد
  const newId = `user-${Math.random().toString(36).substring(2, 15)}`;
  localStorage.setItem('userSessionId', newId);
  return newId;
};

const ReactionsBar = ({ postId, initialCounts, nickname = 'زائر', onReaction }: ReactionsBarProps) => {
  // حالة التفاعلات المحلية
  const [counts, setCounts] = useState<Record<string, number>>(initialCounts || {
    [ReactionType.SWORD]: 0,
    [ReactionType.FIRE]: 0,
    [ReactionType.SHIELD]: 0,
    [ReactionType.CROWN]: 0,
    [ReactionType.CASTLE]: 0,
    [ReactionType.LAUGH]: 0,
    total: 0
  });
  const [userReactions, setUserReactions] = useState<ReactionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>('');
  // تخزين معرّف المنشور في متغير حالة حتى يبقى متسقاً
  const [currentPostId] = useState<string>(postId);
  // إضافة متغير حالة للتحكم في عرض قائمة التفاعلات
  const [showReactions, setShowReactions] = useState<boolean>(false);
  
  // تهيئة معرف الجلسة
  useEffect(() => {
    // استخدام وظيفة مساعدة لإنشاء أو الحصول على معرف جلسة موجود
    const id = generateSessionId();
    console.log('Session ID initialized:', id);
    setSessionId(id);
  }, []);
  
  // جلب التفاعلات عندما يكون لدينا sessionId و currentPostId
  useEffect(() => {
    if (sessionId && currentPostId) {
      console.log(`Ready to fetch reactions for post: ${currentPostId}`);
      fetchReactions();
    }
  }, [sessionId, currentPostId]);
  
  // جلب التفاعلات الحالية من الخادم
  const fetchReactions = async () => {
    if (!currentPostId) {
      console.error('Post ID is missing for fetching reactions');
      return;
    }
    
    if (!sessionId) {
      console.error('Session ID is missing for fetching reactions');
      return;
    }
    
    try {
      console.log(`Fetching reactions for post: ${currentPostId}, session: ${sessionId}`);
      const response = await fetch(`/api/blog/reactions?postId=${currentPostId}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`خطأ في جلب التفاعلات: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Reactions data received:', data);
      
      // تحديث العدادات
      setCounts(data.counts);
      
      // تحديد تفاعلات المستخدم الحالي
      const userReactionsArray = data.reactions
        .filter((r: any) => r.sessionId === sessionId)
        .map((r: any) => r.type);
      
      setUserReactions(userReactionsArray);
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  };
  
  // إرسال تفاعل جديد
  const handleReaction = async (type: ReactionType) => {
    if (isLoading) return;
    
    if (!currentPostId) {
      console.error('Post ID is missing for reaction');
      return;
    }
    
    if (!sessionId) {
      console.error('Session ID is missing for reaction');
      return;
    }
    
    console.log(`Sending reaction: ${type} for post: ${currentPostId}, session: ${sessionId}`);
    setIsLoading(true);
    
    try {
      // إرسال التفاعل إلى الخادم
      const payload = {
        postId: currentPostId,
        type,
        sessionId,
        nickname
      };
      
      console.log('Sending reaction payload:', payload);
      
      const response = await fetch('/api/blog/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Reaction error response: ${response.status} - ${errorText}`);
        throw new Error(`خطأ في إرسال التفاعل: ${response.status}`);
      }
      
      const data = await response.json();
      
      // تحديث الحالة المحلية
      setCounts(data.counts);
      
      const newUserReactions = [...userReactions];
      const reactionIndex = newUserReactions.indexOf(type);
      
      if (data.added) {
        // إضافة التفاعل إذا لم يكن موجودًا
        if (reactionIndex === -1) {
          newUserReactions.push(type);
        }
      } else {
        // إزالة التفاعل إذا كان موجودًا
        if (reactionIndex !== -1) {
          newUserReactions.splice(reactionIndex, 1);
        }
      }
      
      setUserReactions(newUserReactions);
      
      // استدعاء الحدث الخارجي إذا كان موجودًا
      if (onReaction) {
        onReaction(type, data.added);
      }
    } catch (error) {
      console.error('Error sending reaction:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="reactions-bar my-6">
      {/* زر التفاعل الرئيسي مع قائمة منبثقة */}
      <div className="relative flex justify-center mb-6">
        <div 
          className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-amber-100 border border-amber-300 shadow-sm cursor-pointer hover:bg-amber-200 transition-all duration-200 relative"
          onClick={() => setShowReactions(!showReactions)} // تغيير لاستخدام متغير showReactions بدلاً من isLoading
        >
          <span className="text-xl">{reactionIcons[ReactionType.SWORD]}</span>
          <span className="text-amber-800 font-medium">تفاعل مع المنشور</span>
          <span className="ml-1 text-sm bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
            {counts.total || 0}
          </span>
          
          {/* أزرار التفاعل المنبثقة */}
          {showReactions && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 rounded-xl border border-amber-200 shadow-lg z-50 animate-slideUp">
              <div className="flex flex-wrap justify-center gap-3">
                {Object.values(ReactionType).map((type) => {
                  const isActive = userReactions.includes(type);
                  const count = counts[type] || 0;
                  const bgColorClass = reactionColors[type].split(' ')[0]; // استخراج لون الخلفية فقط
                  
                  return (
                    <button
                      key={type}
                      onClick={(e) => {
                        e.stopPropagation(); // منع انتشار الحدث للزر الأب
                        handleReaction(type);
                        setShowReactions(false); // إغلاق القائمة بعد النقر على زر
                      }}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-xl text-sm
                        ${reactionColors[type]} border
                        hover:scale-110 hover:shadow-md transition-all
                        ${isActive ? 'ring-2 ring-amber-500 scale-105' : ''}
                      `}
                      title={`${reactionLabels[type]} (${count})`}
                    >
                      <span className="text-2xl">{reactionIcons[type]}</span>
                      <span className="font-medium">{reactionLabels[type]}</span>
                      {count > 0 && (
                        <span className="bg-white/70 px-2 py-0.5 rounded-full text-sm font-bold shadow-sm">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* عرض التفاعلات النشطة */}
      {counts.total > 0 && (
        <div className="flex flex-wrap justify-center gap-3">
          {Object.values(ReactionType).map((type) => {
            const count = counts[type] || 0;
            if (count === 0) return null;
            
            const bgColorClass = reactionColors[type].split(' ')[0]; // استخراج لون الخلفية فقط
            
            return (
              <div 
                key={type} 
                className={`
                  flex items-center p-2 rounded-lg ${bgColorClass.replace('bg-', 'bg-opacity-30 bg-')}
                  border border-gray-200 shadow-sm
                `}
              >
                <span className="text-2xl mr-2">{reactionIcons[type]}</span>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800">{count}</span>
                  <span className="text-xs text-gray-600">{reactionLabels[type]}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* إضافة تأثيرات CSS للحركة */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        
        .reaction-button-sword:hover { transform: scale(1.2) rotate(-5deg); }
        .reaction-button-fire:hover { transform: scale(1.2) rotate(5deg); }
        .reaction-button-shield:hover { transform: scale(1.2) rotate(-3deg); }
        .reaction-button-crown:hover { transform: scale(1.2) rotate(3deg); }
        .reaction-button-castle:hover { transform: scale(1.2) rotate(-2deg); }
        .reaction-button-laugh:hover { transform: scale(1.2) rotate(5deg); }
      `}</style>
    </div>
  );
};

export default ReactionsBar;
