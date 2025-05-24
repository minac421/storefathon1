"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin';

// تعريف نوع للمستخدم
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  joinedDate: string;
  lastLogin: string;
  ordersCount: number;
}

export default function UsersManagement() {
  const router = useRouter();
  
  // بيانات المستخدمين (في التطبيق الواقعي ستكون من API)
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      role: 'user',
      status: 'active',
      joinedDate: '2025-01-15',
      lastLogin: '2025-05-12',
      ordersCount: 5
    },
    {
      id: '2',
      name: 'سارة أحمد',
      email: 'sara@example.com',
      role: 'user',
      status: 'active',
      joinedDate: '2025-02-20',
      lastLogin: '2025-05-10',
      ordersCount: 3
    },
    {
      id: '3',
      name: 'محمد علي',
      email: 'mohamed@example.com',
      role: 'user',
      status: 'inactive',
      joinedDate: '2025-03-05',
      lastLogin: '2025-04-15',
      ordersCount: 1
    },
    {
      id: '4',
      name: 'فاطمة خالد',
      email: 'fatima@example.com',
      role: 'user',
      status: 'active',
      joinedDate: '2025-03-22',
      lastLogin: '2025-05-13',
      ordersCount: 2
    },
    {
      id: '5',
      name: 'المسؤول',
      email: 'admin@conquerors.com',
      role: 'admin',
      status: 'active',
      joinedDate: '2025-01-01',
      lastLogin: '2025-05-13',
      ordersCount: 0
    }
  ]);
  
  // البحث في المستخدمين
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  
  // الحصول على المستخدمين المفلترة
  const getFilteredUsers = () => {
    let filtered = users;
    
    // تصفية حسب الحالة
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    // تصفية حسب البحث
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  // تغيير حالة المستخدم
  const toggleUserStatus = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
  };
  
  return (
    <div className="flex h-screen bg-gray-100 rtl">
      {/* القائمة الجانبية */}
      <Sidebar activePath="/admin/users" />
      
      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">إدارة المستخدمين</h1>
            
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
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    statusFilter === 'all'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    statusFilter === 'active'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  نشط
                </button>
                <button
                  onClick={() => setStatusFilter('inactive')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    statusFilter === 'inactive'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  غير نشط
                </button>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="البحث عن مستخدم..."
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
          
          {/* قائمة المستخدمين */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {getFilteredUsers().length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-right">
                      <th className="p-4 font-medium text-gray-700">المستخدم</th>
                      <th className="p-4 font-medium text-gray-700">البريد الإلكتروني</th>
                      <th className="p-4 font-medium text-gray-700">الدور</th>
                      <th className="p-4 font-medium text-gray-700">تاريخ الانضمام</th>
                      <th className="p-4 font-medium text-gray-700">آخر تسجيل دخول</th>
                      <th className="p-4 font-medium text-gray-700">عدد الطلبات</th>
                      <th className="p-4 font-medium text-gray-700">الحالة</th>
                      <th className="p-4 font-medium text-gray-700">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getFilteredUsers().map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{user.name}</td>
                        <td className="p-4 text-gray-600">{user.email}</td>
                        <td className="p-4">
                          {user.role === 'admin' ? (
                            <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                              مسؤول
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              مستخدم
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-gray-600" dir="ltr">{user.joinedDate}</td>
                        <td className="p-4 text-gray-600" dir="ltr">{user.lastLogin}</td>
                        <td className="p-4 text-center">{user.ordersCount}</td>
                        <td className="p-4">
                          {user.status === 'active' ? (
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              نشط
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                              غير نشط
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className={`px-3 py-1 text-xs rounded-full focus:outline-none ${
                                user.status === 'active'
                                  ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                              disabled={user.role === 'admin'}
                              title={user.status === 'active' ? 'تعطيل' : 'تفعيل'}
                            >
                              {user.status === 'active' ? 'تعطيل' : 'تفعيل'}
                            </button>
                            
                            <Link href={`/admin/orders?user=${user.id}`}>
                              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs hover:bg-amber-200 cursor-pointer">
                                عرض الطلبات
                              </span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <p>لا يوجد مستخدمين مطابقين للبحث</p>
              </div>
            )}
          </div>
          
          {/* تذييل القسم */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4 text-center text-gray-500">
            <p>إجمالي المستخدمين: {users.length} | نشطين: {users.filter(u => u.status === 'active').length} | غير نشطين: {users.filter(u => u.status === 'inactive').length}</p>
          </div>
        </main>
      </div>
    </div>
  );
} 