"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin';

// تعريف نوع للمنتج
interface Product {
  id: string;
  category: 'resources' | 'events' | 'bots' | 'castle' | 'charging' | 'shipping';
  name: string;
  icon: string;
  image?: string;
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
            image: item.image || '',
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
            image: item.image || '',
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
            image: item.image || '',
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
            image: item.image || '',
            price: item.price,
            popular: item.popular || false,
            description: item.description?.ar || ''
          }));
          allServices = [...allServices, ...events];
        }
        
        if (data.services.charging) {
          const charging = data.services.charging.map((item: any) => ({
            id: item.id,
            category: 'charging',
            name: item.name.ar,
            icon: item.icon,
            image: item.image || '',
            price: item.price,
            popular: item.popular || false,
            description: item.description?.ar || ''
          }));
          allServices = [...allServices, ...charging];
        }
        
        if (data.services.shipping) {
          const shipping = data.services.shipping.map((item: any) => ({
            id: item.id,
            category: 'shipping',
            name: item.name.ar,
            icon: item.icon,
            image: item.image || '',
            price: item.price,
            popular: item.popular || false,
            description: item.description?.ar || ''
          }));
          allServices = [...allServices, ...shipping];
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
  const [activeCategory, setActiveCategory] = useState<'resources' | 'events' | 'bots' | 'castle' | 'charging' | 'shipping' | 'all'>('all');
  
  // نموذج جديد/تعديل منتج
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productForm, setProductForm] = useState<Product>({
    id: '',
    category: 'resources',
    name: '',
    icon: '',
    image: '',
    price: 0,
    popular: false,
    description: ''
  });
  
  // البحث في المنتجات
  const [searchQuery, setSearchQuery] = useState('');
  
  // إضافة حالة لتخزين صورة المنتج
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
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
    
    // اختيار الفئة الافتراضية بناءً على التصفية الحالية
    const category = activeCategory === 'all' ? 'resources' : activeCategory;
    
    // اختيار الأيقونة الافتراضية حسب الفئة
    let defaultIcon = '🌾';
    if (category === 'bots') defaultIcon = '🤖';
    else if (category === 'events') defaultIcon = '🎮';
    else if (category === 'castle') defaultIcon = '🏰';
    else if (category === 'charging') defaultIcon = '💳';
    else if (category === 'shipping') defaultIcon = '🚚';
    
    // إعادة تعيين حالة الصورة
    setProductImage(null);
    setImagePreview('');
    
    setProductForm({
      id: '',
      category,
      name: '',
      icon: defaultIcon,
      image: '',
      price: 0,
      popular: false,
      description: ''
    });
    setIsModalOpen(true);
  };
  
  // أيقونات المنتجات المتاحة حسب الفئة
  const getCategoryIcons = (category: string): string[] => {
    // أيقونات فريدة لكل فئة
    switch(category) {
      case 'resources':
        return ['🌾', '🌲', '⛏️', '🥈', '🥇', '🍂', '🚜'];
      case 'bots':
        return ['🤖', '🎮', '🤖', '✨', '📅'];
      case 'events':
        return ['🎮', '🏆', '👑', '🎁', '✨'];
      case 'castle':
        return ['🏰', '🛡️', '⚔️', '🏯', '🔮', '🧪'];
      case 'charging':
        return ['💳', '💰', '🪙', '👑', '✨', '📅'];
      case 'shipping':
        return ['🚚', '📦', '🚛', '🚀', '✈️', '🛳️', '🛵'];
      default:
        return ['🌾', '🤖', '🎮', '🏰', '💳', '🚚']; // أيقونات افتراضية
    }
  };
  
  // أيقونات شائعة يمكن استخدامها مع أي فئة
  const getCommonIcons = (): string[] => {
    return ['🔄', '🏆', '✨', '📅', '👑', '💰', '🔮', '🧪'];
  };
  
  // كل الأيقونات المتاحة
  const getAllIcons = (): string[] => {
    return [
      '🌾', '🌲', '⛏️', '🥈', '🥇', '🍂', '🚜',  // موارد
      '🤖', '🎮', '✨', '📅',                      // بوتات
      '🏆', '👑', '🎁',                           // أحداث
      '🏰', '🏯', '🛡️', '⚔️', '🔮', '🧪',        // قلاع
      '💳', '💰', '🪙',                           // شحن
      '🚚', '📦', '🚛', '🚀', '✈️', '🛳️', '🛵',   // خدمات الشحن
      '🔄', '💎', '🏆', '✨', '📅', '💼'           // عام
    ];
  };
  
  // فتح نموذج تعديل منتج
  const openEditProductModal = (product: Product) => {
    setIsEditMode(true);
    setProductForm({...product});
    
    // إعادة تعيين حالة الصورة للمنتج الحالي
    setProductImage(null);
    setImagePreview(product.image || '');
    
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
    } else if (name === 'id') {
      // تنظيف المعرف: تحويل إلى أحرف صغيرة وإزالة المسافات والرموز الخاصة
      const cleanId = value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
      setProductForm(prev => ({ ...prev, [name]: cleanId }));
    } else {
      setProductForm(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // التعامل مع اختيار الصور
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // التحقق من حجم الملف (أقل من 2 ميجابايت)
      if (file.size > 2 * 1024 * 1024) {
        alert('حجم الصورة يتجاوز 2 ميجابايت. الرجاء اختيار صورة أصغر.');
        return;
      }
      
      // التحقق من نوع الملف
      const fileType = file.type.toLowerCase();
      if (!fileType.includes('jpeg') && !fileType.includes('jpg') && !fileType.includes('png') && !fileType.includes('webp')) {
        alert('الرجاء اختيار صورة بتنسيق JPG أو PNG أو WEBP فقط.');
        return;
      }
      
      console.log('تم اختيار صورة:', file.name, 'الحجم:', (file.size / 1024).toFixed(2) + ' كيلوبايت');
      setProductImage(file);
      
      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProductImage(null);
      setImagePreview('');
    }
  };
  
  // التحقق من وجود معرف خدمة
  const checkIdExists = (id: string, category: string): boolean => {
    return products.some(product => 
      product.id === id && product.category === category
    );
  };
  
  // إرسال النموذج
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من المعرف
    const productId = productForm.id || productForm.name.toLowerCase().replace(/\s/g, '-');
    
    if (!isEditMode && checkIdExists(productId, productForm.category)) {
      alert(`المعرف "${productId}" مستخدم بالفعل في فئة "${
        productForm.category === 'resources' ? 'الموارد' :
        productForm.category === 'events' ? 'الأحداث' :
        productForm.category === 'bots' ? 'البوتات' :
        productForm.category === 'castle' ? 'القلاع' :
        productForm.category === 'charging' ? 'الشحن' :
        'خدمات الشحن'
      }". الرجاء استخدام معرف آخر.`);
      return;
    }
    
    setLoading(true);
    
    try {
          // رفع الصورة إذا تم اختيارها
    let imageUrl = productForm.image || '';
    
    if (productImage) {
      console.log('بدء رفع الصورة...');
      
      try {
        const formData = new FormData();
        formData.append('file', productImage);
        formData.append('category', productForm.category);
        formData.append('id', productId);
        
        console.log('إرسال بيانات الصورة:', productImage.name, 'الفئة:', productForm.category, 'المعرف:', productId);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        console.log('استجابة رفع الصورة - الحالة:', uploadResponse.status);
        
        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error('خطأ في استجابة رفع الصورة:', errorText);
          throw new Error(errorText || 'حدث خطأ أثناء رفع الصورة');
        }
        
        const uploadData = await uploadResponse.json();
        console.log('تم رفع الصورة بنجاح، المسار:', uploadData.url);
        imageUrl = uploadData.url;
      } catch (error) {
        console.error('خطأ أثناء رفع الصورة:', error);
        alert('حدث خطأ أثناء رفع الصورة، يرجى المحاولة مرة أخرى');
        setLoading(false);
        return;
      }
    }
      
      // تحضير البيانات للإرسال بالتنسيق الصحيح
      const finalProductId = productId;
      
      console.log('إرسال بيانات المنتج:', {
        فئة: productForm.category,
        معرف: finalProductId,
        اسم: productForm.name,
        صورة: imageUrl
      });
      
          console.log('تجهيز بيانات المنتج للإرسال مع الصورة:', imageUrl);
    
    const serviceData = {
      id: finalProductId,
      category: productForm.category,
      name: {
        ar: productForm.name,
        en: productForm.name,
        tr: productForm.name
      },
      price: productForm.price,
      icon: productForm.icon || '💳',
      iconAlt: productForm.name,
      popular: productForm.popular,
      image: imageUrl, // مسار الصورة بعد الرفع
      description: productForm.description ? {
        ar: productForm.description,
        en: productForm.description,
        tr: productForm.description
      } : undefined
    };
    
    console.log('بيانات المنتج النهائية للإرسال:', JSON.stringify(serviceData));
      
      console.log('البيانات المجهزة للإرسال:', JSON.stringify(serviceData));
      
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
        console.error('خطأ في استجابة API:', errorData);
        throw new Error(errorData.error || errorData.message || 'حدث خطأ أثناء حفظ البيانات');
      }
      
      // إعادة تحميل الخدمات
      console.log('جاري إعادة تحميل الخدمات بعد الحفظ...');
      const fetchResponse = await fetch('/api/services');
      const data = await fetchResponse.json();
      
      console.log('بيانات الخدمات المستلمة:', data);
      
      // تحويل البيانات
      let allServices: Product[] = [];
      
      if (data.services.resources) {
        const resources = data.services.resources.map((item: any) => ({
          id: item.id,
          category: 'resources',
          name: item.name.ar,
          icon: item.icon,
          image: item.image || '',
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
          image: item.image || '',
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
          image: item.image || '',
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
          image: item.image || '',
          price: item.price,
          popular: item.popular || false,
          description: item.description?.ar || ''
        }));
        allServices = [...allServices, ...events];
      }
      
      if (data.services.charging) {
        const charging = data.services.charging.map((item: any) => ({
          id: item.id,
          category: 'charging',
          name: item.name.ar,
          icon: item.icon,
          image: item.image || '',
          price: item.price,
          popular: item.popular || false,
          description: item.description?.ar || ''
        }));
        allServices = [...allServices, ...charging];
      }
      
      if (data.services.shipping) {
        const shipping = data.services.shipping.map((item: any) => ({
          id: item.id,
          category: 'shipping',
          name: item.name.ar,
          icon: item.icon,
          image: item.image || '',
          price: item.price,
          popular: item.popular || false,
          description: item.description?.ar || ''
        }));
        allServices = [...allServices, ...shipping];
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
  
  // نموذج المنتج
  const renderProductModal = () => {
    if (!isModalOpen) return null;
    
    // الحصول على أيقونات الفئة المحددة
    const categoryIcons = getCategoryIcons(productForm.category);
    const commonIcons = getCommonIcons();
    const allIcons = getAllIcons();
    
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
                  <div className="relative">
                    <input
                      type="text"
                      id="id"
                      name="id"
                      value={productForm.id}
                      onChange={handleFormChange}
                      className={`w-full p-2 border ${
                        !isEditMode && productForm.id && checkIdExists(productForm.id, productForm.category)
                          ? 'border-red-500'
                          : !isEditMode && productForm.id
                            ? 'border-green-500'
                            : 'border-gray-300'
                      } rounded-lg`}
                      placeholder="مثال: gold"
                      required={!isEditMode}
                      readOnly={isEditMode}
                    />
                    {!isEditMode && productForm.id && (
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {checkIdExists(productForm.id, productForm.category) ? (
                          <span className="text-red-500">❌</span>
                        ) : (
                          <span className="text-green-500">✓</span>
                        )}
                      </div>
                    )}
                  </div>
                  {isEditMode ? (
                    <p className="text-xs text-gray-500 mt-1">لا يمكن تغيير المعرف بعد الإنشاء</p>
                  ) : (
                    <p className="text-xs mt-1 rtl:text-right">
                      {productForm.id ? (
                        checkIdExists(productForm.id, productForm.category) ? (
                          <span className="text-red-500">المعرف مستخدم بالفعل، الرجاء اختيار معرف آخر</span>
                        ) : (
                          <span className="text-green-500">المعرف متاح</span>
                        )
                      ) : (
                        <span className="text-gray-500">أدخل معرفًا فريدًا للمنتج (حروف إنجليزية وأرقام وشرطات فقط)</span>
                      )}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="category" className="block mb-1 text-gray-700">القسم</label>
                  <select
                    id="category"
                    name="category"
                    value={productForm.category}
                    onChange={(e) => {
                      const newCategory = e.target.value as 'resources' | 'bots' | 'castle' | 'events' | 'charging' | 'shipping';
                      // اختيار أيقونة افتراضية للفئة الجديدة
                      let defaultIcon = '🌾';
                      if (newCategory === 'bots') defaultIcon = '🤖';
                      else if (newCategory === 'events') defaultIcon = '🎮';
                      else if (newCategory === 'castle') defaultIcon = '🏰';
                      else if (newCategory === 'charging') defaultIcon = '💳';
                      else if (newCategory === 'shipping') defaultIcon = '🚚';
                      
                      setProductForm(prev => ({ 
                        ...prev, 
                        category: newCategory,
                        icon: defaultIcon // تحديث الأيقونة تلقائياً
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                    disabled={isEditMode}
                  >
                    <option value="resources">الموارد</option>
                    <option value="events">الأحداث</option>
                    <option value="bots">البوتات</option>
                    <option value="castle">القلاع</option>
                    <option value="charging">الشحن</option>
                    <option value="shipping">خدمات الشحن</option>
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
                  
                  <p className="text-xs text-gray-500 mb-2">أيقونات مقترحة لفئة {
                    productForm.category === 'resources' ? 'الموارد' :
                    productForm.category === 'events' ? 'الأحداث' :
                    productForm.category === 'bots' ? 'البوتات' :
                    productForm.category === 'castle' ? 'القلاع' :
                    productForm.category === 'charging' ? 'الشحن' :
                    'خدمات الشحن'
                  }</p>
                  
                  <div className="grid grid-cols-8 gap-2 mb-2 border border-gray-300 rounded-lg p-2 bg-gray-50">
                    {categoryIcons.map((icon, index) => (
                      <button
                        key={`cat-${index}`}
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
                  
                  <p className="text-xs text-gray-500 mb-2">أيقونات شائعة</p>
                  <div className="grid grid-cols-8 gap-2 mb-2 border border-gray-300 rounded-lg p-2 bg-gray-50">
                    {commonIcons.map((icon, index) => (
                      <button
                        key={`common-${index}`}
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
                  
                  <p className="text-xs text-gray-500 mb-2">كل الأيقونات المتاحة</p>
                  <div className="grid grid-cols-8 gap-2 mb-2 border border-gray-300 rounded-lg p-2 bg-gray-50">
                    {allIcons.map((icon, index) => (
                      <button
                        key={`all-${index}`}
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
              
              {/* رفع صورة المنتج */}
              <div>
                <label htmlFor="productImage" className="block mb-1 text-gray-700">صورة المنتج</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="file"
                      id="productImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="productImage"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 text-center">
                          <span className="font-semibold">اضغط لرفع صورة</span> أو اسحب وأفلت
                        </p>
                        <p className="text-xs text-gray-500">PNG، JPG أو WEBP (الحد الأقصى: 2 ميجابايت)</p>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    {(imagePreview || productForm.image) ? (
                      <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview || productForm.image}
                          alt="معاينة الصورة"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('خطأ في تحميل الصورة:', e);
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // منع التكرار
                            target.src = '/placeholder-image.jpg'; // صورة بديلة
                            alert('فشل تحميل الصورة. يرجى التحقق من المسار: ' + (imagePreview || productForm.image));
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setProductImage(null);
                            setImagePreview('');
                            setProductForm(prev => ({ ...prev, image: '' }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          title="حذف الصورة"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50">
                        <p className="text-gray-400 text-center">لم يتم اختيار صورة</p>
                      </div>
                    )}
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
                  البوتات
                </button>
                <button
                  onClick={() => setActiveCategory('castle')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeCategory === 'castle'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  القلاع
                </button>
                <button
                  onClick={() => setActiveCategory('charging')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeCategory === 'charging'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  الشحن
                </button>
                <button
                  onClick={() => setActiveCategory('shipping')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeCategory === 'shipping'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  خدمات الشحن
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
                            {product.image ? (
                              <div className="w-12 h-12 rounded-lg ml-3 overflow-hidden bg-gray-100 flex-shrink-0">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    console.error('خطأ في تحميل صورة المنتج:', product.image);
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = '/placeholder-image.jpg';
                                  }}
                                />
                              </div>
                            ) : (
                              <span className="text-2xl ml-3">{product.icon}</span>
                            )}
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
                            product.category === 'bots' ? 'البوتات' :
                            product.category === 'castle' ? 'القلاع' :
                            product.category === 'charging' ? 'الشحن' :
                            'خدمات الشحن'
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