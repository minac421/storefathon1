"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/components/cart/CartContext';
import getTranslation from '@/lib/i18n';

// بيانات الخدمات
const services = {
  resources: [
    { id: 'wood', name: { ar: 'الخشب', en: 'Wood', tr: 'Ahşap' }, price: 150, icon: '🌲' },
    { id: 'iron', name: { ar: 'الحديد', en: 'Iron', tr: 'Demir' }, price: 200, icon: '⛏️' },
    { id: 'wheat', name: { ar: 'القمح', en: 'Wheat', tr: 'Buğday' }, price: 100, icon: '🌾' },
    { id: 'gold', name: { ar: 'الذهب', en: 'Gold', tr: 'Altın' }, price: 300, icon: '🏅' },
    { id: 'stone', name: { ar: 'الحجر', en: 'Stone', tr: 'Taş' }, price: 180, icon: '🪨' },
    { id: 'silver', name: { ar: 'الفضة', en: 'Silver', tr: 'Gümüş' }, price: 250, icon: '🔷' },
  ],
  
  packages: [
    { 
      id: 'starter', 
      name: { ar: 'حزمة المبتدئ', en: 'Starter Pack', tr: 'Başlangıç Paketi' }, 
      price: 500, 
      icon: '🎁',
      description: { 
        ar: 'حزمة أساسية للاعبين الجدد تتضمن موارد متنوعة', 
        en: 'Basic package for new players including various resources', 
        tr: 'Yeni oyuncular için çeşitli kaynaklar içeren temel paket' 
      }
    },
    { 
      id: 'advanced', 
      name: { ar: 'حزمة متقدمة', en: 'Advanced Pack', tr: 'Gelişmiş Paket' }, 
      price: 1200, 
      icon: '💎',
      description: { 
        ar: 'حزمة متقدمة تحتوي على موارد وعناصر نادرة', 
        en: 'Advanced package containing resources and rare items', 
        tr: 'Kaynaklar ve nadir öğeler içeren gelişmiş paket' 
      }
    },
    { 
      id: 'premium', 
      name: { ar: 'حزمة مميزة', en: 'Premium Pack', tr: 'Premium Paket' }, 
      price: 2000, 
      icon: '👑',
      description: { 
        ar: 'حزمة مميزة بمكافآت حصرية وموارد وفيرة', 
        en: 'Premium package with exclusive rewards and abundant resources', 
        tr: 'Özel ödüller ve bol kaynaklar içeren premium paket' 
      }
    },
  ]
};

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = getTranslation(locale);
  const { addItem } = useCart();
  const isRTL = locale === 'ar';
  const [addedItems, setAddedItems] = useState<{[key: string]: boolean}>({});
  
  // إضافة منتج للسلة
  const handleAddToCart = (item: any, category: 'resources' | 'events' | 'bots' | 'castle') => {
    addItem({
      id: item.id,
      category,
      price: item.price,
      icon: item.icon,
      name: item.name[locale as keyof typeof item.name]
    });
    
    // تعليم المنتج كمضاف للسلة
    setAddedItems(prev => ({
      ...prev,
      [`${category}-${item.id}`]: true
    }));
    
    // إزالة علامة المضاف بعد ثانيتين
    setTimeout(() => {
      setAddedItems(prev => ({
        ...prev,
        [`${category}-${item.id}`]: false
      }));
    }, 2000);
  };
  
  // ترجمات صفحة الخدمات
  const translations = {
    pageTitle: {
      ar: 'الموارد',
      en: 'Resources',
      tr: 'Kaynaklar'
    },
    pageSubtitle: {
      ar: 'اختر من مجموعتنا الواسعة من الموارد لتعزيز تجربتك',
      en: 'Choose from our wide range of resources to enhance your experience',
      tr: 'Deneyiminizi geliştirmek için geniş kaynak yelpazemizden seçim yapın'
    },
    price: {
      ar: 'السعر',
      en: 'Price',
      tr: 'Fiyat'
    },
    currency: {
      ar: 'دولار',
      en: 'USD',
      tr: 'USD'
    },
    orderNow: {
      ar: 'اطلب الآن',
      en: 'Order Now',
      tr: 'Şimdi Sipariş Ver'
    },
    viewDetails: {
      ar: 'عرض التفاصيل',
      en: 'View Details',
      tr: 'Detayları Gör'
    },
    packages: {
      ar: 'الحزم',
      en: 'Packages',
      tr: 'Paketler'
    },
    popular: {
      ar: 'شائع',
      en: 'Popular',
      tr: 'Popüler'
    },
    added: {
      ar: 'تمت الإضافة',
      en: 'Added',
      tr: 'Eklendi'
    }
  };
  
  return (
    <div className={`container mx-auto px-4 py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* عنوان الصفحة */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text inline-block">
          {translations.pageTitle[locale as keyof typeof translations.pageTitle]}
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          {translations.pageSubtitle[locale as keyof typeof translations.pageSubtitle]}
        </p>
      </div>
      
      {/* قسم الموارد */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl">
                  {resource.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-center mb-4">
                {resource.name[locale as keyof typeof resource.name]}
              </h3>
              
              <div className="flex justify-between items-center mb-6">
                <div className="text-gray-600">
                  {translations.price[locale as keyof typeof translations.price]}:
                </div>
                <div className="text-blue-600 font-bold text-xl">
                  {resource.price} {translations.currency[locale as keyof typeof translations.currency]}
                </div>
              </div>
              
              <div className="mt-6 flex space-x-2 rtl:space-x-reverse">
                <button 
                  className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                >
                  {translations.viewDetails[locale as keyof typeof translations.viewDetails]}
                </button>
                <button 
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    addedItems[`resources-${resource.id}`] 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  onClick={() => handleAddToCart(resource, 'resources')}
                >
                  {addedItems[`resources-${resource.id}`] 
                    ? translations.added[locale as keyof typeof translations.added]
                    : translations.orderNow[locale as keyof typeof translations.orderNow]
                  }
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* قسم الحزم */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">
          {translations.packages[locale as keyof typeof translations.packages]}
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto mb-10"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {services.packages.map((pack, index) => (
          <div 
            key={pack.id} 
            className={`bg-white rounded-lg shadow-lg overflow-hidden border transition-all hover:shadow-xl ${
              index === 1 ? 'transform md:-translate-y-4 border-blue-500 relative z-10' : 'border-gray-100'
            }`}
          >
            {index === 1 && (
              <div className="bg-blue-500 text-white text-center py-2 font-medium">
                {translations.popular[locale as keyof typeof translations.popular]}
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl">
                  {pack.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-center mb-3">
                {pack.name[locale as keyof typeof pack.name]}
              </h3>
              
              <p className="text-gray-600 text-center mb-6 h-16">
                {pack.description[locale as keyof typeof pack.description]}
              </p>
              
              <div className="text-center mb-8">
                <span className="text-4xl font-bold text-blue-600">{pack.price}</span>
                <span className="text-gray-600 ml-1">{translations.currency[locale as keyof typeof translations.currency]}</span>
              </div>
              
              <button 
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                  addedItems[`resources-${pack.id}`] 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                onClick={() => handleAddToCart(pack, 'resources')}
              >
                {addedItems[`resources-${pack.id}`] 
                  ? translations.added[locale as keyof typeof translations.added]
                  : translations.orderNow[locale as keyof typeof translations.orderNow]
                }
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 