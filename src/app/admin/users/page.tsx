"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin';

// تعريف نوع للإحصائيات
interface VisitorStats {
  totalVisitors: number;
  activeVisitors: number;
  newVisitors: number;
  pageViews: number;
  averageVisitDuration: string;
  bounceRate: number;
}

export default function UsersManagement() {
  const router = useRouter();
  
  // إحصائيات الزوار (بيانات وهمية)
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    totalVisitors: 12458,
    activeVisitors: 345,
    newVisitors: 127,
    pageViews: 38254,
    averageVisitDuration: "3:24",
    bounceRate: 25.4
  });
  
  // مصدر البيانات (للعرض فقط)
  const [dataSource, setDataSource] = useState('اليوم');
  
  // البحث في البيانات
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<'day' | 'week' | 'month' | 'all'>('day');
  
  // محاكاة جلب البيانات من API عند تغيير الفلتر الزمني
  useEffect(() => {
    // هنا سيتم استبدال هذه المحاكاة باستدعاء حقيقي لـ API
    let newStats: VisitorStats;
    
    switch (timeFilter) {
      case 'day':
        setDataSource('اليوم');
        newStats = {
          totalVisitors: 12458,
          activeVisitors: 345,
          newVisitors: 127,
          pageViews: 38254,
          averageVisitDuration: "3:24",
          bounceRate: 25.4
        };
        break;
      case 'week':
        setDataSource('الأسبوع');
        newStats = {
          totalVisitors: 54872,
          activeVisitors: 1823,
          newVisitors: 879,
          pageViews: 195362,
          averageVisitDuration: "3:56",
          bounceRate: 23.7
        };
        break;
      case 'month':
        setDataSource('الشهر');
        newStats = {
          totalVisitors: 187954,
          activeVisitors: 5638,
          newVisitors: 3451,
          pageViews: 698541,
          averageVisitDuration: "4:12",
          bounceRate: 22.1
        };
        break;
      case 'all':
        setDataSource('كل الفترات');
        newStats = {
          totalVisitors: 1254863,
          activeVisitors: 15935,
          newVisitors: 9872,
          pageViews: 4587369,
          averageVisitDuration: "3:48",
          bounceRate: 24.5
        };
        break;
      default:
        setDataSource('اليوم');
        newStats = {
          totalVisitors: 12458,
          activeVisitors: 345,
          newVisitors: 127,
          pageViews: 38254,
          averageVisitDuration: "3:24",
          bounceRate: 25.4
        };
    }
    
    setVisitorStats(newStats);
  }, [timeFilter]);
  
  return (
    <div className="flex h-screen bg-gray-100 rtl">
      {/* القائمة الجانبية */}
      <Sidebar activePath="/admin/users" />
      
      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">إحصائيات الزوار</h1>
            
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
          {/* أدوات البحث والفلترة */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTimeFilter('day')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    timeFilter === 'day'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  اليوم
                </button>
                <button
                  onClick={() => setTimeFilter('week')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    timeFilter === 'week'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  الأسبوع
                </button>
                <button
                  onClick={() => setTimeFilter('month')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    timeFilter === 'month'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  الشهر
                </button>
                <button
                  onClick={() => setTimeFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    timeFilter === 'all'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  الكل
                </button>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="البحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 pl-10 w-64"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* بطاقات الإحصائيات الرئيسية */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-gray-500">إجمالي الزوار</p>
                  <h2 className="text-2xl font-bold text-gray-800">{visitorStats.totalVisitors.toLocaleString()}</h2>
                  <p className="text-xs text-green-600">+{visitorStats.newVisitors} زائر جديد</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-gray-500">مشاهدات الصفحات</p>
                  <h2 className="text-2xl font-bold text-gray-800">{visitorStats.pageViews.toLocaleString()}</h2>
                  <p className="text-xs text-amber-600">{Math.round(visitorStats.pageViews / visitorStats.totalVisitors * 10) / 10} مشاهدة/زائر</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-gray-500">متوسط مدة الزيارة</p>
                  <h2 className="text-2xl font-bold text-gray-800">{visitorStats.averageVisitDuration}</h2>
                  <p className="text-xs text-green-600">دقائق:ثواني</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* تحليل مصادر الزيارات والسلوك */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">مصادر الزيارات</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">البحث المباشر</span>
                      <span className="text-gray-600 text-sm">52%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '52%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">روابط خارجية</span>
                      <span className="text-gray-600 text-sm">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">وسائل التواصل</span>
                      <span className="text-gray-600 text-sm">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">أخرى</span>
                      <span className="text-gray-600 text-sm">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">سلوك المستخدمين</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">👀</span>
                    <div>
                      <p className="text-gray-600">معدل الارتداد</p>
                      <p className="text-xl font-bold">{visitorStats.bounceRate}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">⏱️</span>
                    <div>
                      <p className="text-gray-600">الزوار النشطين</p>
                      <p className="text-xl font-bold">{visitorStats.activeVisitors}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">📱</span>
                    <div>
                      <p className="text-gray-600">الجوال</p>
                      <p className="text-xl font-bold">68%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">💻</span>
                    <div>
                      <p className="text-gray-600">سطح المكتب</p>
                      <p className="text-xl font-bold">32%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* أكثر الصفحات زيارة */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">أكثر الصفحات زيارة</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-right">
                    <th className="p-4 font-medium text-gray-700">الصفحة</th>
                    <th className="p-4 font-medium text-gray-700">المشاهدات</th>
                    <th className="p-4 font-medium text-gray-700">المدة المتوسطة</th>
                    <th className="p-4 font-medium text-gray-700">معدل الارتداد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium">الصفحة الرئيسية</td>
                    <td className="p-4 text-gray-600">12,854</td>
                    <td className="p-4 text-gray-600">2:15</td>
                    <td className="p-4 text-gray-600">32%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium">المقالات / أفضل-استراتيجيات-اللعبة</td>
                    <td className="p-4 text-gray-600">8,428</td>
                    <td className="p-4 text-gray-600">4:32</td>
                    <td className="p-4 text-gray-600">18%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium">المتجر</td>
                    <td className="p-4 text-gray-600">6,932</td>
                    <td className="p-4 text-gray-600">5:17</td>
                    <td className="p-4 text-gray-600">15%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium">المدونة</td>
                    <td className="p-4 text-gray-600">5,381</td>
                    <td className="p-4 text-gray-600">3:42</td>
                    <td className="p-4 text-gray-600">24%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium">تقييم القلاع</td>
                    <td className="p-4 text-gray-600">4,275</td>
                    <td className="p-4 text-gray-600">6:28</td>
                    <td className="p-4 text-gray-600">12%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* تذييل القسم */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4 text-center text-gray-500">
            <p>آخر تحديث للبيانات: اليوم الساعة {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')} | مصدر البيانات: {dataSource}</p>
          </div>
        </main>
      </div>
    </div>
  );
} 