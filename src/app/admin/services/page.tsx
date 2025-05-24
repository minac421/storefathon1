"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin';

// تعريف نوع للمنتج
interface Product {
  id: string;
  category: 'resources' | 'events' | 'bots';
  name: string;
  icon: string;
  price: number;
  popular: boolean;
  description?: string;
}

export default function ServicesManagement() {
  const router = useRouter();
  
  // حالة التحميل والخطأ
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // جلب المنتجات من API
  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error(`خطأ في الاتصال: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('بيانات الخدمات:', data);
        
        // تحويل البيانات إلى مصفوفة بسيطة
        let allServices: Product[] = [];
        
        if (data.services.resources) {
          const resources = data.services.resources.map((item: any) => ({
            id: item.id,
            category: 'resources',
            name: item.name.ar,
            icon: item.icon,
            price: item.price,
            popular: item.popular || false,
            description: item.description?.ar || ''
          }));
          allServices = [...allServices, ...resources];
        }
        
        if (data.services.bots) {
          const bots = data.services.bots.map((item: any) => ({
            id: item.id,
            category: 'bots',
            name: item.name.ar,
            icon: item.icon,
            price: item.price,
            popular: item.popular || false,
            description: item.description?.ar || ''
          }));
          allServices = [...allServices, ...bots];
        }
        
        if (data.services.castle) {
          const castles = data.services.castle.map((item: any) => ({
            id: item.id,
            category: 'castle',
            name: item.name.ar,
            icon: item.icon,
            price: item.price,
            popular: item.popular || false,
            description: item.description?.ar || ''
          }));
          allServices = [...allServices, ...castles];
        }
        
        if (data.services.events) {
          const events = data.services.events.map((item: any) => ({
            id: item.id,
            category: 'events',
            name: item.name.ar,
            icon: item.icon,
            price: item.price,
            popular: item.popular || false,
            description: item.description?.ar || ''
          }));
          allServices = [...allServices, ...events];
        }
        
        setProducts(allServices);
        setError(null);
      } catch (error) {
        console.error('خطأ في جلب الخدمات:', error);
        setError('حدث خطأ في جلب الخدمات. الرجاء المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);
  
  // تتبع تصنيف المنتجات النشط
  const [activeCategory, setActiveCategory] = useState<'resources' | 'events' | 'bots' | 'all'>('all');
  
  // نموذج جديد/تعديل منتج
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productForm, setProductForm] = useState<Product>({
    id: '',
    category: 'resources',
    name: '',
    icon: '',
    price: 0,
    popular: false,
    description: ''
  });
  
  // البحث في المنتجات
  const [searchQuery, setSearchQuery] = useState('');
  
  // الحصول على المنتجات المفلترة
  const getFilteredProducts = () => {
    let filtered = products;
    
    // تصفية حسب القسم
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    // تصفية حسب البحث
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  // فتح نموذج إضافة منتج جديد
  const openAddProductModal = () => {
    setIsEditMode(false);
    setProductForm({
      id: '',
      category: activeCategory === 'all' ? 'resources' : activeCategory,
      name: '',
      icon: '',
      price: 0,
      popular: false,
      description: ''
    });
    setIsModalOpen(true);
  };
  
  // فتح نموذج تعديل منتج
  const openEditProductModal = (product: Product) => {
    setIsEditMode(true);
    setProductForm({...product});
    setIsModalOpen(true);
  };
  
  // التعامل مع تغييرات النموذج
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProductForm(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price') {
      setProductForm(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setProductForm(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // إرسال النموذج
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // تحضير البيانات للإرسال بالتنسيق الصحيح
      const productId = productForm.id || productForm.name.toLowerCase().replace(/\s/g, '-');
      
      const serviceData = {
        id: productId,
        category: productForm.category,
        name: {
          ar: productForm.name,
          en: productForm.name, // يمكن تعديله لاحقاً لدعم اللغة الإنجليزية
          tr: productForm.name  // يمكن تعديله لاحقاً لدعم اللغة التركية
        },
        price: productForm.price,
        icon: productForm.icon,
        iconAlt: productForm.name,
        popular: productForm.popular,
        description: productForm.description ? {
          ar: productForm.description,
          en: productForm.description,
          tr: productForm.description
        } : undefined
      };
      
      let response;
      
      if (isEditMode) {
        // تحديث منتج موجود
        response = await fetch('/api/services', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(serviceData)
        });
      } else {
        // إضافة منتج جديد
        response = await fetch('/api/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(serviceData)
        });
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'حدث خطأ أثناء حفظ البيانات');
      }
      
      // إعادة تحميل الخدمات
      const fetchResponse = await fetch('/api/services');
      const data = await fetchResponse.json();
      
      // تحويل البيانات
      let allServices: Product[] = [];
      
      if (data.services.resources) {
        const resources = data.services.resources.map((item: any) => ({
          id: item.id,
          category: 'resources',
          name: item.name.ar,
          icon: item.icon,
          price: item.price,
          popular: item.popular || false,
          description: item.description?.ar || ''
        }));
        allServices = [...allServices, ...resources];
      }
      
      if (data.services.bots) {
        const bots = data.services.bots.map((item: any) => ({
          id: item.id,
          category: 'bots',
          name: item.name.ar,
          icon: item.icon,
          price: item.price,
          popular: item.popular || false,
          description: item.description?.ar || ''
        }));
        allServices = [...allServices, ...bots];
      }
      
      if (data.services.castle) {
        const castles = data.services.castle.map((item: any) => ({
          id: item.id,
          category: 'castle',
          name: item.name.ar,
          icon: item.icon,
          price: item.price,
          popular: item.popular || false,
          description: item.description?.ar || ''
        }));
        allServices = [...allServices, ...castles];
      }
      
      if (data.services.events) {
        const events = data.services.events.map((item: any) => ({
          id: item.id,
          category: 'events',
          name: item.name.ar,
          icon: item.icon,
          price: item.price,
          popular: item.popular || false,
          description: item.description?.ar || ''
        }));
        allServices = [...allServices, ...events];
      }
      
      setProducts(allServices);
      alert(isEditMode ? 'تم تحديث المنتج بنجاح' : 'تمت إضافة المنتج بنجاح');
    } catch (error: any) {
      console.error('خطأ في إرسال النموذج:', error);
      alert(`خطأ في إرسال النموذج: ${error.message || 'حدث خطأ غير معروف'}`);
    } finally {
      setLoading(false);
      setIsModalOpen(false); // إغلاق النموذج
    }
  };
  
  // حذف منتج
  const handleDeleteProduct = async (productId: string, category: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج؟')) {
      try {
        setLoading(true);
        
        // حذف المنتج باستخدام API
        const response = await fetch(`/api/services?id=${productId}&category=${category}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'حدث خطأ أثناء حذف المنتج');
        }
        
        // تحديث القائمة المحلية
        setProducts(prevProducts => 
          prevProducts.filter(product => 
            !(product.id === productId && product.category === category)
          )
        );
        
        alert('تم حذف المنتج بنجاح');
      } catch (error: any) {
        console.error('خطأ في حذف المنتج:', error);
        alert(`خطأ في حذف المنتج: ${error.message || 'حدث خطأ غير معروف'}`);
      } finally {
        setLoading(false);
      }
    }
  };
  
  // أيقونات المنتجات المتاحة
  const availableIcons = ['🌾', '🌲', '⛏️', '🥈', '🥇', '📅', '✨', '🍂', '🚜', '🛡️', '⚔️', '🔄', '💎', '🏆', '🧪', '🔮'];
  
  // نموذج المنتج
  const renderProductModal = () => {
    if (!isModalOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditMode ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleFormSubmit}>
            <div className="space-y-4">
              {/* المعرف والقسم */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="id" className="block mb-1 text-gray-700">
                    المعرف (بالإنجليزية)
                  </label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={productForm.id}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="مثال: gold"
                    required={!isEditMode}
                    readOnly={isEditMode}
                  />
                  {isEditMode && (
                    <p className="text-xs text-gray-500 mt-1">لا يمكن تغيير المعرف بعد الإنشاء</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="category" className="block mb-1 text-gray-700">القسم</label>
                  <select
                    id="category"
                    name="category"
                    value={productForm.category}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                    disabled={isEditMode}
                  >
                    <option value="resources">الموارد</option>
                    <option value="events">الأحداث</option>
                    <option value="bots">الروبوتات</option>
                  </select>
                  {isEditMode && (
                    <p className="text-xs text-gray-500 mt-1">لا يمكن تغيير القسم بعد الإنشاء</p>
                  )}
                </div>
              </div>
              
              {/* الاسم والسعر */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-1 text-gray-700">اسم المنتج</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={productForm.name}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block mb-1 text-gray-700">السعر</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productForm.price}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    min="0"
                    step="1"
                    required
                  />
                </div>
              </div>
              
              {/* الأيقونة والشعبية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="icon" className="block mb-1 text-gray-700">الأيقونة</label>
                  <div className="grid grid-cols-8 gap-2 mb-2 border border-gray-300 rounded-lg p-2 bg-gray-50">
                    {availableIcons.map(icon => (
                      <button
                        key={icon}
                        type="button"
                        className={`text-2xl p-2 rounded ${
                          productForm.icon === icon
                            ? 'bg-amber-200 border-2 border-amber-500'
                            : 'bg-white border border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={() => setProductForm(prev => ({ ...prev, icon }))}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                  <div className="border border-gray-300 rounded-lg p-4 text-center">
                    <span className="text-4xl">
                      {productForm.icon || '⬆️ اختر أيقونة'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="h-full flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="popular"
                        checked={productForm.popular}
                        onChange={handleFormChange}
                        className="h-5 w-5 text-amber-600"
                      />
                      <span className="mr-2 text-gray-700">منتج شائع (سيتم تمييزه)</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* الوصف */}
              <div>
                <label htmlFor="description" className="block mb-1 text-gray-700">الوصف</label>
                <textarea
                  id="description"
                  name="description"
                  value={productForm.description || ''}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg h-24"
                  placeholder="اكتب وصفاً مختصراً للمنتج..."
                ></textarea>
              </div>
              
              {/* أزرار الإجراءات */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  {isEditMode ? 'تحديث المنتج' : 'إضافة المنتج'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex h-screen bg-gray-100 rtl">
      {/* القائمة الجانبية */}
      <Sidebar activePath="/admin/services" />
      
      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">إدارة المنتجات</h1>
            
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
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeCategory === 'all'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => setActiveCategory('resources')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeCategory === 'resources'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  الموارد
                </button>
                <button
                  onClick={() => setActiveCategory('events')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeCategory === 'events'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  الأحداث
                </button>
                <button
                  onClick={() => setActiveCategory('bots')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeCategory === 'bots'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  الروبوتات
                </button>
              </div>
              
              <div className="flex space-x-2 rtl:space-x-reverse">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="البحث في المنتجات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 pl-10 w-64"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <button
                  onClick={openAddProductModal}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  إضافة منتج
                </button>
              </div>
            </div>
          </div>
          
          {/* قائمة المنتجات */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {getFilteredProducts().length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-right">
                      <th className="p-4 font-medium text-gray-700">المنتج</th>
                      <th className="p-4 font-medium text-gray-700">القسم</th>
                      <th className="p-4 font-medium text-gray-700">السعر</th>
                      <th className="p-4 font-medium text-gray-700">الوضع</th>
                      <th className="p-4 font-medium text-gray-700">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getFilteredProducts().map((product) => (
                      <tr key={`${product.category}-${product.id}`} className="hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center">
                            <span className="text-2xl ml-3">{product.icon}</span>
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              {product.description && (
                                <p className="text-sm text-gray-500">{
                                  product.description.length > 50
                                    ? product.description.substring(0, 50) + '...'
                                    : product.description
                                }</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          {
                            product.category === 'resources' ? 'الموارد' :
                            product.category === 'events' ? 'الأحداث' :
                            'الروبوتات'
                          }
                        </td>
                        <td className="p-4 font-medium">{product.price} $</td>
                        <td className="p-4">
                          {product.popular ? (
                            <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                              شائع
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                              عادي
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <button
                              onClick={() => openEditProductModal(product)}
                              className="p-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                              title="تعديل"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            
                            <button
                              onClick={() => handleDeleteProduct(product.id, product.category)}
                              className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                              title="حذف"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <p>لا توجد منتجات مطابقة للبحث</p>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* نموذج المنتج */}
      {renderProductModal()}
    </div>
  );
} 