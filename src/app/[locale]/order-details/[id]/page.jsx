"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderDetails({ params }) {
  const { id, locale } = params;
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        // في النسخة الحقيقية، سيتم استبدال هذا بطلب API حقيقي
        // هنا نستخدم نموذج بيانات وهمي للتطوير
        setTimeout(() => {
          setOrder({
            id,
            status: 'قيد المعالجة',
            date: new Date().toLocaleDateString('ar-EG'),
            total: 150.00,
            items: [
              { name: 'باقة الموارد الأساسية', quantity: 1, price: 100 },
              { name: 'خدمة التحصين', quantity: 1, price: 50 }
            ],
            shipping: {
              address: 'معلومات التسليم الافتراضية',
              method: 'داخل اللعبة'
            },
            payment: {
              method: 'تحويل بنكي',
              status: 'تم الدفع'
            }
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('حدث خطأ أثناء جلب بيانات الطلب');
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل تفاصيل الطلب...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">خطأ في تحميل البيانات</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex justify-center space-x-4 rtl:space-x-reverse">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              إعادة المحاولة
            </button>
            <Link 
              href="/"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">الطلب غير موجود</h2>
          <p className="text-gray-600 mb-6">لم نتمكن من العثور على الطلب المطلوب</p>
          <Link 
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
          <div className="bg-blue-600 text-white p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">تفاصيل الطلب #{order.id}</h1>
              <span className="bg-blue-700 text-white px-4 py-1 rounded-full text-sm">
                {order.status}
              </span>
            </div>
            <p className="text-blue-100 mt-2">تاريخ الطلب: {order.date}</p>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">المشتريات</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-right py-3 px-4">المنتج</th>
                      <th className="text-center py-3 px-4">الكمية</th>
                      <th className="text-center py-3 px-4">السعر</th>
                      <th className="text-center py-3 px-4">المجموع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4">{item.name}</td>
                        <td className="text-center py-3 px-4">{item.quantity}</td>
                        <td className="text-center py-3 px-4">${item.price.toFixed(2)}</td>
                        <td className="text-center py-3 px-4">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-bold">
                      <td colSpan={3} className="text-left py-3 px-4">المجموع الكلي</td>
                      <td className="text-center py-3 px-4">${order.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-4 border-b pb-2">معلومات التسليم</h2>
                <p className="mb-2"><strong>العنوان:</strong> {order.shipping.address}</p>
                <p><strong>طريقة التسليم:</strong> {order.shipping.method}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4 border-b pb-2">معلومات الدفع</h2>
                <p className="mb-2"><strong>طريقة الدفع:</strong> {order.payment.method}</p>
                <p><strong>حالة الدفع:</strong> {order.payment.status}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 flex justify-between items-center">
            <Link 
              href="/orders"
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 transition-colors"
            >
              العودة للطلبات
            </Link>
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              onClick={() => alert('تم إرسال طلب المساعدة')}
            >
              طلب المساعدة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 