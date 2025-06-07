"use client";

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { BlogCategory, ReactionType } from '@/types/blog';
import ReactionsBar from './ReactionsBar';

// تعريف خصائص بطاقة المقال
interface PostCardProps {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: BlogCategory;
  featuredImage?: string;
  author: {
    nickname: string;
    avatar?: string;
    badge?: string;
  };
  createdAt: string;
  commentsCount: number;
  reactionCounts?: Record<string, number>;
}

// ألوان فئات المقالات
const categoryColors: Record<string, string> = {
  [BlogCategory.GUIDE]: 'bg-blue-600',
  [BlogCategory.NEWS]: 'bg-amber-600',
  [BlogCategory.TIPS]: 'bg-green-600',
  [BlogCategory.ANALYSIS]: 'bg-purple-600',
  [BlogCategory.MARKET]: 'bg-teal-600',
  [BlogCategory.MEMES]: 'bg-pink-600',
  [BlogCategory.EXPERIENCE]: 'bg-cyan-700',
};

// ترجمة فئات المقالات لعرضها بالعربية
const categoryTranslations: Record<string, string> = {
  [BlogCategory.GUIDE]: 'دليل اللاعبين',
  [BlogCategory.NEWS]: 'أخبار اللعبة',
  [BlogCategory.TIPS]: 'نصائح وحيل',
  [BlogCategory.ANALYSIS]: 'تحليلات وتقييمات',
  [BlogCategory.MARKET]: 'أخبار السوق',
  [BlogCategory.MEMES]: 'ميمز وطرائف',
  [BlogCategory.EXPERIENCE]: 'تجارب اللاعبين',
};

const PostCardWithReactions: React.FC<PostCardProps> = ({ 
  id, 
  slug, 
  title, 
  summary, 
  category, 
  featuredImage, 
  author,
  createdAt,
  commentsCount,
  reactionCounts
}) => {
  // تنسيق التاريخ  
  const formattedDate = format(new Date(createdAt), 'PPP', { locale: ar });
  
  // حساب إجمالي التفاعلات
  const totalReactions = reactionCounts ? 
    Object.values(reactionCounts).reduce((sum, count) => sum + count, 0) : 0;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-amber-200/50 dark:from-gray-800 dark:to-gray-900 dark:border-amber-700/30 transform hover:-translate-y-1">
      {/* رابط المقال كامل */}
      <Link href={`/blog/${slug}`} className="block">
        
        {/* صورة المقال الرئيسية */}
        <div className="relative h-52 overflow-hidden border-b-2 border-amber-500/20">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110 brightness-[1.02] contrast-[1.05]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('/images/bg233.png')] bg-center bg-cover opacity-20 mix-blend-overlay"></div>
              <span className="text-white text-lg font-bold">الفاتحون</span>
            </div>
          )}
          
          {/* شارة التصنيف */}
          <div className={`absolute top-3 right-3 ${categoryColors[category] || 'bg-gray-600'} text-white text-xs py-1.5 px-3 rounded-md font-medium shadow-md border border-white/20 backdrop-blur-sm`}>
            {categoryTranslations[category] || category}
          </div>
        </div>
        
        {/* معلومات المقال */}
        <div className="p-5">
          {/* معلومات الكاتب والتاريخ */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-amber-400 shadow-md">
              <Image 
                src={author.avatar || '/images/avatars/default.png'} 
                alt={author.nickname}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 dark:text-amber-200">
                {author.nickname}
                {author.badge && (
                  <span className="inline-block bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-md mr-1.5 border border-blue-300/30">
                    {author.badge}
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {formattedDate}
              </p>
            </div>
          </div>
          
          {/* عنوان المقال */}
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 hover:text-amber-600 transition-colors duration-300 leading-tight">
            {title}
          </h3>
          
          {/* ملخص المقال */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-2 leading-relaxed">
            {summary}
          </p>
          
          {/* التفاعلات المختصرة - عرض أيقونة واحدة فقط لكل نوع تفاعل مع العدد */}
          <div className="flex flex-wrap gap-2 mt-4 mb-1 border-t border-gray-200/60 dark:border-gray-700/40 pt-3">
            {Object.values(ReactionType).map((type) => {
              const count = reactionCounts?.[type] || 0;
              if (count === 0) return null;
              
              // اختيار الأيقونة لكل نوع تفاعل
              const icon = type === ReactionType.SWORD ? '⚔️' : 
                          type === ReactionType.FIRE ? '🔥' : 
                          type === ReactionType.SHIELD ? '🛡️' : 
                          type === ReactionType.CROWN ? '👑' : 
                          type === ReactionType.CASTLE ? '🏰' :
                          type === ReactionType.LAUGH ? '😂' : '💫';
              
              return (
                <div 
                  key={type}
                  className="inline-flex items-center text-xs text-gray-700 bg-gray-100 hover:bg-amber-100 hover:text-amber-700 dark:bg-gray-700/60 dark:text-gray-300 dark:hover:bg-amber-800/30 dark:hover:text-amber-300 rounded-full px-2.5 py-1.5 transition-all duration-200 border border-transparent hover:border-amber-200/50 shadow-sm"
                >
                  <span className="mr-1">{icon}</span>
                  <span>{count}</span>
                </div>
              );
            })}
            
            {/* عدد التعليقات */}
            {commentsCount > 0 && (
              <div className="inline-flex items-center text-xs text-gray-700 bg-gray-100 hover:bg-amber-100 hover:text-amber-700 dark:bg-gray-700/60 dark:text-gray-300 dark:hover:bg-amber-800/30 dark:hover:text-amber-300 rounded-full px-2.5 py-1.5 transition-all duration-200 border border-transparent hover:border-amber-200/50 shadow-sm">
                <span className="mr-1">💬</span>
                <span>{commentsCount}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
      
      {/* شريط التفاعلات مباشرة من الصفحة الرئيسية */}
      <div className="px-5 pb-3 pt-3 border-t border-gray-200/60 dark:border-gray-700/40 bg-gradient-to-r from-amber-50/50 via-amber-50/80 to-amber-50/50 dark:from-amber-900/5 dark:via-amber-800/10 dark:to-amber-900/5">
        <ReactionsBar 
          postId={id} 
          nickname={author.nickname}
          onReaction={(type, added) => {
            console.log(`تفاعل ${type} ${added ? 'مضاف' : 'محذوف'} للمنشور: ${id}`);
          }}
        />
      </div>
      
      {/* زر "عرض كامل" */}
      <div className="px-4 pb-4 pt-2 text-center">
        <Link 
          href={`/blog/${slug}`}
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium py-2 px-4 rounded-full transition-colors w-full"
        >
          عرض كامل
        </Link>
      </div>
    </div>
  );
};

export default PostCardWithReactions;