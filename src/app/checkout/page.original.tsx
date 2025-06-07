"use client";

import React, { useState, useRef } from 'react';
import { useCart } from '@/components/cart/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './checkout-styles.css';

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
    // التحقق من إدخال المعلومات الأساسية
    if (!formData.playerName || !formData.kingdomNumber || !formData.contactInfo) {
      alert('جميع الحقول المميزة بعلامة (*) مطلوبة!');
      return false;
    }
    
    // التحقق من صورة الإحداثيات
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('سلة التسوق فارغة!');
      return;
    }
    
    // التحقق من البيانات
    if (!validateStep1()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // تخزين بيانات الطلب في المتصفح لاستخدامها في الدردشة
    const orderDetails = {
      orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
      playerName: formData.playerName,
      kingdomNumber: formData.kingdomNumber,
      items: cartItems.map(item => `${item.name} (${item.quantity})`).join(', '),
      totalPrice: totalPrice,
      dateTime: new Date().toISOString()
    };
    
    // تخزين بيانات الطلب في التخزين المحلي
    localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));
    
    // محاكاة لعملية إرسال الطلب
    setTimeout(() => {
      setOrderNumber(orderDetails.orderId);
      setOrderComplete(true);
      clearCart();
      setIsSubmitting(false);
      
      // توجيه المستخدم إلى صفحة تفاصيل الطلب
      setTimeout(() => {
        // استخدام window.location للتأكد من عمل التوجيه بشكل صحيح
        window.location.href = '/order-details';
      }, 1500);
    }, 1500);
  };
  
  // نص مترجم
  const getLocalizedText = (key: string): string => {
    const translations: {[key: string]: {[key: string]: string}} = {
      'checkout': {
        'ar': 'إتمام الطلب',
        'en': 'Checkout',
        'tr': 'Ödeme'
      },
      'personalInfo': {
        'ar': 'المعلومات الشخصية',
        'en': 'Personal Information',
        'tr': 'Kişisel Bilgiler'
      },
      'name': {
        'ar': 'الاسم الكامل',
        'en': 'Full Name',
        'tr': 'Tam Ad'
      },
      'email': {
        'ar': 'البريد الإلكتروني',
        'en': 'Email',
        'tr': 'E-posta'
      },
      'discordId': {
        'ar': 'معرف Discord',
        'en': 'Discord ID',
        'tr': 'Discord ID'
      },
      'gameId': {
        'ar': 'معرف اللعبة',
        'en': 'Game ID',
        'tr': 'Oyun ID'
      },
      'paymentMethod': {
        'ar': 'طريقة الدفع',
        'en': 'Payment Method',
        'tr': 'Ödeme Yöntemi'
      },
      'paypal': {
        'ar': 'باي بال',
        'en': 'PayPal',
        'tr': 'PayPal'
      },
      'creditCard': {
        'ar': 'بطاقة ائتمان',
        'en': 'Credit Card',
        'tr': 'Kredi Kartı'
      },
      'notes': {
        'ar': 'ملاحظات إضافية',
        'en': 'Additional Notes',
        'tr': 'Ek Notlar'
      },
      'next': {
        'ar': 'التالي',
        'en': 'Next',
        'tr': 'İleri'
      },
      'back': {
        'ar': 'رجوع',
        'en': 'Back',
        'tr': 'Geri'
      },
      'orderSummary': {
        'ar': 'ملخص الطلب',
        'en': 'Order Summary',
        'tr': 'Sipariş Özeti'
      },
      'item': {
        'ar': 'المنتج',
        'en': 'Item',
        'tr': 'Ürün'
      },
      'quantity': {
        'ar': 'الكمية',
        'en': 'Quantity',
        'tr': 'Miktar'
      },
      'price': {
        'ar': 'السعر',
        'en': 'Price',
        'tr': 'Fiyat'
      },
      'total': {
        'ar': 'الإجمالي',
        'en': 'Total',
        'tr': 'Toplam'
      },
      'submitOrder': {
        'ar': 'تأكيد الطلب',
        'en': 'Submit Order',
        'tr': 'Siparişi Onayla'
      },
      'processing': {
        'ar': 'جاري المعالجة...',
        'en': 'Processing...',
        'tr': 'İşleniyor...'
      },
      'orderComplete': {
        'ar': 'تم إكمال الطلب بنجاح!',
        'en': 'Order Completed Successfully!',
        'tr': 'Sipariş Başarıyla Tamamlandı!'
      },
      'orderNumber': {
        'ar': 'رقم الطلب',
        'en': 'Order Number',
        'tr': 'Sipariş Numarası'
      },
      'orderConfirmation': {
        'ar': 'تم استلام طلبك وسيتم معالجته قريبًا. سيتم التواصل معك على بريدك الإلكتروني.',
        'en': 'Your order has been received and will be processed soon. You will be contacted via your email.',
        'tr': 'Siparişiniz alındı ve yakında işleme konulacak. E-posta yoluyla sizinle iletişime geçilecektir.'
      },
      'backToShopping': {
        'ar': 'العودة للتسوق',
        'en': 'Back to Shopping',
        'tr': 'Alışverişe Dön'
      },
      'emptyCart': {
        'ar': 'السلة فارغة',
        'en': 'Your cart is empty',
        'tr': 'Sepetiniz boş'
      },
      'continueShopping': {
        'ar': 'استمر في التسوق',
        'en': 'Continue Shopping',
        'tr': 'Alışverişe Devam Et'
      },
      'currency': {
        'ar': 'USD',
        'en': 'USD',
        'tr': 'USD'
      }
    };
    
    return translations[key]?.['ar'] || key;
  };
  
  // إذا اكتمل الطلب
  if (orderComplete) {
    return (
      <div className="py-12 rtl">
        {orderComplete && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-green-500 text-6xl mb-4">
              ✓
            </div>
            <h2 className="text-2xl font-bold mb-4">
              تم استلام طلبك بنجاح
            </h2>
            <p className="mb-2">
              رقم الطلب: <span className="font-bold">{orderNumber}</span>
            </p>
            <p className="mb-6 text-gray-600">
              تم استلام طلبك بنجاح! يُرجى الانتظار لحظات ليتم توجيهك إلى قسم الدردشة للتواصل مع المسؤول لإتمام الدفع وتنفيذ الطلب.
            </p>
            <div className="animate-pulse">
              <p className="text-blue-600">جاري تحويلك إلى صفحة الدردشة...</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 rtl">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-amber-800">
          <span className="inline-block border-b-4 border-amber-400 pb-2">{getLocalizedText('checkout')}</span>
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center border border-amber-100">
            <div className="text-6xl mb-6 text-amber-400">🛒</div>
            <p className="text-xl mb-6 text-amber-800">{getLocalizedText('emptyCart')}</p>
            <Link
              href="/services"
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg inline-block font-bold shadow-md hover:shadow-lg transform transition-transform hover:-translate-y-1 active:translate-y-0"
            >
              {getLocalizedText('continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* المعلومات الشخصية ونموذج الطلب */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-amber-100 hover:border-amber-200 transition-all">
                {formStep === 1 ? (
                  <div>
                    {/* بيانات اللاعب */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4 pb-2 border-b border-amber-200 text-amber-800">معلومات اللاعب</h3>
                      <div className="mb-6">
                        <label htmlFor="playerName" className="block mb-2 font-medium text-amber-900">
                          اسم اللاعب في اللعبة *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-amber-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="playerName"
                            name="playerName"
                            value={formData.playerName}
                            onChange={handleChange}
                            required
                            placeholder="أدخل اسمك كما يظهر في اللعبة"
                            className="w-full p-3 pr-10 border border-amber-200 focus:border-amber-500 rounded-lg focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-amber-50/30 placeholder-amber-300"
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="kingdomNumber" className="block mb-2 font-medium text-amber-900">
                          رقم المملكة *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-amber-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="kingdomNumber"
                            name="kingdomNumber"
                            value={formData.kingdomNumber}
                            onChange={handleChange}
                            required
                            placeholder="أدخل رقم مملكتك"
                            className="w-full p-3 pr-10 border border-amber-200 focus:border-amber-500 rounded-lg focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-amber-50/30 placeholder-amber-300"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="kingdomNumber" className="block mb-2 font-medium text-amber-900">
                        رقم المملكة *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-amber-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="kingdomNumber"
                          name="kingdomNumber"
                          value={formData.kingdomNumber}
                          onChange={handleChange}
                          required
                          placeholder="أدخل رقم مملكتك"
                          className="w-full p-3 pr-10 border border-amber-200 focus:border-amber-500 rounded-lg focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-amber-50/30 placeholder-amber-300"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* رفع صور اللعبة */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 pb-2 border-b border-amber-200 text-amber-800">صور اللعبة</h3>
                    <div className="mb-6">
                      <label className="block mb-2 font-medium text-amber-900">
                        صورة للإحداثيات *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative group">
                          <input
                            type="file"
                            id="coordImage"
                            name="coordImage"
                            ref={coordImageRef}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'coord')}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => coordImageRef.current?.click()}
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-3 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300 font-medium"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                            اختر صورة
                          </button>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 flex items-center">
                          {coordImage ? (
                            <div className="text-amber-800 font-medium overflow-hidden text-ellipsis">
                              <span className="inline-block bg-amber-200 w-6 h-6 rounded-full text-center mr-2 text-amber-700">✓</span>
                              {coordImage.name}
                            </div>
                          ) : (
                            <div className="text-amber-400 text-sm">
                              <span className="inline-block bg-amber-100 w-6 h-6 rounded-full text-center mr-2 text-amber-500">!</span>
                              لم يتم اختيار ملف (مطلوب)
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {coordImagePreview && (
                        <div className="mt-3 bg-white border border-amber-200 p-3 rounded-lg overflow-hidden">
                          <img 
                            src={coordImagePreview} 
                            alt="معاينة صورة الإحداثيات" 
                            className="max-h-60 object-contain mx-auto"
                          />
                        </div>
                      )}
                      
                      <div className="mb-6 mt-8">
                        <label className="block mb-2 font-medium text-amber-900">
                          صورة الاسم (اختياري)
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative group">
                            <input
                              type="file"
                              id="nameImage"
                              name="nameImage"
                              ref={nameImageRef}
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'name')}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => nameImageRef.current?.click()}
                              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white px-4 py-3 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300 font-medium"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                              </svg>
                              اختر صورة
                            </button>
                          </div>
                          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 flex items-center">
                            {nameImage ? (
                              <div className="text-amber-800 font-medium overflow-hidden text-ellipsis">
                                <span className="inline-block bg-amber-200 w-6 h-6 rounded-full text-center mr-2 text-amber-700">✓</span>
                                {nameImage.name}
                              </div>
                            ) : (
                              <div className="text-amber-400 text-sm">
                                <span className="inline-block bg-amber-100 w-6 h-6 rounded-full text-center mr-2 text-amber-500">?</span>
                                لم يتم اختيار ملف (اختياري)
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {nameImagePreview && (
                          <div className="mt-3 bg-white border border-amber-200 p-3 rounded-lg overflow-hidden">
                            <img 
                              src={nameImagePreview} 
                              alt="معاينة صورة الاسم" 
                              className="max-h-60 object-contain mx-auto"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* معلومات التواصل */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4 pb-2 border-b border-amber-200 text-amber-800">معلومات التواصل</h3>
                      <div className="mb-6">
                        <label htmlFor="contactMethod" className="block mb-2 font-medium text-amber-900">
                          طريقة التواصل المفضلة *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-amber-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <select
                            id="contactMethod"
                            name="contactMethod"
                            value={formData.contactMethod}
                            onChange={handleChange}
                            className="w-full p-3 pr-10 border border-amber-200 focus:border-amber-500 rounded-lg focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-amber-50/30 appearance-none"
                          >
                            <option value="telegram">تلجرام</option>
                            <option value="whatsapp">واتساب</option>
                            <option value="phone">رقم الهاتف</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="contactInfo" className="block mb-2 font-medium text-amber-900">
                          معلومات الاتصال *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-amber-500">
                            {formData.contactMethod === 'telegram' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                              </svg>
                            )}
                            {formData.contactMethod === 'whatsapp' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                              </svg>
                            )}
                            {formData.contactMethod === 'phone' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                            )}
                          </div>
                          <input
                            type="text"
                            id="contactInfo"
                            name="contactInfo"
                            value={formData.contactInfo}
                            onChange={handleChange}
                            required
                            placeholder={formData.contactMethod === 'telegram' ? 'معرف التلجرام @username' : 'رقم الهاتف مع رمز الدولة'}
                            className="w-full p-3 pr-10 border border-amber-200 focus:border-amber-500 rounded-lg focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-amber-50/30 placeholder-amber-300"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* ملاحظات */}
                    <div className="mb-6">
                      <label htmlFor="notes" className="block mb-2 font-medium text-amber-900">
                        ملاحظات إضافية
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 right-3 text-amber-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          className="w-full p-3 pr-10 min-h-[120px] border border-amber-200 focus:border-amber-500 rounded-lg focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-amber-50/30 placeholder-amber-300"
                          placeholder="أي معلومات إضافية تود إضافتها للطلب"
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={() => window.location.href = '/services'}
                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-all duration-300 font-medium flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        العودة للخدمات
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
                      >
                        {getLocalizedText('next')}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : formStep === 2 ? (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-amber-200 text-amber-800">
                      {getLocalizedText('paymentMethod')}
                    </h2>
                    <div className="mb-8 space-y-4">
                      <div className="relative p-4 border border-amber-200 rounded-lg transition-all hover:border-amber-400 cursor-pointer bg-amber-50/30">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="paypal"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={handleChange}
                            className="h-5 w-5 text-amber-600 focus:ring-amber-500"
                          />
                          <label htmlFor="paypal" className="flex items-center ms-3 w-full cursor-pointer">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <div className="bg-blue-600 p-1 rounded mr-3">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5 7.2C18.7 8.2 19.5 9.6 19.5 11.2C19.5 14.4 16.9 17 13.7 17H9.50001C8.90001 17 8.40001 16.5 8.40001 15.9V12.7" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8.40001 9.5V8.1C8.40001 7.5 8.90001 7 9.50001 7H13.7C15 7 16.2 7.5 17 8.2" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7.40001 13.7C6.20001 14.7 5.40001 16.1 5.40001 17.7C5.40001 20.9 8.00001 23.5 11.2 23.5H15.4C16 23.5 16.5 23 16.5 22.4V19.2" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16.5 16V14.6C16.5 14 16 13.5 15.4 13.5H11.2C9.90001 13.5 8.70001 14 7.90001 14.7" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <span className="font-medium">{getLocalizedText('paypal')}</span>
                              </div>
                              <img src="/paypal-logo.png" alt="PayPal" className="h-8" />
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="relative p-4 border border-amber-200 rounded-lg transition-all hover:border-amber-400 cursor-pointer bg-amber-50/30">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="creditCard"
                            name="paymentMethod"
                            value="creditCard"
                            checked={formData.paymentMethod === 'creditCard'}
                            onChange={handleChange}
                            className="h-5 w-5 text-amber-600 focus:ring-amber-500"
                          />
                          <label htmlFor="creditCard" className="flex items-center ms-3 w-full cursor-pointer">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <div className="bg-amber-600 p-1 rounded mr-3">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 8.50488H22" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 16.5049H8" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.5 16.5049H14.5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6.44 3.50488H17.55C21.11 3.50488 22 4.38488 22 7.89488V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89488C2 4.38488 2.89 3.50488 6.44 3.50488Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <span className="font-medium">{getLocalizedText('creditCard')}</span>
                              </div>
                              <div className="flex space-x-1">
                                <img src="/visa-logo.png" alt="Visa" className="h-8" />
                                <img src="/mastercard-logo.png" alt="MasterCard" className="h-8" />
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-all duration-300 font-medium flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        {getLocalizedText('back')}
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center disabled:opacity-70 disabled:cursor-not-allowed disabled:from-amber-400 disabled:to-amber-500"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {getLocalizedText('processing')}
                          </>
                        ) : (
                          <>
                            {getLocalizedText('submitOrder')}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            
            {/* ملخص الطلب */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 rounded-xl shadow-xl p-6 sticky top-32 border border-amber-200">
                <h2 className="text-xl font-bold mb-6 pb-2 border-b border-amber-200 text-amber-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {getLocalizedText('orderSummary')}
                </h2>
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start p-3 border border-amber-200/50 rounded-lg bg-white/80 hover:bg-white transition-all duration-200">
                        <div className="flex items-center">
                          <span className="text-2xl me-3 bg-amber-100 w-12 h-12 flex items-center justify-center rounded-full text-amber-700">{item.icon}</span>
                          <div>
                            <p className="font-medium text-amber-900">{item.name}</p>
                            <p className="text-sm text-amber-600 mt-1">{item.price} {getLocalizedText('currency')}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.category)}
                          className="text-amber-500 hover:text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                          aria-label="إزالة من السلة"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-amber-800 font-medium">السلة فارغة</p>
                      <p className="text-amber-600 text-sm mt-1">لم تقم بإضافة أي منتجات بعد</p>
                    </div>
                  )}
                </div>
                <div className="pt-4 border-t border-amber-200 mt-auto">
                  <div className="flex justify-between items-center text-lg font-bold text-amber-900">
                    <span>{getLocalizedText('total')}:</span>
                    <span className="text-xl bg-amber-100 px-3 py-1 rounded-lg">{totalPrice} {getLocalizedText('currency')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 