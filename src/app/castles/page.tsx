"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart';
import VideoModal from '@/components/VideoModal';
import CastleVideoButton from '@/components/CastleVideoButton';

// تعريف واجهة القلعة
interface Castle {
  id: number;
  name: string;
  description: string;
  level: number;
  strength: number;
  price: number;
  features: string[];
  icon: string;
  popular: boolean;
  videoUrl?: string; // إضافة عنوان URL للفيديو
}

// مكون النافذة المنبثقة لتفاصيل القلعة
interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  castle: Castle | null;
}



const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, castle }) => {
  if (!isOpen || !castle) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
      <div className="relative p-5 bg-white w-full max-w-5xl m-auto rounded-xl shadow-2xl">
        {/* زر الإغلاق */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="إغلاق"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="pt-5">
          <div className="flex flex-col md:flex-row gap-8">
            {/* الجانب الأيسر: الفيديو */}
            <div className="md:w-1/2">
              <div className="bg-gray-900 rounded-lg aspect-video relative flex items-center justify-center">
                {/* يمكن استبدال هذا بمكون فيديو حقيقي */}
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-white">فيديو القلعة: {castle.name}</p>
                  <p className="text-gray-400 text-sm mt-2">سيظهر هنا فيديو عرض القلعة والميزات</p>
                </div>
                
                {/* زر تشغيل الفيديو */}
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              </div>
              
              {/* معرض صور القلعة */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={`modal-image-${castle.id}-${idx}`} className="aspect-square rounded-md bg-gray-200 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundImage: `url('/images/castles/castle${castle.id}_${idx}.jpg'), url('/images/castles/default_castle.jpg')` }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* الجانب الأيمن: التفاصيل المكتوبة */}
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <span>{castle.icon}</span>
                <span>{castle.name}</span>
              </h2>
              
              {/* تصنيفات القلعة */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">مستوى {castle.level}</span>
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-sm">قوة {castle.strength}</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">{castle.price} $</span>
              </div>
              
              {/* وصف القلعة */}
              <div className="bg-gray-50 p-4 rounded-lg mb-5">
                <h3 className="text-lg font-semibold mb-2">الوصف</h3>
                <p className="text-gray-700">{castle.description}</p>
              </div>
              
              {/* ميزات القلعة */}
              <div className="bg-amber-50 p-4 rounded-lg mb-5">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <span className="text-amber-600 mr-2">✨</span>
                  ميزات القلعة
                </h3>
                <ul className="space-y-2">
                  {castle.features.map((feature, idx) => (
                    <li key={`modal-feature-${castle.id}-${idx}`} className="flex items-center gap-2">
                      <div className="text-amber-600">•</div>
                      <div>{feature}</div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* زر الشراء */}
              <div className="mt-6 flex gap-4">
                <button 
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  شراء الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CastlesPage() {
  // استخدام اللغة العربية فقط
  const locale = 'ar';
  const isRTL = true;
  
  // استخدام الترجمات العربية فقط بدون getTranslation
  
  // الوصول إلى سلة التسوق
  const { addItem } = useCart();
  
  // حالة تصفية القلاع
  const [levelFilter, setLevelFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('level');
  
  // حالة النافذة المنبثقة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCastle, setSelectedCastle] = useState<Castle | null>(null);
  
  // حالات نافذة الفيديو المنبثقة
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoData, setVideoData] = useState<{url: string | null, title: string}>({ url: null, title: '' });
  
  // الترجمات
  const getLocalizedText = (key: string): string => {
    const translations: {[key: string]: {[key: string]: string}} = {
      'castles': {
        'ar': 'القلاع',
        'en': 'Castles',
        'tr': 'Kaleler'
      },
      'level': {
        'ar': 'المستوى',
        'en': 'Level',
        'tr': 'Seviye'
      },
      'strength': {
        'ar': 'القوة',
        'en': 'Strength',
        'tr': 'Güç'
      },
      'filters': {
        'ar': 'التصفية',
        'en': 'Filters',
        'tr': 'Filtreler'
      },
      'sort_by': {
        'ar': 'ترتيب حسب',
        'en': 'Sort by',
        'tr': 'Sırala'
      },
      'all_levels': {
        'ar': 'جميع المستويات',
        'en': 'All Levels',
        'tr': 'Tüm Seviyeler'
      },
      'price': {
        'ar': 'السعر',
        'en': 'Price',
        'tr': 'Fiyat'
      },
      'features': {
        'ar': 'الميزات',
        'en': 'Features',
        'tr': 'Özellikler'
      },
      'buy_now': {
        'ar': 'شراء الآن',
        'en': 'Buy Now',
        'tr': 'Şimdi Satın Al'
      },
      'add_to_cart': {
        'ar': 'أضف إلى السلة',
        'en': 'Add to Cart',
        'tr': 'Sepete Ekle'
      },
      'popular': {
        'ar': 'الأكثر مبيعاً',
        'en': 'Popular',
        'tr': 'Popüler'
      },
      'castle_features': {
        'ar': 'ميزات القلعة',
        'en': 'Castle Features',
        'tr': 'Kale Özellikleri'
      }
    };
    
    return translations[key]?.[locale] || key;
  };
  
  // الحالات التي نحتاجها للصفحة
  const [castles, setCastles] = useState<Castle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // تحميل القلاع من API
  const loadCastles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/castles');
      
      if (!response.ok) {
        throw new Error(`خطأ في الاتصال: ${response.status}`);
      }
      
      const data = await response.json();
      
      // تسجيل البيانات التي تأتي من API للتحقق
      console.log('API response data:', data);
      
      if (data && data.castles && Array.isArray(data.castles)) {
        const formattedCastles = data.castles.map((castle: any) => ({
          id: parseInt(castle.id) || Math.random() * 1000,
          name: castle.name,
          description: castle.description,
          level: castle.level,
          strength: castle.strength,
          price: castle.price,
          features: Array.isArray(castle.features) ? castle.features : [],
          icon: castle.icon || '🏰',
          popular: castle.popular || false,
          videoUrl: castle.videoUrl || '' // إضافة حقل رابط الفيديو
        }));
        
        console.log('تم تحميل القلاع مع روابط الفيديو:', formattedCastles);
        setCastles(formattedCastles);
      } else {
        setCastles([]);
      }
    } catch (error) {
      console.error('خطأ في تحميل القلاع:', error);
      setError('حدث خطأ أثناء تحميل القلاع. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // تحميل القلاع عند تحميل الصفحة
  useEffect(() => {
    loadCastles();
  }, []);
  
  // تصفية وترتيب القلاع
  const filteredCastles = castles
    .filter(castle => levelFilter === null || castle.level === levelFilter)
    .sort((a, b) => {
      if (sortBy === 'level') return b.level - a.level;
      if (sortBy === 'strength') return b.strength - a.strength;
      if (sortBy === 'price') return b.price - a.price;
      return 0;
    });
    
  // إضافة إلى سلة التسوق
  const handleAddToCart = (castle: Castle) => {
    addItem({
      id: `castle-${castle.id}`,
      name: castle.name,
      price: castle.price,
      icon: castle.icon,
      category: 'castle'
    });
  };
  
  // إعادة توجيه مع معلمات إضافية
  const handleBuyNow = (castle: Castle) => {
    handleAddToCart(castle);
    window.location.href = `/checkout?item=castle-${castle.id}`;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 rtl" dir="rtl">
      {/* زر سلة التسوق */}
      <div className="fixed top-24 left-5 z-20">
        <Link href="/checkout" className="block">
          <div className="relative bg-amber-500 hover:bg-amber-600 transition-colors p-3 rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {addItem && <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {/* عدد عناصر سلة التسوق */}
            </div>}
          </div>
        </Link>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2 text-blue-800 drop-shadow-md">{getLocalizedText('castles')}</h1>
        <p className="text-gray-800 text-lg mb-12 bg-white bg-opacity-50 inline-block px-4 py-2 rounded-lg shadow-sm">اختر القلعة المناسبة لاحتياجاتك في لعبة الفاتحون</p>
        
        {/* قسم التصفية والفرز */}
        <div className="p-6 rounded-xl shadow-md mb-8 relative overflow-hidden">
          {/* صورة الخلفية */}
          <div className="absolute inset-0 bg-cover bg-center z-0" 
               style={{ backgroundImage: 'url("/bg244_LE_upscale_balanced_x4.jpg")', opacity: 0.4, filter: 'brightness(1.1) contrast(1.1)' }}>
          </div>
          <div className="relative z-10">
          <h2 className="text-xl font-bold mb-4">{getLocalizedText('filters')}</h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-700 mb-2">
                {getLocalizedText('level')}
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={levelFilter === null ? '' : levelFilter}
                onChange={(e) => setLevelFilter(e.target.value === '' ? null : Number(e.target.value))}
              >
                <option value="">{getLocalizedText('all_levels')}</option>
                <option value="12">12</option>
                <option value="18">18</option>
                <option value="22">22</option>
                <option value="30">30</option>
                <option value="1">1★</option>
                <option value="2">2★</option>
                <option value="3">3★</option>
                <option value="4">4★</option>
                <option value="5">5★</option>
              </select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-700 mb-2">
                {getLocalizedText('sort_by')}
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="level">{getLocalizedText('level')}</option>
                <option value="strength">{getLocalizedText('strength')}</option>
                <option value="price">{getLocalizedText('price')}</option>
              </select>
            </div>
          </div>
          </div>
        </div>
        
        {/* قائمة القلاع */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
            <span className="mr-4">جارٍ تحميل القلاع...</span>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 text-red-700 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={loadCastles}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : filteredCastles.length === 0 ? (
          <div className="text-center p-8 bg-amber-50 text-amber-700 rounded-lg">
            <p>لا توجد قلاع تطابق معايير التصفية الخاصة بك.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCastles.map((castleItem, index) => (
              <div key={`castle-${castleItem.id}-${index}`} className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
                {castleItem.popular && (
                  <div className="bg-amber-500 text-white text-center py-1.5 text-sm font-medium">
                    ⭐ {getLocalizedText('popular')}
                  </div>
                )}
                
                {/* صورة القلعة في الأعلى */}
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105" 
                    style={{ 
                      backgroundImage: `url('/images/castles/castle${castleItem.id}.jpg'), url('/images/castles/default_castle.jpg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* طبقة تعتيم للنص */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* زر الفيديو */}
                    <CastleVideoButton
                      videoUrl={castleItem.videoUrl}
                      castleName={castleItem.name}
                      onShowVideo={(url, title) => {
                        setVideoData({ url, title });
                        setIsVideoModalOpen(true);
                      }}
                    />
                    
                    {/* اسم القلعة على الصورة */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 py-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold drop-shadow-lg">{castleItem.name}</h2>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className="bg-blue-600 text-white px-2 py-0.5 rounded-md text-sm font-medium">مستوى {castleItem.level}</span>
                            <span className="bg-amber-500 text-white px-2 py-0.5 rounded-md text-sm font-medium">{castleItem.strength} قوة</span>
                          </div>
                        </div>
                        <span className="text-4xl drop-shadow-lg">{castleItem.icon}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                
                {/* سعر القلعة بتصميم بارز */}
                <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-lg p-3 mb-5 flex justify-between items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-amber-600 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{getLocalizedText('price')}:</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{castleItem.price} $</span>
                </div>
                
                {/* مؤشرات قوة القلعة */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-600 mr-1">⚔️</span>
                      <span className="text-gray-700 text-sm">{getLocalizedText('strength')}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${castleItem.strength}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <span className="text-amber-600 mr-1">🛡️</span>
                      <span className="text-gray-700 text-sm">{getLocalizedText('level')}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${(castleItem.level/25)*100}%` }}></div>
                    </div>
                  </div>
                </div>
               

                
                {/* عرض التفاصيل */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-gray-600 text-sm">{castleItem.description}</p>
                  
                  {/* ميزات القلعة */}
                  <div className="mt-3 border-t border-gray-200 pt-3">
                    <h4 className="text-xs font-medium text-gray-500 mb-2">الميزات:</h4>
                    <ul className="grid grid-cols-2 gap-1">
                      {castleItem.features?.slice(0, 4).map((feature, idx) => (
                        <li key={`${castleItem.id}-feature-${idx}`} className="text-xs flex items-center">
                          <span className="text-amber-600 ml-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* زر الشراء */}
                <button 
                  onClick={() => handleBuyNow(castleItem)}
                  className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-3 px-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>شراء الآن</span>
                </button>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>

      {/* نافذة عرض الفيديو */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoData.url}
        title={videoData.title}
      />
    </div>
  );
}
