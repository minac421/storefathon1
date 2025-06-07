"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartContext';

// بيانات الفعاليات
const events = [
  { 
    id: 'kingdom_war', 
    name: 'حرب الممالك', 
    description: 'شارك في حرب ملحمية بين الممالك للسيطرة على الأراضي والموارد',
    price: 200, 
    icon: '⚔️',
    date: '15 مايو 2023',
    features: [
      'مكافآت وموارد حصرية',
      'نقاط مهارات إضافية',
      'تحالفات جديدة',
      'قلاع وأراضي للفائزين'
    ]
  },
  { 
    id: 'resource_challenge', 
    name: 'تحدي الموارد', 
    description: 'اجمع أكبر قدر من الموارد خلال الوقت المحدد للفعالية وتنافس للفوز',
    price: 150, 
    icon: '🏆',
    date: '20 يونيو 2023',
    features: [
      'مضاعفة إنتاج الموارد',
      'جوائز للمراكز الثلاثة الأولى',
      'شارات خاصة',
      'عملات ذهبية هدية'
    ]
  },
  { 
    id: 'training_event', 
    name: 'فعالية التدريب', 
    description: 'استفد من خصومات على تدريب الجيوش وتسريع بناء المباني العسكرية',
    price: 100, 
    icon: '🎯',
    date: '5 يوليو 2023',
    features: [
      'تخفيض 50% على تدريب الجيوش',
      'تسريع بناء المباني العسكرية',
      'تقليل استهلاك الموارد',
      'وحدات خاصة متاحة'
    ]
  }
];

export default function EventsPage() {
  const { addItem } = useCart();
  const [addedItems, setAddedItems] = useState<{[key: string]: boolean}>({});
  
  // إضافة فعالية للسلة
  const handleAddToCart = (event: any) => {
    // إعادة تفعيل استدعاء useCart
    addItem({
      id: event.id,
      name: event.name,
      price: event.price,
      icon: event.icon,
      category: 'events'
    });
    
    // تحديث حالة الأزرار
    setAddedItems(prev => ({
      ...prev,
      [event.id]: true
    }));
    
    // إزالة التأثير بعد ثانيتين
    setTimeout(() => {
      setAddedItems(prev => ({
        ...prev,
        [event.id]: false
      }));
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 py-12 rtl">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text inline-block">
          الفعاليات الخاصة
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          شارك في فعالياتنا الحصرية للحصول على مميزات وجوائز استثنائية في اللعبة
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-1 border border-gray-100">
            <div className="relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg font-medium">
                {event.date}
              </div>
              <div className="px-6 py-8 pt-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-5xl">
                    {event.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-center mb-3">
                  {event.name}
                </h3>
                
                <p className="text-center text-gray-600 mb-6">
                  {event.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-lg">المميزات:</h4>
                  <ul className="space-y-2">
                    {event.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-green-500 me-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-blue-600">{event.price}</span>
                  <span className="text-gray-600 ms-1">USD</span>
                </div>
                
                <button
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                    addedItems[event.id] 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  onClick={() => handleAddToCart(event)}
                >
                  {addedItems[event.id] ? 'تمت الإضافة للسلة' : 'حجز مشاركة'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">هل تريد تنظيم فعالية خاصة؟</h2>
        <p className="mb-6 max-w-3xl mx-auto text-gray-600">
          يمكننا مساعدتك في تنظيم فعالية مخصصة لتحالفك أو مملكتك بمميزات خاصة ومكافآت حصرية.
        </p>
        <Link 
          href="/custom-order" 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md inline-block"
        >
          طلب فعالية مخصصة
        </Link>
      </div>
    </div>
  );
} 