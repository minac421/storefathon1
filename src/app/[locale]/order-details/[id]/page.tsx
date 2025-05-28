"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import getTranslation from '@/lib/i18n';

interface OrderDetails {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
    paymentMethod: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
    icon: string;
    quantity: number;
    category: string;
  }[];
  totalPrice: number;
  status: string;
  createdAt: string;
  images?: {
    coordImageUrl?: string;
    nameImageUrl?: string;
  };
}

export default function OrderDetailsPage({ params }: { params: { locale: string; id: string } }) {
  const { locale, id } = params;
  const t = getTranslation(locale);
  const isRTL = locale === 'ar';
  
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setOrder(data.order);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError(locale === 'ar' ? 'حدث خطأ أثناء جلب تفاصيل الطلب' : 
                locale === 'tr' ? 'Sipariş detayları alınırken bir hata oluştu' : 
                'An error occurred while fetching order details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [id, locale]);
  
  // الترجمات
  const translations = {
    orderDetails: {
      ar: 'تفاصيل الطلب',
      en: 'Order Details',
      tr: 'Sipariş Detayları'
    },
    orderNumber: {
      ar: 'رقم الطلب',
      en: 'Order Number',
      tr: 'Sipariş Numarası'
    },
    orderDate: {
      ar: 'تاريخ الطلب',
      en: 'Order Date',
      tr: 'Sipariş Tarihi'
    },
    orderStatus: {
      ar: 'حالة الطلب',
      en: 'Order Status',
      tr: 'Sipariş Durumu'
    },
    status: {
      pending: {
        ar: 'قيد الانتظار',
        en: 'Pending',
        tr: 'Beklemede'
      },
      processing: {
        ar: 'قيد المعالجة',
        en: 'Processing',
        tr: 'İşleniyor'
      },
      completed: {
        ar: 'مكتمل',
        en: 'Completed',
        tr: 'Tamamlandı'
      },
      canceled: {
        ar: 'ملغي',
        en: 'Canceled',
        tr: 'İptal Edildi'
      }
    },
    customerInfo: {
      ar: 'معلومات العميل',
      en: 'Customer Information',
      tr: 'Müşteri Bilgileri'
    },
    name: {
      ar: 'الاسم',
      en: 'Name',
      tr: 'İsim'
    },
    email: {
      ar: 'البريد الإلكتروني',
      en: 'Email',
      tr: 'E-posta'
    },
    phone: {
      ar: 'رقم الهاتف',
      en: 'Phone Number',
      tr: 'Telefon Numarası'
    },
    address: {
      ar: 'العنوان',
      en: 'Address',
      tr: 'Adres'
    },
    city: {
      ar: 'المدينة',
      en: 'City',
      tr: 'Şehir'
    },
    notes: {
      ar: 'ملاحظات',
      en: 'Notes',
      tr: 'Notlar'
    },
    paymentMethod: {
      ar: 'طريقة الدفع',
      en: 'Payment Method',
      tr: 'Ödeme Yöntemi'
    },
    paymentMethods: {
      credit: {
        ar: 'بطاقة ائتمان',
        en: 'Credit Card',
        tr: 'Kredi Kartı'
      },
      paypal: {
        ar: 'PayPal',
        en: 'PayPal',
        tr: 'PayPal'
      },
      bank: {
        ar: 'تحويل بنكي',
        en: 'Bank Transfer',
        tr: 'Banka Transferi'
      }
    },
    orderItems: {
      ar: 'المنتجات المطلوبة',
      en: 'Order Items',
      tr: 'Sipariş Öğeleri'
    },
    quantity: {
      ar: 'الكمية',
      en: 'Quantity',
      tr: 'Miktar'
    },
    price: {
      ar: 'السعر',
      en: 'Price',
      tr: 'Fiyat'
    },
    total: {
      ar: 'الإجمالي',
      en: 'Total',
      tr: 'Toplam'
    },
    backToHome: {
      ar: 'العودة إلى الصفحة الرئيسية',
      en: 'Back to Home',
      tr: 'Ana Sayfaya Dön'
    },
    loading: {
      ar: 'جاري التحميل...',
      en: 'Loading...',
      tr: 'Yükleniyor...'
    },
    errorMessage: {
      ar: 'حدث خطأ أثناء جلب تفاصيل الطلب',
      en: 'An error occurred while fetching order details',
      tr: 'Sipariş detayları alınırken bir hata oluştu'
    },
    currency: {
      ar: 'دولار',
      en: 'USD',
      tr: 'USD'
    }
  };
  
  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : locale === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // عرض حالة التحميل
  if (loading) {
    return (
      <div className={`py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl">{translations.loading[locale as keyof typeof translations.loading]}</p>
          </div>
        </div>
      </div>
    );
  }
  
  // عرض رسالة الخطأ
  if (error) {
    return (
      <div className={`py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-xl text-red-600 mb-4">{error}</p>
            <Link 
              href={`/${locale}`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block"
            >
              {translations.backToHome[locale as keyof typeof translations.backToHome]}
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // عرض تفاصيل الطلب
  if (!order) {
    return (
      <div className={`py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-xl text-red-600 mb-4">
              {locale === 'ar' ? 'لم يتم العثور على الطلب' : 
               locale === 'tr' ? 'Sipariş bulunamadı' : 
               'Order not found'}
            </p>
            <Link 
              href={`/${locale}`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block"
            >
              {translations.backToHome[locale as keyof typeof translations.backToHome]}
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {translations.orderDetails[locale as keyof typeof translations.orderDetails]}
          </h1>
          
          {/* معلومات الطلب الرئيسية */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-6 justify-between mb-4">
              <div>
                <p className="text-gray-600">
                  {translations.orderNumber[locale as keyof typeof translations.orderNumber]}:
                </p>
                <p className="text-xl font-bold">{order.orderNumber}</p>
              </div>
              
              <div>
                <p className="text-gray-600">
                  {translations.orderDate[locale as keyof typeof translations.orderDate]}:
                </p>
                <p className="text-xl font-bold">{formatDate(order.createdAt)}</p>
              </div>
              
              <div>
                <p className="text-gray-600">
                  {translations.orderStatus[locale as keyof typeof translations.orderStatus]}:
                </p>
                <p className={`text-xl font-bold ${
                  order.status === 'completed' ? 'text-green-600' : 
                  order.status === 'canceled' ? 'text-red-600' : 
                  order.status === 'processing' ? 'text-blue-600' : 
                  'text-yellow-600'
                }`}>
                  {translations.status[order.status as keyof typeof translations.status][locale as keyof typeof translations.status.pending]}
                </p>
              </div>
            </div>
          </div>
          
          {/* معلومات العميل */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">
              {translations.customerInfo[locale as keyof typeof translations.customerInfo]}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  {translations.name[locale as keyof typeof translations.name]}:
                </p>
                <p className="font-medium">{order.customer.name}</p>
              </div>
              
              <div>
                <p className="text-gray-600">
                  {translations.email[locale as keyof typeof translations.email]}:
                </p>
                <p className="font-medium">{order.customer.email}</p>
              </div>
              
              <div>
                <p className="text-gray-600">
                  {translations.phone[locale as keyof typeof translations.phone]}:
                </p>
                <p className="font-medium">{order.customer.phone}</p>
              </div>
              
              <div>
                <p className="text-gray-600">
                  {translations.paymentMethod[locale as keyof typeof translations.paymentMethod]}:
                </p>
                <p className="font-medium">
                  {translations.paymentMethods[order.customer.paymentMethod as keyof typeof translations.paymentMethods][locale as keyof typeof translations.paymentMethods.credit]}
                </p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-gray-600">
                  {translations.address[locale as keyof typeof translations.address]}:
                </p>
                <p className="font-medium">{order.customer.address}</p>
              </div>
              
              <div>
                <p className="text-gray-600">
                  {translations.city[locale as keyof typeof translations.city]}:
                </p>
                <p className="font-medium">{order.customer.city}</p>
              </div>
              
              {order.customer.notes && (
                <div className="md:col-span-2">
                  <p className="text-gray-600">
                    {translations.notes[locale as keyof typeof translations.notes]}:
                  </p>
                  <p className="font-medium">{order.customer.notes}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* المنتجات المطلوبة */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">
              {translations.orderItems[locale as keyof typeof translations.orderItems]}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-start py-3 px-4">{translations.orderItems[locale as keyof typeof translations.orderItems]}</th>
                    <th className="text-start py-3 px-4">{translations.quantity[locale as keyof typeof translations.quantity]}</th>
                    <th className="text-start py-3 px-4">{translations.price[locale as keyof typeof translations.price]}</th>
                    <th className="text-start py-3 px-4">{translations.total[locale as keyof typeof translations.total]}</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={`${item.category}-${item.id}`} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{item.quantity}</td>
                      <td className="py-3 px-4">{item.price} {translations.currency[locale as keyof typeof translations.currency]}</td>
                      <td className="py-3 px-4 font-medium">{item.price * item.quantity} {translations.currency[locale as keyof typeof translations.currency]}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="py-3 px-4 text-end font-bold">
                      {translations.total[locale as keyof typeof translations.total]}:
                    </td>
                    <td className="py-3 px-4 font-bold text-blue-600">
                      {order.totalPrice} {translations.currency[locale as keyof typeof translations.currency]}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          {/* صور الطلب */}
          {order.images && (order.images.coordImageUrl || order.images.nameImageUrl) && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b">
                {locale === 'ar' ? 'صور الطلب' : 
                 locale === 'tr' ? 'Sipariş Resimleri' : 
                 'Order Images'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {order.images.coordImageUrl && (
                  <div>
                    <p className="text-gray-600 mb-2">
                      {locale === 'ar' ? 'صورة الإحداثيات' : 
                       locale === 'tr' ? 'Koordinat Resmi' : 
                       'Coordinates Image'}
                    </p>
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={order.images.coordImageUrl} 
                        alt="صورة الإحداثيات"
                        className="w-full h-auto object-contain"
                        onError={(e) => {
                          console.error('خطأ في تحميل صورة الإحداثيات');
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {order.images.nameImageUrl && (
                  <div>
                    <p className="text-gray-600 mb-2">
                      {locale === 'ar' ? 'صورة الاسم' : 
                       locale === 'tr' ? 'İsim Resmi' : 
                       'Name Image'}
                    </p>
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={order.images.nameImageUrl} 
                        alt="صورة الاسم"
                        className="w-full h-auto object-contain"
                        onError={(e) => {
                          console.error('خطأ في تحميل صورة الاسم');
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* زر العودة للصفحة الرئيسية */}
          <div className="text-center">
            <Link 
              href={`/${locale}`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block"
            >
              {translations.backToHome[locale as keyof typeof translations.backToHome]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
