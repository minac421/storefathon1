"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discordId: '',
    gameId: '',
    orderType: 'resources',
    details: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // معالجة تغيير قيم النموذج
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // معالجة إرسال النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من البيانات
    if (!formData.name || !formData.email || !formData.discordId || !formData.gameId || !formData.details) {
      alert('جميع الحقول المطلوبة يجب ملئها!');
      return;
    }
    
    setIsSubmitting(true);
    
    // محاكاة عملية الإرسال
    setTimeout(() => {
      setFormSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };
  
  if (formSubmitted) {
    return (
      <div className="py-12 rtl">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-6">تم استلام طلبك بنجاح!</h2>
          <p className="mb-8 text-gray-600">
            سيتم مراجعة طلبك وسنتواصل معك قريبًا على بريدك الإلكتروني {formData.email} أو حساب Discord الخاص بك.
          </p>
          <Link
            href="/services"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12 rtl">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text inline-block">
          طلب خدمة مخصصة
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          قم بتقديم طلب للحصول على خدمة مخصصة حسب احتياجاتك الفريدة في اللعبة
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  البريد الإلكتروني*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  معرف Discord*
                </label>
                <input
                  type="text"
                  name="discordId"
                  value={formData.discordId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="username#1234"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  معرف اللعبة*
                </label>
                <input
                  type="text"
                  name="gameId"
                  value={formData.gameId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نوع الطلب*
                </label>
                <select
                  name="orderType"
                  value={formData.orderType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="resources">موارد مخصصة</option>
                  <option value="bots">بوت مخصص</option>
                  <option value="event">فعالية مخصصة</option>
                  <option value="castle">قلعة مخصصة</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الميزانية المتوقعة (USD)
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثال: 100-200"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تفاصيل الطلب*
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                  placeholder="يرجى تقديم وصف تفصيلي لما تحتاجه بالضبط..."
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg font-medium disabled:bg-blue-400"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-xl font-bold mb-4">ملاحظات هامة:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 me-2">•</span>
              <span>سيتم مراجعة طلبك ومعاينته بعناية من قبل فريقنا.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 me-2">•</span>
              <span>سنقوم بالتواصل معك خلال 24 ساعة لمناقشة تفاصيل الطلب والسعر النهائي.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 me-2">•</span>
              <span>يتم تحديد السعر النهائي بناءً على تعقيد الطلب والوقت المطلوب للتنفيذ.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 me-2">•</span>
              <span>إذا كان لديك أي استفسارات، يمكنك التواصل معنا مباشرة عبر Discord: ConquerorsSupport#1234</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 