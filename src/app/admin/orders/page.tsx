"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin';

// تعريف نوع للصور المرفقة مع الطلب
interface OrderImages {
  coordImageUrl?: string;
  nameImageUrl?: string;
}

// تعريف نوع للطلب
interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: 'جديد' | 'قيد المعالجة' | 'مكتمل' | 'ملغي';
  phone: string;
  email: string;
  items: { name: string; quantity: number; price: number }[];
  notes?: string;
  images?: OrderImages;
  kingdomNumber?: string;
}

export default function OrdersManagement() {
  const router = useRouter();
  
  // حالة تسجيل الدخول (نفترض أنه تم التحقق من المصادقة في المستقبل)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // قائمة الطلبات من API
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // جلب الطلبات من API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/orders');
        
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // تحويل البيانات المستلمة إلى نموذج الطلبات
        const formattedOrders = data.orders.map((order: any) => ({
          id: order.id,
          customer: order.customer.name,
          date: new Date(order.createdAt).toLocaleString('ar-EG'),
          amount: order.totalPrice.toString(),
          status: mapApiStatusToUiStatus(order.status),
          phone: order.customer.phone,
          email: order.customer.email,
          items: order.items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          notes: order.customer.notes,
          // إضافة بيانات الصور وإحداثيات المملكة
          images: order.images || {},
          kingdomNumber: order.customer.address ? order.customer.address.replace('Kingdom ', '') : ''
        }));
        
        setOrders(formattedOrders);
        setError(null);
      } catch (err) {
        console.error('خطأ في جلب الطلبات:', err);
        setError('حدث خطأ أثناء جلب الطلبات');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  // تحويل حالة API إلى حالة واجهة المستخدم
  const mapApiStatusToUiStatus = (apiStatus: string): Order['status'] => {
    switch (apiStatus) {
      case 'pending':
        return 'جديد';
      case 'processing':
        return 'قيد المعالجة';
      case 'completed':
        return 'مكتمل';
      case 'canceled':
        return 'ملغي';
      default:
        return 'جديد';
    }
  };
  
  // تحويل حالة واجهة المستخدم إلى حالة API
  const mapUiStatusToApiStatus = (uiStatus: Order['status']): string => {
    switch (uiStatus) {
      case 'جديد':
        return 'pending';
      case 'قيد المعالجة':
        return 'processing';
      case 'مكتمل':
        return 'completed';
      case 'ملغي':
        return 'canceled';
      default:
        return 'pending';
    }
  };
  
  // الطلب الذي تم تحديده للمعاينة
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // تحديث حالة الطلب
  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      // تحويل حالة واجهة المستخدم إلى حالة API
      const apiStatus = mapUiStatusToApiStatus(newStatus);
      
      // إرسال طلب تحديث الحالة إلى API
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: orderId,
          status: apiStatus
        })
      });
      
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      
      // تحديث حالة الطلب في الواجهة
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus } 
            : order
        )
      );
      
      // إذا كان الطلب محدداً للمعاينة، قم بتحديثه أيضاً
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      
    } catch (error) {
      console.error('خطأ في تحديث حالة الطلب:', error);
      alert('حدث خطأ أثناء تحديث حالة الطلب');
    }
  };
  
  // الحصول على لون حالة الطلب
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'جديد':
        return 'bg-amber-100 text-amber-800';
      case 'قيد المعالجة':
        return 'bg-blue-100 text-blue-800';
      case 'مكتمل':
        return 'bg-green-100 text-green-800';
      case 'ملغي':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // الحصول على نص تحديد حالة الطلب
  const getSelectStatusText = (status: Order['status']) => {
    switch (status) {
      case 'جديد':
        return 'جديد ⭐';
      case 'قيد المعالجة':
        return 'قيد المعالجة 🔄';
      case 'مكتمل':
        return 'مكتمل ✅';
      case 'ملغي':
        return 'ملغي ❌';
      default:
        return status;
    }
  };
  
  // فلترة الطلبات (يمكن إضافة المزيد من خيارات التصفية في المستقبل)
  const [statusFilter, setStatusFilter] = useState<string>('الكل');
  
  // الحصول على الطلبات المفلترة
  const getFilteredOrders = () => {
    if (statusFilter === 'الكل') {
      return orders;
    } else {
      return orders.filter(order => order.status === statusFilter);
    }
  };
  
  // عرض تفاصيل الطلب المحدد
  const renderOrderDetails = () => {
    if (!selectedOrder) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">تفاصيل الطلب #{selectedOrder.id}</h2>
            <button
              onClick={() => setSelectedOrder(null)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* معلومات العميل */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">معلومات العميل</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">الاسم:</p>
                <p className="font-medium">{selectedOrder.customer}</p>
              </div>
              <div>
                <p className="text-gray-600">الهاتف:</p>
                <p className="font-medium">{selectedOrder.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">البريد الإلكتروني:</p>
                <p className="font-medium">{selectedOrder.email}</p>
              </div>
              <div>
                <p className="text-gray-600">تاريخ الطلب:</p>
                <p className="font-medium">{selectedOrder.date}</p>
              </div>
            </div>
          </div>
          
          {/* حالة الطلب */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">حالة الطلب</h3>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <select
                value={selectedOrder.status}
                onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as Order['status'])}
                className="border border-gray-300 rounded-lg p-2 flex-grow text-md"
              >
                <option value="جديد">جديد ⭐</option>
                <option value="قيد المعالجة">قيد المعالجة 🔄</option>
                <option value="مكتمل">مكتمل ✅</option>
                <option value="ملغي">ملغي ❌</option>
              </select>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                {selectedOrder.status}
              </span>
            </div>
          </div>
          
          {/* عناصر الطلب */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">عناصر الطلب</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-right">
                  <th className="p-2 text-gray-600">المنتج</th>
                  <th className="p-2 text-gray-600">الكمية</th>
                  <th className="p-2 text-gray-600">السعر</th>
                  <th className="p-2 text-gray-600">المجموع</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedOrder.items.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.price} $</td>
                    <td className="p-2 font-medium">{item.price * item.quantity} $</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-semibold">
                  <td colSpan={3} className="p-2 text-left">المجموع الكلي:</td>
                  <td className="p-2">{selectedOrder.amount} $</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          {/* صور الطلب */}
          {selectedOrder.images && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">صور الطلب</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedOrder.images.coordImageUrl && (
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-gray-700">صورة الإحداثيات - مملكة {selectedOrder.kingdomNumber}</h4>
                    <div className="aspect-w-16 aspect-h-9 mb-2">
                      <img 
                        src={selectedOrder.images.coordImageUrl} 
                        alt="صورة الإحداثيات" 
                        className="object-contain w-full h-auto rounded border bg-gray-50 p-1"
                      />
                    </div>
                    <a 
                      href={selectedOrder.images.coordImageUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-800 text-sm inline-flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      فتح الصورة في نافذة جديدة
                    </a>
                  </div>
                )}

                {selectedOrder.images.nameImageUrl && (
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-gray-700">صورة اسم اللاعب</h4>
                    <div className="aspect-w-16 aspect-h-9 mb-2">
                      <img 
                        src={selectedOrder.images.nameImageUrl} 
                        alt="صورة اسم اللاعب" 
                        className="object-contain w-full h-auto rounded border bg-gray-50 p-1"
                      />
                    </div>
                    <a 
                      href={selectedOrder.images.nameImageUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-800 text-sm inline-flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      فتح الصورة في نافذة جديدة
                    </a>
                  </div>
                )}

                {!selectedOrder.images.coordImageUrl && !selectedOrder.images.nameImageUrl && (
                  <div className="col-span-2 p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                    لم يتم رفع أي صور مع هذا الطلب
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* ملاحظات إضافية */}
          {selectedOrder.notes && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">ملاحظات</h3>
              <p className="p-3 bg-gray-50 rounded-lg">{selectedOrder.notes}</p>
            </div>
          )}
          
          {/* أزرار الإجراءات */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setSelectedOrder(null)}
              className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              إغلاق
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              طباعة
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // عرض صفحة إدارة الطلبات
  return (
    <div className="flex h-screen bg-gray-100 rtl">
      {/* استخدام مكون الشريط الجانبي المشترك */}
      <Sidebar activePath="/admin/orders" />
      
      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">إدارة الطلبات</h1>
            
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
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="text-gray-700">فلترة حسب:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2"
                >
                  <option value="الكل">الكل</option>
                  <option value="جديد">جديد</option>
                  <option value="قيد المعالجة">قيد المعالجة</option>
                  <option value="مكتمل">مكتمل</option>
                  <option value="ملغي">ملغي</option>
                </select>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="البحث في الطلبات..."
                  className="border border-gray-300 rounded-lg p-2 pr-10 w-64"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* جدول الطلبات */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-right">
                    <th className="p-4 font-medium text-gray-700">رقم الطلب</th>
                    <th className="p-4 font-medium text-gray-700">العميل</th>
                    <th className="p-4 font-medium text-gray-700">التاريخ</th>
                    <th className="p-4 font-medium text-gray-700">المبلغ</th>
                    <th className="p-4 font-medium text-gray-700">الحالة</th>
                    <th className="p-4 font-medium text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getFilteredOrders().map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium">#{order.id}</td>
                      <td className="p-4">{order.customer}</td>
                      <td className="p-4">{order.date}</td>
                      <td className="p-4">{order.amount} $</td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-amber-600 hover:text-amber-800 focus:outline-none"
                            title="عرض التفاصيل"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          
                          <div className="relative">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                              className="border border-gray-300 rounded-lg p-1 text-sm"
                            >
                              <option value="جديد">جديد ⭐</option>
                              <option value="قيد المعالجة">قيد المعالجة 🔄</option>
                              <option value="مكتمل">مكتمل ✅</option>
                              <option value="ملغي">ملغي ❌</option>
                            </select>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      
      {/* عرض تفاصيل الطلب إذا تم تحديده */}
      {selectedOrder && renderOrderDetails()}
    </div>
  );
} 