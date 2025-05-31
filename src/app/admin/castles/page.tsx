"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// بيانات القلاع الافتراضية للعرض قبل تحميل البيانات من قاعدة البيانات
const defaultCastles = [
  {
    id: "castle-1",
    name: "قلعة الصمود",
    description: "قلعة مستوى 10 قوية مع تحصينات متقدمة.",
    level: 10,
    strength: 75,
    price: 500,
    features: ["تحصينات متقدمة", "خندق دفاعي", "أبراج مراقبة"],
    icon: "🏰",
    popular: true,
    videoUrl: "https://example.com/castle1.mp4",
    castleType: "fortified"
  },
  {
    id: "castle-2",
    name: "قلعة الفاتح",
    description: "قلعة مستوى 15 مع مرافق هجومية ودفاعية متوازنة.",
    level: 15,
    strength: 90,
    price: 900,
    features: ["دفاعات متطورة", "قاعة تدريب فاخرة", "سجن القلعة"],
    icon: "🏯",
    popular: false,
    videoUrl: "https://example.com/castle2.mp4",
    castleType: "royal"
  }
];

export default function CastlesAdmin() {
  const router = useRouter();
  const [castles, setCastles] = useState(defaultCastles);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentCastle, setCurrentCastle] = useState(null);
  
  // وظيفة تحميل القلاع من قاعدة البيانات عبر API
  const loadCastles = async () => {
    setIsLoading(true);
    try {
      // جلب القلاع من API
      const response = await fetch('/api/castles');
      
      if (!response.ok) {
        throw new Error(`خطأ في الاتصال: ${response.status}`);
      }
      
      const data = await response.json();
      const castlesData = data.castles || [];
      
      // إذا لم تكن هناك قلاع في قاعدة البيانات، استخدم البيانات الافتراضية
      if (castlesData.length === 0) {
        // إضافة القلاع الافتراضية إلى قاعدة البيانات عبر API
        for (const castle of defaultCastles) {
          const { id, ...castleData } = castle;
          await fetch('/api/castles', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(castleData),
          });
        }
        
        // إعادة تحميل القلاع بعد الإضافة
        const freshResponse = await fetch('/api/castles');
        if (freshResponse.ok) {
          const freshData = await freshResponse.json();
          const freshCastles = freshData.castles || [];
          setCastles(freshCastles);
        }
      } else {
        setCastles(castlesData);
      }
    } catch (error) {
      console.error('خطأ في تحميل القلاع:', error);
      // في حالة الخطأ، استخدم البيانات الافتراضية
      setCastles(defaultCastles);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadCastles();
  }, []);
  
  // وظيفة حذف قلعة
  const handleDeleteCastle = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه القلعة؟')) {
      try {
        setIsLoading(true);
        // حذف القلعة عبر API
        const response = await fetch(`/api/castles?id=${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`خطأ في حذف القلعة: ${response.status}`);
        }
        
        // تحديث عرض القلاع بحذفها من القائمة
        setCastles(castles.filter(castle => castle.id !== id));
        setIsLoading(false);
      } catch (error) {
        console.error('خطأ في حذف القلعة:', error);
        setIsLoading(false);
        alert('حدث خطأ أثناء حذف القلعة');
      }
    }
  };
  
  // وظيفة تحرير قلعة
  const handleEditCastle = (castle: any) => {
    setCurrentCastle(castle);
    setShowAddForm(true);
  };
  
  // وظيفة إضافة قلعة جديدة
  const handleAddNewCastle = () => {
    setCurrentCastle(null);
    setShowAddForm(true);
  };
  
  // وظيفة حفظ القلعة (إضافة أو تحديث)
  const handleSaveCastle = async (castle: any) => {
    setIsLoading(true);
    try {
      if (castle.id && castle.id !== "castle-1" && castle.id !== "castle-2") {
        // تعديل قلعة موجودة عبر API
        const response = await fetch('/api/castles', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(castle),
        });
        
        if (!response.ok) {
          throw new Error(`خطأ في تحديث القلعة: ${response.status}`);
        }
        
        // تحديث القائمة المحلية
        setCastles(castles.map(c => c.id === castle.id ? castle : c));
      } else {
        // إضافة قلعة جديدة عبر API
        const castleWithoutId = { ...castle };
        if (castleWithoutId.id === "castle-1" || castleWithoutId.id === "castle-2") {
          delete castleWithoutId.id; // حذف المعرف الافتراضي ليتم إنشاء واحد جديد
        }
        
        const response = await fetch('/api/castles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(castleWithoutId),
        });
        
        if (!response.ok) {
          throw new Error(`خطأ في إضافة القلعة: ${response.status}`);
        }
        
        const data = await response.json();
        setCastles([...castles, { ...castle, id: data.id }]);
      }
      setShowAddForm(false);
      setCurrentCastle(null);
    } catch (error) {
      console.error('خطأ في حفظ القلعة:', error);
      alert('حدث خطأ أثناء حفظ القلعة');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen rtl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">إدارة القلاع</h1>
        
        <div className="flex gap-4">
          <Link 
            href="/admin" 
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            العودة للوحة التحكم
          </Link>
          <button 
            onClick={handleAddNewCastle}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            إضافة قلعة جديدة
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-8">جاري تحميل البيانات...</div>
      ) : showAddForm ? (
        <CastleForm 
          castle={currentCastle || undefined} 
          onCancel={() => setShowAddForm(false)}
          onSave={handleSaveCastle}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {castles.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">لا توجد قلاع. قم بإضافة قلعة جديدة.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القلعة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستوى</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القوة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">فيديو</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {castles.map((castle) => (
                  <tr key={castle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{castle.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{castle.name}</div>
                          <div className="text-gray-500 text-sm truncate max-w-xs">{castle.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{castle.level}</td>
                    <td className="px-6 py-4">{castle.strength}</td>
                    <td className="px-6 py-4">{castle.price} $</td>
                    <td className="px-6 py-4">{castle.castleType}</td>
                    <td className="px-6 py-4">
                      {castle.videoUrl ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          متوفر
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          غير متوفر
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditCastle(castle)} 
                          className="text-blue-600 hover:text-blue-900 ml-2"
                        >
                          تحرير
                        </button>
                        <button 
                          onClick={() => castle.id && handleDeleteCastle(castle.id)} 
                          className="text-red-600 hover:text-red-900"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

// مكون نموذج إضافة/تعديل القلعة
function CastleForm({ castle, onCancel, onSave }: { castle?: any, onCancel: () => void, onSave: (castle: any) => void }) {
  const isEditing = !!castle;
  
  // إعداد البيانات الافتراضية إذا كانت إضافة جديدة
  const emptyFormData = {
    id: '',
    name: '',
    description: '',
    level: 1,
    strength: 50,
    price: 100,
    features: [],
    icon: '🏰',
    popular: false,
    videoUrl: '',
    castleType: 'standard'
  };
  
  // حالة النموذج
  const [formData, setFormData] = useState(castle || emptyFormData);
  const [newFeature, setNewFeature] = useState('');
  
  // حالة تحميل الفيديو
  const [videoUpload, setVideoUpload] = useState({
    file: null,
    uploading: false,
    progress: 0,
    error: null,
    url: formData.videoUrl || null
  });
  
  // مرجع لمدخل ملف الفيديو
  const videoInputRef = React.useRef<HTMLInputElement>(null);
  
  // وظيفة لتحويل القيم النصية مثل 1M، 2B إلى أرقام
  const parseNumericValue = (value: string | number) => {
    if (!value) return 0;
    
    // التحقق من وجود K أو M أو B للمضاعفات
    const cleanValue = value.toString().trim().toUpperCase();
    
    if (cleanValue.endsWith('K')) {
      return parseFloat(cleanValue.replace('K', '')) * 1000;
    } else if (cleanValue.endsWith('M')) {
      return parseFloat(cleanValue.replace('M', '')) * 1000000;
    } else if (cleanValue.endsWith('B')) {
      return parseFloat(cleanValue.replace('B', '')) * 1000000000;
    } else {
      return parseFloat(cleanValue) || 0;
    }
  };

  // وظيفة لتنسيق الأرقام الكبيرة إلى صيغة مقروءة
  const formatNumericValue = (value: number) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + 'B';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    } else {
      return value.toString();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'level') {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
    } else if (name === 'strength' || name === 'price') {
      setFormData({ ...formData, [name]: parseNumericValue(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()]
      });
      setNewFeature("");
    }
  };
  
  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...(formData.features || [])];
    updatedFeatures.splice(index, 1);
    setFormData({ ...formData, features: updatedFeatures });
  };
  
  // Manejar la selección de archivos de vídeo
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      // Comprobar tamaño máximo (50 MB)
      const maxSize = 50 * 1024 * 1024; // 50 MB en bytes
      
      if (selectedFile.size > maxSize) {
        setVideoUpload(prev => ({
          ...prev,
          error: 'حجم الفيديو أكبر من الحد المسموح به (50 ميجابايت)',
          file: null
        }));
        return;
      }
      
      setVideoUpload(prev => ({
        ...prev,
        file: selectedFile,
        error: null,
        progress: 0,
        uploading: false
      }));
    }
  };
  
  // Manejar la carga del vídeo al servidor
  const handleVideoUpload = async () => {
    if (!videoUpload.file) {
      setVideoUpload(prev => ({
        ...prev,
        error: 'يجب تحديد فيديو للرفع'
      }));
      return;
    }
    
    // إذا كانت القلعة جديدة (بدون معرف)، نقوم بتخزين الفيديو مؤقتًا وتحويله إلى URL مؤقت
    if (!formData.id) {
      // للقلاع الجديدة، نقوم بقراءة الملف وتخزينه مؤقتًا في الذاكرة
      try {
        const reader = new FileReader();
        reader.readAsDataURL(videoUpload.file);
        reader.onload = () => {
          // تم تحويل الفيديو إلى شفرة base64
          const videoUrl = reader.result as string;
          setVideoUpload({
            file: videoUpload.file,
            uploading: false,
            progress: 100,
            error: null,
            url: videoUrl
          });
          
          // تحديث النموذج برابط الفيديو المؤقت
          setFormData(prev => ({
            ...prev,
            videoUrl: videoUrl
          }));
        };
        
        reader.onerror = () => {
          throw new Error('حدث خطأ أثناء قراءة الفيديو');
        };
        
        // محاكاة عملية التحميل
        setVideoUpload(prev => ({
          ...prev,
          uploading: true,
          progress: 5,
          error: null
        }));
        
        // محاكاة التقدم
        let progress = 10;
        const progressInterval = setInterval(() => {
          progress += 10;
          setVideoUpload(prev => ({ ...prev, progress }));
          if (progress >= 90) clearInterval(progressInterval);
        }, 200);
        
        return; // إنهاء الدالة هنا للقلاع الجديدة
      } catch (error) {
        console.error('خطأ في معالجة الفيديو:', error);
        setVideoUpload(prev => ({
          ...prev,
          error: 'حدث خطأ أثناء معالجة الفيديو'
        }));
        return;
      }
    }
    
    // Iniciar el proceso de carga
    setVideoUpload(prev => ({
      ...prev,
      uploading: true,
      progress: 5,
      error: null
    }));
    
    try {
      // Crear FormData para enviar el archivo
      const formDataObj = new FormData();
      formDataObj.append('castleId', formData.id);
      formDataObj.append('video', videoUpload.file);
      formDataObj.append('videoTitle', formData.name);
      
      // Simular progreso durante la carga
      const progressInterval = setInterval(() => {
        setVideoUpload(prev => {
          if (prev.progress < 90) {
            return { ...prev, progress: prev.progress + 10 };
          }
          return prev;
        });
      }, 500);
      
      // Realizar la petición de carga
      const response = await fetch('/api/castles/upload-video', {
        method: 'POST',
        body: formDataObj
      });
      
      // Detener el intervalo de progreso
      clearInterval(progressInterval);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'فشل في رفع الفيديو');
      }
      
      // Procesar la respuesta
      const result = await response.json();
      
      // Actualizar el estado con la URL del vídeo
      setVideoUpload({
        file: videoUpload.file,
        uploading: false,
        progress: 100,
        error: null,
        url: result.videoData.url
      });
      
      // Actualizar el formData con la URL del vídeo
      setFormData(prev => ({
        ...prev,
        videoUrl: result.videoData.url
      }));
      
    } catch (error) {
      // Manejar errores
      console.error('Error al cargar el vídeo:', error);
      setVideoUpload(prev => ({
        ...prev,
        uploading: false,
        error: error instanceof Error ? error.message : 'حدث خطأ أثناء رفع الفيديو'
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // التأكد من حفظ رابط الفيديو بشكل صحيح
    let finalVideoUrl = formData.videoUrl;
    
    // إذا تم رفع فيديو جديد، استخدم رابطه
    if (videoUpload.url) {
      finalVideoUrl = videoUpload.url;
    }
    
    // تنظيف وتحقق من رابط الفيديو
    if (finalVideoUrl) {
      finalVideoUrl = finalVideoUrl.trim();
      console.log('حفظ رابط الفيديو:', finalVideoUrl);
    }
    
    // تحديث بيانات القلعة
    const updatedCastle = {
      ...formData,
      features: formData.features || [],
      // استخدم الرابط المُعالج
      videoUrl: finalVideoUrl
    };
    
    console.log('بيانات القلعة المحدثة:', updatedCastle);
    onSave(updatedCastle);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">{isEditing ? 'تعديل قلعة' : 'إضافة قلعة جديدة'}</h2>
      
      <form onSubmit={handleSubmit} className="text-right font-noto-sans-arabic">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 text-lg font-medium">اسم القلعة *</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md text-lg font-noto-sans-arabic"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 text-lg font-medium">الرمز التعبيري</label>
            <select
              name="icon"
              value={formData.icon || '🏰'}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md text-lg font-noto-sans-arabic"
            >
              <option value="🏰">🏰 قلعة</option>
              <option value="🏯">🏯 قلعة يابانية</option>
              <option value="🏛️">🏛️ مبنى كلاسيكي</option>
              <option value="🏘️">🏘️ منازل</option>
              <option value="⚔️">⚔️ سيوف</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 text-lg font-medium">وصف القلعة *</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md text-lg font-noto-sans-arabic"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 text-lg font-medium">المستوى</label>
            <input
              type="number"
              name="level"
              min="1"
              value={formData.level || 1}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md text-lg font-noto-sans-arabic"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 text-lg font-medium">القوة</label>
            <input
              type="text"
              name="strength"
              value={formData.strength ? formatNumericValue(formData.strength) : '50'}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md text-lg font-noto-sans-arabic"
              placeholder="مثال: 1M, 500K, 2B"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 text-lg font-medium">السعر</label>
            <input
              type="text"
              name="price"
              value={formData.price ? formatNumericValue(formData.price) : '100'}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md text-lg font-noto-sans-arabic"
              placeholder="مثال: 1M, 500K, 2B"
            />
          </div>
          
          <div>
            <label className="inline-flex items-center text-lg">
              <input
                type="checkbox"
                name="popular"
                checked={formData.popular || false}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="mr-2 text-gray-700 font-medium">مميز (عرض شارة مميز)</span>
            </label>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 text-lg font-medium">نوع القلعة *</label>
            <select
              name="castleType"
              value={formData.castleType || 'standard'}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md text-lg font-noto-sans-arabic"
              required
            >
              <option value="standard">قياسية</option>
              <option value="fortified">محصنة</option>
              <option value="royal">ملكية</option>
              <option value="ancient">قديمة</option>
              <option value="modern">عصرية</option>
            </select>
          </div>
          
          {/* قسم ميزات القلعة */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 text-lg font-medium">ميزات القلعة</label>
            <div className="flex">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-r-none rounded-md"
                placeholder="أضف ميزة جديدة"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="bg-blue-600 text-white px-4 py-2 rounded-l-none rounded-md hover:bg-blue-700"
              >
                إضافة
              </button>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.features?.map((feature: string, index: number) => (
                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* قسم الفيديو */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 text-lg font-medium">رابط فيديو القلعة</label>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="أدخل رابط فيديو YouTube أو رابط مباشر للفيديو"
              />
              <p className="text-gray-500 text-sm">
                يمكنك إضافة رابط مباشر لملف فيديو أو رابط فيديو YouTube
              </p>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 text-lg font-medium">رفع فيديو</label>
            <div className="flex flex-col space-y-4">
              {/* منطقة رفع الفيديو */}
              <div 
                className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => videoInputRef.current?.click()}
              >
                <div className="text-center">
                  {videoUpload.file ? (
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="mt-2 text-gray-700">{(videoUpload.file as File).name}</span>
                      <span className="text-sm text-gray-500">{((videoUpload.file as File).size / (1024 * 1024)).toFixed(2)} ميجابايت</span>
                    </div>
                  ) : (
                    <>
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex justify-center text-sm text-gray-600 mt-2">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>رفع ملف فيديو</span>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">MP4, WebM, AVI بحد أقصى 50 ميجابايت</p>
                    </>
                  )}
                </div>
                <input 
                  ref={videoInputRef}
                  type="file" 
                  className="sr-only" 
                  accept="video/mp4,video/webm,video/avi,video/quicktime" 
                  onChange={handleVideoSelect}
                />
              </div>
              
              {/* زر رفع الفيديو */}
              {videoUpload.file && !videoUpload.uploading && !videoUpload.url && (
                <button
                  type="button"
                  onClick={handleVideoUpload}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  رفع الفيديو
                </button>
              )}
              
              {/* حالة تحميل الفيديو */}
              {videoUpload.uploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${videoUpload.progress}%` }}></div>
                  <p className="text-sm text-gray-600 mt-1">جاري الرفع... {videoUpload.progress}%</p>
                </div>
              )}
              
              {/* عرض خطأ الرفع */}
              {videoUpload.error && (
                <p className="text-red-500">{videoUpload.error}</p>
              )}
              
              {/* عرض الفيديو المرفوع */}
              {videoUpload.url && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-green-600 font-semibold mb-2">تم رفع الفيديو بنجاح!</p>
                  <video className="w-full mt-2 rounded-lg" controls>
                    <source src={videoUpload.url} type="video/mp4" />
                    المتصفح لا يدعم تشغيل الفيديو.
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="ml-3 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isEditing ? 'حفظ التغييرات' : 'إنشاء قلعة'}
          </button>
        </div>
      </form>
    </div>
  );
}

