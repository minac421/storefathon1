"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

interface Author {
  userId?: string;
  name: string;
  avatar?: string;
  isVerified?: boolean;
}

export interface CommentType {
  id: string;
  postId: string;
  content: string;
  userId: string;
  username: string;
  displayName: string;
  createdAt: string;
  likes: string[];
  replies?: CommentReplyType[];
}

export interface CommentReplyType {
  id: string;
  commentId: string;
  content: string;
  userId: string;
  username: string;
  displayName: string;
  createdAt: string;
  likes: string[];
}

interface CommentSectionProps {
  postId: string;
  comments: CommentType[];
  currentUserId?: string;
  locale?: string;
  onCommentAdded?: (comment: CommentType) => void;
  onReplyAdded?: (commentId: string, reply: CommentReplyType) => void;
  onCommentLiked?: (commentId: string) => void;
  onReplyLiked?: (commentId: string, replyId: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  currentUserId = 'guest-user',
  locale = 'ar',
  onCommentAdded,
  onReplyAdded,
  onCommentLiked,
  onReplyLiked
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // تنسيق التاريخ النسبي (منذ ...)
  const formatRelativeTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true,
        locale: locale === 'ar' ? ar : enUS
      });
    } catch (err) {
      console.error("Error formatting date:", err);
      return "غير معروف";
    }
  };
  
  // إضافة تعليق جديد
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setError('الرجاء كتابة تعليق قبل الإرسال');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/blog/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'comment',
          postId,
          userId: currentUserId,
          content: newComment
        }),
      });
      
      if (!response.ok) {
        throw new Error('فشل في إضافة التعليق');
      }
      
      const data = await response.json();
      
      if (data.success && data.comment) {
        setNewComment('');
        setSuccessMessage('تم إضافة تعليقك بنجاح');
        
        // إعلام الأب بإضافة التعليق
        if (onCommentAdded) {
          onCommentAdded(data.comment);
        }
        
        // إخفاء رسالة النجاح بعد فترة
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      setError('حدث خطأ أثناء إضافة التعليق. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // إضافة رد على تعليق
  const handleAddReply = async (commentId: string) => {
    if (!replyContent.trim()) {
      setError('الرجاء كتابة رد قبل الإرسال');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/blog/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'reply',
          postId,
          userId: currentUserId,
          commentId,
          content: replyContent
        }),
      });
      
      if (!response.ok) {
        throw new Error('فشل في إضافة الرد');
      }
      
      const data = await response.json();
      
      if (data.success && data.reply) {
        setReplyContent('');
        setReplyingTo(null);
        setSuccessMessage('تم إضافة ردك بنجاح');
        
        // إعلام الأب بإضافة الرد
        if (onReplyAdded) {
          onReplyAdded(commentId, data.reply);
        }
        
        // إخفاء رسالة النجاح بعد فترة
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (err) {
      console.error('Error submitting reply:', err);
      setError('حدث خطأ أثناء إضافة الرد. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // الإعجاب بتعليق
  const handleLikeComment = async (commentId: string) => {
    try {
      const response = await fetch('/api/blog/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'like-comment',
          postId,
          userId: currentUserId,
          commentId
        }),
      });
      
      if (!response.ok) {
        throw new Error('فشل في تسجيل الإعجاب');
      }
      
      if (onCommentLiked) {
        onCommentLiked(commentId);
      }
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };
  
  // الإعجاب برد
  const handleLikeReply = async (commentId: string, replyId: string) => {
    // يمكن إضافة منطق مشابه للإعجاب بالتعليقات
    if (onReplyLiked) {
      onReplyLiked(commentId, replyId);
    }
  };
  
  // التحقق مما إذا كان المستخدم قد أعجب بتعليق
  const hasUserLikedComment = (likes: string[]) => {
    return likes.includes(currentUserId);
  };
  
  return (
    <div className="bg-[#f8f0d8] rounded-lg shadow-lg p-6 mt-8 relative before:absolute before:inset-0 before:bg-[url('/images/bg233.png')] before:opacity-10 before:bg-cover before:bg-center before:mix-blend-multiply border-2 border-[#d9b77e]">
      <h3 className="text-xl font-bold mb-6 flex items-center text-amber-900 font-serif relative z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        التعليقات ({comments.length})
      </h3>
      
      {/* نموذج إضافة تعليق جديد */}
      <div className="bg-[#f8f0d8]/70 rounded-lg p-4 mb-8 border border-amber-800/20 relative z-10">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="أضف تعليقًا..."
          className="w-full border border-amber-700/30 bg-[#fff8e8] text-amber-950 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none font-serif"
          rows={3}
        />
        
        {error && (
          <div className="text-red-700 text-sm mt-2 font-serif">{error}</div>
        )}
        
        {successMessage && (
          <div className="text-green-700 text-sm mt-2 font-serif">{successMessage}</div>
        )}
        
        <div className="flex justify-end mt-3">
          <button
            onClick={handleAddComment}
            disabled={isSubmitting}
            className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-md flex items-center transition-colors disabled:opacity-50 font-serif"
          >
            {isSubmitting ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent ml-2"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            إرسال
          </button>
        </div>
      </div>
      
      {/* قائمة التعليقات */}
      {comments.length > 0 ? (
        <div className="space-y-6 relative z-10">
          {comments.map(comment => (
            <div key={comment.id} className="bg-[#fff8e8]/70 p-4 rounded-md border border-amber-800/20 transition-shadow transform hover:shadow-md">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-amber-100 border border-amber-200 mr-3 flex items-center justify-center">
                  {comment.username.charAt(0).toUpperCase()}
                    </div>
                <div>
                  <h4 className="font-semibold text-amber-900 font-serif">{comment.displayName || comment.username}</h4>
                  <p className="text-amber-800/70 text-sm font-serif">{formatRelativeTime(comment.createdAt)}</p>
                </div>
                </div>
                
              <p className="text-amber-950 mb-3 font-serif leading-relaxed">{comment.content}</p>
                  
              <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                  className={`flex items-center space-x-1 rtl:space-x-reverse text-sm ${hasUserLikedComment(comment.likes) ? 'text-amber-700' : 'text-amber-600/70 hover:text-amber-700'} transition-colors`}
                    >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={hasUserLikedComment(comment.likes) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                  <span className="font-serif">{comment.likes.length}</span>
                    </button>
                    
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="text-amber-600/70 hover:text-amber-700 text-sm flex items-center space-x-1 rtl:space-x-reverse transition-colors font-serif"
                    >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                  <span>رد</span>
                    </button>
                  </div>
                  
                  {/* نموذج إضافة رد */}
                  {replyingTo === comment.id && (
                <div className="mt-3 bg-[#f8f0d8]/80 rounded-lg p-3 border border-amber-700/20">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="اكتب ردك هنا..."
                    className="w-full border border-amber-700/30 bg-[#fff8e8] text-amber-950 rounded-lg p-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none font-serif"
                        rows={2}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <button
                          onClick={() => setReplyingTo(null)}
                      className="text-sm text-amber-700 hover:text-amber-800 font-serif"
                        >
                          إلغاء
                        </button>
                        <button
                          onClick={() => handleAddReply(comment.id)}
                          disabled={isSubmitting}
                      className="bg-amber-700 hover:bg-amber-800 text-white text-sm rounded-md px-3 py-1.5 transition-colors disabled:opacity-50 font-serif"
                        >
                      {isSubmitting ? (
                        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent ml-1"></span>
                      ) : null}
                      إرسال
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* الردود على التعليق */}
                  {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-4 pr-3 rtl:pr-0 rtl:pl-3 border-r-2 rtl:border-r-0 rtl:border-l-2 border-amber-700/30">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start space-x-3 rtl:space-x-reverse">
                          {/* صورة كاتب الرد */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-amber-100 border border-amber-200 flex items-center justify-center">
                        {reply.username.charAt(0).toUpperCase()}
                          </div>
                          
                          {/* محتوى الرد */}
                          <div className="flex-grow">
                            <div className="flex items-center">
                          <h5 className="font-semibold text-amber-900 text-sm font-serif">
                            {reply.displayName || reply.username}
                              </h5>
                          <span className="text-xs text-amber-800/70 mr-2 rtl:mr-0 rtl:ml-2 font-serif">
                                {formatRelativeTime(reply.createdAt)}
                              </span>
                            </div>
                        <p className="mt-1 text-amber-950 text-sm font-serif">{reply.content}</p>
                            
                            {/* أزرار التفاعل مع الرد */}
                            <button
                              onClick={() => handleLikeReply(comment.id, reply.id)}
                              className={`text-xs flex items-center mt-1 ${
                                hasUserLikedComment(reply.likes) 
                              ? 'text-amber-700' 
                              : 'text-amber-600/70 hover:text-amber-700'
                          } font-serif`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" 
                                fill={hasUserLikedComment(reply.likes) ? "currentColor" : "none"} 
                                viewBox="0 0 24 24" stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              {reply.likes.length > 0 && <span>{reply.likes.length}</span>}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-6 bg-[#fff8e8]/60 rounded-lg border border-amber-800/20 relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-amber-700/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <p className="text-amber-900 font-serif">لا توجد تعليقات بعد. كن أول من يعلق!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
