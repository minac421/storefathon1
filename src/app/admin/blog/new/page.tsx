"use client";

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BlogCategory } from '@/types/blog';

// مكون إدخال النص المنسق
const RichTextEditor = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  // وظيفة بسيطة لإضافة عناصر HTML
  const applyFormatting = (tag: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (!selectedText) return;
    
    // إنشاء العنصر الجديد
    const newElement = document.createElement(tag);
    newElement.textContent = selectedText;
    
    // استبدال النص المحدد بالعنصر الجديد
    range.deleteContents();
    range.insertNode(newElement);
    
    // إرسال المحتوى المحدث
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="bg-gray-100 p-2 flex gap-2 border-b border-gray-300">
        <button
          type="button"
          onClick={() => applyFormatting('h2')}
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="عنوان رئيسي"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => applyFormatting('h3')}
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="عنوان فرعي"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => applyFormatting('p')}
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="فقرة"
        >
          P
        </button>
        <button
          type="button"
          onClick={() => applyFormatting('strong')}
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 font-bold"
          title="غامق"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => applyFormatting('em')}
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 italic"
          title="مائل"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => applyFormatting('u')}
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 underline"
          title="تحته خط"
        >
          U
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="p-4 min-h-[300px] focus:outline-none"
        dir="rtl"
      />
    </div>
  );
};

// مكون البلوج بوست داخلي مع استخدام useSearchParams
function BlogPostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const id = searchParams.get('id');
  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: BlogCategory.NEWS,
    featuredImage: '',
    author: 'فريق الفاتحون',
    tags: '',
    isPublished: false // المقالات الجديدة تتطلب موافقة قبل النشر
  });
  const [isLoading, setIsLoading] = useState<boolean>(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // استرجاع بيانات المقال عند تحميل الصفحة في وضع التحرير
  useEffect(() => {
    const loadPost = async () => {
      if (!isEditMode || !id) return;
      
      try {
        setIsLoading(true);
        
        const response = await fetch(`/api/blog?id=${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            router.push('/admin/blog');
            return;
          }
          throw new Error(`خطأ في الاتصال: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.post) {
          const post = data.post;
          
          setFormData({
            title: post.title || '',
            summary: post.summary || '',
            content: post.content || '',
            category: post.category || BlogCategory.NEWS,
            featuredImage: post.featuredImage || '',
            author: post.author || '',
            tags: post.tags?.join(', ') || '',
            isPublished: post.isPublished !== undefined ? post.isPublished : true,
          });
        } else {
          router.push('/admin/blog');
        }
      } catch (err) {
        console.error('خطأ في تحميل المقال:', err);
        setError('حدث خطأ أثناء تحميل المقال. يرجى المحاولة مرة أخرى.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPost();
  }, [id, isEditMode, router]);
  
  // تغيير قيمة الحقل
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // تغيير محتوى المقال
  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };
  
  // إرسال النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // تحويل الوسوم إلى مصفوفة
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
      
      // إنشاء كائن البيانات للإرسال
      const postData: {
        title: string;
        summary: string;
        content: string;
        category: string;
        featuredImage: string;
        author: string;
        tags: string[];
        isPublished: boolean;
        id?: string; // الآن يمكن إضافة معرف اختياري
      } = {
        ...formData,
        tags
      };
      
      // إضافة معرف المقال في حالة التحرير
      if (isEditMode && id) {
        postData.id = id;
      }
      
      // إرسال البيانات إلى API
      const response = await fetch('/api/blog', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        throw new Error(`خطأ في الاتصال: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // التوجيه إلى صفحة إدارة المدونة
        router.push('/admin/blog');
      } else {
        throw new Error(data.error || 'حدث خطأ أثناء حفظ المقال');
      }
    } catch (err) {
      console.error('خطأ في إنشاء المقال:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء حفظ المقال. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{isEditMode ? 'تعديل المقال' : 'مقال جديد'}</h1>
        <Link 
          href="/admin/blog"
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          العودة
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* عنوان المقال */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                عنوان المقال <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="أدخل عنوان المقال"
              />
            </div>
            
            {/* ملخص المقال */}
            <div className="md:col-span-2">
              <label htmlFor="summary" className="block text-gray-700 font-medium mb-2">
                ملخص المقال <span className="text-red-500">*</span>
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="اكتب ملخصًا قصيرًا للمقال (لا يزيد عن 300 حرف)"
                maxLength={300}
              />
            </div>
            
            {/* فئة المقال */}
            <div>
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                الفئة <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {Object.entries(BlogCategory).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value === BlogCategory.GUIDE && 'دليل اللاعبين'}
                    {value === BlogCategory.NEWS && 'أخبار اللعبة'}
                    {value === BlogCategory.TIPS && 'نصائح وحيل'}
                    {value === BlogCategory.ANALYSIS && 'تحليلات وتقييمات'}
                    {value === BlogCategory.MARKET && 'أخبار السوق'}
                  </option>
                ))}
              </select>
            </div>
            
            {/* اسم الكاتب */}
            <div>
              <label htmlFor="author" className="block text-gray-700 font-medium mb-2">
                الكاتب
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="اسم الكاتب"
              />
            </div>
            
            {/* رابط الصورة */}
            <div className="md:col-span-2">
              <label htmlFor="featuredImage" className="block text-gray-700 font-medium mb-2">
                رابط الصورة المصغرة <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="featuredImage"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="أدخل رابط الصورة (مثال: https://example.com/image.jpg)"
              />
            </div>
            
            {/* الوسوم */}
            <div className="md:col-span-2">
              <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
                الوسوم (مفصولة بفواصل)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="مثال: قلاع, هيبة, أبطال"
              />
              <p className="mt-1 text-sm text-gray-500">أدخل الوسوم مفصولة بفواصل</p>
            </div>
            
            {/* حالة النشر */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublished" className="mr-2 block text-gray-700">
                  نشر المقال
                </label>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                إذا لم يتم تحديد هذا الخيار، سيتم حفظ المقال كمسودة ولن يظهر للزوار
              </p>
            </div>
            
            {/* محتوى المقال */}
            <div className="md:col-span-2">
              <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                محتوى المقال <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={handleContentChange}
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4 rtl:space-x-reverse">
            <Link
              href="/admin/blog"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              إلغاء
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'جاري الحفظ...' : isEditMode ? 'حفظ التغييرات' : 'حفظ المقال'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// مكون الصفحة الرئيسي
export default function BlogPostPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-8 text-center">جاري التحميل...</div>}>
      <BlogPostContent />
    </Suspense>
  );
}
