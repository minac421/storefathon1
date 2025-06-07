"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart';
import getTranslation from '@/lib/i18n';

export default function CheckoutPage({ params }: { params: { locale: string } }) {
  const locale = params?.locale || 'ar';
  const t = getTranslation(locale);
  const isRTL = locale === 'ar';
  
  // الحصول على محتوى السلة
  const { cartItems, totalPrice, clearCart } = useCart();
  
  // حالة الطلب
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
    paymentMethod: 'credit'
  });
  
  // حالة إرسال الطلب
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // التعامل مع تغيير قيم النموذج
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // التعامل مع إرسال الطلب
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert(locale === 'ar' ? 'السلة فارغة' : locale === 'tr' ? 'Sepet boş' : 'Cart is empty');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // إرسال الطلب للخادم الحقيقي
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: cartItems,
          totalPrice
        })
      });
      
      if (!response.ok) {
        throw new Error(`خطأ: ${response.status}`);
      }
      
      const data = await response.json();
      setOrderNumber(data.orderNumber);
      
      // تفريغ السلة
      clearCart();
      
      // إتمام الطلب
      setIsSubmitting(false);
      setIsOrderComplete(true);
      
      // توجيه المستخدم إلى صفحة تفاصيل الطلب بعد 3 ثوانٍ
      setTimeout(() => {
        window.location.href = `/${locale}/order-details/${data.id}`;
      }, 3000);
    } catch (error) {
      console.error('خطأ في إرسال الطلب:', error);
      alert(locale === 'ar' ? 'حدث خطأ أثناء إرسال الطلب' : locale === 'tr' ? 'Sipariş gönderilirken bir hata oluştu' : 'An error occurred while submitting the order');
      setIsSubmitting(false);
    }
  };
  
  // الحصول على النص المترجم
  const getLocalizedText = (key: string): string => {
    const translations: {[key: string]: {[key: string]: string}} = {
      'checkout': {
        'ar': 'إتمام الطلب',
        'en': 'Checkout',
        'tr': 'Ödeme'
      },
      'orderSummary': {
        'ar': 'ملخص الطلب',
        'en': 'Order Summary',
        'tr': 'Sipariş Özeti'
      },
      'personalInfo': {
        'ar': 'المعلومات الشخصية',
        'en': 'Personal Information',
        'tr': 'Kişisel Bilgiler'
      },
      'name': {
        'ar': 'الاسم الكامل',
        'en': 'Full Name',
        'tr': 'Ad Soyad'
      },
      'email': {
        'ar': 'البريد الإلكتروني',
        'en': 'Email',
        'tr': 'E-posta'
      },
      'phone': {
        'ar': 'رقم الهاتف',
        'en': 'Phone Number',
        'tr': 'Telefon Numarası'
      },
      'address': {
        'ar': 'العنوان',
        'en': 'Address',
        'tr': 'Adres'
      },
      'city': {
        'ar': 'المدينة',
        'en': 'City',
        'tr': 'Şehir'
      },
      'notes': {
        'ar': 'ملاحظات إضافية',
        'en': 'Additional Notes',
        'tr': 'Ek Notlar'
      },
      'paymentMethod': {
        'ar': 'طريقة الدفع',
        'en': 'Payment Method',
        'tr': 'Ödeme Yöntemi'
      },
      'creditCard': {
        'ar': 'بطاقة ائتمان',
        'en': 'Credit Card',
        'tr': 'Kredi Kartı'
      },
      'paypal': {
        'ar': 'PayPal',
        'en': 'PayPal',
        'tr': 'PayPal'
      },
      'bankTransfer': {
        'ar': 'تحويل بنكي',
        'en': 'Bank Transfer',
        'tr': 'Banka Transferi'
      },
      'items': {
        'ar': 'المنتجات',
        'en': 'Items',
        'tr': 'Ürünler'
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
    
    return translations[key]?.[locale] || key;
  };
  
  // عرض رسالة إتمام الطلب
  if (isOrderComplete) {
    return (
      <div className={`py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-7xl text-green-500 mb-6 mx-auto">✓</div>
            <h1 className="text-3xl font-bold mb-4">
              {getLocalizedText('orderComplete')}
            </h1>
            <p className="text-xl mb-2">
              {getLocalizedText('orderNumber')}: <span className="font-bold">{orderNumber}</span>
            </p>
            <p className="text-gray-600 mb-8">
              {getLocalizedText('orderConfirmation')}
            </p>
            <Link 
              href={`/${locale}`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block"
            >
              {getLocalizedText('backToShopping')}
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {getLocalizedText('checkout')}
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-xl mb-4">{getLocalizedText('emptyCart')}</p>
            <Link
              href={`/${locale}/services`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block"
            >
              {getLocalizedText('continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* المعلومات الشخصية ونموذج الطلب */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b">
                  {getLocalizedText('personalInfo')}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        {getLocalizedText('name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        {getLocalizedText('email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                        {getLocalizedText('phone')} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="city">
                        {getLocalizedText('city')} *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
                        {getLocalizedText('address')} *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="notes">
                        {getLocalizedText('notes')}
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">{getLocalizedText('paymentMethod')}</h3>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit"
                          checked={formData.paymentMethod === 'credit'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        {getLocalizedText('creditCard')}
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        {getLocalizedText('paypal')}
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank"
                          checked={formData.paymentMethod === 'bank'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        {getLocalizedText('bankTransfer')}
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? getLocalizedText('processing') : getLocalizedText('submitOrder')}
                  </button>
                </form>
              </div>
            </div>
            
            {/* ملخص الطلب */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b">
                  {getLocalizedText('orderSummary')}
                </h2>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">{getLocalizedText('items')}</h3>
                  <ul className="divide-y">
                    {cartItems.map((item) => (
                      <li key={`${item.category}-${item.id}`} className="py-2 flex justify-between">
                        <div>
                          <span className="inline-block mr-1">{item.icon}</span> {item.name} 
                          <span className="text-gray-600 text-sm ml-2">
                            × {item.quantity}
                          </span>
                        </div>
                        <div className="font-medium">
                          {item.price * item.quantity} {getLocalizedText('currency')}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t mt-auto">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>{getLocalizedText('total')}:</span>
                    <span>{totalPrice} {getLocalizedText('currency')}</span>
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