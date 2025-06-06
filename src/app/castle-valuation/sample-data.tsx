"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function SampleDataPage() {
  const [selectedSample, setSelectedSample] = useState('');
  
  // قائمة من نماذج إعلانات تلجرام للاختبار
  const samples = [
    {
      id: 'h2-basic',
      name: 'هيبة 2 أساسية (350$)',
      text: `للبيع قلعة هيبة 2
السعر 350 دولار

صلاح 5
فاتح 5
مختار 4
قطز 4
العتاد بنفسجي
احتياط 5م
اشعال 2م
علوم 150م
ربط عادي`
    },
    {
      id: 'h3-premium',
      name: 'هيبة 3 مميزة (650$)',
      text: `قلعة هيبة 3 للبيع
المطلوب: 650$

الأبطال:
• صلاح الدين 5
• الفاتح 5
• مختار 5
• قطز 5
• برقوق 4
• مالك 3
• سير أبطال مكتملة: 3

العتاد: بنفسجي مع قطعة ذهبية
فيلق مشاة 3
فيلق فرسان 2
فيلق عجلات 1
ربط IGG فقط
احتياط 7م
اشعال 5م
علوم 180م
50 ختم ذهبي
تسريعات ومواد متوفرة
مظهر نادر 1`
    },
    {
      id: 'h4-luxury',
      name: 'هيبة 4 فاخرة (1000$)',
      text: `قلعة هيبة 4 فاخرة
السعر: 1000$

• صلاح 5 (هلال واحد)
• فاتح 5
• مختار 5
• قطز 5
• برقوق 5
• مالك 5
• حليمة 4
• قايتباي 4
• هارون 3
• بارون 2
• 4 سير أبطال مكتملة

• عتاد 3 قطع ذهبية
• فيلق مشاة 4
• فيلق فرسان 3
• فيلق رماة 2
• فيلق عجلات 2
• 120 ختم ذهبي
• احتياط 10م
• اشعال 10م
• علوم 230م
• تسريعات كثيرة
• موارد وفيرة
• ربط IGG فقط
• 2 مظهر نادر`
    },
    {
      id: 'h5-royal',
      name: 'هيبة 5 ملكية (1800$)',
      text: `قلعة هيبة 5 قوية جدا
السعر 1800$

الأبطال:
صلاح الدين 5 (3 أهلة)
الفاتح 5 (2 هلال)
مختار 5 (هلال واحد)
قطز 5 (هلال واحد)
برقوق 5
مالك 5
حليمة 5
قايتباي 5
هارون 5
بارون 4
بوراك 4
الإسكندر 4
كل سير الأبطال مكتملة (8 سير)

العتاد ذهبي كامل
فيلق مشاة 5
فيلق فرسان 5
فيلق رماة 4
فيلق عجلات 5
200 ختم ذهبي
احتياط 20م
اشعال 15م
علوم 300م
تسريعات كثيرة جدا
موارد وافرة
ربط IGG فقط
4 مظاهر نادرة`
    },
    {
      id: 'castle30',
      name: 'قلعة 30 اقتصادية (120$)',
      text: `قلعة 30 جديدة
سعر 120$

صلاح 4
فاتح 3
مختار 3
عتاد أزرق
ربط عادي
احتياط 1م`
    },
    {
      id: 'junood',
      name: 'جنود 1 متوسطة (200$)',
      text: `للبيع قلعة جنود 1
السعر: 200$

صلاح 5
فاتح 4
مختار 4
قطز 3
عتاد بنفسجي
احتياط 3م
اشعال 1م
ربط عادي`
    }
  ];
  
  // نسخ النص إلى الحافظة
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ النص إلى الحافظة');
  };
  
  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">نماذج إعلانات تلجرام</h1>
        <p className="text-lg text-gray-600 mb-2">نماذج جاهزة للاستخدام في اختبار نظام تقييم القلاع</p>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">قائمة النماذج</h2>
            <div className="space-y-3">
              {samples.map(sample => (
                <div
                  key={sample.id}
                  className={`p-3 rounded-lg cursor-pointer ${selectedSample === sample.id ? 'bg-blue-100 border-blue-500 border' : 'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => setSelectedSample(sample.id)}
                >
                  <h3 className="font-bold">{sample.name}</h3>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">تفاصيل النموذج</h2>
            
            {selectedSample ? (
              <>
                <div className="bg-gray-50 p-4 rounded-lg mb-4 h-64 overflow-y-auto whitespace-pre-wrap" dir="rtl">
                  {samples.find(s => s.id === selectedSample)?.text}
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => copyToClipboard(samples.find(s => s.id === selectedSample)?.text)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    نسخ النص
                  </button>
                  
                  <Link
                    href="/castle-valuation/data-collector"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    الذهاب إلى جامع البيانات
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <p className="text-gray-500">اختر نموذجًا من القائمة</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4 text-blue-800">كيفية استخدام النماذج</h2>
        
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>اختر نموذجًا من القائمة على اليمين</li>
          <li>انقر على زر "نسخ النص" لنسخ نص الإعلان</li>
          <li>انتقل إلى صفحة جامع البيانات</li>
          <li>الصق النص في مربع النص هناك</li>
          <li>اضغط على "تحليل الإعلان" لاستخراج البيانات واختبار النظام</li>
        </ol>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            * هذه النماذج تمثل إعلانات حقيقية من مجموعات تلجرام، تم تعديلها قليلاً للتوضيح
          </p>
        </div>
      </div>
      
      <div className="text-center">
        <Link
          href="/castle-valuation"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          العودة إلى نظام التقييم
        </Link>
      </div>
    </div>
  );
} 