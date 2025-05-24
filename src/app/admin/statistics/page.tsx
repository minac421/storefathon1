"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/admin';
import { useRouter } from 'next/navigation';

// بيانات وهمية للإحصائيات (سيتم استبدالها لاحقًا بالبيانات الفعلية من API)
const salesData = {
  total: 34000,
  lastMonth: 9500,
  monthlyGrowth: 18.5,
  yearlyGrowth: 65.2
};

const ordersData = {
  total: 232,
  pending: 15,
  processing: 43,
  completed: 162,
  cancelled: 12
};

const productsData = {
  castles: 18,
  resources: 12,
  robots: 8,
  events: 5
};

const usersData = {
  total: 450,
  newLastMonth: 85,
  active: 320,
  premium: 78
};

export default function StatisticsPage() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState('monthly');

  return (
    <div className="flex h-screen bg-gray-100 rtl">
      {/* استخدام مكون الشريط الجانبي المشترك */}
      <Sidebar activePath="/admin/statistics" />
      
      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">لوحة الإحصائيات</h1>
            
            <div className="flex items-center">
              <span className="ml-4 text-gray-700">مرحباً، المسؤول</span>
              <button 
                onClick={() => router.push('/admin')}
                className="ml-4 text-gray-500 hover:text-amber-600"
              >
                العودة للوحة الرئيسية
              </button>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 px-6">
          {/* فلترة الفترة الزمنية */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center justify-end">
              <span className="text-gray-700 ml-2">الفترة الزمنية:</span>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              >
                <option value="daily">يومي</option>
                <option value="weekly">أسبوعي</option>
                <option value="monthly">شهري</option>
                <option value="yearly">سنوي</option>
              </select>
            </div>
          </div>
          
          {/* ملخص الإحصائيات الرئيسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-gray-500">إجمالي المبيعات</p>
                  <h2 className="text-2xl font-bold text-gray-800">{salesData.total.toLocaleString()} $</h2>
                  <p className="text-xs text-green-600">+{salesData.monthlyGrowth}% مقارنة بالشهر الماضي</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-gray-500">إجمالي الطلبات</p>
                  <h2 className="text-2xl font-bold text-gray-800">{ordersData.total}</h2>
                  <p className="text-xs text-amber-600">{ordersData.pending} طلبات جديدة</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-gray-500">معدل النمو</p>
                  <h2 className="text-2xl font-bold text-gray-800">{salesData.yearlyGrowth}%</h2>
                  <p className="text-xs text-green-600">مقارنة بالعام الماضي</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-gray-500">العملاء</p>
                  <h2 className="text-2xl font-bold text-gray-800">{usersData.total}</h2>
                  <p className="text-xs text-purple-600">{usersData.newLastMonth} عميل جديد هذا الشهر</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* تفاصيل الطلبات */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">تحليل الطلبات</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">طلبات جديدة</span>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-amber-200 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-amber-500" 
                        style={{ width: `${(ordersData.pending / ordersData.total) * 100}%` }} 
                      ></div>
                    </div>
                    <span className="font-medium text-gray-800">{ordersData.pending}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">قيد المعالجة</span>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-blue-200 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(ordersData.processing / ordersData.total) * 100}%` }} 
                      ></div>
                    </div>
                    <span className="font-medium text-gray-800">{ordersData.processing}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">مكتملة</span>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-green-200 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${(ordersData.completed / ordersData.total) * 100}%` }} 
                      ></div>
                    </div>
                    <span className="font-medium text-gray-800">{ordersData.completed}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ملغاة</span>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-red-200 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-red-500" 
                        style={{ width: `${(ordersData.cancelled / ordersData.total) * 100}%` }} 
                      ></div>
                    </div>
                    <span className="font-medium text-gray-800">{ordersData.cancelled}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">إحصائيات المنتجات</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🏰</span>
                    <div>
                      <p className="text-gray-600">القلاع</p>
                      <p className="text-xl font-bold">{productsData.castles}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🌾</span>
                    <div>
                      <p className="text-gray-600">الموارد</p>
                      <p className="text-xl font-bold">{productsData.resources}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🤖</span>
                    <div>
                      <p className="text-gray-600">الروبوتات</p>
                      <p className="text-xl font-bold">{productsData.robots}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🎮</span>
                    <div>
                      <p className="text-gray-600">الأحداث</p>
                      <p className="text-xl font-bold">{productsData.events}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* إحصائيات المستخدمين */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">إحصائيات المستخدمين</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <span className="text-2xl bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">👥</span>
                <div>
                  <p className="text-gray-600">إجمالي المستخدمين</p>
                  <p className="text-2xl font-bold">{usersData.total}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-2xl bg-green-100 text-green-600 p-2 rounded-lg mr-3">⭐</span>
                <div>
                  <p className="text-gray-600">المستخدمين النشطين</p>
                  <p className="text-2xl font-bold">{usersData.active}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-2xl bg-amber-100 text-amber-600 p-2 rounded-lg mr-3">👑</span>
                <div>
                  <p className="text-gray-600">المستخدمين المميزين</p>
                  <p className="text-2xl font-bold">{usersData.premium}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
