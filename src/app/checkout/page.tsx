"use client";

import React, { useState, useRef } from 'react';
import { useCart } from '@/components/cart/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  // استخدام useCart وrouter للتنقل
  const { cartItems, removeItem, clearCart } = useCart();
  const router = useRouter();
  
  // مراجع للصور
  const coordImageRef = useRef<HTMLInputElement>(null);
  const nameImageRef = useRef<HTMLInputElement>(null);
  
  // بيانات النموذج - تم تحديثها لتناسب احتياجات لعبة الفاتحون
  const [formData, setFormData] = useState({
    playerName: '',        // اسم اللاعب
    kingdomNumber: '',     // رقم المملكة
    contactMethod: 'telegram',  // طريقة التواصل المفضلة
    contactInfo: '',       // معلومات الاتصال (رقم واتساب أو معرف تلجرام)
    notes: '',             // ملاحظات إضافية
    paymentMethod: 'paypal' // طريقة الدفع المفضلة
  });
  
  // بيانات الصور
  const [coordImage, setCoordImage] = useState<File | null>(null);
  const [nameImage, setNameImage] = useState<File | null>(null);
  
  // معاينة الصور
  const [coordImagePreview, setCoordImagePreview] = useState<string | null>(null);
  const [nameImagePreview, setNameImagePreview] = useState<string | null>(null);
  
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // حساب السعر الإجمالي
  const totalPrice = cartItems.reduce((total, item) => 
    total + (item.price * (item.quantity || 1)), 0);
  
  // التحقق من صحة البيانات
  const validateStep1 = () => {
    if (!formData.playerName || !formData.kingdomNumber || !formData.contactInfo) {
      alert('جميع الحقول المميزة بعلامة (*) مطلوبة!');
      return false;
    }
    if (!coordImage) {
      alert('يرجى رفع صورة للإحداثيات!');
      return false;
    }
    return true;
  };
  
  // معالجة تغيير قيم النموذج
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // معالجة رفع الصور
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'coord' | 'name') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (type === 'coord') {
          setCoordImage(file);
          setCoordImagePreview(event.target?.result as string);
        } else {
          setNameImage(file);
          setNameImagePreview(event.target?.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  // الانتقال للخطوة التالية
  const handleNextStep = () => {
    if (validateStep1()) {
      setFormStep(2);
    }
  };
  
  // الانتقال للخطوة السابقة
  const handlePrevStep = () => {
    setFormStep(1);
  };
  
  // معالجة إرسال الطلب
  const handleSubmit = async () => {
    if (cartItems.length === 0) {
      alert('سلة التسوق فارغة!');
      return;
    }
    
    if (!validateStep1()) return;
    
    setIsSubmitting(true);
    
    try {
      // التحقق من وجود البيانات الأساسية
      if (!formData.playerName || !formData.kingdomNumber || !formData.contactInfo) {
        throw new Error('معلومات اللاعب غير مكتملة');
      }
      
      // حساب السعر الإجمالي مرة أخرى للتأكد
      const calculatedTotalPrice = cartItems.reduce((total, item) => 
        total + (item.price * (item.quantity || 1)), 0);
      
      // تحضير بيانات الطلب
      const orderData = {
        customer: {
          name: formData.playerName,
          email: `${formData.playerName}@kingdom.com`,
          phone: formData.contactInfo,
          address: `Kingdom ${formData.kingdomNumber}`,
          city: `Kingdom ${formData.kingdomNumber}`,
          notes: formData.notes || '',
          paymentMethod: formData.paymentMethod
        },
        items: cartItems.map(item => {
          // التأكد من صحة نوع الفئة
          let validCategory = item.category || 'resources';
          const validCategories = ['resources', 'bots', 'castle', 'events', 'packages'];
          if (!validCategories.includes(validCategory)) {
            validCategory = 'resources'; // استخدام قيمة افتراضية صحيحة
          }
          
          return {
            id: item.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            name: item.name || 'منتج',
            price: item.price || 0,
            icon: item.icon || '/images/default-icon.png',
          quantity: item.quantity || 1,
            category: validCategory
          };
        }),
        totalPrice: calculatedTotalPrice,
        images: {
          coordImageUrl: null,
          nameImageUrl: null
        }
      };

      console.log('بيانات الطلب المراد إرسالها:', JSON.stringify(orderData, null, 2));

      // التحقق من اكتمال البيانات الأساسية
      if (!orderData.customer || !orderData.items || !orderData.items.length || orderData.totalPrice === undefined) {
        throw new Error('بيانات الطلب غير مكتملة');
      }

      // إرسال الطلب إلى API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      // التحقق من نجاح الاستجابة
      if (!response.ok) {
        const errorText = await response.text();
        console.error('نص الخطأ الأصلي:', errorText);
        
        let errorData: Record<string, any> = {};
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          console.error('فشل تحليل استجابة الخطأ كـ JSON:', e);
        }
        
        console.error('خطأ في استجابة API:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        
        throw new Error(
          errorData?.error || 
          errorData?.message || 
          `حدث خطأ أثناء معالجة طلبك (${response.status})`
        );
      }

      const result = await response.json();
      console.log('استجابة API:', result);
      
      if (!result.success) {
        throw new Error(result.error || 'فشل في إنشاء الطلب');
      }
      
      // إذا كان هناك صورة، قم برفعها
      if (coordImage || nameImage) {
        try {
          const formData = new FormData();
          const orderId = result.id;
          
          if (!orderId) {
            throw new Error('لم يتم العثور على معرف الطلب');
          }
          
          console.log(`معرف الطلب المستخدم لرفع الصور: ${orderId}`);
          
          formData.append('orderId', orderId);
          
          if (coordImage) {
            formData.append('coordImage', coordImage);
          }
          
          if (nameImage) {
            formData.append('nameImage', nameImage);
          }
          
          const uploadResponse = await fetch('/api/orders/upload-images', {
            method: 'POST',
            body: formData
          });
          
          if (!uploadResponse.ok) {
            const uploadError = await uploadResponse.json();
            throw new Error(uploadError.error || 'حدث خطأ أثناء رفع الصور');
          }
          
          const uploadResult = await uploadResponse.json();
          console.log('نتيجة رفع الصور:', uploadResult);
          
        } catch (uploadError) {
          console.error('خطأ في رفع الصور:', uploadError);
          alert('تم إنشاء الطلب، لكن هناك مشكلة في رفع الصور. سيتم التواصل معك قريبًا.');
        }
      }
      
      setOrderNumber(result.orderNumber);
      setOrderComplete(true);
      clearCart();
      
    } catch (error) {
      console.error('خطأ أثناء إرسال الطلب:', error);
      alert(error instanceof Error ? error.message : 'حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // عنصر النص المترجم
  const getLocalizedText = (key: string) => {
    const texts: Record<string, string> = {
      'checkout': 'إتمام الطلب',
      'cart_empty': 'سلة التسوق فارغة',
      'continue_shopping': 'مواصلة التسوق',
      'player_info': 'معلومات اللاعب',
      'order_summary': 'ملخص الطلب',
      'payment': 'الدفع',
      'total': 'المجموع',
      'submit_order': 'إرسال الطلب',
      'order_complete': 'تم استلام طلبك بنجاح!',
      'order_number': 'رقم الطلب',
      'contact_soon': 'سيتم التواصل معك قريباً',
      'back': 'رجوع'
    };
    
    return texts[key] || key;
  };

  // إذا كانت السلة فارغة وليس في مرحلة إكمال الطلب، عرض رسالة وزر للرجوع للتسوق
  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen py-12 rtl relative">
        {/* صورة الخلفية */}
        <div className="absolute inset-0 overflow-hidden bg-cover bg-center z-0" 
             style={{ backgroundImage: 'url("/bg244_LE_upscale_balanced_x4.jpg")', opacity: 0.15 }}>
        </div>
        
        {/* القسم الرئيسي */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl font-bold mb-8 text-center text-amber-800">
            <span className="inline-block border-b-4 border-amber-400 pb-2">{getLocalizedText('checkout')}</span>
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-amber-700">{getLocalizedText('cart_empty')}</h2>
            <p className="mb-6 text-gray-600">أضف بعض الخدمات إلى سلة التسوق أولاً</p>
            
            <Link href="/services">
              <span className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200">
                {getLocalizedText('continue_shopping')}
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // إذا اكتمل الطلب، عرض رسالة النجاح
  if (orderComplete) {
    return (
      <div className="min-h-screen py-12 rtl relative">
        {/* صورة الخلفية */}
        <div className="absolute inset-0 overflow-hidden bg-cover bg-center z-0" 
             style={{ backgroundImage: 'url("/bg244_LE_upscale_balanced_x4.jpg")', opacity: 0.15 }}>
        </div>
        
        {/* القسم الرئيسي */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl font-bold mb-8 text-center text-amber-800">
            <span className="inline-block border-b-4 border-amber-400 pb-2">{getLocalizedText('checkout')}</span>
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-6 text-green-600">{getLocalizedText('order_complete')}</h2>
            <p className="mb-4 text-lg text-gray-700">
              {getLocalizedText('order_number')}: <span className="font-bold">{orderNumber}</span>
            </p>
            <p className="mb-6 text-gray-600">{getLocalizedText('contact_soon')}</p>
            
            <Link href="/">
              <span className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200">
                العودة للرئيسية
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 rtl relative">
      {/* صورة الخلفية */}
      <div className="absolute inset-0 overflow-hidden bg-cover bg-center z-0" 
           style={{ backgroundImage: 'url("/bg244_LE_upscale_balanced_x4.jpg")', opacity: 0.15 }}>
      </div>
      
      {/* القسم الرئيسي */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-amber-800">
          <span className="inline-block border-b-4 border-amber-400 pb-2">{getLocalizedText('checkout')}</span>
        </h1>
        
        {/* خطوات إتمام الطلب */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${formStep === 1 ? 'bg-amber-500 text-white' : 'bg-amber-200 text-amber-700'} font-bold`}>1</div>
            <div className="text-sm font-medium mr-2">{getLocalizedText('player_info')}</div>
          </div>
          
          <div className="w-16 h-1 mx-2 bg-gray-200"></div>
          
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${formStep === 2 ? 'bg-amber-500 text-white' : 'bg-amber-200 text-amber-700'} font-bold`}>2</div>
            <div className="text-sm font-medium mr-2">{getLocalizedText('payment')}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* النموذج - معلومات اللاعب */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              {formStep === 1 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b border-amber-200 text-amber-800">{getLocalizedText('player_info')}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-1">اسم اللاعب *</label>
                      <input
                        type="text"
                        id="playerName"
                        name="playerName"
                        value={formData.playerName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="أدخل اسم اللاعب الخاص بك"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="kingdomNumber" className="block text-sm font-medium text-gray-700 mb-1">رقم المملكة *</label>
                      <input
                        type="text"
                        id="kingdomNumber"
                        name="kingdomNumber"
                        value={formData.kingdomNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="أدخل رقم مملكتك"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-1">طريقة التواصل المفضلة *</label>
                    <select
                      id="contactMethod"
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="telegram">تلجرام</option>
                      <option value="whatsapp">واتساب</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">معلومات التواصل *</label>
                    <input
                      type="text"
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder={formData.contactMethod === 'telegram' ? 'أدخل معرف التلجرام الخاص بك' : 'أدخل رقم الواتساب الخاص بك'}
                      required
                    />
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 pb-2 border-b border-amber-200 text-amber-800">صور اللعبة</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="mb-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">صورة الإحداثيات *</label>
                          <div 
                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-amber-400 transition duration-200"
                            onClick={() => coordImageRef.current?.click()}
                          >
                            {coordImagePreview ? (
                              <img src={coordImagePreview} alt="معاينة صورة الإحداثيات" className="max-h-40 mx-auto" />
                            ) : (
                              <div className="py-4">
                                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <p className="text-sm text-gray-500 mt-2">انقر لاختيار صورة الإحداثيات</p>
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            ref={coordImageRef}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'coord')}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">صورة الاسم (اختياري)</label>
                          <div 
                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-amber-400 transition duration-200"
                            onClick={() => nameImageRef.current?.click()}
                          >
                            {nameImagePreview ? (
                              <img src={nameImagePreview} alt="معاينة صورة الاسم" className="max-h-40 mx-auto" />
                            ) : (
                              <div className="py-4">
                                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <p className="text-sm text-gray-500 mt-2">انقر لاختيار صورة الاسم</p>
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            ref={nameImageRef}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'name')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">ملاحظات إضافية</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 h-32"
                      placeholder="أي ملاحظات إضافية تريد إضافتها للطلب"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
                      onClick={handleNextStep}
                    >
                      التالي
                    </button>
                  </div>
                </div>
              )}
              
              {formStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b border-amber-200 text-amber-800">{getLocalizedText('payment')}</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">اختر طريقة الدفع</label>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="paypal" 
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          className="w-4 h-4 text-amber-600"
                        />
                        <label htmlFor="paypal" className="mr-2 text-gray-700">PayPal</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="bankTransfer" 
                          name="paymentMethod"
                          value="bankTransfer"
                          checked={formData.paymentMethod === 'bankTransfer'}
                          onChange={handleChange}
                          className="w-4 h-4 text-amber-600"
                        />
                        <label htmlFor="bankTransfer" className="mr-2 text-gray-700">تحويل بنكي</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="crypto" 
                          name="paymentMethod"
                          value="crypto"
                          checked={formData.paymentMethod === 'crypto'}
                          onChange={handleChange}
                          className="w-4 h-4 text-amber-600"
                        />
                        <label htmlFor="crypto" className="mr-2 text-gray-700">عملات رقمية</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mb-6">
                    <p className="text-amber-800">
                      بعد اكتمال الطلب، سيتم التواصل معك من خلال {formData.contactMethod === 'telegram' ? 'تلجرام' : 'واتساب'} لإكمال عملية الدفع وتنفيذ الطلب.
                    </p>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg transition duration-200"
                      onClick={handlePrevStep}
                    >
                      {getLocalizedText('back')}
                    </button>
                    
                    <button
                      type="button"
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          جاري معالجة الطلب...
                        </span>
                      ) : (
                        getLocalizedText('submit_order')
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* ملخص الطلب */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-amber-200 text-amber-800">{getLocalizedText('order_summary')}</h2>
              
              {cartItems.length === 0 ? (
                <p className="text-gray-500 mb-4">{getLocalizedText('cart_empty')}</p>
              ) : (
                <div className="mb-4 max-h-96 overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">الكمية: {item.quantity || 1}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold text-amber-600 ml-4">{item.price} $</span>
                        <button
                          onClick={() => removeItem(item.id || item.name, item.category || 'default')}
                          className="text-red-500 hover:text-red-700"
                          aria-label="إزالة"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="py-4 border-t border-gray-200">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>{getLocalizedText('total')}:</span>
                  <span className="text-amber-600">{totalPrice.toFixed(2)} $</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
