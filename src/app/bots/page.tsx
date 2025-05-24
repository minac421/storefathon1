"use client";

import React, { useState } from 'react';
import Link from 'next/link';
// import { useCart } from '@/components/cart/CartContext';

// بيانات البوتات
const bots = [
  { 
    id: 'farmer_bot', 
    name: 'بوت المزارع', 
    description: 'يقوم بجمع الموارد تلقائيًا كل ساعة وإرسال قوافل للتجارة',
    price: 300, 
    icon: '🤖',
    features: [
      'جمع الموارد تلقائيًا',
      'إرسال القوافل التجارية',
      'تنبيهات للإنتاج',
      'تحسين كفاءة المزارع'
    ]
  },
  { 
    id: 'warrior_bot', 
    name: 'بوت المحارب', 
    description: 'يساعد في إدارة الهجمات والدفاعات وتنظيم الجيوش',
    price: 450, 
    icon: '👾',
    features: [
      'جدولة الهجمات',
      'تنظيم الدفاعات',
      'تدريب الجيوش تلقائيًا',
      'تنبيهات للهجمات القادمة'
    ]
  },
  { 
    id: 'trader_bot', 
    name: 'بوت التاجر', 
    description: 'يتابع أسعار السوق ويقوم بالتجارة تلقائيًا لتحقيق أقصى ربح',
    price: 400, 
    icon: '🎮',
    features: [
      'مراقبة أسعار السوق',
      'تنفيذ الصفقات تلقائيًا',
      'تحليل أنماط التداول',
      'تنبيهات للفرص التجارية'
    ]
  }
];

export default function BotsPage() {
  // const { addItem } = useCart();
  const [addedItems, setAddedItems] = useState<{[key: string]: boolean}>({});
  
  // إضافة بوت للسلة - معطلة مؤقتًا
  const handleAddToCart = (bot: any) => {
    // تعليق استدعاء useCart مؤقتًا
    // addItem({
    //   id: bot.id,
    //   name: bot.name,
    //   price: bot.price,
    //   icon: bot.icon,
    //   category: 'bots'
    // });
    
    // تحديث حالة الأزرار
    setAddedItems(prev => ({
      ...prev,
      [bot.id]: true
    }));
    
    // إزالة التأثير بعد ثانيتين
    setTimeout(() => {
      setAddedItems(prev => ({
        ...prev,
        [bot.id]: false
      }));
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 py-12 rtl">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text inline-block">
          البوتات المساعدة
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          استفد من بوتاتنا المتخصصة لأتمتة العمليات وتحسين أدائك في اللعبة
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {bots.map(bot => (
          <div key={bot.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-1 border border-gray-100">
            <div className="px-6 py-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-5xl">
                  {bot.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-center mb-3">
                {bot.name}
              </h3>
              
              <p className="text-center text-gray-600 mb-6">
                {bot.description}
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-lg">المميزات:</h4>
                <ul className="space-y-2">
                  {bot.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 me-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-blue-600">{bot.price}</span>
                <span className="text-gray-600 ms-1">USD</span>
              </div>
              
              <button
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                  addedItems[bot.id] 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                onClick={() => handleAddToCart(bot)}
              >
                {addedItems[bot.id] ? 'تمت الإضافة للسلة' : 'إضافة للسلة'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-blue-50 rounded-lg p-8 border border-blue-100">
        <h2 className="text-2xl font-bold mb-4">هل لديك احتياجات خاصة؟</h2>
        <p className="mb-6">
          يمكننا تطوير بوت مخصص لاحتياجاتك الفريدة في اللعبة. تواصل معنا لمناقشة متطلباتك.
        </p>
        <Link 
          href="/custom-order" 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md inline-block"
        >
          طلب بوت مخصص
        </Link>
      </div>
    </div>
  );
} 