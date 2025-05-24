"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogCategory } from '@/types/blog';

// نموذج بيانات المقال
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  category: string;
  author: string | {
    name: string;
    avatar?: string;
    isVerified?: boolean;
    _id?: string;
    userId?: string;
    bio?: string;
    contactInfo?: any;
    isFeatured?: boolean;
  } | null;
  views: number;
  isPublished: boolean;
  isApproved?: boolean;
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
  featuredImage?: string;
  metaDescription?: string;
  // حقل id اختياري للتوافق مع الكود الحالي
  id?: string;
}

// نموذج معلومات التصفح
interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ترجمة فئات المقالات لعرضها بالعربية
const categoryTranslations: Record<string, string> = {
  [BlogCategory.GUIDE]: 'دليل اللاعبين',
  [BlogCategory.NEWS]: 'أخبار اللعبة',
  [BlogCategory.TIPS]: 'نصائح وحيل',
  [BlogCategory.ANALYSIS]: 'تحليلات وتقييمات',
  [BlogCategory.MARKET]: 'أخبار السوق',
};

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // استرجاع المقالات من API
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        
        // بناء عنوان URL مع معلمات التصفية لعرض المنشورات غير المنشورة
        const url = `/api/blog?page=${pagination.page}&limit=${pagination.limit}&includeUnpublished=true`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`خطأ في الاتصال: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data.posts);
        setPagination(data.pagination);
      } catch (err) {
        console.error('خطأ في تحميل المقالات:', err);
        setError('حدث خطأ أثناء تحميل المقالات. يرجى المحاولة مرة أخرى.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPosts();
  }, [pagination.page, pagination.limit]);
  
  // تغيير الصفحة الحالية
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };
  
  // تنسيق التاريخ للعرض
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // التأكيد على حذف مقال
  const confirmDelete = (id: string) => {
    setSelectedPostId(id);
    setIsDeleting(true);
  };
  
  // إلغاء عملية الحذف
  const cancelDelete = () => {
    setSelectedPostId(null);
    setIsDeleting(false);
  };
  
  // حذف المقال
  const deletePost = async () => {
    if (!selectedPostId) return;
    
    try {
      const response = await fetch(`/api/blog?id=${selectedPostId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`خطأ في الاتصال: ${response.status}`);
      }
      
      // تحديث قائمة المقالات بعد الحذف
      setPosts(posts.filter(post => post.id !== selectedPostId));
      setIsDeleting(false);
      setSelectedPostId(null);
      
      // عرض رسالة نجاح
      setSuccessMessage('تم حذف المقال بنجاح');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('خطأ في حذف المقال:', err);
      setError('حدث خطأ أثناء حذف المقال. يرجى المحاولة مرة أخرى.');
      setTimeout(() => setError(null), 3000);
    }
  };
  
  // الموافقة على مقال ونشره
  const approvePost = async (postId: string) => {
    console.log('بدء الموافقة على المقال:', postId);
    setIsApproving(true);
    setSelectedPostId(postId);
    
    try {
      const requestBody = { 
        id: postId,
        isPublished: true,
        isApproved: true
      };
      
      console.log('إرسال طلب PUT إلى /api/blog:', JSON.stringify(requestBody, null, 2));
      
      // إرسال معرف المقال في جسم الطلب
      const response = await fetch('/api/blog', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      const responseData = await response.json().catch(() => ({}));
      console.log('استجابة الخادم:', { status: response.status, data: responseData });
      
      if (!response.ok) {
        throw new Error(responseData.error || `خطأ في الاتصال: ${response.status}`);
      }
      
      // تحديث حالة المقال محليًا
      setPosts(posts.map(post => 
        post._id === postId ? { 
          ...post, 
          isPublished: true,
          isApproved: true 
        } : post
      ));
      
      // عرض رسالة نجاح
      setSuccessMessage('تمت الموافقة على المقال ونشره بنجاح');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('خطأ في الموافقة على المقال:', err);
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير معروف';
      setError(`حدث خطأ أثناء الموافقة على المقال: ${errorMessage}`);
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsApproving(false);
      setSelectedPostId(null);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">إدارة المدونة</h1>
        <Link 
          href="/admin/blog/new"
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          مقال جديد
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
          {successMessage}
        </div>
      )}
      
      {isLoading ? (
        // حالة التحميل
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل المقالات...</p>
        </div>
      ) : posts.length === 0 ? (
        // لا توجد مقالات
        <div className="text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">لا توجد مقالات</h2>
          <p className="text-gray-600 mb-4">أضف مقالات جديدة لتظهر هنا</p>
          <Link 
            href="/admin/blog/new"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg inline-block"
          >
            إضافة مقال جديد
          </Link>
        </div>
      ) : (
        // جدول المقالات
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العنوان
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الفئة
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الكاتب
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المشاهدات
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاريخ النشر
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post, index) => (
                <tr key={`post-${post.id}-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      {categoryTranslations[post.category] || post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {!post.author 
                        ? 'غير معروف'
                        : typeof post.author === 'string' 
                          ? post.author 
                          : post.author?.name || 'مستخدم'
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(post.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      post.isPublished 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.isPublished ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-900"
                        target="_blank"
                      >
                        عرض
                      </Link>
                      <Link
                        href={`/admin/blog/new?edit=true&id=${post._id}`}
                        className="text-amber-600 hover:text-amber-900"
                      >
                        تعديل
                      </Link>
                      {!post.isPublished && (
                        <button
                          onClick={() => approvePost(post._id || '')}
                          className="text-green-600 hover:text-green-900"
                          disabled={isApproving && selectedPostId === post._id}
                        >
                          {isApproving && selectedPostId === post._id ? 'جاري...' : 'نشر'}
                        </button>
                      )}
                      <button
                        onClick={() => confirmDelete(post._id || '')}
                        className="text-red-600 hover:text-red-900"
                        disabled={isDeleting && selectedPostId === post._id}
                      >
                        {isDeleting && selectedPostId === post._id ? 'جاري...' : 'حذف'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* أزرار التصفح */}
      {!isLoading && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px rtl:space-x-reverse" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                pagination.page === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-amber-50'
              } text-sm font-medium`}
            >
              السابق
            </button>
            
            {Array.from({ length: pagination.totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    pagination.page === pageNumber
                      ? 'bg-amber-600 text-white font-bold'
                      : 'bg-white text-gray-700 hover:bg-amber-50'
                  } text-sm`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                pagination.page === pagination.totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-amber-50'
              } text-sm font-medium`}
            >
              التالي
            </button>
          </nav>
        </div>
      )}
      
      {/* مربع حوار تأكيد الحذف */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">تأكيد الحذف</h3>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد من رغبتك في حذف هذا المقال؟ لا يمكن التراجع عن هذه العملية.
            </p>
            <div className="flex justify-end space-x-2 rtl:space-x-reverse">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                إلغاء
              </button>
              <button
                onClick={deletePost}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
