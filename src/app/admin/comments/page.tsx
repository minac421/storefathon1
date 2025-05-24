"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface AuthorInfo {
  userId?: string;
  name: string;
  avatar?: string;
  isVerified?: boolean;
}

interface Comment {
  _id: string;
  postId: string;
  postTitle?: string;
  content: string;
  author: AuthorInfo;
  createdAt: string;
  isApproved: boolean;
  likes: string[];
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const res = await fetch('/api/blog/comments?includeUnapproved=true');
        if (!res.ok) {
          throw new Error('فشل في جلب التعليقات');
        }
        const data = await res.json();
        setComments(data.comments);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('حدث خطأ أثناء تحميل التعليقات');
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  };

  const handleApprove = async (commentId: string) => {
    try {
      // في الإنتاج، سيتم تنفيذ الطلب الفعلي للـ API هنا
      // const res = await fetch(`/api/blog/comments/${commentId}/approve`, {
      //   method: 'PUT',
      // });
      
      // if (!res.ok) {
      //   throw new Error('فشل في الموافقة على التعليق');
      // }
      
      // تحديث حالة التعليق محليًا (لأغراض العرض)
      setComments(prevComments => 
        prevComments.map(comment => 
          comment._id === commentId 
            ? { ...comment, isApproved: true } 
            : comment
        )
      );
      
      setSuccessMessage('تم الموافقة على التعليق بنجاح');
      
      // إخفاء رسالة النجاح بعد 3 ثوانٍ
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error approving comment:', err);
      setError('حدث خطأ أثناء الموافقة على التعليق');
      
      // إخفاء رسالة الخطأ بعد 3 ثوانٍ
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm('هل أنت متأكد من رغبتك في حذف هذا التعليق؟')) {
      return;
    }
    
    try {
      // في الإنتاج، سيتم تنفيذ الطلب الفعلي للـ API هنا
      // const res = await fetch(`/api/blog/comments/${commentId}`, {
      //   method: 'DELETE',
      // });
      
      // if (!res.ok) {
      //   throw new Error('فشل في حذف التعليق');
      // }
      
      // إزالة التعليق من القائمة المحلية
      setComments(prevComments => 
        prevComments.filter(comment => comment._id !== commentId)
      );
      
      setSuccessMessage('تم حذف التعليق بنجاح');
      
      // إخفاء رسالة النجاح بعد 3 ثوانٍ
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('حدث خطأ أثناء حذف التعليق');
      
      // إخفاء رسالة الخطأ بعد 3 ثوانٍ
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mb-4"></div>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">جاري تحميل التعليقات...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">إدارة التعليقات</h1>
            <Link href="/admin" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-sm">
              العودة للوحة التحكم
            </Link>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">مراجعة والموافقة على تعليقات المستخدمين</p>
        </header>
        
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* جميع التعليقات */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 rtl:ml-0 rtl:mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            جميع التعليقات
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {comments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        التعليق
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        المقال
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        الكاتب
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        التاريخ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {comments.map((comment) => (
                      <tr key={comment._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-normal max-w-xs">
                          <div className="text-sm text-gray-900 dark:text-gray-100">{comment.content}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link href={`/blog/${comment.postId}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            {comment.postTitle || 'عرض المقال'}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100 flex items-center">
                            {comment.author.name}
                            {comment.author.isVerified && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812a3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812a3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(comment.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDelete(comment._id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 border border-red-600 dark:border-red-400 rounded-md"
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                لا توجد تعليقات بعد
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
