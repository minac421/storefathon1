"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin';

// صفحة لوحة تحكم المسؤول
export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  // بيانات اعتماد المسؤول (في الإنتاج، يجب تخزين هذه البيانات بشكل آمن وعدم تضمينها في الكود)
  const adminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  // التحقق من تسجيل الدخول
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsLoggedIn(true);
      setLoginError('');
      // في التطبيق الحقيقي، يمكننا تخزين حالة تسجيل الدخول في الـ localStorage أو استخدام نظام مصادقة مناسب
    } else {
      setLoginError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  // نموذج تسجيل الدخول
  const renderLoginForm = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-amber-600">لوحة تحكم المسؤول</h1>
          
          {loginError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-gray-700">اسم المستخدم</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-gray-700">كلمة المرور</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    );
  };

  // صفحة لوحة التحكم
  const renderDashboard = () => {
    return (
      <div className="flex h-screen bg-gray-100 rtl">
        {/* القائمة الجانبية المشتركة */}
        <Sidebar activePath="/admin" />
        
        {/* المحتوى الرئيسي */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-900">لوحة المعلومات</h1>
              
              <div className="flex items-center">
                <span className="ml-4 text-gray-700">مرحباً، المسؤول</span>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="ml-4 text-gray-500 hover:text-amber-600"
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </header>
          
          <main className="max-w-7xl mx-auto py-6 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* إحصائيات */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="mr-4">
                    <p className="text-gray-500">الطلبات الجديدة</p>
                    <h2 className="text-2xl font-bold text-gray-800">12</h2>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="mr-4">
                    <p className="text-gray-500">الإيرادات</p>
                    <h2 className="text-2xl font-bold text-gray-800">5,200 $</h2>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="mr-4">
                    <p className="text-gray-500">العملاء</p>
                    <h2 className="text-2xl font-bold text-gray-800">45</h2>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <span className="text-2xl">🛍️</span>
                  </div>
                  <div className="mr-4">
                    <p className="text-gray-500">المنتجات</p>
                    <h2 className="text-2xl font-bold text-gray-800">18</h2>
                  </div>
                </div>
              </div>
            </div>
            
            {/* الأقسام الإضافية */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* أحدث الطلبات */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 font-medium flex justify-between items-center">
                  <h3>أحدث الطلبات</h3>
                  <Link href="/admin/orders" className="text-sm text-amber-600 hover:text-amber-700">
                    عرض الكل
                  </Link>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {/* طلبات وهمية */}
                  {[
                    { id: '1001', customer: 'أحمد محمد', date: 'اليوم، 10:30', amount: '450', status: 'جديد' },
                    { id: '1002', customer: 'سارة أحمد', date: 'اليوم، 09:15', amount: '720', status: 'قيد المعالجة' },
                    { id: '1003', customer: 'محمد علي', date: 'الأمس، 16:20', amount: '1200', status: 'مكتمل' },
                    { id: '1004', customer: 'فاطمة خالد', date: 'الأمس، 12:30', amount: '350', status: 'مكتمل' },
                  ].map(order => (
                    <div key={order.id} className="px-6 py-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">#{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{order.amount} $</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          order.status === 'جديد' 
                            ? 'bg-amber-100 text-amber-800' 
                            : order.status === 'قيد المعالجة'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* إحصائيات سريعة */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 font-medium">
                  <h3>نظرة سريعة على المبيعات</h3>
                </div>
                
                <div className="p-6">
                  {/* هنا يمكن إضافة رسم بياني بواسطة مكتبة مثل Chart.js */}
                  <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">الرسم البياني للمبيعات</p>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-gray-500 text-sm">هذا الأسبوع</p>
                      <p className="font-bold text-gray-800">1,750 $</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 text-sm">الأسبوع الماضي</p>
                      <p className="font-bold text-gray-800">1,420 $</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 text-sm">هذا الشهر</p>
                      <p className="font-bold text-gray-800">5,200 $</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  return isLoggedIn ? renderDashboard() : renderLoginForm();
} 