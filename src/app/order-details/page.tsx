"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartContext';

export default function OrderDetailsPage() {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    // استرجاع بيانات الطلب من التخزين المحلي
    const storedOrder = localStorage.getItem('lastOrderDetails');
    
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
      // تنظيف السلة بعد الوصول لصفحة التفاصيل
      clearCart();
    }
    
    setLoading(false);
  }, [clearCart]);

  // الترجمات
  const getLocalizedText = (key: string): string => {
    const translations: { [key: string]: string } = {
      orderDetails: 'تفاصيل الطلب',
      orderCompleted: 'تم استلام طلبك بنجاح!',
      orderNumber: 'رقم الطلب',
      playerName: 'اسم اللاعب',
      kingdomNumber: 'رقم المملكة',
      items: 'المنتجات المطلوبة',
      totalPrice: 'السعر الإجمالي',
      currency: 'دولار',
      orderDate: 'تاريخ الطلب',
      paymentInstructions: 'تعليمات الدفع',
      paymentMessage: 'سيتم التواصل معك قريباً عبر معلومات الاتصال التي أدخلتها لإتمام عملية الدفع. يرجى الاحتفاظ برقم الطلب للرجوع إليه.',
      contactMessage: 'يمكنك أيضاً التواصل مباشرة معنا عبر:',
      telegram: 'تلجرام',
      whatsapp: 'واتساب',
      returnToHome: 'العودة للصفحة الرئيسية',
      noOrder: 'لم يتم العثور على تفاصيل الطلب',
      noOrderMessage: 'لم نتمكن من العثور على تفاصيل طلبك. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.',
    };
    
    return translations[key] || key;
  };

  // تحويل التاريخ لصيغة مقروءة
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="py-12 rtl">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-xl">جاري تحميل التفاصيل...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="py-12 rtl">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">{getLocalizedText('noOrder')}</h1>
              <p className="mb-6">{getLocalizedText('noOrderMessage')}</p>
              <Link
                href="/"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block"
              >
                {getLocalizedText('returnToHome')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 rtl">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold">{getLocalizedText('orderCompleted')}</h1>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b">{getLocalizedText('orderDetails')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold">{getLocalizedText('orderNumber')}:</p>
                  <p className="mb-4">{orderDetails.orderId}</p>
                  
                  <p className="font-semibold">{getLocalizedText('playerName')}:</p>
                  <p className="mb-4">{orderDetails.playerName}</p>
                  
                  <p className="font-semibold">{getLocalizedText('kingdomNumber')}:</p>
                  <p className="mb-4">{orderDetails.kingdomNumber}</p>
                </div>
                
                <div>
                  <p className="font-semibold">{getLocalizedText('items')}:</p>
                  <p className="mb-4">{orderDetails.items}</p>
                  
                  <p className="font-semibold">{getLocalizedText('totalPrice')}:</p>
                  <p className="mb-4">{orderDetails.totalPrice} {getLocalizedText('currency')}</p>
                  
                  <p className="font-semibold">{getLocalizedText('orderDate')}:</p>
                  <p className="mb-4">{formatDate(orderDetails.dateTime)}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">{getLocalizedText('paymentInstructions')}</h2>
              <p className="mb-4 text-gray-700">{getLocalizedText('paymentMessage')}</p>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="font-bold mb-2">{getLocalizedText('contactMessage')}</p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://t.me/yourUsername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0088cc" className="me-2">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-5.634 7-4.366-5 3.634v-7.634l2 8-6 2-.5 4 4.312-1z"/>
                    </svg>
                    {getLocalizedText('telegram')}
                  </a>
                  
                  <a 
                    href="https://wa.me/1234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25D366" className="me-2">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.288.131.332.202.045.072.045.419-.1.825zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.323-.844l-3.706 1.176 1.2-3.579c-.613-1.063-.937-2.272-.937-3.513.001-3.866 3.16-7.016 7.026-7.016 1.873 0 3.636.731 4.963 2.057 1.327 1.326 2.058 3.089 2.056 4.962-.002 3.865-3.162 7.016-7.027 7.016z"/>
                    </svg>
                    {getLocalizedText('whatsapp')}
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block"
              >
                {getLocalizedText('returnToHome')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
